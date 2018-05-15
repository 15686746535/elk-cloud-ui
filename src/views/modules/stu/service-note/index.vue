<template>
  <div class="app-container calendar-list-container" :style="{height: $store.state.app.client.height + 'px'}">
    <el-card>
      <div slot="header" class="clearfix">
        <span>学员收费</span>
        <div  style="float: right; padding: 3px 0" >
          <el-select v-model="studentId" @change="studentIdChange" filterable="" remote="" reserve-keyword placeholder="请输入关键词" :remote-method="getStudentList" :loading="studentListLoading">
            <el-option v-for="student in studentList" :key="student.studentId" :label="student.name" :value="student.studentId">
            </el-option>
          </el-select>
        </div>
      </div>

      <el-col style="border: 1px solid #1f2d3d;font-size: 12px;" v-loading="infoLoading" element-loading-text="T T 别急,一会儿就好~">
        <el-row :gutter="5" style="border-bottom: 1px solid #1f2d3d;font-size: 12px;">
          <el-col :span="4" style="border-right: 1px solid #1f2d3d;line-height: 50px;padding: 0 10px">
            {{new Date().getFullYear()}}年{{new Date().getMonth()}}月{{new Date().getDate()}}日
          </el-col>
          <el-col :span="3" style="border-right: 1px solid #1f2d3d;line-height: 50px;padding: 0 10px">
            <span class="text_css">校区：</span>
          </el-col>
          <el-col :span="6" style="border-right: 1px solid #1f2d3d;line-height: 50px;padding: 0 10px">
            <el-radio-group v-model="receivablesType">
              <el-radio label="全款"></el-radio>
              <el-radio label="定金"></el-radio>
              <el-radio label="定转全"></el-radio>
            </el-radio-group>

          </el-col>
          <el-col :span="4" style="border-right: 1px solid #1f2d3d;line-height: 50px;padding: 0 10px">
            <span class="text_css">姓名：</span>
          </el-col>
          <el-col :span="7" style="line-height: 50px;padding: 0 10px">

            <span class="text_css">身份证：</span>

          </el-col>
        </el-row>



        <el-row :gutter="5" style="border-bottom: 1px solid #1f2d3d; border-top: none;font-size: 12px;height: 100%">
          <el-col :span="1" style="padding: 0 10px;">
            <div style="width: 12px; word-wrap: break-word; margin: 0 auto;line-height: 75px">项目</div>
          </el-col>
          <el-col :span="23" style="border-left: 1px solid #1f2d3d;">
            <el-row style="line-height: 30px;padding: 0 10px;border-bottom: 1px solid #1f2d3d;">
              <span class="text_css">车型：</span>
            </el-row>
            <el-row style="line-height: 30px;padding: 0 10px;border-bottom: 1px solid #1f2d3d;">
              <span class="text_css">代收费：</span>
            </el-row>
            <el-row style="line-height: 30px;padding: 0 10px;border-bottom: 1px solid #1f2d3d;">
              <span class="text_css">培训费：</span>
            </el-row>
            <el-row style="line-height: 30px;padding: 0 10px;border-bottom: 1px solid #1f2d3d;">
              <span class="text_css">服务包：</span>
            </el-row>
            <el-row style="line-height: 30px;padding: 0 10px;">
              <span class="text_css">优惠：</span>
            </el-row>
          </el-col>
        </el-row>

        <!-- 收款 -->
        <el-row :gutter="5" style="border-bottom: 1px solid #1f2d3d; border-top: none;font-size: 12px;height: 100%">
          <el-col :span="1" style="padding: 0 10px;">
            <div style="width: 12px; word-wrap: break-word; margin: 0 auto;line-height: 100px">收款</div>
          </el-col>
          <el-col :span="23" style="border-left: 1px solid #1f2d3d;">
            <el-row style="line-height: 50px;padding: 0 10px">
              <span class="text_css">应收全款：￥</span>
              <input style="border: none;outline:none;border-bottom: #dcdfe6 1px solid;font-size: 12px;color: #606266;"/>

              <span class="text_css">，人名币大写：￥</span>
              <input style="border: none;outline:none;border-bottom: #dcdfe6 1px solid;font-size: 12px;color: #606266;"/>

            </el-row>
            <el-row style="line-height: 50px;padding: 0 10px">
              <span class="text_css">本次实收金额：￥</span>
              <input style="border: none;outline:none;border-bottom: #dcdfe6 1px solid;font-size: 12px;color: #606266;"/>

              <span class="text_css">，人名币大写：￥</span>
              <input style="border: none;outline:none;border-bottom: #dcdfe6 1px solid;font-size: 12px;color: #606266;"/>

            </el-row>
            <el-row style="line-height: 50px;padding: 0 10px;border-bottom: 1px solid #1f2d3d;">
              <span class="text_css">欠款金额：￥</span>
              <input style="border: none;outline:none;border-bottom: #dcdfe6 1px solid;font-size: 12px;color: #606266;"/>
            </el-row>
            <el-row style="line-height: 50px;padding: 0 10px">
              <span class="text_css">本次收款方式：</span>
            </el-row>
          </el-col>
        </el-row>


        <el-row :gutter="5" style="line-height: 50px;padding: 0 10px;border-top: none;font-size: 12px;height: 100%">
          <el-col :span="6" style="border-right: 1px solid #1f2d3d;text-align: center">
            <el-checkbox  v-model="receivablesType" label="学时卡已发放"></el-checkbox>
            <el-checkbox v-model="receivablesType" label="体检表已发放"></el-checkbox>
          </el-col>
          <el-col :span="5" style="border-right: 1px solid #1f2d3d;">
            销售员：
            <input style="border: none;outline:none;border-bottom: #dcdfe6 1px solid;font-size: 12px;color: #606266;"/>
          </el-col>
          <el-col :span="13">
            备注：
            <input style="border: none;outline:none;border-bottom: #dcdfe6 1px solid;font-size: 12px;color: #606266;"/>
          </el-col>
        </el-row>

      </el-col>








    </el-card>
  </div>
