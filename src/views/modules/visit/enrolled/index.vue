<template>
  <div class="app-container calendar-list-container" :style="{height: $store.state.app.client.height + 'px'}">
    <div v-show="showModule=='list'" style="height: 100%">
      <el-row :gutter="5">


        <el-col class="org-tree-left">
          <el-card>
            <span style="font-size: 16px;font-family: '微软雅黑 Light';color:rgb(145,145,145)">权限筛选</span>
            <my-tree url="/upms/org/tree" v-model="listQuery.orgId"  @node="searchByOrg"></my-tree>
          </el-card>
        </el-col>

        <el-col :style="{width: ($store.state.app.client.width-250) + 'px'}">
          <el-card style="margin-bottom: 5px;height: 80px;">
            <el-date-picker :style="{width: ($store.state.app.client.width/7)*1.5 + 'px'}" value-format="timestamp" v-model="interval" type="daterange" align="right" unlink-panels range-separator="—" start-placeholder="来访时间" end-placeholder="来访时间" :picker-options="pickerOptions">
            </el-date-picker>
            <el-select :style="{width: ($store.state.app.client.width/10) + 'px'}" v-model="listQuery.introducer" clearable placeholder="负责人">
              <el-option
                v-for="item in userList"
                :key="item.userId"
                :label="item.name"
                :value="item.userId">
              </el-option>
            </el-select>
            <dict :style="{width: ($store.state.app.client.width/10) + 'px'}" dictType="dict_customer_type" v-model="listQuery.customerType" style="width: 200px;"  placeholder="类型"></dict>
            <dict :style="{width: ($store.state.app.client.width/10) + 'px'}" dictType="dict_source" v-model="listQuery.source" style="width: 200px;"  placeholder="来源渠道"></dict>
            <el-input :style="{width: ($store.state.app.client.width/8) + 'px'}" @keyup.enter.native="searchClick" style="width: 200px;" class="filter-item" placeholder="关键词" v-model="listQuery.condition"></el-input>
            <el-button class="filter-item" type="primary"   @click="searchClick">搜 索</el-button>
          </el-card>
          <el-card :style="{height: (client.height-125) + 'px'}">
            <div class="intentions"  :style="{height: (client.height-205) + 'px'}" v-loading="listLoading" element-loading-text="给我一点时间" >
              <div class="intention" v-for="intention in list" @click="intentionClick(intention.intentionId,$event)" ><!--@dblclick="editList(intention) "-->
                <div style="width: 100%;height: 25px">
                  <div class="intention_text" style="width: 50%;float: left;font-size: 18px;">{{intention.name}}</div>
                  <div class="intention_text" style="width: 50%;float: left;font-size: 16px;text-align: right">{{intention.customerType}}</div>
                </div>

                <!-- 分割线 -->
                <div style="width: 100%;float: left;border: none;border-bottom:1px solid #9fcfff;"></div>
                <div style="width: 100%;height: 25px">
                  <div class="intention_text" style="width: 50%;float: left">性别：{{intention.sex | sexFilter}}</div>
                  <div class="intention_text" style="width: 50%;float: left">负责人：{{intention.userName}}</div>
                </div>

                <div class="intention_text" style="width: 100%;float: left">电话：{{intention.mobile}}</div>

                <div class="intention_text" style="width: 100%;float: left">微信：{{intention.wechat}}</div>

                <div class="intention_text" style="width: 100%;float: left">住址：{{intention.contactAddress}}</div>

                <div class="intention_text" style="width: 100%;float: left">顾虑：{{intention.worry}}</div>

                <div class="intention_text" style="width: 100%;float: left">渠道：{{intention.source}}</div>
              </div>
            </div>
            <div v-show="!listLoading" class="pagination-container" style="margin-top: 10px;clear: both">
              <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange"
                             :current-page.sync="listQuery.page"
                             background style="float: left;"
                             :page-sizes="[10,20,30, 50]" :page-size="listQuery.limit"
                             layout="total, sizes, prev, pager, next, jumper" :total="total">
              </el-pagination>
              <el-button class="filter-item" style="float: right;" @click="open" type="success" icon="plus">重新分配</el-button>
            </div>

          </el-card>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
  import { fetchList, putIntention } from '@/api/visit/intention'
  import { mapGetters } from 'vuex'
  import { userList } from '@/api/upms/user'
  import { removeAllSpace } from '@/utils/validate'

  export default {
    name: 'table_intention',
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
          introducer: null,
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
        userList: [],
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
        // apply_type
        intentionList: {
          intentionIds: [],
          uCondition: 'no',
          state: -1
        }
      }
    },
    created() {
      this.getList()
      this.getUserList()
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
      getUserList() {
        userList().then(response => {
          console.log('================== 所有负责人 ===================')
          console.log(response.data)
          this.operators = response.data.data
        })
      },
      // 根据部门id查询员工
      searchByOrg() {
        console.log('=====================   根据部门id查询来访信息   =======================')
        this.listQuery.page = 1
        this.getList()
      },
      getList() {
        this.listLoading = true
        fetchList(this.listQuery).then(response => {
          this.list = response.data.data.list
          console.log('====== 意向信息 =====')
          console.log(this.list)
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
      searchClick() {
        this.intervalTime()
        this.listQuery.page = 1
        this.listQuery.condition = removeAllSpace(this.listQuery.condition)
        this.getList()
      },
      // 来访信息点击事件
      intentionClick(id, e) {
        var classList = e.currentTarget.classList
        console.log('========== 点击事件 ===========')
        console.log(this.hasClass(classList, 'intention_selected'))
        if (this.hasClass(classList, 'intention_selected')) {
          classList.remove('intention_selected')
          this.delNodeId(id)
        } else {
          classList.add('intention_selected')
          this.intentionList.intentionIds.push(id)
        }
        console.log(this.intentionList.intentionIds)
      },
      delNodeId(id) {
        for (var i = 0; i < this.intentionList.intentionIds.length; i++) {
          if (this.intentionList.intentionIds[i] === id) this.intentionList.intentionIds.splice(i, 1)
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
          putIntention(this.intentionList).then(() => {
            this.$message({
              type: 'success',
              message: '分配成功'
            })
            this.getList()
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

  .intentions {
    overflow:auto;
  }
  .intention {
    float: left;
    width: 242px;
    height: 218px;
    margin:5px;
    cursor: pointer;
    border: 1px solid #449ffb;
    border-radius: 5px 5px;
    border-bottom: 4px solid #449ffb;
    box-shadow: 5px 3px 3px #ffffff;
    padding: 5px;
    transition: border-color 0.2s,box-shadow 0.2s;
  }
  /*.intention_btn:hover{*/
  /*background-color: #449ffb;*/
  /*}*/
  .intention:hover{
    border-color: #67c23a;
  }
  .intention_selected {
    border-color: #67c23a;
    box-shadow: 5px 3px 3px #b2b6bd;
  }
  .intention_text{
    color:#495060;
    margin: 2px 0;
    font-size: 14px;
    line-height: 25px;
    word-break:keep-all;/* 不换行 */
    white-space:nowrap;/* 不换行 */
    overflow:hidden;/* 内容超出宽度时隐藏超出部分的内容 */
    text-overflow:ellipsis;/* 当对象内文本溢出时显示省略标记(...) ；需与overflow:hidden;一起使用。*/
  }

</style>

