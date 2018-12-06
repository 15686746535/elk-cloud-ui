<template>
  <div style="height: 100%">
    <el-card style="height: 100%">
      <el-input @keyup.enter.native="searchClick" style="width: 200px;" class="filter-item" placeholder="姓名" clearable v-model="listQuery.condition"></el-input>
      <el-select style="width:200px;" v-model="listQuery.plan" clearable filterable placeholder="设置状态">
        <el-option
          v-for="item in plans"
          :key="item.value"
          :label="item.label"
          :value="item.value">
        </el-option>
      </el-select>

      <el-button class="filter-item" type="primary"  icon="el-icon-search" style="margin-bottom: 15px" @click="searchClick">搜索</el-button>
      <el-table :key='tableKey'  :height="tableHeight-220" @sort-change="sortable" :data="list" v-loading="listLoading" :stripe="true" :fit="false" element-loading-text="给我一点时间" border fit highlight-current-row style="width: 100%" >
        <el-table-column type="index" label="序号"  align="center" width="50"></el-table-column>
        <el-table-column align="center" label="姓名">
          <template slot-scope="scope">
            <span>{{scope.row.target}}</span>
          </template>
        </el-table-column>
        <el-table-column align="center" label="本月目标" sortable="custom" prop="plan">
          <template slot-scope="scope">
            <span  v-if="scope.row.plan != null">{{scope.row.plan}}</span>
            <span  v-else>未设置</span>
          </template>
        </el-table-column>
        <el-table-column align="center" label="本月完成" sortable="custom" prop="complete">
          <template slot-scope="scope">
            <span>{{scope.row.complete }}</span>
          </template>
        </el-table-column>
        <el-table-column align="center" label="执行率">
          <template slot-scope="scope">
            <span>{{percentage(scope.row) }}</span>
          </template>
        </el-table-column>
      </el-table>
      <div v-show="!listLoading" class="pagination-container" style="margin-top: 20px">
        <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" style="float: left"
                       :current-page.sync="listQuery.page" background
                       :page-sizes="[10,20,30, 50]" :page-size="listQuery.limit"
                       layout="total, sizes, prev, pager, next, jumper" :total="total">
        </el-pagination>

        <el-button class="filter-item" type="primary" style="float: right;margin-right: 15px;margin-bottom: 15px"  @click="savePlan">设置我的本月计划</el-button>
      </div>
    </el-card>
  </div>
</template>

<script>
  import { getPlanList, savePlan } from '@/api/upms/user'
  import { mapGetters } from 'vuex'
  import { removeAllSpace } from '@/utils/validate'

  export default {
    name: 'table_target',
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
        list: null,
        total: null,
        listLoading: true,
        plans: [
          {
            label: '已设置',
            value: 1
          },
          {
            label: '未设置',
            value: 2
          }
        ],
        listQuery: {
          page: 1,
          limit: 20,
          plan: null,
          sidx: null, // plan 2未设置  1已设置   排序字段 sidx  排序方式 order
          order: null,
          condition: null
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
      percentage(row) {
        var plan = row.plan
        var complete = row.complete
        if (!plan || isNaN(plan)) return '0%'
        if (!complete || isNaN(complete)) complete = 0
        return Math.round(complete / plan * 100) + '%'
      },
      sortable(data) {
        // plan 1未设置  2已设置   排序字段 sidx  排序方式 order
        var map = {
          ascending: 'ASC',
          descending: 'DESC'
        }
        this.listQuery.sidx = data.prop
        this.listQuery.order = map[data.order]
        this.getList()
      },
      savePlan() {
        this.$prompt('请输入本月计划', '设置我的本月计划', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          inputPattern: /^\d{1,}$/,
          inputErrorMessage: '格式不正确'
        }).then(({ value }) => {
          savePlan(value).then(response => {
            this.getList()
          })
        })
      },
      getList() {
        this.listLoading = true
        this.listQuery.condition = removeAllSpace(this.listQuery.condition)
        getPlanList(this.listQuery).then(response => {
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
      searchClick() {
        this.listQuery.page = 1
        this.getList()
      }
    }
  }
</script>
<style>
  .el-card__body{
    height: 100%;
  }
</style>
