<template>
  <div style="height: 100%">
    <el-card v-show="showList" style="height: 100%">
      <div class="filter-container" >
        <div style="height: 40px; float: right">

          <el-date-picker value-format="timestamp" v-model="interval" type="daterange" align="left" range-separator="-"
                          start-placeholder="开始日期" end-placeholder="结束日期" :picker-options="pickerOptions">
          </el-date-picker>

          <el-input @keyup.enter.native="searchClick" style="width: 200px;" placeholder="场地、车牌关键词" v-model="query.condition"></el-input>
          <el-button type="primary"  @click="searchClick">搜索</el-button>
        </div>
      </div>
      <!-- 表格 -->
      <el-table :data="list" v-loading="loading" :height="(tableHeight-195)" element-loading-text="给我一点时间" fit highlight-current-row style="width: 100%">
        <el-table-column type="expand">
          <template slot-scope="props">
            <div v-for="period in props.row.periodList">
              <el-row  style="border-bottom: 1px dashed #ccc;margin-bottom: 12px">
                <el-col :span="8" >{{period.period}}</el-col>
                <el-col :span="4">{{period.number}}/{{period.count}}</el-col>
                <el-col :span="4">
                  <el-switch v-if="period.studentList.length === 0" title="禁用、启用" v-model="period.state" @change="periodDisabled(period)"  active-value="0" inactive-value="1"></el-switch>
                  <el-switch title="已有学员预约，不能修改" v-model="period.state" :disabled="true" active-value="0" inactive-value="1" v-else></el-switch>
                </el-col>
                <el-col :span="8">
                <span  v-for="(stu,i) in period.studentList">
                    <a href="javascript:void(0) " class="period-student" @click="deleteStu(stu,period.pid)" >{{stu.name}}</a>
                  <span v-if="i+1<period.studentList.length">、</span>
                </span>
                  <span v-if="period.studentList.length === 0" >无人预约</span>
                </el-col>
              </el-row>
            </div>
          </template>
        </el-table-column>
        <el-table-column type="index" label="序号"  align="center" width="50"></el-table-column>
        <el-table-column align="center" label="车牌">
          <template slot-scope="scope">
            <span>{{scope.row.plateNumber}}</span>
          </template>
        </el-table-column>
        <el-table-column prop="subject" :filters="subjectFilters" :filter-method="filterSubject" filter-placement="bottom-end" align="center" label="科目">
          <template slot-scope="scope">
            <span>{{scope.row.subject  | subjectFilter}}</span>
          </template>
        </el-table-column>
        <el-table-column align="center" label="训练场地">
          <template slot-scope="scope">
            <span>{{scope.row.fieldAddress}}</span>
          </template>
        </el-table-column>
        <el-table-column align="center" label="日期" >
          <template slot-scope="scope">
            <span>{{scope.row.trainDate | parseTime('{y}-{m}-{d}')}} </span>
          </template>
        </el-table-column>

        <el-table-column prop="state" align="center" label="状态" :filters="stateFilters" :filter-method="filterState" filter-placement="bottom-end">
          <template slot-scope="scope">
            <el-switch v-if="isSwitch(scope.row.periodList)" title="禁用、启用" v-model="scope.row.state" @change="vehicleDisabled(scope.row)" active-value="0" inactive-value="1"></el-switch>
            <el-switch title="已有学员预约，不能修改" v-model="scope.row.state" :disabled="true" v-else active-value="0" inactive-value="1"></el-switch>
          </template>
        </el-table-column>

        <el-table-column align="left" label="教练组" width="200">
          <template slot-scope="scope">
            <p v-for="coach in scope.row.userList" style="margin: 0;">
              {{coach.name}}({{coach.mobile}})
            </p>
          </template>
        </el-table-column>
      </el-table>
      <!--分页-->
      <div v-show="!loading" class="pagination-container" style="margin-top: 20px">
        <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange"
                       :current-page.sync="query.page" background style="float: left"
                       :page-sizes="[10,20,30, 50]" :page-size="query.limit"
                       layout="total, sizes, prev, pager, next, jumper" :total="total">
        </el-pagination>
        <el-button style="margin-top: -8px;float: right" @click="createClick" type="primary" ><i class="el-icon-plus"></i>添加</el-button>
      </div>

    </el-card>

    <el-card v-show="!showList" style="height: 100%;overflow: auto;">
      <el-form :model="vehicle" :rules="vehicleRules"  ref="vehicle" label-position="left" label-width="100px">
        <el-row :gutter="20">
          <el-col>
            <el-form-item prop="serviceType">
              <span slot="label" class="text_css">类型</span>
              <el-cascader v-model="bespType" :options="serviceTypeList" @change="typeChange" style="width: 100%" placeholder="请选择课时类型"></el-cascader>
            </el-form-item>
          </el-col>
        </el-row>

        <el-row >
          <el-col>
            <el-form-item prop="fieldAddress">
              <span slot="label" class="text_css">训练场地</span>
              <el-cascader v-model="bespField" :options="fieldAddressList" @change="fieldChange" style="width: 100%"></el-cascader>
            </el-form-item>
          </el-col>
        </el-row>

        <el-row>
          <el-form-item prop="dateList">
            <span slot="label" class="text_css">培训日期</span>
            <el-select v-model="vehicle.dateList" style="width: 100%" multiple collapse-tags placeholder="请选择培训日期">
              <el-option
                v-for="item in dateList"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>
        </el-row>

        <el-row>
          <el-form-item prop="coachList">
            <span slot="label" class="text_css">车辆/教练</span><!--height: 255px; :style="{height:tableHeight-306 + 'px' }"-->
            <div class="coach-list" :style="{height:coachHeight + 'px' }" :class="coachRules.clazz">
              <div v-for="(coach,cindex) in vehicle.coachList">
                <el-col :span="6">
                  <el-select v-model="coach.vehicleId"  style="width: 100%" collapse-tags placeholder="请选择训练车辆">
                    <el-option
                      v-for="item in vehicleList"
                      :key="item.vehicleId"
                      :label="item.plateNumber"
                      :value="item.vehicleId"
                      :disabled="item.disabled">
                    </el-option>
                  </el-select>
                </el-col>
                <el-col :span="16">
                  <el-select v-model="coach.coachList" style="width: 100%" multiple collapse-tags placeholder="请选择培训教练" @change="setCoachList" >
                    <el-option
                      v-for="item in userList"
                      :key="item.userId"
                      :label="item.name"
                      :value="item.userId">
                    </el-option>
                  </el-select>
                </el-col>
                <el-col :span="2">
                  <i class="el-icon-remove remove-coach-btn" @click="removeCoach(cindex)"></i>
                  <i v-if="cindex+1===vehicle.coachList.length" class="el-icon-circle-plus add-coach-btn" @click="addCoach(cindex)"></i>
                </el-col>
              </div>
            </div>
            <p v-show="!coachRules.required" class="coach-error-msg">请正确选择车辆/教练</p>
          </el-form-item>
        </el-row>
        <el-row>
          <el-col :span="6" :offset="18">
            <el-button @click="cancel('vehicle')"><i class="el-icon-fa-undo"></i> 取 消</el-button>
            <el-button type="primary" @click="save('vehicle')" :loading="saveLoading">保 存</el-button><!---->
          </el-col>
        </el-row>
      </el-form>
    </el-card>
  </div>
