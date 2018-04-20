<template>
  <div class="app-container calendar-list-container" :style="{height: $store.state.app.client.height + 'px'}">
    <el-row :gutter="10">
      <el-col class="org-tree-left">
        <el-card class="box-card">
          <span style="font-size: 16px;font-family: '微软雅黑 Light';color:rgb(145,145,145)">┃ 菜单树</span>
          <my-tree url="/upms/menu/tree"
                   v-model="currentId"
                   choiceType="folder"
                   @node="getNodeData"></my-tree>
        </el-card>
      </el-col>

      <el-col :style="{width: ($store.state.app.client.width-250) + 'px'}">
        <el-card class="box-card" style="height: 80px;margin-bottom: 10px;">
          <el-button-group>
            <el-button type="primary" v-if="menuManager_btn_add" @click="handlerAdd"><i class="el-icon-plus"></i>添加</el-button>
            <el-button type="primary"  @click="handlerEdit"><i class="el-icon-edit"></i>编辑</el-button>
            <el-button type="primary" v-if="menuManager_btn_del" @click="handleDelete"><i class="el-icon-delete"></i>删除</el-button>
          </el-button-group>
        </el-card>
        <el-card class="box-card" :style="{height: ($store.state.app.client.height-130) + 'px'}" style="overflow: auto">
          <el-form label-position="right" label-width="80px" :model="form" ref="form">
            <el-form-item label="父级节点" prop="parentId">
              <el-input v-model="parentName" disabled placeholder="请选择父级节点"></el-input>
            </el-form-item>
            <el-form-item label="节点类型" prop="type">
              <el-select v-model="form.type"  :disabled="formEdit"  placeholder="请选择菜单类型">
                <el-option key="0" label="菜单" value="0"> </el-option>
                <el-option key="1" label="按钮" value="1"> </el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="菜单名字" prop="name">
              <el-input v-model="form.name" :disabled="formEdit"  placeholder="请输入名字"></el-input>
            </el-form-item>
            <el-form-item label="权限标识" v-if="form.parentId!==-1||form.type==='1'" prop="permission">
              <el-input v-model="form.permission" :disabled="formEdit" placeholder="请输入权限标识"></el-input>
            </el-form-item>
            <el-form-item label="菜单图标" v-if="form.type==='0'" prop="icon">
              <div style="position: relative" >
                <input class="ran-input hover" @click="formEdit?iconDialog = false:iconDialog = true" :class="formEdit?'disabled':''"
                       style="height: 40px;"  v-model="form.icon" readonly  placeholder="请选择图标"/>
                <div style="position: absolute;top: 0;right: 15px;font-size: 24px;">
                  <svg-icon v-if="form.icon!=null" :icon-class="form.icon" />
                </div>
              </div>
            </el-form-item>
            <el-form-item label="菜单路由" v-if="form.type==='0'" prop="path">
              <el-input v-model="form.path" :disabled="formEdit" placeholder="请输入路由"></el-input>
            </el-form-item>
            <el-form-item label="资源路径"v-if="form.parentId!==-1||form.type==='1'" prop="url">
              <el-input v-model="form.url" :disabled="formEdit" placeholder="请输入资源路径"></el-input>
            </el-form-item>
            <el-form-item label="请求方法" v-show="form.parentId!==-1||form.type==='1'" prop="method">
              <el-select class="filter-item" v-model="form.method"  :disabled="formEdit"  placeholder="请选择请求类型">
                <el-option v-for="item in  methodOptions" :key="item" :label="item" :value="item"> </el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="前端路径" v-if="form.type==='0'"  prop="component">
              <el-input v-model="form.component" :disabled="formEdit" placeholder="前端页面路径"></el-input>
            </el-form-item>
            <el-form-item label="排序" prop="sort">
              <el-input v-model="form.sort" type="number" :disabled="formEdit" placeholder="请输入排序"></el-input>
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

    <el-dialog :visible.sync="iconDialog" custom-class="tabs-dialog"  width="500px" class="my-dialog">
      <el-tabs type="border-card" >
        <el-tab-pane >
          <span slot="label"><i class="el-icon-menu"></i> 菜单</span>
          <div class="icon-container">
            <span class="icon-span"  @click="iconSelected('')">无</span>
            <span class="icon-span" v-for="icon in icons" @click="iconSelected(icon)">
              <svg-icon :icon-class="icon"  />
            </span>
          </div>
        </el-tab-pane>
        <el-tab-pane >
          <span slot="label"><i class="el-icon-more"></i> 补充</span>
          <div class="icon-container">
            <span v-if="index%2" class="icon-span" v-for="(icon,index) in icons" @click="iconSelected(icon)">
              <svg-icon :icon-class="icon"  />
            </span>
          </div>
        </el-tab-pane>
      </el-tabs>
    </el-dialog>
  </div>
</template>

