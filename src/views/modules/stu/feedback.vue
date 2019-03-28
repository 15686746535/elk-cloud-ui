<template>
<div>    
  <el-card>
  <el-col :xs="6" :sm="6" :md="6" :lg="4" :xl="4" style="margin-bottom:10px;">
          <el-input @keyup.enter.native="searchClick"  placeholder="姓名/电话/身份证" clearable  v-model="conditions"></el-input>
  </el-col>
  
  <el-col :xs="2" :sm="2" :md="2" :lg="2" :xl="4" style="margin-bottom:10px;margin-left:10px;">
          <el-select v-model="condition" clearable placeholder="请选择反馈内容">
            <el-option v-for="item in contents" :key="item.value" :label="item.label" :value="item.label">
            </el-option>
          </el-select>
  </el-col>

  <el-col :xs="2" :sm="2" :md="2" :lg="2" :xl="2" style="margin-bottom:10px;margin-left:10px;">
          <el-button type="primary"  @click="searchClick"><i class="el-icon-search"></i>搜索</el-button>
  </el-col >
  </el-card>

  <el-card style="margin-top:10px;">
    <el-table :data="list" empty-text="暂无数据" v-loading="listLoading" :height="pageHeight - 230"  :stripe="true"              
              element-loading-text="拼命加载中···" border fit highlight-current-row
              style="width: 100%;text-align: center;margin-top:10px;">     
      <el-table-column align="center" fixed label="姓名" width="90">
        <template slot-scope="scope">
          <span>{{scope.row.name}}</span>
        </template>
      </el-table-column>
      
      <el-table-column align="center"  label="电话" width="auto">
        <template slot-scope="scope">
          <span>{{scope.row.mobile}}</span>
        </template>
      </el-table-column>

      <el-table-column align="center"  label="身份证" width="auto">
        <template slot-scope="scope">
          <span>{{scope.row.idNumber}}</span>
        </template>
      </el-table-column>

      <el-table-column align="center"  label="反馈时间" width="auto">
        <template slot-scope="scope">
          <span>{{scope.row.feedbackTime | subTime}}</span>
        </template>
      </el-table-column>

      <el-table-column align="center"  label="反馈内容" width="auto">
        <template slot-scope="scope">
          <span>{{scope.row.feedbackContent}}</span>
        </template>
      </el-table-column>

      <el-table-column align="center"  label="反馈类型" width="90">
        <template slot-scope="scope">
          <span>{{scope.row.feedbackType}}</span>
        </template>
      </el-table-column>
      
      <el-table-column align="center"  label="反馈结果" width="110" show-overflow-tooltip>
        <template slot-scope="scope">          
          <!-- 0未处理 1已处理 -->
         <el-button type="primary" v-if="scope.row.state==0" @click="dealFeedBack(scope.$index, scope.row)">处理</el-button>
         <el-button v-else type="success" disabled>已处理</el-button>
        </template>
      </el-table-column>
    </el-table>
  </el-card>
    <div class="pagination-container" style="margin-top: 15px;margin-bottom:15px;">
      <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange"
                     :current-page.sync="queryList.page" background
                     :page-sizes="[10,20,30, 50, 100, 200]" :page-size="queryList.limit"
                     style="padding-bottom: 11px;padding-top: 11px;float:left;"
                     layout="total, sizes, prev, pager, next, jumper" :total="total">
      </el-pagination>     
    </div>
</div>
</template>

<script>
import {getFeedBack,setFeedback} from '@/api/student/student'
export default {
    data(){
        return{
            total:null,
            list:[],
            listLoading:false,
            time:0,
            condition:'',
            conditions:'',
            queryList:{              
                page:1,    
                limit:10,            
                condition:''
            },
            contents:[{
              value:1,
              label:'所有的时间段都满了，约不到'
            },
            {
              value:2,
              label:'想要的时间段约不到。想要的时间段是'
              },
            {
              value:3,
              label:'想要的日期无法指定'
              }],
            pageHeight: this.area[1],
            pageWidth: this.area[0],
        }
    },
     props: {
      layerid: String,
      area: Array
    },
    watch: {
      area: function(val) {
        this.pageHeight = val[1];
        this.pageWidth = val[0];
      }
    },
     created() {
      this.getList();
    },
    methods: {     
        /* 分页插件方法 */
      handleSizeChange(val) {
        this.queryList.limit = val;
        this.getList();
      },
      handleCurrentChange(val) {
        this.queryList.page = val;
        this.getList();
      },
      getList(){
        getFeedBack(this.queryList).then(res=>{
          if(res.data.code==0){
            this.total=res.data.data.totalCount;
            this.list=res.data.data.list;
          }
        })
      },
      searchClick(){
        this.queryList.page = 1;     
        if(this.condition=='') {                    
          this.queryList.condition=this.conditions;
        this.getList();
        }  
        else if(this.conditions==''){
          this.queryList.condition=this.condition;
          this.getList();
        }
        else
        this.getList();
      },
      dealFeedBack(index,row){
        if(row.state==0){
          let fid=row.fid;
          let state=1;       
          let data={fid:fid,state:state}   ;
        setFeedback(data).then(re=>{
          if(re.data.code==0)
          this.getList();
        })
        }

      }
    }
}
</script>
