<template>
  <div class="view-enrolment">
    <el-row class="enrolment-header">
      <el-radio class="my-view"></el-radio>
      <label>招生人数 &nbsp;&nbsp;&nbsp;</label>
      <el-select v-model="listQuery.orgId" filterable remote clearable reserve-keyword placeholder="校区"
                 style="margin-right: 5px;width: 200px;">
        <el-option v-for="campus in campusList" :key="campus.id" :label="campus.name" :value="campus.id"></el-option>
      </el-select>
      <el-date-picker v-model="listQuery.year" type="year" placeholder="年份"
                      style="margin-right: 5px;width: 200px;"></el-date-picker>
      <el-button icon="el-icon-search" type="danger" @click="searchList" :loading="loading">确认搜索</el-button>
    </el-row>
    <el-row class="enrolment-view">
        <echarts :option="option" :width="width+'px'" style="height: 280px;"></echarts>
    </el-row>
    <el-row class="enrolment-table">
      <table>
        <thead>
        <tr>
          <th>月份</th>
          <th v-for='item in zsmonths'>{{item}}</th>
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
      <div class="topcard"><span style="position: relative;margin-left: 20px;top: 15px;color: #fff">招生人数</span></div>
      <div class="botcard"><span style="position: relative;margin-left: 20px;top: 15px;text-align: center">72062人</span></div>
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
        <tr>
          <td>第一</td>
          <td>三</td>
        </tr>
        <tr>
          <td>第二</td>
          <td>七</td>
        </tr>
        <tr>
          <td>第三</td>
          <td>十一</td>
        </tr>

        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
  import Echarts from '@/components/Echarts';
  import {queryEnrolment} from '@/api/visualization/api'
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
    data() {
      return {
        zsmonths: ["一", "二", "三", "四", "五", "六", "七", "八", "九", "十", "十一", "十二"],
        zsrslist: [0,0,0,0,0,0,0,0,0,0,0,0],
        ranks: ["第一", "第二", "第三"],
        rankmonth: ["3月份", "7月份", "11月份"],
        seriesList:[15,25,40,67,80,88,91,80,99,100,102,130],
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
      };
    },
    created() {
      this.getList();
    },
    methods: {
      getList(){
        this.loading=true
        var _this = this
        queryEnrolment(this.listQuery).then(res=>{
          if(res.data.code==0){
            _this.zsrslist=res.data.data.factStudent;
            _this.loading=false;
            _this.init();
            console.log(this.seriesList)
          }
        })
      },
      init(){
        var  Ydata  = this.zsrslist //[15,25,40,67,80,88,91,80,99,100,102,130];
        var  Xdata  = ['1月','2月','3月','4月','5月','6月','7月','8月','9月','10月','11月','12月'];
        var  colors  =  ['#7773ff'];
        var  title  =  '';
        var  subTitle  =  '';
        var  mark  =  400;
        this.option = {
            color: colors,
            tooltip : {
              trigger: 'axis',
              axisPointer : {            // 坐标轴指示器，坐标轴触发有效
                type : 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
              }
            },
            grid: {
              right:  '180px',
              top:'40px',
              left: '30px',
              containLabel: true
            },
            xAxis : [
              {
                type : 'category',
                data : Xdata,
                axisTick: {
                  alignWithLabel: true
                }
              }
            ],
            yAxis : [
              {
                type : 'value',
                name:  '人数（人）'
              }
            ],
            series : [
              {
                name:'招生人数',
                type:'bar',
                barWidth: '30%',
                data:Ydata,
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
    background: $White;
    position: relative;
    height: 420px;
    width: 100%;

    .enrolment-header {
      position: absolute;
      height: 40px;
      width: 100%;
      top: 0;
      left: 0;

      .el-button--danger {
        color: #fff;
        background-color: $Danger !important;
        border-color: $Danger !important;
      }
    }

    .enrolment-view {
      position: absolute;
      top: 50px;
      left: 0;
      width: 100%;
      height: 285px;
    }

    .enrolment-table {
      position: absolute;
      bottom: 0;
      left: 0;
      height: 75px;
      width: 100%;
      padding-left: 29px;
    }

    .enrolment-rank {
      position: absolute;
      top: 200px;
      right: 0;
    }

    table {
      border-collapse: collapse;
      border-spacing: 0;
      border: 1px solid #ccc;
      border-radius: 6px;
      font-family: Arial, Helvetica, sans-serif;
      font-size: 14px;
      color: #444;
      border: 1px solid #ccc;
      border-radius: 6px;

      th, td {
        border-left: 1px solid #ccc;
        border-bottom: 1px solid #ccc;
        padding: 10px;
        text-align: center;
      }

      tr:hover {
        background-color: #fbf8e9;
        transition: all 0.1s ease-in-out;
      }

    }

    .mini-card {
      position: absolute;
      right: 0px;
      top: 99px;
      .topcard {
        width: 100px;
        height: 40px;
        /*box-shadow: 0 2px 2px 0 rgba(0, 0, 0, 0.2);*/
        border-radius: 15px 15px 0 0;
        background: $Danger;
      }

      .botcard {
        width: 100px;
        height: 40px;
        box-shadow: 0 2px 2px 0 rgba(0, 0, 0, 0.2);
        border-radius: 0 0 15px 15px;
      }
    }
  }
</style>
