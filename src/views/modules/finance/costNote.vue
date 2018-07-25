<template>
  <div style="height: 100%">
    <el-card style="height: 100%">
      <div style="height: 40px;margin-bottom: 15px;">
        <el-input @keyup.enter.native="searchClick" placeholder="姓名/电话/身份证" clearable v-model="listQuery.condition" style="width: 200px;"></el-input>
        <el-button type="primary"  @click="searchClick"><i class="el-icon-search"></i>搜索</el-button>
      </div>

      <el-table :data="financeList" :height="(tableHeight-200)" highlight-current-row stripe v-loading="listLoading" element-loading-text="给我一点时间">
        <el-table-column type="expand">
          <template slot-scope="props">
            <el-row style="text-align: center">
              <el-col :span="12" style="color: #909399;font-weight: 600;border-bottom: 1px solid #ebeef5;border-right: 1px solid #ebeef5;line-height: 40px">
                <el-col :span="12">方式</el-col>
                <el-col :span="12">金额</el-col>
              </el-col>
              <el-col :span="12" style="color: #909399;font-weight: 600;border-bottom: 1px solid #ebeef5;line-height: 40px">
                <el-col :span="12">方式</el-col>
                <el-col :span="12">金额</el-col>
              </el-col>
              <span v-for="(payType,index) in props.row.payTypeList">
                <el-col v-if="index/2 === 0" :span="12" style="border-bottom: 1px solid #ebeef5;border-right: 1px solid #ebeef5;line-height: 40px">
                  <el-col :span="12">{{payType.mode}}</el-col>
                  <el-col :span="12">{{payType.money}}</el-col>
                </el-col>
                <el-col v-else :span="12" style="border-bottom: 1px solid #ebeef5;line-height: 40px">
                  <el-col :span="12">{{payType.mode}}</el-col>
                  <el-col :span="12">{{payType.money}}</el-col>
                </el-col>
              </span>
            </el-row>
          </template>
        </el-table-column>
        <!--<el-table-column type="index" label="订单号"  align="center" width="50"></el-table-column>-->
        <el-table-column align="center"  label="订单号" width="150">
          <template slot-scope="scope">
            <span>{{scope.row.serialPrefix}}{{scope.row.paytime | parseTime('{y}{m}')}}{{scope.row.serialNumber | parseSerial}}</span>
          </template>
        </el-table-column>

        <el-table-column align="center"  label="学员姓名">
          <template slot-scope="scope">
            <span>{{ scope.row.name}}</span>
          </template>
        </el-table-column>
        <!--<el-table-column align="center"  label="身份证">-->
          <!--<template slot-scope="scope">-->
            <!--<span>{{ scope.row.idNumber}}</span>-->
          <!--</template>-->
        <!--</el-table-column>-->
        <el-table-column align="center"  label="收款金额">
          <template slot-scope="scope">
            <span>{{ scope.row.money}}</span>
          </template>
        </el-table-column>
        <el-table-column align="center"  label="收款人">
          <template slot-scope="scope">
            <span>{{ scope.row.payee}}</span>
          </template>
        </el-table-column>
        <el-table-column align="center"  label="收款时间">
          <template slot-scope="scope">
            <span>{{ scope.row.paytime | subTime}}</span>
          </template>
        </el-table-column>
        <el-table-column align="center"  label="状态">
          <template slot-scope="scope">
            <el-tag size="mini" type="primary" v-if="scope.row.state==0">待审核</el-tag>
            <el-tag size="mini" type="info" v-if="scope.row.state==1" >已通过</el-tag>
            <el-tag size="mini" type="danger" v-if="scope.row.state==-1">已作废</el-tag>
          </template>
        </el-table-column>
        <el-table-column align="center"  label="操作" width="230">
          <template slot-scope="scope">
            <el-button size="mini" type="primary" v-if="scope.row.state==0" @click="updateFinaceStateHandle(scope.row.chargeId,1)">审核</el-button>
            <el-button size="mini" type="info" v-if="scope.row.state==1" @click="updateFinaceStateHandle(scope.row.chargeId,0)">反审核</el-button>
            <el-button size="mini" type="primary" v-if="scope.row.state==0" @click="updateFinace(scope.row)">修改</el-button>
            <el-button size="mini" type="danger" v-if="scope.row.state==0" @click="updateFinaceStateHandle(scope.row.chargeId,-1)">作废</el-button>
          </template>
        </el-table-column>
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
      }
    },
    data() {
      return {
        tableHeight: this.area[1],
        financeList: [],
        // 分页数据
        listQuery: {
          page: 1,
          limit: 20,
          condition: ''
        },
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
      getServiceChargeList() {
        getServiceChargeList(this.listQuery).then(response => {
          this.financeList = response.data.data.list
          this.total = response.data.totalCount
          console.log(this.financeList)
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
      }
    }
  }
</script>
