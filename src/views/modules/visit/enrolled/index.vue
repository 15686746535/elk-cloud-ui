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

        <el-col :style="{width: (client.width-225) + 'px'}">
          <el-card style="margin-bottom: 5px;height: 80px;">
            <el-date-picker v-model="interval" type="daterange" align="right" unlink-panels range-separator="—" start-placeholder="来访时间" end-placeholder="来访时间" :picker-options="pickerOptions">
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
            <el-input @keyup.enter.native="search" style="width: 200px;" class="filter-item" placeholder="关键词" v-model="listQuery.condition"></el-input>
            <el-button class="filter-item" type="primary" v-waves icon="search" @click="handleFilter">搜索</el-button>
            <el-button class="filter-item" style="margin-left: 10px;" @click="open" type="success" icon="plus">重新分配</el-button>
          </el-card>
          <el-card :style="{height: (client.height-125) + 'px'}">
            <div class="visits"  :style="{height: (client.height-205) + 'px'}" v-loading="listLoading" element-loading-text="给我一点时间" >
              <div class="visit" v-for="visit in list" @click="visitClick(visit.intentionId,$event)" ><!--@dblclick="editlist(visit) "-->
                <div style="width: 222px;height: 200px;margin: 9px 10px;">
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
                  <!--<el-row class="visit_text">-->
                  <!--<el-col :span="5">微信：</el-col>-->
                  <!--<el-col :span="19">{{visit.wechat}}</el-col>-->
                  <!--</el-row>-->
                  <!--<el-row class="visit_text">-->
                  <!--<el-col :span="5">电话：</el-col>-->
                  <!--<el-col :span="19">{{visit.mobile}}</el-col>-->
                  <!--</el-row>-->
                  <!--<el-row class="visit_text">-->
                  <!--<el-col :span="5">住址：</el-col>-->
                  <!--<el-col :span="19">{{visit.contactAddress}}</el-col>-->
                  <!--</el-row>-->
                  <!--<el-row class="visit_text">-->
                  <!--<el-col :span="5">顾虑：</el-col>-->
                  <!--<el-col :span="19">{{visit.worry}}</el-col>-->
                  <!--</el-row>-->

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

          </el-card>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
  import { fetchList, addObj, getObj, putObj, getOperator } from '@/api/visit/intention'
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
        listLoading: true,
        showModule: 'list',
        interval: [],
        listQuery: {
          page: 1,
          limit: 20,
          orgId: null,
          condition: null,
          source: null,
          customerType: null,
          beginTime: null,
          endTime: null,
          state: '1',
          operator: null,
          followUp: true
        },
        stateLabel: '',
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
        operators: [],
        state: [{
          value: '0',
          label: '跟进中'
        }, {
          value: '1',
          label: '待入学'
        }, {
          value: '2',
          label: '已关闭'
        }],
        intentionIds: []
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
      // 搜索
      handleFilter() {
        this.intervalTime()
        this.listQuery.page = 1
        this.getList()
      },
      // 来访信息点击事件
      visitClick(id, e) {
        var classList = e.currentTarget.classList
        console.log('========== 点击事件 ===========')
        console.log(this.hasClass(classList, 'visit_hover'))
        if (this.hasClass(classList, 'visit_hover')) {
          classList.remove('visit_hover')
          this.delNodeId(id)
        } else {
          classList.add('visit_hover')
          this.intentionIds.push(id)
        }
        console.log(this.intentionIds)
      },
      delNodeId(id) {
        for (var i = 0; i < this.intentionIds.length; i++) {
          if (this.intentionIds[i] === id) this.intentionIds.splice(i, 1)
        }
      },
      hasClass(classList, clazz) {
        for (var i = 0; i < classList.length; i++) {
          if (classList[i] === clazz) {
            return true
          }
        }
        return false
      },
      open() {
        this.$confirm('是否将选择信息重新分配', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'info'
        }).then(() => {
          this.$message({
            type: 'success',
            message: '移交成功'
          })
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消移交'
          })
        })
      }
    }
  }
</script>

<style>

  .visits {
    overflow:auto;
  }
  .visit {
    float: left;
    width: 242px;
    height: 218px;
    margin:5px;
    cursor: pointer;
    background-image: url(../../../../../static/img/bj1.png);
    transition: background-image 0.2s;
  }
  .visit_hover {
    background-image: url(../../../../../static/img/bj.png);
  }
  .visit:hover {
    background-image: url(../../../../../static/img/bj.png);
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

</style>

