<template>
  <div class="" style="height: 100%;padding: 5px" >
    <el-card style="height: 100%;">
      <div style="margin-bottom: 15px;">
        <Coach v-model="studentListQuery.fieldCoach" size="mini" coachType="field" placeholder="场训教练" style="width: 150px" ></Coach>
        <Coach v-model="studentListQuery.roadCoach" size="mini" coachType="road" placeholder="路训教练"  style="width: 150px" ></Coach>
        <el-input @keyup.enter.native="searchClick" size="mini" placeholder="姓名/电话/身份证" v-model="studentListQuery.condition" style="width: 150px;"></el-input>
        <el-button type="primary" size="mini" @click="searchClick" ><i class="el-icon-search"></i> 搜 索</el-button>
      </div>
      <el-table :data="stuList" empty-text="暂无数据" v-loading="studentListLoading"  @select="selectRow" @select-all="selectRow"
                :height="pageHeight - 190" :stripe="true" element-loading-text="给我一点时间" border fit highlight-current-row style="width: 100%;text-align: center;">
        <el-table-column type="selection" width="35" fixed></el-table-column>
        <el-table-column type="index" fixed label="序号"  align="center" width="50"></el-table-column>

        <el-table-column align="center"  fixed  label="姓名" width="100">
          <template slot-scope="scope">
            <span>{{scope.row.name}}</span>
          </template>
        </el-table-column>

        <el-table-column align="center" label="电话" width="120">
          <template slot-scope="scope">
            <span>{{scope.row.mobile}}</span>
          </template>
        </el-table-column>

        <el-table-column  align="center" label="身份证" width="180">
          <template slot-scope="scope">
            <span>{{scope.row.idNumber}}</span>
          </template>
        </el-table-column>
        <el-table-column  align="center" label="当前科目" width="100">
          <template slot-scope="scope">
            <span>{{ scope.row.state | subjectFilter}}</span>
          </template>
        </el-table-column>

        <el-table-column align="center" label="场训教练" width="100">
          <template slot-scope="scope">
            <span>{{scope.row.fieldName}}</span>
          </template>
        </el-table-column>
        <el-table-column align="center" label="路训教练" width="100">
          <template slot-scope="scope">
            <span>{{scope.row.roadName}}</span>
          </template>
        </el-table-column>

        <el-table-column align="center" label="通过日期" >
          <template slot-scope="scope">
            <span>{{scope.row.passTime | subTime}}</span>
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

        <div style="float: right;" >
          <el-button size="small" @click="openCoach" type="success"><i class="el-icon-fa-user"></i> 分配教练</el-button>
        </div>
      </div>
    </el-card>

    <el-dialog :modal="false" width="550px" title="选择教练" :visible.sync="open" append-to-body>
      <Coach v-model="stuCoach.fieldCoach" coachType="field" placeholder="场训教练"></Coach>
      <Coach v-model="stuCoach.roadCoach" coachType="road"  placeholder="路训教练"></Coach>
      <div slot="footer">
        <el-button size="small"  @click="open = false">取 消</el-button>
        <el-button type="primary" size="small" :loading="btnLoading" @click="updateCoach">确 定</el-button>
      </div>
    </el-dialog>
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
          condition: null
        },
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
        fetchStudentList(this.studentListQuery).then(response => {
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
