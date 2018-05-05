<template>
  <div class="app-container calendar-list-container" :style="{height: $store.state.app.client.height + 'px'}" >
    <el-card style="margin-bottom: 5px;height: 80px;">
      <el-input @keyup.enter.native="searchClick" style="width: 200px;" class="filter-item" placeholder="关键词" v-model="listQuery.content"></el-input>
      <el-button class="filter-item" type="primary"  icon="search" @click="searchClick">搜索</el-button>
      <el-button class="filter-item" style="margin-left: 10px;" @click="createClick" type="primary" ><i class="el-icon-plus"></i>添加</el-button>
    </el-card>
    <el-card :style="{height: ($store.state.app.client.height - 125) + 'px'}">
      <el-table :data="list" :height="$store.state.app.client.height - 225" v-loading="listLoading" element-loading-text="给我一点时间" border fit
                highlight-current-row style="width: 100%">
        <!--<el-table-column type="selection" class="selection" align="center" prop='uuid'></el-table-column>-->
        <el-table-column type="index" label="序号"  align="center" width="50"></el-table-column>
        <el-table-column align="center" label="模板类型">
          <template slot-scope="scope">
            <span>{{scope.row.modelType}}</span>
          </template>
        </el-table-column>
        <el-table-column align="center" label="模板内容">
          <template slot-scope="scope">
            <span>{{scope.row.content}}</span>
          </template>
        </el-table-column>
        <el-table-column align="center" label="创建人">
          <template slot-scope="scope">
            <span>{{scope.row.operator}}</span>
          </template>
        </el-table-column>
        <el-table-column align="center" label="创建时间">
          <template slot-scope="scope">
            <span>{{scope.row.createTime}}</span>
          </template>
        </el-table-column>

        <el-table-column align="center" label="操作" width="160">
          <template slot-scope="scope" >
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
        <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange"
                       :current-page.sync="listQuery.page" background
                       :page-sizes="[10,20,30, 50]" :page-size="listQuery.limit"
                       layout="total, sizes, prev, pager, next, jumper" :total="total">
        </el-pagination>
      </div>
</el-card>
    <el-dialog @close="getList" title="短信模板" width="30%" :visible.sync="showModule">

      <el-form label-position="left" :model="msgModel"  ref="msgModel" label-width="100px">
        <el-form-item label="模板类型"  prop="username">
          <el-input v-model="msgModel.modelType" placeholder="模板类型" ></el-input>
        </el-form-item>
        <el-form-item label="模板内容" prop="username">
          <el-input type="textarea" v-model="msgModel.content" placeholder="模板内容" ></el-input>
        </el-form-item>
      </el-form>

      <div slot="footer">
        <el-button @click="cancel('msgModel')"><i class="el-icon-fa-undo"></i> 取 消</el-button>
        <el-button v-if="dialogStatus=='create'" type="primary" @click="create('msgModel')">确 定</el-button>
        <el-button v-else type="primary" @click="update('msgModel')">修 改</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
  import { fetchList, delObj, addObj, putObj } from '@/api/basis/msgmodel'
  import { mapGetters } from 'vuex'

  import { removeAllSpace } from '@/utils/validate'

  export default {
    name: 'table_msgmodel',
    computed: {
      ...mapGetters([
        'permissions',
        'client'
      ])
    },
    data() {
      return {
        msgModel: {},
        list: [],
        total: null,
        listLoading: true,
        showModule: false,
        listQuery: {
          page: 1,
          limit: 20,
          content: null
        },
        dialogStatus: ''
      }
    },
    created() {
      this.getList()
    },
    methods: {
      getList() {
        this.listLoading = true
        fetchList(this.listQuery).then(response => {
          console.log('================= 内容 =================')
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
      create(formName) {
        const set = this.$refs
        set[formName].validate(valid => {
          console.log('=============== 添加 ===============')
          console.log(this.msgModel)
          if (valid) {
            addObj(this.msgModel)
              .then(() => {
                this.showModule = false
                this.getList()
                this.$notify({
                  title: '成功',
                  message: '创建成功',
                  type: 'success',
                  duration: 2000
                })
              })
          } else {
            return false
          }
        })
      },
      update(formName) {
        const set = this.$refs
        set[formName].validate(valid => {
          if (valid) {
            putObj(this.msgModel).then(() => {
              this.showModule = false
              this.getList()
              this.$notify({
                title: '成功',
                message: '修改成功',
                type: 'success',
                duration: 2000
              })
            })
          } else {
            return false
          }
        })
      },
      searchClick() {
        this.listQuery.page = 1
        this.getList()
      },
      cancel(formName) {
        this.showModule = false
        this.msgModel = {}
        const set = this.$refs
        set[formName].resetFields()
      },
      createClick() {
        this.msgModel = {}
        this.dialogStatus = 'create'
        this.showModule = true
      },
      handleUpdate(val) {
        this.msgModel = val
        this.dialogStatus = 'update'
        this.showModule = true
      },
      handleDelete(row) {
        delObj(row.modelId)
          .then(response => {
            this.showModule = false
            this.getList()
            this.$notify({
              title: '成功',
              message: '删除成功',
              type: 'success',
              duration: 2000
            })
          })
      }
    }
  }
</script>
