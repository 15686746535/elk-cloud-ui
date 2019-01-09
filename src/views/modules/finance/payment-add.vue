<template>
  <div style="height: 100%" class="cost-note" id="payment">
    <el-card style="height: 100%;background-color: #f5f7fa;" class="add-payment">
      <el-button-group v-if="pageLevel === 'info'||pageLevel === 'edit'">
        <el-button type="primary" size="mini" icon="el-icon-arrow-left" @click="page(payment.payId,'up')">上一单</el-button>
        <el-button type="primary" size="mini" @click="page(payment.payId,'down')">下一单<i class="el-icon-arrow-right el-icon&#45;&#45;right"></i></el-button>
      </el-button-group>
      <el-button type="primary" size="mini" :loading="btnLoading" @click="save" :disabled="saveDisabled" icon="el-icon-fa-save">保存</el-button>
      <el-button-group>
        <el-button type="info" size="mini" v-if="pageLevel === 'info'&&payment.state==='0'&&permissions.cost_info_edit" @click="updateFinace" icon="el-icon-edit">修改</el-button>
        <el-button size="mini" type="warning" v-if="payment&&payment.state==0&&permissions.finance_payment_auditor" @click="auditorHandle(payment.payId,1)" icon="el-icon-share">审核</el-button>
        <el-button size="mini" type="info" v-if="payment&&payment.state==1&&permissions.finance_payment_auditor_contrary" @click="auditorHandle(payment.payId,0)"  icon="el-icon-refresh">反审核</el-button>
        <el-button size="mini" type="danger" v-if="payment&&payment.state==0&&permissions.finance_payment_delete" @click="auditorHandle(payment.payId,-1)" icon="el-icon-delete">作废</el-button>
        <!--<el-button size="mini" type="primary" @click="download" :loading="downloadLading"  icon="el-icon-download">导出</el-button>-->
      </el-button-group>
      <div class="add-header">
        <!--支付类型  日期  流水-->
        <el-row :gutter="10">
          <el-col :span="8">
            <el-row>
              <el-col :span="7">
                支付类型(*):
              </el-col>
              <el-col :span="17">
                <div v-if="pageLevel === 'info'" class="time-lines">{{payment.code}}</div>
                <div v-else>
                  <el-select @change="dataChange" class="select-lines" v-model="payment.code" size="mini" filterable remote reserve-keyword placeholder=""
                             :remote-method="getPayCodeList" :loading="selectLoading">
                    <el-option v-for="code in codeList" :key="code.code" :label="code.content" :value="code.code">
                    </el-option>
                  </el-select>
                </div>
              </el-col>
            </el-row>
          </el-col>
          <el-col :span="8">
            <el-row>
              <el-col :span="4">
                日期(*):
              </el-col>
              <el-col :span="20">
                <div v-if="pageLevel === 'info'">
                  {{payment.paytime | parseTime('{y}-{m}')}}
                </div>
                <div v-else>
                  <el-date-picker @change="dataChange" format="yyyy-MM-dd" value-format="timestamp" class="date-lines" size="mini" type="date" placeholder=""  style="width: 100%" v-model="payment.paytime"></el-date-picker>
                </div>
              </el-col>
            </el-row>
          </el-col>
          <el-col :span="8">
            <el-row>
              <el-col :span="4">
                流水号:
              </el-col>
              <el-col :span="20">
                <div v-if="pageLevel === 'info'||pageLevel === 'edit'" class="input-lines" style="height: 30px;">
                  {{payment.serialPrefix}}{{payment.paytime | parseTime('{y}{m}')}}{{payment.serialNumber | parseSerial}}
                </div>
                <div v-else class="time-lines" style="height: 30px;"></div>
              </el-col>

            </el-row>
            <div class="seal" v-if="payment.state === '1'||payment.state === '-1'||payment.state === '-2'">
              {{payment.auditor}}
              <div v-if="payment.state === '-1'" class="state">废</div>
              <div v-if="payment.state === '1'" class="state">审</div>
              <div v-if="payment.state === '-2'" class="state">冲</div>
            </div>
            <!--<img class="pay-state" v-if="pageLevel === 'info'" :src="getExamineIcon"/>-->
          </el-col>
        </el-row>
        <!--源单类型  引用  支付方式-->
        <el-row :gutter="10">
          <el-col :span="8">
            <el-row>
              <el-col :span="7">
                源单类型:
              </el-col>
                <el-col :span="17">
                  <div v-if="pageLevel === 'info'" style="border-bottom:#dcdfe6 1px solid;height: 28px"></div>
                  <el-select @change="dataChange" v-else v-model="source" class="select-lines"  size="mini"  placeholder="">
                    <el-option v-for="so in sourceList" :key="so.value" :label="so.label" :value="so.value"> </el-option>
                  </el-select>
                </el-col>
            </el-row>
          </el-col>
          <el-col :span="8">
            <el-row>
              <el-col :span="4">
                引用:
              </el-col>
              <el-col :span="20">
                <div v-if="pageLevel === 'info'" class="time-lines"></div>
                <div v-else class="input-lines hover" @click="openQuote" style="height: 30px;padding-left: 30px;">{{quoteSource}}</div>
              </el-col>
            </el-row>
          </el-col>
          <el-col :span="8">
            <el-row>
              <el-col :span="7">
                支付方式:
              </el-col>
              <el-col :span="17">
                <div v-if="pageLevel === 'info'">{{payment.mode}}</div>
                <dict v-else @change="dataChange" v-model="payment.mode" class="select-lines" size="mini" dictType="dict_mode" style="height: 28px" placeholder=""></dict>
              </el-col>
            </el-row>
          </el-col>
        </el-row>
        <!--收款单位 摘要-->
        <el-row :gutter="10">
          <el-col :span="8">
            <el-row>
              <el-col :span="7">
                收款单位(*):
              </el-col>
              <el-col :span="17">
                <p v-if="pageLevel === 'info'" class="time-lines" style="margin-top: -10px">{{payment.payee}}</p>
                <dict @change="dataChange" v-else v-model="payment.payee" class="select-lines" size="mini" dictType="dict_company" style="height: 28px" placeholder=""></dict>
              </el-col>
            </el-row>
          </el-col>
          <el-col :span="16">
            <el-row>
              <el-col :span="2">
                摘要:
              </el-col>
              <el-col :span="22">
                <div v-if="pageLevel === 'info'" class="time-lines">{{payment.remark}}</div>
                <input v-model="payment.remark" class="input-lines" style="padding-left: 30px;"/>
              </el-col>
            </el-row>
          </el-col>
        </el-row>
      </div>
      <el-table :data="addList" :height="(tableHeight-190)" @current-change="rowChange" id="student-table" :cell-class-name="addcellcb"  border highlight-current-row stripe fit v-loading="listLoading" element-loading-text="给我一点时间">
        <el-table-column type="index" align="center" label="行号" width="50"></el-table-column>

        <el-table-column align="center" prop="name" label="学员姓名" width="100">
          <template slot-scope="scope">
            <div v-if="!scope.row.studentId&&payment.code" >
              <el-select class="student-search"  style="height: 25px;" v-model="scope.row.studentId" @focus="rowIndex = scope.$index" @click="rowIndex = scope.$index"
                         @change="studentChange(scope.row)"  size="mini" filterable remote reserve-keyword placeholder=""
                         :remote-method="getStudentList" :loading="selectLoading">
                <el-option v-for="student in studentList[scope.$index]" :key="student.studentId" :label="student.name" :value="student.studentId">
                </el-option>
              </el-select>
            </div>
            <div v-else>{{ scope.row.name}}</div>
          </template>
        </el-table-column>

        <el-table-column align="center" prop="idNumber" label="身份证号"  width="180">
          <template slot-scope="scope">
            <span>{{ scope.row.idNumber}}</span>
          </template>
        </el-table-column>

        <el-table-column align="center" prop="motorcycleType" label="车型" width="50">
          <template slot-scope="scope">
            <span>{{ scope.row.motorcycleType}}</span>
          </template>
        </el-table-column>
        <el-table-column align="center" prop="num" label="收费次数" width="80">
          <template slot-scope="scope">
            <span>{{ scope.row.payNo}}</span><!---->
          </template>
        </el-table-column>
        <el-table-column align="center" prop="num" label="参考次数" width="80">
          <template slot-scope="scope">
            <span>{{ scope.row.num}}</span>
          </template>
        </el-table-column>
        <el-table-column align="center" prop="money" label="金额" width="50">
          <template slot-scope="scope">
            <span><input v-model="scope.row.money" v-if="flag" @keyup.right="moneyRight(scope.row)" v-focus class="money-input" style="padding-left: 3px;width: 100%;height: 25px;"/></span>
            <span v-if="!flag">{{scope.row.money}}</span>
          </template>
        </el-table-column>
        <el-table-column align="center" prop="remark" label="备注" width="120">
          <template slot-scope="scope" >
            <span><input v-model="scope.row.remark" v-if="flag" @keyup.enter="remarkEnter(scope.row)" @keyup.left="remarkLeft(scope.row)" class="remark-input" style="padding-left: 10px;width: 100%;height: 25px;"/></span>
            <span v-if="!flag">{{scope.row.money}}</span>
          </template>
        </el-table-column>
        <el-table-column align="center" prop="remark"  label="操作"  width="50">
          <template slot-scope="scope">
            <i class="el-icon-delete hover" v-if="scope.row.studentId"  @click="removeRow(scope.$index)"/>
          </template>
        </el-table-column>
      </el-table>
    </el-card>


    <el-dialog :modal="false"  title="数据引用" width="950px"  :visible.sync="quoteOpen">
      <div style="height: 300px;width:930px;">
        <el-row :gutter="10" v-if="source<=4" style="margin: 0">
          <el-col :span="6">
            <el-card v-loading="batchListLoading" body-style="padding-bottom: 0px;" element-loading-text="我已经全速加载了...">
              <span style="font-size: 16px;font-family: '微软雅黑 Light';color:rgb(145,145,145)">┃ 批次总览</span>
              <div style="margin: 20px 0 10px 0;overflow: auto;height: 400px" >
                <div v-for="batch in batchList">
                  <div class="batchCss" @click="batchClick($event,batch)" :title="batch.examField" style="overflow: hidden;">
                    {{batch.examTime | parseTime('{y}/{m}/{d}')}}{{batch.examField}}
                  </div>
                </div>
              </div>
              <div class="loading-more">
                <span v-if="batchTotalPage > batchListQuery.page" @click="batchHandleCurrentChange"><i class="el-icon-fa-angle-double-down"></i></span>
                <span v-else>到底了</span>
              </div>
            </el-card>
          </el-col>
          <el-col :span="18">
            <el-card >
              <el-table :data="examBespeak" :height="380" @select="selectListHandle" @select-all="selectListHandle" border highlight-current-row stripe fit v-loading="examBespeakLoading" element-loading-text="给我一点时间">
                <el-table-column type="selection" width="35" fixed></el-table-column>
                <el-table-column align="center" prop="name" label="学员"></el-table-column>
                <el-table-column align="center" prop="idNumber" label="身份证"></el-table-column>
                <el-table-column align="center" prop="motorcycleType" label="车型"></el-table-column>
              </el-table>
            </el-card>
            <div style="margin: 10px 10px;">
              <el-button size="mini" type="primary" style="float: right;" @click="quoteExam()"  icon="el-icon-share">引用</el-button>
            </div>
          </el-col>
        </el-row>
        <el-row v-if="source === 6">
          <el-table :data="stuList" :height="320"  @select="selectListHandle" @select-all="selectListHandle" border highlight-current-row stripe fit v-loading="studentListLoading" element-loading-text="给我一点时间">
            <el-table-column type="selection" width="35" fixed></el-table-column>
            <el-table-column align="center" prop="name" label="学员"></el-table-column>
            <el-table-column align="center" prop="idNumber" label="身份证"></el-table-column>
            <el-table-column align="center" prop="motorcycleType" label="车型"></el-table-column>
          </el-table>
            <el-button type="text" @click="nextPage" style="margin: 10px 390px 0" icon="el-icon-arrow-down">显示更多</el-button>
            <div style="margin: -36px 10px;">
              <el-button size="mini" type="primary" style="float: right;" @click="quoteExam()"  icon="el-icon-share">引用</el-button>
            </div>
        </el-row>

      </div>

    </el-dialog>

  </div>
