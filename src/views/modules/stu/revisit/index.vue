<template>
  <div class="app-container calendar-list-container1" :style1="{height: $store.state.app.client.height + 'px'}" style="100%">
    <el-row :gutter="5">
      <el-col class="org-tree-left" style="width: 20%">
        <el-card>
          <span style="font-size: 16px;font-family: '微软雅黑 Light';color:rgb(145,145,145)">权限筛选</span>
          <my-tree url="/upms/org/tree" v-model="listQuery.orgId"  @node="searchByOrg"></my-tree>
        </el-card>
      </el-col>

      <el-col :style1="{width: ($store.state.app.client.width-225) + 'px'}" style="width: 80%">
        <el-card body-style="padding:10px 20px;" style="height: 50px;">

          <el-row :gutter="5">
            <el-col :xs="15" :sm="15" :md="15" :lg="17" :xl="19">
              <el-radio-group size="mini" @change="handleSubject" v-model="listQuery.subject">
                <el-radio-button label="1">科目一</el-radio-button>
                <el-radio-button label="2">科目二</el-radio-button>
                <el-radio-button label="3">科目三</el-radio-button>
              </el-radio-group>
            </el-col>
            <el-col :xs="6" :sm="6" :md="6" :lg="5" :xl="4">
              <el-input @keyup.enter.native="searchClick" size="mini" placeholder="姓名/电话/身份证" v-model="listQuery.condition"></el-input>
            </el-col>
            <el-col :xs="3" :sm="3" :md="3" :lg="2" :xl="1">
              <el-button size="mini" type="primary"  @click="searchClick">搜索</el-button>
            </el-col>
          </el-row>
        </el-card>
        <el-card style="margin-top: 5px;"  :style="{height: ($store.state.app.client.height-95) + 'px'}">

          <el-table  :height="($store.state.app.client.height-185)" :data="list" v-loading="listLoading" element-loading-text="给我一点时间" border fit highlight-current-row style="width: 100%">
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
                <el-button size="mini" type="success" v-if="permissions.stu_revisit_add" @click="visitStudent(scope.row)">回 访</el-button>
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
        <el-button size="small" @click="questionnaireOption = false">取 消</el-button>
        <el-button type="primary" size="small" @click="getRevisitQuestion">确 定</el-button>
      </div>

    </el-dialog>

    <el-dialog @close="closeDialog" title="回访登记" width="750px" :visible.sync="visitStudentOption">
      <div :style="{height: ($store.state.app.client.height)/2 +'px'}" style="overflow: auto;margin-bottom: 10px">

        <div style="clear: both;width: 100%;margin: 10px auto;" v-for="(question, index) in answerList.revisitQuestionList">
          <el-row>
            <el-col :span="2">
              <span style="color: #001528;font-size: 14px;font-weight: 600">{{index+1}}、</span>
            </el-col>
            <el-col :span="22">
              <el-row><span style="color: #001528;font-size: 14px;font-weight: 600">{{question.question}}</span></el-row>
              <el-row style="font-size: 12px;">
                <el-radio-group size="mini" v-model="question.answer">
                  <el-row>
                    <el-radio :span="12" v-show="question.itemA" label="16" style="margin-top: 10px;">A: {{question.itemA}}</el-radio>
                    <el-radio :span="12" v-show="question.itemB" label="32" style="margin-top: 10px;">B: {{question.itemB}}</el-radio>
                  </el-row>
                  <el-row>
                    <el-radio :span="12" v-show="question.itemC" label="64" style="margin-top: 10px;">C: {{question.itemC}}</el-radio>
                    <el-radio :span="12" v-show="question.itemD" label="128" style="margin-top: 10px;">D: {{question.itemD}}</el-radio>
                  </el-row>
                  <el-row>
                    <el-radio :span="12" v-show="question.itemE" label="256" style="margin-top: 10px;">E: {{question.itemE}}</el-radio>
                    <el-radio :span="12" v-show="question.itemF" label="512" style="margin-top: 10px;">F: {{question.itemF}}</el-radio>
                  </el-row>
                </el-radio-group>
              </el-row>
            </el-col>
          </el-row>
        </div>

      </div>

      <div>
        <el-input type="textarea" :autosize="{ minRows: 2, maxRows: 3}" v-model="answerList.remark" placeholder="备注"></el-input>
      </div>
      <div slot="footer" class="dialog-footer">
        <el-button @click="closeDialog" size="small" ><i class="el-icon-fa-undo"></i> 取 消</el-button>
        <el-button @click="saveQuestion" size="small" type="primary" ><i class="el-icon-fa-save"></i> 确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
  import { addRevisited } from '@/api/student/revisited'
  import { examFetchList } from '@/api/student/examnote'
  import { getRevisitQuestionnaireList } from '@/api/student/revisit-questionnaire'
  import { getQuestion } from '@/api/student/revisit-question'
  import { removeAllSpace } from '@/utils/validate'
  import { mapGetters } from 'vuex'

  export default {
    name: 'table_revisitStudent',
    data() {
      return {
        revisitStudent: {},
        list: [],
        questionnaireList: [],
        answerList: {
          revisitQuestionList: [],
          examId: null,
          studentId: null,
          remark: null
        },
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
        subject: '1',
        questionnaireListQuery: {
          page: 1,
          limit: 0,
          state: 0,
          subject: 1
        },
        questionnaireId: null,
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
        examFetchList(this.listQuery).then(response => {
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
      searchClick() {
        this.listQuery.condition = removeAllSpace(this.listQuery.condition)
        this.listQuery.page = 1
        this.getList()
      },
      // 根据部门id查询员工
      searchByOrg(data) {
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
        this.answerList.examId = val.examId
        this.answerList.studentId = val.studentId
        this.questionnaireListQuery.subject = this.listQuery.subject
        getRevisitQuestionnaireList(this.questionnaireListQuery).then(response => {
          this.questionnaireOption = true
          this.questionnaireList = response.data.data.list
          this.questionnaireId = this.questionnaireList[0].questionnaireId
        })
      },
      getRevisitQuestion() {
        getQuestion(this.questionnaireId).then(response => {
          this.answerList.revisitQuestionList = response.data.data
          this.visitStudentOption = true
        })
      },
      closeDialog() {
        this.visitStudentOption = false
        this.questionnaireOption = false
        this.getList()
      },
      saveQuestion() {
        var flag = true
        for (var i = 0; i < this.answerList.revisitQuestionList.length; i++){
          if (!this.answerList.revisitQuestionList[i].answer) {
            flag = false
            this.$message.warning('问题未答完')
            break
          }
        }
        if (!flag) return
        addRevisited(this.answerList).then(() => {
          this.closeDialog()
        })
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
