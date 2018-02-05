<template>
  <div class="app-container calendar-list-container">
    <div class="filter-container">
      <el-button type="primary" :disabled="option != ''" icon="plus" @click="add">添加</el-button>
      <el-button type="primary" :disabled="option != ''" icon="edit" @click="edit">编辑</el-button>
      <el-button type="primary" :disabled="option != ''" icon="delete" @click="del">删除</el-button>
    </div>

      <el-row :gutter="20">
        <el-col :span="4">
          <el-card class="box-card">
            <org-tree @node-click="searchByOrg" ></org-tree>
          </el-card>
        </el-col>


        <el-col :span="10">
          <el-card class="box-card" style="line-height: 50px;">

            <el-row :gutter="10">
              <el-col :span="4">
                上级部门：
              </el-col>
              <el-col :span="10">
                <el-input v-model="org.parentName == null?'无':org.parentName" disabled ></el-input>
              </el-col>
            </el-row>

            <el-row :gutter="10">
              <el-col :span="4">
                部门名字：
              </el-col>
              <el-col :span="10">
                <el-input placeholder="请输入部门名字" v-model="org.name" clearable></el-input>
              </el-col>
            </el-row>

            <el-row :gutter="10">
              <el-col :span="4">
                备注：
              </el-col>
              <el-col :span="10">
                <el-input type="textarea" :autosize="{ minRows: 11}" placeholder="请输入内容" v-model="org.remark">
                </el-input>
              </el-col>
            </el-row>
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
  import OrgTree from '@/components/OrgTree'
  import waves from '@/directive/waves/index.js' // 水波纹指令
  export default {
    name: 'index',
    components: {
      OrgTree
    },
    directives: {
      waves
    },
    data() {
      return {
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
      filterNode(value, data) {
        if (!value) return true
        return data.label.indexOf(value) !== -1
      },
      getOrgList() {
        fetchTree().then(response => {
          console.log(response.data.data)
          // this.org = response.data.data
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
          remark: null
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
          remark: null
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
          remark: null
        }
      },
      back() {
        this.option = ''
        this.org = {
          orgId: null,
          name: null,
          parentId: null,
          parentName: null,
          remark: null
        }
      },
      save() {
        if (this.option === 'add') {
          addObj(this.org).then(response => {
            console.log('....................')
          })
        } else if (this.option === 'edit') {
          putObj(this.org).then(response => {
            console.log('....................')
          })
        }
      }
    }
  }
</script>

<style scoped>

</style>
