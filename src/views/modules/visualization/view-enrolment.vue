<template>
  <div class="view-enrolment">
    <div style="height: 40px;">
      <el-radio class="my-view"></el-radio>招生人数
    </div>
    <echarts :option="option" :width="params.winWidth+'px'" style="height: 280px;"></echarts>
    1111
  </div>
</template>
<script>
  import Echarts from '@/components/Echarts'

  export default {
    name: 'view-enrolment',
    components: {
      Echarts
    },
    props: {
      params: Object
    },
    data (){
      return{
        option:null

      }
    },
    created() {
      this.init()
    },
    methods: {
      init(){
        var  Ydata  =  [40,  55,  80,  90,  80,  100,  50,  65,  85,  90,  85,  90];
        var  Xdata  =  ['1月','2月','3月','4月','5月','6月','7月','8月','9月','10月','11月','12月'];
        var  colors  =  ['#A1D082'];

        this.option  =  {
          color:  colors,
          legend:  {
            data:['转化率']
          },
          tooltip:  {
            trigger:  'axis',
            axisPointer:  {
              type:  'cross'
            }
          },
          grid:  {
            right:  '180px',
            top:'40px',
            left: '30px'
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
            boundaryGap: false,
            type:  'category',
            axisTick:  {  //  设置X轴刻度表示点    为false时间隔表示
              alignWithLabel:  true
            },
            //网格样式
            splitLine: {
              show: true,
              // lineStyle:{
              //   color: colors,
              //   width: 1,
              //   type: 'dashed'
              // }
            },
            axisLine: {
              lineStyle: {
                color: '#666'
              }
            },
            data:  Xdata
          },
          yAxis: {
            type:  'value',
            name:  '转化率(%)',
            min:  0,
            max:  100,
            axisLine: {
              lineStyle: {
                color: '#666'
              }
            }
          },
          series:  [
            {
              name:'转化率',
              type:'line',    //  折线
              smooth:true,      //关键点，为true是不支持虚线，实线就用true
              // symbolSize:  10,//  点的大小
              markPoint: {
                symbol: 'pin', // 'circle', 'rect', 'roundRect', 'triangle', 'diamond', 'pin', 'arrow', path://m 0,0 h 48 v 20 h -30 l -6,10 l -6,-10 h -6 z,  path://m 0,0 h 48 v 20 h -34 l -6,10 l -6,-10 h -2 z
                symbolSize: function(val){
                  return [50,40]
                },
                symbolOffset: ['0', '-10%'],
                // symbolKeepAspect: true,// 如果 symbol 是 path:// 的形式，是否在缩放时保持该图形的长宽比。
                itemStyle:{
                  normal:{
                    label:{
                      distance: 0,
                      formatter: function (data){
                        return data.value+'%';
                      }
                    },
                  }
                },
                data: [
                  {type: 'max', name: '最大值'},
                  {type: 'min', name: '最小值'}
                ]
              },
              markLine:  {  //  平均线
                silent:  true,  //  显示
                data:  [{
                  yAxis:  66    //  平均值
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
                  show:  false,
                  position:  'insideBottom',
                  distance:  16,
                  align:  'center',
                  verticalAlign:  'middle',
                  formatter:  '{name|{c}%}',
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
        }
      }

    }
  }
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  /*主体白色*/
  $White:#fff;
  /*主体红色*/
  $Danger:red;
  /*灰白色*/
  $DDD:#ddd;
  .view-enrolment {
    background: $White;

  }
</style>
