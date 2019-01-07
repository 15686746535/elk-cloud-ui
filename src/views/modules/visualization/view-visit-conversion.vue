<template>
  <div class="view-enrolment view-container">
    <el-row class="enrolment-header">
      <el-radio class="my-view"></el-radio>
      <label>意向转化率 &nbsp;&nbsp;&nbsp;</label>
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
      <div class="enrolment-rank" style="top:80px">
        <table>
          <thead>
          <tr>
            <th>排名</th>
            <th>月份</th>
          </tr>
          </thead>
          <tbody>
          <tr v-for="(rank,i) in rankMonth">
            <td>{{i==0?'第一':i==1?'第二':'第三'}}</td>
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
          <th v-for='item in Months'>{{item}}月</th>
          <th>{{listQuery.year}}年</th>
        </tr>
        </thead>
        <tbody>
        <tr>
          <td>新增意向</td>
          <td v-for='it in allIntention'>{{it}}</td>
          <td>{{allTotal}}</td>
        </tr>
        <tr>
          <td>成交意向</td>
          <td v-for='it in successIntention'>{{it}}</td>
          <td>{{successTotal}}</td>
        </tr>
        <tr>
          <td title="转化率（%）"  style="min-width: 105px;overflow: hidden;white-space:nowrap">转化率（%）</td>
          <td v-for='it in percentList'>{{it}}</td>
          <td></td>
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
  * 意向转化率
  * 页面高度：420px
  * */
  import Echarts from '@/components/Echarts';
  import {queryIntentionConversion} from '@/api/visualization/api'
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
        Months: ["一", "二", "三", "四", "五", "六", "七", "八", "九", "十", "十一", "十二"],
        percentList: [0,0,0,0,0,0,0,0,0,0,0,0],
        successIntention:[0,0,0,0,0,0,0,0,0,0,0,0],
        allIntention:[0,0,0,0,0,0,0,0,0,0,0,0],
        rankMonth: ['','',''],
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
        allTotal:0,
        successTotal:0,
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
        let _this=this;
        queryIntentionConversion(this.listQuery).then(res=>{
          if(res.data.code==0){
            var allIntention=[];  //总意向列表
            var allTotal=0;  //总意向数
            var successIntention=[];  //成功意向
            var success=[]; //成功
            var successTotal=0; //成功总数
            var zhlList=[];  //转换率
            var index=[0,0,0];
            var rank=[];
            allIntention=res.data.data.allIntention;
            successIntention=res.data.data.successIntention;
            successIntention.forEach(function(v,i) {

              successTotal+=parseInt(v);
              allTotal+=parseInt(allIntention[i]);
              success.push(v);
              if(allIntention[i]!=0){
                zhlList.push(((v/allIntention[i])*100).toFixed(2));
              }
              else {zhlList.push(0);}

            })
            _this.allIntention=allIntention;
            _this.successIntention=success;
            _this.percentList=zhlList;
            _this.allTotal=allTotal;
            _this.successTotal=successTotal;
            _this.init();
            index.forEach(function(a,b) {
              var maxmonth=0;
              successIntention.forEach(function(v,i) {
                if(v-maxmonth>0)
                {
                  maxmonth=v;
                  index[b]=i;
                }
              })
              successIntention[index[b]]=0;
              rank.push(_this.Months[index[b]])
            })
            _this.rankMonth=rank;
          }
        })
      },
      init() {

        var data = {
          xData:['1月','2月','3月','4月','5月','6月','7月','8月','9月','10月','11月','12月'], // X轴数据
          yName:'转化率',            // Y轴名字
          unit:'%',               // 单位
          mark:80,                // 平均线
          series:[                 // 图形集合
            {
              name:'意向转化率',
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
