<template>
  <div class="app-container1 calendar-list-container" id="service-note" style="height: 100%;">
    <el-card  style="height: 100%;overflow: auto">
      <div v-loading="loading" element-loading-text="别急,一会儿就好~" style="width: 100%;border: 1px dashed #1f2d3d;padding: 0 10px">
        <!-- 标题 -->
        <el-row style="text-align: center;">
          <p style="font-size: 18px;"><span>{{finance.title}}</span><span style="margin-left: 35px;">收款收据</span></p>
          <p style="position: absolute;bottom: 0px;margin: 5px;font-size: 12px;right: 10px;">
            流水号：{{finance.serialPrefix}}{{finance.paytime | parseTime('{y}{m}')}}{{finance.serialNumber | parseSerial}}
          </p>
        </el-row>
        <!-- 学员信息 -->
        <el-row  style="border: 1px solid #1f2d3d;border-collapse: collapse;font-size: 12px;">
            <el-col :span="3" style="border-right: 1px solid #1f2d3d;line-height: 50px;padding: 0 10px">
              <el-date-picker v-model="finance.paytime" type="date" placeholder="" format="yyyy年MM月dd日" :clearable="false"  style="width: 100%;font-size: 12px;"
                              value-format="yyyy-MM-dd" prefix-icon="no" class="note-border-date"></el-date-picker>
            </el-col>
            <el-col :span="3" style="border-right: 1px solid #1f2d3d;line-height: 50px;padding: 0 0 0 10px">
              <el-row>
                <el-col :span="8">
                  <span class="text_css">校区：</span>
                </el-col>
                <el-col :span="16">
                  {{finance.campus}}
                  <!--<dict v-model="" dictType="dict_campus" class="dict-not-border" style="width: 100%;"  placeholder="请选择校区"></dict>-->
                </el-col>
              </el-row>
            </el-col>
            <el-col :span="4" style="border-right: 1px solid #1f2d3d;line-height: 50px;padding: 0 10px">

              <el-row>
                <el-col :span="10">
                  <span class="text_css">收费类型：</span>
                </el-col>
                <el-col :span="14">
                  <el-select v-model="finance.receivablesType" placeholder="" @change="receivablesTypeChange" class="receivables-type">
                    <el-option v-for="item in receivablesList" :key="item.type" :label="item.type" :value="item.type" :disabled="item.disabled"></el-option>
                  </el-select>
                </el-col>
              </el-row>
              <!--<el-radio-group  v-model="finance.receivablesType" class="receivables-type">-->
                <!--receivablesList-->
                <!--<el-radio label="全款"></el-radio>-->
                <!--<el-radio label="定金"></el-radio>-->
                <!--<el-radio label="定转全"></el-radio>-->
              <!--</el-radio-group>-->
            </el-col>
            <el-col :span="3" style="border-right: 1px solid #1f2d3d;line-height: 50px;padding: 0 10px">
              <span class="text_css">车型：{{finance.motorcycleType}}</span>
            </el-col>
            <el-col :span="4" style="border-right: 1px solid #1f2d3d;line-height: 50px;padding: 0 0 0 10px">
              <el-row>
                <el-col :span="8">
                  <span class="text_css">姓名：</span>
                </el-col>
                <el-col :span="16">
                  <div v-if="isEdit">
                    {{finance.name}}
                  </div>
                  <div v-else>
                    <el-select class="student-search"  v-model="finance.studentId" @change="getStudent" filterable remote reserve-keyword placeholder=""
                               :remote-method="getStudentList" :loading="studentListLoading">
                      <el-option v-for="student in studentList" :key="student.studentId" :label="student.name" :value="student.studentId">
                      </el-option>
                    </el-select>
                  </div>
                </el-col>
              </el-row>
            </el-col>
            <el-col :span="7" style="line-height: 50px;padding: 0 10px">
              <el-row>
                <el-col :span="5">
                  <el-row style="line-height: 16px;margin-top: 8px;">身份</el-row>
                  <el-row style="line-height: 16px;">证号：</el-row>
                </el-col>
                <el-col :span="19">
                  <div v-if="isEdit">
                    {{finance.idNumber}}
                  </div>
                  <div v-else>
                    <el-select class="student-search"  v-model="finance.studentId" @change="getStudent" filterable remote reserve-keyword placeholder=""
                               :remote-method="getStudentList" :loading="studentListLoading">
                      <el-option v-for="student in studentList" :key="student.studentId" :label="student.idNumber" :value="student.studentId">
                      </el-option>
                    </el-select>
                  </div>
                </el-col>
              </el-row>
            </el-col>
          </el-row>
        <!-- 项目 -->
        <el-row  style="border: 1px solid #1f2d3d; border-top: none;font-size: 12px;height: 100%">
          <el-col :span="1" style="padding: 0 10px;height: 100%">
            <div style="width: 12px; word-wrap: break-word; margin: 0 auto;line-height: 80px">
              <div>
                项目
              </div>
            </div>
          </el-col>
          <el-col :span="23" style="border-left: 1px solid #1f2d3d;">
            <el-row style="line-height: 40px;border-bottom: 1px solid #1f2d3d;">
              <el-col class="text_css" :span="2" style="padding-left:10px;">
                <span >代收费：</span>
              </el-col>
              <el-col :span="22">
                <el-checkbox-group @change="calculation" v-model="finance.financeList">
                  <el-checkbox v-for="service in evenFinanceList('001')" :label="service" :disabled="flag" :key="service.categoryId">
                    {{service.name}}
                    <span v-if="service.priceType === '1'">
                      ×&nbsp;<input @change="calculation" type="number" min="1" :disabled="flag" v-model.number="service.number"
                                      style="border: none; outline:none; width: 30px; border-bottom: #dcdfe6 1px solid; font-size: 12px;"/>
                    </span>
                    <span v-else>{{service.price}}元</span>
                  </el-checkbox>
                </el-checkbox-group>
              </el-col>

            </el-row>
            <el-row style="line-height: 40px;border-bottom: 1px solid #1f2d3d;">
              <el-col class="text_css" :span="2" style="padding-left:10px;">
                <span >培训费：</span>
              </el-col>
              <el-col :span="22">
                <el-checkbox-group @change="calculation" v-model="finance.financeList">
                  <el-checkbox v-for="service in evenFinanceList('002')" :label="service" :disabled="flag" :key="service.categoryId">
                    {{service.name}}
                    <span v-if="service.priceType === '1'">
                      ×&nbsp;<input @change="calculation" type="number" min="1"
                                      :disabled="flag"
                                      v-model.number="service.number"
                                      style="border: none;
                                      outline:none;
                                      width: 30px;
                                      border-bottom: #dcdfe6 1px solid;
                                      font-size: 12px;"/>
                    </span>
                    <span v-else>{{service.price}}元</span>
                  </el-checkbox>
                </el-checkbox-group>
              </el-col>
            </el-row>
            <el-row style="line-height: 40px;border-bottom: 1px solid #1f2d3d;">
              <el-col class="text_css" :span="2" style="padding-left:10px;">
                <span >服务包：</span>
              </el-col>
              <el-col :span="22">
                <el-checkbox-group @change="calculation" v-model="finance.financeList">
                  <el-checkbox v-for="service in evenFinanceList('003')" :label="service" :disabled="flag" :key="service.categoryId">
                    {{service.name}}
                    <span v-if="service.priceType === '1'">
                    ×&nbsp;<input @change="calculation"  type="number" min="1" :disabled="flag" v-model.number="service.number" style="border: none;
                                                               outline:none;
                                                               width: 30px;
                                                               border-bottom: #dcdfe6 1px solid;
                                                               font-size: 12px;"/>
                    </span>
                    <span v-else>{{service.price}}元</span>
                  </el-checkbox>
                </el-checkbox-group>
              </el-col>
            </el-row>
            <el-row style="line-height: 40px;">
              <el-col class="text_css" :span="2" style="padding-left:10px;">
                <span >优惠包：</span>
              </el-col>
              <el-col :span="22">
                <el-checkbox-group @change="calculation" v-model="finance.financeList">
                  <el-checkbox v-for="service in evenFinanceList('004')" :label="service" :disabled="flag" :key="service.categoryId">
                    {{service.name}}
                    <span v-if="service.priceType === '1'">
                      ×&nbsp;<input @change="calculation"  type="number" min="1" :disabled="flag" v-model.number="service.number" style="border: none;
                                                                 outline:none;
                                                                 width: 30px;
                                                                 border-bottom: #dcdfe6 1px solid;
                                                                 font-size: 12px;"/>
                    </span>
                  </el-checkbox>
                </el-checkbox-group>
              </el-col>
            </el-row>
          </el-col>
        </el-row>
        <!-- 收款 -->
        <el-row style="border: 1px solid #1f2d3d; border-top: none;font-size: 12px;height: 100%">
          <el-col :span="1" style="padding: 0 10px;">
            <div style="width: 12px; word-wrap: break-word; margin: 0 auto;line-height: 60px">收款</div>
          </el-col>
          <el-col :span="23" style="border-left: 1px solid #1f2d3d;">
            <el-row style="line-height: 35px;padding: 0 10px">
              <div class="text_css" style="width: 150px;float: left">
                原价：￥{{finance.originalPrice}}
              </div>
              <div v-if="finance.activityPrice !== 0" class="text_css" style="width: 150px;float: left">
                活动价：￥{{finance.activityPrice + finance.originalPrice}}
              </div>
            </el-row>
            <el-row style="line-height: 35px;padding: 0 10px;border-bottom: 1px solid #1f2d3d;">
              <div class="text_css" style="width: 150px;float: left" v-show="finance.earnestMoney !== 0">已收金额：￥{{finance.earnestMoney}}</div>
              <div class="text_css" style="width: 150px;float: left">
                本次实收金额：￥<span class="hasMoney">{{finance.realPrice}}</span>
              </div>
              <div class="text_css" style="float: left">人名币大写：{{finance.realPrice | smalltoBIG}}</div>
            </el-row>
            <el-row  class="text_css"  style="line-height: 50px;padding: 0 10px">
              <el-col :span="3">
                <span >本次收款方式：</span>
              </el-col>
              <el-col :span="21">
                <span v-for="(payType,index) in finance.payTypeList">
                  <span>
                    {{payType.mode}}：
                  </span>
                  <!-- -->
                  <el-input-number v-model="payType.money" controls-position="right" :min="0" size="small" class="money-input-number"
                                   :disabled="index === 0 && finance.receivablesType!='定金'"
                                   :class="payType.money!==0?'hasMoney':''"
                                   @change="actualMoneyCalculation" style="border: none; outline:none;width: 50px;border-bottom: #dcdfe6 1px solid;font-size: 12px;color: #606266;">

                  </el-input-number>
                  元
                  <span v-if="finance.payTypeList.length !== (index+1)">，</span>
                </span>
              </el-col>
            </el-row>
          </el-col>
        </el-row>
        <!-- 销售员 备注 -->
        <el-row style="line-height: 50px;border: 1px solid #1f2d3d;border-top: none;font-size: 12px;height: 100%">
          <el-col :span="8" style="border-right: 1px solid #1f2d3d;text-align: center">
            <el-checkbox v-model="finance.studyCard" label="学时卡已发放"></el-checkbox>
            <el-checkbox v-model="finance.healthForm" label="体检表已发放"></el-checkbox>
          </el-col>
          <el-col :span="4" style="border-right: 1px solid #1f2d3d;padding-left: 10px;">
            <span class="text_css">销售员：{{finance.introducer}}
            </span>
          </el-col>
          <el-col :span="12">
            <el-row>
              <el-col :span="3" style="padding-left: 10px;">备注：</el-col>
              <el-col :span="21"><input v-model="finance.remark" style="border: none;outline:none;border-bottom: #dcdfe6 1px solid;font-size: 12px;color: #606266;width: 100%"/></el-col>
            </el-row>
          </el-col>
        </el-row>
        <!-- 落款 制单人 -->
        <el-row style="line-height: 40px;">
          <el-col :offset="1" :span="6">单位盖章：</el-col>
          <el-col :span="6">制单人：{{finance.payee}}</el-col>
          <el-col :span="6">修改人：{{finance.reviser}}</el-col>
          <el-col :span="5">复核人：</el-col>
        </el-row>
      </div>
      <!-- 按钮 -->
      <el-row style="padding: 10px">
        <el-button type="primary" :loading="btnLoading" @click="stuBuyServiceNote" style="float: right" :disabled="btnDisabled"><i class="el-icon-fa-save"></i> 提 交</el-button>
      </el-row>
    </el-card>
  </div>
