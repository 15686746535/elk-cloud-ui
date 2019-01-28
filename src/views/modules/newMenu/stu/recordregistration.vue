<template>
  <div class="record-view">
    <div class="panel-title">
      <div class="btgroup">
        <el-button-group @change="handleSubject" v-model="listQuery.subject">
          <el-button type="info" label="1">科一</el-button>
          <el-button type="info" label="2">科二</el-button>
          <el-button type="info" label="3">科三</el-button>
          <el-button type="info" label="4">科四</el-button>
        </el-button-group>
        <el-date-picker style="width:200px;margin-left:10px;" value-format="timestamp" type="daterange" align="left"
          range-separator="-" start-placeholder="开始日期" end-placeholder="结束日期" :picker-options="pickerOptions">
        </el-date-picker>
        <el-select placeholder="科目一考试场地" style="width:150px;margin-left:10px;"></el-select>
        <el-select placeholder="姓名/电话/身份证" style="width:170px;margin-left:10px;"></el-select>
        <el-button type="warning" icon="el-icon-search">搜索</el-button>
      </div>
    </div>
    <div class="panel-body">
      <div class="body-title">
        <div class="left-bt">
          <el-button type="text">导出</el-button>
          <!-- <el-select ></el-select> -->
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
      <div class="panel-table">
        <el-table ref="multipleTable" :stripe="true" tooltip-effect="dark" style="width: 100%;border-bottom:0">
          <el-table-column type="index" label="序号" align="center" width="60"></el-table-column>
          <el-table-column prop="name" align="center" label="姓名" width="60">
          </el-table-column>
          <el-table-column label="电话" align="center" width="90">
            <template slot-scope="scope">{{ scope.row.date }}</template>
          </el-table-column>
          <el-table-column prop="address" align="center" label="身份证" show-overflow-tooltip width="150">
          </el-table-column>
          <el-table-column label="期数" align="center" width="80">
            <template slot-scope="scope">{{ scope.row.date }}</template>
          </el-table-column>
          <el-table-column label="考场" prop="name" align="center" width="100">
            <!--<template slot-scope="scope">{{ scope.row.name }}</template>-->
          </el-table-column>
          <el-table-column label="车型" align="center" width="auto">
            <template slot-scope="scope">{{ scope.row.date }}</template>
          </el-table-column>
          <el-table-column label="考试日期" align="center" width="auto">
            <template slot-scope="scope">{{ scope.row.date }}</template>
          </el-table-column>
          <el-table-column label="状态" align="center" width="auto">
            <template slot-scope="scope">{{ scope.row.date }}</template>
          </el-table-column>
          <el-table-column label="欠费" align="center" width="auto">
            <template slot-scope="scope">{{ scope.row.date }}</template>
          </el-table-column>
          <el-table-column label="通过日期" align="center" width="auto">
            <template slot-scope="scope">{{ scope.row.date }}</template>
          </el-table-column>
          <el-table-column label="失败日期" align="center" width="auto">
            <template slot-scope="scope">{{ scope.row.date }}</template>
          </el-table-column>
          <el-table-column label="缺考日期" align="center" width="auto">
            <template slot-scope="scope">{{ scope.row.date }}</template>
          </el-table-column>
          <el-table-column label="带过教练" align="center" width="auto">
            <template slot-scope="scope">{{ scope.row.date }}</template>
          </el-table-column>
          <el-table-column label="操作" align="center" width="auto">
            <el-button type="danger">编辑</el-button>
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
        batch: {
          subject: '1',
          examTime: null,
          expiryTime: null,
          examField: null
        },
        listQuery: {
          subject: '1',
        },
        pickerOptions: {
          shortcuts: [{
            text: '今天',
            onClick(picker) {
              const time = new Date(new Date().setHours(0, 0, 0, 0))
              picker.$emit('pick', [time, time])
            }
          }, {
            text: '明天',
            onClick(picker) {
              const time = new Date(new Date().setHours(0, 0, 0, 0))
              time.setTime(time.getTime() + 3600 * 1000 * 24 * 1)
              picker.$emit('pick', [time, time])
            }
          }]
        }
      }
    },
    methods: {
      handleSubject() {
        this.batch = {
          subject: '1',
          examTime: null,
          expiryTime: null,
          examField: null
        }
      }
    }
  }

</script>


<style rel="stylesheet/scss" lang="scss">
  /*主体白色*/
  $White: #fff;
  /*主体红色*/
  $Danger: #c50202;
  /*灰白色*/
  $BgColor: #eee;

  .record-view {
    width: 100%;
    height: 100%;
    background-color: $BgColor;
    position: relative;

    .el-button--warning {
      color: #fff;
      background-color: $Danger !important;
      border-color: $Danger !important;
      float: right;
      margin-right: 25px;
    }

    .panel-title {
      width: 100%;
      height: 75px;
      background-color: $White;

      .btgroup {
        margin-left: 10px;
        padding-top: 15px;



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
    }

    .panel-body {
      width: 100%;
      height: auto;
      margin-top: 10px;
      background-color: $White;

      .body-title {
          width: 100%;
          height: 20px;

        .left-bt {
          position: absolute;
          top: 90px;
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
          top: 90px;

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
      .panel-table {
          margin-top: 20px;
        }
    }
  }

</style>
