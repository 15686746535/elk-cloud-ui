<template>
  <div style="height: 100%;padding: 5px;">
    <el-row :gutter="5" style="height: 100%">
      <el-col :span="18" style="height: 100%">
        <el-card  style="height: 100%;width: 100%">
          <el-row :gutter="5" style="margin-bottom: 15px;">
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
          <el-table :height="(tableHeight-185)" :data="list" v-loading="listLoading" @row-click="questionClick"  element-loading-text="给我一点时间" border fit highlight-current-row style="width: 100%">
            <el-table-column type="index" label="序号"  align="center" width="50"></el-table-column>
            <el-table-column  align="center" label="姓名">
              <template slot-scope="scope">
                <span>{{scope.row.name}}</span>
              </template>
            </el-table-column>
            <el-table-column align="center" label="身份证" width="170">
              <template slot-scope="scope">
                <span>{{scope.row.idNumber}}</span>
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
            <el-table-column align="center" label="通过时间">
              <template slot-scope="scope">
                <span>{{scope.row.passTime | subTime}}</span>
              </template>
            </el-table-column>
            <el-table-column align="center" label="备注">
              <template slot-scope="scope">
                <span>{{scope.row.remark}}</span>
              </template>
            </el-table-column>

            <el-table-column align="center" label="操作">
              <template slot-scope="scope">
                <el-button size="mini" type="danger" v-if="permissions.stu_revisited_del" @click="revoke(scope.row)">撤 销</el-button>
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
      <el-col :span="6" style="height: 100%">
        <el-card style="height: 100%;width: 100%;overflow: auto" v-loading="questionLoading" element-loading-text="给我一点时间">
          <div style="clear: both;width: 100%;margin: 10px auto;" v-for="(question, index) in questionList">
            <el-row>
              <el-col :span="2">
                <span style="color: #001528;font-size: 16px;">{{index+1}}、</span>
              </el-col>
              <el-col :span="22">
                <el-row><span style="color: #001528;font-size: 16px;">{{question.question}}</span></el-row>
                <el-row style="font-size: 14px;">
                  <el-col :span="12" v-show="question.itemA" style="margin-top: 10px;" :style="question.answer === '16'?'color: #F56C6C':''">A: {{question.itemA}}</el-col>
                  <el-col :span="12" v-show="question.itemB" style="margin-top: 10px;" :style="question.answer === '32'?'color: #F56C6C':''">B: {{question.itemB}}</el-col>
                </el-row>
                <el-row style="font-size: 14px;">
                  <el-col :span="12" v-show="question.itemC" style="margin-top: 10px;" :style="question.answer === '64'?'color: #F56C6C':''">C: {{question.itemC}}</el-col>
                  <el-col :span="12" v-show="question.itemD" style="margin-top: 10px;" :style="question.answer === '128'?'color: #F56C6C':''">D: {{question.itemD}}</el-col>
                </el-row>
                <el-row style="font-size: 14px;">
                  <el-col :span="12" v-show="question.itemE" style="margin-top: 10px;" :style="question.answer === '256'?'color: #F56C6C':''">E: {{question.itemE}}</el-col>
                  <el-col :span="12" v-show="question.itemF" style="margin-top: 10px;" :style="question.answer === '512'?'color: #F56C6C':''">F: {{question.itemF}}</el-col>
                </el-row>
              </el-col>
            </el-row>
          </div>
        </el-card>
      </el-col>
    </el-row>
  </div>

</template>

<script>
  import { delRevisited } from '@/api/student/revisited'
  import { queryExamNoted } from '@/api/student/revisit-question'
  import { examFetchList } from '@/api/student/examnote'
  import { removeAllSpace } from '@/utils/validate'
  import { mapGetters } from 'vuex'

  export default {
    name: 'table_revisited',
    computed: {
      ...mapGetters([
        'permissions',
        'client'
      ])
    },
    data() {
      return {
        revisited: {},
        list: [],
        questionList: [],
        total: null,
        listLoading: true,
        questionLoading: false,
        tableHeight: this.area[1],
        listQuery: {
          page: 1,
          limit: 20,
          subject: 1,
          examState: 'exam_note_pass',
          revisitFlag: 1
        }
      }
    },
    props: {
      area: Array
    },
    watch: {
      area: function(val) {
        this.tableHeight = val[1]
      }
    },
    created() {
      this.getList()
    },
    methods: {
      getList() {
        this.listLoading = true
        examFetchList(this.listQuery).then(response => {
          this.list = response.data.data.list
          this.total = response.data.data.totalCount
          this.questionList = []
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
        this.listQuery.page = 1
        this.getList()
      },
      revoke(obj) {
        this.$confirm('是否撤销该回访记录?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          delRevisited(obj).then(() => {
            this.getList()
          })
        })
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
        this.questionList = []
        this.getList()
      },
      /* 根据问卷查题目 */
      questionClick(row) {
        this.questionLoading = true
        queryExamNoted({ 'examId': row.examId, 'studentId': row.studentId }).then(response => {
          this.questionList = response.data.data
          this.questionLoading = false
        })
      }
    }
  }
</script>
