<template>
  <div class="app-container calendar-list-container" :style="{height: $store.state.app.client.height + 'px'}">
    <el-card>

      <el-table :data="financeList" :height="($store.state.app.client.height-140)" highlight-current-row stripe v-loading="listLoading" element-loading-text="给我一点时间">
        <el-table-column type="expand">
          <template slot-scope="props">
            <el-row style="text-align: center">
              <el-col :span="12" style="color: #909399;font-weight: 600;border-bottom: 1px solid #ebeef5;border-right: 1px solid #ebeef5;line-height: 40px">
                <el-col :span="12">方式</el-col>
                <el-col :span="12">金额</el-col>
              </el-col>
              <el-col :span="12" style="color: #909399;font-weight: 600;border-bottom: 1px solid #ebeef5;line-height: 40px">
                <el-col :span="12">方式</el-col>
                <el-col :span="12">金额</el-col>
              </el-col>
              <span v-for="(payType,index) in props.row.payTypeList">

                <el-col v-if="index/2 === 0" :span="12" style="border-bottom: 1px solid #ebeef5;border-right: 1px solid #ebeef5;line-height: 40px">
                  <el-col :span="12">{{payType.mode}}</el-col>
                  <el-col :span="12">{{payType.money}}</el-col>
                </el-col>
                <el-col v-else :span="12" style="border-bottom: 1px solid #ebeef5;line-height: 40px">
                  <el-col :span="12">{{payType.mode}}</el-col>
                  <el-col :span="12">{{payType.money}}</el-col>
                </el-col>
              </span>
            </el-row>



          </template>
        </el-table-column>
        <el-table-column type="index" label="序号"  align="center" width="50"></el-table-column>
        <el-table-column align="center"  label="学员姓名">
          <template slot-scope="scope">
            <span>{{ scope.row.name}}</span>
          </template>
        </el-table-column>
        <el-table-column align="center"  label="身份证">
          <template slot-scope="scope">
            <span>{{ scope.row.idNumber}}</span>
          </template>
        </el-table-column>
        <el-table-column align="center"  label="收款金额">
          <template slot-scope="scope">
            <span>{{ scope.row.realPrice}}</span>
          </template>
        </el-table-column>
        <el-table-column align="center"  label="收款人">
          <template slot-scope="scope">
            <span>{{ scope.row.payee}}</span>
          </template>
        </el-table-column>
        <el-table-column align="center"  label="收款时间">
          <template slot-scope="scope">
            <span>{{ scope.row.createTime | subTime}}</span>
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
  import { getServiceChargeList } from '@/api/finance/service-charge'

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
      this.getServiceChargeList()
    },
    methods: {
      getServiceChargeList() {
        getServiceChargeList(this.listQuery).then(response => {
          this.financeList = response.data.data.list
          this.total = response.data.totalCount
        })
      },
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
