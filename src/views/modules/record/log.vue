<template>
  <div  style="height: 100%">
    <el-card  style="height: 100%">
      <div  style="margin-bottom: 5px;height: 80px;">
        <el-select v-model="listQuery.type" filterable placeholder="请选择">
          <el-option
            v-for="item in dicts"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
        <el-button class="filter-item" type="primary"  icon="search" @click="searchClick">搜索</el-button>
      </div>
      <el-table :key='tableKey' :height="(tableHeight-205)"  :data="list" v-loading="listLoading" element-loading-text="给我一点时间" border fit highlight-current-row style="width: 100%;">
        <el-table-column type="index" label="序号"  align="center" width="50"></el-table-column>

        <el-table-column label="类型" align="center">
          <template slot-scope="scope">
            <span>
                  <el-button type="success" v-if="scope.row.type == 0">{{ scope.row.type | typeFilter }}</el-button>
                  <el-button type="danger" v-if="scope.row.type ==9">{{ scope.row.type | typeFilter }}</el-button>
            </span>
          </template>
        </el-table-column>

        <el-table-column label="请求接口" show-overflow-tooltip>
          <template slot-scope="scope">
            <span>{{ scope.row.requestUri}}</span>
          </template>
        </el-table-column>

        <el-table-column align="center" label="IP地址">
          <template slot-scope="scope">
            <span>{{scope.row.remoteAddr}}</span>
          </template>
        </el-table-column>

        <el-table-column align="center" label="请求方式">
          <template slot-scope="scope">
            <span>{{scope.row.method}}</span>
          </template>
        </el-table-column>

        <el-table-column align="center" label="传入参数" show-overflow-tooltip>
          <template slot-scope="scope">
            <span>{{scope.row.params}}</span>
          </template>
        </el-table-column>

        <el-table-column align="center" label="请求时间">
          <template slot-scope="scope">
            <span>{{scope.row.time}}</span>
          </template>
        </el-table-column>

        <el-table-column align="center" label="创建时间">
          <template slot-scope="scope">
            <!--<span>{{scope.row.createTime}}</span>-->
            <span>{{scope.row.createTime | parseTime('{y}-{m}-{d} {h}:{i}')}}</span>
          </template>
        </el-table-column>


        <!--<el-table-column label="操作">-->
          <!--<template slot-scope="scope">-->
            <!--<el-button size="mini" type="danger" v-if="sys_log_del"-->
                       <!--@click="handleDelete(scope.row)">删除-->
            <!--</el-button>-->
          <!--</template>-->
        <!--</el-table-column>-->


      </el-table>
      <div v-show="!listLoading" class="pagination-container" style="margin-top: 20px">
        <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange"
                       :current-page.sync="listQuery.page" background
                       :page-sizes="[10,20,30, 50]" :page-size="listQuery.limit"
                       layout="total, sizes, prev, pager, next, jumper" :total="total">
        </el-pagination>
      </div>
    </el-card>
  </div>
</template>

<script>
  import { delObj, fetchList } from '@/api/upms/log'
  import { remote } from '@/api/basis/dict'

  import { removeAllSpace } from '@/utils/validate'
  import { mapGetters } from 'vuex'

  export default {
    name: 'table_log',
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
        sys_dict_add: false,
        listLoading: true,
        dicts: [],
        listQuery: {
          page: 1,
          limit: 20,
          type: undefined
        },
        tableKey: 0
      }
    },
    computed: {
      ...mapGetters([
        'permissions',
        'client'
      ])
    },
    filters: {
      typeFilter(type) {
        const typeMap = {
          0: '正常',
          9: '异常'
        }
        return typeMap[type]
      }
    },
    created() {
      remote('log_type').then(response => {
        this.dicts = response.data
      })
      this.getList()
      this.sys_log_del = this.permissions['sys_log_del']
    },
    methods: {
      getList() {
        this.listLoading = true
        this.listQuery.orderByField = 'create_time'
        this.listQuery.isAsc = false
        fetchList(this.listQuery).then(response => {
          this.list = response.data.data.list
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
      handleDelete(row) {
        delObj(row.logId)
          .then(response => {
            this.dialogFormVisible = false
            this.getList()
            this.$notify({
              title: '成功',
              message: '删除成功',
              type: 'success',
              duration: 2000
            })
          })
      },
      searchClick() {
        this.listQuery.page = 1
        this.getList()
      }

    }
  }
</script>
