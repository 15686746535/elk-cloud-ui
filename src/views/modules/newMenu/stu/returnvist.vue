<template>
  <div class="returnvist-view">
    <div class="returnvist-pane">
      <div class="select-bar">
        <div class="btgroup">
          <el-button-group>
            <el-button type="danger">科一</el-button>
            <el-button type="danger">科二</el-button>
            <el-button type="danger">科三</el-button>
          </el-button-group>
        </div>
        <el-select placeholder="姓名/电话/身份证" style="width:200px;margin-left:20px;margin-top:15px"></el-select>
        <div class="searchbt">
          <el-button el-button type="danger" icon="el-icon-search">搜索</el-button>
        </div>
      </div>
      <div class="main-body">
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
        .btgroup{
            margin-left: 10px;
            margin-top: 15px;
        }
        .searchbt{
            float: right;
        }
      }
    }
  }

</style>
