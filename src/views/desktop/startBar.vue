<template>
  <div id="leftBar" style="display: block;z-index: 45;">
    <div id="dockContainer" class="dock_container dock_pos_left">
      <div class="dock_middle">
        <div id="default_app" class="ui-droppable">
          <div class="desktopIcon ui-draggable ui-droppable" v-for="app in defaultList" @click="layerOpen(app)" :id="'menu_'+ app.id" :title="app.name">
              <span class="icon">
                 <div class="txInfo" v-if="app.msgCount > 0">{{app.msgCount}}</div>
                <img :src="app.icon"/>
              </span>
            <div class="text"><span>{{app.name}}</span><s></s></div>
          </div>
        </div>
        <div class="default_tools"></div>
        <div class="default_tools"></div>
        <div id="start_block">
          <a title="开始" id="start_btn"></a>
          <div id="start_item">
            <ul class="item admin">
              <li>
                <img :src="avatar" class="adminImg" />
                {{name}}
              </li>
            </ul>
            <ul class="item item_ul">
              <li v-for="menu in startList" :id="'item0menu_'+ menu.id">
                <span><img :src="menu.icon"/>{{menu.name}}</span>
                <b v-if="menu.childItem && menu.childItem.length > 0"></b>
                <ul v-if="menu.childItem && menu.childItem.length > 0" class="item childItem item_ul" :id="'item0menu_ul_'+ menu.id">
                  <li class="dragitem ui-draggable"  v-for="app in menu.childItem" @click="layerOpen(app)">
                    <span><img :src="app.icon"/>{{app.name}}</span>
                  </li>
                </ul>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>

  </div>
</template>

<script>
import defect from '@/views/404.vue'
import { mapGetters } from 'vuex'

export default {
  name: 'el-start-bar',
  props: {
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
    // 打开应用
    layerOpen(app) {
      this.$emit('open', app || this.defect)
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
@import "src/styles/mixin.scss";
</style>
