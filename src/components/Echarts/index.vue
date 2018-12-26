<template>
  <div :id="id" :class="className" :style="{height:height,width:width,background:background}" ></div>
</template>

<script>
  import echarts from 'echarts'
  require('echarts/theme/macarons') // echarts 主题

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
        console.log(val)
        if (val) {
          this.initChart()
        }
      }
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
      console.log(this.option)
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
        console.log(11,this.$el)
        _this.chart = echarts.init(_this.$el, 'macarons')
        _this.chart.setOption(_this.option)
        _this.__resizeHanlder = function () {
          _this.chart.resize()
        }
        window.addEventListener('resize', _this.__resizeHanlder)
      }
    }
  }
</script>
