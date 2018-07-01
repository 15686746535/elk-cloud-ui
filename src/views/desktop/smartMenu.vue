<template>
  <div id="smartMenu_body"  class="smart_menu_box">
    <div class="smart_menu_body">
      <ul class="smart_menu_ul">
        <li class="smart_menu_li" v-show="appIndex"><a class="smart_menu_a" @click="mouseOpen">打开应用</a></li>
        <!-- 分割线 -->
        <li class="smart_menu_li_separate" v-show="appIndex && appIndex > -1"></li>
        <!-- 应用移动桌面 -->
        <li class="smart_menu_li" v-show="appIndex && appIndex > -1" :class="isHover" @mouseenter="isHover = 'smart_menu_li_hover'" @mouseout="isHover = ''">
          <div id="smartMenu_body_1" class="smart_menu_box" @mouseenter="isHover = 'smart_menu_li_hover'" >
            <div class="smart_menu_body"  @mouseenter="isHover = 'smart_menu_li_hover'">
              <ul class="smart_menu_ul"   @mouseenter="isHover = 'smart_menu_li_hover'">
                <li class="smart_menu_li" @mouseenter="isHover = 'smart_menu_li_hover'">
                  <a class="smart_menu_a" @mouseenter="isHover = 'smart_menu_li_hover'" @click="moveDesktop('1')">桌面1</a>
                </li>
                <li class="smart_menu_li" @mouseenter="isHover = 'smart_menu_li_hover'">
                  <a class="smart_menu_a" @mouseenter="isHover = 'smart_menu_li_hover'" @click="moveDesktop('2')">桌面2</a>
                </li>
              </ul>
            </div>
          </div>
          <a class="smart_menu_a"  @mouseenter="isHover = 'smart_menu_li_hover'">
            <i class="smart_menu_triangle" @mouseenter="isHover = 'smart_menu_li_hover'"></i>
            移动应用到
          </a>
        </li>
        <li class="smart_menu_li" v-show="appIndex && appIndex > -1"><a class="smart_menu_a" @click="removeApp">移除应用</a></li>
        <li class="smart_menu_li" v-show="!appIndex"><a class="smart_menu_a" @click="showHome">显示桌面</a></li>
        <li class="smart_menu_li_separate" v-show="!appIndex"></li>
        <li class="smart_menu_li" v-show="!appIndex"><a class="smart_menu_a" @click="resetHome">刷新桌面</a></li>
        <!--<li class="smart_menu_li" v-show="!appIndex"><a class="smart_menu_a" >桌面设置</a></li>-->
        <li class="smart_menu_li" v-show="!appIndex"><a class="smart_menu_a" @click="layerOpen(theme)">主题设置</a></li>
        <li class="smart_menu_li" v-show="!appIndex"><a class="smart_menu_a" @click="resetHome">重新加载</a></li>
        <li class="smart_menu_li_separate" v-show="!appIndex"></li>
        <li class="smart_menu_li" v-show="!appIndex"><a class="smart_menu_a" @click="logout">退出系统</a></li>
      </ul>
    </div>
  </div>
</template>

<script>
import defect from '@/views/defect'
import theme from '@/views/theme'
import { mapGetters } from 'vuex'

export default {
  name: 'el-nav-bar',
  props: {
    desktop: String
  },
  data() {
    return {
      theme: { id: -9999999, name: '没找到', content: theme, icon: '../../../static/icon/defect.png' },
      add: { id: -1087, name: '添加', content: defect, icon: '../../../static/icon/add_icon.png' },
      appIndex: '',
      isHover: ''
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
  watch: {
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
    // 鼠标右键移除应用
    removeApp() {
      if (this.desktop === '1') {
        this.desktopOneList.splice(this.appIndex, 1)
      } else {
        this.desktopTwoList.splice(this.appIndex, 1)
      }
      // 这里需要传回后台保存
    },
    // 鼠标右键移动应用
    moveDesktop(d) {
      if (this.desktop === '1') {
        this.desktopOneList[this.appIndex].desktop = d
      } else {
        this.desktopTwoList[this.appIndex].desktop = d
      }
      this.$store.dispatch('SetDesktopApp', this.desktopOneList.concat(this.desktopTwoList))
      console.log(d)
      console.log(this.desktopOneList)
      // 这里需要传回后台保存
    },
    // 打开应用
    layerOpen(app) {
      this.$emit('open', app)
    },
    mouseOpen() {
      if (this.desktop === '1') {
        if (this.appIndex > -1) {
          this.layerOpen(this.desktopOneList[this.appIndex])
        } else {
          this.layerOpen(this.add)
        }
      } else {
        if (this.appIndex > -1) {
          this.layerOpen(this.desktopOneList[this.appIndex])
        } else {
          this.layerOpen(this.add)
        }
      }
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
</style>
