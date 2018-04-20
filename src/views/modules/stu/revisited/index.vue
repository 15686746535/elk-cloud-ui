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
          <el-card :style="{height: ($store.state.app.client.height-115) + 'px',width: ($store.state.app.client.width-690) + 'px'}" style="float: left;border-radius:4px 0 0 4px;margin-top: 5px">

            <el-table :height="($store.state.app.client.height-205)" :data="list" v-loading="listLoading" @row-click="questionClick"  element-loading-text="给我一点时间" border fit highlight-current-row style="width: 100%">
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
                  <el-button size="mini" type="danger" @click="revoke(scope.row)">撤 销</el-button>
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
          <el-card :style="{height: ($store.state.app.client.height-115) + 'px'}" style="width: 435px; border-radius:0 4px 4px 0;float: left;margin-top: 5px" v-loading="questionLoading" element-loading-text="给我一点时间">
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
          </el-card>
      </el-col>
    </el-row>
  </div>

</template>

<script>
  // import { fetchList, getObj } from '@/api/student/revisited'
  import { getQuestion, addQuestion } from '@/api/student/revisit-question'
  import { fetchList, getObj } from '@/api/student/revisit'
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
        listQuery: {
          page: 1,
          limit: 20,
          subject: 1,
          revisitFlag: 1
        }
      }
    },
    created() {
      this.getList()
    },
    methods: {
      getList() {
        this.listLoading = true
        fetchList(this.listQuery).then(response => {
          console.log('============ 已回访学员 ===========')
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
        this.revisited = {}
      },
      update(row) {
        getObj(row.roleId)
          .then(response => {
            this.revisited = response.data
          })
      },
      searchClick() {
        this.listQuery.page = 1
        this.getList()
      },
      revoke(id) {
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
      /* 根据问卷查题目 */
      questionClick(row) {
        this.questionLoading = true
        console.log(row)
        getQuestion(row.examNoteId).then(response => {
          console.log('========= 题目 ==========')
          console.log(response.data)
          this.questionList = response.data.data
          this.questionLoading = false
        })
      }
    }
  }
</script>
