<template>
    <div class="stu-container">
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
                 <div style="width:80px;height:80px;border:solid 1px;margin: 27px;"></div>
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
                <el-col>
                <el-row :gutter="10">
                  <el-col :span="3" class="table_text">入学日期:</el-col>
                  <el-col :span="5" class="table_text">2018-11-30</el-col>
                </el-row>
                <el-row :gutter="10">
                  <el-col :span="3" class="table_text">介绍人:</el-col>
                  <el-col :span="5" class="table_text">李茂</el-col>
                </el-row>
                <el-row :gutter="10">
                  <el-col :span="7" class="table_text">状态:</el-col>
                  <el-col :span="17" class="table_text">科目一</el-col>
                </el-row>
                </el-col>
                <el-col>
                <el-row :gutter="10">
                  <el-col :span="3" class="table_text">出生:</el-col>
                  <el-col :span="5" class="table_text">1995-09-05</el-col>
                </el-row>
                <el-row :gutter="10">
                  <el-col :span="3" class="table_text">来源渠道:</el-col>
                  <el-col :span="5" class="table_text">学员转介绍</el-col>
                </el-row>
                <el-row :gutter="10">
                  <el-col :span="7" class="table_text">场训教练:</el-col>
                  <el-col :span="17" class="table_text">某某</el-col>
                </el-row>
                </el-col>
                <div class="other-info">
                    <div class="new-dynamic"></div>
                     <div class="new-note"></div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    data(){
        return{

        }
    }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  .stu-container{
    background-color: #fff; 
    margin-top: 10px;   
    position: relative;
  .item-top{
      background-color: #EAC;
      height: 50px;
      width: 100%;
      border-bottom: solid 1px #999;     
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
          background-color: #EAC;
          width: 27%;
          height: 200px;
          float: left;
          margin-top: -18px;
          border-right: solid 1px #999 ;
      }
      .stu-info{
          width: 73%;
          height: 150px;          
          background-color: aqua;
          border-bottom: solid 1px #999;        
          float: left;  
          margin-top: -58px;
          .new-dynamic{
              width: 50%;
              height: 49px;  
              border-right: solid 1px #999;
              background-color: chocolate;
              margin-top: 151px;
              float: left;
          }
          .new-note{
              width: 50%;
              height: 49px; 
              background-color: darkmagenta;
              margin-top: 151px;
              float: left;
          }
          .table_text {
              color: #999;
              font-size: 15px;
              text-align: left;
              word-break: keep-all; /* 不换行 */
              white-space: nowrap; /* 不换行 */
              overflow: hidden; /* 内容超出宽度时隐藏超出部分的内容 */
              text-overflow: ellipsis; /* 当对象内文本溢出时显示省略标记(...) ；需与overflow:hidden;一起使用。*/
            }
      }
  }
  }
</style>
