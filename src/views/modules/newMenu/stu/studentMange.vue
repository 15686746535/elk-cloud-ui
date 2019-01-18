<template>

  <div class="stu-container">
    <!--<div class="top-bar" >-->
      <!--<el-row>-->
        <!--<el-date-picker value-format="timestamp" type="daterange" align="left" range-separator="-"-->
                        <!--start-placeholder="开始日期" end-placeholder="结束日期" :picker-options="pickerOptions">-->
        <!--</el-date-picker>-->
        <!--<el-select placeholder="科目" style="width:150px;margin-left: 15px;margin-top: 10px">-->
          <!--<el-option-->
            <!--v-for="item in kemu"-->
            <!--:key="item.value"-->
            <!--:label="item.label"-->
            <!--:value="item.value">-->
          <!--</el-option>-->
        <!--</el-select>-->
        <!--<el-select placeholder="入学校区"  style=" width:150px;margin-left: 15px">-->
          <!--<el-option-->
            <!--v-for="item in camps"-->
            <!--:key="item.value"-->
            <!--:label="item.label"-->
            <!--:value="item.value">-->
          <!--</el-option>-->
        <!--</el-select>-->
        <!--<el-select placeholder="介绍人" style="width:150px;margin-left: 15px">-->
          <!--<el-option-->
            <!--v-for="item in camps"-->
            <!--:key="item.value"-->
            <!--:label="item.label"-->
            <!--:value="item.value">-->
          <!--</el-option>-->
        <!--</el-select>-->
        <!--<el-button type="text">展开</el-button>-->
        <!--&lt;!&ndash;<a data-toggle="collapse" href="#collapseOne">展开</a>&ndash;&gt;-->
        <!--<el-button icon="el-icon-search" type="danger">搜索</el-button>-->
      <!--</el-row>-->

    <!--</div>-->
    <div class="top-bar">
      <div style="position: relative;width: 100%">
        <div style="position: absolute;left: 0;top: 0;width: 88%;height: 50px;margin-top: 10px">
          <el-date-picker value-format="timestamp" type="daterange" align="left" range-separator="-"
                          start-placeholder="开始日期" end-placeholder="结束日期" >
          </el-date-picker>
          <el-select  placeholder="科目" style="width:150px;margin-left: 15px;">

          </el-select>
          <el-select  placeholder="入学校区" style="width:150px;margin-left: 15px">

          </el-select>
          <el-select v-model="testvalue" placeholder="介绍人" style="width:150px;margin-left: 15px">

          </el-select>
          <el-button type="text" style="float: right">展开</el-button>
          <!--<a data-toggle="collapse" href="#collapseOne">展开</a>-->

        </div>
        <div style="position: absolute;right: 0;top: 0;width: 10%;height: 50px;">
          <el-button icon="el-icon-search" type="danger" @click="serachbt">搜索</el-button>
        </div>

      </div>
      <el-collapse accordion>
        <el-collapse-item>
          <template slot="title">
            <div style="width: 80%">
            </div>
          </template>
          <div style="margin-top: 10px">
            <el-select v-model="testvalue" placeholder="介绍人" style="width:150px;margin-left: 15px">

            </el-select>
            <el-select v-model="testvalue" placeholder="介绍人" style="width:150px;margin-left: 15px">

            </el-select>
            <el-select v-model="testvalue" placeholder="介绍人" style="width:150px;margin-left: 15px">

            </el-select>
          </div>
        </el-collapse-item>

      </el-collapse>
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
          <el-button type="text">退学</el-button>
          <el-button type="text">约车</el-button>
          <el-button type="text">收费</el-button>
          <el-button type="text" icon="el-icon-edit-outline">编辑</el-button>
        </div>
      </div>
      <div class="item-bottom">
        <div class="stu-left">
          <div class="stu-overview">
            <div style="width:80px;height:80px;border:solid 1px #999;margin: 17px;border-radius: 15px"></div>
            <!-- <p>林智</p> -->
            <el-row>
              <el-col style="color: #7c7c7c;text-align: center;font-size: 15px;margin-top: -90px;margin-left: 2px;">林智
              </el-col>
            </el-row>
            <el-row>
              <el-col style="color: #7c7c7c;text-align: center;font-size: 15px;margin-top: -70px;margin-left: -3px;">C1
              </el-col>
            </el-row>
            <el-row>
              <el-col style="color: #7c7c7c;text-align: center;font-size: 15px;margin-top: -50px;margin-left: 31px;">
                18623696917
              </el-col>
            </el-row>
            <el-row>
              <el-col style="color: #7c7c7c;font-size: 15px;;margin-left: 18px;">500125****1217</el-col>
            </el-row>
          </div>
        </div>
        <div class="stu-info">
          <div class="stu-info-right">
            <div class="info-detail">
              <span class="table_text_title">入学日期：</span>
              <span class="table_text">2018-11-30</span><br>
              <span class="table_text_title">介&nbsp;绍&nbsp;人&nbsp;：</span>
              <span class="table_text">李茂</span><br>
              <span class="table_text_title">状&nbsp;&nbsp;&nbsp;态&nbsp;&nbsp;：</span>
              <span class="table_text">科目一</span>
            </div>
            <div class="info-detail">
              <span class="table_text_title">出生日期：</span>
              <span class="table_text">1995-09-05</span><br>
              <span class="table_text_title">来源渠道：</span>
              <span class="table_text">学员转介绍</span><br>
              <span class="table_text_title">场训教练：</span>
              <span class="table_text">某某</span>
            </div>
            <div class="info-detail">
              <span class="table_text_title">培训校区：</span>
              <span class="table_text">江北培训点</span><br>
              <span class="table_text_title">应收金额：</span>
              <span class="table_text">3200</span><br>
              <span class="table_text_title">欠费金额：</span>
              <span class="table_text">0</span>
            </div>
          </div>
          <div class="other-info">
            <div class="dynamic">
              <div class="new-dynamic">
                <span class="dynamic-txt-title">最新动态：</span>
                <span class="dynamic-txt">科目二已经过啦~</span>
              </div>
            </div>
            <div class="new-note">
              <span class="dynamic-txt-title">备注：</span>
              <span class="dynamic-txt">科目二已经过啦~</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>

