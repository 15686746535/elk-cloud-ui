<template>
  <div style="height: 100%" class="cost-note">
    <el-card style="height: 100%">
      <div style="margin-bottom: 15px;">
        <!--:picker-options="pickerOptions"-->
        <el-date-picker value-format="timestamp" style="width: 250px" size="mini" v-model="interval" type="daterange"
                        align="left" unlink-panels range-separator="—" start-placeholder="开始日期" end-placeholder="结束日期" >
        </el-date-picker>
        <el-input size="mini" @keyup.enter.native="searchClick" placeholder="姓名/身份证/流水号" clearable v-model="listQuery.condition" style="width: 150px;"></el-input>
        <el-button size="mini" type="primary"  @click="searchClick" icon="el-icon-search">搜索</el-button>
        <el-button-group>
          <el-button size="mini" type="warning" v-if="finance&&finance.state==0&&permissions.cost_info_examine" @click="updateFinaceStateHandle(finance.chargeId,1)" icon="el-icon-share">审核</el-button>
          <el-button size="mini" type="info" v-if="finance&&finance.state==1&&permissions.cost_info_examine_back" @click="updateFinaceStateHandle(finance.chargeId,0)"  icon="el-icon-refresh">反审核</el-button>
          <el-button size="mini" type="info" v-if="finance&&finance.state==0&&permissions.cost_info_edit" @click="openFinace(finance,'edit')" icon="el-icon-edit">修改</el-button>
          <el-button size="mini" type="danger" v-if="finance&&finance.state==0&&permissions.cost_info_examine_delete" @click="updateFinaceStateHandle(finance.chargeId,-1)" icon="el-icon-delete">作废</el-button>
          <el-button size="mini" type="primary" @click="download" :loading="downloadLading"  icon="el-icon-download">导出</el-button>
        </el-button-group>
        <!--<el-table-column align="center"  label="操作" width="230">-->
        <!--<template slot-scope="scope">-->
        <!--<el-button size="mini" type="primary" v-if="scope.row.state==0" @click="updateFinaceStateHandle(scope.row.chargeId,1)">审核</el-button>-->

        <!--</template>-->
        <!--</el-table-column>-->
      </div>

      <el-table :data="financeList" :height="(tableHeight-180)" :summary-method="getSummaries" show-summary border @select="selectRow"  highlight-current-row stripe fit v-loading="listLoading" element-loading-text="给我一点时间">
        <el-table-column type="expand">
          <template slot-scope="props">
            <div class="service-mode">
              <div class="buy-service header" v-if="props.row.financeList.length > 0">购买服务</div>
              <div v-for="(service, i) in props.row.financeList" style="float: left">
                <div class="title" :class="'border_'+i">{{service.name}}</div>
                <div class="money" :class="'border_'+i">{{service.price}}×{{service.number}}</div>
              </div>
            </div>
          </template>
        </el-table-column>
        <el-table-column type="selection" width="35"></el-table-column>
        <el-table-column align="center"  label="流水号" min-width="130">
          <template slot-scope="scope">
            <a href="javascript:void(0) " style="color: -webkit-link;cursor: pointer;text-decoration: underline;" @click="openFinace(scope.row,'info')">{{scope.row.serialPrefix}}{{scope.row.paytime | parseTime('{y}{m}')}}{{scope.row.serialNumber | parseSerial}}</a>
          </template>
        </el-table-column>
        <el-table-column align="center" prop="name" label="学员" min-width="100"></el-table-column>
        <!--<el-table-column align="center" prop="idNumber" label="身份证"></el-table-column>-->
        <el-table-column align="center" prop="campus" label="校区" min-width="120" :filters="campusFilters" :filter-method="filterCampus" filter-placement="bottom-end"></el-table-column>
        <el-table-column align="center"  prop="finances"  label="购买服务" min-width="100" :filters="financeFilters" :filter-method="filterFinance" filter-placement="bottom-end">
          <template slot-scope="scope">
            <div style="width: 100%;overflow: hidden;white-space:nowrap;text-overflow:ellipsis;">{{scope.row.finances}}</div>
          </template>
        </el-table-column>
        <!--<el-table-column align="center"  prop="payTypes"  label="收费方式" min-width="100" :filters="payTypeFilters" :filter-method="filterPayType" filter-placement="bottom-end">-->
          <!--<template slot-scope="scope">-->
            <!--<div style="width: 100%;overflow: hidden;white-space:nowrap;text-overflow:ellipsis;">{{scope.row.payTypes}}</div>-->
          <!--</template>-->
        <!--</el-table-column>-->
        <el-table-column align="center"  prop="state"  label="状态" min-width="90" :filters="stateFilters" :filter-method="filterState" filter-placement="bottom-end">
          <template slot-scope="scope">
            <span v-if="scope.row.state==='0'">未审核</span>
            <span v-if="scope.row.state==='1'" >已审核</span>
            <span v-if="scope.row.state==='-1'">已作废</span>
          </template>
        </el-table-column>
        <el-table-column align="center" prop="introducerName"  label="介绍人" min-width="100" :filters="introducerFilters" :filter-method="filterIntroducer" filter-placement="bottom-end">
        </el-table-column>
        <el-table-column align="center" prop="cash" label="现金" min-width="70"></el-table-column>
        <el-table-column align="center" prop="alipay" label="支付宝" min-width="90"></el-table-column>
        <el-table-column align="center" prop="wechat" label="微信" min-width="70"></el-table-column>
        <el-table-column align="center" prop="collectmoney" label="收钱吧" min-width="90"></el-table-column>
        <el-table-column align="center" prop="brushcard" label="刷卡" min-width="70"></el-table-column>
        <el-table-column align="center" prop="other" label="其他" min-width="70"></el-table-column>
        <el-table-column align="center" prop="money" label="合计" min-width="70"></el-table-column>
        <el-table-column align="center" prop="motorcycleType" label="车型" min-width="70"></el-table-column>
        <el-table-column align="center" prop="receivablesType" label="收费类型" min-width="130"></el-table-column>
        <el-table-column align="center" prop="idNumber" label="身份证号" min-width="200"></el-table-column>
        <el-table-column align="center" prop="paytime" label="时间" min-width="120">
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
                       :page-sizes="[10,20,30,50,100,200]" :page-size="listQuery.limit"
                       layout="total, sizes, prev, pager, next, jumper" :total="total">
        </el-pagination>
      </div>
    </el-card>
  </div>
