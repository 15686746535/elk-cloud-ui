<template>
  <div
    style="height: 100%"
    class="batch-page"
  >
    <el-card style="height: 100%; ">
      <el-row
        :gutter="6"
        style="height: 50px"
      >
        <el-col :span="10">
          <el-radio-group size="mini" @change="handleInsurance" v-model="listQuery.state">
            <el-radio-button label="0">待投保</el-radio-button>
            <el-radio-button label="1">待生效</el-radio-button>
            <el-radio-button label="2">生效中</el-radio-button>
            <el-radio-button label="99">已失效</el-radio-button>
            <el-radio-button label="-1">投保失败</el-radio-button>
          </el-radio-group>
        </el-col>
        <!-- <el-col :span="6">
          <el-date-picker value-format="timestamp" size="mini" style="width: 100%;"  type="daterange" align="left" unlink-panels range-separator="—" start-placeholder="开始日期" end-placeholder="结束日期">
          </el-date-picker>
        </el-col> -->

        <el-col :span="4"> 
          <el-input size="mini"  placeholder="学员姓名/身份证" v-model="listQuery.condition"      ></el-input>
          <!-- @keyup.enter.native="" -->
        </el-col>
        <el-col :span="1">
          <el-button type="primary" size="mini" @click="searchData"><i class="el-icon-search"></i> 搜 索</el-button>
        </el-col>
       
        <el-table :data="list"   v-loading="listLoading"  :stripe="true" element-loading-text="给我一点时间" fit highlight-current-row style="width: 100%;text-align: center;">
        <el-table-column type="index" label="序号"  align="center" width="50"></el-table-column>
        <el-table-column align="center"  label="身份证号" width="200">
          <template slot-scope="scope">
            <span>{{scope.row.idcard }}</span>
          </template>
        </el-table-column>

        <el-table-column align="center"  label="姓名"  width="auto">
          <template slot-scope="scope">
            <span>{{scope.row.name | subTime}}</span>
          </template>
        </el-table-column>

        <el-table-column v-show="listQuery.state==0" align="center"  label="入学日期"  width="100">
          <template slot-scope="scope">
            <span>{{scope.row.enrol_time | subTime}}</span>
          </template>
        </el-table-column>

        <el-table-column align="center" label="保险公司" width="auto">
          <template slot-scope="scope">
            {{scope.row.policy_company }}
          </template>
        </el-table-column>
        <el-table-column align="center"  label="保险单号" width="auto">
          <template slot-scope="scope">
            <span>{{scope.row.policy_number}}  </span>                     
          </template>
        </el-table-column>        

        <el-table-column align="center" label="投保时间" width="100">
          <template slot-scope="scope">          
          <span>{{scope.row.buydate | subTime}}</span>
          </template>
        </el-table-column>

        <el-table-column align="center"  label="失效时间" width="100">
          <template slot-scope="scope">
            <span>{{scope.row.expirydate | subTime}}</span>
          </template>
        </el-table-column>

        <el-table-column align="center"  label="备注"  width="auto">
          <template slot-scope="scope">
            <span>{{scope.row.remarks}}</span>
          </template>
        </el-table-column>

        <el-table-column align="center"  label="操作"  width="60">
          
            <el-button type="primary" @click="edit">编辑</el-button>
         
        </el-table-column>

      </el-table>
         
          <div v-show="!listLoading" class="pagination-container" style="margin-top: 20px;">
        <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange"
                       :current-page.sync="listQuery.page" background
                       style="float:left;"
                       :page-sizes="[10,20,30, 50]" :page-size="listQuery.limit"
                       layout="total, sizes, prev, pager, next, jumper" :total="total">
        </el-pagination>

       <el-button size="small" style="float:right;margin: 0 30px 10px" type="primary" @click="add">
           <i class="el-icon-plus"></i>添加
          </el-button>
      </div>
      </el-row>
    </el-card>

    <el-dialog :modal="false"  title="添加保险"  width="550px" :visible.sync="batchOption">
      <el-form :model="saveList" :rules="saveRules" ref="saveList" label-width="120px">
        <el-form-item label="姓名" prop="name">
          <el-input v-model="saveList.name" style="width: 100%" :min="3" :max="15" label="投保人姓名"></el-input>
        </el-form-item>
        <el-form-item label="身份证号码" prop="idcard">
          <el-input v-model="saveList.idcard" style="width: 100%" :min="3" :max="15" label="投保人身份证号码"></el-input>
        </el-form-item>
        <el-form-item label="保险单号" prop="policy_number">
          <el-input v-model="saveList.policy_number" style="width: 100%" :min="3" :max="15" label="保险单号"></el-input>
        </el-form-item>
        <el-form-item label="保险公司" prop="policy_company">
          <el-input v-model="saveList.policy_company" style="width: 100%" :min="3" :max="15" label="保险公司"></el-input>
        </el-form-item>
        <el-form-item label="投保时间" prop="buydate">
          <el-date-picker value-format="yyyy-MM-dd" style="width: 100%;" type="dates" placeholder="选择一个或多个日期" v-model="saveList.buydate" :picker-options="pickerOptions"></el-date-picker>
        </el-form-item>
         <el-form-item label="失效时间" prop="expirydate">
          <el-date-picker value-format="yyyy-MM-dd" style="width: 100%;" type="dates" placeholder="选择一个或多个日期" v-model="saveList.expirydate" :picker-options="pickerOptions"></el-date-picker>
        </el-form-item>
        <el-form-item label="备注" prop="remarks">
          <el-input v-model="saveList.remarks" style="width: 100%" :min="3" :max="15" label="备注"></el-input>
        </el-form-item>
        <el-form-item label="状态" prop="state">
          <el-select v-model="saveList.state" style="width: 100%" placeholder="投保状态">
            <el-option v-for="state in stateList" :key="state.value" :label="state.label" :value="state.value">
            </el-option>
          </el-select>
        </el-form-item>
        <div class="dialog-footer" align="right">
          <el-button :loading="btnLoading" type="primary" @click="saveInsurance('batchs')">确 定</el-button>
        </div>
      </el-form>
    </el-dialog>
  </div>

