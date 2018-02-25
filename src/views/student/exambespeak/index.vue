<template>
  <div class="app-container calendar-list-container" :style="{height: client.height + 'px'}">
    <el-card style="margin-bottom: 5px;height: 80px">
      <el-button v-waves @click="handleField(1)" type="success" plain>科目一</el-button>
      <el-button v-waves @click="handleField(2)" type="success" plain>科目二</el-button>
      <el-button v-waves @click="handleField(3)" type="success" plain>科目三</el-button>
      <el-button v-waves @click="handleField(4)" type="success" plain>科目四</el-button>
    </el-card>
    <el-row :gutter="5"  :style="{height: (client.height - 125) + 'px'}">

      <el-col :span="12">
        <el-card >
          <el-table :data="list"   :style="{height: (client.height-205) + 'px'}" v-loading="listLoading" element-loading-text="给我一点时间" border fithighlight-current-row style="width: 100%">
            <el-table-column type="selection" class="selection" align="center" prop='uuid'></el-table-column>
            <el-table-column type="index" label="序号"  align="center" width="50"></el-table-column>
            <el-table-column label="主键">
              <template slot-scope="scope">
                <span>{{scope.row.studentId}}</span>
              </template>
            </el-table-column>

          </el-table>
          <div v-show="!listLoading" class="pagination-container" style="margin-top: 20px">
            <el-pagination @size-change="handleStudentSizeChange" @current-change="handleStudentCurrentChange"
                           :current-page.sync="studentListQuery.page" background
                           :page-sizes="[10,20,30, 50]" :page-size="studentListQuery.limit"
                           layout="total, sizes, prev, pager, next, jumper" :total="total">
            </el-pagination>
          </div>
        </el-card>
      </el-col>
      <el-col :span="12">
        <el-card  >
          <el-table :data="list"   :style="{height: (client.height-205) + 'px'}" v-loading="listLoading" element-loading-text="给我一点时间" border fithighlight-current-row style="width: 100%">
            <el-table-column type="selection" class="selection" align="center" prop='uuid'></el-table-column>
            <el-table-column type="index" label="序号"  align="center" width="50"></el-table-column>
            <el-table-column label="主键">
              <template slot-scope="scope">
                <span>{{scope.row.studentId}}</span>
              </template>
            </el-table-column>

          </el-table>
          <div v-show="!listLoading" class="pagination-container" style="margin-top: 20px">
            <el-pagination @size-change="handleBatchSizeChange" @current-change="handleBatchCurrentChange"
                           :current-page.sync="batchListQuery.page" background
                           :page-sizes="[10,20,30, 50]" :page-size="batchListQuery.limit"
                           layout="total, sizes, prev, pager, next, jumper" :total="total">
            </el-pagination>
          </div>
      </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script>
  import waves from '@/directive/waves/index.js'
  import { fetchList } from '@/api/student/student'
  import { getBatchList } from '@/api/student/batch'
  import { mapGetters } from 'vuex'// 水波纹指令

  export default {
    name: 'table_exambespeak',
    directives: {
      waves
    },
    data() {
      return {
        list: [],
        total: null,
        listLoading: true,
        studentListQuery: {
          page: 1,
          limit: 20,
          subject: null
        },
        batchListQuery: {
          page: 1,
          limit: 20,
          subject: null
        }
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
      getList() {
        this.listLoading = true
        console.log(' ====== =============  这是查询条件  ==================')
        console.log(this.studentListQuery)
        fetchList(this.studentListQuery).then(response => {
          console.log(' ====== =============  这是所有学员信息  ==================')
          console.log(response.data)
          this.stuList = response.data.data.list
          this.total = response.data.data.totalCount
          this.listLoading = false
        })
        getBatchList(this.batchListQuery).then(response => {
          console.log(' ===================  这是所有批次信息  ==================')
          console.log(response.data)
          this.stuList = response.data.data.list
          this.total = response.data.data.totalCount
          this.listLoading = false
        })
      },
      // 根据科目查询场地
      handleField(field) {
        this.studentListQuery.page = 1
        this.studentListQuery.subject = field
        this.batchListQuery.subject = field
        this.getList()
      },
      handleStudentSizeChange(val) {
        this.studentListQuery.limit = val
        this.getList()
      },
      handleStudentCurrentChange(val) {
        this.studentListQuery.page = val
        this.getList()
      },
      handleBatchSizeChange(val) {
        this.studentListQuery.limit = val
        this.getList()
      },
      handleBatchCurrentChange(val) {
        this.studentListQuery.page = val
        this.getList()
      }
    }
  }
</script>
