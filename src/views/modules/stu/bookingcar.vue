<template>
  <div class="" style="height: 100%;padding: 5px" >
    <el-card style="height: 100%;">
      <el-table border :data="stuList" empty-text="暂无数据" v-loading="studentListLoading"  @select="selectRow" @select-all="selectRow"
                :height="pageHeight - 190" :stripe="true" element-loading-text="给我一点时间" border fit highlight-current-row style="width: 100%;text-align: center;">
        <el-table-column type="index" fixed label="序号"  align="center" width="50"></el-table-column>


        <el-table-column align="center"  fixed  label="教练" width="100">
          <template slot-scope="scope">
            <span>{{scope.row.name}}</span>
          </template>
        </el-table-column>
        <el-table-column align="center"  fixed  label="日期" width="100">
          <template slot-scope="scope">
            <span>{{scope.row.name}}</span>
          </template>
        </el-table-column>
        <el-table-column align="center"  fixed  label="时间" width="100">
          <template slot-scope="scope">
            <span>{{scope.row.name}}</span>
          </template>
        </el-table-column>
        <el-table-column type="expand"  label="已约学员" width="auto">
          <template slot-scope="props">
            <el-table>
              <el-table-column align="center"  fixed  label="姓名" width="auto" >
                <template slot-scope="scope">
                  <span>1234</span>
                </template>
              </el-table-column>
              <el-table-column align="center" label="电话" width="auto">
                <template slot-scope="scope">
                  <span>123</span>
                </template>
              </el-table-column>
            </el-table>
          </template>
        </el-table-column>
      </el-table>
      <div class="pagination-container" style="margin-top: 15px;">
        <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange"
                       :current-page.sync="studentListQuery.page" background
                       :page-sizes="[10,20,30, 50, 100, 200]" :page-size="studentListQuery.limit"
                       style="padding-bottom: 11px;padding-top: 11px;float:left;"
                       layout="total, sizes, prev, pager, next, jumper" :total="studentTotal">
        </el-pagination>
      </div>
    </el-card>

  </div>
</template>

<script>
  import { updateCoach } from '@/api/student/examnote'
  import { mapGetters } from 'vuex'
  import Coach from '@/components/Coach'
  import { fetchStudentList } from '@/api/student/student'

  export default {
    name: 'table_batch',
    components: {
      Coach
    },
    data() {
      return {
        stuList: [],
        studentTotal: 0,
        studentListLoading: false,
        studentListQuery: {
          page: 1,
          limit: 20,
          fieldCoach: null,
          roadCoach: null,
          subject: null,
          condition: null,
          motorcycleType:null
        },
        motorcycleType: [
          { value: 1, label: 'C1' },
          { value: 2, label: 'C2' },
        ],
        open: false,
        pageHeight: this.area[1],
        pageWidth: this.area[0],
        stuCoach: {
          roadCoach: null,
          fieldCoach: null,
          stuList: []
        },
        btnLoading: false
      }
    },
    props: {
      layerid: String,
      area: Array
    },
    watch: {
      area: function(val) {
        this.pageHeight = val[1]
        this.pageWidth = val[0]
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
        this.studentListLoading = true
        var query = this.studentListQuery
        if (query.subject === '') {
          query.subject = null
        }
        if (query.condition === '') {
          query.condition = null
        }
        fetchStudentList(query).then(response => {
          if (response.data.code === 0) {
            this.stuList = response.data.data.list
            this.studentTotal = response.data.data.totalCount
            this.studentListLoading = false
          }
        })
      },
      openCoach() {
        if (this.stuCoach.stuList && this.stuCoach.stuList.length > 0) {
          this.open = true
        } else {
          this.$message.error('请选择学员!')
        }
      },
      updateCoach() {
        if (this.stuCoach.roadCoach || this.stuCoach.fieldCoach) {
          updateCoach(this.stuCoach).then(() => {
            this.getList()
            this.open = false
            this.btnLoading = false
          })
        } else {
          this.$message.error('请选择教练!')
        }
      },
      selectRow(selection) {
        var stuList = []
        if (selection && selection.length > 0) {
          selection.forEach(function(item) {
            stuList.push(item.studentId)
          })
        }
        this.stuCoach.stuList = stuList
      },
      /* 分页插件方法 */
      handleSizeChange(val) {
        this.studentListQuery.limit = val
        this.getList()
      },
      handleCurrentChange(val) {
        this.studentListQuery.page = val
        this.getList()
      },
      /* 搜索方法 */
      searchClick() {
        this.studentListQuery.page = 1
        this.getList()
      }
    }
  }
</script>
<style rel="stylesheet/scss" lang="scss" scoped>
  .batchCss{
    background-color: rgba(64,158,255,.1);
    /*display: inline-block;*/
    width: 100%;
    margin: 5px auto;
    padding: 0 10px;
    height: 32px;
    line-height: 30px;
    font-size: 12px;
    color: #409eff;
    border-radius: 4px;
    box-sizing: border-box;
    border: 1px solid rgba(64,158,255,.2);
    white-space: nowrap;
    cursor: pointer;
    transition: .1s;
    box-shadow:3px 3px 10px #f6f6f6;
  }
  .batchCss_selected{
    color: #fff;
    background-color: #409eff;
    border-color: #409eff;
  }
  .batchCss:hover{
    color: #fff;
    background-color: #409eff;
    border-color: #409eff;
  }
  .subjectBtn{
    display: inline-block;
    line-height: 1;
    white-space: nowrap;
    cursor: pointer;
    -webkit-appearance: none;
    text-align: center;
    box-sizing: border-box;
    outline: none;
    margin:0 -3px;
    transition: .1s;
    font-weight: 500;
    padding: 12px 20px;
    font-size: 14px;
    border-radius: 4px;
    width: 84px;
    color: #409eff;
    background: #ecf5ff;
    border: 1px solid #b3d8ff;
  }
  .subjectBtn:hover{
    color: #fff;
    background-color: #409eff;
    border-color: #409eff;
  }
  .subjectBtn_selected{
    color: #fff;
    background-color: #409eff;
    border-color: #409eff;
  }
  .loading-more{
    margin-top: 10px;
    text-align: center;
    font-size: 12px;
    i{
      cursor: pointer;
    }
  }
  .loading-more:hover{
    i{
      color: #909399;
    }
  }
</style>
