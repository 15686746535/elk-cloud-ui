<template>
  <el-tabs v-model="activeName" @tab-click="handleClick">
    <el-tab-pane label="考试情况" name="first">考试情况</el-tab-pane>
    <el-tab-pane label="费用情况" name="second">费用情况</el-tab-pane>
    <el-tab-pane label="来访跟进" name="third">来访跟进</el-tab-pane>
    <el-tab-pane label="约车日志" name="fourth">约车日志</el-tab-pane>
    <el-tab-pane label="课时信息" name="fifth">课时信息</el-tab-pane>
  </el-tabs>
</template>

<script>
  export default {
    data() {
      return {
        activeName: 'first'
      };
    },
    methods: {
      handleClick(tab, event) {
        console.log(tab, event);
      }
    }
  };
</script>

<style >
.el-tabs__active-bar{
  background-color: #c50202;
}
.el-tabs__item.is-active {
    color: #c50202;
}
.el-tabs__item:hover {
    color: #c50202;    
}
</style>
