<template>
  <div id="navBar" class="ui-draggable">
    <s class="l">
      <div class="indicator indicator_header" :title="name">
        <img :src="avatar" class="indicator_header_img" :title="name"/>
      </div>
    </s>
    <span>
        <a href="javascript:void(0);" class="ui-droppable currTab" title="桌面1" @click="desktopSwitch($event,'1')">1</a>
        <a href="javascript:void(0);" class="ui-droppable" title="桌面2" @click="desktopSwitch($event,'2')">2</a>
      </span>
    <s class="r">
      <a class="indicator indicator_manage" href="javascript:void(0);" title="" @click="layerOpen(defect)"></a>
    </s>
  </div>
</template>

<script>
import defect from '@/views/404.vue'
import { mapGetters } from 'vuex'

export default {
  name: 'el-nav-bar',
  model: {
    prop: 'value',
    event: 'change'
  },
  props: {
    list: Array,
    desktop: String
  },
  data() {
    return {
      defect: { id: -9999999, name: '没找到', content: defect, icon: '../../../static/icon/defect.png' }
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
    desktopSwitch(e, d) {
      var currTab = document.getElementsByClassName('currTab')
      for (var i = 0; i < currTab.length; i++) {
        currTab[i].classList.remove('currTab')
      }
      e.currentTarget.classList.add('currTab')
      if (d === '1') {
        document.getElementById('desktop-2').classList.add('hide')
        document.getElementById('desktop-1').classList.remove('hide')
      } else {
        document.getElementById('desktop-1').classList.add('hide')
        document.getElementById('desktop-2').classList.remove('hide')
      }
      this.$emit('change', d)
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
.app-wrapper {
  @include clearfix;
  position: relative;
  height: 100%;
  width: 100%;
}
</style>
