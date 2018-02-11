<template>
  <div class="app-container calendar-list-container" :style="{height: client.height + 'px'}">
    <!--  <el-row>
          <el-button-group>
            <el-button type="primary" v-if="menuManager_btn_add" icon="plus" @click="handlerAdd">添加</el-button>
            <el-button type="primary" v-if="menuManager_btn_edit" icon="edit" @click="handlerEdit">编辑</el-button>
            <el-button type="primary" v-if="menuManager_btn_del" icon="delete" @click="handleDelete">删除</el-button>
          </el-button-group>
      </el-row>-->
    <el-row :gutter="10">
      <el-col class="org-tree-left">
        <el-card class="box-card">
          <span style="font-size: 16px;font-family: '微软雅黑 Light';color:rgb(145,145,145)">┃ 菜单树</span>
          <tree :list="treeData" id="menuTree"
                :open="false" choiceType="folder"
                @node-click="getNodeData"></tree>
        </el-card>
      </el-col>
      <el-col :style="{width: (client.width-250) + 'px'}">
        <el-card class="box-card">
          <el-form :label-position="labelPosition" label-width="80px" :model="form" ref="form">
            <!--<el-form-item label="类型" prop="type">
              <el-select class="filter-item" v-model="form.type"  :disabled="formEdit"  placeholder="请输入资源请求类型">
                <el-option v-for="item in  typeOptions" :key="item" :label="item | typeFilter" :value="item"> </el-option>
              </el-select>
            </el-form-item>-->
            <el-form-item label="父级节点" prop="parentId">
              <el-input v-model="form.parentName" disabled placeholder="请选择父级节点"></el-input>
            </el-form-item>
            <el-form-item label="菜单名字" prop="name">
              <el-input v-model="form.name" :disabled="formEdit"  placeholder="请输入名字"></el-input>
            </el-form-item>
            <el-form-item label="权限标识" prop="permission">
              <el-input v-model="form.permission" :disabled="formEdit" placeholder="请输入权限标识"></el-input>
            </el-form-item>
            <el-form-item label="图标" prop="icon">
              <div style="position: relative" >
                <a @click="iconDialog = true">1212</a>
                <el-input v-model="form.icon"  placeholder="请选择图标"></el-input>
                <div style="position: absolute;top: 0;right: 45px;font-size: 23px;">
                  <svg-icon v-if="form.icon!=null" :icon-class="form.icon" />
                </div>
              </div>
            </el-form-item>
            <el-form-item label="路由" prop="path">
              <el-input v-model="form.path" :disabled="formEdit" placeholder="请输入资源路径"></el-input>
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

    <el-dialog :visible.sync="iconDialog" width="30%" height="100px">
      <el-tabs type="card" >
        <el-tab-pane >
          <span slot="label"><i class="el-icon-menu"></i> 菜单</span>
          <div class="icon-container">
            <span class="icon-span" v-for="icon in icons" @click="iconSelected(icon)">
              <svg-icon :icon-class="icon"  />
            </span>
          </div>
        </el-tab-pane>
        <el-tab-pane >
          <span slot="label"><i class="el-icon-more"></i> 补充</span>
          <div class="icon-container">
            <span class="icon-span" v-for="icon in icons" @click="iconSelected(icon)">
              <svg-icon :icon-class="icon"  />
            </span>
          </div>
        </el-tab-pane>
      </el-tabs>

      <!--<el-tabs type="border-card">
        <el-tab-pane>
          <span slot="label"><i class="el-icon-date"></i> 我的行程</span>
          我的行程
        </el-tab-pane>
        <el-tab-pane label="消息中心">消息中心</el-tab-pane>
        <el-tab-pane label="角色管理">角色管理</el-tab-pane>
        <el-tab-pane label="定时任务补偿">定时任务补偿</el-tab-pane>
      </el-tabs>-->
    </el-dialog>
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
        iconDialog: false,
        formStatus: '',
        typeOptions: ['0', '1'],
        methodOptions: ['GET', 'POST', 'PUT', 'DELETE'],
        icons: ['404', 'eye', 'menu', 'password', 'user', 'users', 'org',
          'eye', 'menu', 'password', 'user', 'users', 'org',
          'eye', 'menu', 'password', 'user', 'users', 'org',
          'eye', 'menu', 'password', 'user', 'users', 'org',
          'eye', 'menu', 'password', 'user', 'users', 'org'],
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
          parentName: undefined,
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
        'elements',
        'permissions',
        'client'
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
        if (data.parentId === -1) {
          this.form = data
          this.form.parentName = '无'
        } else {
          getObj(data.parentId).then(response => {
            this.form = data
            this.form.parentName = response.data.data.name
          })
        }
        this.currentId = data.id
      },
      iconSelected(icon) {
        this.iconDialog = false
        console.log(icon)
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
        console.log(this.clientHeight)
        // this.$confirm('此操作将永久删除, 是否继续?', '提示', {
        //   confirmButtonText: '确定',
        //   cancelButtonText: '取消',
        //   type: 'warning'
        // }).then(() => {
        //   delObj(this.currentId).then(() => {
        //     this.getList()
        //     this.resetForm()
        //     this.onCancel()
        //     this.$notify({
        //       title: '成功',
        //       message: '删除成功',
        //       type: 'success',
        //       duration: 2000
        //     })
        //   })
        // })
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
  .icon-span{
    font-size: 26px;
    margin: 10px;
    color: black;
  }
  .icon-container{
    height: 250px;
    overflow: auto;
    margin-bottom: 10px;
    padding: 15px;
  }
  .icon-container .icon-span:hover{
    cursor: pointer;
    color: #419dff;
  }
</style>

