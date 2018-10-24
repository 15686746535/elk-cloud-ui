<template>
  <div class="" style="height: 100%;padding: 5px" >
    <el-card body-style="padding:10px 20px;" style="margin-bottom: 5px;height: 50px;" >
      <el-radio-group @change="handleSubject" size="mini" v-if="!gradeInfo" v-model="batchListQuery.subject">
        <el-radio-button label="1">科目一</el-radio-button>
        <el-radio-button label="2">科目二</el-radio-button>
        <el-radio-button label="3">科目三</el-radio-button>
        <el-radio-button label="4">科目四</el-radio-button>
      </el-radio-group>
      <el-select v-model="studentListQuery.examState" v-if="!gradeInfo"  class="select-lines" @change="searchClick"  size="mini"  placeholder="" style="width: 150px;">
        <el-option v-for="state in stateList" :key="state.value" :label="state.label" :value="state.value"> </el-option>
      </el-select>
      <el-input @keyup.enter.native="searchClick" size="mini" placeholder="姓名/电话/身份证" v-model="studentListQuery.condition" style="width: 150px;"></el-input>
      <el-button type="primary" size="mini" @click="searchClick" ><i class="el-icon-search"></i> 搜 索</el-button>
    </el-card>
    <el-row :gutter="5"  >
      <el-col style="width:230px;">
        <el-card v-loading="batchListLoading" body-style="padding-bottom: 0px;" element-loading-text="我已经全速加载了...">
          <span style="font-size: 16px;font-family: '微软雅黑 Light';color:rgb(145,145,145)">┃ 批次总览</span>
          <div style="margin: 20px 0 10px 0;overflow: auto;" :style="{height: (pageHeight - 190) + 'px'}">
            <div v-for="batch in batchList">
              <div class="batchCss" @click="batchClick($event,batch)" :class="gradeInfo?'batchCss_selected':''" :title="batch.examField" style="overflow: hidden;text-overflow:ellipsis;">
                {{batch.examTime | parseTime('{y}/{m}/{d}')}}{{batch.examField}}
              </div>
            </div>
          </div>
          <div class="loading-more" v-if="!gradeInfo">
            <span v-if="batchTotalPage > batchListQuery.page" @click="batchHandleCurrentChange"><i class="el-icon-fa-angle-double-down"></i></span>
            <span v-else>到底了</span>
          </div>
        </el-card>
      </el-col>
      <el-col :style="{width: (pageWidth-238) + 'px'}">
        <el-card body-style="padding-bottom: 10px;">
          <el-table :data="gradeStudentList" empty-text="暂无数据" v-loading="studentListLoading" @select="selectRow" @select-all="selectRow"  :height="pageHeight - 190"
                    :stripe="true" element-loading-text="给我一点时间" border fit highlight-current-row style="width: 100%;text-align: center;">
            <el-table-column type="selection" width="35" fixed></el-table-column>
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

            <el-table-column align="center" label="期数" width="100">
              <template slot-scope="scope">
                <span>{{scope.row.periods}}</span>
              </template>
            </el-table-column>
            <el-table-column align="center" label="车型" width="60">
              <template slot-scope="scope">
                <span>{{scope.row.motorcycleType}}</span>
              </template>
            </el-table-column>


            <el-table-column align="center" label="考试日期" width="100">
              <template slot-scope="scope">
                <span>{{scope.row.examTime | subTime}}</span>
              </template>
            </el-table-column>

            <el-table-column align="center" label="状态">
              <template slot-scope="scope">
                <el-tag type="info" size="mini"  color v-if="scope.row.examState == 0">未登记</el-tag>
                <el-tag type="success" size="mini" color v-if="scope.row.examState == 1">通过</el-tag>
                <el-tag type="danger" size="mini" v-else-if="scope.row.examState == 2">失败</el-tag>
                <el-tag type="warning" size="mini" color v-if="scope.row.examState == 3">缺考</el-tag>
              </template>
            </el-table-column>
            <el-table-column align="center" label="欠费" width="60">
              <template slot-scope="scope">
                <span>{{scope.row.arrearage}}</span>
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
            <el-table-column align="center" v-if="studentListQuery.examState === 'exam_note_pass'" label="场训教练" width="90">
              <template slot-scope="scope">
                <span>{{scope.row.fieldCoach}}</span>
              </template>
            </el-table-column>
            <el-table-column align="center" v-if="studentListQuery.examState === 'exam_note_pass'" label="路训教练" width="90">
              <template slot-scope="scope">
                <span>{{scope.row.roadCoach}}</span>
              </template>
            </el-table-column>

            <el-table-column align="center" label="操作" >
              <template slot-scope="scope">
                <el-tooltip placement="bottom" effect="dark">
                  <div slot="content">
                    <div style="margin: 3px 0"><el-button v-show="!(scope.row.examState == 1)" type="success" size="mini" @click="examEdit(scope.row, '1')">通过</el-button></div>
                    <div style="margin: 3px 0"><el-button v-show="!(scope.row.examState == 2)" type="danger" size="mini" @click="examEdit(scope.row, '2')">失败</el-button></div>
                    <div style="margin: 3px 0"><el-button v-show="!(scope.row.examState == 3)" type="warning" size="mini" @click="examEdit(scope.row, '3')">缺考</el-button></div>
                    <div style="margin: 3px 0"><el-button type="info" size="mini" @click="examEdit(scope.row, '0')">撤 销</el-button></div>
                  </div>
                  <el-button size="mini" type="primary" plain>编 辑</el-button>
                </el-tooltip>
              </template>
            </el-table-column>

          </el-table>
          <div class="pagination-container" style="margin-top: 20px;">
            <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange"
                           :current-page.sync="studentListQuery.page" background
                           :page-sizes="[10,20,30, 50]" :page-size="studentListQuery.limit"
                           style="float:left;padding-bottom: 10px;"
                           layout="total, sizes, prev, pager, next, jumper" :total="studentTotal">
            </el-pagination>

            <div style="float: right;" >
              <el-button size="small" v-if="studentListQuery.examState === 'exam_note_pass'" :loading="expLoading"
                         @click="openCoach" type="success"><i class="el-icon-fa-user"></i> 分配教练</el-button>
              <el-button size="small" :loading="expLoading"  @click="exportAchievement" type="info"><i class="el-icon-download"></i> 导 出</el-button>
            </div>
          </div>
        </el-card>

      </el-col>
    </el-row>

    <el-dialog :modal="false" width="550px" title="选择教练" :visible.sync="innerGradeOption" append-to-body>
      <Coach v-show="batchListQuery.subject == 1" v-model="stuCoach.fieldCoach" coachType="field" placeholder="场训教练"></Coach>
      <Coach v-show="batchListQuery.subject == 2" v-model="stuCoach.roadCoach" coachType="road"  placeholder="路训教练"></Coach>
      <div slot="footer">
        <el-button size="small" @click="innerGradeOption = false">取 消</el-button>
        <el-button type="primary" size="small" :loading="btnLoading" @click="updateCoach">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
  import { examFetchList, updateCoach, putRowExamNote, exportAchievement } from '@/api/student/examnote'
  import { getBatchs } from '@/api/student/batch'
  import { mapGetters } from 'vuex'
  import Coach from '@/components/Coach'

