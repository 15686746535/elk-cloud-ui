<template>
  <div class="app-container calendar-list-container" :style="{height: client.height + 'px'}">
    <el-card body-style="padding:10px 20px;" style="margin-bottom: 5px;height: 60px">
      <div class="filter-container">
        <div style="height: 40px; float: left">
          <el-radio-group @change="handleState" v-model="vehiclePeriodListQuery.state">
            <el-radio-button label="1">历史课时</el-radio-button>
            <el-radio-button label="2">当前课时</el-radio-button>
            <el-radio-button label="3">计划课时</el-radio-button>
          </el-radio-group>
        </div>
        <div style="float: right">
          <el-select :style="{width: (client.width/7) + 'px'}" v-model="vehiclePeriodListQuery.subject" class="filter-item" clearable placeholder="科目">
            <el-option
              v-for="item in subject"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
          <el-input @keyup.enter.native="searchClick" style="width: 200px;" class="filter-item" placeholder="关键词" v-model="vehiclePeriodListQuery.condition"></el-input>
          <el-button class="filter-item" type="primary" v-waves @click="searchClick">搜索</el-button>
        </div>
      </div>
    </el-card>
    <el-card :style="{height: (client.height - 105) + 'px'}">
        <el-table :data="vehiclePeriodList" v-loading="vehiclePeriodListLoading" :height="(client.height-195)" element-loading-text="给我一点时间" fit highlight-current-row style="width: 100%">
          <el-table-column type="expand">
            <template slot-scope="props">
              <el-form label-position="left" inline class="demo-table-expand">
                <el-form-item label="商品名称">
                </el-form-item>
                <el-form-item label="所属店铺">
                </el-form-item>
                <el-form-item label="商品 ID">
                </el-form-item>
                <el-form-item label="店铺 ID">
                </el-form-item>
                <el-form-item label="商品分类">
                </el-form-item>
                <el-form-item label="店铺地址">
                </el-form-item>
                <el-form-item label="商品描述">
                </el-form-item>
              </el-form>
            </template>
          </el-table-column>
          <el-table-column type="index" label="序号"  align="center" width="50"></el-table-column>
          <el-table-column align="center" label="教练">
            <template slot-scope="scope">
              <span>{{scope.row.coachId}}</span>
            </template>
          </el-table-column>
          <el-table-column align="center" label="身份证" width="170">
            <template slot-scope="scope">
              <span>{{scope.row.idNumber}}</span>
            </template>
          </el-table-column>
          <el-table-column align="center" label="电话">
            <template slot-scope="scope">
              <span>{{scope.row.phone}}</span>
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
          <el-table-column align="center" label="课时">
            <template slot-scope="scope">
              <span>{{scope.row.studyTime | subTime('time')}}</span>
            </template>
          </el-table-column>
          <el-table-column align="center" label="已约人数">
            <template slot-scope="scope">
              <span>{{scope.row.count}}</span>
            </template>
          </el-table-column>
          <el-table-column align="center" label="课时日期">
            <template slot-scope="scope">
              <span>{{scope.row.studyTime | subTime}}</span>
            </template>
          </el-table-column>
          <el-table-column align="center" label="状态">
            <template slot-scope="scope">
              <el-switch v-model="scope.row.state" active-value="0" inactive-value="1" @change="vehiclePeriodChange(scope.row)" active-color="#13ce66" inactive-color="#ff4949"></el-switch>
            </template>
          </el-table-column>

          <el-table-column align="center" label="操作">
            <template slot-scope="scope">
              <el-button size="mini" type="primary" @click="update(scope.row)"><i class="el-icon-edit"></i> 编 辑</el-button>
            </template>
          </el-table-column>

        </el-table>
        <div v-show="!vehiclePeriodListLoading" class="pagination-container" style="margin-top: 20px">
          <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange"
                         :current-page.sync="vehiclePeriodListQuery.page" background style="float: left"
                         :page-sizes="[10,20,30, 50]" :page-size="vehiclePeriodListQuery.limit"
                         layout="total, sizes, prev, pager, next, jumper" :total="total">
          </el-pagination>
          <el-button style="margin-top: -8px;float: right" @click="create" type="primary" ><i class="el-icon-plus"></i>添加</el-button>
        </div>
      <el-dialog  width="40%" title="录入意向" :visible.sync="addOption">

        <el-form :model="vehiclePeriod" label-position="left" label-width="80px">

          <el-row>

            <el-row>
              <el-col :span="12">
                <el-form-item prop="coach">
                  <span slot="label" class="text_css">教练：</span>
                  <span v-show="vehiclePeriodListQuery.subject === 2">
                    <Coach v-model="vehiclePeriod.fieldCoach" coachType="field" placeholder="场训教练"></Coach>
                  </span>

                  <span v-show="vehiclePeriodListQuery.subject === 3">
                    <Coach v-model="vehiclePeriod.roadCoach" coachType="road" placeholder="路训教练"></Coach>
                  </span>
                </el-form-item>
              </el-col>

              <el-col :span="12">
                <el-form-item prop="fieldAddress">
                  <span slot="label" class="text_css">场地：</span>
                  <span v-show="vehiclePeriodListQuery.subject === 2">
                    <Dict v-model="vehiclePeriod.fieldAddress" coachType="dict_training_field2" placeholder="训练场地"></Dict>
                  </span>

                  <span v-show="vehiclePeriodListQuery.subject === 3">
                    <Dict v-model="vehiclePeriod.fieldAddress" coachType="dict_training_field3" placeholder="训练场地"></Dict>
                  </span>
                </el-form-item>
              </el-col>
            </el-row>

            <el-row>
              <el-col :span="12">
                <el-form-item prop="idNumber">
                  <span slot="label" class="text_css">场地：</span>
                  <Dict v-model="vehiclePeriod.idNumber" coachType="dict_training_field2" placeholder="训练场地"></Dict>
                </el-form-item>
              </el-col>
              <el-col :span="12">

              </el-col>
            </el-row>

            <el-row>
              <el-col :span="12">

              </el-col>
              <el-col :span="12">

              </el-col>
            </el-row>

            <el-row>
              <el-col>
                <el-form-item prop="fieldAddress">
                  <span slot="label" class="text_css">课时：</span>
                  <el-time-select placeholder="起始时间" v-model="vehiclePeriod.beginTime" :picker-options="{ start: '07:00', step: '00:30', end: '20:30' }">
                  </el-time-select>
                  <el-time-select placeholder="结束时间" v-model="vehiclePeriod.endTime" :picker-options="{ start: '07:00', step: '00:30', end: '20:30', minTime: startTime }">
                  </el-time-select>
                </el-form-item>
              </el-col>
            </el-row>


          </el-row>

        </el-form>

        </el-dialog>
      </el-card>
  </div>
