<!--
@Author: 左盐
@Date:   2018-03-19 12:25:54
@Email:  huabinglan@163.com
@Project: xxx
@Last modified by:   左盐
@Last modified time: 2018-04-02 12:20:29
-->
<template lang="html">
    <div :id="options.id" :class="isMax?'vl-notify-max':'vl-notify-default'" class="vl-notify vl-notify-main vl-notify-alert vl-notify-iframe"  @mousemove="move" @mouseup="moveEnd"
         @focus="resetZIndex" tabindex="1" :style="{left:left,top:top, margin:options.offset[2],zIndex:zindex, width: width, height: height}" style="z-index: 66;" @click="closeMenu"
         @contextmenu="openMenu" >
        <h2 class="vl-notice-title" @mousedown="moveStart" @dblclick="titleWindowFull">{{options.title}}
            <i @click="close" :class="isClose?'el-icon-loading':'icon-remove'" v-if="closeBtn"></i>
            <i class="icon-full" @click="windowFull" v-if="maxmin"></i>
            <i class="icon-min" @click="windowMin" v-if="maxmin"></i>
        </h2>
        <div class="vl-notify-content" :style="contentStyle" :id="id"></div>
    </div>
</template>

<script>
import helper from './helper/helper.js'

export default {
  data() {
    return {
      isMin: false, // 最小
      isMax: false, // 最大
      maxmin: this.options.maxmin, // 允许最大最小
      closeBtn: this.options.closeBtn, // 显示关闭按钮
      width: this.options.area[0],
      height: this.options.area[1],
      left: this.options.offset[0] + 'px',
      top: this.options.offset[1] + 'px',
      moveLeft: 0, // 左移的距离
      moveTop: 0, // 上移的距离
      ismove: false,
      id: 'vlip' + new Date().getTime(),
      zindex: 66,
      instance: null
    }
  },
  props: {
    options: {
      type: Object
    }
  },
  watch: {
    'options.area': function(val) {
      // // this.propsData.area = [parseInt(val[0]), parseInt(val[1])]
    }
  },
  computed: {
    contentStyle() {
      return {
        height: (parseInt(this.height) - 28) + 'px',
        minHeight: 'inherit',
        overflow: 'auto'
      }
    },
    isClose() {
      var prohibit = this.$parent.prohibit
      return prohibit.indexOf(this.options.id.toString()) > -1
    }
  },
  async mounted() {
    this.getContent()
    await helper.sleep(20)
    if (this.options.shade) { // 是否显示遮罩
      document.getElementById(this.options.id + '_mask').addEventListener('mousemove', (event) => {
        this.move(event)
      })
      document.getElementById(this.options.id + '_mask').addEventListener('mouseup', (event) => {
        this.moveEnd(event)
      })
    } else {
      document.addEventListener('mousemove', (event) => {
        this.move(event)
      })
      document.addEventListener('mouseup', (event) => {
        this.moveEnd(event)
      })
    }
    this.resetZIndex()
    if (this.options.isMax) {
      this.height = (document.documentElement.clientHeight - 45) + 'px'
      this.width = document.documentElement.clientWidth + 'px'
      this.isMax = true
    }
  },
  methods: {
    getStyle(el, styleProp) {
      var x = document.getElementById(el)
      if (window.getComputedStyle) {
        return document.defaultView.getComputedStyle(x, null).getPropertyValue(styleProp)
      } else if (x.currentStyle) {
        return x.currentStyle[styleProp]
      }
    },
    resetZIndex() {
      var max = 500
      var doms = document.querySelectorAll('.vl-notify-iframe')
      var domZindex = 66
      for (let i = 0, len = doms.length; i < len; i++) {
        var value = parseInt(this.getStyle(doms[i].id, 'z-index'))
        if (this.options.id === doms[i].id) {
          domZindex = value
        }
        if (max < value) {
          max = value
        }
      }
      if (domZindex === max && max !== 500) {
        return
      }
      this.zindex = max + 1
    },
    async getContent() {
      await helper.sleep(10)
      var propsData = JSON.parse(JSON.stringify(this.options.content.data))
      propsData.area = [parseInt(this.width), parseInt(this.height)]
      propsData['layerid'] = this.options.id + ''
      this.instance = new this.options.content.content({ // 具体参数信息，请参考vue源码
        parent: this.options.content.parent,
        propsData: propsData
      })
      this.instance.vm = this.instance.$mount()
      document.getElementById(this.id).appendChild(this.instance.vm.$el)
      this.options.layer.instancesVue[this.options.id].iframe = this.instance.vm
    },
    // 桌面点击事件
    closeMenu(e) {
      // 监听点击开始按钮 打开、关闭开始菜单
      document.getElementById('start_item').style.display = e.target.id === 'start_btn' ? 'block' : 'none'
      // 关闭鼠标右键菜单
      document.getElementById('smartMenu_body').style.display = 'none'
    },
    openMenu(ev) {
      if (this.closeBtn) {
        this.$parent.content.parent.$store.dispatch('setSmartMenu', 4)
        this.$parent.content.parent.$store.dispatch('setAppIndex', null)
        var oEvent = ev || even
        var oUl = document.getElementById('smartMenu_body')
        // 一定要加px，要不然chrom不认
        oUl.style.top = oEvent.clientY + 'px'
        oUl.style.left = oEvent.clientX + 'px'
        oUl.style.display = 'block'
      }
    },
    titleWindowFull() {
      if (this.maxmin) {
        this.windowFull()
      }
    },
    windowFull() {
      if (this.isMax) {
        this.width = '1024px'
        this.height = '600px'
        this.left = '50%'
        this.top = '50%'
        this.isMax = false
      } else {
        this.height = (document.documentElement.clientHeight - 45) + 'px'
        this.width = document.documentElement.clientWidth + 'px'
        this.isMax = true
      }
      this.instance.area = [parseInt(this.width), parseInt(this.height)]
    },
    windowMin(event) {
      var that = document.getElementById(this.options.id)
      that.style.display = 'none'
    },
    close(event) {
      if (!this.isClose) {
        helper.clickMaskCloseAll(event, this.options.layer, this.options.id)
      }
    },
    btnyes(event) {
      helper.btnyes(event, this.options)
    },
    btncancel(event) {
      helper.btncancel(event, this.options)
    },
    moveStart(event) {
      helper.moveStart(event, this.options)
      this.moveLeft = event.clientX
      this.moveTop = event.clientY
      this.ismove = true
    },
    move(event) {
      if (this.ismove && !this.isMax) {
        var o = document.getElementById(this.options.id + '')
        o.style.left = this.options.offset[0] + (event.clientX - this.moveLeft) + 'px'
        o.style.top = this.options.offset[1] + (event.clientY - this.moveTop) + 'px'
        this.resetZIndex()
      }
    },
    moveEnd(event) {
      this.ismove = false
    }
  }
}
</script>
