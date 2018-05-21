<template>
  <div class="app-container calendar-list-container" :style="{height: $store.state.app.client.height + 'px'}">
    <el-card  style="min-height: 820px">
      <div slot="header" class="clearfix">
        <span>
          <el-radio-group  @change="handleSubject" v-model="flag">
            <el-radio-button label="1">添加收费</el-radio-button>
            <el-radio-button label="2">补齐费用</el-radio-button>
          </el-radio-group>
        </span>
        <div style="float: right; padding: 3px 0" >
          <el-select style="width: 300px;" v-model="stuServiceBuyNoteEntity.studentId" @change="studentIdChange" filterable="" remote="" reserve-keyword placeholder="请输入姓名/电话/身份证" :remote-method="getStudentList" :loading="studentListLoading">
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
            <span class="text_css">姓名：{{student.name}}</span>
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
                <el-checkbox-group @change="calculation" v-model="stuServiceBuyNoteEntity.financeList">
                  <el-checkbox v-for="finance in evenFinanceList('001')" :label="finance" :key="finance.categoryId">
                    {{finance.name}} {{finance.price}}元
                    <span v-if="finance.priceType === '1'">
                      /份*&nbsp;<input @change="calculation" type="number" min="1" v-model.number="finance.number" style="border: none;
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
                <el-checkbox-group @change="calculation" v-model="stuServiceBuyNoteEntity.financeList">
                  <el-checkbox v-for="finance in evenFinanceList('002')" :label="finance" :key="finance.categoryId">
                    {{finance.name}} {{finance.price}}元
                    <span v-if="finance.priceType === '1'">
                      /份*&nbsp;<input @change="calculation" type="number" min="1" v-model.number="finance.number" style="border: none;
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
                <el-checkbox-group @change="calculation" v-model="stuServiceBuyNoteEntity.financeList">
                  <el-checkbox v-for="finance in evenFinanceList('003')" :label="finance" :key="finance.categoryId">
                    {{finance.name}} {{finance.price}}元
                    <span v-if="finance.priceType === '1'">
                    /份*&nbsp;<input @change="calculation"  type="number" min="1" v-model.number="finance.number" style="border: none;
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
                <el-checkbox-group @change="calculation" v-model="stuServiceBuyNoteEntity.financeList">
                  <el-checkbox v-for="finance in evenFinanceList('004')" :label="finance" :key="finance.categoryId">
                    {{finance.name}} {{finance.price}}元
                    <span v-if="finance.priceType === '1'">
                      /份*&nbsp;<input @change="calculation"  type="number" min="1" v-model.number="finance.number" style="border: none;
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
              <div class="text_css" style="width: 150px;float: left">
                原价：￥{{stuServiceBuyNoteEntity.originalPrice}}
              </div>

              <div v-if="stuServiceBuyNoteEntity.activityPrice !== stuServiceBuyNoteEntity.originalPrice" class="text_css" style="width: 150px;float: left">
                活动价：￥{{stuServiceBuyNoteEntity.activityPrice}}
              </div>

            </el-row>
            <el-row style="line-height: 50px;padding: 0 10px;border-bottom: 1px solid #1f2d3d;">
              <div class="text_css" style="width: 150px;float: left">已收定金：￥</div>

              <div class="text_css" style="width: 150px;float: left">
                本次实收金额：￥{{stuServiceBuyNoteEntity.realPrice}}
              </div>

              <div class="text_css" style="float: left">，人名币大写：{{stuServiceBuyNoteEntity.realPrice | smalltoBIG}}</div>
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
                  <input @change="actualMoneyCalculation" type="number" v-model.number="payType.money" style="border: none;
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
            <el-row>
              <el-col :span="2">备注：</el-col>
              <el-col :span="21"><input v-model="stuServiceBuyNoteEntity.remark" style="border: none;outline:none;border-bottom: #dcdfe6 1px solid;font-size: 12px;color: #606266;width: 100%"/></el-col>
            </el-row>
          </el-col>
        </el-row>

      </el-col>
      <div style="float: right;margin-top: 20px;">
        <el-button v-if="stuServiceBuyNoteEntity.studentId" type="primary" :loading="btnLoading" @click="stuBuyServiceNote"><i class="el-icon-fa-save"></i> 提 交</el-button>
      </div>







    </el-card>
  </div>
</template>

