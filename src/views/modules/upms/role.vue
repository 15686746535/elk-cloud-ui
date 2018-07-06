<template>
  <div style="height: 100%">
    <el-card style="height: 100%" v-show="showList">
      <el-input @keyup.enter.native="searchClick" style="width: 200px;" class="filter-item" placeholder="职位名字" v-model="listQuery.roleName"></el-input>
      <el-button class="filter-item" type="primary"  icon="el-icon-search" style="margin-bottom: 15px" @click="getList">搜索</el-button>
      <el-table :key='tableKey'  :height="tableHeight-220" :data="list" v-loading="listLoading" :stripe="true" :fit="false" element-loading-text="给我一点时间" border fit highlight-current-row style="width: 100%" >
        <el-table-column type="index" label="序号"  align="center" width="50"></el-table-column>
        <el-table-column align="center" label="驾校">
          <template slot-scope="scope">
            <span>{{scope.row.groupName}}</span>
            <span v-if="scope.row.companyName">（{{scope.row.companyName}}）</span>
          </template>
        </el-table-column>
        <el-table-column align="center" label="部门">
          <template slot-scope="scope">
            <span>{{scope.row.orgName}}</span>
          </template>
        </el-table-column>
        <el-table-column align="center" label="职位名称">
          <template slot-scope="scope">
            <span>{{scope.row.roleName}}</span>
          </template>
        </el-table-column>
        <el-table-column align="center" label="职位描述">
          <template slot-scope="scope">
            <span>{{scope.row.roleDesc }}</span>
          </template>
        </el-table-column>

        <el-table-column  align="center" label="操作" width="350">
          <template slot-scope="scope">
            <el-button size="mini" type="success" v-if="permissions.upms_role_update"   @click="handleUpdate(scope.row)">编辑</el-button>
            <el-button size="mini" type="danger" v-if="permissions.upms_role_del"  @click="handleDelete(scope.row)">删除</el-button>
            <el-button size="mini" type="info" v-if="permissions.upms_role_auth" plain @click="handlePermission(scope.row)" >授权</el-button>
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
          <el-button  type="primary" icon="el-icon-plus" v-if="permissions.upms_role_add" @click="createClick()">添加</el-button>
        </div>
      </div>
    </el-card>
    <el-card style="height: 100%;overflow: auto" v-show="!showList">
      <div style="float: left;width: 50%;height: 90%;overflow: auto" >
        应用权限
        <my-tree v-if="menuUrl" :url="menuUrl" v-model="permission.menuList" :checkbox="true" ></my-tree>
      </div>
      <div style="float: left;width: 50%;height: 90%;overflow: auto" >
        数据权限
        <my-tree v-if="dataUrl" :url="dataUrl" v-model="permission.dataList" :checkbox="true" ></my-tree>
      </div>
      <el-button style="float: right;" type="primary" :loading="isloading"  @click="updatePermession(roleId, roleKey)">更 新</el-button>
      <el-button style="float: right;margin:  0 15px" type="primary" @click="showList = true">取消</el-button>
    </el-card>


    <el-dialog :modal="false" @close="cancel('form')" :title="textMap[dialogStatus]" width="550px" :visible.sync="dialogFormVisible">
      <el-form :model="form" :rules="rules" ref="form" label-width="100px">
        <el-form-item label="所属部门" prop="roleName">
          <tree-select url="/upms/org/tree" v-model="form.orgId"></tree-select>
        </el-form-item>
        <el-form-item label="角色名称" prop="roleName">
          <el-input v-model="form.roleName" placeholder="角色名称"></el-input>
        </el-form-item>
        <el-form-item label="描述" prop="roleDesc">
          <el-input v-model="form.roleDesc" placeholder="描述"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="cancel('form')"><i class="el-icon-fa-undo"></i> 取 消</el-button>
        <el-button v-if="dialogStatus=='create'" type="primary" @click="create('form')">确 定</el-button>
        <el-button v-else type="primary"  @click="update('form')">修 改</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
  import { fetchList, getObj, addObj, putObj, delObj, menuPermissionUpd, dataPermissionUpd } from '@/api/upms/role'
  import { mapGetters } from 'vuex'
  import { removeAllSpace } from '@/utils/validate'

  export default {
    name: 'table_role',
    props: {
      area: Array
    },
    watch: {
      area: function(val) {
        this.tableHeight = val[1]
      }
    },
    data() {
      return {
        tableHeight: this.area[1],
        change: 1,
        showList: true,
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
        permission: {
          menuList: [],
          dataList: []
        },
        menuUrl: undefined,
        dataUrl: undefined,
        permissionState: 1,
        roleId: undefined,
        roleKey: undefined,
        rules: {
          roleName: [
            {
              required: true,
              message: '角色名称',
              trigger: ['blur', 'change']
            },
            {
              min: 1,
              max: 20,
              message: '长度在 3 到 20 个字符',
              trigger: ['blur', 'change']
            }
          ]
        },
        statusOptions: ['0', '1'],
        rolesOptions: undefined,
        dialogFormVisible: false,
        isloading: false,
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
        this.listQuery.roleName = removeAllSpace(this.listQuery.roleName)
        fetchList(this.listQuery).then(response => {
          this.list = response.data.data.list
          console.log(response.data.data.list)
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
      createClick() {
        this.resetTemp()
        this.change = 2
        this.dialogStatus = 'create'
        this.dialogFormVisible = true
      },
      closePermission() {
        this.menuUrl = ''
        this.dataUrl = ''
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
      searchClick() {
        this.listQuery.page = 1
        this.getList()
      },
      handlePermission(row) {
        this.showList = false
        this.roleId = row.roleId
        this.menuUrl = '/upms/menu/tree?roleId=' + row.roleId
        this.dataUrl = '/upms/org/tree?roleId=' + row.roleId
        this.roleKey = row.roleKey
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
            })
          } else {
            return false
          }
        })
      },
      updatePermession(roleId, roleKey) {
        this.isloading = true
        menuPermissionUpd(roleId, this.permission.menuList).then(() => {
          dataPermissionUpd(roleId, this.permission.dataList).then(() => {
            this.showList = true
            this.isloading = false
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
<style>
  .el-card__body{
    height: 100%;
  }
</style>
