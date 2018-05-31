<template>
  <div class="app-container calendar-list-container" :style="{height: $store.state.app.client.height + 'px'}" >
    <el-card body-style="padding:10px 20px;" style="margin-bottom: 5px;height: 50px" :style="{width: (client.width) + 'px'}">
      <el-row :gutter="5">
        <el-col :xs="7" :sm="7" :md="8" :lg="12" :xl="13">
          <el-radio-group @change="handleSubject" size="mini" v-model="batchListQuery.subject">
            <el-radio-button label="1">科目一</el-radio-button>
            <el-radio-button label="2">科目二</el-radio-button>
            <el-radio-button label="3">科目三</el-radio-button>
            <el-radio-button label="4">科目四</el-radio-button>
          </el-radio-group>
        </el-col>
        <el-col :xs="8" :sm="8" :md="8" :lg="6" :xl="6">
          <el-date-picker value-format="timestamp" v-model="interval" type="daterange" align="left" size="mini" style="width: 100%" unlink-panels range-separator="-" start-placeholder="开始日期"
                          end-placeholder="结束日期" :picker-options="pickerOptions">
          </el-date-picker>
        </el-col>
        <el-col :xs="6" :sm="6" :md="5" :lg="4" :xl="4">
          <el-input @keyup.enter.native="searchClick" size="mini" placeholder="姓名/电话/身份证" v-model="studentListQuery.condition"></el-input>
        </el-col>
        <el-col :xs="3" :sm="3" :md="3" :lg="2" :xl="1">
          <el-button type="primary" size="mini" @click="searchClick" ><i class="el-icon-search"></i> 搜 索</el-button>
        </el-col>
      </el-row>
    </el-card>
    <el-row :gutter="5" :style="{height: ($store.state.app.client.height - 95) + 'px'}">
      <el-col style="width: 230px;">
        <el-card v-loading="batchListLoading" body-style="padding-bottom: 0px;" element-loading-text="我已经全速加载了...">
          <span style="font-size: 16px;font-family: '微软雅黑 Light';color:rgb(145,145,145)">┃ 批次总览</span>
          <div style="margin: 20px 0 10px 0;overflow: auto;" :style="{height: ($store.state.app.client.height - 190) + 'px'}">
            <div v-for="batch in batchList">
              <div class="batchCss" @click="batchClick($event,batch)">
                <{{batch.examTime | subTime}}> {{batch.examField}}
              </div>
            </div>
          </div>
          <div class="loading-more">
            <span v-if="batchTotalPage > batchListQuery.page" @click="batchHandleCurrentChange"><i class="el-icon-fa-angle-double-down"></i></span>
            <span v-else>到底了</span>
            <!--<el-button type="primary" size="mini" style="float: right" @click="batchHandleCurrentChange">加载更多</el-button>-->
            <!--<el-pagination-->
              <!--small-->
              <!--@current-change="batchHandleCurrentChange"-->
              <!--layout="prev, pager, next"-->
              <!--:current-page="batchListQuery.page"-->
              <!--:page-size="batchListQuery.limit"-->
              <!--:total="batchTotal">-->
            <!--</el-pagination>-->
          </div>
        </el-card>
      </el-col>
      <el-col :style="{width: (client.width-225) + 'px'}">
        <el-card>
          <el-table :data="gradeStudentList" v-loading="studentListLoading"  :height="$store.state.app.client.height - 190" :stripe="true" element-loading-text="给我一点时间" border fit highlight-current-row style="width: 100%;text-align: center;">
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

            <!--<el-table-column align="center" label="科目">-->
              <!--<template slot-scope="scope">-->
                <!--<span>{{scope.row.subject == 1?'科目一':scope.row.subject == 2?'科目二':scope.row.subject == 3?'科目三':scope.row.subject == 4?'科目四':''}}</span>-->
              <!--</template>-->
            <!--</el-table-column>-->

            <!--<el-table-column align="center" label="批次" width="195">-->
              <!--<template slot-scope="scope">-->
                <!--<span><{{scope.row.examTime | subTime}}> {{scope.row.examField}}</span>-->
              <!--</template>-->
            <!--</el-table-column>-->

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
                <el-tooltip placement="bottom" effect="dark">
                  <div slot="content">
                    <div style="margin: 3px 0"><el-button v-show="!(scope.row.examState == 1)" type="success" size="mini" @click="examEdit(scope.row, '1')">通过</el-button></div>
                    <div style="margin: 3px 0"><el-button v-show="!(scope.row.examState == 2)" type="danger" size="mini" @click="examEdit(scope.row, '2')">失败</el-button></div>
                    <div style="margin: 3px 0"><el-button v-show="!(scope.row.examState == 3)" type="warning" size="mini" @click="examEdit(scope.row, '3')">缺考</el-button></div>
                  </div>
                  <el-button size="mini" type="primary" plain>编 辑</el-button>
                </el-tooltip>
                <el-button size="mini" type="danger"  @click="examEdit(scope.row, '0')" >撤 销</el-button>
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

            <div style="float: right" >
              <el-button size="small" :loading="expLoading"  @click="exportAchievement" type="info"><i class="el-icon-download"></i> 导 出</el-button>
              <el-button size="small" @click="createClick" type="primary"><i class="el-icon-plus"></i> 添 加</el-button>
            </div>
          </div>
        </el-card>

        <el-dialog @close="getGradeList" width="550px" title="成绩修改" :visible.sync="gradeEdit">
          <el-button-group>
            <el-button type="success" size="small" @click="passExam">通 过</el-button>
            <el-button type="danger" size="small" @click="examOperation('2')">失 败</el-button>
            <el-button type="warning"  size="small" @click="examOperation('3')">缺 考</el-button>
          </el-button-group>
          <div slot="footer">
            <el-button-group>
              <el-button type="info">取消</el-button>
              <el-button type="primary">确定</el-button>
            </el-button-group>
          </div>
        </el-dialog>

        <el-dialog @close="getGradeList" title="成绩登记" :visible.sync="gradeOption">

          <el-table :data="notGradeStudentList" :height="($store.state.app.client.height/2)" v-loading="gradeOptionLoading"  @selection-change="handleSelectionChange" :stripe="true" element-loading-text="给我一点时间" border fit highlight-current-row style="width: 100%;text-align: center;">
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
          <el-dialog width="550px" title="选择教练" :visible.sync="innerGradeOption" append-to-body>

            <Coach v-show="batchListQuery.subject == 1" v-model="examParameter.fieldCoach" coachType="field" placeholder="场训教练"></Coach>
            <Coach v-show="batchListQuery.subject == 2" v-model="examParameter.roadCoach" coachType="road"  placeholder="路训教练"></Coach>

            <div slot="footer">
              <el-button size="small" @click="innerGradeOption = false">取 消</el-button>
              <el-button type="primary" size="small" :loading="btnLoading" @click="examOperation('1')">确 定</el-button>
            </div>
          </el-dialog>
          <div slot="footer">
            <el-button type="success" size="small" :loading="btnLoading" @click="passExam">通 过</el-button>
            <el-button type="danger" size="small" :loading="btnLoading" @click="examOperation('2')">失 败</el-button>
            <el-button type="warning" size="small" :loading="btnLoading" @click="examOperation('3')">缺 考</el-button>
          </div>
        </el-dialog>

        <el-dialog width="550px" title="选择教练" :visible.sync="innerGradeOption1" append-to-body>

          <Coach v-show="batchListQuery.subject == 1"  v-model="examParameter.fieldCoach" coachType="field" placeholder="场训教练"></Coach>
          <Coach v-show="batchListQuery.subject == 2" v-model="examParameter.roadCoach" coachType="road"  placeholder="路训教练"></Coach>

          <div slot="footer">
            <el-button size="small"  @click="innerGradeOption1 = false">取 消</el-button>
            <el-button type="primary" size="small" :loading="btnLoading" @click="examOperation('1')">确 定</el-button>
          </div>
        </el-dialog>

      </el-col>
    </el-row>
  </div>
