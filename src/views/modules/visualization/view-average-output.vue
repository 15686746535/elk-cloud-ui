<template>
  <div class="view-enrolment view-container">
    <el-row class="enrolment-header">
      <el-radio class="my-view"></el-radio>
      <label>人均产值 &nbsp;&nbsp;&nbsp;</label>
      <!--<el-select v-model="listQuery.campus" filterable remote clearable reserve-keyword placeholder="校区"-->
                 <!--style="margin-right: 5px;width: 200px;">-->
        <!--<el-option v-for="campus in campusList" :key="campus.id" :label="campus.name" :value="campus.id"></el-option>-->
      <!--</el-select>-->
      <!--<el-date-picker v-model="listQuery.year" type="year" placeholder="年份"-->
                      <!--style="margin-right: 5px;width: 200px;"></el-date-picker>-->
      <!--<el-button icon="el-icon-search" type="danger">确认搜索</el-button>-->
    </el-row>
    <el-row class="enrolment-view">
      <echarts :option="option" :width="width+'px'" style="height: 280px;"></echarts>
      <div class="enrolment-rank" style="top: 80px" >
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
    </el-row>
    <el-row class="enrolment-table">
      <table>
        <thead>
        <tr>
          <th>月份</th>
          <th v-for='item in gdpMonths'>{{item}}月</th>
          <th>{{listQuery.year}}年</th>
        </tr>
        </thead>
        <tbody>
        <tr>
          <td>招生金额（万）</td>
          <td v-for='it in factMoney'>{{it}}</td>
          <td>{{totalMoney}}</td>
        </tr>
        <tr>
          <td>员工数量（人）</td>
          <td v-for='it in factEmployee'>{{it}}</td>
          <td>{{totalNum}}</td>
        </tr>
        <tr>
          <td title="人均产值（万）"  style="min-width: 105px;overflow: hidden;white-space:nowrap">人均产值（万）</td>
          <td v-for='it in percentList'>{{it}}</td>
          <td>{{totalAvg}}</td>
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
        default: 1200
      },
    },
    data() {
      return {
        year:null,
        gdpMonths: ["一", "二", "三", "四", "五", "六", "七", "八", "九", "十", "十一", "十二"],
        percentList: [0,0,0,0,0,0,0,0,0,0,0,0],
        factEmployee:[0,0,0,0,0,0,0,0,0,0,0,0],
        factMoney:[0,0,0,0,0,0,0,0,0,0,0,0],
        rankMonth: ["","",""],
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
        totalMoney:0,
        totalNum:0,
      };
    },
    created() {
      this.getList();
    },
    computed:{
      totalAvg(){
        return (this.totalMoney/this.totalNum).toFixed(2);
      }
    },
    methods: {
      getList(){
        let _this=this
        queryGDP(this.listQuery).then(res=>{
          if(res.data.code==0){
            console.log("res",res)
            var factMoney = [];
            var percentList = [];
            var totalNum = 0;
            var totalMoney = 0;
            var index=[0,0,0];
            var plist=[];
            var rank=[];
            _this.factEmployee=res.data.data.factEmployee;
            _this.factMoney=res.data.data.factMoney;
            res.data.data.factMoney.forEach(function(v,i) {
              totalMoney += v;
              v = (v/10000).toFixed(2);
              totalNum += _this.factEmployee[i];
              percentList.push((v/_this.factEmployee[i]).toFixed(2));
              plist.push((v/_this.factEmployee[i]).toFixed(2));
              factMoney.push(v);
              // console.log("人均产值", _this.percentList)
            })
            totalMoney = (totalMoney/10000).toFixed(2);
            _this.factMoney = factMoney;
            _this.totalMoney = totalMoney;
            _this.totalNum = totalNum;
            _this.percentList = percentList;
            _this.init();
            index.forEach(function(a,b) {
              var maxmonth=0;
              plist.forEach(function(v,i) {
                if(v-maxmonth>0)
                {
                  maxmonth=v;
                  index[b]=i;
                }
              })
              plist[index[b]]=0;
              rank.push(_this.gdpMonths[index[b]])
            })
            _this.rankMonth=rank;

          }
        })
      },
      init() {
        var data = {
          xData:["一", "二", "三", "四", "五", "六", "七", "八", "九", "十", "十一", "十二"], // X轴数据
          yName:'人均产值',            // Y轴名字
          unit:'万',               // 单位
          mark:100,                // 平均线
          series:[                 // 图形集合
            {
              name:'人均产值',
              type:'line',
              smooth:true,
              stack:'11',
              color:'#a2d27f',
              data:this.percentList//[15,25,40,67,80,88,91,80,99,100,88,99],
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
    height: 520px;
  }
</style>
