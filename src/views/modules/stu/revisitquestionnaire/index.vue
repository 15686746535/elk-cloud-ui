<template>
  <div class="app-container calendar-list-container">
    <div v-show="showModule=='list'">
      <el-card style="margin-bottom: 5px;">
        <div class="filter-container">
          <el-input @keyup.enter.native="searchClick" style="width: 200px;" class="filter-item" placeholder="姓名/电话/身份证" v-model="listQuery.roleName"></el-input>
          <el-button class="filter-item" type="primary"  icon="search" @click="searchClick">搜索</el-button>
          <el-button class="filter-item" style="margin-left: 10px;" @click="create" type="primary"><i class="el-icon-plus"></i>添加</el-button>
        </div>
      </el-card>
      <el-card>
        <el-table :data="list" v-loading="listLoading" element-loading-text="给我一点时间" border fit
                  highlight-current-row style="width: 100%">
          <el-table-column type="selection" class="selection" align="center" prop='uuid'></el-table-column>
          <el-table-column type="index" label="序号"  align="center" width="50"></el-table-column>
          <el-table-column label="组织ID">
            <template slot-scope="scope">
              <span>{{scope.row.orgId}}</span>
            </template>
          </el-table-column>
          <el-table-column label="问卷名字">
            <template slot-scope="scope">
              <span>{{scope.row.name}}</span>
            </template>
          </el-table-column>
          <el-table-column label="科目">
            <template slot-scope="scope">
              <span>{{scope.row.subject}}</span>
            </template>
          </el-table-column>
          <el-table-column label="删除标记">
            <template slot-scope="scope">
              <span>{{scope.row.delFlag}}</span>
            </template>
          </el-table-column>
          <el-table-column label="备注">
            <template slot-scope="scope">
              <span>{{scope.row.remark}}</span>
            </template>
          </el-table-column>
          <el-table-column label="操作人">
            <template slot-scope="scope">
              <span>{{scope.row.operator}}</span>
            </template>
          </el-table-column>
          <el-table-column label="创建时间">
            <template slot-scope="scope">
              <span>{{scope.row.createTime}}</span>
            </template>
          </el-table-column>
          <el-table-column label="更新时间">
            <template slot-scope="scope">
              <span>{{scope.row.updateTime}}</span>
            </template>
          </el-table-column>

          <el-table-column label="操作">
            <template slot-scope="scope">
              <el-button size="mini" type="success"
                         @click="update(scope.row)">编辑
              </el-button>
              <el-button size="mini" type="danger"
                         @click="delete(scope.row)">删除
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
    </div>
    <div v-show="showModule=='info'">
      <el-card>
        <!-- 这里手写 -->

        <div slot="footer" class="dialog-footer">
          <el-button @click="cancel"><i class="el-icon-fa-undo"></i> 取 消</el-button>
          <el-button v-if="dialogStatus=='create'" type="primary" @click="create">确 定</el-button>
          <el-button v-else type="primary" @click="update">修 改</el-button>
        </div>
      </el-card>
    </div>
  </div>
</template>

<script>
  import { getRevisitQuestionnaireList, getQuestionnaireList } from '@/api/student/revisit-questionnaire'

  import { removeAllSpace } from '@/utils/validate'

  export default {
    name: 'table_revisitquestionnaire',
    data() {
      return {
        revisitquestionnaire: {},
        list: [],
        total: null,
        listLoading: true,
        showModule: 'list',
        listQuery: {
          page: 1,
          limit: 20
        }
      }
    },
    created() {
      this.getList()
    },
    methods: {
      getList() {
        this.listLoading = true
        getRevisitQuestionnaireList(this.listQuery).then(response => {
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
        this.revisitquestionnaire = {}
        this.showModule = 'info'
      },
      update(row) {
        getQuestionnaireList(row.roleId)
          .then(response => {
            this.revisitquestionnaire = response.data
            this.showModule = 'info'
          })
      },
      searchClick() {
        this.listQuery.page = 1
        this.getList()
      },
      delete(id) {
        this.getList()
      },
      cancel() {
        this.showModule = 'list'
      }
    }
  }
</script>
