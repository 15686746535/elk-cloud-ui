<template>
  <div class="app-container calendar-list-container" :style="{height: $store.state.app.client.height + 'px'}">
    <el-card>

      <el-table :data="financeList" :height="($store.state.app.client.height-140)" border highlight-current-row stripe v-loading="listLoading" element-loading-text="给我一点时间">
        <el-table-column type="index" label="序号"  align="center" width="50"></el-table-column>
        <el-table-column align="center"  label="学员姓名">
          <template slot-scope="scope">
            <!--<span>{{ scope.row.subject | subjectFilter}}</span>-->
          </template>
        </el-table-column>
        <el-table-column align="center"  label="收款金额">
          <template slot-scope="scope">
            <!--<span>{{ scope.row.subject | subjectFilter}}</span>-->
          </template>
        </el-table-column>
        <el-table-column align="center"  label="收款人">
          <template slot-scope="scope">
            <!--<span>{{ scope.row.subject | subjectFilter}}</span>-->
          </template>
        </el-table-column>
        <el-table-column align="center"  label="收款时间">
          <template slot-scope="scope">
            <!--<span>{{ scope.row.subject | subjectFilter}}</span>-->
          </template>
        </el-table-column>

      </el-table>
      <div v-show="!listLoading" class="pagination-container" style="margin-top: 20px">
        <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange"
                       :current-page.sync="listQuery.page"
                       background
                       style="float: left"
                       size="mini"
                       :page-sizes="[10,20,30,50]" :page-size="listQuery.limit"
                       layout="total, sizes, prev, pager, next, jumper" :total="total">
        </el-pagination>
      </div>
    </el-card>
  </div>
</template>

<script>
  import { removeAllSpace } from '@/utils/validate'
  import { mapGetters } from 'vuex'

  export default {
    name: 'table_log',
    data() {
      return {
        financeList: [],
        // 分页数据
        listQuery: {
          page: 1,
          limit: 20
        },
        total: null,
        listLoading: false
      }
    },
    computed: {
      ...mapGetters([
        'permissions',
        'client'
      ])
    },
    filters: {
    },
    created() {
    },
    methods: {
      // 改变页容量
      handleSizeChange(val) {
        this.listQuery.limit = val
      },
      // 改变当前页
      handleCurrentChange(val) {
        this.listQuery.page = val
      }
    }
  }
</script>
