<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
import client from '@/utils/client'
export default {
  name: 'app',
  created() {
    this.$store.dispatch('setClientHeight', client.getHeight(84))
    this.$store.dispatch('setClientWidth', client.getWidth(220))
  },
  mounted() {
    window.onresize = () => {
      return (() => {
        this.$store.dispatch('setClientHeight', client.getHeight(84))
        this.$store.dispatch('setClientWidth', client.getWidth(220))
      })()
    }
  }
}
</script>

<style lang="scss">
  @import '~normalize.css/normalize.css';// normalize.css 样式格式化
  @import './styles/index.scss'; // 全局自定义的css样式
</style>
