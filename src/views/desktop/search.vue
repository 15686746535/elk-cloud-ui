<template>
  <div>

  </div>
</template>

<script>

export default {
  name: 'layout',
  components: {
  },
  data() {
    return {
      showDesktop: '1'
    }
  },
  watch: {
    desktopList: function(val) {
    }
  },
  computed: {
  },
  created() {
  },
  mounted() {
  },
  methods: {
    // 打开应用
    layerOpen(app) {
      this.$emit('open', app)
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
