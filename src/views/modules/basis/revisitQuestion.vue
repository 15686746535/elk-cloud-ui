<template>
  <div style="height: 100%">
    <el-row style="height: 100%">
      <el-col :span="16" style="height: 100%">
        <el-card  style="border-radius:4px 0 0 4px;overflow: auto;height: 100%">
          <div class="filter-container" style="height: 60px">
            <div style="float:left;margin-top: 8px">
              <el-radio-group @change="handleSubject" v-model="questionnaireListQuery.subject">
                <el-radio-button label="1">科目一</el-radio-button>
                <el-radio-button label="2">科目二</el-radio-button>
                <el-radio-button label="3">科目三</el-radio-button>
              </el-radio-group>
            </div>
          </div>
          <el-table :data="questionnaireList" :height="(tableHeight-225)" @row-click="questionClick" highlight-current-row stripe v-loading="questionnaireLoading" element-loading-text="给我一点时间">
            <el-table-column type="index" align="center" label="编号" width="50">
            </el-table-column>
            <el-table-column align="center" label="问卷名字">
              <template slot-scope="scope">
                <span>{{ scope.row.name }}</span>
              </template>
            </el-table-column>

            <el-table-column align="center" label="创建时间">
              <template slot-scope="scope">
                <span>{{ scope.row.createTime | subTime('dateTime')}}</span>
              </template>
            </el-table-column>

            <el-table-column align="center" label="创建人">
              <template slot-scope="scope">
                <span>{{ scope.row.operator }}</span>
              </template>
            </el-table-column>

            <el-table-column align="center" label="备注">
              <template slot-scope="scope">
                <span>{{ scope.row.remark }}</span>
              </template>
            </el-table-column>

            <el-table-column align="center" label="状态">
              <template slot-scope="scope">
                <el-switch v-model="scope.row.state" active-value="0" inactive-value="1" @change="questionnaireChange(scope.row)" active-color="#13ce66" inactive-color="#ff4949"></el-switch>
              </template>
            </el-table-column>
          </el-table>

          <div v-show="!questionnaireLoading" class="pagination-container" style="margin-top: 20px">
            <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange"
                           :current-page.sync="questionnaireListQuery.page" background
                           style="float:left;"
                           :page-sizes="[10,20,30, 50]" :page-size="questionnaireListQuery.limit"
                           layout="total, sizes, prev, pager, next, jumper" :total="total">
            </el-pagination>

            <el-button style="float:right;" @click="createClick" type="primary"><i class="el-icon-plus"></i>添加</el-button>
          </div>

        </el-card>
      </el-col>
      <el-col :span="8" style="height: 100%">
        <!-- 问卷所属题目 -->
        <el-card   style="border-radius:0 4px 4px 0;height: 100%" v-loading="questionLoading" element-loading-text="给我一点时间">
          <div :style="{height: tableHeight - 80 + 'px'}" style="overflow-y: auto;overflow-x: hidden;border-bottom: 1px solid rgb(235, 239, 245)">
            <div v-if="haveQuestion">
              <div style="clear: both;width: 100%;margin: 10px auto;" v-for="(question, index) in questionList">
                <el-row>
                  <el-col :span="2">
                    <span style="color: #001528;font-size: 16px;">{{index+1}}、</span>
                  </el-col>
                  <el-col :span="22">
                    <el-row><span style="color: #001528;font-size: 16px;">{{question.question}}</span></el-row>
                    <el-row style="font-size: 14px;">
                      <el-col :span="12" v-show="question.itemA" style="margin-top: 10px;">A: {{question.itemA}}</el-col>
                      <el-col :span="12" v-show="question.itemB" style="margin-top: 10px;">B: {{question.itemB}}</el-col>
                    </el-row>
                    <el-row style="font-size: 14px;">
                      <el-col :span="12" v-show="question.itemC" style="margin-top: 10px;">C: {{question.itemC}}</el-col>
                      <el-col :span="12" v-show="question.itemD" style="margin-top: 10px;">D: {{question.itemD}}</el-col>
                    </el-row>
                    <el-row style="font-size: 14px;">
                      <el-col :span="12" v-show="question.itemE" style="margin-top: 10px;">E: {{question.itemE}}</el-col>
                      <el-col :span="12" v-show="question.itemF" style="margin-top: 10px;">F: {{question.itemF}}</el-col>
                    </el-row>
                  </el-col>
                </el-row>
              </div>
            </div>
            <div v-else>
              <div style="clear: both;width: 100%;margin: 10px auto;" v-for="(question, index) in questionList">
                <el-row style="line-height: 32px">
                  <el-col :span="2">
                    <span style="color: #001528;font-size: 16px;">{{index+1}}、</span>
                  </el-col>
                  <el-col :span="22">

                    <el-row :gutter="2" style="color: #001528;font-size: 16px;">
                      <el-col :span="20">
                        <el-input size="small" v-model="question.question" placeholder="题目" ></el-input>
                      </el-col>
                      <el-col :span="2">
                        <div style="margin: 0 auto;width: 32px; height: 32px">
                          <i class="el-icon-delete hover" v-if="index + 1 === questionList.length" style="padding: 8px;" @click="removeQuestion(index)"></i>
                          <!--<el-button style="padding: 9px;" size="mini" type="danger" @click="removeQuestion(index)" icon="el-icon-delete" plain circle></el-button>-->
                        </div>
                      </el-col>
                      <el-col :span="2">
                        <div style="margin: 0 auto;width: 32px; height: 32px">
                          <i class="el-icon-plus hover" v-if="index + 1 === questionList.length" @click="appendQuestion(index)" style="padding: 8px;"></i>
                          <!--<el-button v-if="index + 1 === questionList.length" style="padding: 9px;" size="mini" type="success" @click="appendQuestion(index)" icon="el-icon-plus" plain circle></el-button>-->
                        </div>
                      </el-col>
                    </el-row>

                    <el-row style="margin-top: 10px;font-size: 14px;">
                      <el-col :span="10">
                        <el-col :span="2">A:</el-col>
                        <el-col :span="21">
                          <el-input size="small" style="width: 100%" v-model="question.itemA" placeholder="答案A" ></el-input>
                        </el-col>
                      </el-col>
                      <el-col :span="10">
                        <el-col :span="2">B:</el-col>
                        <el-col :span="21">
                          <el-input size="small" style="width: 100%" :disabled="!question.itemA && !question.itemB" v-model="question.itemB" placeholder="答案B" ></el-input>
                        </el-col>
                      </el-col>
                    </el-row>

                    <el-row style="margin-top: 10px;font-size: 14px;">
                      <el-col :span="10">
                        <el-col :span="2">C:</el-col>
                        <el-col :span="21">
                          <el-input size="small" style="width: 100%" :disabled="!question.itemB && !question.itemC" v-model="question.itemC" placeholder="答案C" ></el-input>
                        </el-col>
                      </el-col>
                      <el-col :span="10">
                        <el-col :span="2">D:</el-col>
                        <el-col :span="21">
                          <el-input size="small" style="width: 100%" :disabled="!question.itemC && !question.itemD" v-model="question.itemD" placeholder="答案D" ></el-input>
                        </el-col>
                      </el-col>
                    </el-row>

                    <el-row style="margin-top: 10px;font-size: 14px;">
                      <el-col :span="10">
                        <el-col :span="2">E:</el-col>
                        <el-col :span="21">
                          <el-input size="small" style="width: 100%" :disabled="!question.itemD && !question.itemE" v-model="question.itemE" placeholder="答案E" ></el-input>
                        </el-col>
                      </el-col>
                      <el-col :span="10">
                        <el-col :span="2">F:</el-col>
                        <el-col :span="21">
                          <el-input size="small" style="width: 100%" :disabled="!question.itemE && !question.itemF" v-model="question.itemF" placeholder="答案F" ></el-input>
                        </el-col>
                      </el-col>
                    </el-row>

                  </el-col>
                </el-row>
              </div>
              <div style="float: right;width: 100%" align="center">
                <el-button v-show="!haveQuestion" type="primary" @click="saveQuestion"><i class="el-icon-fa-save"></i> 保 存</el-button>
              </div>
            </div>
          </div>

        </el-card>
      </el-col>
    </el-row>
    <!-- 添加问卷弹窗 -->
    <el-dialog :modal="false"  @close="cancelQuestionnaire('revisitQuestionnaire')" title="添加问卷" :show-close="false" width="550px" :visible.sync="questionnaireOption">

      <el-form :model="revisitQuestionnaire" :rules="revisitQuestionnaireRules" ref="revisitQuestionnaire" label-position="right" label-width="100px">
        <el-form-item label="问卷名字" prop="name">
          <el-input v-model="revisitQuestionnaire.name" placeholder="问卷名字" ></el-input>
        </el-form-item>
        <el-form-item label="备注" prop="remark">
          <el-input v-model="revisitQuestionnaire.remark" placeholder="备注" ></el-input>
        </el-form-item>
      </el-form>

      <div slot="footer">
        <el-button @click="cancelQuestionnaire('revisitQuestionnaire')"><i class="el-icon-fa-undo"></i> 取 消</el-button>
        <el-button type="primary" :loading="btnLoading" @click="createQuestionnaire('revisitQuestionnaire')">确 定</el-button>
      </div>

    </el-dialog>


  </div>
