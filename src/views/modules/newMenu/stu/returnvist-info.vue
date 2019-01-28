<template>
  <div class="returnvist-info-view">
    <div class="returnvist-info-pane">
      <div class="select-bar">
        <div class="btgroup">
          <el-button-group>
            <el-button type="info">科一</el-button>
            <el-button type="info">科二</el-button>
            <el-button type="info">科三</el-button>
          </el-button-group>
          <el-select placeholder="姓名/电话/身份证" style="width:300px;margin-left:20px;"></el-select>
          <el-button type="warning" icon="el-icon-search">搜索</el-button>
        </div>
        <div class="left-bt">
          <el-button type="text">导出</el-button>
        </div>
        <div class="page-bar">
          <span class="page-txt">共8553条</span>
          <!--<span class="page-txt">上一页</span>-->

          <!--<span class="page-txt">下一页</span>-->
          <el-button type="text">上一页</el-button>
          <span class="page-txt">第25页</span>
          <el-button type="text">下一页</el-button>
        </div>
      </div>
      <div class="main-body">
        <el-table ref="multipleTable" :stripe="true"  tooltip-effect="dark" style="width: 100%;border-bottom:0">
          <el-table-column type="index" label="序号" align="center" width="60"></el-table-column>
          <el-table-column prop="name" align="center" label="姓名" width="80">
          </el-table-column>
          <el-table-column label="身份证" align="center" width="120">
            <template slot-scope="scope">{{ scope.row.date }}</template>
          </el-table-column>
          <el-table-column prop="address" align="center" label="电话" show-overflow-tooltip width="90">
          </el-table-column>
          <el-table-column label="性别" align="center" width="50">
            <template slot-scope="scope">{{ scope.row.date }}</template>
          </el-table-column>
          <el-table-column label="车型" prop="name" align="center" width="50">
            <!--<template slot-scope="scope">{{ scope.row.name }}</template>-->
          </el-table-column>         
          <el-table-column label="通过时间" align="center" width="120">
            <template slot-scope="scope">{{ scope.row.date }}</template>
          </el-table-column>
          <el-table-column label="备注" align="center" width="auto">
            <template slot-scope="scope">{{ scope.row.date }}</template>
          </el-table-column>
          <el-table-column label="接待评价" align="center" width="auto">
            <template slot-scope="scope">{{ scope.row.date }}</template>
          </el-table-column>
          <el-table-column label="操作" align="center" width="80">
            <el-button type="warning">撤销</el-button>
          </el-table-column>
        </el-table>
      </div>
    </div>
  </div>
</template>


<style rel="stylesheet/scss" lang="scss">
  /*主体白色*/
  $White: #fff;
  /*主体红色*/
  $Danger: #c50202;
  /*灰白色*/
  $BgColor: #eee;

  .returnvist-info-view {
    width: 100%;
    height: 100%;
    background-color: $BgColor;
    position: relative;

    .returnvist-info-pane {
      width: 100%;
      height: 100%;
      background-color: $White;

      .select-bar {
        width: 100%;
        height: 120px;
        border-bottom: solid 1px $BgColor;

        .btgroup {
          margin-left: 10px;
          padding-top: 15px;

          .el-button--warning {
            color: #fff;
            background-color: $Danger !important;
            border-color: $Danger !important;
            float: right;
            margin-right: 25px;
          }

          .el-button--info {
            color: #999;
            background-color: $White !important;
            border-color: #dcdfe6 !important;
          }

          .el-button--info:hover {
            color: #fff;
            background-color: $Danger !important;
            border-color: $Danger !important;
          }

          .el-button--info:active {
            color: #fff;
            background-color: $Danger !important;
            border-color: $Danger !important;
          }
        }

        .left-bt {
          position: absolute;
          top: 70px;
          margin-left: 20px;

          .el-button--text {
            color: #999 !important;
            margin-right: 25px;
            font-size: 16px;
          }
        }

        .page-bar {
          position: absolute;
          right: 50px;
          top: 70px;

          .page-txt {
            color: #999;
            margin-left: 10px;
            font-size: 16px
          }

          .el-button--text {
            color: #999 !important;
            margin-left: 15px;
            font-size: 16px;
          }

          .el-button:active {
            color: $Danger !important;
          }
        }
      }
      .main-body{
        width: 96%;
        /*background-color: #20a0ff;*/
        margin-top: 20px;
        margin-left: 25px;
        .el-table {
          color: #666 !important;
          font-size: 14px !important;
        }
        .el-button--warning {
            color: #fff;
            background-color: $Danger !important;
            border-color: $Danger !important;           
          }
      }
    }
  }

</style>