export default {
    name: 'table_batch',
    components: {
      Coach
    },
    data() {
      return {
        gradeStudentList: [],
        batchList: [],
        studentTotal: 0,
        batchTotalPage: 1,
        stuCoach: {
          roadCoach: null,
          fieldCoach: null,
          stuList: []
        },
        studentListQuery: {
          page: 1,
          limit: 20,
          subject: 1,
          examId: null,
          examState: 'exam_note_false'
        },
        batchListQuery: {
          page: 1,
          limit: 16,
          /* 今天以前传 before   今天之后传 after */
          scope: 'before',
          subject: '1'
        },
        stateList: [
          { label: '未登记', value: 'exam_note_false' },
          { label: '已登记', value: 'exam_note_true' },
          { label: '通过', value: 'exam_note_pass' },
          { label: '失败', value: 'exam_note_fail' }
        ],
        studentListLoading: false,
        innerGradeOption: false,
        batchListLoading: false,
        expLoading: false,
        gradeEdit: false,
        pageHeight: this.area[1],
        pageWidth: this.area[0],
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
        /* 修改状态的参数 */
        examParameter: {
          examNoteList: [],
          examStateOld: null,
          examState: null
        }
      }
    },
    props: {
      layerid: String,
      gradeInfo: Object,
      area: Array
    },
    watch: {
      area: function(val) {
        this.pageHeight = val[1]
        this.pageWidth = val[0]
      }
    },
    created() {
      if (this.gradeInfo) {
        this.batchListQuery.subject = this.gradeInfo.subject
        this.studentListQuery.examId = this.gradeInfo.examId
        if (this.gradeInfo.examState === '0') {
          this.studentListQuery.examState = 'exam_note_false'
        } else {
          this.studentListQuery.examState = 'exam_note_true'
        }
        this.studentListQuery.condition = this.gradeInfo.condition
        var list = []
        list.push(this.gradeInfo)
        this.batchList = list
        this.getGradeList()
      } else {
        this.getBatchList()
      }
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
        if (this.studentListQuery.examId) {
          examFetchList(this.studentListQuery).then(response => {
            if (response.data.code === 0) {
              this.gradeStudentList = response.data.data.list
              this.studentTotal = response.data.data.totalCount
              this.studentListLoading = false
            }
          })
        } else {
          var that = this
          setTimeout(function() {
            that.studentListLoading = false
          }, 600)
        }
      },
      getBatchList() {
        this.batchListLoading = true
        getBatchs(this.batchListQuery).then(response => {
          this.batchList = this.batchList.concat(response.data.data.list)
          this.batchTotalPage = response.data.data.totalPage
          this.batchListLoading = false
        })
      },
      selectRow(selection) {
        var stuList = []
        if (selection && selection.length > 0) {
          selection.forEach(function(item) {
            stuList.push(item.studentId)
          })
        }
        this.stuCoach.stuList = stuList
      },
      openCoach() {
        if (this.stuCoach.stuList && this.stuCoach.stuList.length > 0) {
          this.innerGradeOption = true
        } else {
          this.$message.error('请选择学员!')
        }
      },
      updateCoach() {
        if (this.batchListQuery.subject === '1') {
          this.stuCoach.roadCoach = null
        } else {
          this.stuCoach.fieldCoach = null
        }
        updateCoach(this.stuCoach).then(() => {
          this.getGradeList()
          this.innerGradeOption = false
          this.btnLoading = false
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
      },
      /* 根据科目查询 */
      handleSubject() {
        this.cleanBatchSelected()
        this.studentListQuery.page = 1
        this.batchListQuery.page = 1
        this.studentListQuery.examId = null
        this.studentListQuery.subject = this.batchListQuery.subject
        this.gradeStudentList = []
        this.batchList = []
        this.getBatchList()
      },
      /* 搜索方法 */
      searchClick() {
        this.studentListQuery.page = 1
        this.getGradeList()
      },
      /* 控制批次点击样式 */
      batchClick(e, batch) {
        this.studentListQuery.examId = batch.examId
        var a = document.getElementsByClassName('batchCss')
        for (var i = 0; i < a.length; i++) {
          a[i].classList.remove('batchCss_selected')
        }
        e.currentTarget.classList.add('batchCss_selected')
        this.getGradeList()
      },
      /* 清除批次样式 */
      cleanBatchSelected() {
        var a = document.getElementsByClassName('batchCss')
        for (var i = 0; i < a.length; i++) {
          a[i].classList.remove('batchCss_selected')
        }
      },
      examRowOperation(state) {
        this.examParameter.examState = state
        this.examParameter.subject = this.batchListQuery.subject
        putRowExamNote(this.examParameter).then(() => {
          this.getGradeList()
          this.gradeEdit = false
        })
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
            this.examRowOperation(state)
          })
        } else {
          this.examRowOperation(state)
        }
      },
      exportAchievement() {
        if (this.gradeStudentList.length === 0) {
          this.$message.info('暂无数据')
        } else {
          this.$store.dispatch('pushProhibit', this.layerid)
          this.expLoading = true
          exportAchievement(this.studentListQuery).then(response => {
            var time = new Date()
            var blob = new Blob([response.data], { type: 'application/x-xls;charset=utf-8' })
            var downloadElement = document.createElement('a')
            var href = window.URL.createObjectURL(blob) // 创建下载的链接
            downloadElement.href = href
            downloadElement.download = '考试成绩(' + time.toLocaleString() + ').xls' // 下载后文件名
            document.body.appendChild(downloadElement)
            downloadElement.click() // 点击下载
            document.body.removeChild(downloadElement) // 下载完成移除元素
            window.URL.revokeObjectURL(href) // 释放掉blob对象
            this.expLoading = false
            this.$store.dispatch('removeProhibit', this.layerid)
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
