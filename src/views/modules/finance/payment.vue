<template>
  <div style="height: 100%" class="cost-note">
    <el-card style="height: 100%" v-show="showPage ==='list'">
      <div style="margin-bottom: 15px;">
        <!--:picker-options="pickerOptions"-->
        <el-date-picker value-format="timestamp" style="width: 250px" size="mini" v-model="interval" type="daterange"
                        align="left" unlink-panels range-separator="—" start-placeholder="开始日期" end-placeholder="结束日期" >
        </el-date-picker>
        <el-select v-model="listQuery.state" size="mini" style="width: 100px;"  placeholder="审核状态">
          <el-option key="0" label="未审核" value="0"> </el-option>
          <el-option key="1" label="已审核" value="1"> </el-option>
          <el-option key="-1" label="已作废" value="-1"> </el-option>
        </el-select>
        <el-input size="mini" @keyup.enter.native="searchClick" placeholder="姓名/身份证/流水号" clearable v-model="listQuery.condition" style="width: 150px;"></el-input>
        <el-button size="mini" type="primary"  @click="searchClick" icon="el-icon-search">搜索</el-button>
        <el-button size="mini" type="success" v-if="permissions.finance_payment_add" @click="add" icon="el-icon-plus">添加</el-button>
        <el-button-group>
          <el-button size="mini" type="warning" v-if="payment&&payment.state==0&&permissions.finance_payment_auditor" @click="auditorHandle(payment.payId,1)" icon="el-icon-share">审核</el-button>
          <el-button size="mini" type="info" v-if="payment&&payment.state==1&&permissions.finance_payment_auditor_contrary" @click="auditorHandle(payment.payId,0)"  icon="el-icon-refresh">反审核</el-button>
          <el-button size="mini" type="info" v-if="payment&&payment.state==0&&permissions.finance_payment_edit" @click="edit" icon="el-icon-edit">修改</el-button>
          <el-button size="mini" type="danger" v-if="payment&&payment.state==0&&permissions.finance_payment_delete" @click="auditorHandle(payment.payId,-1)" icon="el-icon-delete">作废</el-button>
          <!--<el-button size="mini" type="primary" @click="download" :loading="downloadLading"  icon="el-icon-download">导出</el-button>-->
        </el-button-group>
      </div>
      <el-table :data="list" :height="(tableHeight-180)" border @select="selectRow"  highlight-current-row stripe fit v-loading="listLoading" element-loading-text="给我一点时间">
        <el-table-column type="selection" width="35" fixed></el-table-column>
        <el-table-column align="center"  label="流水号" width="130" fixed>
          <template slot-scope="scope">
            <a href="javascript:void(0);" style="color: -webkit-link;cursor: pointer;text-decoration: underline;" @click="info(scope.row.payId)">
              {{scope.row.serialPrefix}}{{scope.row.paytime | parseTime('{y}{m}')}}{{scope.row.serialNumber | parseSerial}}
            </a>
          </template>
        </el-table-column>
        <el-table-column align="center" prop="paytime" label="付款日期" width="110" fixed>
          <template slot-scope="scope">
            <span>{{ scope.row.paytime | subTime}}</span>
          </template>
        </el-table-column>
        <el-table-column align="center" prop="name" label="学员" width="100" fixed></el-table-column>
        <el-table-column align="center" prop="idNumber" label="身份证号" width="180"></el-table-column>
        <el-table-column align="center" prop="content" label="付款项目" width="180"></el-table-column>
        <el-table-column align="center" prop="money" label="金额" width="60"></el-table-column>
        <el-table-column align="center" prop="payee" label="收款单位" min-width="250"></el-table-column>
        <el-table-column align="center"  prop="state"  label="状态" min-width="90" filter-placement="bottom-end">
          <template slot-scope="scope">
            <span v-if="scope.row.state==='0'">未审核</span>
            <span v-if="scope.row.state==='1'" >已审核</span>
            <span v-if="scope.row.state==='-1'">已作废</span>
          </template>
        </el-table-column>
        <el-table-column align="center" prop="drawee" label="制单人" min-width="100"></el-table-column>
        <el-table-column align="center" prop="reviser" label="修订人" width="100"></el-table-column>
        <el-table-column align="center" prop="auditor" label="审核人" width="100"></el-table-column>
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
    <el-card style="height: 100%" v-show="showPage ==='info'">
      <el-form label-position="left" :model="payment" :rules="rules" ref="payment" label-width="110px">

        <el-form-item label="流水号：" v-if="!idEdit">
          <div style="padding-left: 16px;font-size: 12px;" >{{payment.serialPrefix}}{{payment.paytime | parseTime('{y}{m}')}}{{payment.serialNumber | parseSerial}}</div>
        </el-form-item>

        <el-form-item label="付款日期：" v-if="!idEdit">
          <div style="padding-left: 16px;font-size: 12px;" >{{payment.paytime | subTime}}</div>
        </el-form-item>

        <el-form-item prop="studentId">
          <span slot="label" class="text_css">学员{{payment.studentId}}：</span>
          <el-select v-if="idEdit" style="width: 100%;" v-model="payment.studentId" size="medium"  clearable filterable remote reserve-keyword placeholder="输入关键字检索"
                     :remote-method="getStudentList" :loading="selectLoading">
            <el-option v-for="student in studentList" :key="student.studentId" :label="student.name" :value="student.studentId">
            </el-option>
          </el-select>
          <div style="padding-left: 16px;font-size: 12px;" v-else>{{payment.name}}</div>
        </el-form-item>

        <el-form-item label="身份证：" v-if="!idEdit">
          <div style="padding-left: 16px;font-size: 12px;" >{{payment.idNumber}}</div>
        </el-form-item>

        <el-form-item prop="code">
          <span slot="label" class="text_css">付款项目：</span>
          <el-select  v-if="idEdit"  style="width: 100%;" v-model="payment.code" size="medium" clearable filterable remote reserve-keyword placeholder="输入关键字检索"
                     :remote-method="getPayCodeList" :loading="selectLoading">
            <el-option v-for="code in codeList" :key="code.code" :label="code.content" :value="code.code">
            </el-option>
          </el-select>
          <div style="padding-left: 16px;font-size: 12px;"  v-else>{{payment.content}}</div>
        </el-form-item>

        <el-form-item label="付款金额：" prop="money">
          <el-input v-if="idEdit" v-model="payment.money" placeholder="付款金额" ></el-input>
          <div style="padding-left: 16px;font-size: 12px;"  v-else>{{payment.money}}</div>
        </el-form-item>

        <el-form-item label="收款单位：" prop="payee">
          <dict v-if="idEdit" v-model="payment.payee" dictType="dict_company" placeholder="收款单位"  ></dict>
          <div style="padding-left: 16px;font-size: 12px;"  v-else>{{payment.payee}}</div>
        </el-form-item>
        <el-form-item label="付款方式：" prop="mode">
          <dict v-if="idEdit" v-model="payment.mode" dictType="dict_mode" placeholder="付款方式"  ></dict>
          <div style="padding-left: 16px;font-size: 12px;"  v-else>{{payment.mode}}</div>
        </el-form-item>
      </el-form>
      <div align="center" style="width: 100%">
        <el-button @click="cancel('payment')"><i class="el-icon-fa-undo"></i> 返 回 </el-button>
        <!--<el-button v-if="idEdit" @click="info(payment.payId)"><i class="el-icon-fa-undo"></i> 取 消 </el-button>-->

        <el-button v-if="idEdit" type="primary" :loading="btnLoading" @click="save('payment')"> 保 存 </el-button>
        <el-button v-if="!idEdit&&payment.state==0&&permissions.finance_payment_edit" type="primary" :loading="btnLoading" @click="edit"> 编 辑 </el-button>
      </div>
    </el-card>

    <!--<el-dialog :modal="false" @close="cancel('payment')" :title="text" width="550px" :visible.sync="dialogFormVisible">-->
      <!---->
    <!--</el-dialog>-->


  </div>
