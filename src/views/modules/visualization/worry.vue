<template>
  <div class="app-container calendar-list-container" :style="{height: $store.state.app.client.height + 'px'}">
    <bar-pile-chart :data="data" ></bar-pile-chart>
  </div>
</template>

<script>
  import PieChart from '@/components/PieChart'
  import { queryWorry } from '@/api/visualization/api'

  export default {
    name: 'query_worry',
    components: {
      PieChart
    },
    data() {
      return {
        listQuery: {
          beginTime: null,
          endTime: null
        },
        data: {
          colors: ['#409eff'],
          xAxis: [],
          seriesList: []
        }
      }
    },
    created() {
      this.getList()
    },
    computed: {
    },
    methods: {
      getList() {
        queryWorry(this.listQuery).then(response => {
          var data = response.data
          console.log('===========')
          console.log(data)
          // this.weekData = {
          //   colors: ['#e6a23c'],
          //   xAxis: ['日', '一', '二', '三', '四', '五', '六'],
          //   seriesList: data.week
          // }
        })
      }
    }
  }
</script>

<style rel="stylesheet/scss" lang="scss" scoped>

  .clearfix:before,
  .clearfix:after {
    display: table;
    content: "";
  }
  .clearfix:after {
    clear: both
  }
  .intentions {
    overflow:auto;
  }
  .intention {
    float: left;
    width: 242px;
    height: 218px;
    margin:5px;
    cursor: pointer;
    border: 1px solid #449ffb;
    border-radius: 5px 5px;
    box-shadow: 5px 3px 3px #ffffff;
    padding: 5px;
    transition: border-color 0.2s,box-shadow 0.2s;
  }
  .intention_btn{
    width: 60px;
    height: 25px;
    border-radius: 5px 0px;
    float: right;
    margin: -17px -6px;
    cursor: pointer;
    background-color: #449ffb;
    transition: background-color 0.2s;
    color: #ffffff;
    text-align: center;
    line-height: 25px;
    font-size: 14px
  }
  .intention:hover{
    border-color: #67c23a;
    .intention_btn{
      background-color: #67c23a;
    }
  }
  .intention_selected {
    border-color: #67c23a;
    box-shadow: 5px 3px 3px #b2b6bd;
    .intention_btn{
      background-color: #67c23a;
    }
  }
  .intention_text{
    color:#495060;
    margin: 2px 0;
    font-size: 14px;
    line-height: 25px;
    word-break:keep-all;/* 不换行 */
    white-space:nowrap;/* 不换行 */
    overflow:hidden;/* 内容超出宽度时隐藏超出部分的内容 */
    text-overflow:ellipsis;/* 当对象内文本溢出时显示省略标记(...) ；需与overflow:hidden;一起使用。*/
  }
  .text_css{
    color:#495060;
    font-size: 16px;
    word-break:keep-all;/* 不换行 */
    white-space:nowrap;/* 不换行 */
    overflow:hidden;/* 内容超出宽度时隐藏超出部分的内容 */
    text-overflow:ellipsis;/* 当对象内文本溢出时显示省略标记(...) ；需与overflow:hidden;一起使用。*/
  }
  .el-tooltip__popper.is-dark {
    background: #303133;
    color: #fff;
   }
  .alert_follow{
    position: fixed;
    top: 85px;
    right: 0;
    width: 350px;
    background-color: #fff;
    border-left: 1px solid #449ffb;
    z-index: 10000;
    transition: left 0.2s;
    .avatar{
      float: left;
      width: 40px;
      height: 40px;
      border-radius: 1000px;
      margin-left: -21px;
      margin-top: -14px;
      padding: 0px;
      overflow: hidden;
    }
    .username{
      float: left;
      color: rgb(73, 80, 96);
      font-size: 12px;
      margin-left: 10px;
      font-weight: 600;
    }
    .time{
      float: right;
      color: rgb(73, 80, 96);
      font-size: 12px;
    }
  }
</style>

