<template>
  <div class="app-container calendar-list-container" :style="{height: client.height + 'px'}" >
    <el-card style="margin-bottom: 5px;height: 80px">
      <div class="filter-container">

        <el-radio-group @change="handleSubject" v-model="batchListQuery.subject">
          <el-radio-button label="1">科目一</el-radio-button>
          <el-radio-button label="2">科目二</el-radio-button>
          <el-radio-button label="3">科目三</el-radio-button>
          <el-radio-button label="4">科目四</el-radio-button>
        </el-radio-group>
        <!--<div style="height: 60px; border-bottom: 1px solid #b3d8ff;float: left">-->
          <!--<div @click="handleSubject('1',$event)" style="border-radius: 4px 0 0 4px;" class="subjectBtn subjectBtn_selected" >科目一</div>-->
          <!--<div @click="handleSubject('2',$event)" style="border-radius: 0;" class="subjectBtn" >科目二</div>-->
          <!--<div @click="handleSubject('3',$event)" style="border-radius: 0;" class="subjectBtn" >科目三</div>-->
          <!--<div @click="handleSubject('4',$event)" style="border-radius: 0 4px 4px 0;" class="subjectBtn" >科目四</div>-->
        <!--</div>-->
        <div style="float: right">
          <el-date-picker v-model="interval" type="daterange" align="right" style="margin-bottom: 0px;" unlink-panels range-separator="-" start-placeholder="开始日期" end-placeholder="结束日期" :picker-options="pickerOptions">
          </el-date-picker>
          <el-input @keyup.enter.native="searchClick" style="width: 200px;margin-bottom: 0px;" class="filter-item" placeholder="姓名/电话/身份证" v-model="studentListQuery.condition"></el-input>
          <el-button type="primary" v-waves @click="searchClick" ><i class="el-icon-search"></i>搜索</el-button>
        </div>
      </div>
    </el-card>
    <el-row :gutter="5" :style="{height: (client.height - 125) + 'px'}">
      <el-col :span="3">
        <el-card>
          <span style="font-size: 16px;font-family: '微软雅黑 Light';color:rgb(145,145,145)">┃ 批次总览</span>
          <div style="margin: 20px 0 10px 0;overflow: auto;" :style="{height: (client.height - 250) + 'px'}">
            <div v-for="batch in batchList">
              <div class="batchCss" @click="batchClick($event,batch)">
                {{batch.batch}}
              </div>
            </div>
          </div>
          <div class="pagination-container" style="margin-top: 20px">
            <el-pagination
              small
              @current-change="batchHandleCurrentChange"
              layout="prev, pager, next"
              :current-page="batchListQuery.page"
              :page-size="batchListQuery.limit"
              :total="batchTotal">
            </el-pagination>
          </div>
        </el-card>
      </el-col>
      <el-col :span="21">
        <el-card>
          <el-table :data="gradeStudentList" v-loading="studentListLoading"  :height="client.height - 225" :stripe="true" element-loading-text="给我一点时间" border fit highlight-current-row style="width: 100%;text-align: center;">
            <!--<el-table-column type="selection" fixed="left" class="selection" align="center" prop='uuid'></el-table-column>-->
            <el-table-column type="index" fixed="left" label="序号"  align="center" width="50"></el-table-column>

            <el-table-column align="center"  fixed="left"  label="姓名">
              <template slot-scope="scope">
                <span>{{scope.row.name}}</span>
              </template>
            </el-table-column>

            <el-table-column align="center" label="电话" width="120">
              <template slot-scope="scope">
                <span>{{scope.row.mobile}}</span>
              </template>
            </el-table-column>

            <el-table-column  align="center" label="身份证" width="170">
              <template slot-scope="scope">
                <span>{{scope.row.idNumber}}</span>
              </template>
            </el-table-column>

            <el-table-column align="center" label="科目">
              <template slot-scope="scope">
                <span>{{scope.row.subject == 1?'科目一':scope.row.subject == 2?'科目二':scope.row.subject == 3?'科目三':scope.row.subject == 4?'科目四':''}}</span>
              </template>
            </el-table-column>

            <el-table-column align="center" label="批次" width="195">
              <template slot-scope="scope">
                <span>{{scope.row.batch}}</span>
              </template>
            </el-table-column>

            <el-table-column align="center" label="期数" width="100">
              <template slot-scope="scope">
                <span>{{scope.row.periods}}</span>
              </template>
            </el-table-column>


            <el-table-column align="center" label="考试日期" width="100">
              <template slot-scope="scope">
                <span>{{scope.row.examTime | subTime}}</span>
              </template>
            </el-table-column>

            <el-table-column align="center" label="状态">
              <template slot-scope="scope">
                <el-tag type="success" color v-if="scope.row.examState == 1">通过</el-tag>
                <el-tag type="danger" v-else-if="scope.row.examState == 2">失败</el-tag>
                <el-tag type="warning" color v-else>缺考</el-tag>
              </template>
            </el-table-column>

            <el-table-column align="center" label="通过日期" width="100">
              <template slot-scope="scope">
                <span>{{scope.row.passTime | subTime}}</span>
              </template>
            </el-table-column>

            <el-table-column align="center" label="失败日期" width="100">
              <template slot-scope="scope">
                <span>{{scope.row.failTime | subTime}}</span>
              </template>
            </el-table-column>

            <el-table-column align="center" label="缺考日期" width="100">
              <template slot-scope="scope">
                <span>{{scope.row.missTime | subTime}}</span>
              </template>
            </el-table-column>


            <el-table-column align="center" fixed="right" label="操作" width="160">
              <template slot-scope="scope">
                <el-button size="mini" type="primary" @click="examEdit(scope.row, null)" plain>编 辑</el-button>
                <el-button size="mini" type="danger"  @click="examEdit(scope.row, 0)" >撤 销</el-button>
              </template>
            </el-table-column>

          </el-table>
          <div class="pagination-container" style="margin-top: 20px">
            <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange"
                           :current-page.sync="studentListQuery.page" background
                           :page-sizes="[10,20,30, 50]" :page-size="studentListQuery.limit"
                           style="float:left;"
                           layout="total, sizes, prev, pager, next, jumper" :total="studentTotal">
            </el-pagination>
            <el-button style="float:right;"  @click="createClick" type="primary"><i class="el-icon-plus"></i>添加</el-button>
          </div>
        </el-card>
        <el-dialog @close="getGradeList" width="30%" title="成绩修改" :visible.sync="gradeEdit">
          <el-button-group>
            <el-button type="success" @click="examOperation(1)">通 过</el-button>
            <el-button type="danger" @click="examOperation(2)">失 败</el-button>
            <el-button type="warning"  @click="examOperation(3)">缺 考</el-button>
          </el-button-group>
          <div slot="footer">
            <el-button-group>
              <el-button type="info">取消</el-button>
              <el-button type="primary">确定</el-button>
            </el-button-group>
          </div>
        </el-dialog>
        <el-dialog @close="getGradeList" title="成绩登记" :visible.sync="gradeOption">

          <el-table :data="notGradeStudentList" :height="(client.height/2)" v-loading="gradeOptionLoading"  @selection-change="handleSelectionChange" :stripe="true" element-loading-text="给我一点时间" border fit highlight-current-row style="width: 100%;text-align: center;">
            <el-table-column type="selection" fixed="left" class="selection" align="center" prop='uuid'></el-table-column>
            <el-table-column type="index" fixed="left" label="序号"  align="center" width="50"></el-table-column>

            <el-table-column align="center" label="姓名">
              <template slot-scope="scope">
                <span>{{scope.row.name}}</span>
              </template>
            </el-table-column>

            <el-table-column align="center" label="电话">
              <template slot-scope="scope">
                <span>{{scope.row.mobile}}</span>
              </template>
            </el-table-column>

            <el-table-column  align="center" label="身份证" width="200">
              <template slot-scope="scope">
                <span>{{scope.row.idNumber}}</span>
              </template>
            </el-table-column>

          </el-table>

          <div slot="footer">
            <el-button type="success" @click="examOperation(1)">通 过</el-button>
            <el-button type="danger" @click="examOperation(2)">失 败</el-button>
            <el-button type="warning"  @click="examOperation(3)">缺 考</el-button>
          </div>
        </el-dialog>
      </el-col>
    </el-row>
  </div>
