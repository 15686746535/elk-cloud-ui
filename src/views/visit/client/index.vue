<template>
  <div class="app-container calendar-list-container">
    <div v-show="showModule=='list'">
      <el-row :gutter="25">


        <el-col :xs="4" :sm="4" :md="8" :lg="6" :xl="4" >
          <el-card style="min-width: 200px">
            <span style="font-size: 16px;font-family: '微软雅黑 Light';color:rgb(145,145,145)">权限筛选</span>
            <org-tree @node-click="searchByOrg" ></org-tree>

          </el-card>
        </el-col>
        <el-col :xs="16" :sm="16" :md="16" :lg="18" :xl="20" >
          <el-row>
            <el-card style="margin-bottom: 5px;">
              <div>
                <el-date-picker v-model="listQuery.timeList" type="daterange" align="right" unlink-panels range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期" :picker-options="pickerOptions">
                </el-date-picker>
                <el-select v-model="listQuery.subject" clearable placeholder="科目">
                  <el-option
                    v-for="item in subject"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                  </el-option>
                </el-select>
                <dict dictType="dict_sex" style="width: 200px;"  placeholder="车型筛选" @selectDict="getDict"></dict>
                <dict dictType="dict_sex" style="width: 200px;"  placeholder="来源渠道" @selectDict="getDict"></dict>
                <el-input @keyup.enter.native="handleFilter" style="width: 200px;" class="filter-item" placeholder="关键词" v-model="listQuery.condition"></el-input>
                <el-button class="filter-item" type="primary" v-waves icon="search" @click="search">搜索</el-button>
                <el-button class="filter-item" style="margin-left: 10px;" @click="create" type="primary" icon="plus">添加</el-button>
              </div>
            </el-card>
          </el-row>
          <el-row>

            <el-card>
              <el-table :data="list" v-loading="listLoading" element-loading-text="给我一点时间" border fit
                        highlight-current-row  @row-dblclick="editlist"  style="width: 100%">
                <el-table-column type="index" label="序号"  align="center" width="50"></el-table-column>
                <el-table-column align="center" label="姓名">
                  <template slot-scope="scope">
                    <span>{{scope.row.name}}</span>
                  </template>
                </el-table-column>
                <el-table-column align="center" label="车型">
                  <template slot-scope="scope">
                    <span>{{scope.row.applyType}}</span>
                  </template>
                </el-table-column>
                <el-table-column align="center" label="咨询内容" width="150">
                  <template slot-scope="scope">
                    <span>{{scope.row.content}}</span>
                  </template>
                </el-table-column>
                <el-table-column align="center" label="性别">
                  <template slot-scope="scope">
                    <span>{{scope.row.sex | sexFilter}}</span>
                  </template>
                </el-table-column>
                <el-table-column align="center" label="电话" width="150">
                  <template slot-scope="scope">
                    <span>{{scope.row.mobile}}</span>
                  </template>
                </el-table-column>
                <el-table-column align="center" label="微信号" width="150">
                  <template slot-scope="scope">
                    <span>{{scope.row.wechat}}</span>
                  </template>
                </el-table-column>
                <el-table-column align="center" label="客户类别">
                  <template slot-scope="scope">
                    <span>{{scope.row.customerType}}</span>
                  </template>
                </el-table-column>
                <el-table-column align="center" label="联系地址" width="200">
                  <template slot-scope="scope">
                    <span>{{scope.row.contactAddress}}</span>
                  </template>
                </el-table-column>
                <el-table-column align="center" label="来访日期" width="100">
                  <template slot-scope="scope">
                    <span>{{scope.row.visitTime | parseTime('{y}-{m}-{d}')}}</span>
                  </template>
                </el-table-column>
                <!--<el-table-column align="center" label="备注" width="200">-->
                  <!--<template slot-scope="scope">-->
                    <!--<span>{{scope.row.remark}}</span>-->
                  <!--</template>-->
                <!--</el-table-column>-->
                <el-table-column align="center" label="操作人" width="150">
                  <template slot-scope="scope">
                    <span>{{scope.row.operator}}</span>
                  </template>
                </el-table-column>
                <el-table-column align="center" label="更新时间" width="100">
                  <template slot-scope="scope">
                    <span>{{scope.row.updateTime | parseTime('{y}-{m}-{d}')}}</span>
                  </template>
                </el-table-column>

                <el-table-column align="center" label="操作" fixed="right" width="150">
                  <template slot-scope="scope">
                    <el-button size="mini" type="success"
                               @click="update(scope.row)">编辑
                    </el-button>
                    <el-button size="mini" type="danger"
                               @click="delete(scope.row)">删除
                    </el-button>
                  </template>
                </el-table-column>

              </el-table>
              <div v-show="!listLoading" class="pagination-container" style="margin-top: 20px">
                <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange"
                               :current-page.sync="listQuery.page"
                               background
                               :page-sizes="[10,20,30, 50]" :page-size="listQuery.limit"
                               layout="total, sizes, prev, pager, next, jumper" :total="total">
                </el-pagination>
              </div>
            </el-card>
          </el-row>
        </el-col>
      </el-row>
    </div>
    <div v-show="showModule=='info'">

      <el-row :gutter="20">
        <el-col :span="12">
          <el-card>
            <div slot="header" class="clearfix">
              <div style="float: left">
                |&nbsp;<span style="font-size: 16px;font-family: '微软雅黑 Light';color:rgb(145,145,145)">学员信息</span>
              </div>
              <div style="float: right">
                <el-button type="primary" style="width: 174px;float: right" @click="back">返回</el-button>
              </div>
            </div>

           <el-row style="line-height: 50px;">
             <el-col :span="12">

               <el-row>
                 <el-col :span="6" ><div class="text_css">姓名：</div></el-col>
                 <el-col :span="14" >
                   <el-input v-if="edit"  v-model="intention.name" placeholder="姓名"></el-input>
                   <div style="padding-left: 16px;font-size: 12px;" v-else>{{intention.name}}</div>
                 </el-col>
               </el-row>

               <el-row>
                   <el-col :span="6" ><div class="text_css">性别：</div></el-col>
                 <el-col :span="14" >
                   <el-input v-if="edit"  v-model="intention.sex" placeholder="性别"></el-input>
                   <div style="padding-left: 16px;font-size: 12px;" v-else>{{intention.sex | sexFilter}}</div>
                 </el-col>
               </el-row>

               <el-row>
                 <el-col :span="6" ><div class="text_css">客户类型：</div></el-col>
                 <el-col :span="14" >
                   <el-input v-if="edit"  v-model="intention.customerType" placeholder="客户类型"></el-input>
                   <div style="padding-left: 16px;font-size: 12px;" v-else>{{intention.customerType}}</div>
                 </el-col>
               </el-row>

               <el-row>
                 <el-col :span="6" ><div class="text_css">顾虑：</div></el-col>
                 <el-col :span="14" >
                   <el-input v-if="edit"  v-model="intention.name" placeholder="顾虑"></el-input>
                   <div style="padding-left: 16px;font-size: 12px;" v-else>{{intention.name}}</div>
                 </el-col>
               </el-row>

               <el-row>
                 <el-col :span="6" ><div class="text_css">时间：</div></el-col>
                 <el-col :span="14" >
                   <el-date-picker  v-if="edit" type="date" placeholder="时间"  style="width: 100%" v-model="intention.visitTime"></el-date-picker>
                   <div style="padding-left: 16px;font-size: 12px;" v-else>{{intention.visitTime | parseTime('{y}-{m}-{d}')}}</div>
                 </el-col>
               </el-row>

             </el-col>

             <el-col :span="12">

               <el-row>
                 <el-col :span="6" ><div class="text_css">电话：</div></el-col>
                 <el-col :span="14" >
                   <el-input v-if="edit"  v-model="intention.mobile" placeholder="电话"></el-input>
                   <div style="padding-left: 16px;font-size: 12px;" v-else>{{intention.mobile}}</div>
                 </el-col>
               </el-row>

               <el-row>
                 <el-col :span="6" ><div class="text_css">微信：</div></el-col>
                 <el-col :span="14" >
                   <el-input v-if="edit"  v-model="intention.wechat" placeholder="微信"></el-input>
                   <div style="padding-left: 16px;font-size: 12px;" v-else>{{intention.wechat}}</div>
                 </el-col>
               </el-row>

               <el-row>
                 <el-col :span="6" ><div class="text_css">来源：</div></el-col>
                 <el-col :span="14" >
                   <el-input v-if="edit"  v-model="intention.name" placeholder="来源"></el-input>
                   <div style="padding-left: 16px;font-size: 12px;" v-else>{{intention.name}}</div>
                 </el-col>
               </el-row>

               <el-row>
                 <el-col :span="6" ><div class="text_css">住址：</div></el-col>
                 <el-col :span="14" >
                   <el-input v-if="edit"  v-model="intention.contactAddress" placeholder="住址"></el-input>
                   <div style="padding-left: 16px;font-size: 12px;" v-else>{{intention.contactAddress}}</div>
                 </el-col>
               </el-row>
               <el-row>
                 <el-col :span="6" ><div class="text_css">车型：</div></el-col>
                 <el-col :span="14" >
                   <el-input v-if="edit"  v-model="intention.name" placeholder="车型"></el-input>
                   <div style="padding-left: 16px;font-size: 12px;" v-else>{{intention.name}}</div>
                 </el-col>
               </el-row>

             </el-col>
           </el-row>

          <el-row>
            <el-col :span="3" ><div class="text_css">咨询内容：</div></el-col>
            <el-col :span="19" >
              <el-input v-if="edit" type="textarea" v-model="intention.name" placeholder="咨询内容"></el-input>
              <div style="padding-left: 16px;font-size: 12px;" v-else>{{intention.name}}</div>
            </el-col>
          </el-row>

            <!-- 分割线 -->
            <el-row><el-col>&nbsp;</el-col></el-row>

            <el-row>
              <el-col>

                <el-row v-if="edit" :gutter="60">
                  <el-col :span="12"><el-button v-if="!addInfo" type="info" style="width: 100%;" @click="cancel">取消</el-button></el-col>
                  <el-col :span="12"><el-button v-if="addInfo" type="primary" style="width: 100%;" @click="add">确认保存</el-button></el-col>
                  <el-col :span="12"><el-button v-if="!addInfo" type="primary" style="width: 100%;" @click="update">确认修改</el-button></el-col>
                </el-row>

                <el-row v-else :gutter="60">
                  <el-col :span="12"><el-button type="success" style="width: 100%;" @click="editInfo">收款</el-button></el-col>
                  <el-col :span="12"><el-button type="primary" style="width: 100%;" @click="editInfo">编辑信息</el-button></el-col>
                </el-row>

              </el-col>

            </el-row>

          </el-card>
        </el-col>

        <el-col :span="12">
          <el-row>
            <el-card>
              <div slot="header" class="clearfix">
                <div style="float: left">
                  |&nbsp;<span style="font-size: 16px;font-family: '微软雅黑 Light';color:rgb(145,145,145)">学员信息</span>
                </div>
                <div style="float: right">
                  <el-button type="primary" style="width: 174px;float: right" @click="back">返回</el-button>
                </div>
              </div>



              <div class="dialog-footer">
                <el-button @click="cancel">取 消</el-button>
                <el-button v-if="dialogStatus=='create'" type="primary" @click="create">确 定</el-button>
                <el-button v-else type="primary" @click="update">修 改</el-button>
              </div>
            </el-card>
          </el-row>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
  import { fetchList, getObj } from '@/api/visit/client'
  import OrgTree from '@/components/OrgTree'
  import Dict from '@/components/Dict'
  import waves from '@/directive/waves/index.js' // 水波纹指令

  export default {
    name: 'table_client',
    components: {
      OrgTree,
      Dict
    },
    directives: {
      waves
    },
    data() {
      return {
        client: {},
        list: [],
        intention: {},
        total: null,
        addInfo: false,
        listLoading: true,
        showModule: 'list',
        listQuery: {
          page: 1,
          limit: 20,
          orgId: null
        },
        dialogStatus: '',
        pickerOptions: {
          shortcuts: [{
            text: '昨天',
            onClick(picker) {
              const end = new Date(new Date().setHours(0, 0, 0, 0))
              const start = new Date(new Date().setHours(0, 0, 0, 0))
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 1)
              picker.$emit('pick', [start, end])
            }
          }, {
            text: '近三天',
            onClick(picker) {
              const end = new Date()
              const start = new Date()
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 3)
              picker.$emit('pick', [start, end])
            }
          }, {
            text: '本周',
            onClick(picker) {
              const end = new Date()
              const day = new Date(new Date().setHours(0, 0, 0, 0))
              var week = day.getDay()
              if (week === 0) week = 7
              const start = day
              start.setTime(start.getTime() - 3600 * 1000 * 24 * (week - 1))
              picker.$emit('pick', [start, end])
            }
          }, {
            text: '本月',
            onClick(picker) {
              const end = new Date()
              const start = new Date(new Date().setHours(0, 0, 0, 0))
              start.setDate(1)
              picker.$emit('pick', [start, end])
            }
          }]
        },
        subject: [{
          value: 1,
          label: '科目一'
        }, {
          value: 2,
          label: '科目二'
        }, {
          value: 3,
          label: '科目三'
        }, {
          value: 4,
          label: '科目四'
        }],
        edit: true
      }
    },
    created() {
      this.getList()
    },
    methods: {
      // 根据部门id查询员工
      searchByOrg(data) {
        console.log('=====================   根据部门id查询学员信息   =======================')
      },
      // 字典
      getDict(val) {
      },
      // 双击行  编辑
      editlist(val) {
        console.log('====================== 正在进入单个学员编辑 =====================')
        // getObj(val.userId).then(response => {
        //   console.log(response.data)
        //   this.userListEdit = response.data.data
        // })
        this.intention = val
        this.showModule = 'info'
      },
      getList() {
        this.listLoading = true
        fetchList(this.listQuery).then(response => {
          this.list = response.data.data.list
          this.total = response.data.data.totalCount
          this.listLoading = false
        })
      },
      handleSizeChange(val) {
        this.listQuery.limit = val
        this.getList()
      },
      handleCurrentChange(val) {
        this.listQuery.page = val
        this.getList()
      },
      create() {
        this.client = {}
        this.showModule = 'info'
      },
      // 编辑
      editInfo() {
        this.edit = true
      },
      // 添加
      add() {
        // addObj(this.userListEdit).then(response => {
        //   console.log('这里是添加方法===========================')
        //   this.userListEdit.userId = response.data.data
        //   console.log(this.vehicle.vehicleEntity.vehicleId)
        // })
        this.edit = false
      },
      update(row) {
        getObj(row.roleId)
          .then(response => {
            this.client = response.data
            this.showModule = 'info'
          })
      },
      search() {
        this.listQuery.page = 1
        this.getList()
      },
      delete(id) {
        this.getList()
      },
      cancel() {
        this.edit = false
      },
      back() {
        this.showModule = 'list'
      }
    }
  }
