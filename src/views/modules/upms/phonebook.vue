<template>
 <el-card style="height: 100%;">
     <el-button type="primary" round icon="el-icon-upload" @click="importPhoneNum">导入</el-button>
    <el-table :data="list" empty-text="暂无数据" v-loading="listLoading" :height="pageHeight - 190" :stripe="true" element-loading-text="拼命加载中···" border fit highlight-current-row style="width: 100%;text-align: center;margin-top:10px;" >
         <el-table-column align="center"  fixed  label="姓名" width="auto" >
          <template slot-scope="scope">
            <span>{{scope.row.name}}</span>
          </template>
        </el-table-column >
        <el-table-column align="center"  fixed  label="电话" width="auto" >
          <template slot-scope="scope">
            <span>{{scope.row.mobile}}</span>
          </template>
        </el-table-column >
        <el-table-column  align="center"  fixed  label="状态" width="auto" >
          <template slot-scope="scope">
            <el-tag v-if="scope.row.name!=null" type="success">在用</el-tag>
            <el-tag v-else type="danger">空余</el-tag>
          </template>
        </el-table-column >
    </el-table>
    <div class="pagination-container" style="margin-top: 15px;">
        <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange"
                       :current-page.sync="queryList.page" background
                       :page-sizes="[10,20,30, 50, 100, 200]" :page-size="queryList.limit"
                       style="padding-bottom: 11px;padding-top: 11px;float:left;"
                       layout="total, sizes, prev, pager, next, jumper" :total="total">
        </el-pagination>
      </div>
 </el-card>
</template>

<script>
import {findWorkMobile} from '@/api/upms/role'
export default {
    data(){
        return {
            listLoading:false,    
            total:null,
            list:[],
            open: false,
            pageHeight: this.area[1],
            pageWidth: this.area[0],  
            queryList:{
                page:1,
                limit:10
            }      
        }        
    },
    props: {
      layerid: String,
      area: Array
    },
    watch: {
      area: function(val) {
        this.pageHeight = val[1]
        this.pageWidth = val[0]
      }
    },
     created() {
      this.getMobileList()
    },
    methods:{
        getMobileList(){
          findWorkMobile(this.queryList).then(res=>{
                if(res.data.code==0){
                    this.list=res.data.data.list;
                    this.total=res.data.data.totalCount;
                    console.log("####",this.list);
                }
            })
        },
         /* 分页插件方法 */
      handleSizeChange(val) {
        this.studentListQuery.limit = val
        this.getList()
      },
      handleCurrentChange(val) {
        this.studentListQuery.page = val
        this.getList()
      },
      importPhoneNum(){
        var fso = new ActiveXObject("Scripting.FileSystemObject");
        var f = fso.OpenTextFile(filename,1);
        var s = "";
        while (!f.AtEndOfStream)
          s += f.ReadLine()+"\n";
        f.Close();
        return s;
      }
    }
}
</script>