<script>
  import Coach from '@/components/Coach'
  import { removeAllSpace } from '@/utils/validate'
  import { getFinanceList, queryMoneyListById, addFinance, putFinance, delFinance } from '@/api/finance/service-category'
  import { saveServiceCharge } from '@/api/finance/service-charge'
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
        btnLoading: false,
        flag: '1',
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
          studentId: null, // 学员Id
          originalPrice: 0, // 原始价格
          activityPrice: 0, // 活动价格
          realPrice: 0, // 实收价格
          remark: null, // 实收价格
          receivablesType: null,
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
            console.log(' ===================  这是所有学员信息  ==================')
            console.log(response.data)
            this.studentList = response.data.data.list
            this.studentListLoading = false
          })
        } else {
          this.studentList = []
        }
      },
      /* 根据学员id查询学员 */
      studentIdChange() {
        this.infoLoading = true
        // getStudent(this.stuServiceBuyNoteEntity.studentId).then(response => {
        //   console.log(response.data)
        //   // this.student = response.data.data
        //   this.infoLoading = false
        // })
        queryMoneyListById(this.stuServiceBuyNoteEntity.studentId).then(response => {
          console.log(response.data)
          // this.student = response.data.data
          this.infoLoading = false
        })
      },
      stuBuyServiceNote() {
        this.btnLoading = true
        saveServiceCharge(this.stuServiceBuyNoteEntity).then(() => {
          this.stuServiceBuyNoteEntity = {
            studentId: null, // 学员Id
            originalPrice: 0, // 原始价格
            activityPrice: 0, // 活动价格
            realPrice: 0, // 实收价格
            remark: null, // 实收价格
            receivablesType: null,
            payTypeList: [{}],
            financeList: []
          }
          this.student = {}
          this.btnLoading = false
        })
      },
      /* 计算价格 */
      calculation() {
        this.stuServiceBuyNoteEntity.originalPrice = 0
        this.stuServiceBuyNoteEntity.activityPrice = 0
        var activityPrice = 0
        console.log(this.stuServiceBuyNoteEntity.financeList)
        /* 先计算未参加活动的价格 */
        for (var i = 0; i < this.stuServiceBuyNoteEntity.financeList.length; i++) {
          if (this.stuServiceBuyNoteEntity.financeList[i].code !== '004') {
            if (this.stuServiceBuyNoteEntity.financeList[i].priceType === '0') {
              this.stuServiceBuyNoteEntity.originalPrice = this.stuServiceBuyNoteEntity.originalPrice + this.stuServiceBuyNoteEntity.financeList[i].price
            } else {
              this.stuServiceBuyNoteEntity.originalPrice = this.stuServiceBuyNoteEntity.originalPrice + (this.stuServiceBuyNoteEntity.financeList[i].price * this.stuServiceBuyNoteEntity.financeList[i].number)
            }
          }
        }
        /* 再计算参加活动的价格 */
        for (var i = 0; i < this.stuServiceBuyNoteEntity.financeList.length; i++) {
          if (this.stuServiceBuyNoteEntity.financeList[i].code === '004') {
            if (this.stuServiceBuyNoteEntity.financeList[i].priceType === '0') {
              activityPrice = activityPrice + this.stuServiceBuyNoteEntity.financeList[i].price
            } else {
              activityPrice = activityPrice + (this.stuServiceBuyNoteEntity.financeList[i].price * this.stuServiceBuyNoteEntity.financeList[i].number)
            }
          }
        }
        this.stuServiceBuyNoteEntity.activityPrice = activityPrice + this.stuServiceBuyNoteEntity.originalPrice
      },
      /* 计算应收费用 */
      actualMoneyCalculation() {
        this.stuServiceBuyNoteEntity.realPrice = 0
        this.stuServiceBuyNoteEntity.payTypeList = []
        for (var i = 0; i < this.payTypeList.length; i++) {
          if (this.payTypeList[i].money !== null && this.payTypeList[i].money !== 0 && this.payTypeList[i].money !== '') {
            this.stuServiceBuyNoteEntity.payTypeList.push(this.payTypeList[i])
          }
          this.stuServiceBuyNoteEntity.realPrice = Number(this.stuServiceBuyNoteEntity.realPrice) + Number(this.payTypeList[i].money)
        }
        console.log(this.stuServiceBuyNoteEntity.payTypeList)
      },
      handleSubject() {
        if (flag === '1') {
          this.getFinanceList()
        } else {
          this.studentIdChange()
        }
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