</script>

<style>


  .clearfix:before,
  .clearfix:after {
    display: table;
    content: "";
  }
  .clearfix:after {
    clear: both
  }
  .subject{
    width: 140px;
    height: 30px;
    display:block;
    margin: 10px auto;
    color: rgb(124,124,124);
    background: none;
    border: none;
    font-size: 14px;
  }
  .pass{
    width: 70px;
    height: 30px;
    border-radius: 10px;
    color: #fff;
    text-align: center;
    border: none;
    background-color: rgb(66,185,131);
  }
  .noPass{
    width: 70px;
    height: 30px;
    border-radius: 10px;
    color:#fff;
    border: none;
    text-align: center;
    background-color: rgb(177,177,177);
  }
  .cost{
    width: 140px;
    height: 30px;
    display:block;
    margin: 10px auto;
    text-align: left;
    color: rgb(124,124,124);
    background: none;
    border: none;
    font-size: 14px;
  }
  .image {
    max-width: 200px;
    max-height: 200px;
  }
  .text_css{
    color:#495060;
    font-size: 18px;
    word-break:keep-all;/* 不换行 */
    white-space:nowrap;/* 不换行 */
    overflow:hidden;/* 内容超出宽度时隐藏超出部分的内容 */
    text-overflow:ellipsis;/* 当对象内文本溢出时显示省略标记(...) ；需与overflow:hidden;一起使用。*/
  }

</style>

