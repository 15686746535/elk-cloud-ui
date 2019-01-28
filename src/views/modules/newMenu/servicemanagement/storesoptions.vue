<template>
  <div class="storesoptions-view">
    <div class="stores-panel">
      <div class="panel-top">
        <div class="page-bar">
          <span class="page-txt">共8553条</span>
          <!--<span class="page-txt">上一页</span>-->

          <!--<span class="page-txt">下一页</span>-->
          <el-button type="text">上一页</el-button>
          <span class="page-txt">第25页</span>
          <el-button type="text">下一页</el-button>
        </div>
      </div>
      <div class="panel-body">
        <el-table ref="multipleTable" :data="stores" :stripe="true" tooltip-effect="dark" style="width: 100%;border-bottom:0">
          <el-table-column type="index" label="序号" align="center" width="auto"></el-table-column>
          <el-table-column align="center" label="报名点" width="auto">
            <template slot-scope="scope">{{ scope.row.bmd }}</template>
          </el-table-column>
          <el-table-column label="描述" align="center" width="auto">
            <template slot-scope="scope">{{ scope.row.ms }}</template>
          </el-table-column>
          <el-table-column label="排序" align="center" width="auto">
            <template slot-scope="scope">{{ scope.row.px }}</template>
          </el-table-column>
          <el-table-column label="创建时间" align="center" width="auto">
            <template slot-scope="scope">{{ scope.row.cjsj }}</template>
          </el-table-column>
          <el-table-column label="操作" align="center" width="auto">
            <!-- <el-button @click="dialogFormVisible=true" type="warning">编辑</el-button>
             <el-button  type="warning">删除</el-button> -->
            <template >
              <!-- <el-button @click="dialogFormVisible=true" type="warning">编辑</el-button>
              <el-button type="warning">删除</el-button> -->
              <button class="btstyle1" @click="dialogFormVisible=true">编辑</button>
              <button class="btstyle2">删除</button>
            </template>
          </el-table-column>
        </el-table>
         <el-dialog :modal="false" @close="cancel('dict')" :title="textMap[dialogStatus]" width="550px" :visible.sync="dialogFormVisible">
      <el-form label-position="left" :model="dict" :rules="rules" ref="dict" label-width="110px">
        <el-form-item label="校区"  prop="label">
          <el-input v-model="dict.label" placeholder="校区" ></el-input>
        </el-form-item>
        <el-form-item label="描述" prop="description">
          <el-input v-model="dict.description" placeholder="描述" ></el-input>
        </el-form-item>
        <el-form-item label="排序(升)" prop="sort">
          <el-popover ref="popover" placement="right" title="提示" width="200" trigger="hover" content="依据数字大小排序，数字越大排名越后">
          </el-popover>
          <el-input type="number" v-popover:popover v-model.number="dict.sort" placeholder="排序(升序)" ></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="cancel('dict')"><i class="el-icon-fa-undo"></i> 取 消</el-button>
        <el-button v-if="dialogStatus=='create'" type="primary" :loading="btnLoading" @click="create('dict')">确 定</el-button>
        <el-button v-else type="primary" :loading="btnLoading" @click="update('dict')">修 改</el-button>
      </div>
    </el-dialog>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        ranks: 1,
        dialogFormVisible: false,
        btnLoading:false,
        formLabelWidth: '120px',
        dialogStatus: '',
        dict: {},
        textMap: {
          update: '编辑',
          create: '创建'
        },
        form: {

        },
        stores: [{
          'bmd': '壹路北北校区',
          'ms': '壹路北碚校区',
          'px': '1',
          'cjsj': '2018-5-12'
        }, {
          'bmd': '壹路北北校区',
          'ms': '壹路北碚校区',
          'px': '1',
          'cjsj': '2018-5-12'
        }],
        rules: {
          label: [
            { required: true, message: '请填写校区名字', trigger: ['blur', 'change'] }
          ],
          description: [
            { required: true, message: '请填写校区描述', trigger: ['blur', 'change'] }
          ],
          sort: [
            { required: true, type: 'number', message: '请填写校区排序等级', trigger: ['blur', 'change'] }
          ]
        },
      }
    },
    methods: {
      handleChange(value) {
        console.log(value);
      },
      cancel(formName) {
        this.dialogFormVisible = false
        // this.dict = {}
        // this.getList()
        // this.$refs[formName].resetFields()
      },
      update(){
        this.dialogFormVisible = false
      }
    }
  }

</script>


<style rel="stylesheet/scss" lang="scss">
  /*主体白色*/
  $White: #fff;
  /*主体红色*/
  $Danger: #c50202;
  /*灰白色*/
  $BgColor: #eee;

  .storesoptions-view {
    width: 100%;
    height: 100%;
    background-color: $BgColor;

    .stores-panel {
      width: 100%;
      height: 100%;
      background-color: $White;

      .panel-top {
        width: 100%;
        height: 55px;

        border-bottom: solid 1px $BgColor;
      }

      .page-bar {
        position: absolute;
        right: 50px;
        top: 35px;

        .page-txt {
          color: #999;
          margin-left: 10px;
          font-size: 16px
        }

        .el-button--text {
          color: #999 !important;
          margin-left: 15px;
          font-size: 16px;
        }

        .el-button:active {
          color: $Danger !important;
        }
      }
      .panel-body{
       :focus {outline:none;}
       
      //  .btstyle2.button:active{
      //    color: #fff;
      //    background-color: $Dange;
      //  }
        .btstyle1{
          width: 66px;
          height: 35px;
          border: solid 1px #ffa351;
          color: #ffa351;
          background-color: rgba($color: #fff, $alpha: 0);
          border-radius: 8px;
          font-size: medium;
          cursor:pointer;          
        }
        .btstyle1:hover{
          color: #fff;
         background-color: #eeac73;
        }
       
        .btstyle2{
          width: 66px;
          height: 35px;
          border: solid 1px $Danger;
          color: $Danger;
          background-color: rgba($color: #fff, $alpha: 0);
          border-radius: 8px;
          font-size: medium;
          cursor:pointer;          
        }
        .btstyle2:hover{
          color: #fff;
         background-color: #cf3333;
        }
      }
    }
  }

</style>
