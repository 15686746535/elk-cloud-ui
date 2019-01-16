<template>
  <div class="colleagues-info">
    <div class="button-group">
      <div class="left-bt">
        <el-button type="text">返回</el-button>
        <el-button type="text">导出</el-button>
      </div>
      <div class="right-bt">
        <el-button type="text">办理离职</el-button>
        <el-button type="text">重置密码</el-button>
        <el-button type="text">编辑</el-button>
      </div>
    </div>
    <div class="base-info">
      <div class="info-title"></div>
        <div class="base-info-left">

        </div>
        <div class="base-info-right">

        </div>

    </div>
    <div class="induction-info"></div>
  </div>
</template>


<style rel="stylesheet/scss" lang="scss">
  /*主体白色*/
  $White: #fff;
  /*主体红色*/
  $Danger: #c50202;
  /*灰白色*/
  $BgColor: #eee;
  .colleagues-info {
    position: relative;
    background-color: $BgColor;
    width: 100%;
    height: 100%;

    .button-group {
      .left-bt {
        position: relative;
        top: 10px;

        .el-button--text {
          color: #999 !important;
          margin-right: 25px;
        }
      }

      .right-bt {
        position: absolute;
        top: 10px;
        right: 17px;

        .el-button--text {
          color: #999 !important;
          margin-right: 25px;
        }
      }
    }

    .base-info {
      background-color: $White;
      width: 96%;
      height: 220px;
      margin-top: 15px;
      .info-title{
        width: 100%;
        height: 65px;
        border-bottom: solid 1px #eee;
      }
      .base-info-left{
        width: 20%;
        height: 120px;
        float: left;
        border-right: solid 1px #eee;
      }
      .base-info-right{
        width: 80%;
        height: 120px;
        float: left;
      }
    }

    .induction-info {

    }
  }
</style>
