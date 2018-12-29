<template>
  <div class="view-enrolment">
    <el-row class="enrolment-header">
      <el-radio class="my-view"></el-radio>
      <label>人均产值 &nbsp;&nbsp;&nbsp;</label>
      <el-select v-model="listQuery.campus" filterable remote clearable reserve-keyword placeholder="校区"
                 style="margin-right: 5px;width: 200px;">
        <el-option v-for="campus in campusList" :key="campus.id" :label="campus.name" :value="campus.id"></el-option>
      </el-select>
      <el-date-picker v-model="listQuery.year" type="year" placeholder="年份"
                      style="margin-right: 5px;width: 200px;"></el-date-picker>
      <el-button icon="el-icon-search" type="danger">确认搜索</el-button>
    </el-row>
    <el-row class="enrolment-view">
      <echarts :option="option" :width="width+'px'" style="height: 280px;"></echarts>
      <div class="enrolment-rank">
        <table>
          <thead>
          <tr>
            <th>排名</th>
            <th>月份</th>
          </tr>
          </thead>
          <tbody>
          <tr>
            <td>第一名</td>
            <td>三月份</td>
          </tr>
          <tr>
            <td>第二名</td>
            <td>七月份</td>
          </tr>
          <tr>
            <td>第三名 </td>
            <td>十一月份</td>
          </tr>

          </tbody>
        </table>
      </div>
    </el-row>
    <el-row class="enrolment-table">
      <table>
        <thead>
        <tr>
          <th>月份</th>
          <th v-for='item in gdpMonths'>{{item}}</th>
          <th>总计</th>
        </tr>
        </thead>
        <tbody>
        <tr>
          <td>招生金额</td>
          <td v-for='it in factMoney'>{{it}}</td>
        </tr>
        <tr>
          <td>当月员工数</td>
          <td v-for='it in factEmployee'>{{it}}</td>
        </tr>
        <tr>
          <td>人均产值</td>
          <td v-for='it in percentList'>{{it}}</td>
        </tr>
        </tbody>

      </table>
    </el-row>

    <!--<div class="mini-card">-->
      <!--<div class="topcard"><span style="position: relative;margin-left: 10px;top: 15px;color: #fff">招生总人数</span></div>-->
      <!--<div class="botcard"><span style="position: relative;margin-left: 20px;top: 15px">72062人</span></div>-->
    <!--</div>-->
  </div>
</template>

<script>
  /*
  * 人均产值统计
  * 页面高度：420px
  * */
  import Echarts from '@/components/Echarts';
  import {queryGDP} from '@/api/visualization/api'
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
    data() {
      return {
        year:null,
        gdpMonths: ["一", "二", "三", "四", "五", "六", "七", "八", "九", "十", "十一", "十二"],
        percentList: [],
        factEmployee:[],
        factMoney:[],
        rankMonth: [],
        campusList: [
          { name: "壹路校区", id: 1 },
          { name: "华通校区", id: 2 }
        ],
        listQuery: {
          orgId: 4,
          year: 2018
        },
        // lastQuery:{},
        option:null,
        loading: false,
        total:0
      };
    },
    created() {
      this.getList();
    },
    methods: {
      getList(){
        let _this=this
        queryGDP(this.listQuery).then(res=>{
          if(res.data.code==0){
            console.log("res",res)
            _this.factEmployee=res.data.data.factEmployee
            _this.factMoney=res.data.data.factMoney
            console.log( _this.factEmployee,_this.factMoney)
            let index=0;
            _this.factEmployee.forEach(v=>{
              let rate=(_this.factMoney[index]/v).toFixed(2)
              _this.percentList.push(rate)
              console.log("人均产值",v)
              rate++;

            })
            _this.init();

          }
        })
      },
      init() {
        var  Yname = '百分比';
        var  Xname = '月份';
        var  Ydata  = this.percentList//[15,25,40,67,80,88,91,80,99,100,102,130];
        var  Xdata  = ['1月','2月','3月','4月','5月','6月','7月','8月','9月','10月','11月','12月'];
        var  colors  =  ['#a2d27f'];
        var  mark  =  36;
        var  unit  =  '%';
        this.option = options.line(Yname,Xname,Ydata,Xdata,colors,mark,unit)
      },

    }
  };
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
        }

        tr:hover {
          background-color: #fbf8e9;
          transition: all 0.1s ease-in-out;
        }

      }
    }

    .enrolment-rank {
      position: absolute;
      top: 100px;
      right: 10px;
      /*height: 75px;*/
      /*width: 100%;*/

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
        }

        tr:hover {
          background-color: #fbf8e9;
          transition: all 0.1s ease-in-out;
        }

      }
    }

    .mini-card {
      position: absolute;
      right: 10px;
      top:50px;
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
