<template>
  <div class="vehicle-info-detail-view">
    <div class="back-bar">
      <div class="left-bt">
        <el-button type="text">返回</el-button>
        <el-button type="text">导出</el-button>
      </div>
    </div>
    <div class="vehicle-info-detail-body">
      <div class="detail-body-top"></div>
      <div class="detail-body-main">
        <div class="main-left">
          <div class="left-img">
            <div style="height: 140px; width: 140px; border-radius: 15px; margin-left: 30px;border:solid 1px #eee"></div>
          </div>
        </div>
        <div style="min-width: 1190px;">  
            <!-- // class="main-right" -->
          <div class="right-detail">
            <div class="info-title">
              <span >车牌颜色：</span><br>
              <span >车身颜色：</span><br>
              <span >自编号：</span><br>
              <span >注册登记日期：</span><br>
              <span >发动机号：</span><br>
              <span >核定载客人：</span>
            </div>
            <div class="info-txt">
              <span >黄色</span><br>
              <span >白色</span><br>
              <span >华通老桑C1场地渝B6692学</span><br>
              <span >2018-01-13</span><br>
              <span >0637921</span><br>
              <span >5</span>
            </div>
          </div>
          <div class="right-detail">
              <div class="info-title">
              <span >车牌颜色：</span><br>
              <span >车身颜色：</span><br>
              <span >自编号：</span><br>
              <span >注册登记日期：</span><br>
              <span >发动机号：</span><br>
              <span >核定载客人：</span>
            </div>
            <div class="info-txt">
              <span >黄色</span><br>
              <span >白色</span><br>
              <span >华通老桑C1场地渝B6692学</span><br>
              <span >2018-01-13</span><br>
              <span >0637921</span><br>
              <span >5</span>
            </div>
          </div>
          <div class="right-detail">
              <div class="info-title">
              <span >车牌颜色：</span><br>
              <span >车身颜色：</span><br>
              <span >自编号：</span><br>
              <span >注册登记日期：</span><br>
              <span >发动机号：</span><br>
              <span >核定载客人：</span>
            </div>
            <div class="info-txt">
              <span >黄色</span><br>
              <span >白色</span><br>
              <span >华通老桑C1场地渝B6692学</span><br>
              <span >2018-01-13</span><br>
              <span >0637921</span><br>
              <span >5</span>
            </div>
          </div>
        </div>
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

  .vehicle-info-detail-view {
    width: 100%;
    height: 100%;
    background-color: $BgColor;
    position: relative;

    .back-bar {
      width: 100%;
      height: 45px;

      .left-bt {
        position: absolute;
        margin-left: 40px;

        .el-button--text {
          color: #999 !important;
          margin-right: 25px;
          font-size: 16px;
        }
      }
    }

    .vehicle-info-detail-body {
      width: 100%;
      height: 400px;
      background-color: $White;

      .detail-body-top {
        height: 70px;
        border-bottom: solid 1px $BgColor;
      }

      .detail-body-main {
        width: 100%;
        height: 310px;

        .main-left {
          width: 15%;
          min-width: 200px;
          height: 310px;
          float: left;
        }

        .left-img {
          width: 100%;
          height: 150px;
          margin-top: 25px;
          border-right: solid 1px $BgColor;
        }

        // .main-right {
        //   width: 100%;
        //   height: 100%;
        //   overflow: hidden;
          .right-detail {
            width: 320px;
            height: 100%;
            float: left;
            margin-left: 10px;
            margin-top: 12px;

            .info-title, {
              width: 115px;
              height: 100%;
              color: #999;
              font-size: 15px;
              text-align: left;
              word-break: keep-all;
              /* 不换行 */
              white-space: nowrap;
              /* 不换行 */
              overflow: hidden;
              /* 内容超出宽度时隐藏超出部分的内容 */
              text-overflow: ellipsis;
              /* 当对象内文本溢出时显示省略标记(...) ；需与overflow:hidden;一起使用。*/
              line-height: 50px;
              margin-left: 15px;
              float: left;
            }
            .info-txt{
                 width: 190px;
              height: 100%;
              color: #666;
              font-size: 15px;
              text-align: left;
              word-break: keep-all;
              /* 不换行 */
              white-space: nowrap;
              /* 不换行 */
              overflow: hidden;
              /* 内容超出宽度时隐藏超出部分的内容 */
              text-overflow: ellipsis;
              /* 当对象内文本溢出时显示省略标记(...) ；需与overflow:hidden;一起使用。*/
              line-height: 50px;
            }
          }
        // }
      }
    }
  }

</style>
