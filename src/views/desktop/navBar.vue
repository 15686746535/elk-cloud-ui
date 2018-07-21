<template>
  <div id="navBar" class="ui-draggable">
    <s class="l">
      <div class="indicator indicator_header" :title="name">
        <img :src="avatar" class="indicator_header_img" :title="name"/>
      </div>
    </s>
    <span>
      <a href="javascript:void(0);" class="ui-droppable currTab" title="桌面1" id="switch-1" @click="desktopSwitch('1')">1</a>
      <a href="javascript:void(0);" class="ui-droppable" title="桌面2" id="switch-2" @click="desktopSwitch('2')">2</a>
    </span>
    <span v-show="isSerch" style="margin-left: -5px;margin-top: 6px!important;">
     <el-input size="mini" class="accurate"  v-model="accurate" placeholder="请输入内容"></el-input>
    </span>
    <s class="r">
      <a class="indicator indicator_manage" href="javascript:void(0);" title="搜索" @click="serch"></a>
    </s>

    <!--<div>-->
      <!--<el-input placeholder="请输入内容" v-model="input5" class="input-with-select">-->
        <!--<el-select v-model="select" slot="prepend" placeholder="请选择">-->
          <!--<el-option label="学员" value="1"></el-option>-->
        <!--</el-select>-->
        <!--<el-button slot="append" icon="el-icon-search"></el-button>-->
      <!--</el-input>-->
    <!--</div>-->
  </div>
</template>

<script>
import student from '@/views/search/student.vue'
import { mapGetters } from 'vuex'

export default {
  name: 'el-nav-bar',
  props: {
    list: Array,
    desktop: String
  },
  data() {
    return {
      isSerch: false,
      accurate: '',
      serchStudent: { id: -9999998, name: '学员搜索', content: student, icon: '../../../static/icon/app_stu_student.png' }
    }
  },
  computed: {
    ...mapGetters([
      'defaultList',
      'startList',
      'desktopOneList',
      'desktopTwoList',
      'desktopBg',
      'name',
      'avatar'
    ])
  },
  mounted() {
  },
  methods: {
    desktopSwitch(d) {
      this.$emit('desktopSwitch', d)
    },
    serch() {
      if (this.accurate) {
        this.serchStudent.params = { accurate: this.accurate }
        // 打开
        this.layerOpen(this.serchStudent)
        this.accurate = ''
      }
      this.isSerch = !this.isSerch
    },
    // 打开应用
    layerOpen(app) {
      this.$emit('open', app)
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
@import "src/styles/mixin.scss";

</style>
