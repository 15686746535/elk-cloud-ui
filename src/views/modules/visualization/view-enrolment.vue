<template>
  <div class="view-enrolment view-container">
    <el-row class="enrolment-header">
      <el-radio class="my-view"></el-radio>
      <label>招生人数统计 &nbsp;&nbsp;&nbsp;</label>
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
          <td>人数</td>
          <td v-for='it in zsrslist'>{{it}}</td>
        </tr>
        </tbody>

      </table>
    </el-row>

    <div class="mini-card" >
      <div class="topcard">招生总人数</div>
      <div class="botcard">{{total}}人</div>
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
        <tr v-for="(rank,i) in rankmonth">
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
  * 招生人数统计
  * 页面高度：420px
  * */
  import Echarts from '@/components/Echarts';
  import {queryEnrolment} from '@/api/visualization/api'
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
        total:0
      };
    },
    created() {
      this.init();
    },
    methods: {
      getList(){
        this.loading=true
        var _this = this
        queryEnrolment(this.listQuery).then(res=>{
          if(res.data.code==0){
            let result=res.data.data.factStudent;
            var maxmonth=result[0];
            var secondmonth=result[0];
            var thirdmonth=result[0];
            _this.zsrslist=result;
            _this.loading=false;
            _this.init();
            result.forEach((v)=>{
              _this.total+=v;
              if(v>maxmonth){
                secondmonth=maxmonth;
                maxmonth=v;
              }
              if(v>thirdmonth&&v<secondmonth&&v<maxmonth){
                thirdmonth=v;
              }
            }),
              _this.rankmonth.push(maxmonth,secondmonth,thirdmonth)
              console.log(maxmonth,secondmonth,thirdmonth)
            console.log(this.seriesList)
          }
        })
      },
      init() {

        var data = {
            xData:['1月','2月','3月','4月','5月','6月','7月','8月','9月','10月','11月','12月'], // X轴数据
            yName:'人数',            // Y轴名字
            unit:'人',               // 单位
            mark:100,                // 平均线
            series:[                 // 图形集合
              {
                name:'市场部',
                type:'bar',
                stack:'11',
                color:'#7773ff',
                data:[15,25,40,67,80,88,91,80,99,100,88,99],
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
    height: 440px;


  }
</style>
