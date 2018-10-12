<template>
  <div style="height: 100%" class="cost-note" id="payment">
    <el-card style="height: 100%;background-color: #f5f7fa;" class="add-payment">
      <el-button type="primary" size="mini" v-if="pageLevel !== 'info'&&pageShow==='bill'" :loading="btnLoading" @click="save" :disabled="btnDisabled" icon="el-icon-fa-save">保存</el-button>
      <!--<el-button-group >&lt;!&ndash;v-if="pageShow==='bill'"&ndash;&gt;-->
        <!--<el-button type="warning" size="mini"  v-if="pageLevel === 'info'&&finance.state==='0'&&permissions.cost_info_examine" @click="updateFinaceState(finance.chargeId,'1')" icon="el-icon-share">审核</el-button>-->
        <!--<el-button type="info" size="mini" v-if="pageLevel === 'info'&&finance.state==='1'&&permissions.cost_info_examine_back" @click="updateFinaceState(finance.chargeId,'0')" icon="el-icon-refresh">反审核</el-button>-->
        <!--<el-button type="info" size="mini" v-if="pageLevel === 'info'&&finance.state==='0'&&finance.type==='1'&&permissions.cost_info_edit" @click="updateFinace" icon="el-icon-edit">修改</el-button>-->
        <!--<el-button type="danger" size="mini" v-if="pageLevel === 'info'&&finance.state==='0'&&permissions.cost_info_examine_delete" @click="updateFinaceState(finance.chargeId,'-1')" icon="el-icon-delete">作废</el-button>-->
      <!--</el-button-group>-->
      <el-button-group ><!--v-if="pageLevel === 'info'&&pageShow==='bill'"-->
        <el-button type="primary" size="mini" icon="el-icon-arrow-left" @click="paging(finance.chargeId,-1)">上一单</el-button>
        <el-button type="primary" size="mini" @click="paging(finance.chargeId,1)">下一单<i class="el-icon-arrow-right el-icon--right"></i></el-button>
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
                <el-select class="select-lines" v-model="payment.code" size="mini" filterable remote reserve-keyword placeholder=""
                           :remote-method="getPayCodeList" :loading="selectLoading">
                  <el-option v-for="code in codeList" :key="code.code" :label="code.content" :value="code.code">
                  </el-option>
                </el-select>
              </el-col>
            </el-row>
          </el-col>
          <el-col :span="8">
            <el-row>
              <el-col :span="4">
                日期(*):
              </el-col>
              <el-col :span="20">
                <el-date-picker format="yyyy-MM-dd" value-format="yyyy-MM-dd" class="date-lines" size="mini" type="date" placeholder=""  style="width: 100%" v-model="payment.paytime"></el-date-picker>
              </el-col>
            </el-row>
          </el-col>
          <el-col :span="8">
            <el-row>
              <el-col :span="4">
                流水号:
              </el-col>
              <el-col :span="20">
                <div  class="input-lines" style="height: 30px;"></div>
              </el-col>
            </el-row>
          </el-col>
        </el-row>
        <!--源单类型  引用  支付方式-->
        <el-row :gutter="10">
          <el-col :span="8">
            <el-row>
              <el-col :span="7">
                源单类型(*):
              </el-col>
              <el-col :span="17">
                <el-select v-model="source" class="select-lines"  size="mini"  placeholder="">
                  <el-option v-for="so in sourceList" :key="so.value" :label="so.label" :value="so.value"> </el-option>
                </el-select>
              </el-col>
            </el-row>
          </el-col>
          <el-col :span="8">
            <el-row>
              <el-col :span="4">
                引用(*):
              </el-col>
              <el-col :span="20">
                <div class="input-lines hover" @click="openQuote" style="height: 30px;padding-left: 30px;">{{quoteSource}}</div>
              </el-col>
            </el-row>
          </el-col>
          <el-col :span="8">
            <el-row>
              <el-col :span="7">
                支付方式(*):
              </el-col>
              <el-col :span="17">
                <dict v-model="payment.mode" class="select-lines" size="mini" dictType="dict_mode" style="height: 28px" placeholder=""></dict>
              </el-col>
            </el-row>
          </el-col>
        </el-row>
        <el-row :gutter="10">
          <el-col :span="8">
            <el-row>
              <el-col :span="7">
                收款单位(*):
              </el-col>
              <el-col :span="17">
                <dict v-model="payment.payee" class="select-lines" size="mini" dictType="dict_company" style="height: 28px" placeholder=""></dict>
              </el-col>
            </el-row>
          </el-col>
          <el-col :span="16">
            <el-row>
              <el-col :span="2">
                摘要:
              </el-col>
              <el-col :span="22">
                <input v-model="payment.remark" class="input-lines" style="padding-left: 30px;"/>
              </el-col>
            </el-row>
          </el-col>
        </el-row>

      </div>
      <el-table :data="addList" :height="(tableHeight-250)" id="student-table" :cell-class-name="addcellcb"  border highlight-current-row stripe fit v-loading="listLoading" element-loading-text="给我一点时间">
        <el-table-column type="index" align="center" label="行号" width="50"></el-table-column>

        <el-table-column align="center" prop="name" label="学员姓名" width="100">
          <template slot-scope="scope">
            <div v-if="isSelectStu(scope.row)" >
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
        <el-table-column align="center" prop="num" label="次数" width="50">
          <template slot-scope="scope">
            <span>{{ scope.row.num}}</span>
          </template>
        </el-table-column>
        <el-table-column align="center" prop="money" label="成本" width="50">
          <template slot-scope="scope">
            <span><el-input v-model="scope.row.money" @keyup.enter.native="clickEnter(1)" class="money-input" style="padding-left: 3px;width: 100%;height: 25px;"></el-input></span>
          </template>
        </el-table-column>
        <el-table-column align="center" prop="remark" label="备注" width="120">
          <template slot-scope="scope">
            <span><el-input v-model="scope.row.remark" @keyup.enter.native="clickEnter(2)" class="remark-input" style="padding-left: 10px;width: 100%;height: 25px;"></el-input></span>
          </template>
        </el-table-column>
        <el-table-column align="center" prop="remark"  label="操作"  width="50">
          <template slot-scope="scope">
            <i class="el-icon-delete hover" v-if="!isSelectStu(scope.row)"  @click="removeRow(scope.$index)"/>
          </template>
        </el-table-column>
      </el-table>
      <div style="width: 100%;margin-top: 10px;" align="center">
        <el-button-group>
          <el-button size="mini" type="info" @click="cancel" icon="el-icon-close">取消</el-button>
          <el-button size="mini" type="primary" @click="save"  icon="el-icon-fa-save">保存</el-button>
        </el-button-group>
      </div>


    </el-card>
    <el-dialog :modal="false"  title="数据引用" width="950px" :visible.sync="quoteOpen">
      <el-row :gutter="10">
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
            <el-table :data="examBespeak" :height="440" @select="selectListHandle" @select-all="selectListHandle" border highlight-current-row stripe fit v-loading="examBespeakLoading" element-loading-text="给我一点时间">
              <el-table-column type="selection" width="35" fixed></el-table-column>
              <el-table-column align="center" prop="name" label="学员"></el-table-column>
              <el-table-column align="center" prop="idNumber" label="身份证"></el-table-column>
              <el-table-column align="center" prop="motorcycleType" label="车型"></el-table-column>
            </el-table>
          </el-card>
        </el-col>
      </el-row>
      <div style="padding: 10px 20px;">
        <el-button size="mini" type="primary" style="float: right" @click="quoteExam"  icon="el-icon-share">引用</el-button>
      </div>
    </el-dialog>


  </div>