</template>

<script>
  export default {
    props: {
      width: {
        type: Number,
        default: 150
      },
    },
    data() {
      return {
        testvalue:null,
        kemu: [{ value: 1, label: "科目一" }, { value: 2, label: "科目二" }, { value: 3, label: "科目三" }, {
          value: 4,
          label: "科目四"
        }
        ],
        camps: [{ value: 1, label: "全悦校区" }, { value: 2, label: "壹路校区" }, { value: 3, label: "华通校区" }, {
          value: 4,
          label: "北碚校区"
        }
        ],
        pickerOptions: {
          shortcuts: [{
            text: "今天",
            onClick(picker) {
              const time = new Date(new Date().setHours(0, 0, 0, 0));
              picker.$emit("pick", [time, time]);
            }
          }, {
            text: "明天",
            onClick(picker) {
              const time = new Date(new Date().setHours(0, 0, 0, 0));
              time.setTime(time.getTime() + 3600 * 1000 * 24 * 1);
              picker.$emit("pick", [time, time]);
            }
          }]
        }
      };
    },
    created(){
      this.daying();
    },
    methods: {
      daying(){

        console.log("12312312")
      },
      serachbt(){
        console.log("232")
      }
    }
  };
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  .stu-container {
    background-color: #eee;
    $Danger: #c50202;
    /*margin-top: 10px;   */
    position: relative;
    height: 100%;
    .el-collapse-item__header{
      height: 70px!important;
    }
    .top-bar {
      position: relative;
      top: 10px;
      background-color: #fff;
      height: 60px;

    }



    .page-bar {
      position: absolute;
      right: 0px;
      margin-top: 17px;

      .page-txt {
        color: #999;
        margin-left: 10px;
      }
    }

    .info-card {
      background-color: #fff;
      box-sizing: border-box;
      /*height: 200px;*/
      width: 100%;
      height: 230px;
      margin-top: 52px;
    }

    .el-button--danger {
      color: #fff;
      background-color: $Danger !important;
      border-color: $Danger !important;
    }

    .el-button--text {
      color: #999 !important;
    }

    .el-button:active {
      color: $Danger !important;
    }

    .item-top {
      /*background-color: #EAC;*/
      display: block;
      height: 50px;
      width: 100%;
      border-bottom: solid 1px #eee;

      .operation-button {
        position: relative;
        top: -62px;
        float: right;
        right: 40px;
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
        width: 250px;
        height: 180px;
        float: left;
        margin-top: -18px;

      }

      .stu-overview {
        height: 140px;
        border-right: solid 1px #eee;
      }

      .stu-info {
        position: absolute;
        height: 136px;
        float: left;
        margin-left: 250px;
        .stu-info-right {
          height: 136px;
          margin-left: 20px;
          border-bottom: solid 1px #eee;
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
          width: 235px;
          margin-top: 5px;
        }
      }


    }
  }
</style>
