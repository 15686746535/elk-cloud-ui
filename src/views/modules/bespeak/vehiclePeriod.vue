<template>
  <div style="height: 100%">
    <el-card v-show="showList" style="height: 100%">
      <div class="filter-container" >
        <div style="height: 40px; float: left;margin-bottom: 20px">
          <el-radio-group @change="searchClick" v-model="query.subject">
            <el-radio-button :label="2">科目二</el-radio-button>
            <el-radio-button :label="3">科目三</el-radio-button>
          </el-radio-group>
        </div>
        <div style="height: 40px; float: right">

          <el-date-picker value-format="timestamp" v-model="interval" type="daterange" align="left" range-separator="-" start-placeholder="开始日期" end-placeholder="结束日期">
          </el-date-picker>

          <el-input @keyup.enter.native="searchClick" style="width: 200px;" placeholder="关键词" v-model="query.condition"></el-input>
          <el-button type="primary"  @click="searchClick">搜索</el-button>
        </div>
      </div>
      <!-- 表格 -->
      <el-table :data="list" v-loading="loading" :height="(tableHeight-195)" element-loading-text="给我一点时间" fit highlight-current-row style="width: 100%">
        <el-table-column type="expand">
          <template slot-scope="props">
            <el-row v-for="period in props.row.periodList" style="border-bottom: 1px dashed #ccc;margin-bottom: 12px">
              <el-col :span="8" >{{period.period}}</el-col>
              <el-col :span="4">{{period.number}}/{{period.count}}</el-col>
              <el-col :span="4">
                <el-switch v-if="period.studentList.length === 0" title="禁用、启用" v-model="period.state" @change="periodDisabled(period)"  active-value="0" inactive-value="1"></el-switch>
                <el-switch title="已有学员预约，不能修改" v-model="period.state" :disabled="true" active-value="0" inactive-value="1" v-else></el-switch>
              </el-col>
              <el-col :span="8">
                <span  v-for="(stu,i) in period.studentList">
                    <a href="javascript:void(0) " class="period-student" >{{stu.name}}</a>
                  <span v-if="i+1<period.studentList.length">、</span>
                </span>
                <span v-if="period.studentList.length === 0" >无人预约</span>
              </el-col>
            </el-row>
          </template>
        </el-table-column>
        <el-table-column type="index" label="序号"  align="center" width="50"></el-table-column>
        <el-table-column align="center" label="教练">
          <template slot-scope="scope">
            <span>{{scope.row.name}}</span>
          </template>
        </el-table-column>
        <el-table-column align="center" label="教练电话">
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
        <el-table-column align="center" label="日期" width="250">
          <template slot-scope="scope">
            <span>{{scope.row.trainDate | parseTime('{y}-{m}-{d}')}} </span>
          </template>
        </el-table-column>
        <el-table-column prop="state" align="center" label="状态" :filters="filters" :filter-method="filterTag" filter-placement="bottom-end">
          <template slot-scope="scope">
            <el-switch v-if="isSwitch(scope.row.periodList)" title="禁用、启用" v-model="scope.row.state" @change="vehicleDisabled(scope.row)" active-value="0" inactive-value="1"></el-switch>
            <el-switch title="已有学员预约，不能修改" v-model="scope.row.state" :disabled="true" v-else active-value="0" inactive-value="1"></el-switch>
          </template>
        </el-table-column>

       <!-- <el-table-column align="center" label="操作">
          <template slot-scope="scope">
            <el-button size="mini" type="primary" @click="updateClick(scope.row)"><i class="el-icon-edit"></i> 编 辑</el-button>
          </template>
        </el-table-column>-->

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

    <el-card v-show="!showList" style="height: 100%">
      <el-form :model="vehicle" :rules="vehicleRules"  ref="vehicle" label-position="left" label-width="100px">
        <el-row :gutter="20">
          <el-col>
            <el-form-item prop="serviceType">
              <span slot="label" class="text_css">类型</span>
              <el-select v-model="vehicle.serviceType" style="width: 100%" collapse-tags placeholder="请选择课时类型">
                <el-option
                  v-for="item in serviceTypeList"
                  :key="item.value"
                  :label="item.name"
                  :value="item.value">
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>

        <el-row :gutter="20">
          <el-col>
            <el-form-item prop="fieldAddress">
              <span slot="label" class="text_css">训练场地</span>
              <span v-show="query.subject === 2">
                    <dict v-model="vehicle.fieldAddress" dictType="dict_training_field2" placeholder="训练场地"></dict>
                  </span>

              <span v-show="query.subject === 3">
                    <dict v-model="vehicle.fieldAddress" dictType="dict_training_field3" placeholder="训练场地"></dict>
                  </span>
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
            <span slot="label" class="text_css">教练/车辆</span><!--height: 255px;-->
            <div style="border: 1px dashed #ccc;" :style="{height:tableHeight-306 + 'px' }">1212121</div>
          </el-form-item>
        </el-row>
        <el-row>
          <el-col :span="6" :offset="18">
            <el-button @click="showList = true"><i class="el-icon-fa-undo"></i> 取 消</el-button>
            <el-button type="primary" >修 改</el-button><!--@click="update('carPeriod')"-->
          </el-col>
        </el-row>
      </el-form>
    </el-card>
  </div>
</template>

<script>
  import { getVehiclePeriodList, disableVehicle, disablePeriod, addVehiclePeriod, deleteVehiclePeriodStudent } from '@/api/bespeak/vehicleperiod'
  import { queryVehicleList } from '@/api/vehicle/vehicle'
  import { removeAllSpace } from '@/utils/validate'
  import Coach from '@/components/Coach'
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
      Coach
    },
    data() {
      return {
        tableHeight: this.area[1],
        loading: false,
        showList: true,
        dateList: [],
        total: 0,
        filters: [
          { text: '启用', value: '0' },
          { text: '禁用', value: '1' }
        ],
        list: [],
        interval: [],
        serviceTypeList: [
          { name: '一人一车', value: 1, count: 1 },
          { name: '两人一车', value: 2, count: 2 }
        ],
        vehicle: {
          serviceType: 1, // 类型 1一人一车  2两人一车
          count: 1, // 人数限制
          fieldAddress: null, // 场地
          subject: null, // 科目
          dateList: [],
          coachList: [
            { coachId: -1, vehicleList: [] }
          ]
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
        query: {
          page: 1,
          limit: 20,
          state: 1,
          condition: null,
          beginTime: null,
          endTime: null,
          subject: 2
        }
      }
    },
    created() {
      this.getPageList()
      this.getDateList()
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
      /* 修改点击 */
      updateClick(row) {
        this.showList = false
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
      },
      createClick() {
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
      filterTag(value, row) {
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
  .text_css{
    color:#495060;
    font-size: 16px;
    word-break:keep-all;/* 不换行 */
    white-space:nowrap;/* 不换行 */
    overflow:hidden;/* 内容超出宽度时隐藏超出部分的内容 */
    text-overflow:ellipsis;/* 当对象内文本溢出时显示省略标记(...) ；需与overflow:hidden;一起使用。*/
  }
</style>
