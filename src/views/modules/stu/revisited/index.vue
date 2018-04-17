<template>
  <div class="app-container calendar-list-container" :style="{height: client.height + 'px'}">
    <el-row :gutter="5">
      <el-col class="org-tree-left">
        <el-card>
          <span style="font-size: 16px;font-family: '微软雅黑 Light';color:rgb(145,145,145)">权限筛选</span>
          <my-tree url="/upms/org/tree" v-model="listQuery.orgId"  @node="searchByOrg"></my-tree>
        </el-card>
      </el-col>

      <el-col :style="{width: (client.width-250) + 'px'}">
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
            <el-button class="filter-item" type="primary" v-waves @click="searchClick">搜索</el-button>
          </div>
        </el-card>
        <el-card style="margin-top: 5px;"  :style="{height: (client.height-115) + 'px'}">

          <el-table :height="(client.height-205)" :data="list" v-loading="listLoading" element-loading-text="给我一点时间" border fit highlight-current-row style="width: 100%">
          <el-table-column type="index" label="序号"  align="center" width="50"></el-table-column>
          <el-table-column label="问题ID">
            <template slot-scope="scope">
              <span>{{scope.row.questionId}}</span>
            </template>
          </el-table-column>
          <el-table-column label="主键ID">
            <template slot-scope="scope">
              <span>{{scope.row.revisitId}}</span>
            </template>
          </el-table-column>
          <el-table-column label="问题ID">
            <template slot-scope="scope">
              <span>{{scope.row.stuQuestionId}}</span>
            </template>
          </el-table-column>
          <el-table-column label="答案">
            <template slot-scope="scope">
              <span>{{scope.row.answer}}</span>
            </template>
          </el-table-column>
          <el-table-column label="输入答案内容    其它">
            <template slot-scope="scope">
              <span>{{scope.row.otherAnswer}}</span>
            </template>
          </el-table-column>
          <el-table-column label="科目">
            <template slot-scope="scope">
              <span>{{scope.row.subject}}</span>
            </template>
          </el-table-column>

          <el-table-column label="操作">
            <template slot-scope="scope">
              <el-button size="mini" type="success" @click="update(scope.row)">编辑
              </el-button>
              <el-button size="mini" type="danger" @click="delete(scope.row)">删除
              </el-button>
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
  </div>

</template>

<script>
  import { fetchList, getObj } from '@/api/student/revisited'
  import { removeAllSpace } from '@/utils/validate'
  import MyTree from '@/components/MyTree'
  import { mapGetters } from 'vuex'
  import waves from '@/directive/waves/index.js' // 水波纹指令

  export default {
    name: 'table_revisited',
    directives: {
      waves
    },
    components: {
      MyTree
    },
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
        total: null,
        listLoading: true,
        listQuery: {
          page: 1,
          limit: 20,
          subject: 1
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
      delete(id) {
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
      }
    }
  }
</script>
