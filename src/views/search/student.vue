<template>
  <div class="student-serch" style="height: 100%;">
    <el-card style="height: 100%">
      <div style="height: 50px;">
          <el-input @keyup.enter.native="getList" style="width: 300px;" class="filter-item" placeholder="完整的 姓名/电话/身份证" v-model="listQuery.accurate"></el-input>
          <el-button class="filter-item" type="primary"  @click="getList"><i class="el-icon-search"></i> 搜 索</el-button>
      </div>
      <el-table :data="stuList" :height="tableHeight - 110" highlight-current-row stripe v-loading="listLoading" element-loading-text="给我一点时间">
        <el-table-column align="center" label="头像" min-width="100px">
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
        <el-table-column align="center" label="个人信息" min-width="220px">
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
                <el-col :span="17" class="table_text">{{scope.row.introducers}}</el-col>
              </el-row>
            </el-col>
          </template>
        </el-table-column>
        <el-table-column align="center" label="入学信息" min-width="180px">
          <template slot-scope="scope">
            <el-col style=" line-height: 25px">
              <el-row :gutter="10">
                <el-col :span="8" class="table_text">档案号:</el-col>
                <el-col :span="16" class="table_text">{{scope.row.archivesNumber}}</el-col>
              </el-row>
              <el-row :gutter="10">
                <el-col :span="8" class="table_text">入学日期:</el-col>
                <el-col :span="16" class="table_text">{{scope.row.enrolTime | subTime}}</el-col>
              </el-row>
              <el-row :gutter="10">
                <el-col :span="8" class="table_text">期数:</el-col>
                <el-col :span="16" class="table_text">{{scope.row.periods}}</el-col>
              </el-row>
              <el-row :gutter="10">
                <el-col :span="8" class="table_text">车型:</el-col>
                <el-col :span="16" class="table_text">{{scope.row.motorcycleType}}</el-col>
              </el-row>
            </el-col>
          </template>
        </el-table-column>
        <el-table-column align="center" label="培训信息" min-width="200px">
          <template slot-scope="scope">

            <el-col style=" line-height: 25px">
              <el-row :gutter="10">
                <el-col :span="8" class="table_text">校区:</el-col>
                <el-col :span="16" class="table_text">{{scope.row.campus}}</el-col>
              </el-row>
              <el-row :gutter="10">
                <el-col :span="8" class="table_text">来源渠道:</el-col>
                <el-col :span="16" class="table_text">{{scope.row.source}}</el-col>
              </el-row>

              <el-row :gutter="10">
                <el-col :span="8" class="table_text">场训教练:</el-col>
                <el-col :span="16" class="table_text">{{scope.row.fieldName}}</el-col>
              </el-row>

              <el-row :gutter="10">
                <el-col :span="8" class="table_text">路训教练:</el-col>
                <el-col :span="16" class="table_text">{{scope.row.roadName}}</el-col>
              </el-row>
            </el-col>
          </template>
        </el-table-column>
        <el-table-column align="center" label="费用信息" min-width="200px">
          <template slot-scope="scope">
            <el-col style=" line-height: 25px">
              <el-row :gutter="10">
                <el-col :span="8" class="table_text">应收金额:</el-col>
                <el-col :span="16" class="table_text">{{scope.row.receivable}}</el-col>
              </el-row>
              <!--<el-row :gutter="10">-->
              <!--<el-col :span="7" class="table_text">已收金额:</el-col>-->
              <!--<el-col :span="17" class="table_text">{{scope.row.receivable - scope.row.arrearage}}</el-col>-->
              <!--</el-row>-->

              <el-row :gutter="10">
                <el-col :span="8" class="table_text">欠费金额:</el-col>
                <el-col :span="16" class="table_text">{{scope.row.arrearage}}</el-col>
              </el-row>
            </el-col>
          </template>
        </el-table-column>
      </el-table>
      <!--<div v-show="!listLoading" class="page-util">-->
        <!--<el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange"-->
                       <!--:current-page.sync="listQuery.page"-->
                       <!--background-->
                       <!--style="float:left;"-->
                       <!--:page-sizes="[10,20,30,50]" :page-size="listQuery.limit"-->
                       <!--layout="total, sizes, prev, pager, next, jumper" :total="total">-->
        <!--</el-pagination>-->
      <!--</div>-->
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
          limit: 0,
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
    methods: {
      getList() {
        this.listLoading = true
        if (this.listQuery.accurate) {
          fetchStudentList(this.listQuery).then(response => {
            this.stuList = response.data.data.list
            this.total = response.data.data.totalCount
            this.listLoading = false
          })
        } else {
          this.stuList = []
          this.total = 0
          this.listLoading = false
        }
      }
    }
  }
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  .student-serch{
    .img{
      width: 50px;
      height: 50px;
      padding: 0;
      border-radius: 150px;
      overflow: hidden;
    }
    .page-util{
      margin-top: 20px;
      position: fixed;
      bottom: 0;
      background-color: #fff;
      z-index: 666;
      padding: 20px 0;
      width: 100%;
      left: 0px;
      border-top: 1px solid #ccc;
    }
    .clearfix:before,
    .clearfix:after {
      display: table;
      content: "";
    }
    .clearfix:after {
      clear: both
    }
    .title{
      height: 40px;
      line-height: 40px;
      color:#495060;
      background-color: #f5f7fa;
      text-align: center;
      font-size: 16px;
      margin-bottom: 10px;
    }
    .text_css{
      color:#495060;
      font-size: 12px;
      word-break:keep-all;/* 不换行 */
      white-space:nowrap;/* 不换行 */
      overflow:hidden;/* 内容超出宽度时隐藏超出部分的内容 */
      text-overflow:ellipsis;/* 当对象内文本溢出时显示省略标记(...) ；需与overflow:hidden;一起使用。*/
    }
    .table_text{
      color: #7c7c7c;font-size: 12px;
      text-align: left;
      word-break:keep-all;/* 不换行 */
      white-space:nowrap;/* 不换行 */
      overflow:hidden;/* 内容超出宽度时隐藏超出部分的内容 */
      text-overflow:ellipsis;/* 当对象内文本溢出时显示省略标记(...) ；需与overflow:hidden;一起使用。*/
    }
    .avatar-uploader .el-upload {
      border: 1px dashed #d9d9d9;
      border-radius: 6px;
      cursor: pointer;
      position: relative;
      overflow: hidden;
    }
    .avatar-uploader .el-upload:hover {
      border-color: #409EFF;
    }
    .avatar-uploader-icon {
      font-size: 28px;
      color: #8c939d;
      width: 140px;
      height: 180px;
      line-height: 180px;
      text-align: center;
    }
    .avatar {
      width: 40px;
      height: 40px;
      border-radius: 50%;
    }
    .avatar_img {
      line-height: 180px;
      position: relative;
      margin: auto;
      border: 1px dashed #d9d9d9;
      border-radius: 6px;
      width: 140px;
      height: 180px;
      display: block;
    }
    .AddAvatar-uploader .el-upload {
      border: 1px dashed #d9d9d9;
      border-radius: 6px;
      cursor: pointer;
      position: relative;
      overflow: hidden;
    }
    .AddAvatar-uploader .el-upload:hover {
      border-color: #409EFF;
    }
    .AddAvatar-uploader-icon {
      font-size: 28px;
      color: #8c939d;
      width: 100px;
      height: 130px;
      line-height: 130px;
      text-align: center;
    }
    .AddAvatar {
      width: 100px;
      height: 130px;
      display: block;
    }
    .batchCss{
      background-color: rgba(64,158,255,.1);
      display: inline-block;
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
    }
    .batchCss_selected{
      background-color: rgba(103,194,58,.1);
      border-color: rgba(103,194,58,.2);
      color: #67c23a;
    }
    .batchCss:hover{
      background-color: rgba(103,194,58,.1);
      border-color: rgba(103,194,58,.2);
      color: #67c23a;
    }
    .carClassCss{
      background-color: rgba(64,158,255,.1);
      display: inline-block;
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
    }
    .carClassCss_selected{
      background-color: rgba(103,194,58,.1);
      border-color: rgba(103,194,58,.2);
      color: #67c23a;
    }
    .carClassCss:hover{
      background-color: rgba(103,194,58,.1);
      border-color: rgba(103,194,58,.2);
      color: #67c23a;
    }
    .supervise_type_4{
      color: #67C23A;
    }
  }

</style>
