<template>
  <div class="view-enrolment view-container">
    <el-row class="enrolment-header">
      <el-radio class="my-view"></el-radio>
      <label>车型招生量统计 &nbsp;&nbsp;&nbsp;</label>
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
          <th>总计</th>
        </tr>
        </thead>
        <tbody>
        <tr>
          <td>C1</td>
          <td v-for='it in c1stList'>{{it}}</td>
          <td>{{c1total}}</td>
        </tr>
        <tr>
          <td>C2</td>
          <td v-for='it in c2stList'>{{it}}</td>
          <td>{{c2total}}</td>
        </tr>
        </tbody>

      </table>
    </el-row>

    <div class="mini-card" >
      <div class="topcard">招生总人数</div>
      <!--<div class="botcard">{{total}}人</div>-->
      <div class="botcard">{{total}}人</div>
    </div>

    <!--<div class="enrolment-rank" >-->
      <!--<table>-->
        <!--<thead>-->
        <!--<tr>-->
          <!--<th>排名</th>-->
          <!--<th>月份</th>-->
        <!--</tr>-->
        <!--</thead>-->
        <!--<tbody>-->
        <!--<tr v-for="(rank,i) in rankmonth">-->
          <!--<td>{{i==0?'第一':1==1?'第二':'第三'}}</td>-->
          <!--<td>{{rank}}</td>-->
        <!--</tr>-->
        <!--</tbody>-->
      <!--</table>-->
    <!--</div>-->
  </div>
</template>

<script>
  /*
  * 招生人数统计
  * 页面高度：420px
  * */
  import Echarts from '@/components/Echarts';
  import {queryCarTypeStatistics} from '@/api/visualization/api'
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
        c1stList: [0,0,0,0,0,0,0,0,0,0,0,0],
        c2stList: [0,0,0,0,0,0,0,0,0,0,0,0],
        rankmonth: ['1月','9月','11月'],
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
        total:0,
        c1total:0,
        c2total:0,
      };
    },
    created() {
      this.getList();
    },
    methods: {
      getList(){
        let _this=this
        var c1=[];
        var c2=[];
        var total=0;
        var c1total=0;
        var c2total=0;
        queryCarTypeStatistics(this.listQuery).then(res=>{
          if(res.data.code==0){
            c1=res.data.data.c1Stu;
            c2=res.data.data.c2Stu;
          }
          _this.c1stList=c1;
          _this.c2stList=c2;

          this.init();
          c1.forEach(function(v,i) {
            total+=(v+c2[i]);
            c1total+=v;
            c2total+=c2[i];
          })
          _this.total=total;
          _this.c1total=c1total;
          _this.c2total=c2total;
        })


        // this.zsrslist=[15,25,40,67,80,88,91,80,99,100,88,99];

      },
      init() {

        var data = {
            xData:['1月','2月','3月','4月','5月','6月','7月','8月','9月','10月','11月','12月'], // X轴数据
            yName:'人数',            // Y轴名字
            unit:'人',               // 单位
            mark:100,                // 平均线
            series:[                 // 图形集合
              {
                name:'C1',
                type:'bar',
                stack:'11',
                color:'#7773ff',
                data:this.c1stList//[15,25,40,67,80,88,91,80,99,100,88,99],
              },
              {
                name:'C2',
                type:'bar',
                stack:'11',
                color:'#f976c6',
                data:this.c2stList//[17,65,80,27,45,88,21,38,72,42,22,41],
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
    height: 480px;


  }
</style>