<script>
  import { fetchTree, getObj, addObj, delObj, putObj } from '@/api/upms/menu'
  import { mapGetters } from 'vuex'
  export default {
    name: 'menu',
    data() {
      return {
        formStatus: '', /* 编辑状态update/create*/
        iconDialog: false, /* 图标弹框*/
        typeOptions: ['0', '1'],
        methodOptions: ['GET', 'POST', 'PUT', 'DELETE'],
        icons: ['404', 'eye', 'menu', 'password', 'user', 'users', 'org',
          'eye', 'menu', 'password', 'user', 'users', 'org',
          'eye', 'menu', 'password', 'user', 'users', 'org',
          'eye', 'menu', 'password', 'user', 'users', 'org',
          'eye', 'menu', 'password', 'user', 'users', 'org',
          'eye', 'menu', 'password', 'user', 'users', 'org'], /* 图标*/
        treeData: [], /* 树形图数据*/
        form: {
          permission: undefined,
          name: undefined,
          parentId: undefined,
          url: undefined,
          path: undefined,
          icon: undefined,
          sort: undefined,
          component: undefined,
          type: undefined,
          generateBtn: false,
          method: undefined
        },
        currentId: null, /* 当前选中的菜单*/
        currentMenu: null, /* 当前选中的菜单*/
        parentName: null, /* 当前选中的菜单*/
        menuManager_btn_add: true,
        menuManager_btn_edit: true,
        menuManager_btn_del: true
      }
    },
    created() {
      this.getList()
      this.menuManager_btn_add = this.permissions['upms_menu_add']
      this.menuManager_btn_edit = this.permissions['upms_menu_update']
      this.menuManager_btn_del = this.permissions['upms_menu_del']
    },
    computed: {
      ...mapGetters([
        'elements',
        'permissions',
        'client'
      ]),
      formEdit() {
        return this.formStatus === ''
      }
    },
    methods: {
      getList() {
        fetchTree().then(response => {
          console.log(123)
          console.log(response)
          this.treeData = response.data.data
        })
      },
      getNodeData(data) {
        this.currentMenu = data
        this.setForm()
      },
      setForm() {
        if (this.formStatus === 'update') {
          this.form = this.currentMenu
          this.form.menuId = this.currentMenu.id
          this.parentName = this.currentMenu.parentName ? this.currentMenu.parentName : '无'
        } else if (this.formStatus === 'create') {
          if (this.currentMenu) {
            this.parentName = this.currentMenu.name
            this.form.parentId = this.currentMenu.id
          } else {
            this.parentName = '无'
            this.form.parentId = -1
          }
        }
      },
      iconSelected(icon) {
        this.iconDialog = false
        this.form.icon = icon
      },
      handlerEdit() {
        if (this.currentMenu) {
          this.formStatus = 'update'
          this.setForm()
        } else {
          this.$notify({
            title: '错误',
            message: '请选择菜单',
            type: 'error',
            duration: 2000
          })
        }
      },
      handlerAdd() {
        this.formStatus = 'create'
        this.resetForm()
        this.setForm()
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
        this.formStatus = ''
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
        this.formStatus = ''
        this.form.generateBtn = (this.form.type === '0')
        addObj(this.form).then(() => {
          this.getList()
          this.resetForm()
          this.$notify({
            title: '成功',
            message: '创建成功',
            type: 'success',
            duration: 2000
          })
        })
      },
      onCancel() {
        this.resetForm()
        this.formStatus = ''
      },
      resetForm() {
        this.form = {
          permission: undefined,
          name: undefined,
          parentId: undefined,
          url: undefined,
          path: undefined,
          icon: undefined,
          sort: undefined,
          component: undefined,
          type: undefined,
          generateBtn: false,
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
    font-size: 30px;
    margin: 10px;
    color: black;
    line-height: 40px;
  }
  .icon-container{
    height: 250px;
    overflow: auto;
    margin-bottom: 10px;
    padding-left: 10px;
  }
  .icon-container .icon-span:hover{
    cursor: pointer;
    color: #419dff;
  }
  .ran-input{
    width: 100%;
    -webkit-appearance: none;
    background-color: #fff;
    border-radius: 4px;
    border: 1px solid #dcdfe6;
    box-sizing: border-box;
    color: #606266;
    display: inline-block;
    font-size: inherit;
    line-height: 1;
    outline: 0;
    padding: 0 15px;
    -webkit-transition: border-color .2s cubic-bezier(.645,.045,.355,1);
    transition: border-color .2s cubic-bezier(.645,.045,.355,1);
  }
  .ran-input:hover{
    border: 1px solid #bfc1c7;
  }
  .ran-input.disabled{
    background-color: #f5f7fa;
    border-color: #e4e7ed;
    color: #c0c4cc;
    cursor: not-allowed;
  }
  .my-dialog{
  }

</style>