</template>

<script>
  import { removeAllSpace } from '@/utils/validate'
  import { mapGetters } from 'vuex'
  import { fetchStudentList } from '@/api/student/student'
  import { getPage, getObj, addObj, putObj, auditor } from '@/api/finance/payment'
  import { getList } from '@/api/finance/payment-code'

  export default {
    name: 'payment',
    props: {
      layerid: String,
      area: Array
    },
    watch: {
      'payment.code': function(val) {
        if (val) {
          var code = this.getPaymentCode(val)
          if (code) {
            this.payment.money = code.money
            this.payment.content = code.content
          }
        } else {
          this.payment.code = null
          this.payment.money = null
          this.payment.content = null
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
        studentList: [],
        codeList: [],
        showPage: 'list',
        idEdit: false,
        interval: [],
        // 分页数据
        listQuery: {
          page: 1,
          limit: 20,
          state: '0',
          beginTime: null,
          endTime: null,
          condition: ''
        },
        rules: {
          studentId: [
            { required: true, message: '这是必填项', trigger: ['blur', 'change'] }
          ],
          code: [
            { required: true, message: '这是必填项', trigger: ['blur', 'change'] }
          ],
          money: [
            { required: true, message: '这是必填项', trigger: ['blur', 'change'] }
          ],
          payee: [
            { required: true, message: '这是必填项', trigger: ['blur', 'change'] }
          ],
          mode: [
            { required: true, message: '这是必填项', trigger: ['blur', 'change'] }
          ]
        },
        payment: {},
        total: null,
        selectLoading: false,
        btnLoading: false,
        downloadLading: false,
        listLoading: false,
        selectQuery: {
          page: 1,
          limit: 0,
          condition: null
        }
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
      getList() {
        this.listLoading = true
        getPage(this.listQuery).then(response => {
          this.list = response.data.data.list
          this.listLoading = false
        })
      },
      selectRow(selection, row) {
        this.payment = {}
        if (selection.length === 1) {
          this.payment = selection[0]
        }
      },
      auditorHandle(payId, state) {
        var dat = {
          payId: payId,
          state: state
        }
        auditor(dat).then(() => {
          this.payment = {}
          this.getList()
        })
      },
      getStudentList(query) {
        if (query) {
          this.selectLoading = true
          this.selectQuery.condition = query
          fetchStudentList(this.selectQuery).then(response => {
            this.studentList = response.data.data.list
            this.selectLoading = false
          })
        } else {
          this.studentList = []
        }
      },
      getPaymentCode(code) {
        var paymentCode = null
        if (this.codeList && code) {
          this.codeList.forEach(function(ietm) {
            if (ietm.code === code) {
              paymentCode = ietm
            }
          })
        }
        return paymentCode
      },
      getPayCodeList(query) {
        if (query) {
          this.selectLoading = true
          this.selectQuery.condition = query
          getList(this.selectQuery).then(response => {
            this.codeList = response.data.data
            this.selectLoading = false
          })
        } else {
          this.codeList = []
        }
      },
      // 改变页容量
      handleSizeChange(val) {
        this.listQuery.limit = val
        this.getList()
      },
      add() {
        this.showPage = 'info'
        this.idEdit = true
      },
      info(payId) {
        if (payId) {
          getObj(payId).then(response => {
            this.showPage = 'info'
            this.idEdit = false
            this.payment = response.data.data
          })
        } else {
          this.cancel('payment')
        }
      },
      edit() {
        this.showPage = 'info'
        this.idEdit = true
        this.studentList = [{ studentId: this.payment.studentId, name: this.payment.name, idNumber: this.payment.idNumber }]
        this.codeList = [{ code: this.payment.code, content: this.payment.content, money: this.payment.money }]
      },
      cancel(formName) {
        this.showPage = 'list'
        this.idEdit = false
        this.btnLoading = false
        this.getList()
        this.$refs[formName].resetFields()
      },
      save(formName) {
        if (this.payment.payId) {
          this.update(formName)
        } else {
          this.create(formName)
        }
      },
      create(formName) {
        const set = this.$refs
        set[formName].validate(valid => {
          if (valid) {
            this.btnLoading = true
            addObj(this.payment)
              .then(() => {
                this.cancel()
              })
          } else {
            return false
          }
        })
      },
      update(formName) {
        const set = this.$refs
        set[formName].validate(valid => {
          if (valid) {
            this.btnLoading = true
            putObj(this.payment).then(() => {
              this.cancel()
            })
          } else {
            return false
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
      }
    }
  }
</script>
