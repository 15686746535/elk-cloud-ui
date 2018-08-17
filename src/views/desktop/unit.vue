<template>
  <div class="units">
    <div class="unit progress">
      <div class="unit_header">
        <div class="title">{{progress.target}}</div>
        <el-tooltip class="item" effect="dark" content="删除插件" placement="top">
          <i class="el-icon-close close"></i>
        </el-tooltip>
      </div>
      <div class="unit_body">
        <div class="progress">
          <el-progress type="circle" :percentage="percentage" :width="90" :stroke-width="12" title="本周计划招生完成率" color="#67C23A" @focus="saveDesktop" ></el-progress>
        </div>
      </div>
      <div class="unit_footer">
        <div v-if="progress.plan >= 0" class="one">目标：
          <span v-if="!edit" @dblclick="updatePlan">{{progress.plan}}人</span>
          <input v-if="edit" v-model="plan"  style="width: 40px;height: 11px;border: none;" />
          <i v-if="edit" style="cursor: pointer" class="el-icon-success" @click="savePlan"></i>
        </div>
        <div class="one" v-else >目标：
          <a href="#" v-if="!edit" style="text-decoration: underline;" @dblclick="updatePlan">未设置</a>
          <input v-if="edit" v-model="plan"  style="width: 40px;height: 11px;border: none;" />
          <i v-if="edit" style="cursor: pointer" class="el-icon-success" @click="savePlan"></i>
        </div>
        <div class="two">完成：
          {{progress.complete}}人</div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { getPlan, savePlan } from '@/api/upms/user'

export default {
  name: 'unit',
  components: {
  },
  data() {
    return {
      edit: false,
      plan: null,
      progress: {
        complete: 0,
        plan: null,
        target: ''
      }
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
    percentage() {
      this.plan = this.progress.plan
      var plan = this.progress.plan
      var complete = this.progress.complete
      console.log(plan)
      console.log(complete)
      if (!plan || isNaN(plan)) return 0
      if (!complete || isNaN(complete)) complete = 0
      return Math.round(complete / plan * 100)
    },
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
    this.getPlan()
  },
  mounted() {
  },
  methods: {
    getPlan() {
      getPlan().then(response => {
        if (response.data.code === 0) {
          this.progress = response.data.data
        }
      })
    },
    updatePlan() {
      this.edit = true
    },
    savePlan() {
      if (this.plan) {
        // this.progress.plan = this.plan
        savePlan(this.plan).then(response => {
          this.getPlan()
        })
      }
      this.edit = false
    },
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
      position: absolute;
      width: 100px;
      height: 20px;
      background-color: #1616173b;
      border-radius: 5px 5px 0 0;
      padding: 0 5px;
      top: -20px;
      color: #eee;
      i:hover{
        cursor: pointer;
        color: #fff;
      }
      .title{
        float: left;
        font-size: 12px;
        line-height: 20px;
      }
      .close{
        display: none;
        position: absolute;
        right: 0;
        top: 2px;
        z-index: 66;
      }
    }
    .unit_body{
      width: 100px;
      padding-left: 5px;
      padding-right: 5px;
      position: relative;
      background-color: #c1c1c580;

      .progress{
        border-radius: 50%;
        background-color: #1616173b;
        height: 90px;
        width: 90px;
      }
    }
    .unit_footer{
      background-color: #c1c1c580;
      font-size: 12px;
      color: #fff;
      padding-top: 2px;
      border-radius: 0 0 5px 5px;

      div{
        background-color: rgba(251, 251, 255, 0);
        color: #2196F3;
        width: 100%;
        border-radius: 10px;
        padding: 2px 0 2px 2px;
        &.one{

        }
        &.two{
          margin-top: 2px;
        }
      }

    }
  }

  .unit:hover{
    .unit_header{
      .close{
        display: inline;
      }
    }
  }

}

</style>
