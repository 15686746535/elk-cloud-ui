<template>
  <div class="view-enrolment view-container">
    <el-row class="enrolment-header">
      <el-radio class="my-view"></el-radio>
      <label>招生量同比增长率 &nbsp;&nbsp;&nbsp;</label>
      <el-select v-model="listQuery.campus" filterable remote clearable reserve-keyword placeholder="校区"
                 style="margin-right: 5px;width: 200px;">
        <el-option v-for="campus in campusList" :key="campus.id" :label="campus.name" :value="campus.id"></el-option>
      </el-select>
      <el-date-picker v-model="listQuery.year" type="year" placeholder="年份"
                      style="margin-right: 5px;width: 200px;"></el-date-picker>
      <el-button icon="el-icon-search" type="danger">确认搜索</el-button>
    </el-row>
    <el-row class="enrolment-view">
      <div id="enrolmentChart">
      </div>
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
          <td>招生量月度同比增长率</td>
          <td v-for='it in zsrslist'>{{it}}</td>
        </tr>
        <tr>
          <td>招生额月度同比增长率</td>
          <td v-for='it in zsrslist'>{{it}}</td>
        </tr>
        <tr>
          <td>招生量年度同比增长率</td>
          <td v-for='it in zsrslist'>{{it}}</td>
        </tr>
        <tr>
          <td>招生额年度同比增长率</td>
          <td v-for='it in zsrslist'>{{it}}</td>
        </tr>
        </tbody>

      </table>
    </el-row>

    <div class="right-text">
      <p style="color: #c50202">指数解读：</p>
      <p class="text-body">三月份的招生量明显异常三月份的招生量明显异常三月份的招生量明显异常</p>
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
.right-text{
  position: absolute;
  width: 200px;
  top: 80px;
  right: 20px;
  .text-body{
    font-size: small;
    color: #666;
  }
}


     }
</style>
