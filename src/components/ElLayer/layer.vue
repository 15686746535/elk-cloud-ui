<!--
@Author: 左盐
@Date:   2018-03-19 15:05:38
@Email:  huabinglan@163.com
@Project: xxx
@Last modified by:   左盐
@Last modified time: 2018-03-19 18:05:33
-->
<template lang="html">
   <component :options="this.$data" :is="getActiveName"></component>
</template>

<script>
import pzalert from './alert.vue'
import pzloading from './loading.vue'
import pzmsg from './msg.vue'
import pztips from './tips.vue'
import pzpage from './page.vue'
import pziframe from './iframe.vue'

export default {
  data() {
    return {
      id: '',
      type: 0, // 0（alert默认）1（页面层）2（iframe层）3（loading）4（tips层）,5(msg)
      title: '信息',
      content: '',
      area: 'auto',
      offset: 'auto',
      icon: -1,
      btn: '确定',
      time: 0,
      shade: true,
      yes: '',
      cancel: ''
    }
  },
  props: {
    options: Object
  },
  mounted() {
  },
  computed: {
    getActiveName() {
      var comps = ['pzalert', 'pzpage', 'pziframe', 'pzloading', 'pztips', 'pzmsg']
      return comps[this.$data.type]
    },
    'isMsg': function() {
      return this.type === 5
    },
    'isTips': function() {
      return this.type === 4
    }
  },
  components: {
    pzalert,
    pzloading,
    pzmsg,
    pztips,
    pzpage,
    pziframe
  }
}
</script>

<style lang="less">
@import 'css/index';
</style>