</template>

<script>
  import { mapGetters } from 'vuex'
  import { fetchStudentList } from '@/api/student/student'
  import { addObj, putObj, getNum, auditor, getPayment } from '@/api/finance/payment'
  import { getList } from '@/api/finance/payment-code'
  import { parseTime } from '@/utils/index'
  import { examFetchList } from '@/api/student/examnote'
  import { getBatchs } from '@/api/student/batch'
  import { Message } from 'element-ui'

  export default {
    name: 'payment-add',
    props: {
      payOrder: Object,
      layerid: String,
      area: Array
    },
    watch: {
      'payment.code': function(val) {
        if (val) {
          var code = this.getPaymentCode(val)
          if (code) {
            this.payCodeChange(code)
          }
        } else {
          this.payment.code = null
          this.payment.money = null
          this.payment.content = null
        }
        // this.addList = [{}]
      },
      'listQuery.state': function(val) {
        if (!val) {
          this.listQuery.state = null
        }
      },
      area: function(val) {
        this.tableHeight = val[1]
      },
      source: function(val) {
        this.batchList = []
        if (val < 5) {
          this.batchListQuery.subject = val
        } // 未完...
      }
    },
    data() {
      return {
        tableHeight: this.area[1],
        saveDisabled: false,
        addList: [],
        list: [],
        studentList: {},
        batch: {},
        codeList: [],
        payCode: {},
        examBespeak: [],
        batchList: [],
        quoteStudentList: [],
        showPage: 'list',
        pageLevel: 'add', // add edit info
        quoteSource: null,
        source: null,
        sourceList: [
          { label: '科目一报考名单', value: 1 },
          { label: '科目二报考名单', value: 2 },
          { label: '科目三报考名单', value: 3 },
          { label: '科目四报考名单', value: 4 },
          { label: '学员名单', value: 6 }
        ],
        batchTotalPage: 1,
        idEdit: false,
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
        flag: true,
        studentListQuery: {
          page: 1,
          limit: 0,
          examId: null,
          examineState: '3',
          examState: 'exam_note_false'
        },
        batchListQuery: {
          page: 1,
          limit: 16,
          subject: '1'
        },
        payment: {},
        total: null,
        rowIndex: null,
        selectLoading: false,
        batchListLoading: false,
        examBespeakLoading: false,
        quoteOpen: false,
        btnLoading: false,
        downloadLading: false,
        listLoading: false,
        selectQuery: {
          page: 1,
          limit: 0,
          condition: null
        },
        stuQuery: {
          page: 1,
          limit: 10,
          totalPage: 1,
          condition: null
        },
        stuList: [],
        studentListLoading: false
      }
    },
    filters: {
    },
    created() {
      if (this.payOrder) {
        var payment = {
          payId: this.payOrder.payId
        }
        this.payment.payId = this.payOrder.payId
        this.pageLevel = this.payOrder.pageLevel
        if (this.pageLevel === 'info' || this.pageLevel === 'edit') {
          this.saveDisabled = true
          this.getPaymentByPayId(payment)
          this.flag = false
        }
      }
    },
    computed: {
      getExamineIcon() {
        console.log(this.payment.state)
        if (this.payment.state === '-2') return '/static/icon/icon-writeoff.png'
        if (this.payment.state === '-1') return '/static/icon/icon-fail.png'
        if (this.payment.state === '1') return '/static/icon/icon-adopt.png'
        return ''
      },
      ...mapGetters([
        'permissions',
        'prohibit',
        'client'
      ])
    },
    methods: {
      rowChange() {
        this.saveDisabled = false
      },
      dataChange() {
        this.saveDisabled = false
      },
      // 点击修改
      updateFinace() {
        this.pageLevel = 'edit'
        // 校订者 修改人
        this.payment.reviser = this.name
        this.flag = true
      },
      // 上一单  下一单
      page(chargeId, direction) {
        var payment = {
          payId: chargeId,
          direction: direction
        }
        this.getPaymentByPayId(payment)
      },
      // 通过支付id到支付信息
      getPaymentByPayId(query) {
        getPayment(query).then(response => {
          if (response.data.data) {
            console.log(response)
            this.addList = response.data.data.studentList
            this.payment = response.data.data
            this.payment.code = response.data.data.content
            console.log(this.payment)
          } else {
            var msg = query.direction === 'down' ? '没有下一单了' : '没有上一单了'
            this.$message.error(msg)
          }
        })
      },
      payCodeChange(code) {
        if (code) {
          this.payment.money = code.money
          this.payment.content = code.content
          getNum({ studentIds: 1 + ',', code: this.payment.code }).then(response => {
            this.addList.forEach(function(ietm) {
              ietm.money = code.money
            })
            this.refreshTable()
          })
        }
      },
      // 刷新表格
      refreshTable() {
        this.addList.splice(this.addList.length - 1, 1)
        this.addList.push({})
      },
      // 支付类型
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
      // 设置class
      addcellcb(row) {
        var clazz = ''
        var inputList = [1, 6, 7]
        if (inputList.indexOf(row.columnIndex) > -1) {
          clazz += 'no-pd-cell'
          if (row.rowIndex % 2 === 1) {
            clazz += ' e8e8e5'
          }
        }
        return clazz
      },
      getBatchList() {
        this.batchListLoading = true
        console.log(this.batchListQuery)
        getBatchs(this.batchListQuery).then(response => {
          this.batchList = this.batchList.concat(response.data.data.list)
          this.batchTotalPage = response.data.data.totalPage
          this.batchListLoading = false
        })
      },
      batchClick(e, batch) {
        this.studentListQuery.examId = batch.examId
        this.batch = batch
        var a = document.getElementsByClassName('batchCss')
        for (var i = 0; i < a.length; i++) {
          a[i].classList.remove('batchCss_selected')
        }
        e.currentTarget.classList.add('batchCss_selected')
        this.getFetchList()
      },
      batchHandleCurrentChange() {
        this.batchListQuery.page = this.batchListQuery.page + 1
        this.getBatchList()
      },
      selectListHandle(selection) {
        this.quoteStudentList = selection
      },
      getFetchList() {
        this.examBespeakLoading = true
        examFetchList(this.studentListQuery).then(response => {
          this.examBespeak = response.data.data.list
          this.examBespeakLoading = false
          console.log(response.data.data.list)
        })
      },
      removeRow(index) {
        if (this.addList.length > 1) {
          this.addList.splice(index, 1)
        }
      },
      getStudent(id) {
        var list = this.studentList[this.rowIndex]
        var stu
        if (list) {
          list.forEach(function(item) {
            if (id === item.studentId) {
              stu = item
            }
          })
        }
        return stu
      },
      selectRow(selection, row) {
        this.payment = {}
        if (selection.length === 1) {
          this.payment = selection[0]
        }
      },
      // 打开引用窗口
      openQuote() {
        this.quoteOpen = true
        if (this.source <= 4) {
          this.getBatchList()
        } else if (this.source === 6) {
          this.getAllStudentList()
        }
      },
      nextPage() {
        if (this.stuQuery.page < this.stuQuery.totalPage) {
          this.stuQuery.page += 1
          this.getAllStudentList()
        } else {
          Message.error("没有更多了")
        }
      },
      getAllStudentList() {
        this.studentListLoading = true
        fetchStudentList(this.stuQuery).then(response => {
          console.log(response)
          this.stuQuery.totalPage = response.data.data.totalPage
          this.stuList = this.stuList.concat(response.data.data.list)
          this.studentListLoading = false
        })
      },
      moneyRight(row) {
        // row.showRemark = true
        // row.showMoney = false
        // this.refreshTable()
        var inputs = document.getElementsByClassName('remark-input')
        console.log(inputs)
        console.log(this.addList.length - 2)
        inputs[this.addList.length - 2].focus()
      },
      remarkLeft(row) {
        // row.showRemark = false
        // row.showMoney = true
        // this.refreshTable()
        var inputs = document.getElementsByClassName('money-input')
        console.log(inputs)
        console.log(this.addList.length - 2)
        inputs[this.addList.length - 2].focus()
      },
      remarkEnter(row) {
        var select = document.getElementsByClassName('student-search')
        select[0].children[0].children[0].focus()
      },
      // 回车下一个输入
      clickEnter(state) {
        // if (state === 1) {
        //   var index = this.addList.length - 2
        //   var input = document.getElementsByClassName('remark-input')
        //   input[index].children[0].focus()
        // } else if (state === 2) {
        //   var select = document.getElementsByClassName('student-search')
        //   select[0].children[0].children[0].focus()
        // }
      },
      // 单个添加学员
      studentChange(row) {
        var student = this.getStudent(row.studentId)
        if (student) {
          row.showMoney = true
          row.name = student.name
          row.idNumber = student.idNumber
          row.motorcycleType = student.motorcycleType
          row.money = this.payment.money
          this.addList.push({})
        }
      },
      // 引用
      quoteExam() {
        console.log(this.source)
        if (this.quoteStudentList && this.quoteStudentList.length > 0) {
          if (this.payment.code) {
            var that = this
            var studentIds = ''
            this.quoteStudentList.forEach(function(item) {
              item.money = that.payment.money
              studentIds += item.studentId + ','
            })
            console.log(this.quoteStudentList)
            getNum({ studentIds: studentIds, code: that.payment.code }).then(response => {
              var addList = []
              this.quoteStudentList.forEach(function(item) {
                item.num = response.data.data['stu_' + item.studentId]
                item.money = that.payment.money
                addList.push(item)
              })
              addList.push({})
              this.addList = addList
              if (this.source === 6) {
                this.quoteSource = '学员列表'
              } else if (this.source < 5) {
                this.quoteSource = parseTime(this.batch.examTime, '{y}/{m}/{d}') + this.batch.examField
              }
              this.saveDisabled = false
            })
          } else {
            this.addList = [{}]
            this.$message.error('请选择支付类型!')
          }
        } else {
          this.$message.error('请选择!')
        }
        this.quoteOpen = false
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
          this.getPaymentByPayId(dat)
          // 刷新当前单据
        })
      },
      // 查询学员选择列表
      getStudentList(query) {
        if (query) {
          this.selectLoading = true
          this.selectQuery.condition = query
          fetchStudentList(this.selectQuery).then(response => {
            this.studentList[this.rowIndex] = response.data.data.list
            this.selectLoading = false
          })
        } else {
          this.studentList = []
        }
      },
      // 获取支付代码
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
      // 保存
      save() {
        var list = this.getAddList()
        if (!this.payment.code) {
          this.$message.error('请选择支付类型!')
        } else if (!this.payment.payee) {
          this.$message.error('请选择收款单位!')
        } else if (!this.payment.paytime) {
          this.$message.error('请选择支付时间!')
        } else if (list.length === 0) {
          this.$message.error('请选择学员!')
        } else {
          this.payment.studentList = list
          console.log(this.payment)
          if (this.payment.payId) {
            this.update()
          } else {
            this.create()
          }
        }
      },
      // 清除列表空数据
      getAddList() {
        var list = []
        this.addList.forEach(function(ietm) {
          if (ietm.studentId) {
            list.push(ietm)
          }
        })
        return list
      },
      // 创建
      create() {
        this.btnLoading = true
        addObj(this.payment).then(() => {
        })
        this.btnLoading = false
        this.payment = {}
        this.addList = []
        this.source = null
        this.quoteSource = null
      },
      // 修改
      update() {
        this.btnLoading = true
        putObj(this.payment).then(() => {
          this.btnLoading = false
        })
      }
    }
  }
