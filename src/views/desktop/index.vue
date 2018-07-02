<template>
  <div class="app-container calendar-list-container ba-colour" :class="'desktop-bg-'+desktopBg" :style="{height: $store.state.app.client.height + 'px'}" @click="desktopClick" >
    <!--桌面1-->
    <el-apps  :list="desktopOneList"  desktop="1" @open="layerOpen" @saveDesktop="saveDesktop" @desktopSwitch="desktopSwitch"></el-apps>
    <!--桌面2-->
    <el-apps  :list="desktopTwoList" desktop="2" @open="layerOpen"  @saveDesktop="saveDesktop" @desktopSwitch="desktopSwitch"></el-apps>
    <!--任务栏-->
    <div class="vl-notify-task" ></div>
    <!--鼠标右键菜单-->
    <el-smart-menu :currentList="showDesktop==='1'?desktopOneList:desktopTwoList"
                   @open="layerOpen" @saveDesktop="saveDesktop"></el-smart-menu>
    <!-- 主页导航栏 -->
    <el-start-bar @open="layerOpen"></el-start-bar>
    <!-- 桌面切换 -->
    <el-nav-bar @desktopSwitch="desktopSwitch" @open="layerOpen"></el-nav-bar>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import ElApps from './apps.vue'
import ElNavBar from './navBar.vue'
import ElSmartMenu from './smartMenu.vue'
import ElStartBar from './startBar.vue'
import { saveApps } from '@/api/desktop'
import { Message } from 'element-ui'

export default {
  name: 'layout',
  components: {
    ElApps,
    ElSmartMenu,
    ElStartBar,
    ElNavBar
  },
  data() {
    return {
      showDesktop: '1'
    }
  },
  watch: {
    desktopList: function(val) {
      // if (val.length === 45) {
      //   Message.success('ok-' + val.length)
      // } else {
      //   Message.error('no-' + val.length)
      //   console.log(val)
      // }
      console.log('桌面设置已经修改', val.length)
      saveApps({ appList: val }).then(() => {
        console.log('桌面设置已经保存')
      })
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
      var list = this.desktopOneList.concat(this.desktopTwoList)
      this.$store.dispatch('SetDesktopApp', list)
    },
    // 桌面点击事件
    desktopClick(e) {
      // 监听点击开始按钮 打开、关闭开始菜单
      document.getElementById('start_item').style.display = e.target.id === 'start_btn' ? 'block' : 'none'
      // 关闭鼠标右键菜单
      document.getElementById('smartMenu_body').style.display = 'none'
    },
    // 移动桌面
    desktopSwitch(desktop) {
      var currTab = document.getElementsByClassName('currTab')
      for (var i = 0; i < currTab.length; i++) {
        currTab[i].classList.remove('currTab')
      }
      this.showDesktop = desktop
      if (desktop === '1') {
        document.getElementById('desktop-1').classList.remove('hide')
        document.getElementById('desktop-2').classList.add('hide')
        document.getElementById('switch-1').classList.add('currTab')
      } else {
        document.getElementById('desktop-2').classList.remove('hide')
        document.getElementById('desktop-1').classList.add('hide')
        document.getElementById('switch-2').classList.add('currTab')
      }
    },
    // 打开应用
    layerOpen(app) {
      console.log(app)
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
      } else if (app.params[0] === 'out') {
        this.logout()
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
