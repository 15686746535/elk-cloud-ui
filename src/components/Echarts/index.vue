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
        var icon = 'path://M432.45,595.444c0,2.177-4.661,6.82-11.305,6.82c-6.475,0-11.306-4.567-11.306-6.82s4.852-6.812,11.306-6.812C427.841,588.632,432.452,593.191,432.45,595.444L432.45,595.444z M421.155,589.876c-3.009,0-5.448,2.495-5.448,5.572s2.439,5.572,5.448,5.572c3.01,0,5.449-2.495,5.449-5.572C426.604,592.371,424.165,589.876,421.155,589.876L421.155,589.876z M421.146,591.891c-1.916,0-3.47,1.589-3.47,3.549c0,1.959,1.554,3.548,3.47,3.548s3.469-1.589,3.469-3.548C424.614,593.479,423.062,591.891,421.146,591.891L421.146,591.891zM421.146,591.891';
        var option = _this.option
        option.toolbox.feature.myTool = {//自定义按钮 danielinbiti,这里增加，selfbuttons可以随便取名字
            show: true,//是否显示
            title: '显示数值', //鼠标移动上去显示的文字
            icon: icon,
            option: {},
            onclick: function (option1) {//点击事件,这里的option1是chart的option信息
              var show = option.series[0].label.normal.show;
              option.series.forEach(function (v) {
                v.markPoint.data = show?[{type: 'max', name: '最大值'}]:[];
                v.label.normal.show = !show;
              });
              _this.chart.clear();
              _this.chart.setOption(option);
            }
        }
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
