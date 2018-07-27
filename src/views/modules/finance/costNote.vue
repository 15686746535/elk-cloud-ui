<template>
  <div style="height: 100%" class="cost-note">
    <el-card style="height: 100%">
      <div style="margin-bottom: 15px;">
        <!--:picker-options="pickerOptions"-->
        <el-date-picker value-format="timestamp" style="width: 250px" size="mini" v-model="interval" type="daterange"
                        align="left" unlink-panels range-separator="—" start-placeholder="开始日期" end-placeholder="结束日期" >
        </el-date-picker>
        <el-input size="mini" @keyup.enter.native="searchClick" placeholder="姓名/电话/身份证" clearable v-model="listQuery.condition" style="width: 150px;"></el-input>
        <el-button size="mini" type="primary"  @click="searchClick"><i class="el-icon-search"></i>搜索</el-button>
        <el-button size="mini" type="warning" v-if="finance&&finance.state==0" @click="updateFinaceStateHandle(finance.chargeId,1)">审核</el-button>
        <el-button size="mini" type="info" v-if="finance&&finance.state==1" @click="updateFinaceStateHandle(finance.chargeId,0)">反审核</el-button>
        <el-button size="mini" type="info" v-if="finance&&finance.state==0" @click="updateFinace(finance)">修改</el-button>
        <el-button size="mini" type="danger" v-if="finance&&finance.state==0" @click="updateFinaceStateHandle(finance.chargeId,-1)">作废</el-button>

        <!--<el-table-column align="center"  label="操作" width="230">-->
        <!--<template slot-scope="scope">-->
        <!--<el-button size="mini" type="primary" v-if="scope.row.state==0" @click="updateFinaceStateHandle(scope.row.chargeId,1)">审核</el-button>-->

        <!--</template>-->
        <!--</el-table-column>-->
      </div>

      <el-table :data="financeList" :height="(tableHeight-180)" border @select="selectRow"  highlight-current-row stripe fit v-loading="listLoading" element-loading-text="给我一点时间">
        <el-table-column type="expand">
          <template slot-scope="props">
            <div class="service-mode">
              <div class="buy-service header" v-if="props.row.financeList.length > 0">购买服务</div>
              <div v-for="(service, i) in props.row.financeList" style="float: left">
                <div class="title" :class="'border_'+i">{{service.name}}</div>
                <div class="money" :class="'border_'+i">{{service.price}}×{{service.number}}</div>
              </div>
              <div class="pay-type header">收费方式</div>
              <div v-for="(type, a) in props.row.payTypeList" style="float: left" >
                <div class="title" :class="'border_'+ a">{{type.mode}}</div>
                <div class="money" :class="'border_'+ a">{{type.money}}</div>
              </div>
            </div>
          </template>
        </el-table-column>
        <el-table-column type="selection" width="35"></el-table-column>
        <el-table-column align="center"  label="流水号" min-width="130">
          <template slot-scope="scope">
            <span>{{scope.row.serialPrefix}}{{scope.row.paytime | parseTime('{y}{m}')}}{{scope.row.serialNumber | parseSerial}}</span>
          </template>
        </el-table-column>
        <el-table-column align="center" prop="name" label="学员" min-width="140"></el-table-column>
        <!--<el-table-column align="center" prop="idNumber" label="身份证"></el-table-column>-->
        <el-table-column align="center" prop="campus" label="校区" min-width="120"></el-table-column>
        <el-table-column align="center"  prop="finances"  label="购买服务" min-width="100" :filters="financeFilters" :filter-method="filterFinance" filter-placement="bottom-end">
          <template slot-scope="scope">
            <div style="width: 100%;overflow: hidden;white-space:nowrap;text-overflow:ellipsis;">{{scope.row.finances}}</div>
          </template>
        </el-table-column>
        <el-table-column align="center"  prop="payTypes"  label="收费方式" min-width="100" :filters="payTypeFilters" :filter-method="filterPayType" filter-placement="bottom-end">
          <template slot-scope="scope">
            <div style="width: 100%;overflow: hidden;white-space:nowrap;text-overflow:ellipsis;">{{scope.row.payTypes}}</div>
          </template>
        </el-table-column>
        <el-table-column align="center"  prop="state"  label="状态" min-width="90" :filters="stateFilters" :filter-method="filterState" filter-placement="bottom-end">
          <template slot-scope="scope">
            <span v-if="scope.row.state==='0'">未审核</span>
            <span v-if="scope.row.state==='1'" >已审核</span>
            <span v-if="scope.row.state==='-1'">已作废</span>
          </template>
        </el-table-column>
        <el-table-column align="center" prop="motorcycleType" label="车型" min-width="70"></el-table-column>
        <el-table-column align="center" prop="receivablesType" label="收费类型" min-width="130"></el-table-column>
        <el-table-column align="center"  label="时间" min-width="120">
          <template slot-scope="scope">
            <span>{{ scope.row.paytime | subTime}}</span>
          </template>
        </el-table-column>
        <el-table-column align="center" prop="payee" label="制单人" min-width="100"></el-table-column>
        <el-table-column align="center" prop="reviser" label="修订人" min-width="100"></el-table-column>
        <el-table-column align="center" prop="auditor" label="审核人" min-width="100"></el-table-column>
      </el-table>
      <div v-show="!listLoading" class="pagination-container" style="margin-top: 20px">
        <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange"
                       :current-page.sync="listQuery.page"
                       background
                       style="float: left"
                       size="mini"
                       :page-sizes="[10,20,30,50]" :page-size="listQuery.limit"
                       layout="total, sizes, prev, pager, next, jumper" :total="total">
        </el-pagination>
      </div>
    </el-card>
  </div>