</script>
<style rel="stylesheet/scss" lang="scss" scoped>
  #payment {
    .seal{
      width: 160px;
      height: 60px;
      line-height: 40px;
      border: rgb(216,30,6) solid 6px;
      border-radius: 10px;
      color: rgb(216,30,6);
      font-size: 25px;
      font-weight: 900;
      padding-left: 13px;
      letter-spacing:6px;
      position: absolute;
      z-index: 100;
      text-align: center;
      top: 9px;
      right: 88px;
      transform:rotate(-23deg);
      -ms-transform:rotate(-23deg); 	/* IE 9 */
      -moz-transform:rotate(-23deg); 	/* Firefox */
      -webkit-transform:rotate(-23deg); /* Safari 和 Chrome */
      -o-transform:rotate(-23deg); 	/* Opera */
    }
    .state{
      border: #d81e06 solid 2px;
      width: 35px;
      height: 34px;
      font-size: 25px;
      font-weight: 800;
      display: block;
      float: right;
      margin-top: 5px;
      line-height: 27px;
      margin-right: 2px;
      border-radius: 50%;
      padding-left: 3px;
      text-align: center;
    }
    .time-lines{
      border-bottom: #dcdfe6 1px solid;
    }
    .add-header{
      height: 60px;
      font-size: 14px;
      color: #606266;
      line-height: 34px;
    }
    .pay-state{
      width: 150px;
      position: absolute;
      top: -60px
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

    .batchCss{
      background-color: rgba(64,158,255,.1);
      /*display: inline-block;*/
      width: 100%;
      margin: 5px auto;
      padding: 0 10px;
      height: 32px;
      line-height: 30px;
      font-size: 12px;
      color: #409eff;
      border-radius: 4px;
      box-sizing: border-box;
      border: 1px solid rgba(64,158,255,.2);
      white-space: nowrap;
      cursor: pointer;
      transition: .1s;
      box-shadow:3px 3px 10px #f6f6f6;
    }
    .batchCss_selected{
      color: #fff;
      background-color: #409eff;
      border-color: #409eff;
    }
    .batchCss:hover{
      color: #fff;
      background-color: #409eff;
      border-color: #409eff;
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