</template>

<script>
  import Coach from '@/components/Coach'
  import { removeAllSpace } from '@/utils/validate'
  import { getFinanceList, addFinance, putFinance, delFinance } from '@/api/finance/resitfee'
  import { mapGetters } from 'vuex'

  import { fetchStudentList, getStudent } from '@/api/student/student'

  import { userList } from '@/api/upms/user'

  export default {
    name: 'table_student',
    components: {
      Coach
    },
    data() {
      return {
        receivablesType: [],
        financeList: [],
        studentList: [],
        studentListLoading: false,
        infoLoading: false,
        financeListQuery: {
          page: 1,
          limit: 0,
          condition: null
        },
        studentListQuery: {
          page: 1,
          limit: 0,
          condition: null
        },
        studentId: null
      }
    },
    created() {
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
      // 获取所有服务包
      getFinanceList() {
        this.listLoading = true
        getFinanceList(this.financeListQuery).then(response => {
          console.log('===========================')
          console.log(response.data)
          this.financeList = response.data.data.list
          this.listLoading = false
        })
      },
      // 获取所有学员
      getStudentList(query) {
        if (query) {
          this.studentListLoading = true
          this.studentListQuery.condition = query
          console.log(this.studentListQuery)
          fetchStudentList(this.studentListQuery).then(response => {
            console.log(' ====== =============  这是所有学员信息  ==================')
            console.log(response.data)
            this.studentList = response.data.data.list
            this.studentListLoading = false
          })
        } else {
          this.studentList = []
        }
      },
      studentIdChange() {
        this.infoLoading = true
        getStudent(this.studentId).then(response => {
          console.log(response.data.data)
          this.student = response.data.data
          this.infoLoading = false
        })
      }
    }
  }
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  .text_css{
    color:#495060;
    font-size: 12px;
    word-break:keep-all;/* 不换行 */
    white-space:nowrap;/* 不换行 */
    overflow:hidden;/* 内容超出宽度时隐藏超出部分的内容 */
    text-overflow:ellipsis;/* 当对象内文本溢出时显示省略标记(...) ；需与overflow:hidden;一起使用。*/
  }
</style>
