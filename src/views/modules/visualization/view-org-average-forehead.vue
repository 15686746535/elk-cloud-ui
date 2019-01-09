<template>
  <div class="view-enrolment view-container">
    <el-row class="enrolment-header">
      <el-radio class="my-view"></el-radio>
      <label>部门人均招生额统计 &nbsp;&nbsp;&nbsp;</label>
    </el-row>
    <div>
      <el-row class="enrolment-table" style="top: 30px;height: 365px">
        <table>
          <thead>
          <tr>
            <th>姓名</th>
            <th v-for='item in dataMonth'>{{item}}月</th>
          </tr>
          </thead>
          <tbody>
          <tr v-for='(it,i) in dataList'>
            <td>{{it.name}}</td>
            <td v-for="its in it.income">{{its}}</td>
          </tr>
          <tr>
            <td title="人均销售额" style="min-width: 105px;overflow: hidden;white-space:nowrap">人均销售额</td>
            <td v-for="it in datas">{{it}}</td>
          </tr>
          </tbody>
        </table>
      </el-row>
    </div>
  </div>
</template>

<script>
  /*
  *
  * 页面高度：420px
  * */
  import Echarts from "@/components/Echarts";
  import { getUserRecruit, queryOrgIncreseMoney } from "@/api/visualization/api";
  import options from "@/utils/options";

  export default {
    name: "view-org-average-forehead",
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
      }
    },
    data() {
      return {
        dataMonth: ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12"],
        datas: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        dataList: [],
        listQuery: {
          orgId: 4,
          year: 2018
        },
        loading: false,
        total: null
      };
    },
    created() {
      this.getList();
    },
    methods: {
      getList() {
        queryOrgIncreseMoney(this.listQuery).then(res => {
          if (res.data.code == 0) {
            var avgnum = [];
            this.dataList = res.data.data;
            var totalnum = res.data.data.length;
            for (var n = 0; n <= 11; n++) {
              var eachmonth = 0;
              this.dataList.forEach(function(v, i) {
                eachmonth += parseInt(v.income[n]);
              });
              avgnum.push((eachmonth / totalnum).toFixed(2));
            }
            this.datas = avgnum;
          }
        });
      },
      handleSizeChange(val) {
        this.listQuery.limit = val;
        this.getList();
      },
      handleCurrentChange(val) {
        this.listQuery.page = val;
        this.getList();
      }
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
    height: 460px;

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
        padding: 5px;
        text-align: center;
        overflow: hidden;
        white-space: nowrap;
        min-width: 51px;
      }

      tr:hover {
        background-color: #fbf8e9;
        transition: all 0.1s ease-in-out;
      }

    }
  }
</style>
