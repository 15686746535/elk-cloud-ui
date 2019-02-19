<template>
  <div class="view-enrolment view-container">
    <el-row class="enrolment-header">
      <el-radio class="my-view"></el-radio>
      <label>招生金额统计 &nbsp;&nbsp;&nbsp;</label>
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
    <el-row class="enrolment-table">
      <table>
        <thead>
        <tr>
          <th>月份</th>
          <th v-for='item in zsmonths'>{{item}}<span >月</span></th>
        </tr>
        </thead>
        <tbody>
        <tr>
          <td title="金额(万)">金额(万)</td>
          <td v-for='it in zsjelist'>{{it}}</td>
        </tr>
        </tbody>

      </table>
    </el-row>

    <div class="mini-card" >
      <div class="topcard">招生总金额</div>
      <div class="botcard">{{total}}万</div>
      <!--<div class="botcard">{{// options._SUM(zsjelist)}}元</div>-->
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
        <tr v-for="(rank,i) in rankmouth">
          <td>{{i==0?'第一':1==1?'第二':'第三'}}</td>
          <td>{{rank}}</td>
        </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
  /*
  * 招生金额统计
  * 页面高度：420px
  * */
  import Echarts from '@/components/Echarts';
  import {queryFactMoneyCount} from '@/api/visualization/api'
  import options from  '@/utils/options'
  export default {
    name: 'view-money',
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
    data (){
      return{
        zsmonths: ["一", "二", "三", "四", "五", "六", "七", "八", "九", "十", "十一", "十二"],
        zsjelist: [0,0,0,0,0,0,0,0,0,0,0,0],
        rankmouth:["","",""],
        campusList:[
          { name:"壹路校区", id: 1 },
          { name:"华通校区", id: 2 }
        ],
        listQuery: {
          orgId: 4,
          year: 2018
        },
        option:null,
        loading: false,
        total:0
      }
    },
    created() {
      this.getList();
    },
    methods: {
      getList(){
        var _this = this
        queryFactMoneyCount(this.listQuery).then(res=>{
          if(res.data.code==0){
            var factMoney=res.data.data.factMoney;
            let result=res.data.data.factMoney;
            var fmoney=[]
            var index=[0,0,0];
            var rank=[];
            var totalmoney=0.0;
            _this.loading=false;
            factMoney.forEach( v=> {
              if(v!=0)
              {
                fmoney.push(v/10000).toFixed(2);
              }
              else {
                fmoney.push(v);
              }
              totalmoney+=parseFloat((v/10000).toFixed(2));
            })
            index.forEach(function(a,b) {
              var maxmonth=0;
              result.forEach(function(v,i) {
                if(v>maxmonth)
                {
                  maxmonth=v;
                  index[b]=i;
                }
              })
              result[index[b]]=0;
              rank.push(_this.zsmonths[index[b]])

            })
            _this.zsjelist=fmoney;
            _this.rankmouth=rank;
            _this.total=totalmoney.toFixed(2);
            _this.init();
          }
        })
        this.init();

      },
      init() {
        var data = {
          xData:['1月','2月','3月','4月','5月','6月','7月','8月','9月','10月','11月','12月'], // X轴数据
          yName:'万元',            // Y轴名字
          unit:'万',               // 单位
          mark:88,                // 平均线
          series:[                 // 图形集合
            {
              name:'今年',
              type:'line',
              smooth:false,
              lineWidth:3,
              color:'#f976c6',
              data:this.zsjelist
            },
          ]
        }
        this.option = options.config(data)
      },
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
    height: 460px;
  }
</style>