</template>

<script>
  import { examFetchList, putExamNote, exportAchievement } from '@/api/student/examnote'
  import { getBatchs } from '@/api/student/batch'
  import { mapGetters } from 'vuex'
  import { removeAllSpace } from '@/utils/validate'
  import Coach from '@/components/Coach'

export default {
    name: 'table_batch',
    components: {
      Coach
    },
    data() {
      return {
        gradeStudentList: [],
        notGradeStudentList: [],
        batchList: [],
        studentTotal: 0,
        batchTotalPage: 1,
        studentListQuery: {
          page: 1,
          limit: 20,
          subject: 1,
          examId: null,
          examState: null
        },
        batchListQuery: {
          page: 1,
          limit: 16,
          /* 今天以前传 before   今天之后传 after */
          scope: 'before',
          subject: '1'
        },
        studentListLoading: false,
        batchListLoading: true,
        gradeOption: false,
        expLoading: false,
        innerGradeOption: false,
        innerGradeOption1: false,
        gradeEdit: false,
        gradeOptionLoading: false,
        btnLoading: false,
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
          examNoteList: [],
          examStateOld: null,
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
        examFetchList(this.studentListQuery).then(response => {
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
        getBatchs(this.batchListQuery).then(response => {
          console.log('========== Batch数据 ==========')
          console.log(response.data)
          this.batchList = this.batchList.concat(response.data.data.list)
          this.batchTotalPage = response.data.data.totalPage
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
      batchHandleCurrentChange() {
        this.batchListQuery.page = this.batchListQuery.page + 1
        this.getBatchList()
        // this.cleanBatchSelected()
      },
      /* 根据科目查询 */
      handleSubject() {
        this.cleanBatchSelected()
        this.studentListQuery.page = 1
        this.batchListQuery.page = 1
        this.studentListQuery.examId = null
        this.studentListQuery.subject = this.batchListQuery.subject
        this.gradeStudentList = []
        this.notGradeStudentList = []
        this.batchList = []
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
        if (this.studentListQuery.examId) {
          this.gradeOption = true
          this.gradeOptionLoading = true
          this.studentListQuery.examState = 'exam_note_false'
          examFetchList(this.studentListQuery).then(response => {
            console.log('========== 数据 ==========')
            console.log(response.data)
            if (response.data.code === 0) {
              this.notGradeStudentList = response.data.data.list
              this.studentTotal = response.data.data.totalCount
              this.examParameter.examStateOld = '0'
              this.gradeOptionLoading = false
            } else {
              console.log('这里是错误信息：' + response.data.msg)
            }
          })
        } else {
          this.$alert('请先选择批次', '提示', {
            confirmButtonText: '确定',
            type: 'warning'
          })
        }
      },
      handleSelectionChange(val) {
        this.examParameter.examNoteList = []
        for (var i = 0; i < val.length; i++) {
          this.examParameter.examNoteList.push({ 'examId': val[i].examId, 'studentId': val[i].studentId })
        }
        console.log(val)
        console.log(this.examParameter.examNoteList)
      },
      /* 控制批次点击样式 */
      batchClick(e, batch) {
        this.studentListQuery.examId = batch.examId
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
      passExam() {
        if (this.examParameter.examNoteList.length === 0) {
          this.$message.warning('请选择学员')
        } else {
          if (this.batchListQuery.subject === '3' || this.batchListQuery.subject === '4') {
            this.examOperation('1')
          } else {
            this.innerGradeOption = true
          }
        }
      },
      examOperation(state) {
        if (this.examParameter.examNoteList.length === 0) {
          this.$message.warning('请选择学员')
        } else {
          this.examParameter.examState = state
          this.examParameter.subject = this.batchListQuery.subject
          console.log(this.examParameter)
          this.btnLoading = true
          putExamNote(this.examParameter).then(() => {
            this.getGradeList()
            this.gradeOption = false
            this.innerGradeOption = false
            this.btnLoading = false
            this.innerGradeOption1 = false
            this.gradeEdit = false
          })
        }
      },
      examEdit(row, state) {
        this.examParameter.examNoteList = []
        this.examParameter.examNoteList.push({ 'examId': row.examId, 'studentId': row.studentId })
        this.examParameter.examId = row.examId
        this.examParameter.examStateOld = row.examState
        if (state === '0') {
          this.$confirm('是否撤销该学员成绩?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {
            this.examOperation(state)
          })
        } else if (state === '1' && !(this.batchListQuery.subject === '3' || this.batchListQuery.subject === '4')) {
          this.innerGradeOption1 = true
        } else {
          this.examOperation(state)
        }
      },
      /* 时间转换方法 */
      intervalTime() {
        console.log('================== 时间转换 ===================')
        if (this.interval.length !== 0) {
          this.studentListQuery.examId = null
          this.cleanBatchSelected()
          this.studentListQuery.beginTime = this.interval[0]
          this.studentListQuery.endTime = this.interval[1]
        } else {
          this.studentListQuery.beginTime = null
          this.studentListQuery.endTime = null
        }
      },
      exportAchievement(){
        if (this.gradeStudentList.length === 0) {
          this.$message.info('暂无数据')
        } else {
          this.expLoading = true
          exportAchievement(this.studentListQuery).then(response => {
            console.log(response)
            let time = new Date()
            let blob = new Blob([response.data], { type: 'application/x-xls' })
            let link = document.createElement('a')
            link.href = window.URL.createObjectURL(blob)
            link.download = '考试成绩(' + time.toLocaleString()+ ').xls'
            link.click()
            this.expLoading = false
          })
        }
      }
    }
  }
</script>
<style rel="stylesheet/scss" lang="scss" scoped>
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
</style>
