<template>
  <div class="colleagues-info">
    <div class="button-group">
      <div class="left-bt">
        <el-button type="text">返回</el-button>
        <el-button type="text">导出</el-button>
      </div>
      <div class="right-bt">
        <el-button type="text">退学</el-button>
        <el-button type="text">约车</el-button>
        <el-button type="text">收费</el-button>
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
          <span class="base-detail-txt-title">档案号：</span>
          <span class="base-detail-txt">20191217nP3</span><br>
          <span class="base-detail-txt-title">身份证</span>
          <span class="base-detail-txt">500104199409052023</span>
        </div>
        <div class="base-detail">
          <span class="base-detail-txt-title">校区</span>
          <span class="base-detail-txt">华通校区</span><br>
          <span class="base-detail-txt-title">身份证</span>
          <span class="base-detail-txt">500104199409052023</span>
        </div>
        <div class="base-detail">
          <span class="base-detail-txt-title">校区</span>
          <span class="base-detail-txt">华通校区</span><br>
          <span class="base-detail-txt-title">身份证</span>
          <span class="base-detail-txt">500104199409052023</span>
        </div>
      </div>

    </div>
    <div class="induction-info">
      <div class="induction-title">
        <p>入学信息</p>
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
      </div>
    </div>
    <div class="tabs">
      <el-tabs @tab-click="handleClick">
        <el-tab-pane label="考试情况" name="first">
          <el-table ref="multipleTable" :stripe="true" tooltip-effect="dark" style="width: 100%;border-bottom:0">
            <el-table-column type="index" width="55" label="序号"></el-table-column>
            <el-table-column prop="name" align="center" label="考试日期" width="auto">
            </el-table-column>
            <el-table-column label="科目" align="center" width="auto">
              <template slot-scope="scope">{{ scope.row.date }}</template>
            </el-table-column>
            <el-table-column prop="state" align="center" label="考试批次" show-overflow-tooltip width="auto">
            </el-table-column>
            <el-table-column prop="state" align="center" label="考试结果" show-overflow-tooltip width="auto">
            </el-table-column>

          </el-table>
        </el-tab-pane>
        <el-tab-pane label="费用情况" name="second">
          <el-table empty-text="暂无数据" @select="selectRow" @select-all="selectRow" :stripe="true" element-loading-text="给我一点时间"
            fit highlight-current-row style="width: 100%;text-align: center;">
            <!-- <el-table-column type="index" fixed label="序号"  align="center" width="100"></el-table-column> -->
            <el-table-column type="expand" fixed width="auto">
              <template slot-scope="props">
                <el-table :data="props.row.stu">
                  <el-table-column align="center" fixed label="编号" width="auto">
                    <template slot-scope="scope">
                      <span>{{scope.row.begin}}-{{scope.row.end}}</span>
                    </template>
                  </el-table-column>
                  <el-table-column align="center" fixed label="金额" width="auto">
                    <template slot-scope="scope">
                      <span>{{scope.row.name}}</span>
                    </template>
                  </el-table-column>
                  <el-table-column align="center" label="项目" width="auto">
                    <template slot-scope="scope">
                      <span>{{scope.row.mobile}}</span>
                    </template>
                  </el-table-column>
                  <el-table-column align="center" label="数量" width="auto">
                    <template slot-scope="scope">
                      <span>{{scope.row.mobile}}</span>
                    </template>
                  </el-table-column>
                </el-table>
              </template>
            </el-table-column>
            <el-table-column align="center" fixed label="单号" width="auto">
              <template slot-scope="scope">
                <span>{{scope.row.coach.name}}</span>
              </template>
            </el-table-column>
            <el-table-column align="center" fixed label="缴费金额" width="auto">
              <template slot-scope="scope">
                <span>{{scope.row.coach.t}}</span>
              </template>
            </el-table-column>
            <el-table-column align="center" fixed label="缴费时间" width="auto">
              <template slot-scope="scope">
                <span>{{scope.row.coach.t}}</span>
              </template>
            </el-table-column>
            <el-table-column align="center" fixed label="缴费类型" width="auto">
              <template slot-scope="scope">
                <span>{{scope.row.coach.t}}</span>
              </template>
            </el-table-column>
            <el-table-column align="center" fixed label="缴费方式" width="auto">
              <template slot-scope="scope">
                <span>{{scope.row.coach.t}}</span>
              </template>
            </el-table-column>
            <el-table-column align="center" fixed label="状态" width="auto">
              <template slot-scope="scope">
                <span>{{scope.row.coach.t}}</span>
              </template>
            </el-table-column>
            <el-table-column align="center" fixed label="操作" width="auto">
              <template slot-scope="scope">
                <span>{{scope.row.coach.t}}</span>
              </template>
            </el-table-column>

          </el-table>
        </el-tab-pane>
        <el-tab-pane label="来访跟进" name="third">
          <p style="line-height:100px;text-align:center">暂无跟进信息</p>
        </el-tab-pane>
        <el-tab-pane label="约车日志" name="fourth">
          <el-table ref="multipleTable" :stripe="true" tooltip-effect="dark" style="width: 100%;border-bottom:0">
            <el-table-column type="index" width="55" label="序号"></el-table-column>
            <el-table-column prop="name" align="center" label="科目" width="auto">
            </el-table-column>
            <el-table-column  align="center" label="签到" width="auto">
              <template slot-scope="scope">{{ scope.row.date }}</template>
            </el-table-column>
            <el-table-column prop="state" align="center" label="车牌" show-overflow-tooltip width="auto">
            </el-table-column>
            <el-table-column prop="state" align="center" label="场地" show-overflow-tooltip width="auto">
            </el-table-column>
            <el-table-column prop="state" align="center" label="时间" show-overflow-tooltip width="auto">
            </el-table-column>            
          </el-table>
        </el-tab-pane>
        <el-tab-pane label="课时信息" name="fifth"><el-table ref="multipleTable" :stripe="true" tooltip-effect="dark" style="width: 100%;border-bottom:0">
            <!-- <el-table-column type="index" width="55" label="序号"></el-table-column> -->
            <el-table-column prop="name" align="center" label="ID" width="auto">
            </el-table-column>
            <el-table-column label="培训部分" align="center" width="auto">
              <template slot-scope="scope">{{ scope.row.date }}</template>
            </el-table-column>
            <el-table-column prop="state" align="center" label="不合格原因" show-overflow-tooltip width="auto">
            </el-table-column>
            <el-table-column prop="state" align="center" label="上报培训学时" show-overflow-tooltip width="auto">
            </el-table-column>
            <el-table-column prop="state" align="center" label="审核有效学时" show-overflow-tooltip width="auto">
            </el-table-column>
            <el-table-column prop="state" align="center" label="需补学时" show-overflow-tooltip width="auto">
            </el-table-column>
            <el-table-column prop="state" align="center" label="传输运营商名称" show-overflow-tooltip width="auto">
            </el-table-column>
          </el-table></el-tab-pane>
      </el-tabs>
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
      }
    }

    .base-info {
      background-color: $White;
      width: 96%;
      height: 200px;
      margin-top: 15px;

      .info-title {
        width: 100%;
        height: 65px;
        border-bottom: solid 1px #eee;
      }

      .base-info-left {
        width: 220px;
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
          width: 235px;
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
            margin-left: 15px;
          }
        }
      }
    }

    .induction-info {
      background-color: $White;
      width: 96%;
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

    .tabs {
      background-color: $White;
      width: 96%;
      min-height: 380px;
      margin-top: 15px;

      .el-tabs__active-bar {
        background-color: #c50202;
      }

      .el-tabs__item.is-active {
        color: #c50202;
      }

      .el-tabs__item:hover {
        color: #c50202;
      }
      .el-tabs__nav-wrap::after{
        height: 1px;
      }

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
        font-size: 14px;
      }

      .el-table td, .el-table th{
        padding: 4px 0!important;
      }

      .el-table .cell {
        line-height: 20px !important;
      }

    }
  }

</style>