</template>

<script>
  import { getQuestion, addQuestion } from '@/api/student/revisit-question'
  import { mapGetters } from 'vuex'
  import { getRevisitQuestionnaireList, addQuestionnaireList, putQuestionnaireList } from '@/api/student/revisit-questionnaire'

  export default {
    name: 'table_revisitQuestion',
    props: {
      area: Array
    },
    watch: {
      area: function(val) {
        this.tableHeight = val[1]
        this.tableWidth = val[0]
      }
    },
    computed: {
      ...mapGetters([
        'permissions',
        'client'
      ])
    },
    data() {
      return {
        tableHeight: this.area[1],
        tableWidth: this.area[0],
        revisitQuestion: {},
        revisitQuestionnaire: {},
        questionnaireList: [],
        questionList: [],
        questions: {
          questionList: []
        },
        revisitQuestionnaireRules: {
          name: [
            { required: true, message: '请填写问卷名字', trigger: ['blur', 'change'] }
          ],
          remark: [
            { required: true, message: '请填写备注', trigger: ['blur', 'change'] }
          ]
        },
        questionnaireId: null,
        total: null,
        questionnaireLoading: true,
        questionLoading: false,
        questionnaireOption: false,
        btnLoading: false,
        haveQuestion: true,
        questionnaireListQuery: {
          page: 1,
          limit: 20,
          subject: 1
        }
      }
    },
    created() {
      this.getQuestionnaireList()
    },
    methods: {
      /* 分页插件方法 */
      handleSizeChange(val) {
        this.questionnaireListQuery.limit = val
        this.getQuestionnaireList()
      },
      handleCurrentChange(val) {
        this.questionnaireListQuery.page = val
        this.getQuestionnaireList()
      },
      /* 查询问卷集合 */
      getQuestionnaireList() {
        this.questionnaireLoading = true
        getRevisitQuestionnaireList(this.questionnaireListQuery).then(response => {
          this.questionnaireList = response.data.data.list
          this.total = response.data.data.totalCount
          this.questionnaireLoading = false
        })
      },
      /* 科目查询 */
      handleSubject() {
        this.questionnaireListQuery.page = 1
        this.getQuestionnaireList()
        this.questionList = []
        this.haveQuestion = true
        this.questionLoading = false
      },
      /* 禁用启用开关 */
      questionnaireChange(row) {
        this.revisitQuestionnaire = row
        if (this.revisitQuestionnaire.state === 1) {
          this.revisitQuestionnaire.state = 0
        } else if (this.revisitQuestionnaire.state === 0) {
          this.revisitQuestionnaire.state = 1
        }
        putQuestionnaireList(this.revisitQuestionnaire).then(response => {
          this.getQuestionnaireList()
        })
      },
      /* 打开添加问卷窗口 */
      createClick() {
        this.revisitQuestionnaire = {}
        this.questionnaireOption = true
      },
      /* 添加问卷 */
      createQuestionnaire(formName) {
        const set = this.$refs
        set[formName].validate(valid => {
          if (valid) {
            this.btnLoading = true
            this.revisitQuestionnaire.subject = this.questionnaireListQuery.subject
            addQuestionnaireList(this.revisitQuestionnaire).then(() => {
              this.getQuestionnaireList()
              this.questionnaireOption = false
              this.btnLoading = false
            })
          } else {
            return false
          }
        })
      },
      /* 关闭添加问卷窗口 */
      cancelQuestionnaire(formName) {
        this.questionnaireOption = false
        const set = this.$refs
        set[formName].resetFields()
      },
      /* 根据问卷查题目 */
      questionClick(row) {
        this.questionLoading = true
        this.questionnaireId = row.questionnaireId
        getQuestion(row.questionnaireId).then(response => {
          this.questionList = response.data.data
          if (this.questionList.length === 0) {
            this.haveQuestion = false
            this.questionList = [{
              questionnaireId: this.questionnaireId
            }]
          } else {
            this.haveQuestion = true
          }
          this.questionLoading = false
        })
      },
      /* 添加题目 */
      appendQuestion(index) {
        this.questionList.splice(index + 1, 0, {
          questionnaireId: this.questionnaireId
        })
      },
      /* 删除题目 */
      removeQuestion(index) {
        if (this.questionList.length !== 1) {
          this.questionList.splice(index, 1)
        }
      },
      /* 保存题目 */
      saveQuestion() {
        if (!this.questionVerification()) {
          this.$message.warning('问题设置有错误')
          return
        }
        this.questions.questionList = this.questionList
        addQuestion(this.questions).then(() => {
          this.questionClick({ 'questionnaireId': this.questionnaireId })
        })
      },
      /* 问题填写验证 */
      questionVerification() {
        for (var i = 0; i < this.questionList.length; i++) {
          if (!(this.questionList[i].question && this.questionList[i].itemA && this.questionList[i].itemB)) {
            return false
          }
          if (this.questionList[i].itemD) {
            if (!this.questionList[i].itemC) {
              return false
            }
          }
          if (this.questionList[i].itemE) {
            if (!this.questionList[i].itemD) {
              return false
            }
          }
          if (this.questionList[i].itemF) {
            if (!this.questionList[i].itemE) {
              return false
            }
          }
        }
        return true
      }
    }
  }
</script>
<style rel="stylesheet/scss" lang="scss" scoped>
  .text_css{
    color:#495060;
    font-size: 14px;
    word-break:keep-all;/* 不换行 */
    white-space:nowrap;/* 不换行 */
    overflow:hidden;/* 内容超出宽度时隐藏超出部分的内容 */
    text-overflow:ellipsis;/* 当对象内文本溢出时显示省略标记(...) ；需与overflow:hidden;一起使用。*/
  }
</style>
