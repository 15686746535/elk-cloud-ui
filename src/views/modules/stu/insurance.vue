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
          <el-input size="mini" @keyup.enter.native="searchData"  placeholder="学员姓名/身份证" v-model="listQuery.condition"></el-input>
          <!-- @keyup.enter.native="" -->
        </el-col>
        <el-col :span="1">
          <el-button type="primary" size="mini" @click="searchData"><i class="el-icon-search"></i> 搜 索</el-button>
        </el-col>
       
        <el-table :data="list"   v-loading="listLoading"  :stripe="true" element-loading-text="给我一点时间" fit highlight-current-row height="450" style="width: 100%;text-align: center;">
        <el-table-column type="index" label="序号"  align="center" width="50"></el-table-column>
        <el-table-column align="center"  label="身份证号" width="200">
          <template slot-scope="scope">
            <span>{{scope.row.idcard }}</span>
          </template>
        </el-table-column>

        <el-table-column align="center"  label="姓名"  width="80">
          <template slot-scope="scope">
            <span>{{scope.row.name | subTime}}</span>
          </template>
        </el-table-column>

        <el-table-column v-if="listQuery.state==0" align="center"  label="入学日期"  width="100">
          <template slot-scope="scope">
            <span>{{scope.row.enrol_time | subTime}}</span>
          </template>
        </el-table-column>

        <el-table-column align="center" label="保险公司" width="120">
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

        <el-table-column align="left" label="操作" width="80">
        <template slot-scope="scope">
          <el-button type="primary" @click="edit(scope.$index, scope.row)" size="mini">编辑</el-button>
        </template>
      </el-table-column>

      </el-table>         
          <div v-show="!listLoading" class="pagination-container" style="margin-top: 20px;">
        <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" style="float: left"
                           :current-page.sync="listQuery.page" background
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
        <el-form-item label="姓名：" prop="name">
          <el-input v-if="edited" :disabled="true" v-model="saveList.name" style="width: 80%" :min="3" :max="15" label="投保人姓名"></el-input>
          <el-input v-else v-model="saveList.name" style="width: 80%" :min="3" :max="15" label="投保人姓名"></el-input>          
        </el-form-item>

        <el-form-item label="身份证号码：" prop="idcard">
          <el-input v-if="edited" :disabled="true" v-model="saveList.idcard" style="width: 80%" :min="3" :max="15" label="投保人身份证号码"></el-input>
          <el-input v-else v-model="saveList.idcard" style="width: 80%" :min="3" :max="15" label="投保人身份证号码"></el-input>
        </el-form-item>

        <el-form-item label="保险单号：" prop="policy_number">
          <el-input v-model="saveList.policy_number" style="width: 80%" :min="3" :max="15" label="保险单号"></el-input>
        </el-form-item>

        <el-form-item label="保险公司：" prop="policy_company">
          <el-input v-model="saveList.policy_company" style="width: 80%" :min="3" :max="15" label="保险公司"></el-input>
        </el-form-item>

        <el-form-item label="投保时间：" prop="buydate">
          <!-- <el-date-picker value-format="yyyy-MM-dd" style="width: 80%;" type="date" placeholder="选择日期" v-model="saveList.buydate" :picker-options="pickerOptions"></el-date-picker> -->
          <el-date-picker v-model="saveList.buydate" type="date" style="width: 80%"  placeholder="选择日期" format="yyyy-MM-dd"  value-format="timestamp"></el-date-picker>
        </el-form-item>

         <el-form-item label="有效期限：" prop="expiryyear">
          <!-- <el-date-picker value-format="yyyy-MM-dd" style="width: 100%;" type="dates" placeholder="选择一个或多个日期" v-model="saveList.expirydate" :picker-options="pickerOptions"></el-date-picker> -->
          <el-select v-model="saveList.expiryyear" style="width: 80%" placeholder="失效时间">
            <el-option v-for="year in yearList" :key="year.value" :label="year.label" :value="year.value"></el-option>
            </el-select>
        </el-form-item>

        <el-form-item label="备注：" prop="remarks">
          <el-input v-model="saveList.remarks" style="width: 80%" :min="3" :max="15" label="备注"></el-input>
        </el-form-item>

        <el-form-item label="状态：" prop="state">
          <el-select v-model="saveList.state" style="width: 80%" placeholder="投保状态">
            <el-option v-for="state in stateList" :key="state.value" :label="state.label" :value="state.value">
            </el-option>
          </el-select>
        </el-form-item>

        <div class="dialog-footer" align="right">
          <el-button @click="cancel('batch')"><i class="el-icon-fa-undo"></i> 取 消</el-button>
          <el-button v-if="edited"  :loading="btnLoading" type="primary" @click="editInsurance('saveList')">保存修改</el-button>
          <el-button v-else  :loading="btnLoading" type="primary" @click="addsInsurance('saveList')">添加</el-button>
        </div>
      </el-form>
    </el-dialog>
  </div>

</template>

<script>

import { getInsurance,searchInsurance,addInsurance,editInsurance} from '@/api/student/student'
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
  data() {    
    return{
      // tableHeight: this.area[1],
      listLoading:false,
      total:null,
      list:null,
      expirydate:null,
      edited:false,
      btnLoading:false,
      batchOption: false,
      listQuery:{
        state:'0',
        condition: null,
        page:1,
        limit:7
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
      pickerOptions: {
          disabledDate(time) {
            return time.getTime() < Date.now() + 1000 * 60 * 60 * 24 * 7;
          }
        },
       saveRules: {
          name:[{ required: true, message: '请输入投保人姓名', trigger: 'blur' }],
          idcard:[ { required: true,  message: '请输入投保人身份证号', trigger: ['blur'] }],
          policy_number:[ { required: true,  message: '请输入保险单号', trigger: ['blur'] }],
          policy_company:[{ required: true, message: '请输入投保公司', trigger: 'blur' }],
          buydate:[{ type: 'date', required: true, message: '请选择投保日期', trigger: 'change' }],
          expiryyear: [ { required: true, message: '请选择有效期', trigger: 'change' } ],
          state: [ { required: true, message: '请选择投保状态', trigger: 'change' } ],
        },
  }
  
  },
  created() {
    this.getList();
  },
  methods:{
    getList(){
      getInsurance(this.listQuery).then(res=>{
        console.log("2312312",res)
        this.list=res.data.data.list;
        this.total=res.data.totalCount;
      })
    },
    handleInsurance(){
      this.getList()
    },
    searchData(){
      // this.listQuery.condition=val
      searchInsurance(this.listQuery).then(re=>{
        console.log("rerere",re)
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
       console.log("eeee",valueDate)
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
      addsInsurance(formName) {
        console.log("^^^^",formName)
        var date=new Date(this.saveList.buydate);
        var r=365*24*60*60*1000*Number(this.saveList.expiryyear);
        this.saveList.expirydate=this.saveList.buydate+r;
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

