<template>
  <div class="view-enrolment view-container">
    <el-row class="enrolment-header">
      <el-radio class="my-view"></el-radio>
      <label>月度招生车管所占有率 &nbsp;&nbsp;&nbsp;</label>
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
      <div class="botcard">{{totalNum}}人</div>
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
          <td v-for='it in factStudent'>{{it}}</td>
          <!--<td>{{totalNum}}</td>-->
          <td>{{totalNum}}</td>
        </tr>
        <tr>
          <td title="车管所总额"  style="min-width: 105px;overflow: hidden;white-space:nowrap">车管所总额</td>
          <td v-for='it in vehicleStudent'>{{it}}</td>
          <!--<td>{{totalAvg}}</td>-->
          <td>{{totalVehicle}}</td>
        </tr>
        <tr>
          <td >占有率</td>
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
  * 车管所占有率统计
  * 页面高度：420px
  * */
  import Echarts from '@/components/Echarts';
  import {queryFactAndOffice} from '@/api/visualization/api'
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
        percentList: [0,0,0,0,0,0,0,0,0,0,0,0],
        vehicleStudent:[0,0,0,0,0,0,0,0,0,0,0,0],
        factStudent:[0,0,0,0,0,0,0,0,0,0,0,0],
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
        totalVehicle:0,
        totalNum:0,
      };
    },
    created() {
      this.getList();
    },
    methods: {
      getList(){
        let _this=this
        queryFactAndOffice(this.listQuery).then(res=>{
          if(res.data.code==0){
            console.log("res",res)
            var factStudent = [];  //招生人数
            var fStudent = [];  //招生人数
            var vehicle = [];  //车管所总招生人数
            var percentList = []; //占有率
            var totalNum = 0;  //招生总人数
            var totalVehicle = 0; //车管所总人数
            var fStudent=[];
            var index=[0,0,0];
            var rank=[];
            factStudent=res.data.data.factStudent;
            vehicle=res.data.data.targetStudent;
            factStudent.forEach(function(v,i) {
              fStudent.push(v);
              totalNum+=v;
              totalVehicle+=vehicle[i];
              if(vehicle[i]!=0){
                percentList.push(((v/vehicle[i])*100).toFixed(2));
              }
              else {percentList.push(0);}
            })
            _this.factStudent=fStudent;
            _this.vehicleStudent=res.data.data.targetStudent;
            _this.totalVehicle=totalVehicle;
            _this.totalNum=totalNum;
            _this.percentList=percentList;
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

        var data = {
          xData:['1月','2月','3月','4月','5月','6月','7月','8月','9月','10月','11月','12月'], // X轴数据
          yName:'占有率',            // Y轴名字
          unit:'%',               // 单位
          mark:64,                // 平均线
          series:[                 // 图形集合
            {
              name:'市场占有率',
              type:'line',
              smooth:true,
              stack:'11',
              color:'#f976c6',
              data:this.percentList//[15,25,40,67,80,88,91,80,99,100,88,99],
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
