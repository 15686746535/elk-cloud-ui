<template>
  <div>

    <el-col>
    <el-tabs v-model="listQuery.state" type="border-card" @tab-click="changeTab">
      <el-tab-pane label="应投保" name="-2">
        <el-col :xs="6" :sm="6" :md="8" :lg="7" :xl="5" style="margin-bottom:10px;">
          <el-date-picker style="width: 100%" size="mini"  v-model="queryDate"  type="daterange"  range-separator="-"  start-placeholder="开始日期"   end-placeholder="结束日期">
          </el-date-picker>
        </el-col>
        <el-col :span="5" style="margin-bottom:10px;"><el-input size="mini" @keyup.enter.native="searchData" clearable  placeholder="学员姓名/身份证" v-model="queryCondition"></el-input></el-col>
        <el-col :span="1" style="margin-bottom:10px;">
          <el-button type="primary" size="mini" @click="searchData"><i class="el-icon-search"></i> 搜 索</el-button>
        </el-col>
        <el-table :data="list"   v-loading="listLoading"  :stripe="true" element-loading-text="给我一点时间" fit highlight-current-row height="450" style="width: 100%;text-align: center;">
          <el-table-column type="index" label="序号"  align="center" width="50"></el-table-column>
          <el-table-column align="center"  label="身份证号" width="200">
            <template slot-scope="scope">
              <span>{{scope.row.idcard }}</span>
            </template>
          </el-table-column>

          <el-table-column align="center"  label="姓名"  width="90">
            <template slot-scope="scope">
              <span>{{scope.row.name | subTime}}</span>
            </template>
          </el-table-column>

          <el-table-column align="center"  label="手机"  width="120">
            <template slot-scope="scope">
              <span>{{scope.row.mobile}}</span>
            </template>
          </el-table-column>

          <el-table-column align="center"  label="校区"  width="120">
            <template slot-scope="scope">
              <span>{{scope.row.campus}}</span>
            </template>
          </el-table-column>

          <el-table-column v-if="listQuery.state!=-2" align="center"  label="备注"  width="auto">
            <template slot-scope="scope">
              <span>{{scope.row.remarks}}</span>
            </template>
          </el-table-column>

          <!--<el-table-column align="left" label="操作" width="80">-->
          <!--<template slot-scope="scope">-->
          <!--<el-button type="primary" @click="edit(scope.$index, scope.row)" size="mini">编辑</el-button>-->
          <!--</template>-->
          <!--</el-table-column>-->

        </el-table>
      </el-tab-pane>

      <el-tab-pane label="待投保" name="0">
        <el-col :xs="6" :sm="6" :md="8" :lg="7" :xl="5" style="margin-bottom:10px;">
          <el-date-picker style="width: 100%" size="mini"  v-model="queryDate"  type="daterange"  range-separator="-"  start-placeholder="开始日期"   end-placeholder="结束日期">
          </el-date-picker>
        </el-col>
        <el-col :span="5" style="margin-bottom:10px;"><el-input size="mini" @keyup.enter.native="searchData" clearable  placeholder="学员姓名/身份证" v-model="queryCondition"></el-input></el-col>
        <el-col :span="1" style="margin-bottom:10px;">
          <el-button type="primary" size="mini" @click="searchData"><i class="el-icon-search"></i> 搜 索</el-button>
        </el-col>
        <el-table :data="list"   v-loading="listLoading"  :stripe="true" element-loading-text="给我一点时间" fit highlight-current-row height="450" style="width: 100%;text-align: center;">
          <el-table-column type="index" label="序号"  align="center" width="50"></el-table-column>
          <el-table-column align="center"  label="身份证号" width="200">
            <template slot-scope="scope">
              <span>{{scope.row.idcard }}</span>
            </template>
          </el-table-column>

          <el-table-column align="center"  label="姓名"  width="90">
            <template slot-scope="scope">
              <span>{{scope.row.name | subTime}}</span>
            </template>
          </el-table-column>

          <el-table-column align="center"  label="手机"  width="auto">
            <template slot-scope="scope">
              <span>{{scope.row.mobile}}</span>
            </template>
          </el-table-column>

          <el-table-column align="center"  label="校区"  width="auto">
            <template slot-scope="scope">
              <span>{{scope.row.campus}}</span>
            </template>
          </el-table-column>

          <el-table-column align="center"  label="入学日期"  width="auto">
            <template slot-scope="scope">
              <span>{{scope.row.enrol_time | subTime}}</span>
            </template>
          </el-table-column>



          <!--<el-table-column align="left" label="操作" width="80">-->
          <!--<template slot-scope="scope">-->
          <!--<el-button type="primary" @click="edit(scope.$index, scope.row)" size="mini">编辑</el-button>-->
          <!--</template>-->
          <!--</el-table-column>-->

        </el-table>
        <el-button size="small" style="float:right;margin: 20px 10px 10px"  :loading="dcloding" type="primary" @click="kmOneExport" icon="el-icon-download" >科目一导出</el-button>
        <el-button size="small" style="float:right;margin: 20px 10px 10px"  :loading="dcloding" type="primary" @click="kmTwoExport" icon="el-icon-download" >科目二导出</el-button>
      </el-tab-pane>

      <el-tab-pane label="待生效" name="1">
        <el-col :xs="6" :sm="6" :md="8" :lg="7" :xl="5" style="margin-bottom:10px;">
          <el-date-picker style="width: 100%" size="mini"  v-model="queryDate"  type="daterange"  range-separator="-"  start-placeholder="开始日期"   end-placeholder="结束日期">
          </el-date-picker>
        </el-col>
        <el-col :span="5" style="margin-bottom:10px;"><el-input size="mini" @keyup.enter.native="searchData" clearable  placeholder="学员姓名/身份证" v-model="queryCondition"></el-input></el-col>
        <el-col :span="1" style="margin-bottom:10px;">
          <el-button type="primary" size="mini" @click="searchData"><i class="el-icon-search"></i> 搜 索</el-button>
        </el-col>
        <el-table :data="list"   v-loading="listLoading"  :stripe="true" element-loading-text="给我一点时间" fit highlight-current-row height="450" style="width: 100%;text-align: center;">
          <el-table-column type="index" label="序号"  align="center" width="50"></el-table-column>
          <el-table-column align="center"  label="身份证号" width="160">
            <template slot-scope="scope">
              <span>{{scope.row.idcard }}</span>
            </template>
          </el-table-column>

          <el-table-column align="center"  label="姓名"  width="90">
            <template slot-scope="scope">
              <span>{{scope.row.name | subTime}}</span>
            </template>
          </el-table-column>

          <el-table-column align="center"  label="手机"  width="100">
            <template slot-scope="scope">
              <span>{{scope.row.mobile}}</span>
            </template>
          </el-table-column>

          <el-table-column align="center"  label="校区"  width="110">
            <template slot-scope="scope">
              <span>{{scope.row.campus}}</span>
            </template>
          </el-table-column>

          <el-table-column align="center"  label="入学日期"  width="120">
            <template slot-scope="scope">
              <span>{{scope.row.enrol_time | subTime}}</span>
            </template>
          </el-table-column>

          <el-table-column  align="center" label="保险公司" width="120">
            <template slot-scope="scope">
              {{scope.row.policy_company }}
            </template>
          </el-table-column>

          <el-table-column  align="center" label="投保时间" width="100">
            <template slot-scope="scope">
              <span>{{scope.row.buydate | subTime}}</span>
            </template>
          </el-table-column>

          <el-table-column   align="center"  label="失效时间" width="100">
            <template slot-scope="scope">
              <span>{{scope.row.expirydate | subTime}}</span>
            </template>
          </el-table-column>

          <el-table-column  align="center"  label="备注"  width="auto">
            <template slot-scope="scope">
              <span>{{scope.row.remarks}}</span>
            </template>
          </el-table-column>

          <!--<el-table-column align="left" label="操作" width="80">-->
          <!--<template slot-scope="scope">-->
          <!--<el-button type="primary" @click="edit(scope.$index, scope.row)" size="mini">编辑</el-button>-->
          <!--</template>-->
          <!--</el-table-column>-->

        </el-table>
        <el-button size="small" style="float:right;margin: 20px 10px 10px"  :loading="dcloding" type="primary" @click="exportAgain" icon="el-icon-download" >再次导出</el-button>
       </el-tab-pane>

      <el-tab-pane label="生效中" name="2">
        <el-col :xs="6" :sm="6" :md="8" :lg="7" :xl="5" style="margin-bottom:10px;">
          <el-date-picker style="width: 100%" size="mini"  v-model="queryDate"  type="daterange"  range-separator="-"  start-placeholder="开始日期"   end-placeholder="结束日期">
          </el-date-picker>
        </el-col>
        <el-col :span="5" style="margin-bottom:10px;"><el-input size="mini" @keyup.enter.native="searchData" clearable  placeholder="学员姓名/身份证" v-model="queryCondition"></el-input></el-col>
        <el-col :span="1" style="margin-bottom:10px;">
          <el-button type="primary" size="mini" @click="searchData"><i class="el-icon-search"></i> 搜 索</el-button>
        </el-col>
        <el-table :data="list"   v-loading="listLoading"  :stripe="true" element-loading-text="给我一点时间" fit highlight-current-row height="450" style="width: 100%;text-align: center;">
          <el-table-column type="index" label="序号"  align="center" width="50"></el-table-column>
          <el-table-column align="center"  label="身份证号" width="160">
            <template slot-scope="scope">
              <span>{{scope.row.idcard }}</span>
            </template>
          </el-table-column>

          <el-table-column align="center"  label="姓名"  width="90">
            <template slot-scope="scope">
              <span>{{scope.row.name | subTime}}</span>
            </template>
          </el-table-column>

          <el-table-column align="center"  label="校区"  width="110">
            <template slot-scope="scope">
              <span>{{scope.row.campus}}</span>
            </template>
          </el-table-column>

          <el-table-column align="center"  label="产品"  width="110">
            <template slot-scope="scope">
              <span>{{scope.row.product}}</span>
            </template>
          </el-table-column>

          <el-table-column  align="center" label="保险公司" width="120">
            <template slot-scope="scope">
              {{scope.row.policy_company }}
            </template>
          </el-table-column>

          <el-table-column  align="center" label="投保时间" width="100">
            <template slot-scope="scope">
              <span>{{scope.row.buydate | subTime}}</span>
            </template>
          </el-table-column>

          <el-table-column   align="center"  label="失效时间" width="100">
            <template slot-scope="scope">
              <span>{{scope.row.expirydate | subTime}}</span>
            </template>
          </el-table-column>

          <el-table-column  align="center"  label="备注"  width="auto">
            <template slot-scope="scope">
              <span>{{scope.row.remarks}}</span>
            </template>
          </el-table-column>

          <!--<el-table-column align="left" label="操作" width="80">-->
          <!--<template slot-scope="scope">-->
          <!--<el-button type="primary" @click="edit(scope.$index, scope.row)" size="mini">编辑</el-button>-->
          <!--</template>-->
          <!--</el-table-column>-->

        </el-table>
        <!--<el-button size="small" style="float:right;margin: 20px 10px 10px"  :loading="drloding" type="primary" @click="uploadExcel" icon="el-icon-upload2" >导入</el-button>-->
        <!--<input class="inputFiel" type="file" @change="uploadExcel" ref="fileInput"/>-->
        <el-upload style="float:right;margin: 20px 10px 10px" class="avatar-uploader" action="/excel/api/import/lianzibao" name="file"
                   accept=".xls,.xlsx" :show-file-list="false" :headers="headers"
                   :on-success="handleAvatarSuccess" :before-upload="beforeAvatarUpload">
          <!--<img :src="userEntity.avatar" class="avatar">-->
          <el-button size="small"  :loading="drloding" type="primary" @click="uploadExcel" icon="el-icon-upload2" >导入</el-button>
        </el-upload>
        <el-button size="small" style="float:right;margin: 20px 10px 10px"  :loading="mbloding" type="primary" @click="exportMobel" icon="el-icon-download" >导入模板</el-button>
      </el-tab-pane>

      <el-tab-pane label="已失效" name="99">
        <el-col :xs="6" :sm="6" :md="8" :lg="7" :xl="5" style="margin-bottom:10px;">
          <el-date-picker style="width: 100%" size="mini"  v-model="queryDate"  type="daterange"  range-separator="-"  start-placeholder="开始日期"   end-placeholder="结束日期">
          </el-date-picker>
        </el-col>
        <el-col :span="5" style="margin-bottom:10px;"><el-input size="mini" @keyup.enter.native="searchData" clearable  placeholder="学员姓名/身份证" v-model="queryCondition"></el-input></el-col>
        <el-col :span="1" style="margin-bottom:10px;">
          <el-button type="primary" size="mini" @click="searchData"><i class="el-icon-search"></i> 搜 索</el-button>
        </el-col>
        <el-table :data="list"   v-loading="listLoading"  :stripe="true" element-loading-text="给我一点时间" fit highlight-current-row height="450" style="width: 100%;text-align: center;">
          <el-table-column type="index" label="序号"  align="center" width="50"></el-table-column>
          <el-table-column align="center"  label="身份证号" width="160">
            <template slot-scope="scope">
              <span>{{scope.row.idcard }}</span>
            </template>
          </el-table-column>

          <el-table-column align="center"  label="姓名"  width="90">
            <template slot-scope="scope">
              <span>{{scope.row.name | subTime}}</span>
            </template>
          </el-table-column>

          <el-table-column align="center"  label="校区"  width="110">
            <template slot-scope="scope">
              <span>{{scope.row.campus}}</span>
            </template>
          </el-table-column>

          <el-table-column align="center"  label="产品"  width="110">
            <template slot-scope="scope">
              <span>{{scope.row.product}}</span>
            </template>
          </el-table-column>

          <el-table-column  align="center" label="保险公司" width="120">
            <template slot-scope="scope">
              {{scope.row.policy_company }}
            </template>
          </el-table-column>

          <el-table-column  align="center" label="投保时间" width="100">
            <template slot-scope="scope">
              <span>{{scope.row.buydate | subTime}}</span>
            </template>
          </el-table-column>

          <el-table-column   align="center"  label="失效时间" width="100">
            <template slot-scope="scope">
              <span>{{scope.row.expirydate | subTime}}</span>
            </template>
          </el-table-column>

          <el-table-column  align="center"  label="备注"  width="auto">
            <template slot-scope="scope">
              <span>{{scope.row.remarks}}</span>
            </template>
          </el-table-column>

          <!--<el-table-column align="left" label="操作" width="80">-->
          <!--<template slot-scope="scope">-->
          <!--<el-button type="primary" @click="edit(scope.$index, scope.row)" size="mini">编辑</el-button>-->
          <!--</template>-->
          <!--</el-table-column>-->

        </el-table>
      </el-tab-pane>

      <el-tab-pane label="投保失败" name="-1">
        <el-col :xs="6" :sm="6" :md="8" :lg="7" :xl="5" style="margin-bottom:10px;">
          <el-date-picker style="width: 100%" size="mini"  v-model="queryDate"  type="daterange"  range-separator="-"  start-placeholder="开始日期"   end-placeholder="结束日期">
          </el-date-picker>
        </el-col>
        <el-col :span="5" style="margin-bottom:10px;"><el-input size="mini" @keyup.enter.native="searchData" clearable  placeholder="学员姓名/身份证" v-model="queryCondition"></el-input></el-col>
        <el-col :span="1" style="margin-bottom:10px;">
          <el-button type="primary" size="mini" @click="searchData"><i class="el-icon-search"></i> 搜 索</el-button>
        </el-col>
        <el-table :data="list"   v-loading="listLoading"  :stripe="true" element-loading-text="给我一点时间" fit highlight-current-row height="450" style="width: 100%;text-align: center;">
          <el-table-column type="index" label="序号"  align="center" width="50"></el-table-column>
          <el-table-column align="center"  label="身份证号" width="160">
            <template slot-scope="scope">
              <span>{{scope.row.idcard }}</span>
            </template>
          </el-table-column>

          <el-table-column align="center"  label="姓名"  width="90">
            <template slot-scope="scope">
              <span>{{scope.row.name | subTime}}</span>
            </template>
          </el-table-column>

          <el-table-column align="center"  label="校区"  width="110">
            <template slot-scope="scope">
              <span>{{scope.row.campus}}</span>
            </template>
          </el-table-column>

          <el-table-column align="center"  label="产品"  width="110">
            <template slot-scope="scope">
              <span>{{scope.row.product}}</span>
            </template>
          </el-table-column>

          <el-table-column  align="center" label="保险公司" width="120">
            <template slot-scope="scope">
              {{scope.row.policy_company }}
            </template>
          </el-table-column>

          <el-table-column  align="center" label="投保时间" width="100">
            <template slot-scope="scope">
              <span>{{scope.row.buydate | subTime}}</span>
            </template>
          </el-table-column>

          <el-table-column   align="center"  label="失效时间" width="100">
            <template slot-scope="scope">
              <span>{{scope.row.expirydate | subTime}}</span>
            </template>
          </el-table-column>

          <el-table-column  align="center"  label="备注"  width="auto">
            <template slot-scope="scope">
              <span>{{scope.row.remarks}}</span>
            </template>
          </el-table-column>

          <!--<el-table-column align="left" label="操作" width="80">-->
          <!--<template slot-scope="scope">-->
          <!--<el-button type="primary" @click="edit(scope.$index, scope.row)" size="mini">编辑</el-button>-->
          <!--</template>-->
          <!--</el-table-column>-->

        </el-table>
      </el-tab-pane>
      <div v-show="!listLoading" class="pagination-container" style="margin-top: 20px;">
        <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange"
                       :current-page.sync="listQuery.page" background style="float: left"
                       :page-sizes="[10,20,30, 50]" :page-size="listQuery.limit"
                       layout="total, sizes, prev, pager, next, jumper" :total="total">
        </el-pagination>
      </div>
    </el-tabs>
      <el-dialog :modal="false"  title="导出保险"  width="550px" :visible.sync="batchOption">
        <div style="display: block;text-align: center;margin-bottom: 20px;">
          <span style="font-size: 18px;color: #c50202;margin: 20px auto;">导出将改变为待生效！！！</span>
        </div>

        <el-form :model="saveList" :rules="saveRules" ref="saveList" label-width="120px">

          <el-form-item label="保险公司：">
            <el-select v-model="exportData.policyCompany" style="width: 80%" placeholder="选择保险公司">
              <el-option v-for="item in policyCompany" :key="item.value" :label="item.lable" :value="item.lable"></el-option>
            </el-select>
          </el-form-item>

          <el-form-item label="投保时间：">
            <!--<el-date-picker v-model="exportData.buydate" type="date" style="width: 80%"  placeholder="选择日期" format="yyyy-MM-dd"  value-format="timestamp"></el-date-picker>-->
            <el-date-picker  v-model="exportData.buydate" type="date" style="width: 80%"  placeholder="选择日期" format="yyyy-MM-dd" value-format="yyyy-MM-dd">
            </el-date-picker>
          </el-form-item>

          <el-form-item label="有效期限：" >
            <el-date-picker  v-model="exportData.expirydate" type="date" style="width: 80%"  placeholder="选择日期" format="yyyy-MM-dd" value-format="yyyy-MM-dd">
            </el-date-picker>
          </el-form-item>

          <el-form-item label="备注：" >
            <el-input v-model="exportData.remarks" style="width: 80%" :min="3" :max="15" label="备注"></el-input>
          </el-form-item>

          <div class="dialog-footer" align="right">
            <el-button @click="cancel('batch')"><i class="el-icon-fa-undo"></i> 取 消</el-button>
            <el-button   :loading="dcloding" type="primary" @click="insuranceExport('saveList')" icon="el-icon-download" >确认导出</el-button>
          </div>
        </el-form>
      </el-dialog>

      <el-dialog :modal="false"  title="再次导出"  width="550px" :visible.sync="importAgain">

        <el-form :model="saveList" :rules="saveRules" ref="saveList" label-width="120px">

          <el-form-item label="保险公司：" >
            <el-select v-model="againData.policy_company" style="width: 80%" placeholder="选择保险公司">
              <el-option v-for="item in policyCompany" :key="item.value" :label="item.lable" :value="item.lable"></el-option>
            </el-select>
          </el-form-item>

          <div class="dialog-footer" align="right">
            <el-button @click="cancel('batch')"><i class="el-icon-fa-undo"></i> 取 消</el-button>
            <el-button    type="primary" @click="exportAg('saveList')" icon="el-icon-download" >确认导出</el-button>
          </div>
        </el-form>
      </el-dialog>
    </el-col>
  </div>
