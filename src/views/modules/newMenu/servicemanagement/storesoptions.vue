<template>
  <div class="storesoptions-view">
    <div class="stores-panel">
        <div class="panel-top">
        <div class="page-bar">
          <span class="page-txt">共8553条</span>
          <!--<span class="page-txt">上一页</span>-->

          <!--<span class="page-txt">下一页</span>-->
          <el-button type="text">上一页</el-button>
          <span class="page-txt">第25页</span>
          <el-button type="text">下一页</el-button>
        </div>
        </div>
        <div class="panel-body">
            <el-table ref="multipleTable" :stripe="true"  tooltip-effect="dark" style="width: 100%;border-bottom:0">
          <el-table-column type="index" label="序号" align="center" width="auto"></el-table-column>
          <el-table-column prop="name" align="center" label="报名点" width="auto">
          </el-table-column>
          <el-table-column label="描述" align="center" width="auto">
            <template slot-scope="scope">{{ scope.row.date }}</template>
          </el-table-column>          
          <el-table-column label="排序" prop="name" align="center" width="auto">
            <!--<template slot-scope="scope">{{ scope.row.name }}</template>-->
          </el-table-column>         
          <el-table-column label="创建时间" align="center" width="auto">
            <template slot-scope="scope">{{ scope.row.date }}</template>
          </el-table-column>         
          <el-table-column label="操作" align="center" width="auto">
            <el-button type="warning">编辑</el-button>
             <el-button type="warning">删除</el-button>
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

  .storesoptions-view {
    width: 100%;
    height: 100%;
    background-color: $BgColor;

    .stores-panel {
      width: 96%;
      height: 100%;
      background-color: $White;
      .panel-top{
          width: 100%;
          height: 55px;
            
          border-bottom: solid 1px $BgColor;
      }
      .page-bar {
          position: absolute;
          right: 50px;
          top: 35px;

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
  }

</style>
