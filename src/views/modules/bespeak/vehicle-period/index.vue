<template>
  <div class="app-container calendar-list-container" :style="{height: $store.state.app.client.height + 'px'}">
    <el-card body-style="padding:10px 20px;" style="margin-bottom: 5px;height: 60px">
      <div class="filter-container">
        <div style="height: 40px; float: left">
          <el-radio-group @change="searchClick" v-model="vehiclePeriodListQuery.subject">
            <el-radio-button :label="2">科目二</el-radio-button>
            <el-radio-button :label="3">科目三</el-radio-button>
          </el-radio-group>
        </div>
        <div style="height: 40px; float: right">

          <el-date-picker value-format="timestamp" v-model="vehiclePeriodListQuery.interval" type="daterange" align="left" range-separator="-" start-placeholder="开始日期" end-placeholder="结束日期">
          </el-date-picker>

          <el-input @keyup.enter.native="searchClick" style="width: 200px;" placeholder="关键词" v-model="vehiclePeriodListQuery.condition"></el-input>
          <!--<el-button class="filter-item" type="primary"  @click="getDateList">搜索</el-button>-->
          <el-button type="primary"  @click="searchClick">搜索</el-button>
        </div>
      </div>
    </el-card>
    <el-card :style="{height: ($store.state.app.client.height - 105) + 'px'}">
      <el-table :data="vehiclePeriodList" v-loading="vehiclePeriodListLoading" :height="($store.state.app.client.height-195)" element-loading-text="给我一点时间" fit highlight-current-row style="width: 100%">
        <el-table-column type="expand">
          <template slot-scope="props">
            <span style="margin-left: 5px;" v-for="student in props.row.studentList">
              <el-tag>
                {{student.name}}&nbsp;&nbsp;({{student.mobile}})
              </el-tag>
            </span>
          </template>
        </el-table-column>
        <el-table-column type="index" label="序号"  align="center" width="50"></el-table-column>
        <el-table-column align="center" label="教练">
          <template slot-scope="scope">
            <span>{{scope.row.name}}</span>
          </template>
        </el-table-column>
        <el-table-column align="center" label="身份证" width="170">
          <template slot-scope="scope">
            <span>{{scope.row.idNumber}}</span>
          </template>
        </el-table-column>
        <el-table-column align="center" label="电话">
          <template slot-scope="scope">
            <span>{{scope.row.mobile}}</span>
          </template>
        </el-table-column>
        <el-table-column align="center" label="科目">
          <template slot-scope="scope">
            <span>{{scope.row.subject  | subjectFilter}}</span>
          </template>
        </el-table-column>
        <el-table-column align="center" label="训练场地">
          <template slot-scope="scope">
            <span>{{scope.row.fieldAddress}}</span>
          </template>
        </el-table-column>
        <el-table-column align="center" label="课时" width="250">
          <template slot-scope="scope">
            <span>{{scope.row.beginTime | parseTime('{y}-{m}-{d} {h}:{i}')}} - {{scope.row.endTime | parseTime('{h}:{i}')}}</span>
          </template>
        </el-table-column>
        <el-table-column align="center" label="已约人数">
          <template slot-scope="scope">
            <span>{{scope.row.studentList.length}}/{{scope.row.count}} 人</span>
          </template>
        </el-table-column>
        <el-table-column align="center" label="状态">
          <template slot-scope="scope">
            <el-switch v-model="scope.row.state" active-value="0" inactive-value="1" @change="vehiclePeriodChange(scope.row)" active-color="#13ce66" inactive-color="#ff4949"></el-switch>
          </template>
        </el-table-column>

        <el-table-column align="center" label="操作">
          <template slot-scope="scope">
            <el-button size="mini" type="primary" @click="updateClick(scope.row)"><i class="el-icon-edit"></i> 编 辑</el-button>
          </template>
        </el-table-column>

      </el-table>
      <div v-show="!vehiclePeriodListLoading" class="pagination-container" style="margin-top: 20px">
        <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange"
                       :current-page.sync="vehiclePeriodListQuery.page" background style="float: left"
                       :page-sizes="[10,20,30, 50]" :page-size="vehiclePeriodListQuery.limit"
                       layout="total, sizes, prev, pager, next, jumper" :total="total">
        </el-pagination>
        <el-button style="margin-top: -8px;float: right" @click="createClick" type="primary" ><i class="el-icon-plus"></i>添加</el-button>
      </div>
      <el-dialog @close="cancel('carPeriod')" width="700px" title="编辑课时" :visible.sync="editOption">

        <el-form :model="carPeriod" :rules="carPeriodRules"  ref="carPeriod" label-position="left" label-width="100px">

          <el-row>
            <el-row :gutter="20">
              <el-col :span="12">
                <el-form-item prop="coachId">
                  <span slot="label" class="text_css">教学教练</span>
                  <span v-show="vehiclePeriodListQuery.subject === 2">
                    <Coach v-model="carPeriod.coachId" coachType="field" placeholder="场训教练"></Coach>
                  </span>

                  <span v-show="vehiclePeriodListQuery.subject === 3">
                    <Coach v-model="carPeriod.coachId" coachType="road" placeholder="路训教练"></Coach>
                  </span>
                </el-form-item>
              </el-col>

              <el-col :span="12">
                <el-form-item prop="count">
                  <span slot="label" class="text_css">人数上限</span>
                  <el-input type="number" v-model.number="carPeriod.count" placeholder="人数上限"></el-input>
                </el-form-item>
              </el-col>
            </el-row>

            <el-row :gutter="20">
              <el-col>
                <el-form-item prop="fieldAddress">
                  <span slot="label" class="text_css">训练场地</span>
                  <span v-show="vehiclePeriodListQuery.subject === 2">
                    <dict v-model="carPeriod.fieldAddress" dictType="dict_training_field2" placeholder="训练场地"></dict>
                  </span>

                  <span v-show="vehiclePeriodListQuery.subject === 3">
                    <dict v-model="carPeriod.fieldAddress" dictType="dict_training_field3" placeholder="训练场地"></dict>
                  </span>
                </el-form-item>
              </el-col>
            </el-row>


            <el-row>
              <el-form-item required>
                <span slot="label" class="text_css">学习课时</span>
                <el-date-picker
                  v-model="carPeriod.interval"
                  value-format="timestamp"
                  type="datetimerange"
                  align="left"
                  range-separator="—"
                  start-placeholder="开始日期"
                  end-placeholder="结束日期">
                </el-date-picker>
                <!--<el-date-picker value-format="timestamp" style="width: 100%;" v-model="carPeriod.interval" type="datetimerange" align="left" unlink-panels range-separator="—" start-placeholder="开始日期" end-placeholder="结束日期">-->
                <!--</el-date-picker>-->
              </el-form-item>
            </el-row>

            <el-row>
              <el-form-item prop="vehicleId">
                <span slot="label" class="text_css">训练车辆</span>
                <el-select v-model="carPeriod.vehicleId" style="width: 100%" collapse-tags placeholder="请选择训练车辆">
                  <el-option
                    v-for="item in vehicleList"
                    :key="item.vehicleId"
                    :label="item.plateNumber"
                    :value="item.vehicleId">
                  </el-option>
                </el-select>
              </el-form-item>
            </el-row>

          </el-row>

        </el-form>


        <div slot="footer">
          <el-button @click="editOption = false"><i class="el-icon-fa-undo"></i> 取 消</el-button>
          <el-button type="primary" @click="update('carPeriod')">修 改</el-button>
        </div>
      </el-dialog>
      <el-dialog  @close="cancel('vehiclePeriod')" width="700px" title="录入课时" :visible.sync="addOption">

        <el-form :model="vehiclePeriod" :rules="vehiclePeriodRules"  ref="vehiclePeriod" label-position="left" label-width="100px">

          <el-row>
            <el-row :gutter="20">
              <el-col :span="12">
                <el-form-item prop="coachId">
                  <span slot="label" class="text_css">教学教练</span>
                  <span v-show="vehiclePeriodListQuery.subject === 2">
                    <Coach v-model="vehiclePeriod.coachId" coachType="field" placeholder="场训教练"></Coach>
                  </span>

                  <span v-show="vehiclePeriodListQuery.subject === 3">
                    <Coach v-model="vehiclePeriod.coachId" coachType="road" placeholder="路训教练"></Coach>
                  </span>
                </el-form-item>
              </el-col>

              <el-col :span="12">
                <el-form-item prop="count">
                  <span slot="label" class="text_css">人数上限</span>
                  <el-input type="number" v-model.number="vehiclePeriod.count" placeholder="人数上限"></el-input>
                </el-form-item>
              </el-col>
            </el-row>

            <el-row :gutter="20">
              <el-col>
                <el-form-item prop="fieldAddress">
                  <span slot="label" class="text_css">训练场地</span>
                  <span v-show="vehiclePeriodListQuery.subject === 2">
                    <dict v-model="vehiclePeriod.fieldAddress" dictType="dict_training_field2" placeholder="训练场地"></dict>
                  </span>

                  <span v-show="vehiclePeriodListQuery.subject === 3">
                    <dict v-model="vehiclePeriod.fieldAddress" dictType="dict_training_field3" placeholder="训练场地"></dict>
                  </span>
                </el-form-item>
              </el-col>
            </el-row>


            <el-row>
              <el-form-item required>
                <span slot="label" class="text_css">学习课时</span>
                <el-row :gutter="2">
                  <el-col :span="11">
                    <el-form-item prop="beginTime">
                      <el-time-select style="width: 100%;" placeholder="起始时间" v-model="vehiclePeriod.beginTime" :picker-options="{ start: '07:00', step: '00:30', end: '20:30' }">
                      </el-time-select>
                    </el-form-item>
                  </el-col>
                  <el-col :span="12">
                    <el-form-item prop="endTime">
                      <el-time-select style="width: 100%;" placeholder="结束时间" v-model="vehiclePeriod.endTime" :picker-options="{ start: '07:00', step: '00:30', end: '20:30', minTime: vehiclePeriod.beginTime }">
                      </el-time-select>
                    </el-form-item>
                  </el-col>
                </el-row>
              </el-form-item>
            </el-row>
            <el-row>
              <el-form-item prop="dateList">
                <span slot="label" class="text_css">培训日期</span>
                <el-select v-model="vehiclePeriod.dateList" style="width: 100%" multiple collapse-tags placeholder="请选择培训日期">
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
              <el-form-item prop="vehicleList">
                <span slot="label" class="text_css">训练车辆</span>
                <el-select v-model="vehiclePeriod.vehicleList" style="width: 100%" multiple collapse-tags placeholder="请选择训练车辆">
                  <el-option
                    v-for="item in vehicleList"
                    :key="item.vehicleId"
                    :label="item.plateNumber"
                    :value="item.vehicleId">
                  </el-option>
                </el-select>
              </el-form-item>
            </el-row>

          </el-row>

        </el-form>
        <div slot="footer">
          <el-button @click="addOption = false"><i class="el-icon-fa-undo"></i> 取 消</el-button>
          <el-button type="primary" :loading="loading"  @click="create('vehiclePeriod')">确 定</el-button>
        </div>
      </el-dialog>
    </el-card>
  </div>
