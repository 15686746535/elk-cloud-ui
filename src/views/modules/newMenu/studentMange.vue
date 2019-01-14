<template>

    <div class="stu-container">
      <div class="top-bar">
        <el-date-picker value-format="timestamp"  type="daterange" align="left" range-separator="-"
                        start-placeholder="开始日期" end-placeholder="结束日期" :picker-options="pickerOptions">
        </el-date-picker>
        <el-select placeholder="科目" style="width:150px;margin-left: 15px">
          <el-option
            v-for="item in kemu"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
        <el-select placeholder="入学校区" style="width:150px;margin-left: 15px">
          <el-option
            v-for="item in camps"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
        <el-select placeholder="介绍人" style="width:150px;margin-left: 15px">
          <el-option
            v-for="item in camps"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
      </div>
      <el-card style="height: 290px">
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
            <div class="stu-overview">
                 <div style="width:80px;height:80px;border:solid 1px #999;margin: 27px;border-radius: 15px"></div>
                 <!-- <p>林智</p> -->
                 <el-row>
                <el-col style="color: #7c7c7c;text-align: center;font-size: 15px;margin-top: -100px;margin-left: 2px;">林智</el-col>
              </el-row>
               <el-row>
                <el-col style="color: #7c7c7c;text-align: center;font-size: 15px;margin-top: -75px;margin-left: -3px;">C1</el-col>
              </el-row>
              <el-row>
                <el-col style="color: #7c7c7c;text-align: center;font-size: 15px;margin-top: -50px;margin-left: 31px;">18623696917</el-col>
              </el-row>
               <el-row>
                <el-col style="color: #7c7c7c;font-size: 15px;;margin-left: 18px;">500125****1217</el-col>
              </el-row>
            </div>
            <div class="stu-info">
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
                <div class="other-info">
                    <div class="new-dynamic">
                      <span class="dynamic-txt">最新动态：</span>
                      <span class="dynamic-txt">科目二已经过啦~</span>
                    </div>
                     <div class="new-note">
                       <span class="dynamic-txt">备注：</span>
                       <span class="dynamic-txt">科目二已经过啦~</span>
                     </div>
                </div>
            </div>
        </div>
      </el-card>
    </div>

</template>

<script>
export default {
    data(){
        return{
          kemu:[{ value:1,label:"科目一"},{ value:2,label:"科目二"},{ value:3,label:"科目三"},{ value:4,label:"科目四"},
          ],
          camps:[{ value:1,label:"全悦校区"},{ value:2,label:"壹路校区"},{ value:3,label:"华通校区"},{ value:4,label:"北碚校区"},
          ],
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

<style rel="stylesheet/scss" lang="scss" scoped>
  .stu-container{
    background-color: #fff; 
    /*margin-top: 10px;   */
    position: relative;
    .top-bar{
      /*height: 50px;*/
      background-color: #449d44;
      /*margin-bottom: 10px;*/
      /*margin-left: 10px;*/
      /*margin-top: 10px;*/
      margin: 10px auto 10px 15px;
    }
    .el-card__body {
      padding: 0px !important;
    }
  .item-top{
      /*background-color: #EAC;*/
      height: 50px;
      width: 100%;
      border-bottom: solid 1px #eee;
      .operation-button{
          position: relative;
          top: -62px;
          float: right;
          right: 20px;
      } 
  }
   .item-top>p{
       color: #999;     
      padding: 17px;  
   }
  .item-bottom{
      height: 200px;
      width: 100%;
    //   background-color: #6DC;
      .stu-overview{
          /*background-color: #EAC;*/
          width: 27%;
          height: 200px;
          float: left;
          margin-top: -18px;
          border-right: solid 1px #eee ;
      }
      .stu-info{
          width: 73%;
          height: 150px;          
          /*background-color: aqua;*/
          border-bottom: solid 1px #eee;
          float: left;  
          margin-top: -58px;
          .new-dynamic{
              width: 50%;
              height: 49px;  
              border-right: solid 1px #eee;
              /*background-color: chocolate;*/
              margin-top: 6px;
              float: left;
            .dynamic-txt{
              color: #999;
              font-size: 15px;
              line-height: 47px;
              margin-left: 20px;
            }
          }
          .new-note{
              width: 50%;
              height: 49px; 
              /*background-color: darkmagenta;*/
              margin-top: 6px;
              float: left;
            .dynamic-txt{
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
        .table_text{
          color: #666;
          font-size: 15px;
          text-align: center;
          word-break: keep-all; /* 不换行 */
          white-space: nowrap; /* 不换行 */
          overflow: hidden; /* 内容超出宽度时隐藏超出部分的内容 */
          text-overflow: ellipsis; /* 当对象内文本溢出时显示省略标记(...) ；需与overflow:hidden;一起使用。*/
          line-height: 45px;
        }
        .info-detail{
          float: left;
          height: 140px;
          width: 235px;
          margin-top: 5px;
        }
      }
  }
  }
</style>
