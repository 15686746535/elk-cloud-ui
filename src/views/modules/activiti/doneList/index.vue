<template>
  <div class="app-container calendar-list-container" :style="{height: $store.state.app.client.height + 'px'}">
    <el-card >
      <el-table :data="list" :height="$store.state.app.client.height - 180" v-loading="listLoading" element-loading-text="给我一点时间" border fit
                highlight-current-row style="width: 100%">
        <!--<el-table-column type="selection" class="selection" align="center" prop='uuid'></el-table-column>-->
        <el-table-column type="index" label="序号"  align="center" width="50"></el-table-column>
        <el-table-column label="内容">
          <template slot-scope="scope">
            <span>{{scope.row.message}}</span>
          </template>
        </el-table-column>
        <el-table-column label="发布人">
          <template slot-scope="scope">
            <span>{{scope.row.initiator}}</span>
          </template>
        </el-table-column>
        <!--<el-table-column label="发布日期">-->
        <!--<template slot-scope="scope">-->
        <!--<span>{{scope.row.createTime}}</span>-->
        <!--</template>-->
        <!--</el-table-column>-->
        <!--<el-table-column label="修改时间">-->
        <!--<template slot-scope="scope">-->
        <!--<span>{{scope.row.updateTime}}</span>-->
        <!--</template>-->
        <!--</el-table-column>-->

        <!--<el-table-column label="操作">-->
        <!--<template slot-scope="scope">-->
        <!--<el-button size="mini" type="success"-->
        <!--@click="handleUpdate(scope.row)">编辑-->
        <!--</el-button>-->
        <!--<el-button size="mini" type="danger"-->
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
import { isDown } from '@/api/activiti/agency'
import { removeAllSpace } from '@/utils/validate'

export default {
  name: 'table_affiche',
  data() {
    return {
      list: [],
      total: null,
      listLoading: true,
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
      isDown(this.listQuery).then(response => {
        console.log(response.data)
        this.list = response.data.data.list
        this.total = response.data.data.totalCount
        this.listLoading = false
      })
    },
    searchClick() {
      this.getList()
    },
    handleSizeChange(val) {
      this.listQuery.limit = val
      this.getList()
    },
    handleCurrentChange(val) {
      this.listQuery.page = val
      this.getList()
    }
  }
}
</script>
