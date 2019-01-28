<template>
  <div class="departure-view">
    <div class="departure-card">
      <div class="departure-top">
          <div class="serch-bar">
        <el-select :clearable="true" style="width:300px"  placeholder="姓名/电话/身份证"></el-select>
        <el-button icon="el-icon-search" type="danger" style="margin-left:10px">搜索</el-button>
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
      <div class="departure-main">
        <el-table ref="multipleTable" :stripe="true" :data="tableData3" tooltip-effect="dark" style="width: 100%;border-bottom:0">
          <el-table-column type="index" label="序号" align="center" width="60"></el-table-column>
          <el-table-column prop="name" align="center" label="工号" width="120">
          </el-table-column>
          <el-table-column label="姓名" align="center" width="120">
            <template slot-scope="scope">{{ scope.row.date }}</template>
          </el-table-column>
          <el-table-column prop="address" align="center" label="部门" show-overflow-tooltip width="150">
          </el-table-column>
          <el-table-column label="电话" align="center" width="120">
            <template slot-scope="scope">{{ scope.row.date }}</template>
          </el-table-column>
          <el-table-column label="操作日期" prop="name" align="center" width="110">
            <!--<template slot-scope="scope">{{ scope.row.name }}</template>-->
          </el-table-column>
          <el-table-column label="离职原因" align="center" width="auto">
            <template slot-scope="scope">{{ scope.row.date }}</template>
          </el-table-column>
        </el-table>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    data() {
      return {
          tableData3: [{
          date: "2016-05-03",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1518 弄"
        }, {
          date: "2016-05-02",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1518 弄"
        }, {
          date: "2016-05-04",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1518 弄"
        }],
      }
    }
  }

</script>

<style rel="stylesheet/scss" lang="scss">
  $Danger: #c50202;

  .departure-view {
    position: relative;
    width: 100%;
    height: 100%;
    background-color: #eee;

    .departure-card {
      width: 100%;
      height: auto;
      background-color: #fff;

      .departure-top {
        height: 120px;
        border-bottom: solid 1px #eee;

        .serch-bar{
            padding-top: 20px;
            padding-left: 20px;
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
          right: 65px;
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

        .el-button--danger {
          color: #fff;
          background-color: $Danger !important;
          border-color: $Danger !important;
        }
        .el-button--text {
      color: #999 !important;
    }
      }

      .departure-main {
        width: 96%;
        height: 100%;
        /*background-color: #20a0ff;*/
        margin-top: 20px;
        margin-left: 25px;

        .el-table td,
        .el-table th.is-leaf {
          border-bottom: 0 !important;
        }

        .el-table--striped .el-table__body tr.el-table__row--striped td {
          background: #eee !important;
        }

        .el-table {
          color: #666 !important;
          font-size: 14px !important;
        }

        
        

        .el-radio,
        .el-table th {
          color: #999;
          font-weight: lighter;
          font-size: 16px;
        }
        .el-table .cell{
            line-height: 35px!important;
        }
      }
    }
  }

</style>
