<template>
  <div id="app" @click="appClack($event)">
    <router-view></router-view>
    <!--加载框-->
    <div v-loading.fullscreen.lock="$store.state.app.loading"
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
    appClack(e) {
      this.$store.dispatch('setSpread', e.target.classList.contains('spread-true'))
    },
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
  @import 'assets/fa-icon/fontawesome/font-awesome.min.css';
  [class^="el-icon-fa"], [class*=" el-icon-fa"] {
    display: inline-block;
    font: normal normal normal 14px/1 FontAwesome!important;
    text-rendering: auto;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }
</style>
