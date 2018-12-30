<template>
  <div class="view-enrolment view-container">
    <el-row class="enrolment-header">
      <el-radio class="my-view"></el-radio>
      <label>个人招生详情 &nbsp;&nbsp;&nbsp;</label>
      <!--<el-select v-model="listQuery.campus" filterable remote clearable reserve-keyword placeholder="校区"-->
                 <!--style="margin-right: 5px;width: 200px;">-->
        <!--<el-option v-for="campus in campusList" :key="campus.id" :label="campus.name" :value="campus.id"></el-option>-->
      <!--</el-select>-->
      <!--<el-date-picker v-model="listQuery.year" type="year" placeholder="年份"-->
                      <!--style="margin-right: 5px;width: 200px;"></el-date-picker>-->
      <!--<el-button icon="el-icon-search" type="danger">确认搜索</el-button>-->
    </el-row>
    <el-row class="aaaa" style="height: 355px;color: #666;text-align: center;width: 100%;position: absolute;top: 50px;line-height: 355px;">
     开发中...
    </el-row>
  </div>
</template>

<script>
  /*
  *
  * 页面高度：420px
  * */
  import Echarts from '@/components/Echarts';
  import {queryAmountRate} from '@/api/visualization/api'
  import options from  '@/utils/options'
  export default {
    name: "view-individual-enrollment-details",
    components: {
      Echarts
    },
    props: {
      params: {
        type: Object,
        default: {}
      },
      width: {
        type: Number,
        default: 1200
      },
    },
    data() {
      return {
      };
    },
    created() {
      this.init();
    },
    methods: {
      getList(){
      },
      init() {
      },
    }
  };
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  /*主体白色*/
  $White: #fff;
  /*主体红色*/
  $Danger: #c50202;
  /*灰白色*/
  $DDD: #ddd;
  .view-enrolment {
    height: 460px;
  }
</style>
