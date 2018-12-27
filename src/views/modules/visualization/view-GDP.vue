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
      <div id="enrolmentChart">

      </div>
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
          <th v-for='item in zsmonths'>{{item}}</th>
        </tr>
        </thead>
        <tbody>
        <tr>
          <td>招生量月度同比增长率</td>
          <td v-for='it in zsrslist'>{{it}}</td>
        </tr>
        <tr>
          <td>招生量月度同比增长率</td>
          <td v-for='it in zsrslist'>{{it}}</td>
        </tr>
        <tr>
          <td>招生量月度同比增长率</td>
          <td v-for='it in zsrslist'>{{it}}</td>
        </tr>
        <tr>
          <td>招生量月度同比增长率</td>
          <td v-for='it in zsrslist'>{{it}}</td>
        </tr>
        </tbody>

      </table>
    </el-row>

    <div class="mini-card">
      <div class="topcard"><span style="position: relative;margin-left: 10px;top: 15px;color: #fff">招生总人数</span></div>
      <div class="botcard"><span style="position: relative;margin-left: 20px;top: 15px">72062人</span></div>
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
        zsmonths: ["一月", "二月", "三月", "四月", "五月", "六月", "七月", "八月", "九月", "十月", "十一月", "十二月"],
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
