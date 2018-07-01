<template>
  <div class="app-container calendar-list-container ba-colour" :class="'desktop-bg-'+desktopBg" :style="{height: $store.state.app.client.height + 'px'}" @click="desktopClick" >
    <!--<div>-->
      <!--&lt;!&ndash;<div class="innerDesktop ui-droppable" :style="{height: ($store.state.app.client.height - 100) + 'px',width: ($store.state.app.client.width - 300) + 'px'}"&ndash;&gt;-->
           <!--&lt;!&ndash;style="position: relative;top: 30px;left: 88px;" v-if="showDesktop==='1'">&ndash;&gt;-->
        <!--&lt;!&ndash;<div class="desktopIcon ui-draggable ui-droppable" v-for="(app,index) in desktopOneList" v-dragging="{ item: app, list: desktopOneList, group: 'desktopOne' }" @click="layerOpen(app)"  :app="index" :title="app.name" :style="appStyle(index)" style="position: absolute;margin: 0px;">&ndash;&gt;-->
          <!--&lt;!&ndash;<span class="icon" :app="index" >&ndash;&gt;-->
            <!--&lt;!&ndash;<div class="txInfo" :app="index"  v-if="app.msgCount > 0">{{app.msgCount}}</div>&ndash;&gt;-->
            <!--&lt;!&ndash;<img v-if="" :src="app.icon"  :app="index"/>&ndash;&gt;-->
          <!--&lt;!&ndash;</span>&ndash;&gt;-->
          <!--&lt;!&ndash;<div class="text" :app="index"><span :app="index">{{app.name}}</span><s></s></div>&ndash;&gt;-->
        <!--&lt;!&ndash;</div>&ndash;&gt;-->
        <!--&lt;!&ndash;&lt;!&ndash; 添加按钮 &ndash;&gt;&ndash;&gt;-->
        <!--&lt;!&ndash;<div class="desktopIcon ui-draggable ui-droppable" @click="layerOpen(add)"  :app="-1" title="添加" :style="setAddOffset('1')" style="position: absolute;margin: 0px;">&ndash;&gt;-->
          <!--&lt;!&ndash;<span class="icon" :app="-1" ><img src="../../../static/icon/add_icon.png"  :app="-1"/></span>&ndash;&gt;-->
          <!--&lt;!&ndash;<div class="text" :app="-1"><span :app="-1">添加</span><s></s></div>&ndash;&gt;-->
        <!--&lt;!&ndash;</div>&ndash;&gt;-->
      <!--&lt;!&ndash;</div>&ndash;&gt;-->
      <!--&lt;!&ndash;<div class="innerDesktop ui-droppable" :style="{height: ($store.state.app.client.height - 100) + 'px',width: ($store.state.app.client.width - 300) + 'px'}"&ndash;&gt;-->
           <!--&lt;!&ndash;style="position: relative;top: 30px;left: 88px;" v-else>&ndash;&gt;-->
        <!--&lt;!&ndash;<div class="desktopIcon ui-draggable ui-droppable" v-for="(app2,index) in desktopTwoList"  v-dragging="{ item: app2, list: desktopTwoList, group: 'desktopTwo' }"&ndash;&gt;-->
             <!--&lt;!&ndash;@click="layerOpen(app2)"  :app="index" :title="app2.name" :style="appStyle(index)" style="position: absolute;margin: 0px;">&ndash;&gt;-->
          <!--&lt;!&ndash;<span class="icon" :app="index" >&ndash;&gt;-->
            <!--&lt;!&ndash;<div class="txInfo" :app="index"  v-if="app2.msgCount > 0">{{app.msgCount}}</div>&ndash;&gt;-->
            <!--&lt;!&ndash;<img :src="app2.icon"  :app="index"/>&ndash;&gt;-->
          <!--&lt;!&ndash;</span>&ndash;&gt;-->
          <!--&lt;!&ndash;<div class="text" :app="index"><span :app="index">{{app2.name}}</span><s></s></div>&ndash;&gt;-->
        <!--&lt;!&ndash;</div>&ndash;&gt;-->
        <!--&lt;!&ndash;&lt;!&ndash; 添加按钮 &ndash;&gt;&ndash;&gt;-->
        <!--&lt;!&ndash;<div class="desktopIcon ui-draggable ui-droppable" @click="layerOpen(add)"  :app="-1" title="添加" :style="setAddOffset('2')" style="position: absolute;margin: 0px;">&ndash;&gt;-->
          <!--&lt;!&ndash;<span class="icon" :app="-1" ><img src="../../../static/icon/add_icon.png"  :app="-1"/></span>&ndash;&gt;-->
          <!--&lt;!&ndash;<div class="text" :app="-1"><span :app="-1">添加</span><s></s></div>&ndash;&gt;-->
        <!--&lt;!&ndash;</div>&ndash;&gt;-->
      <!--&lt;!&ndash;</div>&ndash;&gt;-->

      <!--&lt;!&ndash;<transition :name="'move_'+ showDesktop" class="aaaaaaaaaaaaaaaaaaaaa">&ndash;&gt;-->
        <!--&lt;!&ndash;<div  v-if="showDesktop === '2'">&ndash;&gt;-->

          <!--&lt;!&ndash;<el-apps  :list="desktopTwoList" :desktop="showDesktop" @open="layerOpen"></el-apps>&ndash;&gt;-->
        <!--&lt;!&ndash;</div>&ndash;&gt;-->
      <!--&lt;!&ndash;</transition>&ndash;&gt;-->
    <!--</div>-->
    <transition :name="'move_1'"  >
      <el-apps  :list="desktopOneList" class="apps desktop-1" id="desktop-1" desktop="1" @open="layerOpen"></el-apps>
    </transition>
    <transition :name="'move_2'"  >
      <el-apps  :list="desktopTwoList" class="apps desktop-2 hide" id="desktop-2" desktop="2" @open="layerOpen"></el-apps>
    </transition>
    <!--任务栏-->
    <div class="vl-notify-task" ></div>
    <!--鼠标右键菜单-->
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
                <li v-for="menu in startList" :id="'item0menu_'+ menu.id" @click="layerOpen(menu)">
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
    <!-- 桌面切换 -->
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
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import defect from '@/views/defect'
import theme from '@/views/theme'
import ElApps from './apps.vue'

