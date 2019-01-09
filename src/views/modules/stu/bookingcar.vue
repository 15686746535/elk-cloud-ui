<template>
  <div class="" style="height: 100%;padding: 5px" >
    <el-card style="height: 100%;">
      <el-table border :data="list" empty-text="暂无数据" v-loading="studentListLoading"  @select="selectRow" @select-all="selectRow"
                :height="pageHeight - 190" :stripe="true" element-loading-text="给我一点时间" border fit highlight-current-row style="width: 100%;text-align: center;" >
        <el-table-column type="index" fixed label="序号"  align="center" width="100"></el-table-column>
        <el-table-column type="expand" fixed label="已约学员" width="auto" >
          <template slot-scope="props">
            <el-table border :data="props.row.stu">
              <el-table-column align="center"  fixed  label="时间" width="auto" >
                <template slot-scope="scope">
                  <span>{{scope.row.begin}}-{{scope.row.end}}</span>
                </template>
              </el-table-column>
              <el-table-column align="center"  fixed  label="姓名" width="auto" >
                <template slot-scope="scope">
                  <span>{{scope.row.name}}</span>
                </template>
              </el-table-column>
              <el-table-column align="center" label="电话" width="auto">
                <template slot-scope="scope">
                  <span>{{scope.row.mobile}}</span>
                </template>
              </el-table-column>
            </el-table>
          </template>
        </el-table-column>
        <el-table-column align="center"  fixed  label="教练" width="auto" >
          <template slot-scope="scope">
            <span>{{scope.row.coach.name}}</span>
          </template>
        </el-table-column >
        <el-table-column align="center"  fixed  label="日期" width="auto">
          <template slot-scope="scope">
            <span>{{scope.row.coach.t}}</span>
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
  import { getAllTrainList } from '@/api/student/examnote'
  import { mapGetters } from 'vuex'
  // import Coach from '@/components/Coach'
  // import { fetchStudentList } from '@/api/student/student'

  export default {
    name: 'table_batch',
    components: {
      // Coach
    },
    data() {
      return {
        list:[],
        coachList: [],
        stuList: [],
        studentTotal: 0,
        studentListLoading: false,
        studentListQuery: {
          page: 1,
          limit: 20,
        },
        open: false,
        pageHeight: this.area[1],
        pageWidth: this.area[0],
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

        getAllTrainList(this.studentListQuery).then(response => {
          if (response.data.code === 0) {
            console.log("********",response)
            var sutList=[];
            this.list = response.data.data.data.list;
            this.studentTotal = response.data.data.data.totalCount;
            // this.list.forEach(function(v,i) {
            //   console.log("%%%%%%",v.stu);
            //   sutList.push(v.stu);
            // })
            // this.stuList=sutList;
            this.studentListLoading = false
          }
        })
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
      viewStudent(row, event, column){
        // console.log("qweqweq")
        console.log("@@@",row, event, column)
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
