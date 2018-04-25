<template>
  <div :class="className" :style="{height:height,width:width,background:background}" :data="data" :barColor="barColor"></div>
</template>

<script>
  import echarts from 'echarts'
  require('echarts/theme/macarons') // echarts 主题
  import { debounce } from '@/utils'

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
      barColor: {
        type: String,
        default: '#3398DB'
      },
      data: {
        type: Object
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
      this.mon = this.data.mon
      this.pos = this.data.pos
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
          color: [this.barColor],
          tooltip: {
            trigger: 'axis',
            axisPointer: {// 坐标轴指示器，坐标轴触发有效
              type: 'shadow'// 默认为直线，可选为：'line' | 'shadow'
            }
          },
          grid: {
            left: '3%',
            right: '4%',
            bottom: '3%',
            top: '4%',
            containLabel: true
          },
          xAxis: [
            {
              type: 'category',
              data: this.mon,
              axisTick: {
                alignWithLabel: true
              }
            }
          ],
          yAxis: [
            {
              type: 'value'
            }
          ],
          series: [
            {
              name: '直接访问',
              type: 'bar',
              barWidth: '60%',
              data: this.pos
            }
          ]
        })
      },
      get() {

      }
    }
  }
</script>