</template>

<script>
  import { removeAllSpace } from '@/utils/validate'
  import { mapGetters } from 'vuex'
  import { fetchStudentList } from '@/api/student/student'
  import { getPage, getObj, addObj, putObj, getNum, auditor } from '@/api/finance/payment'
  import { getList } from '@/api/finance/payment-code'
  import { parseTime } from '@/utils/index'
  import { examFetchList } from '@/api/student/examnote'
  import { getBatchs } from '@/api/student/batch'

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
        this.addList = [{}]
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
        addList: [{}],
        list: [],
        studentList: {},
        batch: {},
        codeList: [],
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
      cellcb(row) {
        var clazz = ''
        if (row.row.serialNumber === null) {
          clazz += 'myCell'
        }
        return clazz
      },
      addcellcb(row) {
        var clazz = ''
        var inputList = [1, 5, 6]
        if (inputList.indexOf(row.columnIndex) > -1) {
          clazz += 'no-pd-cell'
          if (row.rowIndex % 2 === 1) {
            clazz += ' e8e8e5'
          }
        }
        return clazz
      },
      getList() {
        this.listLoading = true
        getPage(this.listQuery).then(response => {
          this.list = response.data.data.list
          this.total = response.data.data.totalCount
          console.log(this.list)
          this.listLoading = false
        })
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
      isSelectStu(row) {
        if (row.studentId) {
          return false
        } else {
          return true
        }
      },
      openQuote() {
        this.quoteOpen = true
        this.getBatchList()
      },
      clickEnter(state) {
        if (state === 1) {
          var index = this.addList.length - 2
          var input = document.getElementsByClassName('remark-input')
          input[index].children[0].focus()
        } else if (state === 2) {
          var select = document.getElementsByClassName('student-search')
          select[0].children[0].children[0].focus()
        }
        // student-search  remark-input
      },
      studentChange(row) {
        var student = this.getStudent(row.studentId)
        if (student) {
          if (this.payment.code) {
            var that = this
            getNum({ studentIds: student.studentId + ',', code: that.payment.code }).then(response => {
              row.name = student.name
              row.idNumber = student.idNumber
              row.motorcycleType = student.motorcycleType
              row.num = response.data.data['stu_' + student.studentId]
              row.money = this.payment.money
              this.addList.push({})
              var index = this.addList.length - 2
              var div = document.getElementsByClassName('money-input')
              div[index].children[0].focus()
            })
          } else {
            this.addList = [{}]
            this.$message.error('请选择支付类型!')
          }
        }
      },
      quoteExam() {
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
              this.quoteSource = parseTime(this.batch.examTime, '{y}/{m}/{d}') + this.batch.examField
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
        this.payment.paytime = parseTime(new Date(), '{y}-{m}-{d}')
        this.showPage = 'info'
        this.idEdit = true
      },
      edit() {
        this.showPage = 'info'
        this.idEdit = true
        this.studentList = [{ studentId: this.payment.studentId, name: this.payment.name, idNumber: this.payment.idNumber }]
        this.codeList = [{ code: this.payment.code, content: this.payment.content, money: this.payment.money }]
      },
      cancel() {
        this.btnLoading = false
      },
      save() {
        var list = this.getAddList()
        if (!this.payment.code) {
          this.$message.error('请选择支付类型!')
        } else if (!this.payment.payee) {
          this.$message.error('请选择收款单位!')
        // } else if (!this.payment.mode) {
        //   this.$message.error('请选择支付方式!')
        } else if (list.length === 0) {
          this.$message.error('请选择学员!')
        } else {
          this.payment.studentList = list
          console.log('payment-save', this.payment)
          if (this.payment.payId) {
            this.update()
          } else {
            this.create()
          }
        }
      },
      getAddList() {
        var list = []
        this.addList.forEach(function(ietm) {
          if (ietm.studentId) {
            list.push(ietm)
          }
        })
        return list
      },
      create() {
        addObj(this.payment).then(() => {
          this.cancel()
        })
      },
      update() {
        putObj(this.payment).then(() => {
          this.cancel()
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