</template>

<script>
  import { getInsurance,searchInsurance,addInsurance,editInsurance,ExportExcel,exportMoble,importExcel} from '@/api/student/student';
  import { getToken } from '@/utils/auth'
  export default {

    watch: {
      'saveList.buydate':function(val){

        var Time = Date.now() + 1000 * 60 * 60 * 24
        if (val) {
          Time = val
        }
        this.pickerOptions = {
          disabledDate(time) {
            if (time.getTime() > Time) {
              return false
            } else {
              return true
            }
          }
        }
      }
    },
    computed: {
      headers() {
        return {
          'Authorization': 'Bearer ' + getToken()
        }
      }
    },
    data() {
      return{
        // tableHeight: this.area[1],
        listLoading:false,
        total:null,
        list:null,
        expirydate:null,
        queryDate:'',
        queryCondition:'',
        enrolSite:'',
        edited:false,
        btnLoading:false,
        dcloding:false,
        drloding:false,
        mbloding:false,
        batchOption: false,
        importAgain:false,
        againData:{
          policy_company:'',//保险公司
          condition:'',
          state:'1',
        },
        listQuery:{
          state:'0',
          condition: null,
          page:1,
          limit:8
        },
        exportData:{
          policyCompany:'',//保险公司
          buydate:'',//投保日期
          expirydate:'',//期效
          state:'', //状态
          remarks:'',//备注
          condition:'',
          node:''  // 1科目一报考，2科目一通过
        },
        saveList:{
          idcard:'',
          name:'',
          policy_number:'',
          policy_company:'',
          buydate:'',
          expirydate:'',
          remarks:'',
          state:'',
          expiryyear:1
        },
        stateList:[{
          value: '0',
          label: '待投保'
        },{
          value: '1',
          label: '待生效'
        },{
          value: '2',
          label: '生效中'
        },{
          value: '99',
          label: '已失效'
        },{
          value: '-1',
          label: '投保失败'
        }],
        yearList:[{
          value: '1',
          label: '一年'
        },{
          value: '2',
          label: '两年'
        },{
          value: '3',
          label: '三年'
        },
          {
            value: '4',
            label: '已过期'
          }],
        policyCompany:[{
          value:1,
          lable:'量子保',
        },{
            value:2,
            lable:'人寿保险',
          },{
            value:3,
            lable:'平安保险',
          },{
          value:4,
          lable:'开发测试',
        }],

        pickerOptions: {
          disabledDate(time) {
            return time.getTime() < Date.now() + 1000 * 60 * 60 * 24 * 7;
          }
        },
        saveRules: {
          policyCompany:[{ required: true, message: '请输入投保公司', trigger: 'blur' }],
          buydate:[{ type: 'date', required: true, message: '请选择投保日期', trigger: 'change' }],
          expirydate: [ { type: 'date',required: true, message: '请选择有效期', trigger: 'change' } ],
        },
      }

    },
    props: {layerid: String},
    created() {
      this.getList();
    },
    methods:{
      getList(){
        getInsurance(this.listQuery).then(res=>{
          this.list=res.data.data.list;
          this.total=res.data.totalCount;
        })
      },
      handleInsurance(){
        this.getList()
      },
      searchData(){
        console.log("tttt",this.queryCondition,this.queryDate)
        if(this.queryCondition==''){
          this.listQuery.condition=this.queryDate;
        }else(this.queryDate=='')
        {
          this.listQuery.condition=this.queryCondition;
        }
        console.log("查询",this.listQuery)
        getInsurance(this.listQuery).then(re=>{
          console.log("查询结果",re)
          this.listQuery.page = 1
          this.list=re.data.data.list;
          this.total=re.data.totalCount;
        })
      },
      edit(index, row){
        this.edited=true;
        this.saveList=row;
        var valueDate=Math.round((row.expirydate-row.buydate)/(365*24*60*60*1000));
        if(valueDate<0){
          this.saveList.expiryyear=String(4)
        }else{
          this.saveList.expiryyear=valueDate.toString();
        }
        this.batchOption = true;


      },
      add(){
        this.edited=false;
        this.saveList = {
          idcard:'',
          name:'',
          policy_number:'',
          policy_company:'',
          buydate:'',
          expirydate:'',
          remarks:'',
          state:''
        }
        this.batchOption = true
      },
      handleSizeChange(val) {
        this.listQuery.limit = val
        this.getList()
      },
      handleCurrentChange(val) {
        this.listQuery.page = val
        this.getList()
      },
      addsInsurance(formName) {
        console.log("^^^^",formName)
        if(this.saveList.buydate){
          var date=new Date(this.saveList.buydate);
          var r=365*24*60*60*1000*Number(this.saveList.expiryyear);
          this.saveList.expirydate=this.saveList.buydate+r;
        }

        const set = this.$refs
        this.$refs[formName].validate((valid) => {
          if (valid) {
            addInsurance(this.saveList).then(r=> {
              this.getList()
              this.batchOption = false
              this.btnLoading = false
              console.log("r",r)
            })
          } else {
            return false
          }
        })
      },
      editInsurance(formName) {
        var date=new Date(this.saveList.buydate);
        var r=365*24*60*60*1000*Number(this.saveList.expiryyear);
        this.saveList.expirydate=this.saveList.buydate+r;
        editInsurance(this.saveList).then(r=> {
          this.getList()
          this.batchOption = false
          this.btnLoading = false
        })
      },
      cancel(formName) {
        this.batchOption = false;
        this.btnLoading = false
        this.saveList = {
          idcard:'',
          name:'',
          policy_number:'',
          policy_company:'',
          buydate:'',
          expirydate:'',
          remarks:'',
          state:''
        }
        // const set = this.$refs
        // set[formName].resetFields()
        this.getList()
      },
      lzbExport(){
        this.$store.dispatch('pushProhibit', this.layerid)
        this.lzbloding = true
        lzbExportExcel(this.listQuery).then(response => {
          var time = new Date()
          var blob = new Blob([response.data], { type: 'application/x-xls;charset=utf-8' })
          var downloadElement = document.createElement('a')
          var href = window.URL.createObjectURL(blob) // 创建下载的链接
          downloadElement.href = href
          downloadElement.download = '量子保(' + time.toLocaleString() + ').xls' // 下载后文件名
          document.body.appendChild(downloadElement)
          downloadElement.click() // 点击下载
          document.body.removeChild(downloadElement) // 下载完成移除元素
          window.URL.revokeObjectURL(href) // 释放掉blob对象
          this.lzbloding = false
          this.$store.dispatch('removeProhibit', this.layerid)
        })
      },
      rsExport(){
        this.$store.dispatch('pushProhibit', this.layerid)
        // this.rsbloding = true
        rsbExportExcel(this.listQuery).then(response => {
          var time = new Date()
          var blob = new Blob([response.data], { type: 'application/x-xls;charset=utf-8' })
          var downloadElement = document.createElement('a')
          var href = window.URL.createObjectURL(blob) // 创建下载的链接
          downloadElement.href = href
          downloadElement.download = '人寿保(' + time.toLocaleString() + ').xls' // 下载后文件名
          document.body.appendChild(downloadElement)
          downloadElement.click() // 点击下载
          document.body.removeChild(downloadElement) // 下载完成移除元素
          window.URL.revokeObjectURL(href) // 释放掉blob对象
          this.rsbloding = false
          this.$store.dispatch('removeProhibit', this.layerid)
        })
      },
      changeTab(tab, event){
        this.getList();
      },
      insuranceExport(formName){
        this.$refs[formName].validate((valid) => {
          if (valid) {
            this.exportData.state=this.listQuery.state;
            if(this.queryCondition==''){
              this.exportData.condition=this.queryDate;
            }else(this.queryDate=='')
            {
              this.exportData.condition=this.queryCondition;
            }
            console.log("@@@@@@@@",this.exportData)
            this.$store.dispatch('pushProhibit', this.layerid)
            this.dcloding = true;
            this.batchOption=false;
            ExportExcel(this.exportData).then(response => {
              var time = new Date()
              var blob = new Blob([response.data], { type: 'application/x-xls;charset=utf-8' })
              var downloadElement = document.createElement('a')
              var href = window.URL.createObjectURL(blob) // 创建下载的链接
              downloadElement.href = href
              downloadElement.download = '待投保(' + time.toLocaleString() + ').xls' // 下载后文件名
              document.body.appendChild(downloadElement)
              downloadElement.click() // 点击下载
              document.body.removeChild(downloadElement) // 下载完成移除元素
              window.URL.revokeObjectURL(href) // 释放掉blob对象
              this.dcloding = false
              this.$store.dispatch('removeProhibit', this.layerid)
            })

          } else {
            console.log('error submit!!');
            return false;
          }
        })
      },
      kmOneExport(){
        this.exportData.node=1;
        this.batchOption=true;
        console.log("科目一",this.exportData)
      },
      kmTwoExport(){
        this.exportData.node=2;
        this.batchOption=true;
        console.log("科目二",this.exportData)
      },
      exportAgain(){
        this.dcloding = true;
        this.importAgain=true;
        if(this.listQuery.condition){

          this.againData.condition=this.listQuery.condition;
        }


      },
      uploadExcel(){

      },
      exportMobel(){
          exportMoble(this.exportData).then(response => {
          var time = new Date()
          var blob = new Blob([response.data], { type: 'application/x-xls;charset=utf-8' })
          var downloadElement = document.createElement('a')
          var href = window.URL.createObjectURL(blob) // 创建下载的链接
          downloadElement.href = href
          downloadElement.download = '待保险(' + time.toLocaleString() + ').xls' // 下载后文件名
          document.body.appendChild(downloadElement)
          downloadElement.click() // 点击下载
          document.body.removeChild(downloadElement) // 下载完成移除元素
          window.URL.revokeObjectURL(href) // 释放掉blob对象
          this.mbloding = false
          this.$store.dispatch('removeProhibit', this.layerid)
        })
      },
      handleAvatarSuccess(res, file) {
        this.$message.info(res.msg);
        console.log("文件",res,file.raw)
      },
      beforeAvatarUpload(file) {

      },
      exportAg(){
        this.$store.dispatch('pushProhibit', this.layerid)
        this.dcloding = true
        this.importAgain=false;
        ExportExcel(this.againData).then(response => {
          var time = new Date()
          var blob = new Blob([response.data], { type: 'application/x-xls;charset=utf-8' })
          var downloadElement = document.createElement('a')
          var href = window.URL.createObjectURL(blob) // 创建下载的链接
          downloadElement.href = href
          downloadElement.download = '已生效(' + time.toLocaleString() + ').xls' // 下载后文件名
          document.body.appendChild(downloadElement)
          downloadElement.click() // 点击下载
          document.body.removeChild(downloadElement) // 下载完成移除元素
          window.URL.revokeObjectURL(href) // 释放掉blob对象
          this.dcloding = false
          this.$store.dispatch('removeProhibit', this.layerid)
        })
      }
    }

  };
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  .batch-page {
    .supervise_type_4 {
      color: #67c23a;
    }
    .batchCss {
      background-color: rgba(64, 158, 255, 0.1);
      display: inline-block;
      padding: 0 10px;
      height: 32px;
      line-height: 30px;
      font-size: 12px;
      color: #409eff;
      border-radius: 4px;
      box-sizing: border-box;
      border: 1px solid rgba(64, 158, 255, 0.2);
      white-space: nowrap;
      cursor: pointer;
    }
    .batchCss_selected {
      background-color: rgba(103, 194, 58, 0.1);
      border-color: rgba(103, 194, 58, 0.2);
      color: #67c23a;
    }
    .batchCss:hover {
      background-color: rgba(103, 194, 58, 0.1);
      border-color: rgba(103, 194, 58, 0.2);
      color: #67c23a;
    }
    .el-table th,
    .el-table tr {
      background-color: #c50202 !important;
    }
    .inputFiel{
      background-color: #20a0ff;
      color: #fff;
    }
  }
</style>
