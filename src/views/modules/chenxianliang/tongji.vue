<template>
  <div class="adminssion" style="background: #eee;height: 100%">
    <el-container>

      <el-container>
        <el-main>
          <div class="main-top">
            <el-row class="card" >
              <img src="tongjiimg/1.png" class="img">
              <img src="tongjiimg/2.png" class="img">
              <img src="tongjiimg/3.png" class="img">
              <img src="tongjiimg/4.png" class="img">
            </el-row>
            <el-row class="select">
            <label>全局范围设置 &nbsp;&nbsp;&nbsp;</label>
            <el-select placeholder="校区"></el-select>
            <el-select placeholder="年份"></el-select>
            <el-button class="confirmbutton" icon="el-icon-search">确认搜索</el-button>
            </el-row>
          </div>

          <div class="bodyleft">
            <ul style="padding: 0px">
              <li >招生人数</li>
              <li>人均产值</li>
              <li>招生完成率</li>
              <li>招生增长率</li>
              <li>招生人数占有率</li>
              <li>车管所人数占有率</li>
            </ul>
          </div>

          <div class="bodyright">
            <!--<div style="height: 600px;width: 50%; background: #449d44"></div>-->
            <el-row class="select">
              <el-radio ></el-radio>
              <label>招生人数 &nbsp;&nbsp;&nbsp;</label>
              <el-select placeholder="校区"></el-select>
              <el-select placeholder="年份"></el-select>
              <el-button class="confirmbutton" icon="el-icon-search">确认搜索</el-button>
              <!--<img src="./tongjiimg/baocun.png" class="img"> <span style="padding-left: 15px">保存图片</span>-->
            </el-row>

            <div class="mini-card">
                <div class="topcard"><span style="position: relative;margin: 45px;top: 15px;color: #fff">招生人数</span></div>
              <div class="botcard"><span style="position: relative;margin: 45px;top: 15px">72062人</span></div>

            </div>
            <div class="rightcard">
              <div class="topcard1"><span style="position: relative;margin: 45px;top: 15px;color: #fff">招生总金额</span></div>
              <div class="botcard2"><span style="position: relative;margin: 45px;top: 15px">72062元</span></div>
            </div>
          </div>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
  export default {
    data (){
      return{
        collapseBtnClick:false,
        isCollapse:true,
        tabPosition:'left',
      }
    },
    // mounted:{
    //
    // },
    methods: {
      collapseStatus() {
        this.collapseBtnClick = this.isCollapse;
        this.isCollapse = !this.isCollapse;
      },
      collapseOpen() {
        if (this.collapseBtnClick) return;
        this.isCollapse = false;
      }
    },
    collapseClose() {
      if (this.collapseBtnClick) return;
      this.isCollapse = true;
    }

  }
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  .adminssion {
    .global {
      position: relative;
      top: 50px;
      left: 20px;
      height: 20px;
    }

    .confirmbutton {
      background-color: #c50202;
      color: #fff;
    }

    .main-top {
      display: block;
      word-break: keep-all; /* 不换行 */
      white-space: nowrap; /* 不换行 */
      overflow: hidden;
      /*box-shadow: 2px 2px 2px 2px rgba(0,0,0,0.2);*/
      background: #fff;
      transition: 0.3s;
      width: 100%;
      height: 250px;
      border-radius: 15px 15px 0 0;
      padding: 20px;

      .card {
        display: block;
        word-break: keep-all; /* 不换行 */
        white-space: nowrap; /* 不换行 */
        /*margin-top: 20px;*/
        /*padding: 20px;*/
        .img {
          margin-right: 8px;
          width: 200px;
        }
      }

      .select {
        /*bottom: -30px;
        /*left: 10px;*/
        margin-top: 40px;
      }
    }

    .bodyleft {
      background: #fff;
      width: 200px;
      float: left;
      margin-top: 10px;
      line-height: 40px;
      padding: 20px;

      .wz {
        /*line-height: 2px;*/
      }

    }

    .bodyright {
      /*display:block;*/
      /*word-break:keep-all; !* 不换行 *!*/
      /*white-space:nowrap; !* 不换行 *!*/
      position: relative;
      background: #fff;
      float: right;
      margin-top: 10px;
      height: 550px;
      width: 85%;
      margin-left: 10px;

      .select {
        padding: 20px;
      }

      .img {
        height: 20px;
        width: 20px;
        position: relative;
        left: 20px;
        top: 5px;
      }

      .mini-card {
        position: absolute;
        right: 150px;
        .topcard {
          width: 160px;
          height: 50px;
          /*box-shadow: 0 2px 2px 0 rgba(0, 0, 0, 0.2);*/
          border-radius: 15px 15px 0 0;
          background: #D80000;
        }

        .botcard {
          width: 160px;
          height: 50px;
          box-shadow: 0 2px 2px 0 rgba(0, 0, 0, 0.2);
          border-radius: 0 0 15px 15px;
        }
      }
    }
  }
</style>
