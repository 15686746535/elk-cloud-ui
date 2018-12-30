<template>
  <div class="view-enrolment view-container">
    <el-row class="enrolment-header">
      <el-radio class="my-view"></el-radio>
      <label>招生量完成率统计 &nbsp;&nbsp;&nbsp;</label>
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
          <th v-for='item in zsMonths'>{{item}}<span >月</span></th>
          <th>总计</th>
        </tr>
        </thead>
        <tbody>
        <tr>
          <td>招生人数</td>
          <td v-for='it in zsrsList'>{{it}}</td>
          <td>{{zsrsTotal}}</td>
        </tr>
        <tr>
          <td>招生目标</td>
          <td v-for='it in zsrsTarget'>{{it}}</td>
          <td>{{zsmbTotal}}</td>
        </tr>
        <tr>
          <td title="完成率(%)">完成率(%)</td>
          <td v-for='it in zswclList'>{{it}}</td>
          <td ></td>
        </tr>
        <tr>
          <td title="累计完成率(%)" style="min-width: 105px;overflow: hidden;white-space:nowrap">累计完成率(%)</td>
          <td v-for='its in ljwclTotal'>{{its}}</td>
          <td></td>
        </tr>
        </tbody>
      </table>
    </el-row>

    <div class="mini-card">
      <div class="topcard">招生总人数</div>
      <div class="botcard">{{zsrsTotal}}人</div>
    </div>
  </div>
</template>

<script>
  /*
  * 人均产值统计
  * 页面高度：420px
  * */
  import Echarts from '@/components/Echarts';
  import {queryAmountRate} from '@/api/visualization/api'
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
        zsrsList:[0,0,0,0,0,0,0,0,0,0,0,0],
        zsrsTarget:[0,0,0,0,0,0,0,0,0,0,0,0],
        zswclList: [0,0,0,0,0,0,80,94,34,55,34,20],
        ljwclTotal:[0,0,0,0,0,0,0,0,0,0,0,0],
        ranks: ["第一", "第二", "第三"],
        rankMonth: ["3月", "7月", "11月"],
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
        zsrsTotal:0,
        zsmbTotal:0,
        zswclTotal:0,

      };
    },
    created() {
      this.init();
    },
    methods: {
      getList(){
        let _this=this
        queryAmountRate(this.listQuery).then(res=>{
          if(res.data.code==0){
            var factStudent=res.data.data.factStudent;
            var targetStudent=res.data.data.targetStudent;
            var zswclList=[];
            var zsrsTotal=0;
            var zsmbTotal=0;
            var zswclTotal=0;
            var ljwclTotal=[];
            var zs=0;
            factStudent.forEach(function(v,i) {
              zsrsTotal+=v;
              zsmbTotal+=targetStudent[i];
              zs=((v/targetStudent[i])*100).toFixed(2);
              if(targetStudent[i]==0){
                zswclList.push(0);
              }
              else {zswclList.push((zs));}
              ljwclTotal.push(((zsrsTotal/zsmbTotal)*100).toFixed(2))
            })
            _this.zsrsList=factStudent;
            _this.zsrsTarget=targetStudent;
            _this.zswclList=zswclList;
            _this.zsrsTotal=zsrsTotal;
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
              name:'招生完成率',
              type:'line',
              smooth:false,
              lineWidth:3,
              color:'#ffa351',
              data:this.zswclList
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
    height: 570px;
  }
</style>