</template>

<script>
  import { removeAllSpace } from '@/utils/validate'
  import { mapGetters } from 'vuex'
  import { getServiceChargeList, updateFinaceState } from '@/api/finance/service-charge'
  import finance from '@/views/modules/stu/serviceNote.vue'

  export default {
    name: 'table_log',
    props: {
      area: Array
    },
    watch: {
      area: function(val) {
        this.tableHeight = val[1]
      },
      interval: function(val) {
        if (val) {
          this.listQuery.beginTime = val[0]
          this.listQuery.endTime = val[1]
        } else {
          this.listQuery.beginTime = null
          this.listQuery.endTime = null
        }
      }
    },
    data() {
      return {
        tableHeight: this.area[1],
        financeList: [],
        financeFilters: [],
        interval: [],
        payTypeFilters: [
          { text: '现金', value: '现金' },
          { text: '支付宝', value: '支付宝' },
          { text: '微信', value: '微信' },
          { text: '收钱吧', value: '收钱吧' },
          { text: '刷卡', value: '刷卡' },
          { text: '其他', value: '其他' }
        ],
        stateFilters: [
          { text: '未审核', value: '0' },
          { text: '已审核', value: '1' },
          { text: '已作废', value: '-1' }
        ],
        // 分页数据
        listQuery: {
          page: 1,
          limit: 20,
          beginTime: null,
          endTime: null,
          condition: ''
        },
        finance: null,
        total: null,
        listLoading: false
      }
    },
    computed: {
      ...mapGetters([
        'permissions',
        'client'
      ])
    },
    filters: {
    },
    created() {
      this.getServiceChargeList()
    },
    methods: {
      selectRow(selection, row) {
        this.finance = null
        if (selection.length === 1) {
          this.finance = selection[0]
        }
      },
      filterState(value, row) {
        return row.state === value
      },
      filterPayType(value, row) {
        return row.payTypes.indexOf(value) > -1
      },
      filterFinance(value, row) {
        return row.finances.indexOf(value) > -1
      },
      getServiceChargeList() {
        getServiceChargeList(this.listQuery).then(response => {
          var list = []
          var total = 0
          var financeFilters = []
          if (response.data.code === 0) {
            list = response.data.data.list
            total = response.data.data.totalCount
            var finances
            var payTypes
            list.forEach(function(item) {
              finances = ''
              payTypes = ''
              item.financeList.forEach(function(fin) {
                finances += fin.name + '、'
                var hasFinance = false
                financeFilters.forEach(function(fit) {
                  if (fit.value === fin.name) {
                    hasFinance = true
                  }
                })
                if (!hasFinance) {
                  financeFilters.push({ text: fin.name, value: fin.name })
                }
              })
              item.payTypeList.forEach(function(type) {
                payTypes += type.mode + '、'
              })
              item.finances = finances
              item.payTypes = payTypes
            })
          }
          this.financeFilters = financeFilters
          this.financeList = list
          this.total = total
          console.log(response.data.data.totalCount)
        })
      },
      searchClick() {
        this.listQuery.page = 1
        this.listQuery.condition = removeAllSpace(this.listQuery.condition)
        this.getServiceChargeList()
      },
      // 改变页容量
      handleSizeChange(val) {
        this.listQuery.limit = val
        this.getServiceChargeList()
      },
      updateFinace(row) {
        this.$layer.open({
          type: 2,
          id: row.chargeId + '_cost', // title
          title: '收费修改 ' + row.name, // title
          shadeClose: false, // 点击遮罩关闭
          tabIcon: '../../../static/icon/app/app_stu_service.png', // 应用图标 任务栏显示
          shade: false, // 遮罩 默认不显示
          content: {
            content: finance,
            parent: this, // 当前的vue对象
            data: { chargeId: row.chargeId }// props
          }
        })
      },
      updateFinaceStateHandle(chargeid, state) {
        // console.log(dat,row)
        var dat = {
          chargeId: chargeid,
          state: state
        }
        updateFinaceState(dat).then(res => {
          this.getServiceChargeList()
        })
      },
      // 改变当前页
      handleCurrentChange(val) {
        this.listQuery.page = val
        this.getServiceChargeList()
      }
    }
  }
</script>
