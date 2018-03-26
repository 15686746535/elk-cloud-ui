<template>
  <div id="app">
    <router-view></router-view>
    <!--加载框-->
    <div v-loading.fullscreen.lock="this.$store.state.app.loading"
         element-loading-text="玩儿命加载中···"
         element-loading-background="rgba(246, 246, 246, 0.2)"></div>
  </div>
</template>

<script>
export default {
  name: 'app',
  created() {
    this.setClientSize()
  },
  mounted() {
    window.onresize = () => {
      return (() => {
        this.setClientSize()
      })()
    }
  },
  methods: {
    setClientSize() {
      var height = document.documentElement.clientHeight - 84 || document.body.clientHeight - 84
      var width = document.documentElement.clientWidth - 220 || document.body.clientWidth - 220
      this.$store.dispatch('setClientHeight', height)
      this.$store.dispatch('setClientWidth', width)
    }
  }
}
</script>

<style lang="scss">
  @import '~normalize.css/normalize.css';// normalize.css 样式格式化
  @import './styles/index.scss'; // 全局自定义的css样式
</style>
