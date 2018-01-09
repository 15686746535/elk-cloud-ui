<!--<template>-->
  <!--<div id="myChart" :style="{width: '500px', height: '300px'}"></div>-->
<!--</template>-->

<!--<script>-->
  <!--// 引入基本模板-->
  <!--import echarts from 'echarts'-->
  <!--import zrender from 'zrender'-->
  <!--require('echarts')-->
  <!--export default {-->
    <!--name: 'bar',-->
    <!--data() {-->
      <!--return {-->
        <!--msg: 'Welcome to Your Vue.js App'-->
      <!--}-->
    <!--},-->
    <!--mounted() {-->
      <!--this.drawLine()-->
    <!--},-->
    <!--methods: {-->
      <!--drawLine() {-->
        <!--// 基于准备好的dom，初始化echarts实例-->
        <!--var myChart = echarts.init(document.getElementById('myChart'))-->
        <!--// 绘制图表-->
        <!--myChart.setOption({-->
          <!--legend: {-->
            <!--data: [-->
              <!--'邮件营销',-->
              <!--'联盟广告',-->
              <!--'直接访问',-->
              <!--'搜索引擎']-->
          <!--},-->
          <!--tooltip: {-->
            <!--show: true,-->
            <!--trigger: 'item'-->
          <!--},-->
          <!--toolbox: {-->
            <!--show: true,-->
            <!--feature: {-->
              <!--mark: { show: true },-->
              <!--dataView: { show: true, readOnly: false },-->
              <!--magicType: { show: true, type: ['line', 'bar', 'stack', 'tiled'] },-->
              <!--restore: { show: true },-->
              <!--saveAsImage: { show: true }-->
            <!--}-->
          <!--},-->
          <!--calculable: true,-->
          <!--xAxis: [-->
            <!--{-->
              <!--type: 'category',-->
              <!--data: ['周一', '周二', '周三', '周四', '周五', '周六', '周日']-->
            <!--}-->
          <!--],-->
          <!--yAxis: [-->
            <!--{-->
              <!--type: 'value'-->
            <!--}-->
          <!--],-->
          <!--series: [-->
            <!--{-->
              <!--name: '邮件营销',-->
              <!--type: 'bar',-->
              <!--itemStyle: { //  m系列级个性化样式，纵向渐变填充-->
                <!--normal: {-->
                  <!--barBorderColor: 'red',-->
                  <!--barBorderWidth: 5,-->
                  <!--color: (function() {-->
                    <!--var zrColor = require('zrender/tool/color')-->
                    <!--return zrColor.getLinearGradient(-->
                      <!--0, 400, 0, 300,-->
                      <!--[[0, 'green'], [1, 'yellow']]-->
                    <!--)-->
                  <!--})()-->
                <!--},-->
                <!--emphasis: {-->
                  <!--barBorderWidth: 5,-->
                  <!--barBorderColor: 'green',-->
                  <!--color: (function() {-->
                    <!--var zrColor = require('zrender/tool/color')-->
                    <!--return zrColor.getLinearGradient(-->
                      <!--0, 400, 0, 300,-->
                      <!--[[1, 'orange']]-->
                    <!--)-->
                  <!--})(),-->
                  <!--label: {-->
                    <!--show: true,-->
                    <!--position: 'top',-->
                    <!--formatter: '{a} {b} {c}',-->
                    <!--textStyle: {-->
                      <!--color: 'blue'-->
                    <!--}-->
                  <!--}-->
                <!--}-->
              <!--},-->
              <!--data: [220, 232, 101, 234, 190, 330, 210]-->
            <!--},-->
            <!--{-->
              <!--name: '联盟广告',-->
              <!--type: 'bar',-->
              <!--stack: '总量',-->
              <!--data: [120, '-', 451, 134, 190, 230, 110]-->
            <!--},-->
            <!--{-->
              <!--name: '直接访问',-->
              <!--type: 'bar',-->
              <!--stack: '总量',-->
              <!--itemStyle: { // 系列级个性化-->
                <!--normal: {-->
                  <!--barBorderWidth: 6,-->
                  <!--barBorderColor: 'tomato',-->
                  <!--color: 'red'-->
                <!--},-->
                <!--emphasis: {-->
                  <!--barBorderColor: 'red',-->
                  <!--color: 'blue'-->
                <!--}-->
              <!--},-->
              <!--data: [-->
                <!--320, 332, 100, 334,-->
                <!--{-->
                  <!--value: 390,-->
                  <!--symbolSize: 10, // 数据级个性化-->
                  <!--itemStyle: {-->
                    <!--normal: {-->
                      <!--color: 'lime'-->
                    <!--},-->
                    <!--emphasis: {-->
                      <!--color: 'skyBlue'-->
                    <!--}-->
                  <!--}-->
                <!--},-->
                <!--330, 320-->
              <!--]-->
            <!--},-->
            <!--{-->
              <!--name: '搜索引擎',-->
              <!--type: 'bar',-->
              <!--barWidth: 40, // 系列级个性化，柱形宽度-->
              <!--itemStyle: {-->
                <!--normal: { // 系列级个性化，横向渐变填充-->
                  <!--borderRadius: 5,-->
                  <!--color: (function() {-->
                    <!--var zrColor = require('zrender/tool/color')-->
                    <!--return zrColor.getLinearGradient(-->
                      <!--0, 0, 1000, 0,-->
                      <!--[[0, 'rgba(30,144,255,0.8)'], [1, 'rgba(138,43,226,0.8)']]-->
                    <!--)-->
                  <!--})(),-->
                  <!--label: {-->
                    <!--show: true,-->
                    <!--textStyle: {-->
                      <!--fontSize: '20',-->
                      <!--fontFamily: '微软雅黑',-->
                      <!--fontWeight: 'bold'-->
                    <!--}-->
                  <!--}-->
                <!--}-->
              <!--},-->
              <!--data: [-->
                <!--620, 732,-->
                <!--{-->
                  <!--value: 701,-->
                  <!--itemStyle: { normal: { label: { position: 'inside' }}}-->
                <!--},-->
                <!--734, 890, 930, 820-->
              <!--],-->
              <!--markLine: {-->
                <!--data: [-->
                  <!--{ type: 'average', name: '平均值' },-->
                  <!--{ type: 'max' },-->
                  <!--{ type: 'min' }-->
                <!--]-->
              <!--}-->
            <!--}-->
          <!--]-->
        <!--})-->
      <!--}-->
    <!--}-->
  <!--}-->
<!--</script>-->

<!--<style scoped>-->

<!--</style>-->
<template>
  <div :class="className" :style="{height:height,width:width}"></div>
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
        default: '300px'
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
      this.mon = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
      this.pos = [79, 52, 200, 334, 390, 330, 220]
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
            containLabel: true
          },
          xAxis: [{
            type: 'category',
            data: this.mon,
            axisTick: {
              alignWithLabel: true
            }
          }],
          yAxis: [{
            type: 'value',
            axisTick: {
              show: false
            }
          }],
          series: [{
            name: 'pageA',
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
      }
    }
  }
</script>
