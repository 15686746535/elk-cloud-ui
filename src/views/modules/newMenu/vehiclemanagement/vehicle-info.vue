<template>
  <div class="colleagues-all-view">
    <div class="colleagues-select-bar">
      <div class="selected">           
          <el-select placeholder="车牌/负责人" style="width:280px;margin-left:10px;"></el-select>
          <el-button type="danger" icon="el-icon-search">搜索</el-button>
    </div>
    </div>
    <div class="midddle-bar">
      <div class="left-bt">
          <el-button type="text">导出</el-button>
          <el-button type="text">添加</el-button>
        </div>
        <div class="page-bar">
          <span class="page-txt">共8553条</span>
          <el-button type="text">上一页</el-button>
          <span class="page-txt">第25页</span>
          <el-button type="text">下一页</el-button>
        </div>
        <div class="info-card">
      <div class="item-top">
        <p>20191217nP2</p>
        <div class="operation-button">
          <el-button type="text">办理离职</el-button>
          <el-button type="text">重置密码</el-button>
          <el-button type="text" icon="el-icon-edit-outline">编辑</el-button>
        </div>
      </div>
      <div class="item-bottom">
        <div class="stu-left">
          <div class="stu-overview">
            <div style="width:80px;height:80px;border:solid 1px #999;margin: 17px;border-radius: 15px"></div>
            
            <!-- <el-row>
              <el-col style="color: #333;text-align: center;font-size: 15px;margin-top: -90px;margin-left: 25px;">车牌牌照：渝B6692学
              </el-col>
            </el-row>            
            <el-row>
              <el-col style="color: #333;text-align: center;font-size: 15px;margin-top: -65px;margin-left: 4px;">
                责任人：羊毛稀 
              </el-col>
            </el-row>
            <el-row>
              <el-col style="color: #333;text-align: center;font-size: 15px;margin-top: -40px;margin-left: 75px;white-space">
                所属机构：重庆华通汽车驾驶培训学校
              </el-col>
            </el-row>
            <el-row>
              <el-col style="color: #333;text-align: center;font-size: 15px;margin-top: -13px;margin-left: 17px;">
                车辆状态：外部转入
              </el-col>
            </el-row>
            <el-row>
              <el-col style="color: #333;font-size: 15px;;margin-left: 30px;">华通校区</el-col>
            </el-row> -->
            <div class="car-main-info">
                <el-row></el-row>
                <el-row></el-row>
                <el-row></el-row>
                <el-row></el-row>
            </div>
          </div>
        </div>
        <div class="stu-info">
          <div class="stu-info-right">
            <div class="info-detail">
              <span class="table_text_title">部门：</span>
              <span class="table_text">市场部</span><br>
              <span class="table_text_title">微信：</span>
              <span class="table_text">4855878999</span><br>
              <span class="table_text_title">QQ：</span>
              <span class="table_text">115562566</span>
            </div>
            <div class="info-detail">
              <span class="table_text_title">联系地址：</span>
              <span class="table_text">重庆市大渡口区</span><br>
              <span class="table_text_title">工作电话：</span>
              <span class="table_text">13858454587</span><br>
              <span class="table_text_title">所属职位：</span>
              <span class="table_text">办公室</span>
            </div>
            <div class="info-detail">
              <span class="table_text_title">入职日期：</span>
              <span class="table_text">2018-08-20</span><br>
              <span class="table_text_title">转正日期：</span>
              <span class="table_text">2018-10-20</span><br>              
            </div>
          </div>          
        </div>
      </div>
    </div>
    </div>
    <div class="colleagues-all-panel">

    </div>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        department: [{

        }],
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

  .colleagues-all-view {
    width: 100%;
    height: 100%;
    background-color: $BgColor;

    .colleagues-select-bar {
      width: 98%;
      height: 70px;
      background-color: $White;
      .selected{
        margin-left: 15px;
        padding-top: 10px;
        .el-button--danger {
            color: #fff;
            background-color: $Danger !important;
            border-color: $Danger !important;            
          }
      }
    }
    .midddle-bar{
        width: 98%;
        height: 30px;
        .left-bt {
          position: absolute;
          top: 105px;
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
          top: 105px;

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
        .info-card {
      background-color: #fff;
      box-sizing: border-box;
      /*height: 200px;*/
      width: 100%;
      height: 220px;
      margin-top: 52px;
      .item-top {
      /*background-color: #EAC;*/
      display: block;
      height: 50px;
      width: 100%;
      border-bottom: solid 1px #eee;
      .el-button--text {
            color: #999 !important;
            margin-right: 25px;
            font-size: 16px;
          }
      .operation-button {
        position: relative;
        top: -62px;
        float: right;
        right: 20px;
        .el-button:active{
          color: $Danger!important;
        }
      }
    }

    .item-top > p {
      color: #999;
      padding: 17px;
    }
    .item-bottom {
      height: 200px;
      width: 100%;

      .stu-left {
        width: 320px;
        height: 180px;
        float: left;
        margin-top: -18px;

      }

      .stu-overview {
        height: 140px;
        border-right: solid 1px #eee;
        .car-main-info{
            width: 185px;
            height: 110px;
            background-color: #c50202;
            margin-left: 125px;
            margin-top: -95px;
        }
      }

      .stu-info {
        position: absolute;
        height: 136px;
        float: left;
        margin-left: 250px;
        .stu-info-right {
          height: 136px;
          margin-left: 80px;
            width: 100%;
          min-width: 710px;
        }

        .dynamic {
          position: relative;
          width: 50%;
          height: 50px;
          float: left;

          .new-dynamic {
            margin-top: 5px;
            height: 35px;
            border-right: solid 1px #eee;

            .dynamic-txt-title {
              color: #999;
              font-size: 15px;
              line-height: 35px;
              margin-left: 20px;
            }

            .dynamic-txt {
              color: #666;
              font-size: 15px;
              line-height: 35px;
              margin-left: 20px;
            }
          }
        }

        .new-note {
          position: relative;
          width: 50%;
          height: 49px;
          /*background-color: darkmagenta;*/
          float: left;

          .dynamic-txt-title {
            color: #999;
            font-size: 15px;
            line-height: 35px;
            margin-left: 20px;
          }

          .dynamic-txt {
            color: #666;
            font-size: 15px;
            line-height: 47px;
            margin-left: 20px;
          }
        }

        .table_text_title {
          color: #999;
          font-size: 15px;
          text-align: left;
          word-break: keep-all; /* 不换行 */
          white-space: nowrap; /* 不换行 */
          overflow: hidden; /* 内容超出宽度时隐藏超出部分的内容 */
          text-overflow: ellipsis; /* 当对象内文本溢出时显示省略标记(...) ；需与overflow:hidden;一起使用。*/
          line-height: 45px;
          margin-left: 15px;
        }

        .table_text {
          color: #666;
          font-size: 15px;
          text-align: center;
          word-break: keep-all; /* 不换行 */
          white-space: nowrap; /* 不换行 */
          overflow: hidden; /* 内容超出宽度时隐藏超出部分的内容 */
          text-overflow: ellipsis; /* 当对象内文本溢出时显示省略标记(...) ；需与overflow:hidden;一起使用。*/
          line-height: 45px;
        }

        .info-detail {
          float: left;
          height: 90px;
          width: 31%;
          margin-top: 5px;
        }
      }


    }
    }
    }
    .colleagues-all-panel{
        width: 98%;
        height: auto;
    }
  }

</style>
