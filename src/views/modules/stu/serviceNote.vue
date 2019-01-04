<template>
  <div class="app-container1 calendar-list-container" id="service-note" style="height: 100%;">
    <div class="btn-group">
      <el-button-group v-if=" pageLevel === 'info'&&pageShow==='bill'">
        <el-button type="primary" size="mini" icon="el-icon-arrow-left" @click="paging(finance.chargeId,-1)">上一单</el-button>
        <el-button type="primary" size="mini" @click="paging(finance.chargeId,1)">下一单<i class="el-icon-arrow-right el-icon--right"></i></el-button>
      </el-button-group>
      <el-button type="primary" size="mini" v-if="pageLevel !== 'info'&&pageShow==='bill'" :loading="btnLoading" @click="saveServiceNote" :disabled="btnDisabled" icon="el-icon-fa-save">保存</el-button>
      <el-button-group v-if="pageShow==='bill'">
        <el-button type="warning" size="mini"  v-if="pageLevel === 'info'&&finance.state==='0'&&permissions.cost_info_examine" @click="updateFinaceState(finance.chargeId,'1')" icon="el-icon-share">审核</el-button>
        <el-button type="info" size="mini" v-if="pageLevel === 'info'&&finance.state==='1'&&permissions.cost_info_examine_back" @click="updateFinaceState(finance.chargeId,'0')" icon="el-icon-refresh">反审核</el-button>
        <el-button type="info" size="mini" v-if="pageLevel === 'info'&&finance.state==='0'&&finance.type==='1'&&permissions.cost_info_edit" @click="updateFinace" icon="el-icon-edit">修改</el-button>
        <el-button type="danger" size="mini" v-if="pageLevel === 'info'&&finance.state==='0'&&permissions.cost_info_examine_delete" @click="updateFinaceState(finance.chargeId,'-1')" icon="el-icon-delete">作废</el-button>
      </el-button-group>

      <el-button-group>
        <el-button type="info" size="mini" v-if="pageShow==='config'" @click="pageShow = 'bill'" icon="el-icon-back">取消</el-button>
        <el-button type="primary" size="mini" v-if="pageShow==='config'" @click="saveConfig" icon="el-icon-fa-save">保存</el-button>
        <el-button type="success" size="mini" v-if="pageShow==='bill'" @click="updateConfig" icon="el-icon-setting">配置</el-button>

      </el-button-group>

      <el-dropdown @command="groupSelect"  v-if="pageShow==='bill'&&pageLevel !== 'info'">
        <el-button type="primary" size="mini">
          快捷选择<i class="el-icon-arrow-down el-icon--right"></i>
        </el-button>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item v-for="group in groupList" :command="group" :key="group.name">{{group.name}}</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
    <el-card v-show="pageShow==='bill'" style="padding-top: 30px;height: 100%;overflow: auto">
      <div v-loading="loading" element-loading-text="别急,一会儿就好~" style="width: 100%;border: 1px dashed #1f2d3d;padding: 0 10px">
        <!-- 标题 -->
        <el-row style="text-align: center;">
          <p style="font-size: 16px;font-weight: 600;"><span>{{finance.title}}</span><span style="margin-left: 35px;">收款收据</span></p>
          <p style="position: absolute;bottom: 0px;margin: 5px;font-size: 12px;right: 10px;">
            流水号：<span v-if="finance.serialNumber">{{finance.serialPrefix}}{{finance.month}}{{finance.serialNumber | parseSerial}}</span>
          </p>
          <img class="examine-state" v-if="pageLevel === 'info'" :src="getExamineIcon"/>
        </el-row>
        <!-- 学员信息 -->
        <el-row  style="border: 1px solid #1f2d3d;border-collapse: collapse;font-size: 12px;">
           <!--时间-->
            <el-col :span="3" style="border-right: 1px solid #1f2d3d;line-height: 40px;padding: 0 10px">
              <div  v-if="pageLevel === 'info'">
                {{parsePaytime}}
              </div>
              <div v-else style="height: 40px;">
                <el-date-picker v-model="finance.paytime" @change="dateChange" type="date" placeholder="" format="yyyy年MM月dd日" value-format="yyyy-MM-dd" :clearable="false"
                                style="width: 100%;font-size: 12px;height: 40px;" prefix-icon="no" class="note-border-date"></el-date-picker>
              </div>
            </el-col>
            <!--校区-->
            <el-col :span="5" style="border-right: 1px solid #1f2d3d;line-height: 40px;padding: 0 0 0 10px">
              <el-row>
                <el-col :span="6">
                  <span class="text_css">校区：</span>
                </el-col>
                <el-col :span="18">
                  {{finance.campus}}
                  <!--<dict v-model="" dictType="dict_campus" class="dict-not-border" style="width: 100%;"  placeholder="请选择校区"></dict>-->
                </el-col>
              </el-row>
            </el-col>
            <!--收费类型-->
            <el-col :span="4" style="border-right: 1px solid #1f2d3d;line-height: 40px;padding: 0 10px">

              <el-row>
                <el-col :span="10">
                  <span class="text_css">收费类型：</span>
                </el-col>
                <el-col :span="14">
                  <div v-if="pageLevel === 'info'">
                    {{finance.receivablesType}}
                  </div>
                  <div v-else style="height: 40px;">
                    <el-select v-model="finance.receivablesType" style="height: 40px;" placeholder="" @change="receivablesTypeChange" class="receivables-type">
                      <el-option v-for="item in receivablesList" :key="item.type" :label="item.type" :value="item.type" :disabled="item.disabled"></el-option>
                    </el-select>
                  </div>
                </el-col>
              </el-row>
            </el-col>
            <!--车型-->
            <el-col :span="2" style="border-right: 1px solid #1f2d3d;line-height: 40px;padding: 0 10px">
              <span class="text_css">车型：{{finance.motorcycleType}}</span>
            </el-col>
            <!--姓名-->
            <el-col :span="4" style="border-right: 1px solid #1f2d3d;line-height: 40px;padding: 0 0 0 10px">
              <el-row>
                <el-col :span="8">
                  <span class="text_css">姓名：</span>
                </el-col>
                <el-col :span="16">
                  <div  v-if="pageLevel === 'add'" style="height: 40px;">
                    <el-select class="student-search"  style="height: 40px;" v-model="finance.studentId" @change="getStudent" filterable remote reserve-keyword placeholder=""
                               :remote-method="getStudentList" :loading="studentListLoading">
                      <el-option v-for="student in studentList" :key="student.studentId" :label="student.name" :value="student.studentId">
                      </el-option>
                    </el-select>
                  </div>
                  <div v-else>
                    {{finance.name}}
                  </div>
                </el-col>
              </el-row>
            </el-col>
            <!--身份证号-->
            <el-col :span="6" style="line-height: 40px;padding: 0 10px">
              <el-row>
                <el-col :span="5">
                  <el-row style="line-height: 16px;margin-top: 4px;">身份</el-row>
                  <el-row style="line-height: 16px;">证号：</el-row>
                </el-col>
                <el-col :span="19">
                  <div  v-if="pageLevel === 'add'" style="height: 40px;">
                    <el-select class="student-search" style="height: 40px;" v-model="finance.studentId" @change="getStudent" filterable remote reserve-keyword placeholder=""
                               :remote-method="getStudentList" :loading="studentListLoading">
                      <el-option v-for="student in studentList" :key="student.studentId" :label="student.idNumber" :value="student.studentId">
                      </el-option>
                    </el-select>
                  </div>
                  <div v-else>
                    {{finance.idNumber}}
                  </div>
                </el-col>
              </el-row>
            </el-col>
          </el-row>
        <!-- 项目 -->
        <el-row  style="border: 1px solid #1f2d3d; border-top: none;font-size: 12px;height: 100%;">
          <el-col :span="1" style="padding: 0 10px;height: 100%;">
            <div >
              <div style="margin: 25px 0 0 3px;">项</div>
              <div style="position: absolute;bottom: 25px;left: 14px;">目</div>
            </div>
          </el-col>
          <el-col :span="23" style="border-left: 1px solid #1f2d3d;">
            <!--代收费-->
            <el-row style="line-height: 30px;border-bottom: 1px solid #1f2d3d;">
              <el-col class="text_css" :span="2" style="padding-left:10px;">
                <span >代收费：</span>
              </el-col>
              <el-col :span="22">
                <el-checkbox-group @change="changeFinanceList" v-model="finance.financeIdList" class="service-checkbox-group">
                  <el-checkbox v-for="service in evenFinanceList('001')" :label="service.categoryId" :disabled="flag" :key="service.categoryId">
                    {{service.name}}
                    <span v-if="service.priceType === '1'">
                      ×&nbsp;<el-input-number :min="1" :max="9999" size="small" class="money-input-number" v-model="service.number" :disabled="flag" @change="changeFinanceList"
                                              style="border: none; outline:none;width: 35px;border-bottom: #dcdfe6 1px solid;font-size: 12px;color: #606266;height: 23px">
                    </el-input-number>
                    </span>
                    <span v-else>{{service.price}}元</span>
                  </el-checkbox>
                </el-checkbox-group>
              </el-col>

            </el-row>
            <!--培训费-->
            <el-row style="line-height: 30px;border-bottom: 1px solid #1f2d3d;">
              <el-col class="text_css" :span="2" style="padding-left:10px;">
                <span >培训费：</span>
              </el-col>
              <el-col :span="22">
                <el-checkbox-group @change="changeFinanceList" v-model="finance.financeIdList" class="service-checkbox-group">
                  <el-checkbox v-for="service in evenFinanceList('002')" :label="service.categoryId" :disabled="flag" :key="service.categoryId">
                    {{service.name}}
                    <span v-if="service.priceType === '1'">
                      ×&nbsp;<el-input-number :min="1" :max="9999" size="small" class="money-input-number" v-model="service.number" :disabled="flag" @change="changeFinanceList"
                                              style="border: none; outline:none;width: 35px;border-bottom: #dcdfe6 1px solid;font-size: 12px;color: #606266;height: 23px">
                    </el-input-number>
                    </span>
                    <span v-else>{{service.price}}元</span>
                  </el-checkbox>
                </el-checkbox-group>
              </el-col>
            </el-row>
            <!--服务包-->
            <el-row style="line-height: 30px;border-bottom: 1px solid #1f2d3d;">
              <el-col class="text_css" :span="2" style="padding-left:10px;">
                <span >服务包：</span>
              </el-col>
              <el-col :span="22">
                <el-checkbox-group @change="changeFinanceList" v-model="finance.financeIdList" class="service-checkbox-group">
                  <el-checkbox v-for="service in evenFinanceList('003')" :label="service.categoryId" :disabled="flag" :key="service.categoryId">
                    {{service.name}}
                    <span v-if="service.priceType === '1'">
                    ×&nbsp;<el-input-number :min="1" :max="9999" size="small" class="money-input-number" v-model="service.number" :disabled="flag" @change="changeFinanceList"
                                            style="border: none; outline:none;width: 35px;border-bottom: #dcdfe6 1px solid;font-size: 12px;color: #606266;height: 23px">
                    </el-input-number>
                    </span>
                    <span v-else>{{service.price}}元</span>
                  </el-checkbox>
                </el-checkbox-group>
              </el-col>
            </el-row>
            <!--优惠包-->
            <el-row style="line-height: 30px;">
              <el-col class="text_css" :span="2" style="padding-left:10px;">
                <span >优惠包：</span>
              </el-col>
              <el-col :span="22">
                <el-checkbox-group @change="changeFinanceList" v-model="finance.financeIdList" class="service-checkbox-group">
                  <el-checkbox v-for="service in evenFinanceList('004')" :label="service.categoryId" :disabled="flag" :key="service.categoryId">
                    {{service.name}}
                    <span v-if="service.priceType === '1'">
                      ×&nbsp;<el-input-number :min="1" :max="9999" size="small" class="money-input-number" v-model="service.number" :disabled="flag" @change="changeFinanceList"
                                              style="border: none; outline:none;width: 35px;border-bottom: #dcdfe6 1px solid;font-size: 12px;color: #606266;height: 23px">
                    </el-input-number>
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
            <div style="width: 12px; word-wrap: break-word; margin: 0 auto;line-height: 48px">收款</div>
          </el-col>
          <el-col :span="23" style="border-left: 1px solid #1f2d3d;">
            <el-row style="line-height: 30px;padding: 0 10px">
              <div class="text_css" style="width: 150px;float: left">
                原价：￥{{finance.originalPrice}}
              </div>
              <div v-if="finance.activityPrice !== 0" class="text_css" style="width: 150px;float: left">
                活动价：￥{{finance.activityPrice + finance.originalPrice}}
              </div>
            </el-row>
            <el-row style="line-height: 30px;padding: 0 10px;border-bottom: 1px solid #1f2d3d;">
              <div class="text_css" style="width: 150px;float: left" v-show="finance.earnestMoney !== 0">已收金额：￥{{finance.earnestMoney}}</div>
              <div class="text_css" style="width: 150px;float: left">
                本次实收金额：￥<span class="hasMoney">{{finance.realPrice}}</span>
              </div>
              <div class="text_css" style="float: left">人名币大写：{{finance.realPrice | smalltoBIG}}</div>
            </el-row>
            <el-row  class="text_css"  style="line-height: 35px;padding: 0 10px">
              <el-col :span="3">
                <span >本次收款方式：</span>
              </el-col>
              <el-col :span="21">
                <span v-for="(payType,index) in finance.payTypeList">
                  <span>
                    {{payType.mode}}：
                  </span>
                  <!-- -->
                  <el-input-number v-model="payType.money" controls-position="right" size="small" class="money-input-number"
                                   :disabled="(index === 0 && finance.receivablesType!='定金' ) || pageLevel==='info'"
                                   :class="payType.money!==0?'hasMoney':''"
                                   @change="actualMoneyCalculation" style="border: none; outline:none;width: 50px;border-bottom: #dcdfe6 1px solid;font-size: 12px;color: #606266;height: 23px">

                  </el-input-number>
                  元
                  <span v-if="finance.payTypeList.length !== (index+1)">，</span>
                </span>
              </el-col>
            </el-row>
          </el-col>
        </el-row>
        <!-- 销售员 备注 -->
        <el-row style="line-height: 35px;border: 1px solid #1f2d3d;border-top: none;font-size: 12px;height: 100%">
          <el-col :span="8" style="border-right: 1px solid #1f2d3d;text-align: center;height: 35px;">
            <el-checkbox v-model="periodcard" label="学时卡已发放" class="service-checkbox-group" @change="btnDisabled = false" style="height: 35px;" :disabled="pageLevel==='info'"></el-checkbox>
            <el-checkbox v-model="healthform" label="体检表已发放" class="service-checkbox-group" @change="btnDisabled = false" style="height: 35px;" :disabled="pageLevel==='info'"></el-checkbox>
          </el-col>
          <el-col :span="4" style="border-right: 1px solid #1f2d3d;padding-left: 10px;">
            <span class="text_css">销售员：{{finance.introducer}}
            </span>
          </el-col>
          <el-col :span="12">
            <el-row>
              <el-col :span="3" style="padding-left: 10px;">备注：</el-col>
              <el-col :span="21"><input v-model="finance.remark" @change="btnDisabled = false"  :disabled="pageLevel==='info'"  style="border: none;outline:none;border-bottom: #dcdfe6 1px solid;font-size: 12px;color: #606266;width: 100%"/></el-col>
            </el-row>
          </el-col>
        </el-row>
        <!-- 落款 制单人 -->
        <el-row style="line-height: 30px;font-size: 14px;">
          <el-col :offset="1" :span="6">单位盖章：</el-col>
          <el-col :span="6">制单人：{{finance.payee}}</el-col>
          <el-col :span="6">修改人：{{finance.reviser}}</el-col>
          <el-col :span="5">复核人：{{finance.auditor}}</el-col>
        </el-row>
      </div>
    </el-card>
    <div v-show="pageShow==='config'" style="padding: 20px;padding-top: 55px;height: 100%;overflow: auto">
      <el-form :model="receiptConfig" :rules="rules" ref="receiptConfig" label-width="100px">
        <el-form-item label="流水号前缀" prop="serialPrefix">
          <el-input v-model="receiptConfig.serialPrefix" placeholder="流水号前缀"></el-input>
        </el-form-item>
        <el-form-item label="收据表头" prop="title">
          <el-input v-model="receiptConfig.title" placeholder="收据表头"></el-input>
        </el-form-item>

        <el-form-item label="代收费" prop="roleName">
          <el-checkbox-group @change="changeShowList"  v-model="receiptConfig.showList" class="service-checkbox-group">
            <el-checkbox v-for="service in evenFinanceAll('001')" :label="service.categoryId" :key="service.categoryId">
              {{service.name}}
            </el-checkbox>
          </el-checkbox-group>
        </el-form-item>
        <el-form-item label="培训费" prop="roleName">
          <el-checkbox-group @change="changeShowList"   v-model="receiptConfig.showList" class="service-checkbox-group">
            <el-checkbox v-for="service in evenFinanceAll('002')" :label="service.categoryId" :key="service.categoryId">
              {{service.name}}
            </el-checkbox>
          </el-checkbox-group>
        </el-form-item>
        <el-form-item label="服务包" prop="roleName">
          <el-checkbox-group @change="changeShowList"   v-model="receiptConfig.showList" class="service-checkbox-group">
            <el-checkbox v-for="service in evenFinanceAll('003')" :label="service.categoryId" :key="service.categoryId">
              {{service.name}}
            </el-checkbox>
          </el-checkbox-group>
        </el-form-item>
        <el-form-item label="优惠包" prop="roleName">
          <el-checkbox-group @change="changeShowList"   v-model="receiptConfig.showList" class="service-checkbox-group">
            <el-checkbox v-for="service in evenFinanceAll('004')" :label="service.categoryId" :key="service.categoryId">
              {{service.name}}
            </el-checkbox>
          </el-checkbox-group>
        </el-form-item>

        <el-form-item label="常用服务组" prop="roleName">
          <div v-for="(group,index) in receiptConfig.groupList">
            <el-row>
              <el-col :span="7">
                <el-input v-model="group.name" placeholder="组名"></el-input>
              </el-col>
              <el-col :span="13">
                <el-select v-model="group.group" style="width: 100%;" multiple filterable collapse-tags placeholder="请选择">
                  <el-option
                    v-for="item in financeShow"
                    :key="item.categoryId"
                    :label="item.name"
                    :value="item.categoryId">
                  </el-option>
                </el-select>
              </el-col>
              <el-col :span="4">
                <el-button style="padding: 9px;margin-left: 10px;" size="mini" type="danger" @click="deleteGroup(index)"   icon="el-icon-delete" plain circle></el-button>
                <el-button v-if="index + 1 === receiptConfig.groupList.length" style="padding: 9px;" @click="addGroup(index)" size="mini" type="success"  icon="el-icon-plus" plain circle></el-button>
              </el-col>
            </el-row>
          </div>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
  import Coach from '@/components/Coach'
  import { remRepeat } from '@/utils/index'
  import { getFinanceList, getFinancePage, getConfig, saveConfig } from '@/api/finance/service-category'
  import { queryMoneyListById, saveServiceCharge, querySerialNumber, getServiceByChargeId, updateFinaceState, getChargeId } from '@/api/finance/service-charge'
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
      charge: Object
    },
    watch: {
    },
    data() {
      return {
        financeList: [], // 可选服务
        groupList: [], // 服务组
        financeAll: [], // 所有服务
        financeShow: [], // 所有服务
        receiptConfig: {
          serialPrefix: '',
          title: '',
          showList: [],
          groupList: []
        },
        rules: {
          serialPrefix: [
            { required: true, message: '流水号前缀', trigger: ['blur', 'change'] }
          ],
          title: [
            { required: true, message: '收据表头', trigger: ['blur', 'change'] }
          ]
        },
        studentList: [],
        receivablesList: [
          { type: '全款', disabled: false },
          { type: '定金', disabled: false },
          { type: '定转全', disabled: false },
          { type: '购买服务包', disabled: true }
        ],
        receivables: false,
        pageShow: 'bill', // bill config
        pageLevel: 'add', // add edit info
        finance: {
          studentId: null, // 学员Id
          campus: '', // 学员校区
          name: '', // 姓名
          idNumber: '', // 身份证
          motorcycleType: '', // 学员车型
          serialNumber: null, // 流水号
          serialPrefix: '', // 流水号 前缀
          title: '', // 收据标题 公司名字
          originalPrice: 0, // 原始价格 就是所选服务不包括优惠的价格
          activityPrice: 0, // 活动价格 优惠
          realPrice: 0, // 实收价格
          earnestMoney: 0, // 已收定金
          remark: '', // 备注
          introducer: '', // 销售员
          payee: '', // 收款人
          reviser: '', // 校订者 修改人
          auditor: '', // 校订者 修改人
          receivablesType: '全款',
          paytime: null,
          month: null,
          payTypeList: [
            { mode: '现金', money: 0 },
            { mode: '支付宝', money: 0 },
            { mode: '微信', money: 0 },
            { mode: '收钱吧', money: 0 },
            { mode: '刷卡', money: 0 },
            { mode: '其他', money: 0 }
          ], // 支付方式
          financeList: [],
          financeIdList: []
        },
        loading: false,
        btnLoading: false,
        btnDisabled: true,
        flag: false,
        studentListLoading: false,
        periodcard: false,
        healthform: false,
        studentListQuery: {
          page: 1,
          limit: 0,
          condition: null
        }
      }
    },
    created() {
      this.getFinanceList()
      if (this.charge) {
        this.pageLevel = this.charge.pageLevel
        if (this.pageLevel === 'info') {
          this.flag = true
        }
        this.getService(this.charge.chargeId)
      } else {
        var date = new Date()
        var year = date.getFullYear()
        var month = date.getMonth() + 1
        var day = date.getDate()
        if (month < 10) month = '0' + month
        if (day < 10) day = '0' + day
        this.finance.paytime = year + '-' + month + '-' + day
        this.getSerialNumber()
        this.finance.payee = this.name
      }
      if (this.student) {
        this.getStudentList(this.student.name)
        this.finance.studentId = this.student.studentId
        this.getStudent()
      }
    },
    computed: {
      parsePaytime() {
        var time = this.finance.paytime
        if (time) {
          return time.substring(0, 4) + '年' + time.substring(5, 7) + '月' + time.substring(8, 11) + '日'
        }
        return ''
      },
      getExamineIcon() {
        if (this.finance.state === '-2') return '/static/icon/icon-writeoff.png'
        if (this.finance.state === '-1') return '/static/icon/icon-fail.png'
        if (this.finance.state === '1') return '/static/icon/icon-adopt.png'
        return ''
      },
      ...mapGetters([
        'permissions',
        'name',
        'client'
      ])
    },
    methods: {
      // 查看收据详情
      getConfig() {
        getConfig().then(response => {
          if (response.data.code === 0) {
            var receiptConfig = response.data.data
            var financeShow = []
            this.financeAll.forEach(function(item) {
              receiptConfig.showList.forEach(function(id) {
                if (item.categoryId === id) financeShow.push(item)
              })
            })
            this.receiptConfig = receiptConfig
            this.financeShow = financeShow
          }
        })
      },
      getService(chargeId) {
        this.loading = true
        getServiceByChargeId(chargeId).then(response => {
          var finance = response.data.data
          var payTypeList = [
            { mode: '现金', money: 0 },
            { mode: '支付宝', money: 0 },
            { mode: '微信', money: 0 },
            { mode: '收钱吧', money: 0 },
            { mode: '刷卡', money: 0 },
            { mode: '其他', money: 0 }
          ]
          payTypeList.forEach(function(type) {
            finance.payTypeList.forEach(function(item) {
              if (type.mode === item.mode) {
                type.money = item.money
              }
            })
          })
          var financeIdList = []
          var financeList = []
          if (finance.financeList && finance.financeList.length > 0) {
            finance.financeList.forEach(function(item) {
              financeIdList.push(item.categoryId)
            })
            var li = finance.financeList.concat(this.financeList)
            this.financeList = remRepeat(li, 'categoryId')
          }
          if (finance.receivablesType === '定转全') {
            this.flag = true
            queryMoneyListById(finance.studentId).then(response => {
              var list = response.data.data
              if (list && list.length > 0) {
                list.forEach(function(item) {
                  item.financeList.forEach(function(fin) {
                    financeIdList.push(fin.categoryId)
                    financeList.push(fin)
                    // that.financeList.forEach(function(fall) {
                    // })
                  })
                })
              }
            })
            finance.financeList = financeList
          }
          this.setReceivablesList([finance.receivablesType])
          finance.financeIdList = financeIdList
          finance.payTypeList = payTypeList
          if (this.pageLevel === 'edit') {
            // 校订者 修改人
            finance.reviser = this.name
          }
          this.periodcard = false
          this.healthform = false
          if (finance.periodcard === '1') this.periodcard = true
          if (finance.healthform === '1') this.healthform = true
          finance.paytime = finance.paytime.substring(0, 10)
          var time = finance.paytime.replace('-', '')
          time = time.substring(0, 6)
          finance.month = time
          console.log(finance)
          this.finance = finance
          this.loading = false
        })
      },
      updateConfig() {
        getFinancePage({ page: 1, limit: 0, status: 0 }).then(response => {
          var data = response.data.data
          this.financeAll = data.list
          this.pageShow = 'config' // bill config
          this.getConfig()
        })
      },
      groupSelect(group) {
        this.finance.financeIdList = group.group
        this.changeFinanceList()
      },
      saveConfig() {
        saveConfig(this.receiptConfig).then(response => {
          this.pageShow = 'bill' // bill config
          this.getFinanceList()
        })
      },
      deleteGroup(index) {
        this.receiptConfig.groupList.splice(index, 1)
      },
      addGroup(index) {
        this.receiptConfig.groupList.splice(index + 1, 0, {})
      },
      changeShowList() {
        var showList = this.receiptConfig.showList
        var financeShow = []
        this.financeAll.forEach(function(item) {
          if (showList.indexOf(item.categoryId) > -1) {
            financeShow.push(item)
          }
        })
        this.financeShow = financeShow
      },
      // 点击修改
      updateFinace() {
        this.pageLevel = 'edit'
        // 校订者 修改人
        this.finance.reviser = this.name
        if (this.finance.receivablesType !== '定转全') {
          this.flag = false
        }
      },
      // 上一单  下一单
      paging(chargeId, pag) {
        getChargeId({ chargeId: chargeId, pag: pag }).then(res => {
          if (res.data.data) {
            this.getService(res.data.data)
          } else {
            var msg = pag > 0 ? '没有下一单了' : '没有上一单了'
            this.$message.error(msg)
          }
        })
      },
      updateFinaceState(chargeid, state) {
        // console.log(dat,row)
        var dat = {
          chargeId: chargeid,
          state: state
        }
        this.$confirm('是否提交审核?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          updateFinaceState(dat).then(res => {
            this.pageLevel = 'info'
            this.flag = true
            this.getService(this.charge.chargeId)
          })
        })
      },
      // 获取学员信息
      getStudent(receivable) {
        this.clean()
        this.finance.financeList = []
        if (this.finance.studentId) {
          this.loading = true
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
            this.loading = false
          })
        }
      },
      // 获取已经收费的信息
      queryMoneyList(studentId, receivable) {
        this.loading = true
        queryMoneyListById(studentId).then(response => {
          var list = response.data.data
          if (list && list.length > 0) {
            list = list.filter(function(item) {
              return item.state !== '-1'
            })
            var financeList = []
            var financeIdList = []
            var earnestMoney = 0 // 已收定金
            var originalPrice = 0 // 原始价格 就是所选服务不包括优惠的价格
            var activityPrice = 0 // 活动价格 优惠
            var receivables = ['购买服务包']
            var periodcard = false
            var healthform = false
            var isOnly = true
            for (var i = 0; i < list.length; i++) {
              var financeNote = list[i]
              if (financeNote.receivablesType !== '购买服务包') {
                isOnly = false
              }
              if (!periodcard && earnestMoney.periodcard === '1') periodcard = true
              if (!healthform && earnestMoney.healthform === '1') healthform = true
              if (financeNote.receivablesType === '定金') {
                earnestMoney += financeNote.money
                //
                for (var a = 0; a < financeNote.financeList.length; a++) {
                  var finance = financeNote.financeList[a]
                  financeIdList.push(finance.categoryId)
                  financeList.push(finance)
                  if (finance.code === '004') {
                    activityPrice += finance.price * finance.number
                  } else {
                    originalPrice += finance.price * finance.number
                  }
                }
              }
            // aa
            }
            this.periodcard = periodcard
            this.healthform = periodcard
            var realPrice = originalPrice + activityPrice - earnestMoney
            if (realPrice > 0) {
              // 费用未经缴清
              this.finance.activityPrice = activityPrice // 活动价格 优惠
              this.finance.originalPrice = originalPrice // 原始价格 就是所选服务不包括优惠的价格
              this.finance.earnestMoney = earnestMoney // 已收定金
              this.finance.financeList = financeList
              var li = financeList.concat(this.financeList)
              this.financeList = remRepeat(li, 'categoryId')
              this.finance.financeIdList = financeIdList
              this.finance.realPrice = realPrice
              this.finance.payTypeList[0].money = originalPrice + activityPrice - earnestMoney
              receivables.push('定转全')
              this.flag = true
              this.btnDisabled = false
              if (receivable !== '购买服务包') this.finance.receivablesType = '定转全'
            }
            // 费用已经缴清
            if (realPrice < 0) realPrice = 0
            if (realPrice === 0 || receivable === '购买服务包') {
              // this.finance.receivablesType = '购买服务包'
              this.clean()
              this.flag = false
              // 已经购买的服务包
              this.finance.financeList = []
              this.finance.financeIdList = []
            }
            if (isOnly) {
              receivables.push('全款')
              receivables.push('定金')
            }
            this.setReceivablesList(receivables)
            this.loading = false
          } else {
            this.flag = false
            this.setReceivablesList(['全款', '定金', '购买服务包'])
            // 已经购买的服务包
            this.finance.financeList = []
            this.finance.financeIdList = []
          }
          this.loading = false
        })
        // this.setReceivablesList(['全款', '定金', '定转全', '购买服务包'])
      },
      // 获取可选的收费方式
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
        getFinanceList().then(response => {
          var data = response.data
          this.financeList = data.list || []
          this.groupList = data.groupList || []
          this.loading = false
          console.log(data)
        })
      },
      evenFinanceAll(code) {
        return this.financeAll.filter(function(finance) {
          return finance.code === code
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
      /* 选择的府服务发生变化 */
      changeFinanceList() {
        var financeList = []
        var financeIdList = this.finance.financeIdList
        this.financeList.forEach(function(item) {
          financeIdList.forEach(function(id) {
            if (item.categoryId === id) {
              financeList.push(item)
            }
          })
        })
        this.finance.financeList = financeList
        this.calculation()
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
        var earnestMoney = this.finance.earnestMoney || 0
        var receivable = this.finance.activityPrice + this.finance.originalPrice - earnestMoney
        console.log(receivable)
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
        if (!this.finance.serialNumber) {
          this.$message.error('流水号异常，无法保存！')
          return false
        }
        if (!this.finance.studentId) {
          this.$message.error('未选择学员，无法保存！')
          return false
        }
        if (this.finance.receivablesType === '全款' || this.finance.receivablesType === '购买服务包' || this.finance.receivablesType === '定金') {
          if (!this.finance.financeIdList || this.finance.financeIdList.length === 0) {
            this.$message.error('未选择服务包，无法保存！')
            return false
          }
        }
        this.finance.periodcard = this.periodcard ? '1' : '0'
        this.finance.healthform = this.healthform ? '1' : '0'
        saveServiceCharge(this.finance).then(() => {
          if (this.pageLevel === 'add') {
            this.$layer.close(this.layerid)
          }
          this.flag = true
          this.pageLevel = 'info'
          this.btnDisabled = true
          this.btnLoading = false
        })
      },
      // 修改日期
      dateChange() {
        this.btnDisabled = false
        this.getSerialNumber()
      },
      // 获取订单号
      getSerialNumber() {
        var time = this.finance.paytime
        this.finance.title = ''
        this.finance.serialPrefix = ''
        this.finance.serialNumber = null
        if (time) {
          time = time.replace('-', '')
          time = time.substring(0, 6)
          this.finance.month = time
          querySerialNumber(time).then(res => {
            if (res.data.code === 0) {
              this.finance.serialNumber = res.data.data.serialNumber
              this.finance.serialPrefix = res.data.data.serialPrefix
              this.finance.title = res.data.data.title
            }
          })
        }
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
      },
      // 打印
      createOneFormPage() {
        var LODOP = getLodop()
        var dsfStr = ''
        var pxfStr = ''
        var fwbStr = ''
        var yhbStr = ''

        var dsf = 0
        var pxf = 0
        var fwb = 0
        var yhb = 0

        for (var j = 0; j < this.stuServiceBuyNoteEntity.financeList.length; j++) {
          if (this.stuServiceBuyNoteEntity.financeList[j].code === '001') {
            if (50 - (dsfStr.length % 50) > (this.stuServiceBuyNoteEntity.financeList[j].name + '×' + this.stuServiceBuyNoteEntity.financeList[j].number + '   ').length) {
              dsfStr = dsfStr + this.stuServiceBuyNoteEntity.financeList[j].name + '×' + this.stuServiceBuyNoteEntity.financeList[j].number + '   '
            } else {
              dsfStr = dsfStr + this.stuServiceBuyNoteEntity.financeList[j].name + '×' + this.stuServiceBuyNoteEntity.financeList[j].number + '\r\n'
              dsf = dsf + 20
            }
          }

          if (this.stuServiceBuyNoteEntity.financeList[j].code === '002') {
            if (50 - (pxfStr.length % 50) > (this.stuServiceBuyNoteEntity.financeList[j].name + '×' + this.stuServiceBuyNoteEntity.financeList[j].number + '   ').length) {
              pxfStr = pxfStr + this.stuServiceBuyNoteEntity.financeList[j].name + '×' + this.stuServiceBuyNoteEntity.financeList[j].number + '   '
            } else {
              pxfStr = pxfStr + this.stuServiceBuyNoteEntity.financeList[j].name + '×' + this.stuServiceBuyNoteEntity.financeList[j].number + '\r\n'
              pxf = pxf + 20
            }
          }
          if (this.stuServiceBuyNoteEntity.financeList[j].code === '003') {
            if (50 - (fwbStr.length % 50) > (this.stuServiceBuyNoteEntity.financeList[j].name + '×' + this.stuServiceBuyNoteEntity.financeList[j].number + '   ').length) {
              fwbStr = fwbStr + this.stuServiceBuyNoteEntity.financeList[j].name + '×' + this.stuServiceBuyNoteEntity.financeList[j].number + '   '
            } else {
              fwbStr = fwbStr + this.stuServiceBuyNoteEntity.financeList[j].name + '×' + this.stuServiceBuyNoteEntity.financeList[j].number + '\r\n'
              fwb = fwb + 20
            }
          }
          if (this.stuServiceBuyNoteEntity.financeList[j].code === '004') {
            if (50 - (yhbStr.length % 50) > (this.stuServiceBuyNoteEntity.financeList[j].name + '×' + this.stuServiceBuyNoteEntity.financeList[j].number + '   ').length) {
              yhbStr = yhbStr + this.stuServiceBuyNoteEntity.financeList[j].name + '×' + this.stuServiceBuyNoteEntity.financeList[j].number + '   '
            } else {
              yhbStr = yhbStr + this.stuServiceBuyNoteEntity.financeList[j].name + '×' + this.stuServiceBuyNoteEntity.financeList[j].number + '\r\n'
              yhb = yhb + 20
            }
          }
        }

        var a = dsf
        var b = dsf + pxf
        var c = dsf + pxf + fwb
        var d = dsf + pxf + fwb + yhb

        LODOP.PRINT_INITA(1, 0, 761, (550 + d), '打印控件功能演示_Lodop功能_在线编辑获得程序代码')
        LODOP.SET_PRINT_MODE('PRINT_NOCOLLATE', 1)

        LODOP.ADD_PRINT_TEXT(167, 127, 600, (20 + dsf), dsfStr)
        LODOP.ADD_PRINT_TEXT((198 + a), 127, 600, (20 + pxf), pxfStr)
        LODOP.ADD_PRINT_TEXT((235 + b), 127, 600, (20 + fwb), fwbStr)
        LODOP.ADD_PRINT_TEXT((266 + c), 127, 600, (20 + yhb), yhbStr)

        if (this.studyCard) {
          LODOP.ADD_PRINT_LINE((433 + d), 47, (420 + d), 57, 0, 1)
          LODOP.ADD_PRINT_LINE((425 + d), 42, (434 + d), 48, 0, 1)
        }
        if (this.healthForm) {
          LODOP.ADD_PRINT_LINE((433 + d), 175, (420 + d), 185, 0, 1)
          LODOP.ADD_PRINT_LINE((423 + d), 170, (432 + d), 176, 0, 1)
        }

        LODOP.ADD_PRINT_TEXT(16, 242, 300, 53, '重庆壹路驾校培训有限公司\r\n收款收据')
        LODOP.SET_PRINT_STYLEA(0, 'FontSize', 16)
        LODOP.SET_PRINT_STYLEA(0, 'Alignment', 2)
        LODOP.ADD_PRINT_TEXT(51, 563, 173, 20, '单据编号：年月+流水号')
        LODOP.SET_PRINT_STYLEA(0, 'FontSize', 11)
        LODOP.ADD_PRINT_RECT(77, 25, 702, (376 + d), 0, 1)
        LODOP.ADD_PRINT_LINE(122, 26, 121, 728, 0, 1)
        LODOP.ADD_PRINT_TEXT(90, 26, 100, 20, this.dateTime)
        LODOP.ADD_PRINT_LINE(77, 137, 121, 138, 0, 1)
        LODOP.ADD_PRINT_TEXT(90, 139, 45, 20, '校区：')
        LODOP.ADD_PRINT_TEXT(90, 184, 45, 20, this.student.campus)
        LODOP.ADD_PRINT_LINE(121, 275, 77, 276, 0, 1)
        LODOP.ADD_PRINT_TEXT(91, 349, 60, 20, this.stuServiceBuyNoteEntity.receivablesType)
        LODOP.ADD_PRINT_LINE(121, 407, 77, 408, 0, 1)
        LODOP.ADD_PRINT_TEXT(91, 280, 69, 20, '收款类型：')
        LODOP.ADD_PRINT_TEXT(91, 411, 46, 20, '姓名：')
        LODOP.ADD_PRINT_TEXT(90, 458, 65, 21, this.student.name)
        LODOP.ADD_PRINT_LINE(121, 527, 77, 528, 0, 1)
        LODOP.ADD_PRINT_TEXT(91, 531, 73, 20, '身份证号：')
        LODOP.ADD_PRINT_TEXT(91, 605, 120, 20, this.student.idNumber)

        LODOP.ADD_PRINT_TEXT(132, 72, 100, 20, '车型：' + (this.student.motorcycleType === undefined ? '' : this.student.motorcycleType))
        LODOP.ADD_PRINT_LINE(160, 69, 159, 729, 0, 1) // 车型

        LODOP.ADD_PRINT_TEXT(167, 72, 100, 20, '代收费：')
        // ↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓代收费

        // ↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑代收费
        LODOP.ADD_PRINT_LINE((191 + a), 69, (190 + a), 729, 0, 1) // 代收费

        LODOP.ADD_PRINT_TEXT((198 + a), 73, 100, 20, '培训费：')// 内容，参数（上边距，左边距，内容显示宽度，内容显示高度）
        // ↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓培训费

        // ↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑培训费
        LODOP.ADD_PRINT_LINE((224 + b), 69, (223 + b), 729, 0, 1) // 培训费

        LODOP.ADD_PRINT_TEXT((235 + b), 74, 100, 20, '服务包：')
        // ↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓服务包

        // ↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑服务包
        LODOP.ADD_PRINT_LINE((262 + c), 69, (261 + c), 729, 0, 1) // 服务包

        LODOP.ADD_PRINT_TEXT((266 + c), 74, 100, 20, '优惠包：')
        // ↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓优惠包

        // ↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑优惠包
        LODOP.ADD_PRINT_LINE((295 + d), 27, (294 + d), 728, 0, 1)// 项目底

        LODOP.ADD_PRINT_LINE(125, 68, (407 + d), 69, 0, 1)// 项目 收款
        // 线，竖杠(上边距1,1左边距,上边距2,2左边距,intLineStyle, intLineWidth)
        // intLineStyle:线条类型，默认为0；0--实线 1--破折线 2--点线 3--点划线 4--双点划线
        // intLineWidth:线条宽，默认是1，整数型，单位是(打印)像素，非实线的线条宽也是0
        // 内容，参数（上边距，左边距，内容显示宽度，内容显示高度）

        LODOP.ADD_PRINT_TEXT((307 + d), 78, 169, 20, '原价：￥' + this.stuServiceBuyNoteEntity.originalPrice)
        LODOP.ADD_PRINT_TEXT((333 + d), 76, 148, 20, '已收定金：￥' + this.earnestMoney)
        LODOP.ADD_PRINT_TEXT((333 + d), 235, 166, 20, '本次实收金额：￥' + this.stuServiceBuyNoteEntity.realPrice)
        LODOP.ADD_PRINT_TEXT((334 + d), 436, 234, 20, '实收大写：' + smalltoBIG(this.stuServiceBuyNoteEntity.realPrice))
        LODOP.ADD_PRINT_LINE((362 + d), 69, (361 + d), 728, 0, 1)// 收款价格底

        LODOP.ADD_PRINT_TEXT((320 + d), 32, 24, 60, '收\r\n\r\n款')

        LODOP.ADD_PRINT_TEXT((372 + d), 77, 94, 20, '本次收款方式：')
        LODOP.ADD_PRINT_TEXT((372 + d), 167, 89, 20, '现金：' + this.payTypeList[0].money + '元')
        LODOP.ADD_PRINT_TEXT((372 + d), 254, 100, 20, '支付宝：' + this.payTypeList[1].money + '元')
        LODOP.ADD_PRINT_TEXT((372 + d), 350, 90, 20, '微信：' + this.payTypeList[2].money + '元')
        LODOP.ADD_PRINT_TEXT((372 + d), 438, 100, 20, '收钱吧：' + this.payTypeList[3].money + '元')
        LODOP.ADD_PRINT_TEXT((372 + d), 538, 90, 20, '刷卡：' + this.payTypeList[4].money + '元')
        LODOP.ADD_PRINT_TEXT((372 + d), 623, 100, 20, '其他：' + this.payTypeList[5].money + '元')

        LODOP.ADD_PRINT_LINE((407 + d), 27, (406 + d), 728, 0, 1)// 收款底
        // LODOP.ADD_PRINT_LINE(244,68,121,69,0,1);
        // 收款1

        LODOP.ADD_PRINT_TEXT((176 + (d / 2)), 33, 24, 56, '项\r\n\r\n目')// 内容，参数（上边距，左边距，内容显示宽度，内容显示高度）

        LODOP.ADD_PRINT_TEXT((420 + d), 55, 100, 20, '学时卡已发放')
        LODOP.ADD_PRINT_RECT((424 + d), 42, 12, 12, 0, 1)
        LODOP.ADD_PRINT_TEXT((420 + d), 186, 100, 20, '体检表已发放')
        LODOP.ADD_PRINT_RECT((424 + d), 171, 12, 12, 0, 1)
        LODOP.ADD_PRINT_LINE((406 + d), 296, (451 + d), 297, 0, 1)
        LODOP.ADD_PRINT_LINE((406 + d), 426, (451 + d), 427, 0, 1)

        var introducerName = ''
        for (var i = 0; i < this.student.introducerNameList; i++) {
          introducerName = introducerName + this.student.introducerNameList[i] + '、'
        }

        LODOP.ADD_PRINT_TEXT((421 + d), 312, 100, 20, '销售员：' + introducerName)
        LODOP.ADD_PRINT_TEXT((419 + d), 430, 303, 20, '备注' + this.stuServiceBuyNoteEntity.remark)

        LODOP.ADD_PRINT_TEXT((459 + d), 531, 57, 25, '复核人：')
        LODOP.ADD_PRINT_TEXT((459 + d), 64, 75, 25, '单位盖章：')
        LODOP.ADD_PRINT_TEXT((459 + d), 291, 65, 25, '收款人：')
        LODOP.PREVIEW()
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
input:disabled{
  border: 1px solid #DDD;
  background: none;
  color:#c0c4cc;
  cursor:not-allowed;
}
.hasMoney{
  color: red!important;
}
.btn-group {
  width: 98%;
  height: 40px;
  /* border-bottom: 1px solid; */
  position: fixed;
  padding: 5px;
  background-color: #fff;
  z-index: 666;
  -webkit-box-shadow: 1px 3px 4px rgba(0, 0, 0, 0.09);
  box-shadow: 1px 3px 4px rgba(0, 0, 0, 0.08);
}
.examine-state {
  position: absolute;
  width: 150px;
  top: -30px;
  right: 25px;
}
</style>
