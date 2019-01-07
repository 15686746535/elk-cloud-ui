/**
 *
 * @param Xname
 * @param Ydata
 * @param unit
 * @param mark
 * @returns {{name: *, type: string, barWidth: string, data: *, markPoint: {symbol: string, symbolSize: markPoint.symbolSize, symbolOffset: string[], itemStyle: {normal: {label: {distance: number, formatter: markPoint.itemStyle.normal.label.formatter}}}, data: *[]}, label: {normal: {show: boolean, position: string, distance: number, align: string, verticalAlign: string, formatter: string, fontSize: number, rich: {name: {color: string, textBorderColor: string}}}}, markLine: {silent: boolean, data: *[]}}}
 */
var option = function (type, Yname, Xname, Ydata, Xdata, colors, mark, unit) {
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
      right:  '0px',
      top:'40px',
      left: '0',
      bottom:'10px',
      containLabel: true
    },
    toolbox:  {
      // feature:  {
      //   magicType:{
      //     show: true,
      //     type: ['line',  'bar']
      //   },
      //   myTool: {},
      //   saveAsImage: {show: true}
      // }
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
      // min:  0,
      // max:  100,
      axisLine: {
        lineStyle: {
          color: '#666'
        }
      }
    },
    series:  [
      {
        name:Xname,
        type:type,
        barWidth: '40%',
        data:Ydata,
        markPoint: {
          symbol: 'pin', // 'circle', 'rect', 'roundRect', 'triangle', 'diamond', 'pin', 'arrow', path://m 0,0 h 48 v 20 h -30 l -6,10 l -6,-10 h -6 z,  path://m 0,0 h 48 v 20 h -34 l -6,10 l -6,-10 h -2 z
          symbolSize: function(val){
            return [50,40]
          },
          symbolOffset: ['0', '-10%'],
          itemStyle:{
            normal:{
              label:{
                distance: 0,
                formatter: function (data){
                  return data.value+unit;
                }
              },
            }
          },
          data: [{type: 'max', name: '最大值'}]
        },
        label:  {
          normal:  {
            show:  false,
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
}

/**
 *
 * @param Xname
 * @param type
 * @param Ydata
 * @param unit
 * @param mark
 * @param smooth
 * @param lineStyle
 * @returns {{name: *, type: *, barWidth: string, data: *, markPoint: {symbol: string, symbolSize: markPoint.symbolSize, symbolOffset: string[], itemStyle: {normal: {label: {distance: number, formatter: markPoint.itemStyle.normal.label.formatter}}}, data: *[]}, label: {normal: {show: boolean, position: string, distance: number, align: string, verticalAlign: string, formatter: string, fontSize: number, rich: {name: {color: string, textBorderColor: string}}}}, markLine: {silent: boolean, data: *[]}}}
 */
var serie = function (yName,type,xData,smooth,lineWidth,lineType,stack,unit,mark,label) {

  return {
    name:yName || '',
    type:type || 'bar',
    barGap: 0,
    stack: stack,
    barWidth: '40%',
    data:xData || [],
    smooth:smooth,
    lineStyle: { // 线的样式
      normal: {
        width: lineWidth || 6,// 线条粗细
        type: lineType || 'solid' //'dotted'虚线 'solid'实线
      }
    },
    markPoint: {
      symbol: 'pin', // 'circle', 'rect', 'roundRect', 'triangle', 'diamond', 'pin', 'arrow', path://m 0,0 h 48 v 20 h -30 l -6,10 l -6,-10 h -6 z,  path://m 0,0 h 48 v 20 h -34 l -6,10 l -6,-10 h -2 z
      // symbolSize: function(val){
      //   return [50,40]
      // },
      symbolOffset: ['0', '-10%'],
      itemStyle:{
        normal:{
          label:{
            distance: 0,
            formatter: function (data){
              return data.value+unit;
            }
          },
        }
      },
      data: []
    },
    label:  label|| {
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
        yAxis:  mark || 0    //  平均值
      }],
      lineStyle: { // 线的样式
        normal: {
          color: '#c50202', // 线条颜色
          width:1,// 线条粗细
        }
      }
    },
  }
}
var icon = 'path://M432.45,595.444c0,2.177-4.661,6.82-11.305,6.82c-6.475,0-11.306-4.567-11.306-6.82s4.852-6.812,11.306-6.812C427.841,588.632,432.452,593.191,432.45,595.444L432.45,595.444z M421.155,589.876c-3.009,0-5.448,2.495-5.448,5.572s2.439,5.572,5.448,5.572c3.01,0,5.449-2.495,5.449-5.572C426.604,592.371,424.165,589.876,421.155,589.876L421.155,589.876z M421.146,591.891c-1.916,0-3.47,1.589-3.47,3.549c0,1.959,1.554,3.548,3.47,3.548s3.469-1.589,3.469-3.548C424.614,593.479,423.062,591.891,421.146,591.891L421.146,591.891zM421.146,591.891';

/**
 * 百度统计配置
 * @type {{}}
 */
const options = {
  /**
   * @param data = {
   *    xData:['1月','2月',...], // X轴数据
   *    yName:'数量',            // Y轴名字
   *    unit:'个',               // 单位
   *    mark:100,                // 平均线
   *    series:[                 // 图形集合
   *     {
   *        name:'统计图',       // 名字
   *        type:'bar',          // 图形类型 柱形bar   折线 line
   *        stack:'统计图1',     // 堆叠
   *        smooth:true,         // 曲线类型 true平滑的  false折线
   *        lineWidth:6,         // 曲线宽度 数字类型
   *        lineType:'dashed',   // 曲线样式 'dotted'虚线 'solid'实线
   *        data:[12,34,...]，   // 数据集合 个数与xData对应
   *        color:''             // 柱子颜色
   *      }
   *   ]
   * }
   * @returns {{color: Array, legend: {data: Array}, tooltip: {trigger: string, axisPointer: {type: string}}, grid: {right: string, top: string, left: string, bottom: string, containLabel: boolean}, toolbox: {feature: {magicType: {show: boolean, type: string[]}, myTool: {}, saveAsImage: {show: boolean}}}, xAxis: {type: string, axisTick: {alignWithLabel: boolean}, splitLine: {show: boolean}, axisLine: {lineStyle: {color: string}}, data: *}, yAxis: {type: string, name: string, axisLine: {lineStyle: {color: string}}}, series: Array}}
   */
  config:function (data) {
    var series = [];
    var legend = [];
    var colors = [];
    data.series.forEach(function (v,i) {
      series.push(serie(v.name,v.type,v.data,v.smooth,v.lineWidth,v.lineType,v.stack,data.unit,data.mark,v.label));
      legend.push(v.name);
      colors.push(v.color);
    })

    return {
      color: colors,
      legend:  {
        data:legend
      },
      tooltip:  {
        trigger:  'axis',
        axisPointer:  {
          type:  'cross'
        }
      },
      grid:  {
        right:  '140px',
        top:'50px',
        left: '0',
        bottom:'0px',
        containLabel: true
      },
      toolbox:  {
        feature:  {
          magicType:{
            show: true,
            type: ['line',  'bar']
          },
          myTool: {
            show: true,//是否显示
            title: '显示数值', //鼠标移动上去显示的文字
            icon: icon,
            option: {}
          },
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
        data:  data.xData
      },
      yAxis: {
        type:  'value',
        name:  data.yName+'('+data.unit+')',
        axisLine: {
          lineStyle: {
            color: '#666'
          }
        }
      },
      series:  series
    };
  },
  bar:function(Yname = '数量',
               Xname  = '柱形统计图',
               Ydata  = [0,0,0,0,0,0,0,0,0,0,0,0],
               Xdata  = ['1月','2月','3月','4月','5月','6月','7月','8月','9月','10月','11月','12月'],
               colors = ['#7773ff'],
               mark   = 0,
               unit   = '个'){
    return option('bar',Yname, Xname, Ydata, Xdata, colors, mark, unit);
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
    return option('line',Yname, Xname, Ydata, Xdata, colors, mark, unit);
  },
  /**
   * 计算同比增长率
   * @param currList
   * @param lastList
   * @param list
   * @param cumulativeList
   */
  growthRate:function (currList,lastList) {
    // 同比增长率
    var list = [];
    // 累计同比增长率
    var cumulativeList = [];
    // 今年累计
    var currCount = 0;
    // 去年累计
    var lastCount = 0;
    // 循环今年
    var last,growth,cumulativeGrowth,rate,cumulativeRate;
    currList.forEach(function (curr,i) {
      // 往期
      last = lastList[i];
      // 本期累计
      currCount += curr;
      // 往期累计
      lastCount += last;
      // 增长量 = 本期-往期
      growth = curr - last;
      // 累计增长量 = 本期累计 - 往期累计
      cumulativeGrowth = currCount - lastCount;

      if (last == 0) {
        // 往期0处理 同比增长率 = 本期 * 100
        rate = (curr*100).toFixed(2);
      } else if (curr == 0){
        // 本期0处理    同比增长率 = -(往期 * 100)
        rate = -(last*100).toFixed(2);
      } else {
        // 同比增长率=（本期-往期）÷往期x100%
        rate = (growth/last*100).toFixed(2);
      }

      if (lastCount == 0) {
        // 往期累计0处理 同比累计增长率 = 本期累计 * 100%
        cumulativeRate = (currCount*100).toFixed(2);
      } else if (currCount == 0){
        // 本期累计0处理    同比累计增长率 = -(往期累计 * 100%)
        cumulativeRate = -(lastCount*100).toFixed(2);
      } else {
        // 同比累计增长率=（当年的指标值-去年同期的值）÷去年同期的值x100%
        cumulativeRate = (cumulativeGrowth/lastCount*100).toFixed(2);
      }
      list.push(rate);
      cumulativeList.push(cumulativeRate);
    });
    return {
      list:list,
      cumulativeList:cumulativeList
    }
  },
  _SUM:function (list){
    var count = 0;
    list.forEach(function (v,i) {
      count += v;
    })
    return count;
  },


}

export default options
