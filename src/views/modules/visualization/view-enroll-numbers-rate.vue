<template>
  <div class="view-enrolment view-container">
    <el-row class="enrolment-header">
      <el-radio class="my-view"></el-radio>
      <label>月度计划任务人数完成率 &nbsp;&nbsp;&nbsp;</label>
      <!--<el-select v-model="listQuery.campus" filterable remote clearable reserve-keyword placeholder="校区"-->
                 <!--style="margin-right: 5px;width: 200px;">-->
        <!--<el-option v-for="campus in campusList" :key="campus.id" :label="campus.name" :value="campus.id"></el-option>-->
      <!--</el-select>-->
      <!--<el-date-picker v-model="listQuery.year" type="year" placeholder="年份"-->
                      <!--style="margin-right: 5px;width: 200px;"></el-date-picker>-->
      <!--<el-button icon="el-icon-search" type="danger">确认搜索</el-button>-->
    </el-row>
    <el-row class="enrolment-view">
      <div id="enrolmentChart">
      </div>
      <div class="enrolment-rate">
        <el-progress type="circle" :percentage="75" stroke-width="12" color="#7773ff"  status="text" ><b>75%</b><br>年度完成</el-progress>
      </div>
      <p style="position: absolute;top: 230px;right: 10px;">年度招生人数完成率</p>
    </el-row>
    <el-row class="enrolment-table">
      <table>
        <thead>
        <tr>
          <th>月份</th>
          <th v-for='item in zsmonths'>{{item}}月</th>
          <th>总计</th>
        </tr>
        </thead>
        <tbody>
        <tr>
          <td>招生人数(人)</td>
          <td v-for='it in zsrslist'>{{it}}</td>
          <td>13999</td>
        </tr>
        <tr>
          <td>招生目标(人)</td>
          <td v-for='it in zsrslist'>{{it}}</td>
          <td>20000</td>
        </tr>
        <tr>
          <td title="月度完成率(%)" style="min-width: 105px;overflow: hidden;white-space:nowrap">月度完成率</td>
          <td v-for='it in zsrslist'>{{it}}</td>
          <td>98%</td>
        </tr>
        <tr>
          <td title="累计完成率(%)">累计完成率(%)</td>
          <td v-for='it in zsrslist'>{{it}}</td>
          <td>100%</td>
        </tr>
        </tbody>

      </table>
    </el-row>

    <div class="mini-card">
      <div class="topcard"><span style="position: relative;margin-left: 10px;top: 15px;color: #fff">招生总金额</span></div>
      <div class="botcard"><span style="position: relative;margin-left: 20px;top: 15px">72062元</span></div>
    </div>
  </div>
</template>

<script>
  export default {
    name: "view-enrolment",
    props: {
      params: Object
    },
    data() {
      return {
        zsmonths: ["一", "二", "三", "四", "五", "六", "七", "八", "九", "十", "十一", "十二"],
        zsrslist: [350, 350, 350, 350, 350, 350, 350, 350, 350, 350, 350, 350],
        ranks: ["第一", "第二", "第三"],
        rankmonth: ["3月份", "7月份", "11月份"],
        campusList: [
          { name: "壹路校区", id: 1 },
          { name: "华通校区", id: 2 }
        ],
        listQuery: {
          campus: null,
          year: null
        }
      };
    },
    methods: {}
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
    height: 420px;
  }
</style>
