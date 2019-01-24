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
      <div class="info-title">
        <p>基本信息</p>
      </div>
      <div class="base-info-left">
        <div style="width:80px;height:80px;border:solid 1px #999;margin: 17px;border-radius: 15px"></div>
        <el-row>
          <el-col style="color: #333;text-align: center;font-size: 15px;margin-top: -80px;margin-left: 20px;">林智
          </el-col>
        </el-row>
        <el-row>
          <el-col style="color: #7c7c7c;text-align: center;font-size: 15px;margin-top: -50px;margin-left: 48px;">
            18623696917
          </el-col>
        </el-row>
      </div>
      <div class="base-info-right">
        <div class="base-detail">
          <span class="base-detail-txt-title">校区：</span>
          <span class="base-detail-txt">华通校区</span><br>
          <span class="base-detail-txt-title">身份证：</span>
          <span class="base-detail-txt">500104199409052023</span>
        </div>
        <div class="base-detail">
          <span class="base-detail-txt-title">出生：</span>
          <span class="base-detail-txt">1995-09-05</span><br>
          <span class="base-detail-txt-title">工号：</span>
          <span class="base-detail-txt">500104199409052023</span>
        </div>
        <div class="base-detail">
          <span class="base-detail-txt-title">联系地址：</span>
          <span class="base-detail-txt">重庆市大渡口区</span><br>          
        </div>
      </div>

    </div>
    <div class="induction-info">
      <div class="induction-title">
        <p>入职信息</p>
      </div>
      <div class="induction-bottom">
        <div class="induction-detail">
          <div class="induction-detail-txt-title">
            <span>工作电话：</span><br>
            <span>所属部门：</span><br>
            <span>学历：</span><br>
            <span>入职日期：</span><br>
            <span>QQ：</span>
          </div>
          <div class="induction-detail-txt">
            <span>15862354758</span><br>
            <span>信息部</span><br>
            <span>本科</span><br>
            <span>2018-9-8</span><br>
            <span>1157894470</span>
          </div>
        </div>
        <div class="induction-detail">
          <div class="induction-detail-txt-title">
            <span>紧急联系人：</span><br>
            <span>购买公积金：</span><br>
            <span>五险购买：</span><br>
            <span>是否教练：</span><br>
            <span>邮箱：</span>
          </div>
          <div class="induction-detail-txt">
            <span>15862354758</span><br>
            <span>是</span><br>
            <span>是</span><br>
            <span>是</span><br>
            <span>1157894470@qq.com</span>
          </div>
        </div>
        <div class="induction-detail">
          <div class="induction-detail-txt-title">
            <span>微信：</span><br>
            <span>职位：</span><br>
            <span>专业：</span><br>
            <span>转正日期：</span><br>
            <span>紧急电话：</span>
          </div>
          <div class="induction-detail-txt">
            <span>15862354758</span><br>
            <span>信息部</span><br>
            <span>本科</span><br>
            <span>2018-9-8</span><br>
            <span>1157894470</span>
          </div>
        </div>
        <div class="induction-detail">
          <div class="induction-detail-txt-title">
            <span>介绍人：</span><br>
            <span>联系地址：</span><br>
            <span>家庭住址：</span><br>            
          </div>
          <div class="induction-detail-txt">
            <span>小红</span><br>
            <span>重庆市大渡口区</span><br>
            <span>重庆市大渡口区</span><br>
            
          </div>
        </div>
      </div>
    </div>  
  </div>
</template>
<script>
  export default {
    data() {
      return {
        activeName: '',
        studentListLoading: false,
        list: [],
        // pageHeight: this.area[1],
        // pageWidth: this.area[0],
        tableData3: [{
          date: "2016-05-03",
          name: "王小虎",
          state: 1
        }, {
          date: "2016-05-02",
          name: "王小虎",
          state: 1
        }, {
          date: "2016-05-04",
          name: "王小虎",
          state: 1
        }],
      }
    },
    methods: {
      handleClick(tab, event) {
        console.log(tab, event);
      },
      selectRow() {

      },
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

  .colleagues-info {
    position: relative;
    background-color: $BgColor;
    width: 100%;
    height: auto;

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
        .el-button:active{
            color: $Danger!important;
        }
      }
    }

    .base-info {
      background-color: $White;
      width: 96%;
      min-width: 1050px;
      height: 200px;
      margin-top: 15px;

      .info-title {
        width: 100%;
        height: 65px;
        border-bottom: solid 1px #eee;
      }

      .base-info-left {
        width: 225px;
        height: 110px;
        float: left;
        border-right: solid 1px #eee;
        margin-top: 15px;
        font-size: 16px;
      }

      .info-title>p {
        font-size: 18px;
        line-height: 70px;
        margin-left: 20px;
      }

      .base-info-right {
        /*width: 80%;*/
        height: 120px;
        float: left;

        /*margin-left: 225px;*/
        .base-detail {
          width: 240px;
          height: 110px;
          float: left;
          margin-right: 10px;
          margin-top: 12px;

          .base-detail-txt-title {
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
          }

          .base-detail-txt {
            color: #666;
            font-size: 15px;
            text-align: center;
            word-break: keep-all;
            /* 不换行 */
            white-space: nowrap;
            /* 不换行 */
            overflow: hidden;
            /* 内容超出宽度时隐藏超出部分的内容 */
            text-overflow: ellipsis;
            /* 当对象内文本溢出时显示省略标记(...) ；需与overflow:hidden;一起使用。*/
            line-height: 50px;
            margin-left: 10px;
          }
        }
      }
    }

    .induction-info {
      background-color: $White;
      width: 96%;
      min-width: 1050px;
      min-height: 380px;
      margin-top: 15px;

      .induction-title {
        width: 100%;
        height: 65px;
        border-bottom: solid 1px #eee;
      }

      .induction-title>p {
        font-size: 18px;
        line-height: 70px;
        margin-left: 27px;
      }

      .induction-bottom {
        .induction-detail {
          width: 225px;
          height: 110px;
          float: left;
          margin-left: 10px;
          margin-top: 12px;

          .induction-detail-txt-title {
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

          .induction-detail-txt {
            color: #666;
            font-size: 15px;
            /*text-align: center;*/
            word-break: keep-all;
            /* 不换行 */
            white-space: nowrap;
            /* 不换行 */
            overflow: hidden;
            /* 内容超出宽度时隐藏超出部分的内容 */
            text-overflow: ellipsis;
            /* 当对象内文本溢出时显示省略标记(...) ；需与overflow:hidden;一起使用。*/
            line-height: 50px;
            /*margin-left: 15px;*/
            padding-left: 15px;
          }
        }
      }
    }

   
  }

</style>
