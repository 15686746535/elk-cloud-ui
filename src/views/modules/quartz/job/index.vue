<template>
  <div class="app-container calendar-list-container" :style="{height: $store.state.app.client.height + 'px'}">
    <div v-show="showModule=='list'" style="height: 100%">
      <el-card>
        <el-input @keyup.enter.native="searchClick" style="width: 200px;" class="filter-item" placeholder="关键词" v-model="listQuery.roleName"></el-input>
        <el-button class="filter-item" type="primary" style="margin-bottom: 15px"  icon="search" @click="searchClick">搜索</el-button>
        <el-table :data="list" v-loading="listLoading" :height="($store.state.app.client.height-215)" element-loading-text="给我一点时间" border fit highlight-current-row style="width: 100%">
          <el-table-column type="selection" class="selection" align="center" prop='uuid'></el-table-column>
          <el-table-column type="index" label="序号"  align="center" width="50"></el-table-column>
          <el-table-column label="任务名称">
            <template slot-scope="scope">
              <span>{{scope.row.name}}</span>
            </template>
          </el-table-column>
          <el-table-column label="组织">
            <template slot-scope="scope">
              <span>{{scope.row.orgName}}</span>
            </template>
          </el-table-column>
          <el-table-column label="bean名称">
            <template slot-scope="scope">
              <span>{{scope.row.beanName}}</span>
            </template>
          </el-table-column>
          <el-table-column label="方法名">
            <template slot-scope="scope">
              <span>{{scope.row.methodName}}</span>
            </template>
          </el-table-column>
          <el-table-column label="参数">
            <template slot-scope="scope">
              <span>{{scope.row.params}}</span>
            </template>
          </el-table-column>
          <el-table-column label="cron表达式">
            <template slot-scope="scope">
              <span>{{scope.row.cronExpression}}</span>
            </template>
          </el-table-column>
          <el-table-column label="任务状态">
            <template slot-scope="scope">
              <el-switch v-model="scope.row.status" active-value="0" inactive-value="1" @change="update(scope.row)" active-color="#13ce66" inactive-color="#ff4949"></el-switch>
            </template>
          </el-table-column>
          <el-table-column label="备注">
            <template slot-scope="scope">
              <span>{{scope.row.remark}}</span>
            </template>
          </el-table-column>
          <el-table-column label="创建时间">
            <template slot-scope="scope">
              <span>{{scope.row.createTime | subTime}}</span>
            </template>
          </el-table-column>

          <el-table-column label="操作" width="180">
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
          <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" style="float: left"
                         :current-page.sync="listQuery.page" background
                         :page-sizes="[10,20,30, 50]" :page-size="listQuery.limit"
                         layout="total, sizes, prev, pager, next, jumper" :total="total">
          </el-pagination>
          <div class="" style="float: right;">
            <el-button  type="primary" icon="el-icon-plus" @click="create()">添加</el-button>
            <el-button  type="primary" icon="el-icon-plus" @click="create()">添加</el-button>
          </div>
        </div>
      </el-card>
    </div>
    <div v-show="showModule=='info'" style="height: 100%">
      <el-card>
        <!-- 这里手写 -->
        <el-form :model="form" :rules="rules" ref="form" label-width="100px">
          <el-form-item label="所属部门" prop="orgId">
            <tree-select url="/upms/org/tree" v-model="form.orgId"></tree-select>
          </el-form-item>
          <el-form-item label="任务名称" prop="name">
            <el-input v-model="form.name" placeholder="任务名称"></el-input>
          </el-form-item>
          <el-form-item label="bean名称" prop="beanName">
            <el-input v-model="form.beanName" placeholder="bean名称"></el-input>
          </el-form-item>
          <el-form-item label="方法名" prop="methodName">
            <el-input v-model="form.methodName" placeholder="方法名"></el-input>
          </el-form-item>
          <el-form-item label="参数" prop="params">
            <el-input v-model="form.params" placeholder="参数"></el-input>
          </el-form-item>
          <el-form-item label="cron表达式" prop="params">
            <el-input v-model="form.cronExpression" placeholder="cron表达式"></el-input>
          </el-form-item>
          <el-form-item label="任务状态" prop="status">
            <el-switch v-model="form.status" active-value="0" inactive-value="1" active-color="#13ce66" inactive-color="#ff4949"></el-switch>
          </el-form-item>
          <el-form-item label="描述" prop="remark">
            <el-input type="textarea" v-model="form.remark" placeholder="描述"></el-input>
          </el-form-item>
        </el-form>

        <div slot="footer" class="dialog-footer">
          <el-button @click="cancel">取 消</el-button>
          <el-button v-if="showModule=='create'" type="primary" @click="create">确 定</el-button>
          <el-button v-else type="primary" @click="update">修 改</el-button>
        </div>
      </el-card>
    </div>
  </div>
</template>

<script>
  import { fetchList, getObj, putObj } from '@/api/quartz/job'

  export default {
    name: 'table_schedulejob',
    data() {
      return {
        schedulejob: {},
        list: [],
        total: null,
        listLoading: true,
        showModule: 'list',
        form: {
          status: '0'
        },
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
        fetchList(this.listQuery).then(response => {
          console.log(response)
          this.list = response.data.data.list
          this.total = response.data.data.totalCount
          this.listLoading = false
        })
      },
      update(obj) {
        // 修改定时任务
        putObj(obj).then(response => {
          this.getList()
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
        this.schedulejob = {}
        this.showModule = 'info'
      },
      // update(row) {
      //   getObj(row.roleId)
      //     .then(response => {
      //       this.schedulejob = response.data
      //       this.showModule = 'info'
      //     })
      // },
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
