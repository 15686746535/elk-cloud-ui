<template>
  <div style="height: 100%" class="cost-note" id="payment">
    <el-card style="height: 100%">
      <div style="margin-bottom: 15px;">
        <!--:picker-options="pickerOptions"-->
        <el-date-picker value-format="timestamp" style="width: 250px" size="mini" v-model="interval" type="daterange"
                        align="left" unlink-panels range-separator="—" start-placeholder="开始日期" end-placeholder="结束日期" >
        </el-date-picker>
        <el-select v-model="listQuery.state" size="mini" style="width: 100px;"  placeholder="审核状态" clearable>
          <el-option key="0" label="未审核" value="0"> </el-option>
          <el-option key="1" label="已审核" value="1"> </el-option>
          <el-option key="-1" label="已作废" value="-1"> </el-option>
        </el-select>
        <el-input size="mini" @keyup.enter.native="searchClick" placeholder="姓名/身份证/流水号" clearable v-model="listQuery.condition" style="width: 150px;"></el-input>
        <el-button size="mini" type="primary"  @click="searchClick" icon="el-icon-search">搜索</el-button>
        <el-button-group>
          <el-button size="mini" type="warning" v-if="payment&&payment.state==0&&permissions.finance_payment_auditor" @click="auditorHandle(payment.payId,1)" icon="el-icon-share">审核</el-button>
          <el-button size="mini" type="info" v-if="payment&&payment.state==1&&permissions.finance_payment_auditor_contrary" @click="auditorHandle(payment.payId,0)"  icon="el-icon-refresh">反审核</el-button>
          <el-button size="mini" type="info" v-if="payment&&payment.state==0&&permissions.finance_payment_edit" @click="openPayment(payment,'edit')" icon="el-icon-edit">修改</el-button>
          <el-button size="mini" type="danger" v-if="payment&&payment.state==0&&permissions.finance_payment_delete" @click="auditorHandle(payment.payId,-1)" icon="el-icon-delete">作废</el-button>
          <el-button size="mini" type="primary" v-if="payment&&payment.state==0&&permissions.finance_payment_delete"  @click="copyData(payment,'copy')" icon="el-icon-tickets">复制</el-button>
          <!--<el-button size="mini" type="primary" @click="download" :loading="downloadLading"  icon="el-icon-download">导出</el-button>-->
        </el-button-group>
      </div>
      <!--:span-method="arraySpanMethod"   show-overflow-tooltip -->
      <el-table :data="list" :height="(tableHeight-180)" :cell-class-name="cellcb"  border @select="selectRow"  highlight-current-row stripe fit v-loading="listLoading" element-loading-text="给我一点时间">
        <el-table-column type="selection" width="35" fixed></el-table-column>
        <el-table-column align="center"  label="流水号" prop="serialNumber" width="130" fixed>
          <template slot-scope="scope">
            <a href="javascript:void(0);" v-if="scope.row.serialNumber" style="color: -webkit-link;cursor: pointer;text-decoration: underline;" @click="openPayment(scope.row,'info')">
              {{scope.row.serialPrefix}}{{scope.row.paytime | parseTime('{y}{m}')}}{{scope.row.serialNumber | parseSerial}}
            </a>
          </template>
        </el-table-column>
        <el-table-column align="center" prop="paytime" label="付款日期" width="110" fixed>
          <template slot-scope="scope">
            <span>{{ scope.row.paytime | subTime}}</span>
          </template>
        </el-table-column>
        <!--<el-table-column label="学员信息" align="center" fixed>-->
          <el-table-column align="center" prop="name" label="姓名" width="100" fixed></el-table-column>
          <el-table-column align="center" prop="idNumber" label="身份证号" width="180" fixed></el-table-column>
        <!--</el-table-column>-->
        <el-table-column label="付款信息" align="center">
          <el-table-column align="center" prop="content" label="项目" show-overflow-tooltip width="100"></el-table-column>
          <el-table-column align="center" prop="money" label="金额" width="80"></el-table-column>
          <el-table-column align="center" prop="mode" label="方式" width="80" show-overflow-tooltip></el-table-column>
          <el-table-column align="center" prop="num" label="次数" width="50"></el-table-column>
        </el-table-column>
        <el-table-column align="center" prop="payee" label="收款单位" min-width="250"></el-table-column>
        <el-table-column align="center"  prop="state"  label="状态" min-width="50" filter-placement="bottom-end">
          <template slot-scope="scope">
            <span v-if="scope.row.state==='1'" >√</span>
            <span v-if="scope.row.state==='-1'">×</span>
          </template>
        </el-table-column>
        <el-table-column align="center" prop="drawee" label="制单人" min-width="100"></el-table-column>
        <el-table-column align="center" prop="reviser" label="修订人" width="100"></el-table-column>
        <el-table-column align="center" prop="auditor" label="审核人" width="100"></el-table-column>
        <el-table-column align="center" prop="remark" label="摘要" show-overflow-tooltip width="100"></el-table-column>
      </el-table>
      <div v-show="!listLoading" class="pagination-container" style="margin-top: 20px">
        <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange"
                       :current-page.sync="listQuery.page"
                       background
                       style="float: left"
                       size="mini"
                       :page-sizes="[10,20,30,50,100,200]" :page-size="listQuery.limit"
                       layout="sizes, prev, pager, next, jumper" :total="total">
        </el-pagination>
      </div>
    </el-card>
  </div>
