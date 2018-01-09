<template>
  <div class="app-container calendar-list-container">
    <div class="filter-container">
      <el-button class="filter-item" style="margin-left: 10px;" @click="handleCreate" type="primary" icon="edit">添加</el-button>
    </div>
    <el-table :key='tableKey' :data="list" v-loading="listLoading" element-loading-text="给我一点时间" border fithighlight-current-row style="width: 100%"
            border tooltip-effect="dark">

      <el-row>
        <el-col :span="8" style='margin-top:15px;'>
          <el-tree
            class="filter-tree"
            :data="list"
            node-key="id"
            highlight-current
            :props="defaultProps"
            :filter-node-method="filterNode"
            @node-click="getNodeData"
            default-expand-all
          >
          </el-tree>
        </el-col>
      </el-row>


      <el-table-column type="selection" class="selection" prop='uuid'></el-table-column>


      <el-table-column prop="a" label="username"></el-table-column>
      <el-table-column prop="b" label="创建时间"></el-table-column>
      <el-table-column prop="a" label="创建时间"></el-table-column>
      <el-table-column prop="b" label="创建时间"></el-table-column>
      <el-table-column prop="a" label="创建时间"></el-table-column>
      <el-table-column prop="a" label="创建时间"></el-table-column>
    </el-table>


  <div v-show="!listLoading" class="pagination-container">
    <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange"
                   :current-page.sync="listQuery.page"
                   :page-sizes="[10,20,30, 50]" :page-size="listQuery.limit"
                   layout="total, sizes, prev, pager, next, jumper" :total="total">
    </el-pagination>
  </div>

  <!--<div v-show="!listLoading" class="pagination-container">-->
  <!--<el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange"-->
                 <!--:current-page.sync="listQuery.page"-->
                 <!--:page-sizes="[10,20,30, 50]" :page-size="listQuery.limit"-->
                 <!--layout="total, sizes, prev, pager, next, jumper" :total="total">-->
  <!--</el-pagination>-->
  <!--</div>-->

</div>
</template>

<script>
  import { fetchTree, getObj } from '@/api/menu'
  import waves from '@/directive/waves/index.js' // 水波纹指令
  export default {
    name: 'index',
    directives: {
      waves
    },
    data() {
      return {
        list: [
          { a: 1,
            b: 0 },
          { a: 1,
            b: 0 },
          { a: 1,
            b: 0 }
        ],
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
    methods: {
      getList() {
        fetchTree(this.listQuery).then(response => {
          this.treeData = response.data.data
        })
      },
      filterNode(value, data) {
        if (!value) return true
        return data.label.indexOf(value) !== -1
      },
      getNodeData(data) {
        if (!this.formEdit) {
          this.formStatus = 'update'
        }
        getObj(data.id).then(response => {
          this.form = response.data
        })
        this.currentId = data.id
        this.showElement = true
      }
    }
  }
</script>

<style scoped>

</style>
