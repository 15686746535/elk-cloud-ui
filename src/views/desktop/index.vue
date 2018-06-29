<template>
  <div class="app-container calendar-list-container" :style="{height: $store.state.app.client.height + 'px'}" @click="desktopClick">
    <div :style="{height: ($store.state.app.client.height - 100) + 'px',width: ($store.state.app.client.width - 300) + 'px'}" style="position: relative;top: 30px;left: 88px;">
        <div class="innerDesktop ui-droppable">
          <div class="desktopIcon ui-draggable ui-droppable" v-for="(app,index) in appList" @click="layerOpen(app)"  :app="index" :title="app.name" :style="appStyle(index)" style="position: absolute;margin: 0px;">
            <span class="icon" :app="index" >
              <div class="txInfo" :app="index"  v-if="app.msgCount > 0">{{app.msgCount}}</div>
              <img :src="app.icon"  :app="index"/>
            </span>
            <div class="text" :app="index"><span :app="index">{{app.name}}</span><s></s></div>
          </div>
        </div>
    </div>
    <!--任务栏-->
    <div class="vl-notify-task" ></div>
    <!--鼠标右键菜单-->
    <div id="smartMenu_body"  class="smart_menu_box">
      <div class="smart_menu_body">
        <ul class="smart_menu_ul">
          <li class="smart_menu_li" v-show="appIndex"><a class="smart_menu_a" @click="mouseOpen">打开应用</a></li>
          <!-- 分割线 -->
          <li class="smart_menu_li_separate" v-show="appIndex && appIndex < appList.length-1"></li>
          <!-- 应用移动桌面 -->
          <li class="smart_menu_li" v-show="appIndex && appIndex < appList.length-1" :class="isHover" @mouseenter="isHover = 'smart_menu_li_hover'" @mouseout="isHover = ''">
            <div id="smartMenu_body_1" class="smart_menu_box" @mouseenter="isHover = 'smart_menu_li_hover'" >
              <div class="smart_menu_body"  @mouseenter="isHover = 'smart_menu_li_hover'">
                <ul class="smart_menu_ul"   @mouseenter="isHover = 'smart_menu_li_hover'">
                  <li class="smart_menu_li" @mouseenter="isHover = 'smart_menu_li_hover'">
                    <a class="smart_menu_a" @mouseenter="isHover = 'smart_menu_li_hover'">桌面1</a>
                  </li>
                  <li class="smart_menu_li" @mouseenter="isHover = 'smart_menu_li_hover'">
                    <a class="smart_menu_a" @mouseenter="isHover = 'smart_menu_li_hover'">桌面2</a>
                  </li>
                </ul>
              </div>
            </div>
            <a class="smart_menu_a"  @mouseenter="isHover = 'smart_menu_li_hover'">
              <i class="smart_menu_triangle" @mouseenter="isHover = 'smart_menu_li_hover'"></i>
              移动应用到
            </a>
          </li>
          <li class="smart_menu_li" v-show="appIndex && appIndex < appList.length-1"><a class="smart_menu_a" @click="removeApp">移除应用</a></li>
          <li class="smart_menu_li" v-show="!appIndex"><a class="smart_menu_a" @click="showHome">显示桌面</a></li>
          <li class="smart_menu_li_separate" v-show="!appIndex"></li>
          <li class="smart_menu_li" v-show="!appIndex"><a class="smart_menu_a" @click="resetHome">刷新桌面</a></li>
          <!--<li class="smart_menu_li" v-show="!appIndex"><a class="smart_menu_a" >桌面设置</a></li>-->
          <li class="smart_menu_li" v-show="!appIndex"><a class="smart_menu_a">主题设置</a></li>
          <li class="smart_menu_li" v-show="!appIndex"><a class="smart_menu_a" @click="resetHome">重新加载</a></li>
          <li class="smart_menu_li_separate" v-show="!appIndex"></li>
          <li class="smart_menu_li" v-show="!appIndex"><a class="smart_menu_a" @click="logout">退出系统</a></li>
        </ul>
      </div>
    </div>
    <!-- 主页导航栏 -->
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
            <a title="开始" id="start_btn" @click="startShow = !startShow"></a>
            <div id="start_item" v-show="startShow">
              <ul class="item admin">
                <li>
                  <img :src="avatar" class="adminImg" />
                  {{name}}
                </li>
              </ul>
              <ul class="item item_ul">
                <li v-for="menu in startList" :id="'item0menu_'+ menu.id" @click="layerOpen(menu)" @mouseenter="childItemTop($event,menu)">
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
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'layout',
  data() {
    return {
      startShow: false,
      appIndex: null,
      isHover: ''
    }
  },
  computed: {
    ...mapGetters([
      'defaultList',
      'startList',
      'appList',
      'name',
      'avatar'
    ])
  },
  mounted() {
    var that = this
    document.oncontextmenu = function(ev) {
      var oEvent = ev || even
      var oUl = document.getElementById('smartMenu_body')
      that.appIndex = oEvent.toElement.getAttribute('app')
      // 一定要加px，要不然chrom不认
      oUl.style.top = oEvent.clientY + 'px'
      oUl.style.left = oEvent.clientX + 'px'
      oUl.style.display = 'block'
      return false
    }
  },
  methods: {
    // 桌面点击事件
    desktopClick(e) {
      this.startShow = e.target.id === 'start_btn'
      document.getElementById('smartMenu_body').style.display = 'none'
    },
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
    childItemTop(e, menu) {
      if (menu.childItem && menu.childItem.length > 0) {
        // 距离底边可显示区域的高
        var h = this.$store.state.app.client.height - e.clientY - 40
        console.log(h)
        console.log(e)
        // h高度可显示几个
        var num = parseInt(h / 36)
        // 总个数
        var count = menu.childItem.length
        // 需要偏移的个数
        var offsetCount = count - num
        if (offsetCount > 0) {
          var ul = document.getElementById('item0menu_ul_' + menu.id)
          console.log(ul)
          console.log(offsetCount)
          console.log(-36 * offsetCount)
          ul.style.top = -36 * offsetCount
        }
      }
    },
    removeApp() {
      this.appList.splice(this.appIndex, 1)
      // 这里需要传回后台保存
    },
    mouseOpen() {
      this.layerOpen(this.appList[this.appIndex])
    },
    resetHome() {
      location.reload()
    },
    showHome() {
      var a = document.getElementsByClassName('selected')
      for (var i = 0; i < a.length; i++) {
        a[i].classList.remove('selected')
      }
      var iframe = document.getElementsByClassName('vl-notify')
      for (var n = 0; n < iframe.length; n++) {
        iframe[n].style.display = 'none'
      }
    },
    // 打开应用
    layerOpen(app) {
      if (app.content) {
        this.$layer.open({
          type: 2,
          id: app.id, // title
          title: app.name, // title
          area: ['1024px', '600px'], // 默认 宽 高
          shadeClose: false, // 点击遮罩关闭
          tabIcon: app.icon, // 应用图标 任务栏显示
          shade: false, // 遮罩 默认不显示
          content: {
            content: app.content,
            parent: this, // 当前的vue对象
            data: app.params || []// props
          }
        })
      }
    },
    logout() {
      this.$store.dispatch('LogOut').then(() => {
        location.reload() // 为了重新实例化vue-router对象 避免bug
      })
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
