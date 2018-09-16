<template>
  <div :class="className" style="width: 800px;height: 600px;" ></div>
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
    data: {
      type: Object,
      default: {
        mine: { value: 0, name: '目标：0\n完成：0' },
        team: { value: 0, name: '目标：0\n完成：0' }
      }
    }
  },
  data() {
    return {
      option: {
        tooltip: {
          formatter: '{a} <br/>{b}'
        },
        series: [
          {
            name: '团队',
            type: 'gauge',
            z: 3,
            min: 0,
            max: 100,
            splitNumber: 10,
            radius: '50%',
            axisLine: { // 坐标轴线
              lineStyle: { // 属性lineStyle控制线条样式
                width: 10
              }
            },
            axisTick: { // 坐标轴小标记
              length: 15, // 属性length控制线长
              lineStyle: { // 属性lineStyle控制线条样式
                color: 'auto'
              }
            },
            splitLine: { // 分隔线
              length: 20, // 属性length控制线长
              lineStyle: { // 属性lineStyle（详见lineStyle）控制线条样式
                color: 'auto'
              }
            },
            axisLabel: {
              backgroundColor: 'auto',
              borderRadius: 2,
              color: '#eee',
              padding: 3,
              textShadowBlur: 2,
              textShadowOffsetX: 1,
              textShadowOffsetY: 1,
              textShadowColor: '#222'
            },
            title: {
              // 其余属性默认使用全局文本样式，详见TEXTSTYLE
              fontWeight: 'bolder',
              fontSize: 20,
              fontStyle: 'italic'
            },
            detail: {
              // 其余属性默认使用全局文本样式，详见TEXTSTYLE
              formatter: '{value}%',
              fontWeight: 'bolder'
            },
            data: [this.data.team] // [{ value: 220, name: '目标：200\n完成：220' }]
          },
          {
            name: '个人',
            type: 'gauge',
            center: ['20%', '55%'], // 默认全局居中
            radius: '35%',
            min: 0,
            max: 100,
            endAngle: 45,
            splitNumber: 10,
            axisLine: { // 坐标轴线
              lineStyle: { // 属性lineStyle控制线条样式
                width: 8
              }
            },
            axisTick: { // 坐标轴小标记
              length: 12, // 属性length控制线长
              lineStyle: { // 属性lineStyle控制线条样式
                color: 'auto'
              }
            },
            splitLine: { // 分隔线
              length: 20, // 属性length控制线长
              lineStyle: { // 属性lineStyle（详见lineStyle）控制线条样式
                color: 'auto'
              }
            },
            pointer: {
              width: 8
            },
            title: {
              offsetCenter: [0, '-30%'] // x, y，单位px
            },
            detail: {
              // 其余属性默认使用全局文本样式，详见TEXTSTYLE
              formatter: '{value}%',
              fontWeight: 'bolder'
            },
            data: [this.data.mine] // [{ value: 220, name: '目标：200\n完成：220' }]
          },
          {
            name: '油表',
            type: 'gauge',
            center: ['77%', '50%'], // 默认全局居中
            radius: '25%',
            min: 0,
            max: 2,
            startAngle: 135,
            endAngle: 45,
            splitNumber: 2,
            axisLine: { // 坐标轴线
              lineStyle: { // 属性lineStyle控制线条样式
                width: 8
              }
            },
            axisTick: { // 坐标轴小标记
              splitNumber: 5,
              length: 10, // 属性length控制线长
              lineStyle: { // 属性lineStyle控制线条样式
                color: 'auto'
              }
            },
            axisLabel: {
              formatter: function(v) {
                switch (v + '') {
                  case '0' : return 'E'
                  case '1' : return 'Gas'
                  case '2' : return 'F'
                }
              }
            },
            splitLine: { // 分隔线
              length: 15, // 属性length控制线长
              lineStyle: { // 属性lineStyle（详见lineStyle）控制线条样式
                color: 'auto'
              }
            },
            pointer: {
              width: 2
            },
            title: {
              show: false
            },
            detail: {
              show: false
            },
            data: [{ value: 0.5, name: 'gas' }]
          },
          {
            name: '水表',
            type: 'gauge',
            center: ['77%', '50%'], // 默认全局居中
            radius: '25%',
            min: 0,
            max: 2,
            startAngle: 315,
            endAngle: 225,
            splitNumber: 2,
            axisLine: { // 坐标轴线
              lineStyle: { // 属性lineStyle控制线条样式
                width: 8
              }
            },
            axisTick: { // 坐标轴小标记
              show: false
            },
            axisLabel: {
              formatter: function(v) {
                switch (v + '') {
                  case '0' : return 'H'
                  case '1' : return 'Water'
                  case '2' : return 'C'
                }
              }
            },
            splitLine: { // 分隔线
              length: 15, // 属性length控制线长
              lineStyle: { // 属性lineStyle（详见lineStyle）控制线条样式
                color: 'auto'
              }
            },
            pointer: {
              width: 2
            },
            title: {
              show: false
            },
            detail: {
              show: false
            },
            data: [{ value: 0.5, name: 'gas' }]
          }
        ]
      }
    }
  },
  watch: {
    data: function(val) {
      if (val && this.chart) {
        this.option.series[0].data = val.team
        this.option.series[1].data = val.mine
        this.chart.setOption(this.option, true)
      } else {
        this.initChart()
      }
    }
  },
  created() {
  },
  mounted() {
    this.initChart()
    this.__resizeHanlder = debounce(() => {
      if (this.chart) {
        this.chart.resize()
      }
    }, 100)
    window.addEventListener('resize', this.__resizeHanlder)
    this.callback()
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
    callback() {
      var that = this
      this.chart.on('click', function(params) {
        // 控制台打印数据的名称
        that.$emit('callback', params)
      })
    },
    initChart() {
      var that = this
      that.chart = echarts.init(this.$el, 'macarons')
      that.chart.setOption(that.option)
      setInterval(function() {
        that.option.series[2].data[0].value = (Math.random() * 2).toFixed(2) - 0
        that.option.series[3].data[0].value = (Math.random() * 2).toFixed(2) - 0
        that.chart.setOption(that.option, true)
      }, 2000)
    }
  }
}
</script>
