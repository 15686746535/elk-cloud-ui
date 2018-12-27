/**
 * 百度统计配置
 * @type {{}}
 */

const ooptions = {
  /**
   * 单柱柱形图
   *
    * @param Ydata Y轴参数 默认全是0
   * @param Xdata X轴参数 默认1-12月
   * @param colors  柱子颜色 默认 #7773ff
   * @param mark 平均线 默认 0
   * @returns {{color: string[], legend: {data: string[]}, tooltip: {trigger: string, axisPointer: {type: string}}, toolbox: {feature: {magicType: {show: boolean, type: string[]}, restore: {show: boolean}, saveAsImage: {show: boolean}}}, grid: {right: string, top: string, left: string, bottom: string, containLabel: boolean}, xAxis: {type: string, data: string[], axisTick: {alignWithLabel: boolean}, splitLine: {show: boolean}, axisLine: {lineStyle: {color: string}}}, yAxis: {type: string, name: string, axisLine: {lineStyle: {color: string}}}, series: *[]}}
   */
  bar:function(Ydata = [0,0,0,0,0,0,0,0,0,0,0,0],
               mark = 0,
               Xdata = ['1月','2月','3月','4月','5月','6月','7月','8月','9月','10月','11月','12月'],
               colors =  ['#7773ff']){
    return {
      color: colors,
      legend:  {
        data:['招生人数']
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
        name:  '人数（人）',
        axisLine: {
          lineStyle: {
            color: '#666'
          }
        }
      },
      series : [
        {
          name:'招生人数',
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
              formatter:  '{name|{c}人}',
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

}


export default ooptions
