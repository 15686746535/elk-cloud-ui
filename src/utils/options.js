/**
 * 百度统计配置
 * @type {{}}
 */

const ooptions = {
  /**
   * 单柱柱形图
   *
   * @param Yname  Y轴名字 默认 数量
   * @param Xname  统计图柱子名字
   * @param Ydata  Y轴参数 默认全是0
   * @param Xdata  X轴参数 默认1-12月
   * @param colors 柱子颜色 默认 #7773ff
   * @param mark   平均线 默认 0
   * @param unit   单位 默认 个
   * @returns {{color: string[], legend: {data: *[]}, tooltip: {trigger: string, axisPointer: {type: string}}, toolbox: {feature: {magicType: {show: boolean, type: string[]}, restore: {show: boolean}, saveAsImage: {show: boolean}}}, grid: {right: string, top: string, left: string, bottom: string, containLabel: boolean}, xAxis: {type: string, data: string[], axisTick: {alignWithLabel: boolean}, splitLine: {show: boolean}, axisLine: {lineStyle: {color: string}}}, yAxis: {type: string, name: string, axisLine: {lineStyle: {color: string}}}, series: *[]}}
   */
  bar:function(Yname = '数量',
               Xname  = '柱形统计图',
               Ydata  = [0,0,0,0,0,0,0,0,0,0,0,0],
               Xdata  = ['1月','2月','3月','4月','5月','6月','7月','8月','9月','10月','11月','12月'],
               colors = ['#7773ff'],
               mark   = 0,
               unit   = '个'){
    return {
      color: colors,
      legend:  {
        data:[Xname]
      },
      tooltip : {
        trigger: 'axis',
        axisPointer : {            // 坐标轴指示器，坐标轴触发有效
          type : 'cross'        // 默认为直线，可选为：'line' | 'shadow'
        }
      },
      toolbox:  {
        feature:  {
          magicType:{
            show: true,
            type: ['line',  'bar']
          },
          restore: {show: true},
          saveAsImage: {show: true}
        }
      },
      grid: {
        right:  '160px',
        top:'40px',
        left: '0',
        bottom:'10px',
        containLabel: true
      },
      xAxis : {
        type : 'category',
        data : Xdata,
        axisTick: {alignWithLabel: true},
        splitLine: {show: true},
        axisLine: {
          lineStyle: {
            color: '#666'
          }
        }
      },
      yAxis : {
        type : 'value',
        name:  Yname+'('+unit+')',
        axisLine: {
          lineStyle: {
            color: '#666'
          }
        }
      },
      series : [
        {
          name:Xname,
          type:'bar',
          barWidth: '40%',
          data:Ydata,
          label:  {
            normal:  {
              show:  true,
              position:  'insideTop',
              distance:  -10,
              align:  'center',
              verticalAlign:  'middle',
              formatter:  '{name|{c}'+unit+'}',
              fontSize:  12,
              rich:  {
                name:  {
                  color:'#000',
                  textBorderColor:'#fff'
                }
              }
            }
          },
          markLine:  {  //  平均线
            silent:  true,  //  显示
            data:  [{
              yAxis:  mark    //  平均值
            }]
          },
        }
      ]
    };
  },
  bars:function (Yname = '数量',
                 Xname  = '曲线统计图',
                 Ydata  = [0,0,0,0,0,0,0,0,0,0,0,0],
                 Xdata  = ['1月','2月','3月','4月','5月','6月','7月','8月','9月','10月','11月','12月'],
                 colors = ['#7773ff'],
                 mark   = 0,
                 unit   = '个') {
    return null;
  },
  /**
   * 单曲线形图
   *
   * @param Yname  Y轴名字 默认 数量
   * @param Xname  统计图柱子名字
   * @param Ydata  Y轴参数 默认全是0
   * @param Xdata  X轴参数 默认1-12月
   * @param colors 柱子颜色 默认 #7773ff
   * @param mark   平均线 默认 0
   * @param unit   单位 默认 个
   * @returns {{color: string[], legend: {data: *[]}, tooltip: {trigger: string, axisPointer: {type: string}}, toolbox: {feature: {magicType: {show: boolean, type: string[]}, restore: {show: boolean}, saveAsImage: {show: boolean}}}, grid: {right: string, top: string, left: string, bottom: string, containLabel: boolean}, xAxis: {type: string, data: string[], axisTick: {alignWithLabel: boolean}, splitLine: {show: boolean}, axisLine: {lineStyle: {color: string}}}, yAxis: {type: string, name: string, axisLine: {lineStyle: {color: string}}}, series: *[]}}
   */
  line:function (Yname = '数量',
                 Xname  = '曲线统计图',
                 Ydata  = [0,0,0,0,0,0,0,0,0,0,0,0],
                 Xdata  = ['1月','2月','3月','4月','5月','6月','7月','8月','9月','10月','11月','12月'],
                 colors = ['#7773ff'],
                 mark   = 0,
                 unit   = '个') {
    return {
      color:  colors,
      legend:  {
        data:[Xname]
      },
      tooltip:  {
        trigger:  'axis',
        axisPointer:  {
          type:  'cross'
        }
      },
      grid:  {
        right:  '160px',
        top:'40px',
        left: '0',
        bottom:'10px',
        containLabel: true
      },
      toolbox:  {
        feature:  {
          magicType:{
            show: true,
            type: ['line',  'bar']
          },
          restore: {show: true},
          saveAsImage: {show: true}
        }
      },
      xAxis: {
        // boundaryGap: false,
        type:  'category',
        axisTick:  {  //  设置X轴刻度表示点    为false时间隔表示
          alignWithLabel:  true
        },
        //网格样式
        splitLine: { show: true },
        axisLine: {
          lineStyle: {
            color: '#666'
          }
        },
        data:  Xdata
      },
      yAxis: {
        type:  'value',
        name:  Yname+'('+unit+')',
        axisLine: {
          lineStyle: {
            color: '#666'
          }
        }
      },
      series:  [
        {
          name:Xname,
          type:'line',    //  折线
          smooth:true,      //关键点，为true是不支持虚线，实线就用true
          // symbolSize:  10,//  点的大小
          // markPoint: {
          //   symbol: 'pin', // 'circle', 'rect', 'roundRect', 'triangle', 'diamond', 'pin', 'arrow', path://m 0,0 h 48 v 20 h -30 l -6,10 l -6,-10 h -6 z,  path://m 0,0 h 48 v 20 h -34 l -6,10 l -6,-10 h -2 z
          //   symbolSize: function(val){
          //     return [50,40]
          //   },
          //   symbolOffset: ['0', '-10%'],
          //   // symbolKeepAspect: true,// 如果 symbol 是 path:// 的形式，是否在缩放时保持该图形的长宽比。
          //   itemStyle:{
          //     normal:{
          //       label:{
          //         distance: 0,
          //         formatter: function (data){
          //           return data.value+'%';
          //         }
          //       },
          //     }
          //   },
          //   data: [
          //     {type: 'max', name: '最大值'},
          //     {type: 'min', name: '最小值'}
          //   ]
          // },
          markLine:  {  //  平均线
            silent:  true,  //  显示
            data:  [{
              yAxis:  mark    //  平均值
            }],
            lineStyle: { // 线的样式
              normal: {
                color: 'red', // 线条颜色
                width:1,// 线条粗细
              }}
          },
          lineStyle: { // 线的样式
            normal: {
              //color: 'green', // 线条颜色
              width: 6,// 线条粗细
              // type: 'dashed' //'dotted'虚线 'solid'实线
            }
          },
          label:  {
            normal:  {
              show:  true,
              position:  'insideTop',
              distance:  -10,
              align:  'center',
              verticalAlign:  'middle',
              formatter:  '{name|{c}'+unit+'}',
              fontSize:  12,
              rich:  {
                name:  {
                  color:'#000',
                  textBorderColor:'#fff'
                }
              }
            }
          },
          data:Ydata
        }
      ]
    };
  }

}

export default ooptions