</template>

<script>
  import {
    getVehiclePeriodList,
    disableVehicle,
    disablePeriod,
    saveVehiclePeriod,
    deleteVehiclePeriodStudent,
    getTrainingField,
    queryCarList,
    queryCoachList } from '@/api/bespeak/vehicleperiod'
  import { removeAllSpace } from '@/utils/validate'
  import { mapGetters } from 'vuex'
  import { parseTime } from '@/utils/index'

  export default {
    name: 'table_vehicle_period',
    props: {
      area: Array
    },
    watch: {
      area: function(val) {
        this.tableHeight = val[1]
      },
      interval: function(val) {
        if (val && val.length > 0) {
          this.query.beginTime = val[0]
          this.query.endTime = val[1]
        } else {
          this.query.beginTime = null
          this.query.endTime = null
        }
      }
    },
    computed: {
      ...mapGetters([
        'permissions',
        'client'
      ])
    },
    components: {
    },
    data() {
      return {
        tableHeight: this.area[1],
        coachHeight: 72,
        loading: false,
        saveLoading: false,
        showList: true,
        dateList: [],
        total: 0,
        subjectFilters: [
          { text: '科目二', value: '2' },
          { text: '科目三', value: '3' }
        ],
        stateFilters: [
          { text: '启用', value: '0' },
          { text: '禁用', value: '1' }
        ],
        list: [],
        interval: [],
        vehicleList: [],
        userList: [],
        serviceTypeList: [
          {
            label: '一人一车',
            value: 1,
            children: [
              { label: '早班', value: 1 },
              { label: '晚班', value: 2 },
              { label: '全天', value: 3 }
            ]
          },
          {
            label: '两人一车',
            value: 2,
            children: [
              { label: '早班', value: 1 },
              { label: '晚班', value: 2 },
              { label: '全天', value: 3 }
            ]
          }
        ],
        bespType: [],
        bespField: [],
        serviceType: [],
        coachRules: {
          required: true,
          clazz: ''
        },
        timeMap: {
          1: ['7:00-8:00', '8:00-9:00', '9:00-10:00', '10:00-11:00', '11:00-12:00', '12:00-13:00', '13:00-14:00', '14:00-15:00'],
          2: ['14:00-15:00', '15:00-16:00', '16:00-17:00', '17:00-18:00', '18:00-19:00', '19:00-20:00', '20:00-21:00', '21:00-22:00'],
          3: ['7:00-8:00', '8:00-9:00', '9:00-10:00', '10:00-11:00', '11:00-12:00', '12:00-13:00', '13:00-14:00', '14:00-15:00', '14:00-15:00', '15:00-16:00', '16:00-17:00', '17:00-18:00', '18:00-19:00', '19:00-20:00', '20:00-21:00', '21:00-22:00']
        }, // 课时集合
        vehicle: {
          serviceType: null, // 类型 1一人一车  2两人一车
          count: 1, // 人数限制
          fieldAddress: null, // 场地
          subject: 2, // 科目
          timeList: [], // 课时集合
          dateList: [], // 日期集合
          coachList: [
            {}
          ] // 教练车辆集合
        },
        vehicleRules: {
          serviceType: [
            { required: true, message: '请选择类型', trigger: ['blur', 'change'] }
          ],
          fieldAddress: [
            { required: true, message: '请选择场地', trigger: ['blur', 'change'] }
          ],
          dateList: [
            { required: true, message: '请选择培训日期', trigger: ['blur', 'change'] }
          ]
        },
        fieldAddressList: [
          {
            value: '2',
            label: '科目二',
            children: []
          },
          {
            value: '3',
            label: '科目三',
            children: []
          }
        ],
        query: {
          page: 1,
          limit: 20,
          state: 1,
          condition: null,
          beginTime: null,
          endTime: null
        },
        pickerOptions: {
          shortcuts: [{
            text: '今天',
            onClick(picker) {
              const time = new Date(new Date().setHours(0, 0, 0, 0))
              picker.$emit('pick', [time, time])
            }
          }, {
            text: '明天',
            onClick(picker) {
              const time = new Date(new Date().setHours(0, 0, 0, 0))
              time.setTime(time.getTime() + 3600 * 1000 * 24 * 1)
              picker.$emit('pick', [time, time])
            }
          }]
        }
      }
    },
    created() {
      this.getPageList()
      this.getDateList()
      this.trainingField()
    },
    methods: {
      /* 获取数据 */
      getPageList() {
        this.loading = true
        getVehiclePeriodList(this.query).then(response => {
          this.list = response.data.data.list
          this.total = response.data.data.totalCount
          this.loading = false
          console.log(this.list)
        })
      },
      trainingField() {
        getTrainingField('dict_training_field2').then(response => {
          this.fieldAddressList[0].children = response.data.data
          console.log(response.data.data)
        })
        getTrainingField('dict_training_field3').then(response => {
          this.fieldAddressList[1].children = response.data.data
          console.log(response.data.data)
        })
      },
      typeChange(value) {
        if (value) {
          this.vehicle.serviceType = value[0] // 一人一车1 或者两人一车2
          this.vehicle.count = value[0] // 限制人数
          this.vehicle.timeList = this.timeMap[value[1]] // 课时集合
        }
      },
      fieldChange(value) {
        var iscoach = '16'
        if (value) {
          if (value[0] === '3') {
            iscoach = '32'
          }
          this.vehicle.subject = value[0] // 科目
          this.vehicle.fieldAddress = value[1] // 场地
        }
        queryCoachList({ iscoach: iscoach }).then(response => {
          this.userList = response.data.data
          console.log('userList', this.userList)
        })
      },
      getVehicleList() {
        queryCarList().then(response => {
          this.vehicleList = response.data.data
          console.log(this.vehicleList)
        })
      },
      save(formName) {
        this.saveLoading = true
        this.setCoachList()
        const set = this.$refs
        set[formName].validate(valid => {
          if (valid) {
            if (this.coachRules) {
              saveVehiclePeriod(this.vehicle).then(() => {
                this.cancel(formName)
                this.saveLoading = false
              })
            }
          } else {
            return false
          }
        })
      },
      setCoachList() {
        console.log(123)
        var list = []
        if (this.vehicle.coachList) {
          this.vehicle.coachList.forEach(function(coach) {
            if (coach.vehicleId && coach.coachList.length > 0) {
              list.push(coach)
            }
          })
        }
        if (list.length > 0) {
          this.coachRules.required = true
          this.coachRules.clazz = 'coach-ok'
          this.vehicle.coachList = list
        } else {
          this.coachRules.required = false
          this.coachRules.clazz = 'coach-error'
        }
      },
      createClick() {
        this.vehicle = {
          serviceType: null, // 类型 1一人一车  2两人一车
          count: 0, // 人数限制
          fieldAddress: null, // 场地
          subject: null, // 科目
          timeList: [], // 课时集合
          dateList: [], // 日期集合
          coachList: [{ coachList: [] }] // 教练车辆集合
        }
        this.getVehicleList()
        this.showList = false
      },
      /* 根据当前时间获取可发布课时日期 */
      getDateList() {
        this.dateList = []
        var date = new Date(new Date().setHours(0, 0, 0, 0))
        var now = new Date(new Date().setHours(0, 0, 0, 0))
        for (var i = 0; i < 7; i++) {
          date = now.setTime(now.getTime() + 3600 * 1000 * 24 * 1)
          this.dateList.push({
            label: parseTime(date, '{y}-{m}-{d}'),
            value: parseTime(date, '{y}-{m}-{d}')
          })
        }
      },
      deleteStu(student, pid) {
        this.$confirm('是否取消该学员约车?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          deleteVehiclePeriodStudent({ studentId: student.studentId, pid: pid }).then(response => {
            this.getPageList()
          })
        })
      },
      addCoach(cindex) {
        var coach = this.vehicle.coachList[cindex]
        if (coach.vehicleId && coach.coachList.length > 0) {
          this.vehicle.coachList.splice(cindex + 1, 0, {})
          this.coachHeight += 44
        }
      },
      cancel(formName) {
        this.$refs[formName].resetFields()
        this.coachRules = {
          required: true,
          clazz: ''
        }
        this.getPageList()
        this.showList = true
      },
      removeCoach(cindex) {
        if (this.vehicle.coachList.length > 1) {
          this.coachHeight -= 44
          this.vehicle.coachList.splice(cindex, 1)
        }
      },
      isSwitch(periodList) {
        var is = true
        periodList.forEach(function(val) {
          if (val.studentList && val.studentList.length > 0) {
            is = false
            return false
          }
        })
        return is
      },
      handleSizeChange(val) {
        this.query.limit = val
        this.getPageList()
      },
      handleCurrentChange(val) {
        this.query.page = val
        this.getPageList()
      },
      filterSubject(value, row) {
        return row.subject === value
      },
      filterState(value, row) {
        return row.state === value
      },
      vehicleDisabled(row) {
        disableVehicle(row)
      },
      periodDisabled(row) {
        disablePeriod(row)
      },
      searchClick() {
        this.query.page = 1
        this.query.condition = removeAllSpace(this.query.condition)
        this.getPageList()
      }
    }
  }
</script>
<style rel="stylesheet/scss" lang="scss" scoped>
  .demo-table-expand {
    font-size: 0;
  }
  .demo-table-expand label {
    width: 90px;
    color: #99a9bf;
  }
  .period-student:hover{
    text-decoration: line-through;
  }
  .add-coach-btn{
    font-size: 22px;
    color: #4CAF50;
  }
  .add-coach-btn:hover{
    cursor: pointer;
  }
  .remove-coach-btn{
    color: #E91E63;
    font-size: 22px;
    margin-left: 12px;
    line-height: 45px;
  }
  .remove-coach-btn:hover{
    cursor: pointer;
  }
  .coach-list{
    border: 1px dashed #ccc;
    padding: 15px;
  }
  .coach-error{
    border: 1px dashed #f56c6c;
  }
  .coach-ok{
    border: 1px dashed #67c23a;
  }
  .coach-error-msg{
    margin: 0;
    position: absolute;
    color: #f56c6c;
    line-height: 20px;
    font-size: 12px;
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
