<template>
  <div class="app-desktop calendar-list-desktop ba-colour"
       :style="{height: $store.state.app.client.height + 'px',background: 'url('+desktopBg+') center center / cover no-repeat'}"
       @click="desktopClick">
    <!--桌面1-->
    <el-apps  :list="desktopOneList"  desktop="1" @open="layerOpen" @saveDesktop="saveDesktop" @desktopSwitch="desktopSwitch" @openMenu="openMenu"></el-apps>
    <!--桌面2-->
    <el-apps  :list="desktopTwoList" desktop="2" @open="layerOpen"  @saveDesktop="saveDesktop" @desktopSwitch="desktopSwitch" @openMenu="openMenu"></el-apps>
    <!--任务栏-->
    <div class="vl-notify-task" ></div>
    <!--鼠标右键菜单-->
    <el-smart-menu :currentList="showDesktop==='1'?desktopOneList:desktopTwoList" @open="layerOpen" @saveDesktop="saveDesktop"></el-smart-menu>
    <!-- 主页导航栏 -->
    <el-start-bar @open="layerOpen"></el-start-bar>
    <!-- 桌面切换 -->
    <el-nav-bar @desktopSwitch="desktopSwitch" @open="layerOpen"></el-nav-bar>
    <!--悬浮工作台 -->
    <el-tool-intention @open="layerOpen"></el-tool-intention>
    <!--仪表盘-->
    <el-dashboard @open="layerOpen"></el-dashboard>
    <!--机器人-->
    <el-rtarded></el-rtarded>
  </div>
</template>

<script>
  import { mapGetters } from 'vuex'
  import ElApps from './apps.vue'
  import ElNavBar from './navBar.vue'
  import ElSmartMenu from './smartMenu.vue'
  import ElStartBar from './startBar.vue'
  import ElToolIntention from './ToolIntention.vue'
  import ElUnit from './unit.vue'
  import ElDashboard from './dashboard.vue'
  import ElRtarded from './rtarded.vue'
  import { saveApps } from '@/api/desktop'
  const _import = require('@/router/_import_development')

  export default {
    name: 'layout',
    components: {
      ElApps,
      ElSmartMenu,
      ElStartBar,
      ElToolIntention,
      ElUnit,
      ElRtarded,
      ElDashboard,
      ElNavBar
    },
    data() {
      return {
        password: { id: 10001, name: '密码修改', content: _import('modules/upms/changepassword') },
        wechat: { id: 10002, name: '微信绑定', content: _import('modules/upms/wechat') },
        showDesktop: '1'
      }
    },
    watch: {
      desktopList: function(val) {
        // if (val.length === 44) {
        //   Message.success('ok-' + val.length)
        // } else {
        //   Message.error('no-' + val.length)
        // }
        saveApps({ appList: val }).then(() => {
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
      var initial = this.$store.state.user.initial
      if (initial && !initial.wechat) {
        // this.layerOpenMax(this.wechat)
      }
      if (initial && initial.password) {
        this.layerOpenMax(this.password)
      }
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
      openMenu(ev) {
        var oEvent = ev || even
        var oUl = document.getElementById('smartMenu_body')
        // 一定要加px，要不然chrom不认
        oUl.style.top = oEvent.clientY + 'px'
        oUl.style.left = oEvent.clientX + 'px'
        oUl.style.display = 'block'
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
      layerOpenMax(app) {
        console.log(app)
        if (app.content) {
          this.$layer.open({
            type: 2,
            id: app.id, // title
            title: app.name, // title
            shadeClose: false, // 点击遮罩关闭
            isMax: true, // 最大显示
            maxmin: false, // 允许最大最小
            closeBtn: false, // 显示关闭按钮
            prohibit: this.$store.state.app.prohibit,
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
      // 打开应用
      layerOpen(app) {
        if (app.content) {
          this.$layer.open({
            type: 2,
            id: app.id, // title
            title: app.name, // title
            shadeClose: false, // 点击遮罩关闭
            maxmin: true, // 允许最大最小
            closeBtn: true, // 显示关闭按钮
            prohibit: this.$store.state.app.prohibit,
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