</template>

<script>
  import { removeAllSpace } from '@/utils/validate'
  import { mapGetters } from 'vuex'
  import { getPage, auditor } from '@/api/finance/payment'
  import paymentAdd from '@/views/modules/finance/payment-add.vue'

  export default {
    name: 'payment',
    props: {
      layerid: String,
      area: Array
    },
    watch: {
      'listQuery.state': function(val) {
        if (!val) {
          this.listQuery.state = null
        }
      },
      area: function(val) {
        this.tableHeight = val[1]
      },
      interval: function(val) {
        if (val) {
          // 时间检索  开始时间为选择的开始时间前一天的23:59:59   结束时间为选择时间的23:59:59
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
        list: [],
        interval: [],
        // 分页数据
        listQuery: {
          page: 1,
          limit: 20,
          state: null,
          beginTime: null,
          endTime: null,
          condition: ''
        },
        payment: {},
        total: null,
        btnLoading: false,
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
      this.getList()
    },
    methods: {
      // 添加单元格class
      cellcb(row) {
        var clazz = ''
        if (row.row.serialNumber === null) {
          clazz += 'myCell'
        }
        return clazz
      },
      // 列表
      getList() {
        this.listLoading = true
        getPage(this.listQuery).then(response => {
          this.list = response.data.data.list
          this.total = response.data.data.totalCount
          console.log(this.list)
          this.listLoading = false
        })
      },
      // 选择行
      selectRow(selection, row) {
        this.payment = {}
        if (selection.length === 1) {
          this.payment = selection[0]
        }
      },
      // 审核
      auditorHandle(payId, state) {
        var dat = {
          payId: payId,
          state: state
        }
        if (state === 0) {
          dat.auditor = 'null'
        }
        auditor(dat).then(() => {
          this.payment = {}
          this.getList()
        })
      },
      // 改变页容量
      handleSizeChange(val) {
        this.listQuery.limit = val
        this.getList()
      },
      openPayment(row, edit) {
        var payment = {
          payId: row.payId,
          pageLevel: edit
        }
        this.$layer.open({
          type: 2,
          id: row.payId + '_cost', // title
          title: '付费详情', // title
          shadeClose: false, // 点击遮罩关闭
          prohibit: this.$store.state.app.prohibit,
          tabIcon: '../../../static/icon/app/app_default.png', // 应用图标 任务栏显示
          shade: false, // 遮罩 默认不显示
          content: {
            content: paymentAdd,
            parent: this, // 当前的vue对象
            data: { payOrder: payment }// props
          }
        })
      },
      searchClick() {
        this.listQuery.page = 1
        this.listQuery.condition = removeAllSpace(this.listQuery.condition)
        this.getList()
      },
      download() {
        this.$store.dispatch('pushProhibit', this.layerid)
        // this.$message.error('开发中...')
        this.downloadLading = true
        // downloadExcel(this.listQuery).then(response => {
        //   var time = new Date()
        //   var blob = new Blob([response.data], { type: 'application/x-xls;charset=utf-8' })
        //   var downloadElement = document.createElement('a')
        //   var href = window.URL.createObjectURL(blob) // 创建下载的链接
        //   downloadElement.href = href
        //   downloadElement.download = '费用信息(' + time.toLocaleString() + ').xls' // 下载后文件名
        //   document.body.appendChild(downloadElement)
        //   downloadElement.click() // 点击下载
        //   document.body.removeChild(downloadElement) // 下载完成移除元素
        //   window.URL.revokeObjectURL(href) // 释放掉blob对象
        //   this.downloadLading = false
        //   this.$store.dispatch('removeProhibit', this.layerid)
        // })
      },
      // 改变当前页
      handleCurrentChange(val) {
        this.listQuery.page = val
        this.getList()
      },
      //复制单据
      copyData(row, copy){
        var payment = {
          payId: row.payId,
          pageLevel: copy
        }
        this.$layer.open({
          type: 2,
          id: row.payId + '_cost', // title
          title: '付费详情', // title
          shadeClose: false, // 点击遮罩关闭
          prohibit: this.$store.state.app.prohibit,
          tabIcon: '../../../static/icon/app/app_default.png', // 应用图标 任务栏显示
          shade: false, // 遮罩 默认不显示
          content: {
            content: paymentAdd,
            parent: this, // 当前的vue对象
            data: { payOrder: payment }// props
          }
        })
      }
    }
  }
</script>
<style rel="stylesheet/scss" lang="scss" scoped>
#payment {
  .add-header{
    height: 60px;
    font-size: 14px;
    color: #606266;
    line-height: 34px;
  }
  .input-lines{
    border: none;
    outline:none;
    border-bottom: #dcdfe6 1px solid;
    font-size: 12px;
    color: #606266;
    width: 100%;
    background-color: #f5f7fa;
  }
  .loading-more{
    margin-top: 10px;
    text-align: center;
    font-size: 12px;
    i{
      cursor: pointer;
    }
  }
  .loading-more:hover{
    i{
      color: #909399;
    }
  }


}
</style>
