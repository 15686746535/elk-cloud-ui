<template>
  <div class="app-container calendar-list-container" :style="{height: client.height + 'px'}">
    <el-row :gutter="10">
      <el-col class="org-tree-left">
        <el-card class="box-card">
          <span style="font-size: 16px;font-family: '微软雅黑 Light';color:rgb(145,145,145)">┃ 部门总览</span>
          <!--<org-tree @node-click="searchByOrg" ></org-tree>-->
          <tree :list="treeData" id="orgTree"
                :open="true" choiceType="folder"
                @node-click="getOrg"></tree>
        </el-card>
      </el-col>

      <el-col :style="{width: (client.width-250) + 'px'}">
        <el-card class="box-card" style="height: 80px;margin-bottom: 10px;">
          <el-button-group>
            <el-button type="primary" icon="plus" @click="operationClick('create')">添加</el-button>
            <el-button type="primary" icon="edit" @click="operationClick('update')">编辑</el-button>
            <el-button type="primary" icon="delete" @click="deleteClick">删除</el-button>
          </el-button-group>
        </el-card>
        <el-card class="box-card" :style="{height: (client.height-130) + 'px'}" style="overflow: auto">
          <el-form label-position="right" label-width="80px" :model="form" ref="form">
            <el-form-item label="上级部门">
              <el-input v-model="form.parentName" disabled placeholder="请选择上级部门"></el-input>
            </el-form-item>

            <el-form-item label="部门名字">
              <el-input v-model="form.name" :disabled="option ===''" placeholder="请输入部门名字"></el-input>
            </el-form-item>

            <el-form-item label="备注">
              <el-input v-model="form.remark" :disabled="option ===''" placeholder="请输入备注"></el-input>
            </el-form-item>

          </el-form>
          <el-row :gutter="10">
            <el-col v-if="option !== ''">
              <el-button type="primary" icon="edit" @click="back">取消</el-button>
              <el-button type="primary" icon="delete" @click="save">确定</el-button>
            </el-col>
          </el-row>
        </el-card>
      </el-col>
    </el-row>

  </div>
</template>

<script>
  import { fetchTree, addObj, putObj, delObj } from '@/api/upms/org'
  import { mapGetters } from 'vuex'
  import Tree from '@/components/Tree'
  import OrgTree from '@/components/OrgTree'
  export default {
    name: 'index',
    components: {
      OrgTree,
      Tree
    },
    data() {
      return {
        treeData: [], /* 树形图数据*/
        org: {
          orgId: null,
          name: null,
          parentId: null,
          parentName: null,
          remark: null,
          orgType: null
        },
        form: {
          orgId: null,
          name: null,
          parentId: null,
          parentName: null,
          remark: null,
          orgType: null
        },
        defaultProps: {
          children: 'children',
          label: 'name'
        },
        listLoading: false,
        listQuery: {
          page: 1,
          limit: 20
        },
        /* 操作状态 create update */
        option: '',
        total: null
      }
    },
    computed: {
      ...mapGetters([
        'client'
      ])
    },
    created() {
      this.getOrgList()
    },
    methods: {
      /* 得到部门信息 */
      getOrg(data) {
        this.org = data
        this.org.orgId = data.id
        this.assignment()
      },
      operationClick(state) {
        this.option = state
        this.assignment()
      },
      assignment() {
        if (this.option === 'create') {
          this.form = {}
          this.form.parentId = this.org.orgId
          this.form.parentName = this.org.name
          if (this.org.orgType === '-') {
            this.form.orgType = '1'
          } else if (this.org.orgType === '1') {
            this.form.orgType = '2'
          } else if (this.org.orgType === '2' || this.org.orgType === '0') {
            this.form.orgType = '0'
          }
        } else if (this.option === 'update' || this.option === '') {
          this.form = this.org
          if (this.org.parentName === null) this.form.parentName = '无'
        }
      },
      /*getOrg(data) {
        console.log('=====================   点击   =======================')
        console.log(data)

        if (this.option === 'add') {
          this.org.parentName = data.name
          this.org.parentId = data.id
          if (data.orgType === '-') {
            this.org.orgType = '1'
          } else if (data.orgType === '1') {
            this.org.orgType = '2'
          } else if (data.orgType === '2' || data.orgType === '0') {
            this.org.orgType = '0'
          }
          console.log('==============================')
          console.log(this.org)
        } else if (this.option === 'edit') {
          if (data.parentId === -1) {
            this.org.parentName = '无'
          } else {
            getObj(data.parentId).then(response => {
              this.org.parentName = response.data.data.name
            })
          }
          if (data.orgType === '-') {
            this.org.orgType = '1'
          } else if (data.orgType === '1') {
            this.org.orgType = '2'
          } else if (data.orgType === '2' || data.orgType === '0') {
            this.org.orgType = '0'
          }
          this.org.parentId = data.parentId
          this.org.orgId = data.id
          this.org.name = data.name
          console.log('==============================')
          console.log(this.org)
        } else if (this.option === 'del') {
          console.log('============ 删除 ================')
        } else if (this.option === '') {
          if (data.parentId === -1) {
            this.org.parentName = null
          } else {
            getObj(data.parentId).then(response => {
              this.org.parentName = response.data.data.name
            })
          }
          if (data.orgType === '-') {
            this.org.orgType = '1'
          } else if (data.orgType === '1') {
            this.org.orgType = '2'
          } else if (data.orgType === '2' || data.orgType === '0') {
            this.org.orgType = '0'
          }
          this.org.parentId = data.parentId
          this.org.orgId = data.id
          this.org.name = data.name
          this.org.remark = data.remark
          console.log('==============================')
          console.log(this.org)
        }
      },*/
      // getNodeData(data) {
      //   this.currentMenu = data
      //   this.setForm()
      // },
      // filterNode(value, data) {
      //   if (!value) return true
      //   return data.label.indexOf(value) !== -1
      // },
      getOrgList() {
        fetchTree().then(response => {
          console.log(response.data.data)
          // this.org = response.data.data
          this.treeData = response.data.data
          console.log(this.treeData)
        })
      },
      back() {
        this.option = ''
        this.form = {
          orgId: null,
          name: null,
          parentId: null,
          parentName: null,
          remark: null,
          orgType: null
        }
      },
      save() {
        if (this.option === 'create') {
          addObj(this.form).then(response => {
            console.log('....................')
            this.option = ''
            this.$notify({
              title: '成功',
              message: '创建成功',
              type: 'success',
              duration: 2000
            })
            this.getOrgList()
          })
        } else if (this.option === 'update') {
          putObj(this.form).then(response => {
            console.log('....................')
            this.option = ''
            this.$notify({
              title: '成功',
              message: '修改成功',
              type: 'success',
              duration: 2000
            })
            this.getOrgList()
          })
        }
      },
      deleteClick() {
        this.$confirm('此操作将永久删除, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          delObj(this.org.orgId).then(() => {
            this.$notify({
              title: '成功',
              message: '删除成功',
              type: 'success',
              duration: 2000
            })
            this.getOrgList()
          })
        })
      }
    }
  }
</script>

<style scoped>

</style>
