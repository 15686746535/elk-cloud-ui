<template>
  <div class="vist-view">
    <div class="select">
      <el-select style="width:400px" placeholder="接待">
      </el-select>
    </div>
    <div class="score-area">
      <span class="main-text">1.您对接待的工作人员评价，10分为满意，请问您评多少分？</span><br>
      <div class="radios">       
        
          <form>
            <div style="float:left;margin-left:55px">
              <input id="item1" type="radio" name="item" value="1" checked> 
              <label for="item1"></label>
              <span style="margin-left: 10px">A:非常满意</span>
            </div>
            <div style="float:left;margin-left:55px">
              <input id="item2" type="radio" name="item" value="2">
              <label for="item2"></label>
              <span style="margin-left: 10px">B:满意</span>
            </div>
            <div style="float:left;margin-left:55px">
              <input id="item3" type="radio" name="item" value="3">
              <label for="item3"></label>
              <span style="margin-left: 10px">C:一般</span>
            </div>
            <div style="float:left;margin-left:55px">
              <input id="item4" type="radio" name="item" value="4">
              <label for="item4"></label>
              <span style="margin-left: 10px">D:不满意</span>
            </div>
            <div style="float:left;margin-left:55px">
              <input id="item5" type="radio" name="item" value="5">
              <label for="item5"></label>
              <span style="margin-left: 10px">E:其他</span>
            </div>

          </form>
        
      </div>
      <div class="inputarea">
          <el-input type="textarea" :rows="8" placeholder="请输入内容" v-model="textarea">
          </el-input>
        </div> 
    </div>
    <div class="btstyle">
      <el-button plain>取消</el-button>
      <el-button type="danger">确定</el-button>
    </div>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        radio2: '',
        textarea: ''
      }
    }
  }

</script>

<style rel="stylesheet/scss" lang="scss">
  $Danger: #c50202;

  .vist-view {
    width: 98%;
    height: 100%;
    background-color: #fff;
    position: relative;

    .select {
      margin-left: 15px;
      margin-top: 15px;
    }

    .score-area {
      margin-left: 15px;
      margin-top: 15px;

      .main-text {
        line-height: 55px;
        font-size: 17px;
      }

      .radios {
          width: 100%;
          height: 30px;
        margin-top: 30px;
        margin-left: 25px;        

        div {
          position: relative;
          line-height: 30px;
        }

        input[type="radio"] {
          width: 20px;
          height: 24px;
          opacity: 0;
        }

        label {
          position: absolute;
          left: 5px;
          top: 8px;
          width: 20px;
          height: 20px;
          border-radius: 50%;
          border: 1px solid #999;
        }

        /*设置选中的input的样式*/
        /* + 是兄弟选择器,获取选中后的label元素*/
        input:checked+label {
          background-color: $Danger;
          border: 1px solid $Danger;
        }

        input:checked+label::after {
          position: absolute;
          content: "";
          width: 5px;
          height: 10px;
          top: 3px;
          left: 6px;
          border: 2px solid #fff;
          border-top: none;
          border-left: none;
          transform: rotate(45deg)
        }
      }

      .inputarea {
        margin-top: 55px;
        // margin-left: -15px;
      }


    }

    .btstyle {
      display: inline-block;
      margin-top: 30px;
      width: 450px;
      height: 50px;
      vertical-align: middle;
      position: relative;
      z-index: 1;
      margin-left: 30%;

      .el-button {
        width: 200px;
        //   color: $Danger!important;
      }

      //   .el-button:hover{
      //       color: $Danger!important;
      //   }
      .el-button--danger {
        color: #fff;
        background-color: $Danger !important;
        border-color: $Danger !important;
      }

      .el-button.is-plain:focus,
      .el-button.is-plain:hover {
        background: #fff;
        border-color: $Danger !important;
        color: $Danger !important;
      }

      .el-radio__inner {
        border-color: $Danger !important;
        background: $Danger !important;
      }
    }
  }

</style>
