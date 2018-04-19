<template>
  <div class="app-container calendar-list-container" :style="{height: $store.state.app.client.height + 'px'}">
        <div v-show="showModule=='list'">
          <el-card body-style="padding:10px 20px;" style="margin-bottom: 5px;height: 60px">
            <div class="filter-container">
              <div style="float: right">
                <el-input @keyup.enter.native="searchClick" style="width: 200px;" class="filter-item" placeholder="接送人/接送名单" v-model="listQuery.condition"></el-input>
                <el-button class="filter-item" type="primary"  @click="searchClick">搜索</el-button>
              </div>
            </div>
          </el-card>
            <el-card :style="{height: ($store.state.app.client.height - 105) + 'px'}">
              <el-table :data="list"  :height="($store.state.app.client.height-195)"  v-loading="listLoading" element-loading-text="给我一点时间"  fit highlight-current-row style="width: 100%">
                <el-table-column type="expand">
                  <template slot-scope="props">
                    <div v-for="student in props.row.studentList">
                      {{student.studentName}}
                      {{student.mobile}}
                    </div>
                  </template>
                </el-table-column>
                <el-table-column type="index" label="序号"  align="center" width="50"></el-table-column>
                <el-table-column align="center" label="接送人">
                    <template slot-scope="scope">
                        <span>{{scope.row.name}}</span>
                    </template>
                </el-table-column>
                <el-table-column align="center" label="接送区域">
                    <template slot-scope="scope">
                        <span>{{scope.row.region}}</span>
                    </template>
                </el-table-column>
                <!--<el-table-column align="center" label="接送时间">-->
                    <!--<template slot-scope="scope">-->
                        <!--<span>{{scope.row.shuttleTime}}</span>-->
                    <!--</template>-->
                <!--</el-table-column>-->
                <el-table-column align="center" label="接送日期">
                    <template slot-scope="scope">
                        <span>{{scope.row.shuttleTime | subTime}}</span>
                    </template>
                </el-table-column>


              </el-table>
              <div v-show="!listLoading" class="pagination-container" style="margin-top: 20px">
                <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange"
                               :current-page.sync="listQuery.page" background
                               style="float: left"
                               :page-sizes="[10,20,30, 50]" :page-size="listQuery.limit"
                               layout="total, sizes, prev, pager, next, jumper" :total="total">
                </el-pagination>
                <el-button style="float:right;" @click="create" type="primary"><i class="el-icon-plus"></i>添加</el-button>
              </div>
            </el-card>
        </div>
    </div>
</template>

<script>
import { fetchList, getObj } from '@/api/bespeak/shuttle'

import { mapGetters } from 'vuex'
import { removeAllSpace } from '@/utils/validate'

export default {
  name: 'table_shuttle',
  computed: {
    ...mapGetters([
      'permissions',
      'client'
    ])
  },
  data() {
    return {
      shuttle: {},
      list: [],
      total: null,
      listLoading: true,
      showModule: 'list',
      listQuery: {
        page: 1,
        limit: 20
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
        console.log('=========== 接送名单 ==========')
        console.log(response.data)
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
    create() {
      this.shuttle = {}
      this.showModule = 'info'
    },
    update(row) {
      getObj(row.roleId)
        .then(response => {
          this.shuttle = response.data
          this.showModule = 'info'
        })
    },
    searchClick() {
      this.listQuery.page = 1
      this.getList()
    },
    delete(id) {
      this.getList()
    },
    cancel() {
      this.showModule = 'list'
    }
  }
}
</script>
