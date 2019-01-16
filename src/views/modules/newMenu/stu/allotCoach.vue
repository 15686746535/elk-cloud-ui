<template>
  <div class="allot-coach">
    <div class="select">
      <div class="select-bar">
        <el-select v-model="testvalue" placeholder="场训教练" style="width:180px;margin-left: 15px">
          <el-option
            v-for="item in camps"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
        <el-select v-model="testvalue" placeholder="路训教练" style="width:180px;margin-left: 15px">
          <el-option
            v-for="item in camps"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
        <el-select v-model="testvalue" placeholder="车型" style="width:180px;margin-left: 15px">
          <el-option
            v-for="item in camps"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
        <el-select v-model="testvalue" placeholder="姓名/电话/身份证" style="width:250px;margin-left: 15px">
          <el-option
            v-for="item in camps"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
        <el-button icon="el-icon-search" type="danger">搜索</el-button>
      </div>
      <div class="left-bt">
        <el-button type="text">导出</el-button>
        <el-button type="text">分配教练</el-button>
      </div>
      <div class="page-bar">
        <span class="page-txt">共8553条</span>
        <!--<span class="page-txt">上一页</span>-->

        <!--<span class="page-txt">下一页</span>-->
        <el-button type="text">上一页</el-button>
        <span class="page-txt">第25页</span>
        <el-button type="text">下一页</el-button>
      </div>
    </div>

    <div class="info-table">
      <el-table ref="multipleTable" :stripe="true" :data="tableData3" tooltip-effect="dark"
                style="width: 100%;border-bottom:0" @selection-change="handleSelectionChange">
        <el-table-column type="selection" width="55">
        </el-table-column>
        <el-table-column type="index"  label="序号"  align="center" width="60"></el-table-column>
        <el-table-column prop="name" align="center" label="姓名" width="90">
        </el-table-column>
        <el-table-column label="电话" align="center" width="120">
          <template slot-scope="scope">{{ scope.row.date }}</template>
        </el-table-column>
        <el-table-column prop="address" align="center" label="身份证" show-overflow-tooltip width="150">
        </el-table-column>
        <el-table-column label="当前科目" align="center" width="100">
          <template slot-scope="scope">{{ scope.row.date }}</template>
        </el-table-column>
        <el-table-column label="车型" prop="name" align="center" width="90">
          <!--<template slot-scope="scope">{{ scope.row.name }}</template>-->
        </el-table-column>
        <el-table-column label="场训教练" align="center" width="110">
          <template slot-scope="scope">{{ scope.row.date }}</template>
        </el-table-column>
        <el-table-column label="路训教练" align="center" width="110">
          <template slot-scope="scope">{{ scope.row.date }}</template>
        </el-table-column>
        <el-table-column label="分配预警" align="center" width="auto">
          <template slot-scope="scope">{{ scope.row.date }}</template>
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        testvalue:null,
        tableData3: [{
          date: "2016-05-03",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1518 弄"
        }, {
          date: "2016-05-02",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1518 弄"
        }, {
          date: "2016-05-04",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1518 弄"
        }],
        kemu: [{ value: 1, label: "科目一" }, { value: 2, label: "科目二" }, { value: 3, label: "科目三" }, {
          value: 4,
          label: "科目四"
        }
        ],
        camps: [{ value: 1, label: "全悦校区" }, { value: 2, label: "壹路校区" }, { value: 3, label: "华通校区" }, {
          value: 4,
          label: "北碚校区"
        }
        ],
      };
    },
    methods:{
      handleSelectionChange(){}
    }
  };
</script>

<style ref="stylesheet/scss" lang="scss">
  /*主体白色*/
  $White: #fff;
  /*主体红色*/
  $Danger: #c50202;
  /*灰白色*/
  $BgColor: #fff;
  .allot-coach {
    position: relative;
    background-color: $BgColor;
    width: 100%;
    height: 100%;

    .select {
      width: 100%;

      .select-bar {
        position: relative;
        top: 10px;
        width: 96%;
        height: 135px;
        border-bottom: solid 1px #eee;
        margin-left: 25px;
      }

      .el-button--danger {
        color: #fff;
        background-color: $Danger !important;
        border-color: $Danger !important;
        float: right;
      }

      .left-bt {
        position: absolute;
        top: 100px;
        margin-left: 40px;

        .el-button--text {
          color: #999 !important;
          margin-right: 25px;
        }
      }

      .page-bar {
        position: absolute;
        right: 14px;
        top: 100px;

        .page-txt {
          color: #999;
          margin-left: 10px;
        }

        .el-button--text {
          color: #999 !important;
          margin-left: 15px;
        }
      }
    }

    .info-table {
      width: 96%;
      height: 100%;
      /*background-color: #20a0ff;*/
      margin-top: 20px;
      margin-left: 25px;

      .el-table td, .el-table th.is-leaf {
        border-bottom: 0 !important;
      }

      .el-table--striped .el-table__body tr.el-table__row--striped td {
        background: #eee !important;
      }
      .el-table{
        color: #666!important;
        font-size: 14px!important;
      }
      .el-checkbox__input.is-checked .el-checkbox__inner, .el-checkbox__input.is-indeterminate .el-checkbox__inner {
        background-color: #c50202!important;
        border-color: #c50202!important;
      }
      .el-radio, .el-table th {
        color: #999;
        font-weight: lighter;
        font-size: 16px;
      }
    }
  }
</style>