</template>

<script>
  import { getGrade, getObj, putExamNote } from '@/api/student/grade'
  import { getBatchList, delObj, addObj, putObj } from '@/api/student/batch'
  import { getexambespeakbyid, delexambespeak, putExamBespeak } from '@/api/student/exambespeak'
  import { mapGetters } from 'vuex'
  import Dict from '@/components/Dict'
  import waves from '@/directive/waves/index.js' // 水波纹指令
  import { removeAllSpace } from '@/utils/validate'

  export default {
    name: 'table_batch',
    components: {
      Dict
    },
    directives: {
      waves
    },
    data() {
      return {
        gradeStudentList: [],
        notGradeStudentList: [],
        batchList: [],
        studentTotal: 0,
        batchTotal: 0,
        studentListQuery: {
          page: 1,
          limit: 20,
          subject: 1,
          batchId: null,
          examState: null
        },
        batchListQuery: {
          page: 1,
          limit: 16,
          /* 今天以前传 before   今天之后传 after */
          scope: 'before',
          subject: 1
        },
        studentListLoading: false,
        batchListLoading: true,
        gradeOption: false,
        gradeEdit: false,
        gradeOptionLoading: false,
        pickerOptions: {
          shortcuts: [{
            text: '昨天',
            onClick(picker) {
              const end = new Date(new Date().setHours(0, 0, 0, 0))
              const start = new Date(new Date().setHours(0, 0, 0, 0))
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 1)
              picker.$emit('pick', [start, end])
            }
          }, {
            text: '近三天',
            onClick(picker) {
              const end = new Date()
              const start = new Date()
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 3)
              picker.$emit('pick', [start, end])
            }
          }, {
            text: '本周',
            onClick(picker) {
              const end = new Date()
              const day = new Date(new Date().setHours(0, 0, 0, 0))
              var week = day.getDay()
              if (week === 0) week = 7
              const start = day
              start.setTime(start.getTime() - 3600 * 1000 * 24 * (week - 1))
              picker.$emit('pick', [start, end])
            }
          }, {
            text: '本月',
            onClick(picker) {
              const end = new Date()
              const start = new Date(new Date().setHours(0, 0, 0, 0))
              start.setDate(1)
              picker.$emit('pick', [start, end])
            }
          }]
        },
        interval: [],
        /* 修改状态的参数 */
        examParameter: {
          studentIds: [],
          batchId: null,
          examState: null
        }
      }
    },
    created() {
      this.getBatchList()
    },
    computed: {
      ...mapGetters([
        'permissions',
        'client'
      ])
    },
    methods: {
      getGradeList() {
        this.studentListLoading = true
        console.log('==========  查询学员条件  =-=======')
        console.log(this.studentListQuery)
        this.studentListQuery.examState = 'exam_note_true'
        getGrade(this.studentListQuery).then(response => {
          console.log('========== 数据 ==========')
          console.log(response.data)
          if (response.data.code === 0) {
            this.gradeStudentList = response.data.data.list
            this.studentTotal = response.data.data.totalCount
            this.studentListLoading = false
          } else {
            console.log('这里是错误信息：' + response.data.msg)
          }
        })
      },
      getBatchList() {
        this.batchListLoading = true
        console.log(this.batchListQuery)
        getBatchList(this.batchListQuery).then(response => {
          console.log('========== Batch数据 ==========')
          console.log(response.data)
          this.batchList = response.data.data.list
          this.batchTotal = response.data.data.totalCount
          // if (this.batchList.length > 0) this.studentListQuery.batchId = this.batchList[0].batchId
          // this.getGradeList()
          this.batchListLoading = false
        })
      },
      /* 分页插件方法 */
      handleSizeChange(val) {
        this.studentListQuery.limit = val
        this.getGradeList()
      },
      handleCurrentChange(val) {
        this.studentListQuery.page = val
        this.getGradeList()
      },
      batchHandleCurrentChange(val) {
        this.batchListQuery.page = val
        this.getBatchList()
        this.cleanBatchSelected()
      },
      /* 根据科目查询 */
      handleSubject() {
        this.cleanBatchSelected()
        this.studentListQuery.page = 1
        this.studentListQuery.subject = this.batchListQuery.subject
        // this.batchListQuery.subject = field
        this.gradeStudentList = []
        this.notGradeStudentList = []
        // var a = document.getElementsByClassName('subjectBtn')
        // for (var i = 0; i < a.length; i++) {
        //   a[i].classList.remove('subjectBtn_selected')
        // }
        // e.currentTarget.classList.add('subjectBtn_selected')
        this.getBatchList()
      },
      /* 搜索方法 */
      searchClick() {
        this.studentListQuery.page = 1
        this.intervalTime()
        this.getGradeList()
      },
      /* 添加学员方法 */
      createClick() {
        this.gradeOption = true
        this.gradeOptionLoading = true
        this.studentListQuery.examState = 'exam_note_false'
        getGrade(this.studentListQuery).then(response => {
          console.log('========== 数据 ==========')
          console.log(response.data)
          if (response.data.code === 0) {
            this.notGradeStudentList = response.data.data.list
            this.studentTotal = response.data.data.totalCount
            this.gradeOptionLoading = false
          } else {
            console.log('这里是错误信息：' + response.data.msg)
          }
        })
      },
      handleSelectionChange(val) {
        this.examParameter.studentIds = []
        for (var i = 0; i < val.length; i++) {
          this.examParameter.studentIds.push(val[i].studentId)
        }
        console.log(val)
        console.log(this.examParameter.studentIds)
      },
      /* 控制批次点击样式 */
      batchClick(e, batch) {
        this.studentListQuery.batchId = batch.batchId
        this.examParameter.batchId = batch.batchId
        this.interval = []
        this.studentListQuery.beginTime = null
        this.studentListQuery.endTime = null
        var a = document.getElementsByClassName('batchCss')
        for (var i = 0; i < a.length; i++) {
          a[i].classList.remove('batchCss_selected')
        }
        e.currentTarget.classList.add('batchCss_selected')
        this.studentListQuery.examState = 'exam_note_true'
        this.getGradeList()
      },
      /* 清除批次样式 */
      cleanBatchSelected() {
        var a = document.getElementsByClassName('batchCss')
        for (var i = 0; i < a.length; i++) {
          a[i].classList.remove('batchCss_selected')
        }
      },
      examOperation(state) {
        this.examParameter.examState = state
        console.log(this.examParameter)
        putExamNote(this.examParameter).then(response => {
          this.getGradeList()
          this.$notify({
            title: '成功',
            message: '修改成功',
            type: 'success',
            duration: 2000
          })
          this.gradeOption = false
          this.gradeEdit = false
        })
      },
      examEdit(e, state) {
        this.examParameter.studentIds = []
        this.examParameter.studentIds.push(e.studentId)
        this.examParameter.batchId = e.batchId
        if (state === 0) {
          this.$confirm('是否撤销该学员成绩?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {
            this.examOperation(state)
          })
        } else {
          this.gradeEdit = true
        }
        console.log(e)
      },
      /* 时间转换方法 */
      intervalTime() {
        console.log('================== 时间转换 ===================')
        if (this.interval.length !== 0) {
          this.studentListQuery.batchId = null
          this.cleanBatchSelected()
          this.studentListQuery.beginTime = this.interval[0]
          this.studentListQuery.endTime = this.interval[1]
        } else {
          this.studentListQuery.beginTime = null
          this.studentListQuery.endTime = null
        }
      }
    }
  }
</script>
<style>
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
  .subjectBtn{
    display: inline-block;
    line-height: 1;
    white-space: nowrap;
    cursor: pointer;
    -webkit-appearance: none;
    text-align: center;
    box-sizing: border-box;
    outline: none;
    margin:0 -3px;
    transition: .1s;
    font-weight: 500;
    padding: 12px 20px;
    font-size: 14px;
    border-radius: 4px;
    width: 84px;
    color: #409eff;
    background: #ecf5ff;
    border: 1px solid #b3d8ff;
  }
  .subjectBtn:hover{
    color: #fff;
    background-color: #409eff;
    border-color: #409eff;
  }
  .subjectBtn_selected{
    color: #fff;
    background-color: #409eff;
    border-color: #409eff;
  }
</style>
