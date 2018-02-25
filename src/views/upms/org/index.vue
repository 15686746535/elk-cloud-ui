<template>
  <div class="app-container calendar-list-container" :style="{height: client.height + 'px'}">
    <el-row :gutter="10">
      <el-col class="org-tree-left">
        <el-card class="box-card">
          <span style="font-size: 16px;font-family: '微软雅黑 Light';color:rgb(145,145,145)">┃ 部门总览</span>
          <tree :list="treeData" id="menuTree"
                :open="true" choiceType="folder"
                @node-click="searchByOrg"></tree>
        </el-card>
      </el-col>

      <el-col :style="{width: (client.width-250) + 'px'}">
        <el-card class="box-card" style="height: 80px;margin-bottom: 10px;">
          <el-button-group>
            <el-button type="primary" :disabled="option != ''" icon="plus" @click="add">添加</el-button>
            <el-button type="primary" :disabled="option != ''" icon="edit" @click="edit">编辑</el-button>
            <el-button type="primary" :disabled="option != ''" icon="delete" @click="del">删除</el-button>
          </el-button-group>
        </el-card>
        <el-card class="box-card" :style="{height: (client.height-130) + 'px'}" style="overflow: auto">
          <el-form label-position="right" label-width="80px" :model="org" ref="org">
            <el-form-item label="上级部门">
              <el-input v-model="org.parentName" disabled placeholder="请选择上级部门"></el-input>
            </el-form-item>

            <el-form-item label="部门名字">
              <el-input v-model="org.name" :disabled="false" placeholder="请输入部门名字"></el-input>
            </el-form-item>

            <el-form-item label="备注">
              <el-input v-model="org.remark" :disabled="false" placeholder="请输入备注"></el-input>
            </el-form-item>

          </el-form>
          <el-row :gutter="10">
            <el-col v-if="option === 'edit' || option === 'add'">
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
  import { fetchTree, addObj, getObj, putObj } from '@/api/upms/org'
  import { mapGetters } from 'vuex'
  import Tree from '@/components/Tree'
  export default {
    name: 'index',
    components: {
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
        defaultProps: {
          children: 'children',
          label: 'name'
        },
        listLoading: false,
        listQuery: {
          page: 1,
          limit: 20
        },
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
      // 根据部门id查询员工
      searchByOrg(data) {
        console.log('=====================   点击   =======================')
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
          console.log('==============================')
          console.log(this.org)
        }
      },
      getNodeData(data) {
        this.currentMenu = data
        this.setForm()
      },
      filterNode(value, data) {
        if (!value) return true
        return data.label.indexOf(value) !== -1
      },
      getOrgList() {
        fetchTree().then(response => {
          console.log(response.data.data)
          // this.org = response.data.data
          this.treeData = response.data.data
        })
      },
      add() {
        console.log('=========== 添加 ===========')
        this.option = 'add'
        this.org = {
          orgId: null,
          name: null,
          parentId: null,
          parentName: null,
          remark: null,
          orgType: null
        }
      },
      edit() {
        console.log('=========== 编辑 ===========')
        this.option = 'edit'
        this.org = {
          orgId: null,
          name: null,
          parentId: null,
          parentName: null,
          remark: null,
          orgType: null
        }
      },
      del() {
        console.log('=========== 删除 ===========')
        this.option = 'del'
        this.org = {
          orgId: null,
          name: null,
          parentId: null,
          parentName: null,
          remark: null,
          orgType: null
        }
      },
      back() {
        this.option = ''
        this.org = {
          orgId: null,
          name: null,
          parentId: null,
          parentName: null,
          remark: null,
          orgType: null
        }
      },
      save() {
        if (this.option === 'add') {
          addObj(this.org).then(response => {
            console.log('....................')
            this.option = ''
          })
        } else if (this.option === 'edit') {
          putObj(this.org).then(response => {
            console.log('....................')
            this.option = ''
          })
        }
      }
    }
  }
</script>

<style scoped>

</style>
