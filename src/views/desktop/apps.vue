<template>
  <div>
    <transition :name="'move_'+desktop"  >
      <div style="width: 100%;position: absolute;left:0;" class="apps" :class="desktop==='1'?'desktop-'+ desktop :'hide desktop-'+ desktop" :id="'desktop-'+desktop">
        <div :id="'desktop-startDrag-'+desktop"  style="position: absolute;z-index: 20;width: 100%;left:0;"  @contextmenu="openMenu($event,1,null)"
             :style="{height: ($store.state.app.client.height - 100) + 'px'}">
        </div>
        <div class="innerDesktop ui-droppable" :style="{height: ($store.state.app.client.height - 100) + 'px',width: ($store.state.app.client.width - 300) + 'px'}"
             style="position: relative;top: 30px;left: 88px;">
          <div class="desktopIcon ui-draggable ui-droppable" v-for="(app,index) in list" v-dragging="{ item: app, list: list, group: 'desktop_' + desktop }"  @click="layerOpen(app)"
               :app="index" :title="app.name"  :style="appStyle(index)"  @contextmenu="openMenu($event,2,index)" style="position: absolute;margin: 0px;z-index: 21;">
            <span class="icon" :app="index" >
              <div class="txInfo" :app="index"  v-if="app.msgCount > 0">{{app.msgCount}}</div>
              <img :src="app.icon"  :app="index"/>
            </span>
            <div class="text" :app="index"><span :app="index">{{app.name}}</span><s></s></div>
          </div>
          <!-- 添加按钮 -->
          <div class="desktopIcon ui-draggable ui-droppable" @click="layerOpen(add)" :app="-1" title="添加"  @contextmenu="openMenu($event,3, -1)"  :style="setAddOffset" style="position: absolute;margin: 0px;z-index: 21;">
            <span class="icon" :app="-1" ><img src="../../../static/icon/add_icon.png"  :app="-1"/></span>
            <div class="text" :app="-1"><span :app="-1">添加</span><s></s></div>
          </div>
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
const _import = require('@/router/_import_development')
import { startDrag } from '@/utils/ragstart'

export default {
  name: 'el-apps',
  props: {
    list: Array,
    desktop: String
  },
  data() {
    return {
      add: { id: 'app-add', name: '添加', params: { desktop: this.desktop }, content: _import('add/index'), icon: '../../../static/icon/add_icon.png' }
    }
  },
  computed: {
    setAddOffset() {
      var len = this.list.length
      var h = this.$store.state.app.client.height - 160
      var count = parseInt(h / 113)
      var column = parseInt(len / count)
      var row = len % count
      var top = row * 123 + 'px'
      var left = column * 131 + 'px'
      if (count === row) {
        top = '0px'
        left = (column + 1) * 131 + 'px'
      }
      return {
        top: top,
        left: left
      }
    }
  },
  mounted() {
    // 注册鼠标滑动切换桌面
    var that = this
    startDrag(this.desktop, function(d) {
      that.desktopSwitch(d)
    })
    this.$dragging.$on('dragged', ({ value }) => {
    })
    this.$dragging.$on('dragend', () => {
      // 保存应用菜单
      this.$emit('saveDesktop', true)
    })
  },
  methods: {
    // 应用坐标
    appStyle(i) {
      var h = this.$store.state.app.client.height - 160
      // 屏幕高度除以应用高度 取整表示一列可以显示多少个
      var count = parseInt(h / 113)
      // 当前索引 除以每列个数 取整 表示第几列
      var column = parseInt(i / count)
      // 当前索引 取模 为当前列第几个
      var row = i % count
      return {
        top: row * 123 + 'px',
        left: column * 131 + 'px'
      }
    },
    openMenu(ev, index, appid) {
      this.$store.dispatch('setSmartMenu', index)
      this.$store.dispatch('setAppIndex', appid)
      this.$emit('openMenu', ev)
    },
    // 移动桌面
    desktopSwitch(desktop) {
      this.$emit('desktopSwitch', desktop)
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