export default {
  name: 'layout',
  components: {
    ElApps
  },
  data() {
    return {
      showDesktop: '1',
      startShow: false,
      appIndex: null,
      add: { id: -1087, name: '添加', content: defect, icon: '../../../static/icon/add_icon.png' },
      defect: { id: -9999999, name: '没找到', content: defect, icon: '../../../static/icon/defect.png' },
      theme: { id: -88888, name: '主题设置', content: theme, icon: '../../../static/icon/defect.png' },
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
  mounted() {
    var that = this
    this.$dragging.$on('dragged', ({ value }) => {
      console.log(value.item)
      console.log(value.list)
      console.log(value.otherData)
    })
    this.$dragging.$on('dragend', () => {

    })
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
    setAddOffset(isone) {
      var len = isone === '1' ? this.desktopOneList.length : this.desktopTwoList.length
      var h = this.$store.state.app.client.height - 160
      var count = parseInt(h / 113)
      var column = parseInt(len / count)
      var row = len % count
      var top = row * 123 + 'px'
      var left = column * 131 + 'px'
      if (count === column) {
        top = '0px'
        left = (column + 1) * 131 + 'px'
      }
      return {
        top: top,
        left: left
      }
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
    moveDesktop(d) {
      if (this.showDesktop === '1') {
        this.desktopOneList[this.appIndex].desktop = d
      } else {
        this.desktopTwoList[this.appIndex].desktop = d
      }
      this.$store.dispatch('SetDesktopApp', this.desktopOneList.concat(this.desktopTwoList))
      console.log(d)
      console.log(this.desktopOneList)
      // 这里需要传回后台保存
    },
    removeApp() {
      if (this.showDesktop === '1') {
        this.desktopOneList.splice(this.appIndex, 1)
      } else {
        this.desktopTwoList.splice(this.appIndex, 1)
      }
      // 这里需要传回后台保存
    },
    desktopSwitch(e, d) {
      var currTab = document.getElementsByClassName('currTab')
      for (var i = 0; i < currTab.length; i++) {
        currTab[i].classList.remove('currTab')
      }
      e.currentTarget.classList.add('currTab')
      this.showDesktop = d
      if (d === '1') {
        document.getElementById('desktop-2').classList.add('hide')
        document.getElementById('desktop-1').classList.remove('hide')
      } else {
        document.getElementById('desktop-1').classList.add('hide')
        document.getElementById('desktop-2').classList.remove('hide')
      }
    },
    mouseOpen() {
      if (this.showDesktop === '1') {
        if (this.appIndex > 0) {
          this.layerOpen(this.desktopOneList[this.appIndex])
        } else {
          this.layerOpen(this.add)
        }
      } else {
        if (this.appIndex > 0) {
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
/*定义动画的时间和过渡效果*/
.apps {
  transition: all 0.5s ease;
}
.apps.desktop-1.hide{
  -webkit-transform: translate(-100%, 0);
  transform: translate(-100%, 0);
}

.apps.desktop-2.hide{
  -webkit-transform: translate(100%, 0);
  transform: translate(100%, 0);
}

</style>
