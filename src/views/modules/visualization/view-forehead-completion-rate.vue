<template>
  <div class="view-enrolment view-container">
    <el-row class="enrolment-header">
      <el-radio class="my-view"></el-radio>
      <label>招生金额完成率 &nbsp;&nbsp;&nbsp;</label>
      <!--<el-select v-model="listQuery.campus" filterable remote clearable reserve-keyword placeholder="校区"-->
                 <!--style="margin-right: 5px;width: 200px;">-->
        <!--<el-option v-for="campus in campusList" :key="campus.id" :label="campus.name" :value="campus.id"></el-option>-->
      <!--</el-select>-->
      <!--<el-date-picker v-model="listQuery.year" type="year" placeholder="年份"-->
                      <!--style="margin-right: 5px;width: 200px;"></el-date-picker>-->
      <!--<el-button icon="el-icon-search" type="danger">确认搜索</el-button>-->
    </el-row>
    <el-row class="enrolment-view">
      <div >
        <echarts :option="option" :width="width+'px'" style="height: 280px;"></echarts>
      </div>
      <!--<div class="enrolment-rate">-->
      <!--<el-progress type="circle" :percentage="75" stroke-width="12" color="#fe8888"  status="text"><b>75%</b><br>年度完成</el-progress>-->
      <!--</div>-->
    </el-row>
    <el-row class="enrolment-table">
      <table>
        <thead>
        <tr>
          <th>月份</th>
          <th v-for='item in zsMonths'>{{item}}月</th>
          <th>总计</th>
        </tr>
        </thead>
        <tbody>
        <tr>
          <td>招生金额(万)</td>
          <td v-for='it in zsjeList'>{{it}}</td>
          <td>{{zsjeTotal}}</td>
        </tr>
        <tr>
          <td>目标金额(万)</td>
          <td v-for='it in zsjeTarget'>{{it}}</td>
          <td>{{zsmbTotal}}</td>
        </tr>
        <tr>
          <td>月度完成率(%)</td>
          <td v-for='it in zsjewclList'>{{it}}</td>
          <td ></td>
        </tr>
        <tr>
          <td title="累计完成率(%)"  style="min-width: 105px;overflow: hidden;white-space:nowrap">累计完成率(%)</td>
          <td v-for='its in ljwclTotal'>{{its}}</td>
          <td></td>
        </tr>
        </tbody>
      </table>
    </el-row>

    <div class="mini-card">
      <div class="topcard">招生总金额</div>
      <div class="botcard">{{zsjeTotal}}万</div>
    </div>
  </div>
</template>

<script>
  /*
  * 人均产值统计
  * 页面高度：420px
  * */
  import Echarts from '@/components/Echarts';
  import {moneyCompletRate } from '@/api/visualization/api'
  import options from  '@/utils/options'
  export default {
    name: "view-amount-completion-rate",
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
        default: 1200
      },
    },
    data() {
      return {
        zsMonths: ["一", "二", "三", "四", "五", "六", "七", "八", "九", "十", "十一", "十二"],
        zsjeList:[0,0,0,0,0,0,0,0,0,0,0,0],
        zsjeTarget:[0,0,0,0,0,0,0,0,0,0,0,0],
        zsjewclList: [35,14,51,87,62,47,99,24,62,82,68,49],
        ljwclTotal:[0,0,0,0,0,0,0,0,0,0,0,0],
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
        zsjeTotal:0,
        zsmbTotal:0,
        zswclTotal:0,

      };
    },
    created() {
      this.getList();
    },
    methods: {
      getList(){
        let _this=this
        moneyCompletRate (this.listQuery).then(res=>{
          if(res.data.code==0){
            console.log("ress",res);
            var factMoney=res.data.data.factMoney;
            var targetMoney=res.data.data.targetMoney;
            var zsjewclList=[];  //招生金额完成率
            var zsjemblList=[];  //招生金额目标
            var zsjeList=[];  //招生金额
            var zsjeTotal=0;  //招生金额总数
            var zsmbTotal=0;   //招生目标总金额
            var zswclTotal=0;  //招生金额完成率总数
            var ljwclTotal=[];  //累计完成率
            var zs=0;
            factMoney.forEach(function(v,i) {
              zsjemblList.push(parseFloat((targetMoney[i]/10000).toFixed(2)));
              zsjeList.push(parseFloat((v/10000).toFixed(2)));
              zsjeTotal+=parseFloat((v/10000).toFixed(2));
              zsmbTotal+=parseFloat((targetMoney[i]/10000));
              zs=((v/targetMoney[i])*100).toFixed(2);
              if(targetMoney[i]==0){
                zsjewclList.push(0);
              }
              else {zsjewclList.push((zs));}
              ljwclTotal.push(((zsjeTotal/zsmbTotal)*100).toFixed(2))
            })
            _this.zsjeList=zsjeList;
            _this.zsjeTarget=zsjeList;
            _this.zsjewclList=zsjewclList;
            _this.zsjeTotal=zsjeTotal.toFixed(2);
            _this.zsmbTotal=zsmbTotal;
            _this.zswclTotal=zswclTotal;
            _this.ljwclTotal=ljwclTotal;
            _this.init();
          }
        })
      },
      init() {
        var data = {
          xData:['1月','2月','3月','4月','5月','6月','7月','8月','9月','10月','11月','12月'], // X轴数据
          yName:'百分比',            // Y轴名字
          unit:'%',               // 单位
          mark:88,                // 平均线
          series:[                 // 图形集合
            {
              name:'招生金额完成率',
              type:'line',
              smooth:true,
              lineWidth:3,
              color:'#7773ff',
              data:this.zsjewclList
            }
          ]
        }
        this.option = options.config(data)
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
    height: 530px;
  }
</style>