</template>

<script>
  import { getVehiclePeriodList, getVehiclePeriod, putVehiclePeriod, addVehiclePeriod } from '@/api/bespeak/vehicleperiod'
  import { queryVehicleList } from '@/api/vehicle/vehicle'
  import { removeAllSpace } from '@/utils/validate'
  import Coach from '@/components/Coach'
  import { mapGetters } from 'vuex'
  import { parseTime } from '@/utils/index'

  export default {
    name: 'table_vehicle_period',
    computed: {
      ...mapGetters([
        'permissions',
        'client'
      ])
    },
    components: {
      Coach
    },
    data() {
      return {
        vehiclePeriod: {
          coachId: null,
          count: null,
          fieldAddress: null,
          beginTime: null,
          endTime: null,
          subject: null,
          dateList: [],
          vehicleList: []
        },
        carPeriod: {
          interval: [],
          periodId: null,
          coachId: null,
          count: null,
          fieldAddress: null,
          beginTime: null,
          endTime: null,
          subject: null,
          vehicleId: null
        },
        vehicleList: [],
        vehiclePeriodList: [],
        dateList: [],
        total: null,
        vehiclePeriodListLoading: true,
        addOption: false,
        editOption: false,
        loading: false,
        vehiclePeriodListQuery: {
          page: 1,
          limit: 20,
          state: 1,
          condition: null,
          subject: 2,
          interval: []
        },
        vehiclePeriodRules: {
          coachId: [
            { required: true, message: '请选择教练', trigger: ['blur', 'change'] }
          ],
          count: [
            { required: true, message: '请输入上限', trigger: ['blur', 'change'] }
          ],
          fieldAddress: [
            { required: true, message: '请选择场地', trigger: ['blur', 'change'] }
          ],
          beginTime: [
            { required: true, message: '请选择开始时间', trigger: ['blur', 'change'] }
          ],
          endTime: [
            { required: true, message: '请选择结束时间', trigger: ['blur', 'change'] }
          ],
          dateList: [
            { required: true, message: '请选择培训日期', trigger: ['blur', 'change'] }
          ],
          vehicleList: [
            { required: true, message: '请选择培训车辆', trigger: ['blur', 'change'] }
          ]
        },
        carPeriodRules: {
          coachId: [
            { required: true, message: '请选择教练', trigger: ['blur', 'change'] }
          ],
          count: [
            { required: true, message: '请输入上限', trigger: ['blur', 'change'] }
          ],
          fieldAddress: [
            { required: true, message: '请选择场地', trigger: ['blur', 'change'] }
          ],
          vehicleId: [
            { required: true, message: '请选择培训车辆', trigger: ['blur', 'change'] }
          ]
        }
      }
    },
    created() {
      this.getVehiclePeriodList()
    },
    methods: {
      /* 获取数据 */
      getVehiclePeriodList() {
        this.vehiclePeriodListLoading = true
        getVehiclePeriodList(this.vehiclePeriodListQuery).then(response => {
          this.vehiclePeriodList = response.data.data.list
          console.log('============================')
          console.log(this.vehiclePeriodList)
          this.total = response.data.data.totalCount
          this.vehiclePeriodListLoading = false
          this.getDateList()
          this.getVehicleList()
        })
      },
      /* 获取车辆数据 */
      getVehicleList() {
        queryVehicleList().then(response => {
          console.log(response.data)
          this.vehicleList = response.data.list
        })
      },
      handleSizeChange(val) {
        this.vehiclePeriodListQuery.limit = val
        this.getVehiclePeriodList()
      },
      handleCurrentChange(val) {
        this.vehiclePeriodListQuery.page = val
        this.getVehiclePeriodList()
      },
      /* 添加点击 */
      createClick() {
        this.vehiclePeriod = {
          coachId: null,
          count: null,
          fieldAddress: null,
          beginTime: null,
          endTime: null,
          subject: null,
          dateList: [],
          vehicleList: []
        }
        this.addOption = true
      },
      /* 添加操作 */
      create(formName) {
        console.log(this.vehiclePeriod)
        const set = this.$refs
        this.vehiclePeriod.subject = this.vehiclePeriodListQuery.subject
        set[formName].validate(valid => {
          if (valid) {
            this.loading = true
            addVehiclePeriod(this.vehiclePeriod)
              .then(() => {
                this.addOption = false
                this.loading = false
                this.getVehiclePeriodList()
              })
          } else {
            return false
          }
        })
      },
      /* 取消操作 */
      cancel(formName) {
        this.addOption = false
        this.editOption = false
        console.log('--------------------------------------------------')
        const set = this.$refs
        set[formName].resetFields()
        this.getVehiclePeriodList()
      },
      /* 修改点击 */
      updateClick(row) {
        this.editOption = true
        this.carPeriod = {
          interval: [row.beginTime, row.endTime],
          periodId: row.periodId,
          coachId: row.coachId,
          count: row.count,
          fieldAddress: row.fieldAddress,
          beginTime: row.beginTime,
          endTime: row.endTime,
          subject: row.subject,
          vehicleId: row.vehicleId
        }
        console.log('===-=-=-=-=-=-=-')
        console.log(this.carPeriod)
      },
      /* 修改操作 */
      update(formName) {
        const set = this.$refs
        set[formName].validate(valid => {
          if (valid) {
            this.intervalTime()
            putVehiclePeriod(this.carPeriod).then(() => {
              this.editOption = false
              this.getVehiclePeriodList()
            })
          } else {
            return false
          }
        })
      },
      intervalTime() {
        if (this.carPeriod.interval === null) {
          this.carPeriod.interval = []
          this.carPeriod.beginTime = null
          this.carPeriod.endTime = null
        }
        if (this.carPeriod.interval.length !== 0) {
          this.carPeriod.beginTime = this.carPeriod.interval[0]
          this.carPeriod.endTime = this.carPeriod.interval[1]
        }
      },
      /* 搜索 */
      searchClick() {
        this.vehiclePeriodListQuery.page = 1
        this.vehiclePeriodListQuery.condition = removeAllSpace(this.vehiclePeriodListQuery.condition)
        this.examTimeBlur()
        this.getVehiclePeriodList()
      },
      /* 禁用启用开关 */
      vehiclePeriodChange(row) {
        this.vehiclePeriod = row
        putVehiclePeriod(this.vehiclePeriod).then(() => {
          this.getVehiclePeriodList()
        })
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
        console.log(this.dateList)
      },
      /* 时间段分解 */
      examTimeBlur() {
        if (this.vehiclePeriodListQuery.interval === null) {
          this.vehiclePeriodListQuery.interval = []
          this.vehiclePeriodListQuery.beginTime = null
          this.vehiclePeriodListQuery.endTime = null
        }
        if (this.vehiclePeriodListQuery.interval.length !== 0) {
          this.vehiclePeriodListQuery.beginTime = this.vehiclePeriodListQuery.interval[0]
          this.vehiclePeriodListQuery.endTime = this.vehiclePeriodListQuery.interval[1]
        }
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
  .text_css{
    color:#495060;
    font-size: 16px;
    word-break:keep-all;/* 不换行 */
    white-space:nowrap;/* 不换行 */
    overflow:hidden;/* 内容超出宽度时隐藏超出部分的内容 */
    text-overflow:ellipsis;/* 当对象内文本溢出时显示省略标记(...) ；需与overflow:hidden;一起使用。*/
  }
</style>
