<script src="../../../api/upms/menu.js"></script>
<template>
  <div class="app-container calendar-list-container">
      <el-row>
          <el-button-group>
            <el-button type="primary" v-if="menuManager_btn_add" icon="plus" @click="handlerAdd">添加</el-button>
            <el-button type="primary" v-if="menuManager_btn_edit" icon="edit" @click="handlerEdit">编辑</el-button>
            <el-button type="primary" v-if="menuManager_btn_del" icon="delete" @click="handleDelete">删除</el-button>
          </el-button-group>
      </el-row>
    <el-row :gutter="20">
      <el-col :span="6" style='margin-top:15px;'>
        <el-card class="box-card menuTreeCard" style="max-height: 600px;overflow: auto;">
          <tree :list="treeData" id="menuTree"
                :open="false" choiceType="folder"
                @node-click="getNodeData"></tree>
        </el-card>
      </el-col>
      <el-col :span="18" style='margin-top:15px;'>
        <el-card class="box-card">
          <el-form :label-position="labelPosition" label-width="80px" :model="form" ref="form">
            <el-form-item label="类型" prop="type">
              <el-select class="filter-item" v-model="form.type"  :disabled="formEdit"  placeholder="请输入资源请求类型">
                <el-option v-for="item in  typeOptions" :key="item" :label="item | typeFilter" :value="item"> </el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="父级节点" prop="parentId">
              <el-input v-model="form.parentId" :disabled="formEdit" placeholder="请输入父级节点"></el-input>
            </el-form-item>
            <el-form-item label="标题" prop="name">
              <el-input v-model="form.name" :disabled="formEdit"  placeholder="请输入标题"></el-input>
            </el-form-item>
            <el-form-item label="权限标识" v-show="form.type==1" prop="permission">
              <el-input v-model="form.permission" :disabled="formEdit" placeholder="请输入权限标识"></el-input>
            </el-form-item>
            <el-form-item label="图标" v-show="form.type!==1" prop="icon">
              <el-input v-model="form.icon" :disabled="formEdit" placeholder="请输入图标"></el-input>
            </el-form-item>
            <el-form-item label="资源路径" v-show="form.type==1" prop="url">
              <el-input v-model="form.url" :disabled="formEdit" placeholder="请输入资源路径"></el-input>
            </el-form-item>
            <el-form-item label="请求方法" v-show="form.type==1" prop="method">
              <el-select class="filter-item" v-model="form.method"  :disabled="formEdit"  placeholder="请选择请求类型">
                <el-option v-for="item in  methodOptions" :key="item" :label="item" :value="item"> </el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="排序" prop="sort">
              <el-input v-model="form.sort" :disabled="formEdit" placeholder="请输入排序"></el-input>
            </el-form-item>
            <el-form-item label="前端路径"   prop="component">
              <el-input v-model="form.component" :disabled="formEdit" placeholder="请输入描述"></el-input>
            </el-form-item>
            <el-form-item v-if="formStatus == 'update'">
              <el-button type="primary" @click="update">更新</el-button>
              <el-button @click="onCancel">取消</el-button>
            </el-form-item>
            <el-form-item v-if="formStatus == 'create'">
              <el-button type="primary" @click="create">保存</el-button>
              <el-button @click="onCancel">取消</el-button>
            </el-form-item>
          </el-form>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script>
  import { fetchTree, getObj, addObj, delObj, putObj } from '@/api/upms/menu'
  import { mapGetters } from 'vuex'
  import Tree from '@/components/Tree'

  export default {
    name: 'menu',
    components: {
      Tree
    },
    data() {
      return {
        formEdit: true,
        formStatus: '',
        typeOptions: ['0', '1'],
        methodOptions: ['GET', 'POST', 'PUT', 'DELETE'],
        listQuery: {
          name: undefined
        },
        // 树形图数据
        treeData: [],
        labelPosition: 'right',
        form: {
          permission: undefined,
          name: undefined,
          parentId: undefined,
          url: undefined,
          icon: undefined,
          sort: undefined,
          component: undefined,
          type: undefined,
          method: undefined
        },
        currentId: -1,
        menuManager_btn_add: true,
        menuManager_btn_edit: true,
        menuManager_btn_del: true
      }
    },
    filters: {
      typeFilter(type) {
        const typeMap = {
          0: '菜单',
          1: '按钮'
        }
        return typeMap[type]
      }
    },
    created() {
      this.getList()
    },
    computed: {
      ...mapGetters([
        'elements'
      ])
    },
    methods: {
      getList() {
        fetchTree(this.listQuery).then(response => {
          console.log(response.data.data)
          console.log('这里是树形')
          console.log(response.data.data)
          this.treeData = response.data.data
        })
      },
      getNodeData(data) {
        console.log(data)
        if (!this.formEdit) {
          this.formStatus = 'update'
        }
        getObj(data.id).then(response => {
          this.form = response.data.data
        })
        this.currentId = data.id
      },
      handlerEdit() {
        if (this.form.menuId) {
          this.formEdit = false
          this.formStatus = 'update'
        }
      },
      handlerAdd() {
        this.resetForm()
        this.formEdit = false
        this.formStatus = 'create'
      },
      handleDelete() {
        this.$confirm('此操作将永久删除, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          delObj(this.currentId).then(() => {
            this.getList()
            this.resetForm()
            this.onCancel()
            this.$notify({
              title: '成功',
              message: '删除成功',
              type: 'success',
              duration: 2000
            })
          })
        })
      },
      update() {
        putObj(this.form).then(() => {
          this.getList()
          this.$notify({
            title: '成功',
            message: '更新成功',
            type: 'success',
            duration: 2000
          })
        })
      },
      create() {
        addObj(this.form).then(() => {
          this.getList()
          this.$notify({
            title: '成功',
            message: '创建成功',
            type: 'success',
            duration: 2000
          })
        })
      },
      onCancel() {
        this.formEdit = true
        this.formStatus = ''
      },
      resetForm() {
        this.form = {
          permission: undefined,
          name: undefined,
          menuId: undefined,
          parentId: this.currentId,
          url: undefined,
          icon: undefined,
          sort: undefined,
          component: undefined,
          type: undefined,
          method: undefined
        }
      }
    }
  }
</script>
<style scoped>
  @media screen and (max-height: 768px) {
    .menuTreeCard {height: 200px}
  }
</style>