</template>

<script>

import { getInsurance,waitInsurance,addInsurance} from '@/api/student/student'
export default {
  
  //  watch: {
  //     area: function(val) {
  //       this.tableHeight = val[1]
  //     },
  //  },
  data() {    
    return{
      // tableHeight: this.area[1],
      listLoading:false,
      total:null,
      list:null,
      btnLoading:false,
      batchOption: false,
      listQuery:{
        state:'1',
        condition: null,
        page:1,
        limit:5
      },
      saveList:{
        idcard:'',
        name:'',
        policy_number:'',
        policy_company:'',
        buydate:'',
        expirydate:'',
        remarks:'',
        state:''
      },
      stateList:{},
      pickerOptions: {
          disabledDate(time) {
            return time.getTime() < Date.now() + 1000 * 60 * 60 * 24 * 7
          }
        },
      //  saveRules: {
      //     name:[{ required: true, message: '请输入活动名称', trigger: 'blur' }],
      //     idcard:[ { required: true, type: 'number', message: '请输入人数', trigger: ['blur', 'change'] }],
      //     examField: [
      //       { required: true, message: '请选择考试场地', trigger: ['blur', 'change'] }
      //     ],
      //     examTime: [
      //       { required: true, message: '请选择考试时间', trigger: ['blur', 'change'] }
      //     ]
      //   },
  }
  
  },
  created() {
    this.getList();
  },
  methods:{
    getList(){
      getInsurance(this.listQuery).then(res=>{
        console.log(res.data.data.list)
        this.list=res.data.data.list;
        this.total=res.data.totalCount;
      })
    },
    handleInsurance(){
      console.log(this.listQuery)
      this.getList()
    },
    searchData(){
      // this.listQuery.condition=val
      waitInsurance(this.listQuery).then(re=>{
        console.log("list",re.data)
        this.list=re.data.data.list;
        this.total=re.data.totalCount;
      })
      console.log(this.listQuery)
    },
    edit(){

    },
    add(){
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

        // this.batch.subject = this.listQuery.subject
        // this.dialogStatus = 'create'
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
      saveInsurance(formName) {
        this.btnLoading = true
            addInsurance(this.saveList).then(r=> {
              this.getList()
              this.batchOption = false
              this.btnLoading = false
              console.log("r",r)
            })
        // const set = this.$refs
        // set[formName].validate(valid => {
        //   if (valid) {
            
        //   } else {
        //     return false
        //   }
        // })
      },

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
}
</style>

