<template>
  <div class="app-container calendar-list-container" :style="{height: $store.state.app.client.height + 'px'}" >
    <el-card style="margin-bottom: 5px;height: 80px;">
      <el-input @keyup.enter.native="searchClick" style="width: 200px;" class="filter-item" placeholder="关键词" v-model="listQuery.name"></el-input>
      <el-button class="filter-item" type="primary"  icon="search" @click="searchClick">搜索</el-button>
    </el-card>
    <el-card :style="{height: ($store.state.app.client.height - 125) + 'px'}">
      <el-table :height="$store.state.app.client.height - 225" :data="list" v-loading="listLoading" element-loading-text="给我一点时间" border fit
                highlight-current-row style="width: 100%">
        <el-table-column type="index" label="序号"  align="center" width="50"></el-table-column>
        <el-table-column  align="center" label="内容">
          <template slot-scope="scope">
            <span>{{scope.row.content}}</span>
          </template>
        </el-table-column>
        <el-table-column align="center" label="接收者姓名">
          <template slot-scope="scope">
            <span>{{scope.row.name}}</span>
          </template>
        </el-table-column>
        <el-table-column align="center" label="接收电话">
          <template slot-scope="scope">
            <span>{{scope.row.mobile}}</span>
          </template>
        </el-table-column>
        <el-table-column align="center" label="发送状态">
          <template slot-scope="scope">
            <span>{{scope.row.sendType}}</span>
          </template>
        </el-table-column>
        <el-table-column align="center" label="模板类型">
          <template slot-scope="scope">
            <span>{{scope.row.modelType}}</span>
          </template>
        </el-table-column>
        <el-table-column align="center" label="发送时间">
          <template slot-scope="scope">
            <span>{{scope.row.sendTime}}</span>
          </template>
        </el-table-column>

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
  import { fetchList, getObj } from '@/api/basis/sendmsg'
  import { mapGetters } from 'vuex'

  import { removeAllSpace } from '@/utils/validate'

  export default {
    name: 'table_sendmsg',
    computed: {
      ...mapGetters([
        'permissions',
        'client'
      ])
    },
    data() {
      return {
        sendMsg: {},
        list: [],
        total: null,
        listLoading: true,
        dialogStatus: 'create',
        showModule: 'list',
        listQuery: {
          page: 1,
          limit: 20,
          name: null
        }
      }
    },
    created() {
      this.getList()
    },
    methods: {
      getList() {
        this.listLoading = true
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
      searchClick() {
        this.listQuery.page = 1
        this.getList()
      }
    }
  }
</script>
