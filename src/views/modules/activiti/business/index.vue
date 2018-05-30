<template>
    <div class="app-container calendar-list-container" :style="{height: $store.state.app.client.height + 'px'}">
      <div v-show="isShow('list')">
          <el-card :style="{height: ($store.state.app.client.height - 40) + 'px'}">
            <div class="filter-container" style="padding-bottom: 20px;">
              <el-input @keyup.enter.native="searchClick" style="width: 200px;" class="filter-item" placeholder="关键词" v-model="listQuery.condition"></el-input>
              <el-button class="filter-item" type="primary" icon="el-icon-search" @click="searchClick">搜索</el-button>
            </div>
            <el-table :data="list" v-loading="listLoading" :height="$store.state.app.client.height - 225" element-loading-text="给我一点时间" border fit highlight-current-row style="width: 100%">
                <el-table-column type="selection" class="selection" align="center" prop='uuid'></el-table-column>
                <el-table-column type="index" label="序号"  align="center" width="50"></el-table-column>
                <el-table-column label="组织" align="center" width="150">
                    <template slot-scope="scope" >
                        <span>{{scope.row.orgName}}</span>
                    </template>
                </el-table-column>
                <el-table-column label="业务" align="center" width="150">
                    <template slot-scope="scope">
                        <span>{{scope.row.name}}</span>
                    </template>
                </el-table-column>
                <el-table-column label="路由" align="center" width="250">
                    <template slot-scope="scope">
                        <span>{{scope.row.router}}</span>
                    </template>
                </el-table-column>
                <el-table-column label="消息" align="center" width="350">
                    <template slot-scope="scope">
                        <span>{{scope.row.message}}</span>
                    </template>
                </el-table-column>
               <!-- <el-table-column label="状态" align="center" width="80">
                  <template slot-scope="scope">
                    <span>{{scope.row.state === '0' ? '启用' : '启用'}}</span>
                  </template>
                </el-table-column>-->

                <el-table-column align="left" label="操作">
                    <template slot-scope="scope">
                        <el-button size="mini" type="success"
                                   @click="handleUpdate(scope.row)">编辑
                        </el-button>
                        <el-button size="mini" type="danger"
                                   @click="handleDelete(scope.row)">删除
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
                <el-button  type="primary" icon="el-icon-plus" @click="createClick()">添加</el-button>
              </div>
            </div>
          </el-card>
      </div>

      <el-dialog  @close="getList" :title="dialogType === 'create'?'添加':'编辑'" :show-close="false" width="550px" :visible.sync="option">
        <el-form :model="bus"  ref="bus" :rules="rules" label-width="100px">
          <el-form-item label="业务"  prop="name">
            <el-input v-model="bus.name" placeholder="业务名称" ></el-input>
          </el-form-item>
          <el-form-item label="部门" prop="orgId">
            <tree-select url="/upms/org/tree" v-model="orgId" placeholder="部门" @org-click="orgClick"></tree-select>
          </el-form-item>
          <el-form-item label="消息" prop="message">
            <el-input v-model="bus.message" placeholder="消息" ></el-input>
          </el-form-item>
        </el-form>

        <div slot="footer">
          <el-button @click="cancel('bus')"><i class="el-icon-fa-undo"></i> 取 消</el-button>
          <el-button v-if="dialogType === 'create'" type="primary" @click="create('bus')" >确 定</el-button>
          <el-button v-else @click="update('bus')" type="primary">修 改</el-button>
        </div>
      </el-dialog>

    </div>
</template>

<script>
import { busPage, addBusiness, putBusiness, delObj } from '@/api/activiti/business'

export default {
  name: 'active_business',
  directives: {
  },
  data() {
    return {
      showModule: 'list',
      option: false,
      dialogType: 'create',
      list: [],
      total: null,
      orgId: null,
      listLoading: true,
      bus: {
        id: null,
        name: null,
        router: null,
        message: null,
        orgId: null
      },
      listQuery: {
        page: 1,
        limit: 20,
        condition: ''
      },
      rules: {
        name: [
          { required: true, message: '请输入业务名称', trigger: 'submit' }
        ],
        message: [
          { required: true, message: '请输入消息', trigger: 'submit' }
        ],
        orgId: [
          { required: true, message: '请选择组织', trigger: 'submit' }
        ]
      }
    }
  },
  created() {
    this.getList()
  },
  methods: {
    getList() {
      this.listLoading = true
      this.option = false
      busPage(this.listQuery).then(response => {
        this.list = response.data.data.list
        this.total = response.data.data.totalCount
        this.listLoading = false
      })
    },
    isShow(module) {
      return this.showModule === module
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
    createClick() {
      this.option = true
      this.dialogType = 'create'
    },
    handleUpdate(val) {
      this.affiche = val
      this.dialogStatus = 'update'
      this.dialogFormVisible = true
    },
    handleDelete(row) {
      console.log(row)
      delObj(row.afficheId)
        .then(response => {
          this.dialogFormVisible = false
          this.getList()
          // this.$notify({
          //   title: '成功',
          //   message: '删除成功',
          //   type: 'success',
          //   duration: 2000
          // })
        })
    },
    create(formName) {
      const set = this.$refs
      set[formName].validate(valid => {
        if (valid) {
          addBusiness(this.affiche)
            .then(() => {
              this.dialogFormVisible = false
              this.getList()
              // this.$notify({
              //   title: '成功',
              //   message: '创建成功',
              //   type: 'success',
              //   duration: 2000
              // })
            })
        } else {
          return false
        }
      })
    },
    cancel(formName) {
      this.dialogFormVisible = false
      this.affiche = {}
      const set = this.$refs
      set[formName].resetFields()
    },
    update(formName) {
      const set = this.$refs
      set[formName].validate(valid => {
        if (valid) {
          putBusiness(this.affiche).then(() => {
            this.dialogFormVisible = false
            this.getList()
            // this.$notify({
            //   title: '成功',
            //   message: '修改成功',
            //   type: 'success',
            //   duration: 2000
            // })
          })
        } else {
          return false
        }
      })
    },
    orgClick(org) {
      this.bus.orgId = org.groupId
    }
  }
}
</script>
