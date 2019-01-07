<template>
  <div class="view-enrolment view-container">
    <el-row class="enrolment-header">
      <el-radio class="my-view"></el-radio>
      <label>招生累计市场占有率 &nbsp;&nbsp;&nbsp;</label>
      <!--<el-select v-model="listQuery.orgId" filterable remote clearable reserve-keyword placeholder="校区"-->
                 <!--style="margin-right: 5px;width: 200px;">-->
        <!--<el-option v-for="campus in campusList" :key="campus.id" :label="campus.name" :value="campus.id"></el-option>-->
      <!--</el-select>-->
      <!--<el-date-picker v-model="listQuery.year" type="year" placeholder="年份"-->
                      <!--style="margin-right: 5px;width: 200px;"></el-date-picker>-->
      <!--<el-button icon="el-icon-search" type="danger" @click="searchList" :loading="loading">确认搜索</el-button>-->
    </el-row>
    <el-row class="enrolment-view">
        <echarts :option="option" :width="width+'px'" style="height: 280px;"></echarts>
    </el-row>

    <div class="mini-card" >
      <div class="topcard">招生总人数</div>
      <!--<div class="botcard">{{total}}人</div>-->
      <div class="botcard">{{zsrsTotal}}人</div>
    </div>

    <div class="enrolment-rank" >
      <table>
        <thead>
        <tr>
          <th>排名</th>
          <th>月份</th>
        </tr>
        </thead>
        <tbody>
        <tr v-for="(rank,i) in rankMonth">
          <td>{{i==0?'第一':1==1?'第二':'第三'}}</td>
          <td>{{rank}}</td>
        </tr>
        </tbody>
      </table>
    </div>
    <el-row class="enrolment-table">
      <table>
        <thead>
        <tr>
          <th>月份</th>
          <th v-for='item in zsmonths'>{{item}}月</th>
          <th>{{listQuery.year}}年</th>
        </tr>
        </thead>
        <tbody>
        <tr>
          <td>招生人数（人）</td>
          <td v-for='it in zsrslist'>{{it}}</td>
         <td>{{zsrsTotal}}</td>
        </tr>
        <tr>.
          <td title="市场总人数（人）"  style="min-width: 105px;overflow: hidden;white-space:nowrap">市场总人数（人）</td>
          <td v-for='it in marketList'>{{it}}</td>
          <td>{{marketTotal}}</td>
        </tr>
        <tr>
          <td >累计占有率(%)</td>
          <td v-for='it in percentList'>{{it}}</td>
          <!--<td>{{totalAvg}}</td>-->
          <td></td>
        </tr>
        </tbody>

      </table>
    </el-row>
  </div>
</template>

<script>
  /*
  * 招生人数统计
  * 页面高度：420px
  * */
  import Echarts from '@/components/Echarts';
  import {queryFactAndMarket} from '@/api/visualization/api'
  import options from  '@/utils/options'
  export default {
    name: "view-enrolment",
    components: {
      Echarts
    },
    props: {
      params: {
        type: Object,
        default: {}
      },
      width: {
        type: Number,
        default: 600
      },
    },
    watch: {
      params: function(val) {
        this.listQuery = val
        this.getList();
      }
    },
    data() {
      return {
        zsmonths: ["一", "二", "三", "四", "五", "六", "七", "八", "九", "十", "十一", "十二"],
        zsrslist: [0,0,0,0,0,0,0,0,0,0,0,0],
        marketList: [0,0,0,0,0,0,0,0,0,0,0,0],
        percentList:[0,0,0,0,0,0,0,0,0,0,0,0],
        zszylList:[0,0,0,0,0,0,0,0,0,0,0,0],
        rankMonth: ['','',''],
        campusList: [
          { name: "壹路校区", id: 1 },
          { name: "华通校区", id: 2 }
        ],
        listQuery: {
          orgId: 4,
          year: 2018
        },
        option:null,
        loading: false,
        zsrsTotal:0,
        marketTotal:0
      };
    },
    created() {
      this.getList();
    },
    methods: {
      getList(){
        let _this=this
        queryFactAndMarket(this.listQuery).then(res=>{
          if(res.data.code==0){
            var zsrsTotal=0;  //招生总人数
            var marketTotal=0;  //市场总人数
            var martketzyTotal=[]; //市场占有率
            var ljwclTotal=[]; //累计完成率
            var targetStudent=[]; //累计完成率
            var zs=0;
            var index=[0,0,0];
            var rank=[];
            var fStudent=[];
            var factStudent=res.data.data.factStudent;
            targetStudent=res.data.data.targetStudent;
            factStudent.forEach(function(v,i) {
              fStudent.push(v);
              zsrsTotal+=v;
              marketTotal+=targetStudent[i];
              zs=((v/targetStudent[i])*100).toFixed(2);
              if(targetStudent[i]==0){
                martketzyTotal.push(0);
              }
              else {martketzyTotal.push((zs));}
              ljwclTotal.push(((zsrsTotal/marketTotal)*100).toFixed(2))
            })
            _this.zsrslist=fStudent;
            _this.marketList=targetStudent;
            _this.zszylList=martketzyTotal;
            _this.zsrsTotal=zsrsTotal;
            _this.marketTotal=marketTotal;
            _this.percentList=ljwclTotal;
            _this.init();

            index.forEach(function(a,b) {
              var maxmonth=0;
              factStudent.forEach(function(v,i) {
                if(v-maxmonth>0)
                {
                  maxmonth=v;
                  index[b]=i;
                }
              })
              factStudent[index[b]]=0;
              rank.push(_this.zsmonths[index[b]])
            })
            _this.rankMonth=rank;
          }
        })
      },
      init() {
        var label={
          normal: {
            show: true,
            position: 'insideBottom',
            distance: 15,
            align: 'left',
            verticalAlign: 'middle',
            rotate:  90,
            formatter:  '{name|{c}'+'%'+'}',
            rich: {
              name: {
                textBorderColor: '#fff'
              }
            }
          }
        }
        var data = {
            xData:['1月','2月','3月','4月','5月','6月','7月','8月','9月','10月','11月','12月'], // X轴数据
            yName:'占有率',            // Y轴名字
            unit:'%',               // 单位
            mark:60,                // 平均线
            series:[                 // 图形集合
              {
                name:'占有率',
                type:'bar',
                stack:'11',
                label:label,
                color:'#ffa351',
                data:this.zszylList//[15,25,40,67,80,88,91,80,99,100,88,99],
              },
              {
                name:'总占有',
                type:'bar',
                stack:'11',
                label:label,
                color:'#a2d27f',
                data:this.percentList//[15,65,80,27,45,88,21,38,72,42,22,41],
              }
            ]
        }
        this.option = options.config(data)
      },
      searchList(){

      }
    }
  }
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  /*主体白色*/
  $White: #fff;
  /*主体红色*/
  $Danger: #c50202;
  /*灰白色*/
  $DDD: #ddd;
  .view-enrolment {
    height: 520px;


  }
</style>
