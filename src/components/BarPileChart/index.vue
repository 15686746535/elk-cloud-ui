<template>
    <div :class="className" id="showChart" :style="{height:height,width:width}"></div>
</template>

<script>
import echarts from 'echarts'
require('echarts/theme/macarons') // echarts 主题
import { debounce } from '@/utils'

const animationDuration = 3000

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
    hasDown: {
      type: Boolean,
      default: false
    },
    data: {
      type: Object,
      default: {
        colors: [],
        xAxis: [],
        seriesList: []
      }
    }
  },
  data() {
    return {
      chart: null
    }
  },
  watch: {
    data: function(val) {
      console.log('xxxxx', val)
      this.initChart()
      if (this.hasDown) {
        this.onClick()
      }
    }
  },
  computed: {
    getSeries() {
      var seriesList = []
      var series = {}
      this.data.seriesList.forEach(function(item) {
        series = {
          name: item.name,
          type: 'bar',
          stack: item.stack,
          barWidth: '40%',
          data: item.value,
          label: {
            normal: {
              show: true,
              position: 'top'
              // formatter: function(value, index) { // 使用函数模板，函数参数分别为刻度数值（类目），刻度的索引
              //   return value.data + '(人)'
              // }
            }
          },
          animationDuration
        }
        seriesList.push(series)
      })
      return seriesList
    }
  },
  mounted() {
    this.initChart()
    this.__resizeHanlder = debounce(() => {
      if (this.chart) {
        this.chart.resize()
      }
    }, 100)
    window.addEventListener('resize', this.__resizeHanlder)
  },
  beforeDestroy() {
    if (!this.chart) {
      return
    }
    window.removeEventListener('resize', this.__resizeHanlder)
    this.chart.dispose()
    this.chart = null
  },
  created() {
    // this.onClick()
  },
  methods: {
    onClick() {
      var that = this
      this.chart.on('click', function(params) {
        // 控制台打印数据的名称
        if (that.hasDown) {
          that.$emit('callback', params)
        }
      })
    },
    initChart() { // document.getElementById('showChart') this.$el, 'macarons'
      this.chart = echarts.init(this.$el, 'macarons')
      this.chart.setOption({
        color: this.data.colors,
        tooltip: {
          trigger: 'axis',
          axisPointer: { // 坐标轴指示器，坐标轴触发有效
            type: 'shadow' // 默认为直线，可选为：'line' | 'shadow'
          }
        },
        grid: {
          top: 40,
          left: '2%',
          right: '2%',
          bottom: '3%',
          containLabel: true
        },
        xAxis: [{
          type: 'category',
          data: this.data.xAxis,
          axisTick: {
            alignWithLabel: true
          }
        }],
        yAxis: [{
          type: 'value',
          minInterval: 1,
          axisTick: {
            show: true
          },
          axisLabel: {
            show: true
            // formatter: function(value, index) { // 使用函数模板，函数参数分别为刻度数值（类目），刻度的索引
            //   return value + '(人)'
            // }
          }
        }],
        series: this.getSeries
      })
    }
  }
}
</script>
<style rel="stylesheet/scss" lang="scss" scoped>
</style>