</template>

<script>
  import { getVehiclePeriodList, getVehiclePeriod, putVehiclePeriod } from '@/api/bespeak/vehicleperiod'
  import { removeAllSpace } from '@/utils/validate'
  import Coach from '@/components/Coach'
  import Dict from '@/components/Dict'
  import { mapGetters } from 'vuex'
  import waves from '@/directive/waves/index.js' // 水波纹指令

  export default {
    name: 'table_vehicleperiod',
    computed: {
      ...mapGetters([
        'permissions',
        'client'
      ])
    },
    components: {
      Coach,
      Dict
    },
    directives: {
      waves
    },
    data() {
      return {
        vehiclePeriod: {},
        vehiclePeriodList: [],
        total: null,
        vehiclePeriodListLoading: true,
        addOption: false,
        vehiclePeriodListQuery: {
          page: 1,
          limit: 20,
          state: 1,
          condition: null,
          subject: 2
        },
        subject: [
          {
            value: 2,
            label: '科目二'
          }, {
            value: 3,
            label: '科目三'
          }
        ]
      }
    },
    created() {
      this.getVehiclePeriodList()
    },
    methods: {
      getVehiclePeriodList() {
        this.vehiclePeriodListLoading = false
        getVehiclePeriodList(this.vehiclePeriodListQuery).then(response => {
          this.vehiclePeriodList = response.data.data.list
          console.log(this.vehiclePeriodList)
          this.total = response.data.data.totalCount
          this.vehiclePeriodListLoading = false
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
      create() {
        this.vehiclePeriod = {}
        this.addOption = true
      },
      update(row) {
        getVehiclePeriod(row.roleId)
          .then(response => {
            this.vehiclePeriod = response.data
          })
      },
      searchClick() {
        this.vehiclePeriodListQuery.page = 1
        this.vehiclePeriodListQuery.condition = removeAllSpace(this.vehiclePeriodListQuery.condition)
        this.getVehiclePeriodList()
      },
      handleState() {
        this.vehiclePeriodListQuery.page = 1
        this.getVehiclePeriodList()
      },
      /* 禁用启用开关 */
      vehiclePeriodChange(row) {
        this.vehiclePeriod = row
        if (this.vehiclePeriod.state === 1) {
          this.vehiclePeriod.state = 0
        } else if (this.vehiclePeriod.state === 0) {
          this.vehiclePeriod.state = 1
        }
        putVehiclePeriod(this.vehiclePeriod).then(() => {
          this.getVehiclePeriodList()
        })
      },
      asd() {
        console.log()
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
  .demo-table-expand .el-form-item {
    margin-right: 0;
    margin-bottom: 0;
    width: 50%;
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
