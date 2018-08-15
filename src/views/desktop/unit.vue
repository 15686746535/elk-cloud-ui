<template>
  <div class="units">
    <div class="unit progress">
      <div class="unit_header">
        <el-tooltip class="item" effect="dark" content="插件设置" placement="top">
          <i class="el-icon-setting l" title=""></i>
        </el-tooltip>
        <el-tooltip class="item" effect="dark" content="删除插件" placement="top">
          <i class="el-icon-close r"></i>
        </el-tooltip>
      </div>
      <div class="unit_body">
        <div class="progress">
          <el-progress type="circle" :percentage="80" width="90" stroke-width="12" color="#67C23A" @focus="saveDesktop" ></el-progress>
        </div>
      </div>
    </div>
  </div>
</template>i

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'unit',
  components: {
  },
  data() {
    return {
      showDesktop: '1'
    }
  },
  watch: {
    desktopList: function(val) {
      // saveApps({ appList: val }).then(() => {
      //   console.log('桌面设置保存成功')
      // })
    }
  },
  computed: {
    ...mapGetters([
      'desktopList',
      'defaultList',
      'startList',
      'desktopOneList',
      'desktopTwoList',
      'desktopBg',
      'name',
      'avatar'
    ])
  },
  created() {
  },
  mounted() {
  },
  methods: {
    saveDesktop() {
      this.$message.error('5454545')
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
@import "src/styles/mixin.scss";
.app-wrapper {
  @include clearfix;
  position: relative;
  height: 100%;
  width: 100%;
}
.units{

  .unit{
    position: fixed;
    z-index: 25;
    &.progress{
      right: 70px;
      top: 90px;
    }

    .unit_header{
      display: none;
      position: absolute;
      width: 100px;
      height: 20px;
      background-color: #1616173b;
      border-radius: 5px 5px 0 0;
      padding: 2px 5px;
      top: -20px;
      color: #eee;
      i:hover{
        cursor: pointer;
        color: #fff;
      }
      .l{
        float: left;
      }
      .r{
        float: right;
      }
    }
    .unit_body{
      width: 100px;
      padding-left: 5px;
      border-radius: 0 0 5px 5px;
      position: relative;

      .progress{
        border-radius: 50%;
        background-color: #1616173b;
        height: 90px;
        width: 90px;
      }
    }
  }

  .unit:hover{
    .unit_header{
      display: inline;
    }
    .unit_body {
      background-color: #c1c1c580;
    }
  }

}

</style>
