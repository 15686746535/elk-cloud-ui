<template>
  <div class="returnvist-view">
    <div class="returnvist-pane">
      <div class="select-bar">
        <div class="btgroup">
          <el-button-group @change="handleSubject" v-model="listQuery.subject">
            <el-button type="info" label="1">科一</el-button>
            <el-button type="info" label="2">科二</el-button>
            <el-button type="info" label="3">科三</el-button>
            <el-button type="info" label="4">科四</el-button>
          </el-button-group>
          <el-date-picker style="width:200px;margin-left:10px;" value-format="timestamp"  type="daterange" align="left" range-separator="-"
                          start-placeholder="开始日期" end-placeholder="结束日期" :picker-options="pickerOptions">
          </el-date-picker>
          <el-select placeholder="科目一考试场地" style="width:150px;margin-left:10px;"></el-select>
          <el-select placeholder="姓名/电话/身份证" style="width:170px;margin-left:10px;"></el-select>
          <el-button type="warning" icon="el-icon-search">搜索</el-button>
        </div>
        <div class="left-bt">
          <el-button type="text">导出</el-button>
          <el-button type="text">添加</el-button>
          <el-button type="text">批量添加</el-button>
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
          <el-table-column prop="name" align="center" label="科目" width="120">
          </el-table-column>
          <el-table-column label="考试时间" align="center" width="120">
            <template slot-scope="scope">{{ scope.row.date }}</template>
          </el-table-column>
          <el-table-column prop="address" align="center" label="预约至日期" show-overflow-tooltip width="150">
          </el-table-column>
          <el-table-column label="考试场地" align="center" width="150">
            <template slot-scope="scope">{{ scope.row.date }}</template>
          </el-table-column>
          <el-table-column label="申请名单" prop="name" align="center" width="100">
            <!--<template slot-scope="scope">{{ scope.row.name }}</template>-->
          </el-table-column>
          <el-table-column label="待审核" align="center" width="auto">
            <template slot-scope="scope">{{ scope.row.date }}</template>
          </el-table-column>
          <el-table-column label="待约考" align="center" width="auto">
            <template slot-scope="scope">{{ scope.row.date }}</template>
          </el-table-column>
          <el-table-column label="已约考" align="center" width="auto">
            <template slot-scope="scope">{{ scope.row.date }}</template>
          </el-table-column>
          <el-table-column label="考试名单" align="center" width="auto">
            <template slot-scope="scope">{{ scope.row.date }}</template>
          </el-table-column>
          <el-table-column label="已取消" align="center" width="auto">
            <template slot-scope="scope">{{ scope.row.date }}</template>
          </el-table-column>
          <el-table-column label="操作" align="center" width="auto">
            <el-tag color='#f976c6'>查看</el-tag>
            <el-tag color='#ffa351'>编辑</el-tag>
            <el-tag color='#c50202'>删除</el-tag>
          </el-table-column>
        </el-table>
      </div>
    </div>
  </div>
</template>

<script>
export default {
    data(){
        return{
          batch:{
            subject:'1',
            examTime: null,
            expiryTime: null,
            examField: null
          },
          listQuery:{
            subject:'1'
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
    methods:{
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

  .returnvist-view {
    width: 100%;
    height: 100%;
    background-color: $BgColor;
    position: relative;

    .returnvist-pane {
      width: 98%;
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
        height: 100%;
        /*background-color: #20a0ff;*/
        margin-top: 20px;
        margin-left: 25px;
        .el-table {
          color: #666 !important;
          font-size: 14px !important;
        }
      }
    }
  }

</style>
