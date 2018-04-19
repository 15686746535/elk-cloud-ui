<template>
  <div class="app-container calendar-list-container" :style="{height: $store.state.app.client.height + 'px'}">
    <el-row :gutter="5">
      <el-col class="org-tree-left">
        <el-card>
          <span style="font-size: 16px;font-family: '微软雅黑 Light';color:rgb(145,145,145)">权限筛选</span>
          <my-tree url="/upms/org/tree" v-model="listQuery.orgId"  @node="searchByOrg"></my-tree>
        </el-card>
      </el-col>

      <el-col :style="{width: ($store.state.app.client.width-250) + 'px'}">
        <el-card body-style="padding:10px 20px;" style="height: 70px;line-height: 50px">
          <!--<div style="float: left">-->
            <!--|&nbsp;<span style="font-size: 20px;font-weight: 600;font-family: '微软雅黑 Light'">回访列表</span>-->
          <!--</div>-->

          <div style="height: 60px; border-bottom: 1px solid #b3d8ff;float: left">
            <el-radio-group @change="handleSubject" v-model="listQuery.subject">
              <el-radio-button label="1">科目一</el-radio-button>
              <el-radio-button label="2">科目二</el-radio-button>
              <el-radio-button label="3">科目三</el-radio-button>
            </el-radio-group>
          </div>
          <div style="float: right">
            <el-input @keyup.enter.native="searchClick" style="width: 300px;" class="filter-item" placeholder="姓名/电话/身份证" v-model="listQuery.condition"></el-input>
            <el-button class="filter-item" type="primary"  @click="searchClick">搜索</el-button>
          </div>
        </el-card>
        <el-card style="margin-top: 5px;"  :style="{height: ($store.state.app.client.height-115) + 'px'}">

          <el-table  :height="($store.state.app.client.height-205)" :data="list" v-loading="listLoading" element-loading-text="给我一点时间" border fit highlight-current-row style="width: 100%">
            <!--<el-table-column type="selection" class="selection" align="center" prop='uuid'></el-table-column>-->
            <el-table-column type="index" label="序号"  align="center" width="50"></el-table-column>
            <el-table-column align="center" label="姓名">
              <template slot-scope="scope">
                <span>{{scope.row.name}}</span>
              </template>
            </el-table-column>
            <el-table-column align="center" width="165px" label="身份证">
              <template slot-scope="scope">
                <span>{{scope.row.idNumber}}</span>
              </template>
            </el-table-column>
            <el-table-column align="center" label="性别">
              <template slot-scope="scope">
                <span>{{scope.row.sex | sexFilter}}</span>
              </template>
            </el-table-column>
            <el-table-column align="center" label="车型">
              <template slot-scope="scope">
                <span>{{scope.row.motorcycleType}}</span>
              </template>
            </el-table-column>
            <el-table-column align="center" label="电话">
              <template slot-scope="scope">
                <span>{{scope.row.mobile}}</span>
              </template>
            </el-table-column>
            <el-table-column align="center" label="期数">
              <template slot-scope="scope">
                <span>{{scope.row.periods}}</span>
              </template>
            </el-table-column>
            <!--<el-table-column align="center" width="210px" label="是否回访">
              <template slot-scope="scope">
                <el-tag class="subject">
                  <el-tag v-if="scope.row.revisitFlag == 1" class="pass">已回访</el-tag>
                  <el-tag v-else class="noPass">未回访</el-tag>
                </el-tag>
              </template>
            </el-table-column>-->
            <el-table-column align="center" label="通过时间">
              <template slot-scope="scope">
                <span>{{scope.row.passTime | subTime}}</span>
              </template>
            </el-table-column>

            <el-table-column align="center" width="120px" label="操作">
              <template slot-scope="scope">
                <el-button size="mini" type="success" @click="visitStudent(scope.row)">回 访</el-button>
              </template>
            </el-table-column>

          </el-table>
          <div v-show="!listLoading" class="pagination-container" style="margin-top: 20px">
            <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange"
                           :current-page.sync="listQuery.page" background
                           :page-sizes="[10,20,30, 50]" :page-size="listQuery.limit"
                           layout="total, sizes, prev, pager, next, jumper" :total="total">
            </el-pagination>
          </div>
        </el-card>

      </el-col>
    </el-row>

    <el-dialog title="选择问卷" width="20%" :visible.sync="questionnaireOption">
      <div style="width:80%;margin: 0 auto" >
        <el-select style="width: 100%" v-model="questionnaireId" placeholder="请选择">
          <el-option
            v-for="item in questionnaireList"
            :key="item.questionnaireId"
            :label="item.name"
            :value="item.questionnaireId">
          </el-option>
        </el-select>
      </div>

      <div slot="footer" class="dialog-footer">
        <el-button @click="questionnaireOption = false">取 消</el-button>
        <el-button type="primary" @click="getRevisitQuestion">确 定</el-button>
      </div>

    </el-dialog>

    <el-dialog @close="closeDialog" title="回访登记" width="40%" :visible.sync="visitStudentOption">
      <div :style="{height: ($store.state.app.client.height)/2 +'px'}" style="overflow: auto">

        <div style="clear: both;width: 100%;margin: 10px auto;" v-for="(question, index) in revisitQuestionList">
          <el-row>
            <el-col :span="2">
              <span style="color: #001528;font-size: 16px;">{{index+1}}、</span>
            </el-col>
            <el-col :span="22">
              <el-row><span style="color: #001528;font-size: 16px;">{{question.question}}</span></el-row>
              <el-radio-group v-model="answerList[index].answer">
                <el-row style="font-size: 14px;">
                  <el-radio :span="12" v-show="question.itemA" :label="question.itemA" style="margin-top: 10px;">A: {{question.itemA}}</el-radio>
                  <el-radio :span="12" v-show="question.itemB" :label="question.itemB" style="margin-top: 10px;">B: {{question.itemB}}</el-radio>
                </el-row>
                <el-row style="font-size: 14px;">
                  <el-radio :span="12" v-show="question.itemC" :label="question.itemC" style="margin-top: 10px;">C: {{question.itemC}}</el-radio>
                  <el-radio :span="12" v-show="question.itemD" :label="question.itemD" style="margin-top: 10px;">D: {{question.itemD}}</el-radio>
                </el-row>
                <el-row style="font-size: 14px;">
                  <el-radio :span="12" v-show="question.itemE" :label="question.itemE" style="margin-top: 10px;">E: {{question.itemE}}</el-radio>
                  <el-radio :span="12" v-show="question.itemF" :label="question.itemF" style="margin-top: 10px;">F: {{question.itemF}}</el-radio>
                </el-row>
              </el-radio-group>
            </el-col>
          </el-row>
        </div>


      </div>
      <div slot="footer" class="dialog-footer">
        <el-button @click="closeDialog">取 消</el-button>
        <el-button type="primary" >确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
  import { fetchList, getObj } from '@/api/student/revisit'
  import { getRevisitQuestionnaireList } from '@/api/student/revisit-questionnaire'
  import { getQuestion } from '@/api/student/revisit-question'
  import { removeAllSpace } from '@/utils/validate'
  import MyTree from '@/components/MyTree'
  import { mapGetters } from 'vuex'

  export default {
    name: 'table_revisitStudent',
    components: {
      MyTree
    },
    data() {
      return {
        revisitStudent: {},
        list: [],
        questionnaireList: [],
        answerList: [],
        total: null,
        listLoading: true,
        showModule: 'list',
        listQuery: {
          page: 1,
          limit: 20,
          subject: 1,
          examState: 'exam_note_pass',
          revisitFlag: '0'
        },
        dialogStatus: '',
        visitStudentOption: false,
        questionnaireOption: false,
        revisitQuestionList: [],
        subject: '1',
        questionnaireListQuery: {
          page: 1,
          limit: 0,
          state: 0,
          subject: 1
        },
        questionnaireId: null,
        examNoteId: null,
        questionListQuery: {
          page: 1,
          limit: 0,
          subject: 1
        }
      }
    },
    created() {
      this.getList()
    },
    computed: {
      ...mapGetters([
        'permissions',
        'client'
      ]),
      sexVO() {
        const typeMap = {
          1: '男',
          0: '女'
        }
        return typeMap[this.student.sex]
      }
    },
    methods: {
      getList() {
        this.listLoading = true
        fetchList(this.listQuery).then(response => {
          console.log('============== 回访信息 =============')
          console.log(response.data)
          this.list = response.data.data.list
          this.total = response.data.data.totalCount
          this.listLoading = false
        })
      },
      handleSizeChange(val) {
        this.listQuery.limit = val
        this.getList()
      },
      handleCurrentChange(val) {
        this.listQuery.page = val
        this.getList()
      },
      create() {
        this.revisitStudent = {}
        this.showModule = 'info'
      },
      update(row) {
        getObj(row.roleId)
          .then(response => {
            this.revisitStudent = response.data
            this.showModule = 'info'
          })
      },
      delete(id) {
        this.getList()
      },
      cancel() {
        this.showModule = 'list'
      },
      searchClick() {
        this.listQuery.condition = removeAllSpace(this.listQuery.condition)
        this.listQuery.page = 1
        this.getList()
      },
      // 根据部门id查询员工
      searchByOrg(data) {
        console.log('=====================   根据部门id查询员工信息   =======================')
        this.listQuery.page = 1
        this.getList()
      },
      // 根据科目查询回访
      handleSubject() {
        this.listQuery.page = 1
        this.listQuery.condition = null
        this.getList()
      },
      /* 回访 */
      visitStudent(val) {
        this.examNoteId = val.examNoteId
        this.questionnaireListQuery.subject = this.listQuery.subject
        getRevisitQuestionnaireList(this.questionnaireListQuery).then(response => {
          console.log('=================== 问卷 -=============')
          console.log(response.data.data)
          this.questionnaireOption = true
          this.questionnaireList = response.data.data.list
          this.questionnaireId = this.questionnaireList[0].questionnaireId
          console.log(this.questionnaireList)
        })
      },
      getRevisitQuestion() {
        getQuestion(this.questionnaireId).then(response => {
          console.log(response.data)
          this.revisitQuestionList = response.data.data
          for (var i = 0; i < this.revisitQuestionList.length; i++) {
            this.answerList.push({
              examNoteId: this.examNoteId,
              questionId: this.revisitQuestionList[i].questionId,
              answer: this.revisitQuestionList[i].itemA
            })
          }
          console.log(this.revisitQuestionList.length)
          console.log(this.answerList.length)
          this.visitStudentOption = true
        })
      },
      closeDialog() {
        this.visitStudentOption = false
        this.questionnaireOption = false
        this.getList()
      }
    }
  }
</script>

<style>
  .subject{
    width: 140px;
    height: 30px;
    display:block;
    margin: 10px auto;
    color: rgb(124,124,124);
    background: none;
    border: none;
    font-size: 14px;
  }
  .pass{
    width: 70px;
    height: 30px;
    border-radius: 10px;
    color: #fff;
    text-align: center;
    border: none;
    background-color: rgb(66,185,131);
  }
  .noPass{
    width: 70px;
    height: 30px;
    border-radius: 10px;
    color:#fff;
    border: none;
    text-align: center;
    background-color: rgb(177,177,177);
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
