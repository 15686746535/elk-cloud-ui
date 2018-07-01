<!--
@Author: 左盐
@Date:   2018-03-19 12:25:54
@Email:  huabinglan@163.com
@Project: xxx
@Last modified by:   左盐
@Last modified time: 2018-04-02 12:20:29
-->
<template lang="html">
    <div :id="options.id" :class="isMax?'vl-notify-max':'vl-notify-default'" class="vl-notify vl-notify-main vl-notify-alert vl-notify-iframe"  @mousemove="move" @mouseup="moveEnd" @focus="resetZIndex" tabindex="1"
         :style="{left:left,top:top, margin:options.offset[2],zIndex:zindex, width: width, height: height}">
        <h2 class="vl-notice-title" @mousedown="moveStart" @dblclick="windowFull">{{options.title}}
            <i class="icon-remove" @click="close"></i>
            <i class="icon-full" @click="windowFull"></i>
            <i class="icon-min" @click="windowMin"></i>
        </h2>
        <div class="vl-notify-content" :style="contentStyle" :id="id"></div>
    </div>
</template>

<script>
import helper from './helper/helper.js'

export default {
  data() {
    return {
      isMin: false, // 左移的距离
      isMax: false, // 左移的距离
      width: this.options.area[0],
      height: this.options.area[1],
      left: this.options.offset[0] + 'px',
      top: this.options.offset[1] + 'px',
      moveLeft: 0, // 左移的距离
      moveTop: 0, // 上移的距离
      ismove: false,
      id: 'vlip' + new Date().getTime(),
      zindex: 0
    }
  },
  props: {
    options: {
      type: Object
    }
  },
  computed: {
    contentStyle() {
      return {
        height: (parseInt(this.height) - 28) + 'px',
        minHeight: 'inherit',
        overflow: 'auto'
      }
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
      var domZindex = 0
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
      propsData['layerid'] = this.options.id
      var instance = new this.options.content.content({ // 具体参数信息，请参考vue源码
        parent: this.options.content.parent,
        propsData: propsData
      })
      instance.vm = instance.$mount()
      document.getElementById(this.id).appendChild(instance.vm.$el)
      this.options.layer.instancesVue[this.options.id].iframe = instance.vm
    },
    windowFull() {
      if (this.isMax) {
        this.width = this.options.area[0]
        this.height = this.options.area[1]
        this.left = '50%'
        this.top = '50%'
        this.isMax = false
      } else {
        this.height = (document.documentElement.clientHeight - 45) + 'px'
        this.isMax = true
      }
    },
    windowMin(event) {
      var that = document.getElementById(this.options.id)
      that.style.display = 'none'
    },
    close(event) {
      helper.clickMaskCloseAll(event, this.options.layer, this.options.id)
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
