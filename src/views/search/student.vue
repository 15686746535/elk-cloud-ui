<template>
  <div class="student" style="height: 100%;">
    <el-card style="height: 100%">
      <div style="height: 80px;">
          <el-input @keyup.enter.native="getList" style="width: 300px;" class="filter-item" placeholder="完整的 姓名/电话/身份证" v-model="listQuery.accurate"></el-input>
          <el-button class="filter-item" type="primary"  @click="getList"><i class="el-icon-search"></i> 搜 索</el-button>
      </div>
      <el-table :data="stuList" :height="tableHeight - 220" highlight-current-row stripe v-loading="listLoading" element-loading-text="给我一点时间">
        <el-table-column align="center" label="头像" min-width="150px">
          <template slot-scope="scope">
            <!-- 头像 -->
            <el-row>
              <el-tag class="img">
                <img :src="scope.row.avatar" class="img">
              </el-tag>
            </el-row>
            <el-row>
              <el-col style="color: #7c7c7c;text-align: center;font-size: 12px;">{{scope.row.name}}</el-col>
            </el-row>
            <el-row>
              <el-col style="color: #7c7c7c;text-align: center;font-size: 12px;">{{scope.row.mobile}}</el-col>
            </el-row>
          </template>
        </el-table-column>

        <el-table-column align="center" label="个人信息" min-width="230px">
          <template slot-scope="scope" >
            <!-- 个人信息 -->
            <el-col style=" line-height: 25px">
              <el-row :gutter="10">
                <el-col :span="7" class="table_text">身份证:</el-col>
                <el-col :span="17" class="table_text">{{scope.row.idNumber}}</el-col>
              </el-row>
              <el-row :gutter="10">
                <el-col :span="7" class="table_text">性别:</el-col>
                <el-col :span="17" class="table_text">{{scope.row.sex | sexFilter}}</el-col>
              </el-row>
              <el-row :gutter="10">
                <el-col :span="7" class="table_text">状态:</el-col>
                <el-col :span="17" class="table_text">{{scope.row.state | subjectFilter}}</el-col>
              </el-row>

              <el-row :gutter="10">
                <el-col :span="7" class="table_text">介绍人:</el-col>
                <el-col :span="17" class="table_text">{{scope.row.introducers.replace(new RegExp('/','gm'), '、')}}</el-col>
              </el-row>
            </el-col>
          </template>
        </el-table-column>

        <el-table-column align="center" label="入学信息" min-width="230px">
          <template slot-scope="scope">
            <el-col style=" line-height: 25px">
              <el-row :gutter="10">
                <el-col :span="7" class="table_text">档案号:</el-col>
                <el-col :span="17" class="table_text">{{scope.row.archivesNumber}}</el-col>
              </el-row>
              <el-row :gutter="10">
                <el-col :span="7" class="table_text">入学日期:</el-col>
                <el-col :span="17" class="table_text">{{scope.row.enrolTime | subTime}}</el-col>
              </el-row>
              <el-row :gutter="10">
                <el-col :span="7" class="table_text">期数:</el-col>
                <el-col :span="17" class="table_text">{{scope.row.periods}}</el-col>
              </el-row>
              <el-row :gutter="10">
                <el-col :span="7" class="table_text">车型:</el-col>
                <el-col :span="17" class="table_text">{{scope.row.motorcycleType}}</el-col>
              </el-row>
            </el-col>
          </template>
        </el-table-column>

        <el-table-column align="center" label="培训信息" min-width="230px">
          <template slot-scope="scope">

            <el-col style=" line-height: 25px">
              <el-row :gutter="10">
                <el-col :span="7" class="table_text">校区:</el-col>
                <el-col :span="17" class="table_text">{{scope.row.campus}}</el-col>
              </el-row>
              <el-row :gutter="10">
                <el-col :span="7" class="table_text">来源渠道:</el-col>
                <el-col :span="17" class="table_text">{{scope.row.source}}</el-col>
              </el-row>

              <el-row :gutter="10">
                <el-col :span="7" class="table_text">场训教练:</el-col>
                <el-col :span="17" class="table_text">{{scope.row.fieldName}}</el-col>
              </el-row>

              <el-row :gutter="10">
                <el-col :span="7" class="table_text">路训教练:</el-col>
                <el-col :span="17" class="table_text">{{scope.row.roadName}}</el-col>
              </el-row>
            </el-col>
          </template>
        </el-table-column>

        <el-table-column align="center" label="费用信息" min-width="230px">
          <template slot-scope="scope">
            <el-col style=" line-height: 25px">
              <el-row :gutter="10">
                <el-col :span="7" class="table_text">服务项:</el-col>
                <el-col :span="17" class="table_text">{{scope.row.serviceNotes.replace(new RegExp('/','gm'), '、')}}</el-col>
              </el-row>

              <el-row :gutter="10">
                <el-col :span="7" class="table_text">应收金额:</el-col>
                <el-col :span="17" class="table_text">{{scope.row.receivable}}</el-col>
              </el-row>

              <el-row :gutter="10">
                <el-col :span="7" class="table_text">欠费金额:</el-col>
                <el-col :span="17" class="table_text">{{scope.row.arrearage}}</el-col>
              </el-row>
            </el-col>
          </template>
        </el-table-column>

      </el-table>
      <div v-show="!listLoading" class="page-util">
        <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange"
                       :current-page.sync="listQuery.page"
                       background
                       style="float:left;"
                       :page-sizes="[10,20,30,50]" :page-size="listQuery.limit"
                       layout="total, sizes, prev, pager, next, jumper" :total="total">
        </el-pagination>
      </div>
    </el-card>
  </div>
</template>

<script>
  import { fetchStudentList } from '@/api/student/student'

  export default {
    data() {
      return {
        tableHeight: this.area[1],
        stuList: [],
        total: 1,
        listLoading: true,
        btnLoading: false,
        listQuery: {
          page: 1,
          limit: 20,
          orgId: 2,
          accurate: this.accurate
        }
      }
    },
    created() {
      this.getList()
    },
    props: {
      accurate: String,
      area: Array
    },
    watch: {
      area: function(val) {
        this.tableHeight = val[1]
      },
      accurate: function(val) {
        this.accurate = val
      }
    },
    computed: {
    },
    methods: {
      getList() {
        this.listLoading = true
        fetchStudentList(this.listQuery).then(response => {
          this.stuList = response.data.data.list
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
      }
    }
  }
</script>

<style rel="stylesheet/scss" lang="scss" scoped>

</style>
