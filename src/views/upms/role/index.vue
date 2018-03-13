<template>
  <div class="app-container calendar-list-container" :style="{height: client.height + 'px'}">

    <el-card  style="margin-bottom: 5px;height: 80px;">
      <el-input @keyup.enter.native="handleFilter" style="width: 200px;" class="filter-item" placeholder="职位名字" v-model="listQuery.roleName"></el-input>
      <el-button class="filter-item" type="primary" v-waves icon="search" @click="handleFilter">搜索</el-button>
      <el-button class="filter-item" style="margin-left: 10px;" @click="handleCreate" type="primary" icon="plus">添加</el-button>
    </el-card>


    <el-card :style="{height: (client.height-125) + 'px'}">
      <el-table :key='tableKey'  :height="(client.height-205)" :data="list" v-loading="listLoading" element-loading-text="给我一点时间" border fithighlight-current-row style="width: 100%" >
        <!--<el-table-column type="selection" class="selection" prop='uuid'></el-table-column>-->

        <el-table-column type="index" label="序号"  align="center" width="50"></el-table-column>


        <el-table-column label="职位名称">
          <template slot-scope="scope">
            <span>{{scope.row.roleName}}</span>
          </template>
        </el-table-column>

        <el-table-column align="center" label="职位标识">
          <template slot-scope="scope">
            <span>{{scope.row.roleKey}}</span>
          </template>
        </el-table-column>

        <el-table-column align="center" label="职位描述">
          <template slot-scope="scope">
            <span>{{scope.row.roleDesc }}</span>
          </template>
        </el-table-column>

        <el-table-column align="center" label="创建时间">
          <template slot-scope="scope">
            <span>{{scope.row.createTime | parseTime('{y}-{m}-{d} {h}:{i}')}}</span>
          </template>
        </el-table-column>

        <el-table-column  align="center" label="操作">
          <template slot-scope="scope">
            <el-button size="mini" type="success"
                       @click="handleUpdate(scope.row)">编辑
            </el-button>
            <el-button size="mini" type="danger"
                       @click="handleDelete(scope.row)">删除
            </el-button>
            <el-button size="mini" type="info" plain
                       @click="handlePermission(scope.row)">权限
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

    <el-dialog :title="textMap[dialogStatus]" width="30%" :visible.sync="dialogFormVisible">
      <el-form :model="form" :rules="rules" ref="form" label-width="100px">
        <el-form-item label="所属部门" prop="roleName">
          <org-select style="width: 100%" v-model="form.orgId"></org-select>
        </el-form-item>
        <el-form-item label="角色名称" prop="roleName">
          <el-input v-model="form.roleName" placeholder="角色名称"></el-input>
        </el-form-item>
        <el-form-item label="角色标识" prop="roleKey">
          <el-input v-model="form.roleKey" placeholder="角色标识"></el-input>
        </el-form-item>
        <el-form-item label="描述" prop="roleDesc">
          <el-input v-model="form.roleDesc" placeholder="描述"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="cancel('form')">取 消</el-button>
        <el-button v-if="dialogStatus=='create'" type="primary" @click="create('form')">确 定</el-button>
        <el-button v-else type="primary" @click="update('form')">修 改</el-button>
      </div>
    </el-dialog>




    <el-dialog :title="textMap[dialogStatus]" :visible.sync="dialogPermissionVisible">
      <el-tree
        class="filter-tree"
        :data="treeData"
        :default-checked-keys="checkedKeys"
        check-strictly
        node-key="id"
        highlight-current
        :props="defaultProps"
        show-checkbox
        ref="menuTree"
        :filter-node-method="filterNode"
        default-expand-all
        :style="{height: (client.height)/2 +'px'}"
        style="overflow: auto"
      >
      </el-tree>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="updatePermession(roleId, roleKey)">更 新</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
  import { fetchList, getObj, addObj, putObj, delObj, permissionUpd, fetchRoleTree } from '@/api/upms/role'
  import { fetchTree } from '@/api/upms/menu'
  import { mapGetters } from 'vuex'
  import OrgSelect from '@/components/OrgSelect'
  import waves from '@/directive/waves/index.js' // 水波纹指令
  import { removeAllSpace } from '@/utils/validate'

  export default {
    name: 'table_role',
    components: {
      OrgSelect
    },
    directives: {
      waves
    },
    data() {
      return {
        change: 1,
        treeData: [],
        checkedKeys: [],
        defaultProps: {
          children: 'children',
          label: 'name'
        },
        list: null,
        total: null,
        listLoading: true,
        listQuery: {
          page: 1,
          limit: 20,
          roleName: null
        },
        form: {
          orgId: undefined,
          roleName: undefined,
          roleKey: undefined,
          roleDesc: undefined
        },
        roleId: undefined,
        roleKey: undefined,
        rules: {
          roleName: [
            {
              required: true,
              message: '角色名称',
              trigger: 'blur'
            },
            {
              min: 3,
              max: 20,
              message: '长度在 3 到 20 个字符',
              trigger: 'blur'
            }
          ],
          roleKey: [
            {
              required: true,
              message: '角色标识',
              trigger: 'blur'
            },
            {
              min: 3,
              max: 20,
              message: '长度在 3 到 20 个字符',
              trigger: 'blur'
            }
          ],
          roleDesc: [
            {
              required: true,
              message: '角色备注',
              trigger: 'blur'
            },
            {
              min: 3,
              max: 20,
              message: '长度在 3 到 20 个字符',
              trigger: 'blur'
            }
          ]
        },
        statusOptions: ['0', '1'],
        rolesOptions: undefined,
        dialogFormVisible: false,
        dialogPermissionVisible: false,
        dialogStatus: '',
        textMap: {
          update: '编辑',
          create: '创建',
          permission: '分配权限'
        },
        tableKey: 0
      }
    },
    created() {
      this.getList()
    },
    computed: {
      ...mapGetters([
        'permissions',
        'client'
      ])
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
      handleCreate() {
        this.resetTemp()
        this.change = 2
        this.dialogStatus = 'create'
        this.dialogFormVisible = true
      },
      handleUpdate(row) {
        getObj(row.roleId)
          .then(response => {
            this.form = response.data.data
            this.change = 2
            this.dialogFormVisible = true
            this.dialogStatus = 'update'
          })
      },
      handleFilter() {
        this.listQuery.roleName = removeAllSpace(this.listQuery.roleName)
        console.log(this.listQuery)
        this.listQuery.page = 1
        this.getList()
      },
      handlePermission(row) {
        fetchRoleTree(row.roleKey).then(response => {
          this.checkedKeys = response.data.data
        })

        fetchTree()
          .then(response => {
            this.treeData = response.data.data
            this.dialogStatus = 'permission'
            this.dialogPermissionVisible = true
            this.roleId = row.roleId
            this.roleKey = row.roleKey
          })
      },
      filterNode(value, data) {
        if (!value) return true
        return data.label.indexOf(value) !== -1
      },
      getNodeData(data) {
      },
      handleDelete(row) {
        delObj(row.roleId)
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
      create(formName) {
        const set = this.$refs
        set[formName].validate(valid => {
          if (valid) {
            addObj(this.form)
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
        this.change = 1
        this.dialogFormVisible = false
        this.$refs[formName].resetFields()
      },
      update(formName) {
        const set = this.$refs
        set[formName].validate(valid => {
          if (valid) {
            this.dialogFormVisible = false
            this.form.password = undefined
            putObj(this.form).then(() => {
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
      },
      updatePermession(roleId, roleKey) {
        permissionUpd(roleId, this.$refs.menuTree.getCheckedKeys())
          .then(() => {
            this.dialogPermissionVisible = false
            fetchTree()
              .then(response => {
                this.treeData = response.data
              })
            fetchRoleTree(roleKey).then(response => {
              this.checkedKeys = response.data
            })
            this.$notify({
              title: '成功',
              message: '修改成功',
              type: 'success',
              duration: 2000
            })
          })
      },
      resetTemp() {
        this.form = {
          id: undefined,
          roleName: undefined,
          roleKey: undefined,
          roleDesc: undefined
        }
      }
    }
  }
</script>
