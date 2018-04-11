<template>
  <div :class="className" :style="{height:height,width:width,background:background}" :data="data"></div>
</template>

<script>
  import echarts from 'echarts'
  require('echarts/theme/macarons') // echarts 主题
  import { debounce } from '@/utils'

  const animationDuration = 6000

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
      data: {
        type: Array
      }
    },
    data() {
      return {
        chart: null,
        mon: [],
        pos: []
      }
    },
    created() {
      this.mon = ['一月', '二月', '三月', '四月', '五月', '六月', '七月', '八月', '九月', '十月', '十一月', '十二月']
      this.pos = this.data
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
    methods: {
      initChart() {
        this.chart = echarts.init(this.$el, 'macarons')

        this.chart.setOption({
          tooltip: {
            trigger: 'axis',
            axisPointer: { // 坐标轴指示器，坐标轴触发有效
              type: 'shadow' // 默认为直线，可选为：'line' | 'shadow'
            }
          },
          grid: {
            top: 10,
            left: '2%',
            right: '2%',
            bottom: '3%',
            containLabel: false
          },
          xAxis: [{
            type: 'category',
            show: false,
            data: this.mon,
            axisTick: {
              alignWithLabel: true
            }
          }],
          yAxis: [{
            show: false,
            type: 'value',
            axisTick: {
              show: true
            }
          }],
          series: [{
            name: '招生人数',
            type: 'bar',
            stack: 'vistors',
            barWidth: '60%',
            data: this.pos,
            itemStyle: {
              normal: {
                color: new echarts.graphic.LinearGradient(
                  0, 0, 0, 1,
                  [
                    { offset: 0, color: '#83bff6' },
                    { offset: 0.5, color: '#188df0' },
                    { offset: 1, color: '#188df0' }
                  ]
                )
              },
              emphasis: {
                color: new echarts.graphic.LinearGradient(
                  0, 0, 0, 1,
                  [
                    { offset: 0, color: '#2378f7' },
                    { offset: 0.7, color: '#2378f7' },
                    { offset: 1, color: '#83bff6' }
                  ]
                )
              }
            },
            animationDuration
          }]
        })
      },
      get() {

      }
    }
  }
</script>