</template>

<script>
  import { removeAllSpace } from '@/utils/validate'
  import { mapGetters } from 'vuex'
  import { getServiceChargeList, updateFinaceState, downloadExcel } from '@/api/finance/service-charge'
  import finance from '@/views/modules/stu/serviceNote.vue'

  export default {
    name: 'table_log',
    props: {
      layerid: String,
      area: Array
    },
    watch: {
      area: function(val) {
        this.tableHeight = val[1]
      },
      interval: function(val) {
        if (val) {
          // 时间检索  开始时间为选择的开始时间前一天的23:59:59   结束时间为选择时间的23:59:59
          var bt = new Date(val[0])
          var bm = bt.getMonth() + 1
          var bd = bt.getDate() - 1
          if (bm < 10) bm = '0' + bm
          if (bd < 10) bd = '0' + bd
          this.listQuery.BTime = bt.getFullYear() + '-' + bm + '-' + bd + ' 23:59:59'
          var et = new Date(val[1])
          var em = bt.getMonth() + 1
          var ed = bt.getDate()
          if (em < 10) em = '0' + em
          if (ed < 10) ed = '0' + ed
          this.listQuery.ETime = et.getFullYear() + '-' + em + '-' + ed + ' 23:59:59'
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
        showColumns: {
          serialNumber: true,
          name: true,
          campus: true,
          finances: true,
          state: true,
          introducerName: true,
          cash: true, // 现金
          alipay: true, // 支付宝
          wechat: true, // 微信
          collectmoney: true, // 收钱吧
          brushcard: true, // 刷卡
          other: true, //
          money: true, //
          motorcycleType: true, //
          receivablesType: true, //
          idNumber: true, //
          paytime: true, //
          payee: true, //
          reviser: true, //
          auditor: true //
        },
        financeFilters: [],
        campusFilters: [],
        introducerFilters: [],
        interval: [],
        stateFilters: [
          { text: '未审核', value: '0' },
          { text: '已审核', value: '1' },
          { text: '已作废', value: '-1' }
        ],
        // 分页数据
        listQuery: {
          page: 1,
          limit: 20,
          BTime: null,
          ETime: null,
          condition: ''
        },
        finance: null,
        total: null,
        downloadLading: false,
        listLoading: false
      }
    },
    computed: {
      ...mapGetters([
        'permissions',
        'prohibit',
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
      filterCampus(value, row) {
        return row.campus === value
      },
      filterIntroducer(value, row) {
        return row.introducerName === value
      },
      getSummaries(param) {
        const { columns, data } = param
        const sums = []
        var columnList = ['cash', 'alipay', 'wechat', 'collectmoney', 'brushcard', 'other', 'money']
        columns.forEach((column, index) => {
          if (index === 0) {
            sums[index] = '合'
            return
          }
          if (index === 1) {
            sums[index] = '计'
            return
          }
          if (columnList.indexOf(column.property) > -1) {
            const values = data.map(item => Number(item[column.property]))
            if (!values.every(value => isNaN(value))) {
              sums[index] = values.reduce((prev, curr) => {
                const value = Number(curr)
                if (!isNaN(value)) {
                  return prev + curr
                } else {
                  return prev
                }
              }, 0)
            }
          } else {
            sums[index] = 'N/A'
          }
        })
        return sums
      },
      filterFinance(value, row) {
        return row.finances.indexOf(value) > -1
      },
      getServiceChargeList() {
        getServiceChargeList(this.listQuery).then(response => {
          var list = []
          var total = 0
          var financeFilters = []
          var campusFilters = []
          var introducerFilters = []
          if (response.data.code === 0) {
            list = response.data.data.list
            total = response.data.data.totalCount
            var finances
            list.forEach(function(item) {
              finances = ''
              // 购买服务
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
              // 校区
              var hasCampus = false
              campusFilters.forEach(function(cam) {
                if (item.campus === cam.value) {
                  hasCampus = true
                }
              })
              if (!hasCampus) {
                campusFilters.push({ text: item.campus, value: item.campus })
              }
              if (item.introducerList && item.introducerList.length > 0) {
                //  介绍人 introducerList
                item.introducerName = item.introducerList[0].name
                var hasIntroducer = false
                introducerFilters.forEach(function(int) {
                  if (item.introducerName === int.value) {
                    hasIntroducer = true
                  }
                })
                if (!hasIntroducer) {
                  introducerFilters.push({ text: item.introducerName, value: item.introducerName })
                }
              } else {
                item.introducerName = ''
              }
              // 支付方式
              item.cash = 0 // 现金
              item.alipay = 0 // 支付宝
              item.wechat = 0 // 微信
              item.collectmoney = 0 // 收钱吧
              item.brushcard = 0 // 刷卡
              item.other = 0 // 其他
              item.payTypeList.forEach(function(type) {
                if (type.mode === '现金') {
                  item.cash = type.money
                }
                if (type.mode === '支付宝') {
                  item.alipay = type.money
                }
                if (type.mode === '微信') {
                  item.wechat = type.money
                }
                if (type.mode === '收钱吧') {
                  item.collectmoney = type.money
                }
                if (type.mode === '刷卡') {
                  item.brushcard = type.money
                }
                if (type.mode === '其他') {
                  item.other = type.money
                }
              })
              item.finances = finances
            })
          }
          this.financeFilters = financeFilters
          this.campusFilters = campusFilters
          introducerFilters.push({ text: '', value: '' })
          this.introducerFilters = introducerFilters
          this.financeList = list
          this.total = total
          console.log(response.data.data.totalCount)
        })
      },
      // 改变页容量
      handleSizeChange(val) {
        this.listQuery.limit = val
        this.getServiceChargeList()
      },
      openFinace(row, edit) {
        var charge = {
          chargeId: row.chargeId,
          pageLevel: edit
        }
        this.$layer.open({
          type: 2,
          id: row.chargeId + '_cost', // title
          title: '收费详情', // title
          shadeClose: false, // 点击遮罩关闭
          tabIcon: '../../../static/icon/app/app_stu_service.png', // 应用图标 任务栏显示
          shade: false, // 遮罩 默认不显示
          content: {
            content: finance,
            parent: this, // 当前的vue对象
            data: { charge: charge }// props
          }
        })
      },
      searchClick() {
        this.$store.dispatch('pushProhibit', this.layerid)
        console.log(this.prohibit)
        this.listQuery.page = 1
        this.listQuery.condition = removeAllSpace(this.listQuery.condition)
        this.getServiceChargeList()
      },
      download() {
        this.$store.dispatch('pushProhibit', this.layerid)
        // this.$message.error('开发中...')
        this.downloadLading = true
        downloadExcel(this.listQuery).then(response => {
          console.log(response)
          var time = new Date()
          var blob = new Blob([response.data], { type: 'application/x-xls;charset=utf-8' })
          var downloadElement = document.createElement('a')
          var href = window.URL.createObjectURL(blob) // 创建下载的链接
          downloadElement.href = href
          downloadElement.download = '费用信息(' + time.toLocaleString() + ').xls' // 下载后文件名
          document.body.appendChild(downloadElement)
          downloadElement.click() // 点击下载
          document.body.removeChild(downloadElement) // 下载完成移除元素
          window.URL.revokeObjectURL(href) // 释放掉blob对象
          this.downloadLading = false
          this.$store.dispatch('removeProhibit', this.layerid)
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
