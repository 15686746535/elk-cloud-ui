<!--
@Author: 左盐
@Date:   2018-03-24 15:30:33
@Email:  huabinglan@163.com
@Project: xxx
@Last modified by:   左盐
@Last modified time: 2018-03-24 15:49:07
-->

<template lang="html">
    <div class="vl-task selected" @click="taskClick" :id="id + '_task'" :class="genre" :title="getTitle">
        <div class="tabIcon" v-if="genre==='task'">
            <img :src="tabIcon">
        </div>
        <div class="tabTxt" v-if="genre==='task'">{{title}}</div>
    </div>
</template>

<script>
import helper from './helper/helper.js'

export default {
  data() {
    return {
      id: '',
      type: 0, // 0（alert默认）1（页面层）2（iframe层）3（loading）4（tips层）,5(msg)
      title: '信息',
      content: '',
      area: 'auto',
      offset: 'auto',
      tabIcon: '',
      genre: 'task', // home 桌面 left 左边  right 右边 task 任务
      icon: -1,
      btn: '确定',
      time: 0,
      shade: true,
      yes: '',
      cancel: ''
    }
  },
  props: {

  },
  computed: {
    getTitle() {
      if (this.genre === 'home') {
        return '回到桌面'
      }
    }
  },
  mounted() {
    this.delSelected()
  },
  methods: {
    taskClick(e) {
      switch (this.genre) {
        case 'task':
          this.isOpen(e)
          break
        case 'home':
          this.showHome(e)
          break
      }
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
    isOpen(e) {
      this.delSelected()
      e.currentTarget.classList.add('selected')
      var task = document.getElementById(this.id)
      if (task.style.display === 'none') {
        task.style.display = 'inherit'
      }
      this.resetZIndex()
    },
    delSelected() {
      var a = document.getElementsByClassName('selected')
      for (var i = 0; i < a.length; i++) {
        a[i].classList.remove('selected')
      }
    },
    resetZIndex() {
      var doms = document.querySelectorAll('.vl-notify-iframe')
      var max = 0
      var dom = null
      for (let i = 0; i < doms.length; i++) {
        var value = parseInt(this.getStyle(doms[i].id, 'z-index'))
        if (this.id + '' === doms[i].id + '') {
          dom = doms[i]
        }
        if (value > max) {
          max = value
        }
      }
      dom.style.zIndex = max + 1
    },
    getStyle(el, styleProp) {
      var x = document.getElementById(el)
      if (window.getComputedStyle) {
        return document.defaultView.getComputedStyle(x, null).getPropertyValue(styleProp)
      } else if (x.currentStyle) {
        return x.currentStyle[styleProp]
      }
    },
    close(event) {
      if (this.shadeClose) {
        helper.clickMaskCloseAll(event, this.layer, this.id)
      }
    }
  }
}
</script>

<style lang="css">
  .vl-task{
      background: url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAHAAAABACAYAAADCmvPmAAACQ0lEQVR42u2cUU7CQBRF52HBGCV+ugj/3ApsgC2wDzZCwnp0Ay7AYNBS4DlgIEA605lSwQnnJEhjO23n3bl33ofRGAAAAAAAAAAAOA8yHA5blCE9RqORiohmqiqUI0l0/SNbrVY4ME1WWwFxYMLgwIT7l3WM4kAcCBd0oMmWyyUC4kDAgVDbgTQxKQtoHXhDGdIWkAhlDwQcCDjwWgWkiSFCAQGBCMWBQBcKRCgQoQgIRCjgQKALJUKBCAUEBPZAHAg0MdC4A/m7UPZAuLADEZAmBnAg1NsDaWJwIOBAwIHX6sB2uz233FKPdOh0OrnZ/qOffr//Oh6Pn62IHUqThHjztWb28HtjQ1V9tN8P9tOmPElQ2M+niHxsHDgYDO4mk8nTdDq99wzSvdzV4xzeu8Z1Xo+udf0u9Lw6nu279vj9Yps3DRyjFfOuqq13bLfbnfV6vXdrvC8r4lysJV+KosgCJu+atJY8PGSCPhHKzpnAYojn2HfetyCPrzOOe5uAhaWe8UHva/uWRZ7nb1bAWbaw2INFiXsu2V1pQ+PLCt/E8y5Rq90zrWS7OWWtVmt+wk21RhSFrHCJdHlsCpiG7+HaVpqokystfgW07ssjV1vM6vsvrj5HOpxSpzq12wlYRLjrnCutLPrkD5NCA/bAppPIlyjGkUwHe+46QovIiBNP12k8EWgCm4aQDlgCxkikQDEi+MaEnKtqaExAA3cgoE8IPSEOQsa5OjyteAfxuNTnXK0ZjRKw/8XWQyqSTR212I35Afa2SLcIHyHNAAAAAElFTkSuQmCC") no-repeat left 0;
      box-sizing: border-box;
      width: 112px;
      height: 44px;
      float: right;
      text-align: center;
      line-height: 43px;
      font-size: 14px;
      -moz-user-select: -moz-none;
      -webkit-user-select: none;
      margin: 0;
  }
  .vl-task:hover {
      background: url("data:image/png;base64,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") no-repeat left 0;
  }

  .tabIcon{
      float: left;
      width: 40px;
      height: 44px;
      line-height: 60px;
  }
  .tabIcon img{
      width: 32px;
      height: 32px;
      margin-top: 5px;
      margin-left: 10px;
  }
  .tabTxt{
      margin-left: 38px;
      margin-right: 6px;
      line-height: 43px;
      font-size: 12px;
      color: #000;
      overflow: hidden;
  }
  .vl-task.selected{
      background: url("data:image/png;base64,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") no-repeat scroll 0 0 transparent;
  }
  .home {
    width: 20px;

  }
</style>
