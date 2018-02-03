<template>
  <div class="app-container calendar-list-container">
    <div class="filter-container">
      <el-button class="filter-item" style="margin-left: 10px;" @click="add" type="primary" icon="plus">添加</el-button>
    </div>

      <el-row>
        <el-col :span="8" style='margin-top:15px;'>
          <!--<el-tree-->
            <!--class="filter-tree"-->
            <!--:data="treeData"-->
            <!--node-key="id"-->
            <!--highlight-current-->
            <!--:props="defaultProps"-->
            <!--:filter-node-method="filterNode"-->
            <!--@node-click="getUserList"-->
            <!--default-expand-all-->
          <!--&gt;-->
          <!--</el-tree>-->
          <org-tree @node-click="searchByOrg" ></org-tree>
        </el-col>


        <el-col :span="10">
          <el-table :key='tableKey' :data="treeData" v-loading="listLoading" element-loading-text="给我一点时间" border fithighlight-current-row style="width: 100%" border tooltip-effect="dark">

            <el-table-column type="selection" class="selection" prop='uuid'></el-table-column>


            <el-table-column prop="id" label="主键"></el-table-column>
            <el-table-column prop="name" label="部门名字"></el-table-column>
            <el-table-column prop="parentId" label="上级部门"></el-table-column>
            <el-table-column prop="remarks" label="备注"></el-table-column>
            <el-table-column prop="createTime" label="创建时间"></el-table-column>
            <el-table-column prop="updateTime" label="修改时间"></el-table-column>
          </el-table>

          <!--<div v-show="!listLoading" class="pagination-container" style="margin-top: 20px">-->
          <!--<el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange"-->
                         <!--:current-page.sync="listQuery.page" background-->
                         <!--:page-sizes="[10,20,30, 50]" :page-size="listQuery.limit"-->
                         <!--layout="total, sizes, prev, pager, next, jumper" :total="total">-->
          <!--</el-pagination>-->
        <!--</div>-->
        </el-col>
      </el-row>


  <!--<div v-show="!listLoading" class="pagination-container" style="margin-top: 20px">-->
  <!--<el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange"-->
                 <!--:current-page.sync="listQuery.page" background-->
                 <!--:page-sizes="[10,20,30, 50]" :page-size="listQuery.limit"-->
                 <!--layout="total, sizes, prev, pager, next, jumper" :total="total">-->
  <!--</el-pagination>-->
  <!--</div>-->

</div>
</template>

<script>
  import { fetchTree } from '@/api/upms/org'
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
        treeData: [],
        defaultProps: {
          children: 'children',
          label: 'name'
        },
        listLoading: false,
        tableKey: 0,
        listQuery: {
          page: 1,
          limit: 20
        },
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
        console.log(data)
      },
      filterNode(value, data) {
        if (!value) return true
        return data.label.indexOf(value) !== -1
      },
      getOrgList() {
        fetchTree().then(response => {
          console.log(response.data.data)
          this.treeData = response.data.data
        })
      },
      add() {
        console.log('=========== 添加 ===========')
      }
    }
  }
</script>

<style scoped>

</style>
