<template>
  <div class="app-container calendar-list-container" :style="{height: client.height + 'px'}">
    <div v-show="showModule=='list'" style="height: 100%">
      <el-row :gutter="5">


        <el-col class="org-tree-left">
          <el-card>
            <span style="font-size: 16px;font-family: '微软雅黑 Light';color:rgb(145,145,145)">权限筛选</span>
            <org-tree @node-click="searchByOrg" ></org-tree>
          </el-card>
        </el-col>

        <el-col :style="{width: (client.width-250) + 'px'}">
          <el-card style="margin-bottom: 5px;height: 80px;">
            <el-date-picker v-model="interval" type="daterange" align="right" unlink-panels range-separator="至" start-placeholder="来访时间" end-placeholder="来访时间" :picker-options="pickerOptions">
            </el-date-picker>
            <el-select v-model="listQuery.operator" clearable placeholder="负责人">
              <el-option
                v-for="item in operators"
                :key="item"
                :label="item"
                :value="item">
              </el-option>
            </el-select>
            <dict dictType="dict_customer_type" v-model="listQuery.customerType" style="width: 200px;"  placeholder="类型"></dict>
            <dict dictType="dict_source" v-model="listQuery.source" style="width: 200px;"  placeholder="来源渠道"></dict>
            <el-input @keyup.enter.native="handleFilter" style="width: 200px;" class="filter-item" placeholder="关键词" v-model="listQuery.condition"></el-input>
            <el-button class="filter-item" type="primary" v-waves icon="search" @click="search">搜索</el-button>
            <el-button class="filter-item" style="margin-left: 10px;" @click="create" type="primary" icon="plus">添加</el-button>
          </el-card>
          <el-card :style="{height: (client.height-125) + 'px'}">
            <div class="visits"  :style="{height: (client.height-205) + 'px'}"  v-loading="listLoading" element-loading-text="给我一点时间" >
              <div class="visit" v-for="visit in list" @click="visitClick($event)"  @dblclick="editlist(visit)">
                <div style="width: 222px;margin: 9px 10px;">
                  <div style="width: 50%;float: left">
                      <div class="visit_text">姓名：{{visit.name}}</div>
                      <div class="visit_text">性别：{{visit.sex | sexFilter}}</div>
                      <div class="visit_text">负责人：{{visit.operator}}</div>
                  </div>
                  <div style="width: 50%;float: left">
                      <div class="visit_text">类别：{{visit.customerType}}</div>
                      <div class="visit_text">渠道：{{visit.source}}</div>
                  </div>

                  <!-- 分割线 -->
                  <div style="width: 100%;float: left;border: none;border-bottom:1px solid #d3dce6;margin: 5px 0; "></div>
                  <div style="width: 100%;height: 88px;float: left">

                      <div class="visit_text">微信：{{visit.wechat}}</div>
                      <div class="visit_text">电话：{{visit.mobile}}</div>
                      <div class="visit_text">住址：{{visit.contactAddress}}</div>
                      <div class="visit_text">顾虑：{{visit.worry}}</div>
                  </div>

                </div>
              </div>
            </div>
            <div v-show="!listLoading" class="pagination-container" style="margin-top: 20px;clear: both">
              <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange"
                             :current-page.sync="listQuery.page"
                             background
                             :page-sizes="[10,20,30, 50]" :page-size="listQuery.limit"
                             layout="total, sizes, prev, pager, next, jumper" :total="total">
              </el-pagination>
            </div>
            <!--<el-table :data="list" v-loading="listLoading" element-loading-text="给我一点时间" border fit
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
              &lt;!&ndash;<el-table-column align="center" label="备注" width="200">&ndash;&gt;
                &lt;!&ndash;<template slot-scope="scope">&ndash;&gt;
                  &lt;!&ndash;<span>{{scope.row.remark}}</span>&ndash;&gt;
                &lt;!&ndash;</template>&ndash;&gt;
              &lt;!&ndash;</el-table-column>&ndash;&gt;
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

            </el-table>-->

          </el-card>
        </el-col>
      </el-row>
    </div>
    <div v-show="showModule=='info'">

      <el-row :gutter="20">
        <el-col :span="12">
          <el-card>
            <div slot="header" class="clearfix">
              <div style="float: left">
                |&nbsp;<span style="font-size: 16px;font-family: '微软雅黑 Light';color:rgb(145,145,145)">意向信息</span>
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
                 <el-col :span="6" ><div class="text_css">负责人：</div></el-col>
                 <el-col :span="14" >
                   <el-input v-if="edit" disabled v-model="intention.operator" placeholder="负责人"></el-input>
                   <div style="padding-left: 16px;font-size: 12px;" v-else>{{intention.operator}}</div>
                 </el-col>
               </el-row>

               <el-row>
                   <el-col :span="6" ><div class="text_css">性别：</div></el-col>
                 <el-col :span="14" >
                   <template v-if="edit">
                     <el-radio v-model="intention.sex" label="1">男</el-radio>
                     <el-radio v-model="intention.sex" label="0">女</el-radio>
                   </template>
                   <!--<el-input v-if="edit"  v-model="intention.sex" placeholder="性别"></el-input>-->
                   <div style="padding-left: 16px;font-size: 12px;" v-else>{{intention.sex | sexFilter}}</div>
                 </el-col>
               </el-row>

               <el-row>
                 <el-col :span="6" ><div class="text_css">客户类型：</div></el-col>
                 <el-col :span="14" >
                   <dict v-if="edit" v-model="intention.customerType" dictType="dict_customer_type" style="width: 100%;"  placeholder="客户类型"></dict>
                   <!--<el-input v-if="edit"  v-model="intention.customerType" placeholder="客户类型"></el-input>-->
                   <div style="padding-left: 16px;font-size: 12px;" v-else>{{intention.customerType}}</div>
                 </el-col>
               </el-row>

               <el-row>
                 <el-col :span="6" ><div class="text_css">客户顾虑：</div></el-col>
                 <el-col :span="14" >
                   <!--<el-input v-if="edit"  v-model="intention.worry" placeholder="顾虑"></el-input>-->
                   <dict v-if="edit" v-model="intention.worry" dictType="dict_worry" style="width: 100%;"  placeholder="客户类型"></dict>
                   <div style="padding-left: 16px;font-size: 12px;" v-else>{{intention.worry}}</div>
                 </el-col>
               </el-row>

               <el-row>
                 <el-col :span="6" ><div class="text_css">来访时间：</div></el-col>
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
                   <dict v-if="edit" dictType="dict_source" style="width: 100%;" v-model="intention.source"  placeholder="来源渠道"></dict>
                   <!--<el-input v-if="edit" v-model="intention.source" placeholder="来源"></el-input>-->
                   <div style="padding-left: 16px;font-size: 12px;" v-else>{{intention.source}}</div>
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

                   <dict v-if="edit" v-model="intention.applyType" dictType="dict_moctorcycle_type" style="width: 100%;"  placeholder="车型"></dict>
                   <div style="padding-left: 16px;font-size: 12px;" v-else>{{intention.applyType}}</div>
                 </el-col>
               </el-row>

               <el-row>
                 <el-col :span="6" ><div class="text_css">客户状态：</div></el-col>
                 <el-col :span="14" >
                   <el-select  v-if="edit" v-model="intention.state" style="width: 100%" clearable placeholder="客户状态"  @selectDict="getState">
                     <el-option
                       v-for="item in state"
                       :key="item.value"
                       :label="item.label"
                       :value="item.value">
                     </el-option>
                   </el-select>
                   <div style="padding-left: 16px;font-size: 12px;" v-else>{{stateLabel}}</div>
                 </el-col>
               </el-row>

             </el-col>
             <el-col :span="3" ><div class="text_css">咨询内容：</div></el-col>
             <el-col :span="19" >
               <el-input v-if="edit" type="textarea" v-model="intention.content" placeholder="咨询内容"></el-input>
               <div style="padding-left: 16px;font-size: 12px;" v-else>{{intention.content}}</div>
             </el-col>
           </el-row>


            <!-- 分割线 -->
            <el-row><el-col>&nbsp;</el-col></el-row>

            <el-row>
              <el-col>

                <el-row v-if="edit">
                  <el-row  v-if="!addInfo" :gutter="10">
                    <el-col :span="6">&nbsp;</el-col>
                    <el-col :span="6"><el-button type="info" style="width: 100%;" @click="cancel">取消</el-button></el-col>
                    <el-col :span="6"><el-button v-if="!addInfo" type="primary" style="width: 100%;" @click="update">确认修改</el-button></el-col>
                    <el-col :span="6">&nbsp;</el-col>
                  </el-row>
                  <el-row v-if="addInfo">
                    <el-col :span="8">&nbsp;</el-col>
                    <el-col :span="8"><el-button type="primary" style="width: 100%;" @click="add">确认保存</el-button></el-col>
                    <el-col :span="8">&nbsp;</el-col>
                  </el-row>
                </el-row>

                <el-row v-else :gutter="10">
                  <el-col :span="8">&nbsp;</el-col>
                  <el-col :span="8"><el-button type="primary" style="width: 100%;" @click="editInfo">编辑信息</el-button></el-col>
                  <el-col :span="8">&nbsp;</el-col>
                </el-row>

              </el-col>

            </el-row>

          </el-card>
        </el-col>

        <el-col :span="12">
          <el-row>
            <el-card style="padding-bottom: 10px">
              <div slot="header" class="clearfix">
                <div style="float: left">
                  |&nbsp;<span style="font-size: 16px;font-family: '微软雅黑 Light';color:rgb(145,145,145)">跟进信息</span>
                </div>
                <!--<div style="float: right">-->
                  <!--<el-button type="primary" style="width: 174px;float: right" @click="back">返回</el-button>-->
                <!--</div>-->
              </div>

              <el-row>
                <div style="width: 100%;overflow: auto;height: 350px;margin-bottom: 10px">
                  <div style="line-height: 30px" v-for="followUps in followUps">
                    <div style="color:#495060;font-size: 16px;">{{followUps.operator}}:<span style="font-size: 7px;color: mediumblue">({{followUps.createTime | parseTime('{y}/{m}/{d} {h}:{i}:{s}')}})</span></div>
                    <el-tag  type="success" style="font-size: 14px;margin-left: 20px;border-radius: 10px;">{{followUps.content}}</el-tag>
                  </div>
                </div>
              </el-row>

              <el-row :gutter="10">
                <el-col :span="20" >
                  <el-input type="textarea" :autosize="{ minRows: 3, maxRows: 3}" v-model="followUp.content" placeholder="跟进内容"></el-input>
                </el-col>
                <el-col :span="4" ><el-button style="width: 100%;height: 76px;" type="success" @click="addFollowUp">跟进</el-button></el-col>
              </el-row>

            </el-card>
          </el-row>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
  import { fetchList, addObj, getObj, putObj, getOperator } from '@/api/visit/intention'
  import { followUpList, addFollowUp } from '@/api/visit/followup'
  import OrgTree from '@/components/OrgTree'
  import Dict from '@/components/Dict'
  import { mapGetters } from 'vuex'
  import waves from '@/directive/waves/index.js'// 水波纹指令

  export default {
    name: 'table_intention',
    components: {
      OrgTree,
      Dict
    },
    directives: {
      waves
    },
    data() {
      return {
        list: [],
        intention: {},
        total: null,
        addInfo: false,
        listLoading: true,
        showModule: 'list',
        interval: [],
        followUp: {
          content: null,
          intentionId: null
        },
        followUps: [],
        followQuery: {
          intentionId: null
        },
        listQuery: {
          page: 1,
          limit: 20,
          orgId: null,
          condition: null,
          source: null,
          customerType: null,
          beginTime: null,
          endTime: null,
          state: 0,
          operator: null,
          followUp: true
        },
        stateLabel: '跟进中',
        bgImg: 'static/img/bj.png',
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
        customerType: [],
        operators: [],
        edit: true,
        state: [{
          value: '0',
          label: '跟进中'
        }, {
          value: '1',
          label: '待入学'
        }, {
          value: '2',
          label: '已关闭'
        }]
        // apply_type
      }
    },
    created() {
      this.getList()
      this.getOperators()
    },
    computed: {
      ...mapGetters([
        'permissions',
        'client'
      ]),
      sexVO() {
        const typeMap = {
          1: '男',
          0: '女'
        }
        return typeMap[this.student.sex]
      }
    },
    methods: {
      intervalTime() {
        console.log('================== 时间转换 ===================')
        if (this.interval) {
          this.listQuery.beginTime = this.interval[0]
          this.listQuery.endTime = this.interval[1]
        } else {
          this.listQuery.beginTime = null
          this.listQuery.endTime = null
        }
      },
      getState(val) {
        this.stateLabel = val.value
      },
      getOperators() {
        getOperator().then(response => {
          console.log('================== 所有负责人 ===================')
          console.log(response.data)
          this.operators = response.data.data
        })
      },
      // 根据部门id查询员工
      searchByOrg(data) {
        console.log('=====================   根据部门id查询来访信息   =======================')
        this.listQuery.page = 1
        this.listQuery.orgId = data.id
        this.getList()
      },
      // 双击行  编辑
      editlist(val) {
        console.log('====================== 正在进入单个学员编辑 =====================')
        this.edit = false
        this.intention = val
        this.showModule = 'info'
        this.getFollowUp(val)
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
      // 添加点击按钮
      create() {
        this.addInfo = true
        this.intention = {}
        this.showModule = 'info'
        this.edit = true
      },
      // 编辑
      editInfo() {
        this.edit = true
      },
      // 添加
      add() {
        addObj(this.intention).then(response => {
          console.log('这里是添加方法===========================')
        })
        this.edit = false
      },
      // 修改
      update() {
        console.log('================= 修改 ==================')
        console.log(this.intention)
        putObj(this.intention)
          .then(response => {
            this.edit = false
          })
      },
      // 搜索
      search() {
        this.intervalTime()
        this.listQuery.page = 1
        this.getList()
      },
      // 删除
      delete(id) {
        this.getList()
      },
      // 取消
      cancel() {
        getObj(this.intention.intentionId).then(response => {
          console.log('================= 取消 ==================')
          console.log(response.data)
          this.intention = response.data.data
        })
        this.edit = false
      },
      // 返回
      back() {
        this.showModule = 'list'
        this.addInfo = false
        this.intention = {}
        this.edit = false
        this.getList()
        this.getOperators()
      },
      // 来访信息点击事件
      visitClick(e) {
        console.log(e)
        var a = document.getElementsByClassName('visit')
        for (var i = 0; i < a.length; i++) {
          a[i].classList.remove('visit_hover')
        }
        e.currentTarget.classList.add('visit_hover')
      },
      getFollowUp(val) {
        this.followQuery.intentionId = val.intentionId
        this.followUp.intentionId = val.intentionId
        followUpList(this.followQuery).then(response => {
          console.log('============= 跟进信息 ===================')
          console.log(response.data.data.list)
          this.followUps = response.data.data.list
        })
      },
      addFollowUp() {
        console.log('=================')
        addFollowUp(this.followUp).then(response => {
          console.log('0.0')
          this.getFollowUp(this.followQuery)
          this.followUp.content = null
        })
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
  .visits {
    overflow:auto;
  }
  .visit {
    float: left;
    width: 242px;
    height: 218px;
    margin:5px;
    cursor: pointer;
    background-image: url(../../../../static/img/bj1.png);
    transition: background-image 0.2s;
  }
  .visit_hover {
    background-image: url(../../../../static/img/bj.png);
  }
  .visit:hover {
    background-image: url(../../../../static/img/bj.png);
  }
  .visit_text{
    color:#495060;
    font-size: 13px;
    line-height: 25px;
    word-break:keep-all;/* 不换行 */
    white-space:nowrap;/* 不换行 */
    overflow:hidden;/* 内容超出宽度时隐藏超出部分的内容 */
    text-overflow:ellipsis;/* 当对象内文本溢出时显示省略标记(...) ；需与overflow:hidden;一起使用。*/
  }
  .text_css{
    color:#495060;
    font-size: 16px;
    word-break:keep-all;/* 不换行 */
    white-space:nowrap;/* 不换行 */
    overflow:hidden;/* 内容超出宽度时隐藏超出部分的内容 */
    text-overflow:ellipsis;/* 当对象内文本溢出时显示省略标记(...) ；需与overflow:hidden;一起使用。*/
  }

</style>

