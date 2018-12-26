<template>
  <div class="view-enrolment">
    <el-radio ></el-radio>
      招生人数
  </div>
</template>

<script>
  export default {
    name: 'view-enrolment',
    props: {
      params: Object
    },
    data (){
      return{

      }
    },
    methods: {

    }
  }
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  /*主体白色*/
  $White:#fff;
  /*主体红色*/
  $Danger:red;
  /*灰白色*/
  $DDD:#ddd;
  .view-enrolment {
    background: $White;

  }

</style>
