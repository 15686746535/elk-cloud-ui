<template xmlns:v-popover="http://www.w3.org/1999/xhtml">
  <div class="app-container calendar-list-container" :style="{height: $store.state.app.client.height + 'px'}">
    <el-card style="margin-bottom: 5px;height: 80px">
      <el-button v-if="sys_dict_add" class="filter-item" style="margin-left: 10px;" @click="createClick" type="primary" icon="edit">添加
      </el-button>
    </el-card>
    <el-card :style="{height: ($store.state.app.client.height - 125) + 'px'}">
      <el-table :key='tableKey' :data="list" v-loading="listLoading" :height="$store.state.app.client.height-205"  element-loading-text="给我一点时间" border fit highlight-current-row style="width: 100%">
        <el-table-column type="index" align="center" label="编号" width="50">
        </el-table-column>
        <el-table-column align="center"  label="增值包名字">
          <template slot-scope="scope">
            <span>{{ scope.row.label }}</span>
          </template>
        </el-table-column>
        <el-table-column align="center"  label="费用">
          <template slot-scope="scope">
            <span>{{ scope.row.value | parseJson('cost')}}</span>
          </template>
        </el-table-column>
        <el-table-column align="center" label="描述">
          <template slot-scope="scope">
            <span>{{ scope.row.description }}</span>
          </template>
        </el-table-column>
        <el-table-column align="center" label="排序">
          <template slot-scope="scope">
            <el-popover ref="popover" placement="right" title="提示" width="200" trigger="hover" content="依据数字大小排序，数字越大排名越后">
            </el-popover>
            <span v-popover:popover>{{ scope.row.sort }}</span>
          </template>
        </el-table-column>
        <el-table-column align="center" label="创建时间">
          <template slot-scope="scope">
            <span>{{ scope.row.createTime | subTime }}</span>
          </template>
        </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button v-if="sys_dict_upd" size="small" type="success"
                       @click="handleUpdate(scope.row)">编辑
            </el-button>
            <el-button v-if="sys_dict_del" size="mini" type="danger"
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
    <el-dialog :modal="false" :title="textMap[dialogStatus]" width="550px" :visible.sync="dialogFormVisible">
      <el-form label-position="left" :model="dict" :rules="rules" ref="dict" label-width="100px">
        <el-form-item label="增值包名字"  prop="username">
          <el-input v-model="increment.name" placeholder="增值包名字" ></el-input>
        </el-form-item>
        <el-form-item label="描述" prop="username">
          <el-input v-model="dict.description" placeholder="描述" ></el-input>
        </el-form-item>
        <el-form-item label="费用" prop="username">
          <el-input type="number" v-model="increment.cost" placeholder="费用" ></el-input>
        </el-form-item>
        <el-form-item label="排序(升)" prop="username">
          <el-popover ref="popover" placement="right" title="提示" width="200" trigger="hover" content="依据数字大小排序，数字越大排名越后">
          </el-popover>
          <el-input type="number" v-popover:popover v-model.number="dict.sort" placeholder="排序(升序)" ></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="cancel('dict')"><i class="el-icon-fa-undo"></i> 取 消</el-button>
        <el-button v-if="dialogStatus=='create'" type="primary" @click="create('dict')">确 定</el-button>
        <el-button v-else type="primary" @click="update('dict')">修 改</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
  import { fetchList, addObj, putObj, delObj } from '@/api/basis/dict'
  import { removeAllSpace } from '@/utils/validate'
  import { mapGetters } from 'vuex'

  export default {
    name: 'table_sys_dict',
    data() {
      return {
        list: [],
        lists: [],
        total: null,
        listLoading: true,
        listQuery: {
          page: 1,
          limit: 20,
          type: 'dict_increment'
        },
        rules: {},
        dict: {},
        increment: {},
        dialogFormVisible: false,
        dialogStatus: '',
        sys_dict_add: false,
        sys_dict_upd: false,
        sys_dict_del: false,
        textMap: {
          update: '编辑',
          create: '创建'
        },
        tableKey: 0
      }
    },
    computed: {
      ...mapGetters([
        'permissions',
        'client'
      ])
    },
    filters: {
      statusFilter(status) {
        const statusMap = {
          0: '有效',
          1: '无效'
        }
        return statusMap[status]
      }
    },
    created() {
      this.getList()
      this.sys_dict_add = this.permissions['basis_dict_add']
      this.sys_dict_upd = this.permissions['basis_dict_update']
      this.sys_dict_del = this.permissions['basis_dict_del']
    },
    methods: {
      getList() {
        this.listLoading = true
        this.listQuery.orderByField = 'create_time'
        this.listQuery.isAsc = false
        fetchList(this.listQuery).then(response => {
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
      handleDelete(row) {
        delObj(row.dictId)
          .then(response => {
            this.dialogFormVisible = false
            this.getList()
            this.$notify({
              title: '成功',
              message: '删除成功',
              type: 'success',
              duration: 2000
            })
          })
      },
      createClick() {
        this.dict = {}
        this.dialogStatus = 'create'
        this.dialogFormVisible = true
      },
      handleUpdate(val) {
        this.increment.name = val.label
        this.increment.cost = JSON.parse(val.value).cost
        this.dict = val
        this.dialogStatus = 'update'
        this.dialogFormVisible = true
      },
      create(formName) {
        const set = this.$refs
        set[formName].validate(valid => {
          if (valid) {
            this.dict.label = this.increment.name
            this.dict.value = JSON.stringify(this.increment)
            this.dict.type = this.listQuery.type
            addObj(this.dict)
              .then(() => {
                this.dialogFormVisible = false
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
      cancel(formName) {
        this.dialogFormVisible = false
        // this.dict = {}
        this.increment = {}
        this.getList()
        this.$refs[formName].resetFields()
      },
      update(formName) {
        const set = this.$refs
        set[formName].validate(valid => {
          if (valid) {
            this.dict.label = this.increment.name
            this.dict.value = JSON.stringify(this.increment)
            putObj(this.dict).then(() => {
              this.dialogFormVisible = false
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
      }
    }
  }
</script>
