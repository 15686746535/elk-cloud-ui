<template>
  <div class="app-container calendar-list-container" :style="{height: $store.state.app.client.height + 'px'}">
    <el-row :gutter="10">
      <el-col class="org-tree-left">
        <el-card class="box-card">
          <span style="font-size: 16px;font-family: '微软雅黑 Light';color:rgb(145,145,145)">┃ 部门总览</span>
          <my-tree :data="treeData"
                   v-model="org.orgId"
                   choiceType="folder"
                   @node="getOrg"></my-tree>
        </el-card>
      </el-col>

      <el-col :style="{width: ($store.state.app.client.width-250) + 'px'}">
        <el-card class="box-card" style="height: 80px;margin-bottom: 10px;">
          <el-button-group>
            <el-button type="primary" @click="operationClick('create')"><i class="el-icon-plus"></i>添加</el-button>
            <el-button type="primary" icon="edit" @click="operationClick('update')">编辑</el-button>
            <el-button type="primary" icon="delete" @click="deleteClick">删除</el-button>
          </el-button-group>
        </el-card>
        <el-card class="box-card" :style="{height: ($store.state.app.client.height-130) + 'px'}" style="overflow: auto">
          <el-form label-position="right" label-width="80px"  :rules="rules" :model="form" ref="form">
            <el-form-item label="上级部门" prop="parentName">
              <el-input v-model="form.parentName" readonly :disabled="option ===''" placeholder="请选择上级部门"></el-input>
            </el-form-item>

            <el-form-item label="部门名字" prop="orgName">
              <el-input v-model="form.orgName" :disabled="option ===''" placeholder="请输入部门名字"></el-input>
            </el-form-item>
            <el-form-item label="排序"  prop="sort">
              <el-input type="number" :min="0"  v-model.number="form.sort" :disabled="option ===''" placeholder="排序"></el-input>
            </el-form-item>
            <el-form-item label="备注"  prop="remark">
              <el-input  v-model="form.remark" :disabled="option ===''" placeholder="请输入备注"></el-input>
            </el-form-item>

          </el-form>
          <el-row :gutter="10">
            <el-col v-if="option !== ''">
              <el-button type="primary" icon="edit" @click="back('form')">取消</el-button>
              <el-button type="primary" icon="delete" @click="save('form')">确定</el-button>
            </el-col>
          </el-row>
        </el-card>
      </el-col>
    </el-row>

  </div>
</template>

<script>
  import { fetchTree, addObj, putObj, delObj } from '@/api/upms/org'

  export default {
    name: 'index',
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
        rules: {
          parentName: [
            {
              required: true,
              message: '父级部门',
              trigger: ['blur', 'change']
            }
          ],
          sort: [
            {
              required: true,
              message: '排序',
              trigger: ['blur', 'change']
            }
          ],
          orgName: [
            {
              required: true,
              message: '部门名称',
              trigger: ['blur', 'change']
            }
          ],
          remark: [
            {
              required: false,
              message: '备注',
              trigger: ''
            }
          ]
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
    },
    created() {
      this.getOrgList()
    },
    methods: {
      /* 得到部门信息 */
      getOrg(data) {
        this.org = data
        this.assignment()
      },
      operationClick(state) {
        this.option = state
        this.assignment()
      },
      assignment() {
        if (this.option === 'create') {
          console.log('create')
          this.form.parentId = this.org.orgId
          this.form.groupId = this.org.groupId
          this.form.companyId = this.org.companyId
          this.form.parentName = this.org.name
          if (this.org.orgType === '-') {
            this.form.orgType = '1'
          } else if (this.org.orgType === '1') {
            this.form.orgType = '2'
          } else if (this.org.orgType === '2' || this.org.orgType === '0') {
            this.form.orgType = '0'
          }
        } else if (this.option === 'update') {
          console.log('update')
          this.form = this.org
          if (this.org.parentName === null) this.form.parentName = '无'
        }
      },
      getOrgList() {
        fetchTree().then(response => {
          this.treeData = response.data.data
        })
      },
      back(formName) {
        this.option = ''
        this.$refs[formName].resetFields()
      },
      save(formName) {
        const set = this.$refs
        set[formName].validate(valid => {
          if (valid) {
            if (this.option === 'create') {
              addObj(this.form).then(response => {
                this.option = ''
                this.getOrgList()
              })
            } else if (this.option === 'update') {
              putObj(this.form).then(response => {
                this.option = ''
                this.getOrgList()
              })
            }
          }
        })
      },
      deleteClick() {
        if (this.org.orgId === null) {
          this.$alert('请先选择部门', '提示', {
            type: 'warning'
          })
        } else {
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
  }
</script>

<style scoped>

</style>
