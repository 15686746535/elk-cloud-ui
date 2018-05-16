<template>
  <div class="app-container calendar-list-container" :style="{height: $store.state.app.client.height + 'px'}">
    <el-card  style="min-height: 820px">
      <div slot="header" class="clearfix">
        <span>学员收费</span>
        <div  style="float: right; padding: 3px 0" >
          <el-select v-model="stuServiceBuyNoteEntity.studentId" @change="studentIdChange" filterable="" remote="" reserve-keyword placeholder="请输入关键词" :remote-method="getStudentList" :loading="studentListLoading">
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
            <span class="text_css">校区：{{student.campus}}</span>
          </el-col>
          <el-col :span="6" style="border-right: 1px solid #1f2d3d;line-height: 50px;padding: 0 10px">
            <el-radio-group v-model="stuServiceBuyNoteEntity.receivablesType">
              <el-radio label="全款"></el-radio>
              <el-radio label="定金"></el-radio>
              <el-radio label="定转全"></el-radio>
            </el-radio-group>

          </el-col>
          <el-col :span="4" style="border-right: 1px solid #1f2d3d;line-height: 50px;padding: 0 10px">
            <span class="text_css">姓名：{{student.studentName}}</span>
          </el-col>
          <el-col :span="7" style="line-height: 50px;padding: 0 10px">

            <span class="text_css">身份证：{{student.idNumber}}</span>

          </el-col>
        </el-row>



        <el-row :gutter="5" style="border-bottom: 1px solid #1f2d3d; border-top: none;font-size: 12px;height: 100%">
          <el-col :span="1" style="padding: 0 10px;">
            <div style="width: 12px; word-wrap: break-word; margin: 0 auto;line-height: 75px">项目</div>
          </el-col>
          <el-col :span="23" style="border-left: 1px solid #1f2d3d;">
            <el-row style="line-height: 30px;padding: 0 10px;border-bottom: 1px solid #1f2d3d;">
              <span class="text_css">车型：{{student.motorcycleType}}</span>
            </el-row>
            <el-row style="line-height: 40px;padding: 0 10px;border-bottom: 1px solid #1f2d3d;">
              <el-col class="text_css" :span="1">
                <span >代收费：</span>
              </el-col>
              <el-col :span="23">
                <el-checkbox-group v-model="stuServiceBuyNoteEntity.financeList">
                  <el-checkbox v-for="finance in evenFinanceList('001')" :label="finance" :key="finance.categoryId">
                    {{finance.name}} {{finance.price}}元
                    <span v-if="finance.priceType === '1'">
                      /份*&nbsp;<input v-model="finance.number" style="border: none;
                                                                 outline:none;
                                                                 width: 50px;
                                                                 border-bottom: #dcdfe6 1px solid;
                                                                 font-size: 12px;
                                                                 color: #606266;"/>份
                    </span>
                  </el-checkbox>
                </el-checkbox-group>
              </el-col>

            </el-row>
            <el-row style="line-height: 40px;padding: 0 10px;border-bottom: 1px solid #1f2d3d;">
              <el-col class="text_css" :span="1">
                <span >培训费：</span>
              </el-col>
              <el-col :span="23">
                <el-checkbox-group v-model="stuServiceBuyNoteEntity.financeList">
                  <el-checkbox v-for="finance in evenFinanceList('002')" :label="finance" :key="finance.categoryId">
                    {{finance.name}} {{finance.price}}元
                    <span v-if="finance.priceType === '1'">
                      /份*&nbsp;<input v-model="finance.number" style="border: none;
                                                                 outline:none;
                                                                 width: 50px;
                                                                 border-bottom: #dcdfe6 1px solid;
                                                                 font-size: 12px;
                                                                 color: #606266;"/>份
                    </span>
                  </el-checkbox>
                </el-checkbox-group>
              </el-col>
            </el-row>
            <el-row style="line-height: 40px;padding: 0 10px;border-bottom: 1px solid #1f2d3d;">
              <el-col class="text_css" :span="1">
                <span >服务包：</span>
              </el-col>
              <el-col :span="23">
                <el-checkbox-group v-model="stuServiceBuyNoteEntity.financeList">
                  <el-checkbox v-for="finance in evenFinanceList('003')" :label="finance" :key="finance.categoryId">
                    {{finance.name}} {{finance.price}}元
                    <span v-if="finance.priceType === '1'">
                    /份*&nbsp;<input v-model="finance.number" style="border: none;
                                                               outline:none;
                                                               width: 50px;
                                                               border-bottom: #dcdfe6 1px solid;
                                                               font-size: 12px;
                                                               color: #606266;"/>份
                  </span>
                  </el-checkbox>
                </el-checkbox-group>
              </el-col>
            </el-row>
            <el-row style="line-height: 40px;padding: 0 10px;">
              <el-col class="text_css" :span="1">
                <span >优惠包：</span>
              </el-col>
              <el-col :span="23">
                <el-checkbox-group v-model="stuServiceBuyNoteEntity.financeList">
                  <el-checkbox v-for="finance in evenFinanceList('004')" :label="finance" :key="finance.categoryId">
                    {{finance.name}} {{finance.price}}元
                    <span v-if="finance.priceType === '1'">
                      /份*&nbsp;<input v-model="finance.number" style="border: none;
                                                                 outline:none;
                                                                 width: 50px;
                                                                 border-bottom: #dcdfe6 1px solid;
                                                                 font-size: 12px;
                                                                 color: #606266;"/>份
                    </span>
                  </el-checkbox>
                </el-checkbox-group>
              </el-col>
            </el-row>
          </el-col>
        </el-row>


        <!-- 收款 -->
        <el-row :gutter="5" style="border-bottom: 1px solid #1f2d3d; border-top: none;font-size: 12px;height: 100%">
          <el-col :span="1" style="padding: 0 10px;">
            <div style="width: 12px; word-wrap: break-word; margin: 0 auto;line-height: 75px">收款</div>
          </el-col>
          <el-col :span="23" style="border-left: 1px solid #1f2d3d;">
            <el-row style="line-height: 50px;padding: 0 10px">
              <span class="text_css">原价：￥</span>
              <input style="border: none;outline:none;border-bottom: #dcdfe6 1px solid;font-size: 12px;color: #606266;"/>

              <span class="text_css">活动价：￥</span>
              <input style="border: none;outline:none;border-bottom: #dcdfe6 1px solid;font-size: 12px;color: #606266;"/>

            </el-row>
            <el-row style="line-height: 50px;padding: 0 10px;border-bottom: 1px solid #1f2d3d;">
              <span class="text_css">已收定金：￥</span>
              <input style="border: none;outline:none;border-bottom: #dcdfe6 1px solid;font-size: 12px;color: #606266;"/>

              <span class="text_css">本次实收金额：￥</span>
              <input style="border: none;outline:none;border-bottom: #dcdfe6 1px solid;font-size: 12px;color: #606266;"/>

              <span class="text_css">，人名币大写：￥</span>
              <input style="border: none;outline:none;border-bottom: #dcdfe6 1px solid;font-size: 12px;color: #606266;"/>
            </el-row>
            <el-row  class="text_css"  style="line-height: 50px;padding: 0 10px">
              <el-col :span="2">
                <span >本次收款方式：</span>
              </el-col>
              <el-col :span="22">
                <span v-for="(payType,index) in payTypeList">
                  <span>
                    {{payType.mode}}：
                  </span>
                  <input v-model="payType.money" style="border: none;
                                                               outline:none;
                                                               width: 50px;
                                                               border-bottom: #dcdfe6 1px solid;
                                                               font-size: 12px;
                                                               color: #606266;"/>元
                  <span v-if="payTypeList.length !== (index+1)">，</span>
                </span>
                <!--<el-checkbox-group v-model="stuServiceBuyNoteEntity.payTypeList">-->
                  <!--<el-checkbox v-for="payType in payTypeList" :label="payType" :key="payType.mode">-->
                    <!--{{payType.mode}}：-->
                    <!--<input v-model="payType.money" style="border: none;-->
                                                               <!--outline:none;-->
                                                               <!--width: 50px;-->
                                                               <!--border-bottom: #dcdfe6 1px solid;-->
                                                               <!--font-size: 12px;-->
                                                               <!--color: #606266;"/>元-->
                  <!--</el-checkbox>-->
                <!--</el-checkbox-group>-->
              </el-col>
            </el-row>
          </el-col>
        </el-row>


        <el-row :gutter="5" style="line-height: 50px;padding: 0 10px;border-top: none;font-size: 12px;height: 100%">
          <el-col :span="6" style="border-right: 1px solid #1f2d3d;text-align: center">
            <el-checkbox  v-model="student.receivablesType" label="学时卡已发放"></el-checkbox>
            <el-checkbox v-model="student.receivablesType" label="体检表已发放"></el-checkbox>
          </el-col>
          <el-col :span="5" style="border-right: 1px solid #1f2d3d;">
            <span class="text_css">销售员：
              <span v-for="(introducerName,index) in student.introducerNameList">
                {{introducerName}}<span v-if="student.introducerNameList.length !== (index+1)">、</span>
              </span>
            </span>
          </el-col>
          <el-col :span="13">
            备注：
            <input style="border: none;outline:none;border-bottom: #dcdfe6 1px solid;font-size: 12px;color: #606266;"/>
          </el-col>
        </el-row>

      </el-col>
      <div style="float: right">
        <el-button @click=""><i class="el-icon-fa-save"></i> 提 交</el-button>
      </div>







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
        financeList: [],
        studentList: [],
        student: {},
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
        stuServiceBuyNoteEntity: {
          studentId: null,
          receivablesType: [],
          payTypeList: [{}],
          financeList: []
        },
        payTypeList: [
          {
            mode: '现金',
            money: null
          },
          {
            mode: '支付宝',
            money: null
          },
          {
            mode: '微信',
            money: null
          },
          {
            mode: '收钱吧',
            money: null
          },
          {
            mode: '刷卡',
            money: null
          },
          {
            mode: '其他',
            money: null
          }
        ]
      }
    },
    created() {
      this.getFinanceList()
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
      evenFinanceList(code) {
        return this.financeList.filter(function(finance) {
          return finance.code === code
        })
      },
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
        getStudent(this.stuServiceBuyNoteEntity.studentId).then(response => {
          console.log(response.data.data)
          this.student = response.data.data
          this.infoLoading = false
        })
      },
      smalltoBIG(n) {
        var fraction = ['角', '分']
        var digit = ['零', '壹', '贰', '叁', '肆', '伍', '陆', '柒', '捌', '玖']
        var unit = [['元', '万', '亿'], ['', '拾', '佰', '仟']]
        var head = n < 0 ? '欠' : ''
        n = Math.abs(n)

        var s = ''

        for (var i = 0; i < fraction.length; i++) {
          s += (digit[Math.floor(n * 10 * Math.pow(10, i)) % 10] + fraction[i]).replace(/零./, '')
        }
        s = s || '整'
        n = Math.floor(n)

        for (var i = 0; i < unit[0].length && n > 0; i++) {
          var p = ''
          for (var j = 0; j < unit[1].length && n > 0; j++) {
            p = digit[n % 10] + unit[1][j] + p
            n = Math.floor(n / 10)
          }
          s = p.replace(/(零.)*零$/, '').replace(/^$/, '零') + unit[0][i] + s
        }
        return head + s.replace(/(零.)*零元/, '元').replace(/(零.)+/g, '零').replace(/^整$/, '零元整')
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
