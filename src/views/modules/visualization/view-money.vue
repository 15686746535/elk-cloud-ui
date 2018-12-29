<template>
  <div id="view-totalmoney view-container">
    <el-row class="totalmoney-header">
      <el-radio class="my-view"></el-radio>
      <label>招生金额 &nbsp;&nbsp;&nbsp;</label>
      <el-select  v-model="listQuery.campus" filterable remote clearable reserve-keyword placeholder="校区" style="margin-right: 5px;width: 200px;">
        <el-option v-for="campus in campusList" :key="campus.id" :label="campus.name" :value="campus.id"></el-option>
      </el-select>
      <el-date-picker v-model="listQuery.year" type="year" placeholder="年份" style="margin-right: 5px;width: 200px;"></el-date-picker>
      <el-button icon="el-icon-search" type="danger">确认搜索</el-button>
    </el-row>
    <el-row class="totalmoney-view">
      <echarts :option="option" :width="width+'px'" style="height: 280px;"></echarts>
    <div class="totalmoney-rank">
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
          <td>{{rankmouth[0]}}</td>
        </tr>
        <tr>
          <td>第二名</td>
          <td>{{rankmouth[1]}}</td>
        </tr>
        <tr>
          <td>第三名 </td>
          <td>{{rankmouth[2]}}</td>
        </tr>

        </tbody>
      </table>
    </div>
    </el-row>
    <el-row class="totalmoney-table">
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
            <td>招生人数</td>
            <td v-for='it in zsjelist'>{{it}}</td>
          </tr>
          </tbody>

        </table>
      </el-row>
    </el-row>

    <div class="rightcard">
    <div class="topcard">招生总金额
    </div>
    <div class="botcard">{{total}}元</div>
    </div>
  </div>
</template>

<script>
  /*
  * 招生金额统计
  * 页面高度：420px
  * */
  import Echarts from '@/components/Echarts';
  import {queryEnrolment} from '@/api/visualization/api'
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
        zsmonths: ["一月", "二月", "三月", "四月", "五月", "六月", "七月", "八月", "九月", "十月", "十一月", "十二月"],
        zsjelist: [0,0,0,0,0,0,0,0,0,0,0,0],
        rankmouth:[],
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
      this.init();
    },
    methods: {
      getList(){
        this.loading=true
        var _this = this
        queryEnrolment(this.listQuery).then(res=>{
          if(res.data.code==0){
            let result=res.data.data.factMoney;
            var fromindex1=0;
            var fromindex2=0;
            var fromindex3=0;
            var maxmonth=result[0];
            var secondmonth=result[0];
            var thirdmonth=result[0];
            _this.zsjelist=result;
            _this.loading=false;
            _this.init();
            result.forEach((v)=>{
              _this.total+=v;
              if(v>=maxmonth){
                maxmonth=v;
                ++fromindex1;
              }
              if(v>=secondmonth&&v<maxmonth){
                secondmonth=v;
                ++fromindex2;
              }
              if(v>=thirdmonth&&v<secondmonth&&v<maxmonth){
                thirdmonth=v;
                ++fromindex3;
              }
            }),
              _this.rankmouth.push(_this.zsmonths[fromindex1],_this.zsmonths[fromindex2],_this.zsmonths[fromindex3]);//
            console.log(this.rankmouth)
          }
        })
      },
      init(){
        var  Yname='金额'
        var  Xname='招生总金额'
        var  Ydata  =this.zsjelist //[15,25,40,67,80,88,91,80,99,100,102,130];
        var  Xdata  = ['1月','2月','3月','4月','5月','6月','7月','8月','9月','10月','11月','12月'];
        var  colors  =  ['#f976c6'];
        var  mark  =  700000;
        var  unit  =  '元';
        this.option = options.bar(Yname,Xname,Ydata,Xdata,colors,mark,unit)
      },
    }
  }
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  /*主体白色*/
  $White:#fff;
  /*主体红色*/
  $Danger:#c50202;
  /*灰白色*/
  $DDD:#ddd;
  #view-totalmoney {
    height: 570px;
  }

</style>
