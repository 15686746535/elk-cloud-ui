<template>
  <div :id="id" :class="className" :style="{height:height,width:width,background:background}" >
  </div>
</template>

<script>
  import echarts from 'echarts'
  require('echarts/theme/macarons') // echarts 主题
  let mycharts = null;

  export default {
    props: {
      className: {
        type: String,
        default: 'chart'
      },
      width: {
        type: String,
        default: '100%'
      },
      height: {
        type: String,
        default: '100%'
      },
      background: {
        type: String,
        default: '#fff'
      },
      option: {
        type: Object
      }
    },
    watch: {
      option: function(val) {
        if (val) {
          this.refresh()
        }
      },
      width: function(val) {
        this.$el.style.width = val
        if (this.__resizeHanlder) {
          this.__resizeHanlder()
        }
      }
    },
    update() {
      this.refresh()
    },
    data() {
      return {
        chart: null,
        __resizeHanlder: null,
        id: "chart_"+new Date().getTime()
      }
    },
    created() {
    },
    mounted() {
      if (this.option) {
        this.initChart()
      }
    },
    beforeDestroy() {
      if (!this.chart) {
        return
      }
      window.removeEventListener('resize', this.__resizeHanlder)
      this.chart.dispose()
      this.chart = null
    },
    methods: {
      initChart() {
        var _this = this
        _this.chart = echarts.init(_this.$el, 'macarons')
        _this.chart.setOption(_this.option)
        _this.__resizeHanlder = function () {
          _this.chart.resize()
        }
        window.addEventListener('resize', _this.__resizeHanlder)
      },
      refresh(){
        if (this.chart) {
          this.$el.style.width = this.width
          this.chart.setOption(this.option)
          this.chart.resize()
        } else {
          this.initChart()
        }

      }
    }
  }
</script>
