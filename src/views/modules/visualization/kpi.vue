<template>
  <div style="height: 100%">
    <el-card style="height: 100%">
      <div class="filter-container" >
        <div style="height: 40px; width:100%;">
          <el-date-picker value-format="timestamp" v-model="interval" type="daterange" align="left" range-separator="-"
                          start-placeholder="开始日期" end-placeholder="结束日期" >
          </el-date-picker>

          <el-input @keyup.enter.native="searchClick" style="width: 200px;" placeholder="员工名称" v-model="query.name"></el-input>
          <!--<el-col span="6">-->
            <!--<tree-select  style="font-size: 12px;display: inline-block;" v-show="true" url="/upms/org/tree" v-model="query.org" placeholder="所属部门1"></tree-select>-->
          <!--</el-col>-->
            <el-button type="primary"  @click="searchClick">搜索</el-button>
        </div>
      </div>
      <!-- 表格 -->
      <el-table :data="list" v-loading="loading" border="" :height="(tableHeight-195)"  show-summary fit highlight-current-row element-loading-text="给我一点时间"style="width: 100%">
        <el-table-column type="index" label="序号"  align="center" width="50"></el-table-column>
        <el-table-column prop="name"  label="销售员姓名" width="70">
        </el-table-column>
        <el-table-column prop="stname" label="学员姓名"  show-overflow-tooltip>
        </el-table-column>
        <el-table-column prop="count" sortable label="数量" width="70">
        </el-table-column>
      </el-table>
      <!--分页-->
      <div v-show="!loading" class="pagination-container" style="margin-top: 20px">
        <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange"
                       :current-page.sync="query.page" background style="float: left"
                       :page-sizes="[10,20,30, 50]" :page-size="query.limit"
                       layout="total, sizes, prev, pager, next, jumper" :total="total">
        </el-pagination>
      </div>

    </el-card>

  </div>
</template>

<script>
  import { queryIntroducer } from '@/api/visualization/api'
  import { mapGetters } from 'vuex'

  export default {
    name: 'table_vehicle_period',
    props: {
      area: Array
    },
    watch: {
      area: function(val) {
        this.tableHeight = val[1]
      },
      interval: function(val) {
        if (val && val.length > 0) {
          this.query.beginTime = val[0]
          this.query.endTime = val[1]
        } else {
          this.query.beginTime = null
          this.query.endTime = null
        }
      }
    },
    computed: {
      ...mapGetters([
        'permissions',
        'client'
      ])
    },
    components: {
    },
    data() {
      return {
        tableHeight: this.area[1],
        loading: false,
        total: 0,
        list: [],
        interval: [],
        query: {
          page: 1,
          limit: 20,
          name: null,
          beginTime: null,
          endTime: null
        }
      }
    },
    created() {
      var now = new Date() // 当前日期
      var nowMonth = now.getMonth() // 当前月
      var nowYear = now.getFullYear() // 当前年
      var monthStartDate = new Date(nowYear, nowMonth, 1)
      var monthEndDate = new Date(nowYear, nowMonth + 1, 1)
      this.interval = [monthStartDate.getTime(), monthEndDate.getTime()]
      this.getPageList()
    },
    methods: {
      /* 获取数据 */
      getPageList() {
        this.loading = true
        queryIntroducer(this.query).then(res => {
          this.list = res.data.data.list
          this.total = res.data.data.totalCount
          this.loading = false
        })
      },
      // 11
      handleSizeChange(val) {
        this.query.limit = val
        this.getPageList()
      },
      handleCurrentChange(val) {
        this.query.page = val
        this.getPageList()
      },
      searchClick() {
        this.query.page = 1
        this.getPageList()
      }
    }
  }
</script>
<style rel="stylesheet/scss" lang="scss" scoped>

</style>