</template>

<script>
  import Coach from '@/components/Coach'
  import { getFinanceList } from '@/api/finance/service-category'
  import { queryMoneyListById, saveServiceCharge, querySerialNumber } from '@/api/finance/service-charge'
  import { getLodop } from '@/utils/LodopFuncs'
  import { mapGetters } from 'vuex'
  import { fetchStudentList, getStudent } from '@/api/student/student'

  export default {
    name: 'finance',
    components: {
      Coach
    },
    props: {
      layerid: String,
      student: Object,
      editFinance: Object
    },
    watch: {
      param: function(val) {
        if (val) {
          this.isEdit = true
          this.finance = val
        }
      }
    },
    data() {
      return {
        financeList: [],
        studentList: [],
        receivablesList: [
          { type: '全款', disabled: false },
          { type: '定金', disabled: false },
          { type: '定转全', disabled: false },
          { type: '购买服务包', disabled: true }
        ],
        receivables: false,
        isEdit: false,
        finance: {
          studentId: null, // 学员Id
          campus: '', // 学员校区
          name: '', // 姓名
          idNumber: '', // 身份证
          motorcycleType: '', // 学员车型
          serialNumber: 1, // 流水号
          serialPrefix: 'YL', // 流水号 前缀
          title: '', // 收据标题 公司名字
          originalPrice: 0, // 原始价格 就是所选服务不包括优惠的价格
          activityPrice: 0, // 活动价格 优惠
          realPrice: 0, // 实收价格
          earnestMoney: 0, // 已收定金
          remark: '', // 备注
          introducer: '', // 销售员
          payee: '', // 收款人
          reviser: '', // 校订者 修改人
          receivablesType: '全款',
          paytime: new Date(),
          payTypeList: [
            { mode: '现金', money: 0 },
            { mode: '支付宝', money: 0 },
            { mode: '微信', money: 0 },
            { mode: '收钱吧', money: 0 },
            { mode: '刷卡', money: 0 },
            { mode: '其他', money: 0 }
          ], // 支付方式
          financeList: []
        },
        loading: false,
        btnLoading: false,
        btnDisabled: true,
        flag: false,
        studentListLoading: false,
        financeListQuery: {
          page: 1,
          limit: 0,
          condition: null
        },
        studentListQuery: {
          page: 1,
          limit: 0,
          condition: null
        }
      }
    },
    created() {
      if (this.student) {
        this.getStudentList(this.student.name)
        this.finance.studentId = this.student.studentId
        this.getStudent()
      }
      if (this.editFinance) {
        console.log(this.editFinance)
      } else {
        this.finance.payee = this.name
      }
    },
    computed: {
      ...mapGetters([
        'permissions',
        'name',
        'client'
      ])
    },
    methods: {
      getStudent(receivable) {
        this.clean()
        this.financeList = []
        this.finance.financeList = []
        if (this.finance.studentId) {
          this.loading = true
          this.getSerialNumber()
          getStudent(this.finance.studentId).then(response => {
            var stu = response.data.data
            // 学员车型
            this.finance.motorcycleType = stu.motorcycleType
            // 介绍人
            if (stu.introducerNameList) {
              this.finance.introducer = stu.introducerNameList[0]
            }
            // 校区
            this.finance.campus = stu.campus
            this.queryMoneyList(this.finance.studentId, receivable)
          })
        }
      },
      queryMoneyList(studentId, receivable) {
        queryMoneyListById(studentId).then(response => {
          var list = response.data.data
          console.log(list)
          if (list && list.length > 0) {
            var financeList = []
            var earnestMoney = 0 // 已收定金
            var originalPrice = 0 // 原始价格 就是所选服务不包括优惠的价格
            var activityPrice = 0 // 活动价格 优惠
            var receivables = ['购买服务包']
            for (var i = 0; i < list.length; i++) {
              var financeNote = list[i]
              earnestMoney += financeNote.money
              for (var a = 0; a < financeNote.financeList.length; a++) {
                var finance = financeNote.financeList[a]
                var flag = true
                for (var b = 0; b < financeList.length; b++) {
                  if (finance.noteId === financeList[b].noteId) {
                    flag = false
                    break
                  }
                }
                if (flag) {
                  financeList.push(finance)
                  if (finance.code === '004') {
                    activityPrice += finance.price * finance.number
                  } else {
                    originalPrice += finance.price * finance.number
                  }
                }
              }
            }
            var realPrice = originalPrice + activityPrice - earnestMoney
            // 费用已经缴清
            if (realPrice > 0) {
              // 费用未经缴清
              this.finance.activityPrice = activityPrice // 活动价格 优惠
              this.finance.originalPrice = originalPrice // 原始价格 就是所选服务不包括优惠的价格
              this.finance.earnestMoney = earnestMoney // 已收定金
              this.finance.financeList = financeList
              this.finance.realPrice = realPrice
              this.financeList = financeList
              this.finance.payTypeList[0].money = originalPrice + activityPrice - earnestMoney
              receivables.push('定转全')
              this.flag = true
              this.btnDisabled = false
              this.finance.receivablesType = '定转全'
            }
            if (realPrice === 0 || receivable === '购买服务包') {
              this.finance.receivablesType = '购买服务包'
              this.clean()
              this.flag = false
              this.getFinanceList()
            }
            console.log(receivables)
            this.setReceivablesList(receivables)
            this.loading = false
          } else {
            this.flag = false
            this.setReceivablesList(['全款', '定金'])
            this.getFinanceList()
          }
        })
      },
      setReceivablesList(optional) {
        this.receivablesList.forEach(function(item) {
          item.disabled = true
          optional.forEach(function(type) {
            if (item.type === type) item.disabled = false
          })
        })
      },
      // 获取所有学员 ok
      getStudentList(query) {
        if (query) {
          this.studentListLoading = true
          this.studentListQuery.condition = query
          fetchStudentList(this.studentListQuery).then(response => {
            this.studentList = response.data.data.list
            this.studentListLoading = false
          })
        } else {
          this.studentList = []
        }
      },
      // 获取所有服务包 ok
      getFinanceList() {
        this.loading = true
        getFinanceList(this.financeListQuery).then(response => {
          this.financeList = response.data.data.list
          // 已经购买的服务包
          this.finance.financeList = []
          this.loading = false
        })
      },
      // 类型过滤器 ok
      evenFinanceList(code) {
        return this.financeList.filter(function(finance) {
          return finance.code === code
        })
      },
      /* 根据学员id查询学员 */
      receivablesTypeChange() {
        this.getStudent(this.finance.receivablesType)
      },
      // 初始化金额
      clean() {
        this.finance.originalPrice = 0
        this.finance.activityPrice = 0
        this.finance.realPrice = 0
        this.finance.earnestMoney = 0
        this.finance.payTypeList = [
          { mode: '现金', money: 0 },
          { mode: '支付宝', money: 0 },
          { mode: '微信', money: 0 },
          { mode: '收钱吧', money: 0 },
          { mode: '刷卡', money: 0 },
          { mode: '其他', money: 0 }
        ]
      },
      /* 计算价格 */
      calculation() {
        this.clean()
        // 原始价格 就是所选服务不包括优惠的价格
        var originalPrice = 0
        // 活动价格 优惠
        var activityPrice = 0
        var financeList = this.finance.financeList
        for (var i = 0; i < financeList.length; i++) {
          var finance = financeList[i]
          if (finance.code === '004') {
            activityPrice += finance.price * finance.number
          } else {
            originalPrice += finance.price * finance.number
          }
        }
        this.finance.activityPrice = activityPrice
        this.finance.originalPrice = originalPrice
        this.finance.realPrice = originalPrice + activityPrice
        this.finance.payTypeList[0].money = originalPrice + activityPrice
        if (financeList.length > 0 && this.finance.studentId) {
          this.btnDisabled = false
        }
      },
      // 输入收款金额
      actualMoneyCalculation() {
        var isNotDeposit = this.finance.receivablesType !== '定金'
        var payTypeList = this.finance.payTypeList
        // 应收账款
        var receivable = this.finance.activityPrice + this.finance.originalPrice - this.finance.earnestMoney
        // 实收
        var realPrice = 0
        // 现金
        var cash = 0
        // 其他收费方式
        var other = 0
        for (var i = 1; i < payTypeList.length; i++) {
          var payType = payTypeList[i]
          if (payType.money < 0) payType.money = 0
          other += payType.money
        }
        if (isNotDeposit) {
          // 现金 = 应收账款 - 其他收费方式
          cash = receivable - other
          // 如果实际收款大于应收账款（超收） 则修改现金为0
          if (cash < 0) cash = 0
          // 修改现金金额
          payTypeList[0].money = cash
          this.finance.payTypeList = payTypeList
          // 实收金额 = 现金 + 其他收费方式
          realPrice = other + cash
          // 如果其他收款填写负数 则会出现本次实收小于现金则修正
          if (cash > realPrice) realPrice = cash
        } else {
          realPrice = other + payTypeList[0].money
        }

        this.finance.realPrice = realPrice
        if (realPrice > 0) {
          this.btnDisabled = false
        }
        if (this.finance.financeList.length > 0 && this.finance.studentId) {
          this.btnDisabled = false
        }
      },
      // 保存
      saveServiceNote() {
        saveServiceCharge(this.finance).then(() => {
          this.$layer.close(this.layerid)
        })
      },
      getSerialNumber() {
        querySerialNumber().then(res => {
          if (res.data.code === 0) {
            this.finance.serialNumber = res.data.data.serialNumber
            this.finance.serialPrefix = res.data.data.serialPrefix
            this.finance.title = res.data.data.title
          } else {
            this.finance.title = ''
            this.finance.serialPrefix = ''
            this.finance.serialNumber = null
          }
        })
      },
      // 是否打印
      stuBuyServiceNote() {
        this.btnLoading = true
        this.$confirm('是否打印?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          // 保存
          this.saveServiceNote()
          // 打印
          // this.createOneFormPage()
        }).catch(() => {
          // 保存
          this.saveServiceNote()
        })
      }
      // 打印
      // createOneFormPage() {
      //   var LODOP = getLodop()
      //   var dsfStr = ''
      //   var pxfStr = ''
      //   var fwbStr = ''
      //   var yhbStr = ''
      //
      //   var dsf = 0
      //   var pxf = 0
      //   var fwb = 0
      //   var yhb = 0
      //
      //   for (var j = 0; j < this.stuServiceBuyNoteEntity.financeList.length; j++) {
      //     if (this.stuServiceBuyNoteEntity.financeList[j].code === '001') {
      //       if (50 - (dsfStr.length % 50) > (this.stuServiceBuyNoteEntity.financeList[j].name + '×' + this.stuServiceBuyNoteEntity.financeList[j].number + '   ').length) {
      //         dsfStr = dsfStr + this.stuServiceBuyNoteEntity.financeList[j].name + '×' + this.stuServiceBuyNoteEntity.financeList[j].number + '   '
      //       } else {
      //         dsfStr = dsfStr + this.stuServiceBuyNoteEntity.financeList[j].name + '×' + this.stuServiceBuyNoteEntity.financeList[j].number + '\r\n'
      //         dsf = dsf + 20
      //       }
      //     }
      //
      //     if (this.stuServiceBuyNoteEntity.financeList[j].code === '002') {
      //       if (50 - (pxfStr.length % 50) > (this.stuServiceBuyNoteEntity.financeList[j].name + '×' + this.stuServiceBuyNoteEntity.financeList[j].number + '   ').length) {
      //         pxfStr = pxfStr + this.stuServiceBuyNoteEntity.financeList[j].name + '×' + this.stuServiceBuyNoteEntity.financeList[j].number + '   '
      //       } else {
      //         pxfStr = pxfStr + this.stuServiceBuyNoteEntity.financeList[j].name + '×' + this.stuServiceBuyNoteEntity.financeList[j].number + '\r\n'
      //         pxf = pxf + 20
      //       }
      //     }
      //     if (this.stuServiceBuyNoteEntity.financeList[j].code === '003') {
      //       if (50 - (fwbStr.length % 50) > (this.stuServiceBuyNoteEntity.financeList[j].name + '×' + this.stuServiceBuyNoteEntity.financeList[j].number + '   ').length) {
      //         fwbStr = fwbStr + this.stuServiceBuyNoteEntity.financeList[j].name + '×' + this.stuServiceBuyNoteEntity.financeList[j].number + '   '
      //       } else {
      //         fwbStr = fwbStr + this.stuServiceBuyNoteEntity.financeList[j].name + '×' + this.stuServiceBuyNoteEntity.financeList[j].number + '\r\n'
      //         fwb = fwb + 20
      //       }
      //     }
      //     if (this.stuServiceBuyNoteEntity.financeList[j].code === '004') {
      //       if (50 - (yhbStr.length % 50) > (this.stuServiceBuyNoteEntity.financeList[j].name + '×' + this.stuServiceBuyNoteEntity.financeList[j].number + '   ').length) {
      //         yhbStr = yhbStr + this.stuServiceBuyNoteEntity.financeList[j].name + '×' + this.stuServiceBuyNoteEntity.financeList[j].number + '   '
      //       } else {
      //         yhbStr = yhbStr + this.stuServiceBuyNoteEntity.financeList[j].name + '×' + this.stuServiceBuyNoteEntity.financeList[j].number + '\r\n'
      //         yhb = yhb + 20
      //       }
      //     }
      //   }
      //
      //   var a = dsf
      //   var b = dsf + pxf
      //   var c = dsf + pxf + fwb
      //   var d = dsf + pxf + fwb + yhb
      //
      //   LODOP.PRINT_INITA(1, 0, 761, (550 + d), '打印控件功能演示_Lodop功能_在线编辑获得程序代码')
      //   LODOP.SET_PRINT_MODE('PRINT_NOCOLLATE', 1)
      //
      //   LODOP.ADD_PRINT_TEXT(167, 127, 600, (20 + dsf), dsfStr)
      //   LODOP.ADD_PRINT_TEXT((198 + a), 127, 600, (20 + pxf), pxfStr)
      //   LODOP.ADD_PRINT_TEXT((235 + b), 127, 600, (20 + fwb), fwbStr)
      //   LODOP.ADD_PRINT_TEXT((266 + c), 127, 600, (20 + yhb), yhbStr)
      //
      //   if (this.studyCard) {
      //     LODOP.ADD_PRINT_LINE((433 + d), 47, (420 + d), 57, 0, 1)
      //     LODOP.ADD_PRINT_LINE((425 + d), 42, (434 + d), 48, 0, 1)
      //   }
      //   if (this.healthForm) {
      //     LODOP.ADD_PRINT_LINE((433 + d), 175, (420 + d), 185, 0, 1)
      //     LODOP.ADD_PRINT_LINE((423 + d), 170, (432 + d), 176, 0, 1)
      //   }
      //
      //   LODOP.ADD_PRINT_TEXT(16, 242, 300, 53, '重庆壹路驾校培训有限公司\r\n收款收据')
      //   LODOP.SET_PRINT_STYLEA(0, 'FontSize', 16)
      //   LODOP.SET_PRINT_STYLEA(0, 'Alignment', 2)
      //   LODOP.ADD_PRINT_TEXT(51, 563, 173, 20, '单据编号：年月+流水号')
      //   LODOP.SET_PRINT_STYLEA(0, 'FontSize', 11)
      //   LODOP.ADD_PRINT_RECT(77, 25, 702, (376 + d), 0, 1)
      //   LODOP.ADD_PRINT_LINE(122, 26, 121, 728, 0, 1)
      //   LODOP.ADD_PRINT_TEXT(90, 26, 100, 20, this.dateTime)
      //   LODOP.ADD_PRINT_LINE(77, 137, 121, 138, 0, 1)
      //   LODOP.ADD_PRINT_TEXT(90, 139, 45, 20, '校区：')
      //   LODOP.ADD_PRINT_TEXT(90, 184, 45, 20, this.student.campus)
      //   LODOP.ADD_PRINT_LINE(121, 275, 77, 276, 0, 1)
      //   LODOP.ADD_PRINT_TEXT(91, 349, 60, 20, this.stuServiceBuyNoteEntity.receivablesType)
      //   LODOP.ADD_PRINT_LINE(121, 407, 77, 408, 0, 1)
      //   LODOP.ADD_PRINT_TEXT(91, 280, 69, 20, '收款类型：')
      //   LODOP.ADD_PRINT_TEXT(91, 411, 46, 20, '姓名：')
      //   LODOP.ADD_PRINT_TEXT(90, 458, 65, 21, this.student.name)
      //   LODOP.ADD_PRINT_LINE(121, 527, 77, 528, 0, 1)
      //   LODOP.ADD_PRINT_TEXT(91, 531, 73, 20, '身份证号：')
      //   LODOP.ADD_PRINT_TEXT(91, 605, 120, 20, this.student.idNumber)
      //
      //   LODOP.ADD_PRINT_TEXT(132, 72, 100, 20, '车型：' + (this.student.motorcycleType === undefined ? '' : this.student.motorcycleType))
      //   LODOP.ADD_PRINT_LINE(160, 69, 159, 729, 0, 1) // 车型
      //
      //   LODOP.ADD_PRINT_TEXT(167, 72, 100, 20, '代收费：')
      //   // ↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓代收费
      //
      //   // ↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑代收费
      //   LODOP.ADD_PRINT_LINE((191 + a), 69, (190 + a), 729, 0, 1) // 代收费
      //
      //   LODOP.ADD_PRINT_TEXT((198 + a), 73, 100, 20, '培训费：')// 内容，参数（上边距，左边距，内容显示宽度，内容显示高度）
      //   // ↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓培训费
      //
      //   // ↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑培训费
      //   LODOP.ADD_PRINT_LINE((224 + b), 69, (223 + b), 729, 0, 1) // 培训费
      //
      //   LODOP.ADD_PRINT_TEXT((235 + b), 74, 100, 20, '服务包：')
      //   // ↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓服务包
      //
      //   // ↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑服务包
      //   LODOP.ADD_PRINT_LINE((262 + c), 69, (261 + c), 729, 0, 1) // 服务包
      //
      //   LODOP.ADD_PRINT_TEXT((266 + c), 74, 100, 20, '优惠包：')
      //   // ↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓优惠包
      //
      //   // ↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑优惠包
      //   LODOP.ADD_PRINT_LINE((295 + d), 27, (294 + d), 728, 0, 1)// 项目底
      //
      //   LODOP.ADD_PRINT_LINE(125, 68, (407 + d), 69, 0, 1)// 项目 收款
      //   // 线，竖杠(上边距1,1左边距,上边距2,2左边距,intLineStyle, intLineWidth)
      //   // intLineStyle:线条类型，默认为0；0--实线 1--破折线 2--点线 3--点划线 4--双点划线
      //   // intLineWidth:线条宽，默认是1，整数型，单位是(打印)像素，非实线的线条宽也是0
      //   // 内容，参数（上边距，左边距，内容显示宽度，内容显示高度）
      //
      //   LODOP.ADD_PRINT_TEXT((307 + d), 78, 169, 20, '原价：￥' + this.stuServiceBuyNoteEntity.originalPrice)
      //   LODOP.ADD_PRINT_TEXT((333 + d), 76, 148, 20, '已收定金：￥' + this.earnestMoney)
      //   LODOP.ADD_PRINT_TEXT((333 + d), 235, 166, 20, '本次实收金额：￥' + this.stuServiceBuyNoteEntity.realPrice)
      //   LODOP.ADD_PRINT_TEXT((334 + d), 436, 234, 20, '实收大写：' + smalltoBIG(this.stuServiceBuyNoteEntity.realPrice))
      //   LODOP.ADD_PRINT_LINE((362 + d), 69, (361 + d), 728, 0, 1)// 收款价格底
      //
      //   LODOP.ADD_PRINT_TEXT((320 + d), 32, 24, 60, '收\r\n\r\n款')
      //
      //   LODOP.ADD_PRINT_TEXT((372 + d), 77, 94, 20, '本次收款方式：')
      //   LODOP.ADD_PRINT_TEXT((372 + d), 167, 89, 20, '现金：' + this.payTypeList[0].money + '元')
      //   LODOP.ADD_PRINT_TEXT((372 + d), 254, 100, 20, '支付宝：' + this.payTypeList[1].money + '元')
      //   LODOP.ADD_PRINT_TEXT((372 + d), 350, 90, 20, '微信：' + this.payTypeList[2].money + '元')
      //   LODOP.ADD_PRINT_TEXT((372 + d), 438, 100, 20, '收钱吧：' + this.payTypeList[3].money + '元')
      //   LODOP.ADD_PRINT_TEXT((372 + d), 538, 90, 20, '刷卡：' + this.payTypeList[4].money + '元')
      //   LODOP.ADD_PRINT_TEXT((372 + d), 623, 100, 20, '其他：' + this.payTypeList[5].money + '元')
      //
      //   LODOP.ADD_PRINT_LINE((407 + d), 27, (406 + d), 728, 0, 1)// 收款底
      //   // LODOP.ADD_PRINT_LINE(244,68,121,69,0,1);
      //   // 收款1
      //
      //   LODOP.ADD_PRINT_TEXT((176 + (d / 2)), 33, 24, 56, '项\r\n\r\n目')// 内容，参数（上边距，左边距，内容显示宽度，内容显示高度）
      //
      //   LODOP.ADD_PRINT_TEXT((420 + d), 55, 100, 20, '学时卡已发放')
      //   LODOP.ADD_PRINT_RECT((424 + d), 42, 12, 12, 0, 1)
      //   LODOP.ADD_PRINT_TEXT((420 + d), 186, 100, 20, '体检表已发放')
      //   LODOP.ADD_PRINT_RECT((424 + d), 171, 12, 12, 0, 1)
      //   LODOP.ADD_PRINT_LINE((406 + d), 296, (451 + d), 297, 0, 1)
      //   LODOP.ADD_PRINT_LINE((406 + d), 426, (451 + d), 427, 0, 1)
      //
      //   var introducerName = ''
      //   for (var i = 0; i < this.student.introducerNameList; i++) {
      //     introducerName = introducerName + this.student.introducerNameList[i] + '、'
      //   }
      //
      //   LODOP.ADD_PRINT_TEXT((421 + d), 312, 100, 20, '销售员：' + introducerName)
      //   LODOP.ADD_PRINT_TEXT((419 + d), 430, 303, 20, '备注' + this.stuServiceBuyNoteEntity.remark)
      //
      //   LODOP.ADD_PRINT_TEXT((459 + d), 531, 57, 25, '复核人：')
      //   LODOP.ADD_PRINT_TEXT((459 + d), 64, 75, 25, '单位盖章：')
      //   LODOP.ADD_PRINT_TEXT((459 + d), 291, 65, 25, '收款人：')
      //   LODOP.PREVIEW()
      // }
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
input:disabled{
  border: 1px solid #DDD;
  background: none;
  color:#c0c4cc;
  cursor:not-allowed;
}
  .hasMoney{
    color: red!important;
  }
</style>
