<template>
  <el-card>
    <input type="file" @change="getFile" ref="fileInput"/>
    <el-button type="primary" icon="el-icon-circle-plus-outline" @click="pushPhoneNumList">导入</el-button>
    <el-button type="primary" icon="el-icon-plus" @click="addPhoneNum">单条添加</el-button>
    <el-button type="primary" icon="el-icon-delete" @click="deleteNumList">删除号码</el-button>
    <el-table :data="list" empty-text="暂无数据" v-loading="listLoading" :height="pageHeight - 190" :stripe="true"
              @selection-change="deletePhoneNumList"
              element-loading-text="拼命加载中···" border fit highlight-current-row
              style="width: 100%;text-align: center;margin-top:10px;">
      <el-table-column type="selection"></el-table-column>
      <el-table-column align="center" fixed label="姓名" width="auto">
        <template slot-scope="scope">
          <span>{{scope.row.name}}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" fixed label="电话" width="auto">
        <template slot-scope="scope">
          <span>{{scope.row.mobile}}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" fixed label="状态" width="auto">
        <template slot-scope="scope">
          <el-tag v-if="scope.row.name!=null" type="success">在用</el-tag>
          <el-tag v-else type="danger">空余</el-tag>
        </template>
      </el-table-column>
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
  import { findWorkMobile ,batchAddMoblie,deleteWorkMobile,saveWorkMobile} from "@/api/upms/role";

  export default {
    data() {
      return {
        listLoading: false,
        total: null,
        list: [],
        phoneNumList: {
          mobiles:[]
        },
        deleteList: {
          mobilenum:[]
        },
        open: false,
        pageHeight: this.area[1],
        pageWidth: this.area[0],
        queryList: {
          page: 1,
          limit: 10
        }
      };
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
      this.getMobileList();
    },
    methods: {
      getMobileList() {
        findWorkMobile(this.queryList).then(res => {
          if (res.data.code == 0) {
            this.list = res.data.data.list;
            this.total = res.data.data.totalCount;
          }
        });
      },
      /* 分页插件方法 */
      handleSizeChange(val) {
        this.queryList.limit = val;
        this.getMobileList();
      },
      handleCurrentChange(val) {
        this.queryList.page = val;
        this.getMobileList();
      },
      getFile() {
        let _this=this
        const file = this.$refs.fileInput.files[0];
        const fr = new FileReader();
        let phoneNumList=[];
        fr.readAsText(file);
        fr.onload = function(e) {
          phoneNumList=e.currentTarget.result.split("\n");
        };
        setTimeout(function timer() {
          _this.phoneNumList.mobiles=JSON.parse(JSON.stringify(phoneNumList));
        },300)
      },
      pushPhoneNumList(){
        if(this.phoneNumList.mobiles.length>0){
          batchAddMoblie(this.phoneNumList
          ).then(res=>{
            if (res.data.code==0){
              this.$message.success("导入成功！");
            }
          })
        }
      },
      deletePhoneNumList(val){
        var deleteList=[];
        val.forEach(function(v,index) {
          deleteList.push(v.mobile);
        })
        this.deleteList.mobilenum=deleteList;
        console.log("@@@@",this.deleteList)
      },
      deleteNumList(){
        if(this.deleteList.mobilenum.length){
          deleteWorkMobile(this.deleteList).then(res=>{
            if(res.data.code==0){
              this.$message.success("删除成功！");
              this.getMobileList();
            }else this.$message.error("好像出了点小问题··")
          })
        }
        else this.$message.error("请选择要删除的号码！")
      },
      addPhoneNum(){
        this.$prompt('请输入手机号', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          inputPattern:  /^1\d{10}$/,
          inputErrorMessage: '号码格式不正确'
        }).then(({ value }) => {
          console.log("手机号码",typeof(value),value)
          saveWorkMobile(value).then(res=>{
            if(res.data.code==0){
              this.getMobileList();
              this.$message({
                type: 'success',
                message: '添加成功！'
              });
            }
          })
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '取消输入'
          });
        });
      }
    }
  };
</script>
