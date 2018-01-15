<template>
  <div class="app-container calendar-list-container">
    <div v-show="showModule=='list'">
      <el-card style="margin-bottom: 5px;">
        <div slot="header" class="clearfix">
          |&nbsp;<span style="font-weight: 600">筛选</span>
          <!--<el-button style="float: right; padding: 3px 0" type="text">操作按钮</el-button>-->
        </div>
        <div class="filter-container">
          <el-form ref="list" :model="list" inline label-width="80px">
            <el-form-item label="车牌">
              <el-select v-model="list.plateNumber" placeholder="请选择车牌">
                <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="负责人">
              <el-select v-model="list.plateNumber" placeholder="请选择负责人">
                <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="车辆来源">
              <el-select v-model="list.plateNumber" placeholder="请选择车辆来源">
                <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
                </el-option>
              </el-select>
            </el-form-item>
            <el-input @keyup.enter.native="handleFilter" style="width: 200px;" class="filter-item" placeholder="关键词" v-model="listQuery.roleName"></el-input>

            <el-button class="filter-item" type="primary" v-waves icon="search" @click="search">搜索</el-button>
            <el-button class="filter-item" style="margin-left: 10px;" @click="create" type="primary" icon="create">添加</el-button>
          </el-form>
        </div>
      </el-card>
      <el-card>
        <div slot="header" class="clearfix">
          |&nbsp;<span style="font-weight: 600">车辆信息</span>
        </div>
        <div style="width: 100%">
          <div class="tab_title" style="width: 3%;">编号</div>
          <div class="tab_title" style="width: 25%;">基本信息</div>
          <div class="tab_title" style="width: 15%;">证件信息</div>
          <div class="tab_title" style="width: 20%;">技术信息</div>
          <div class="tab_title" style="width: 20%;">安全信息</div>
        </div>
        <!-- 身份卡循环 -->
        <div class="car_table" v-for="list in list"  v-loading="listLoading" element-loading-text="给我一点时间" >
          <div class="user_info">
            <!-- 编号 -->
            <div  class="user" style="width: 3%; padding: 0;line-height: 150px;text-align: center">
              {{list.motorcycleType}}
            </div>

            <!-- 基本信息 -->
            <div class="user" style="width: 25%;">
              <img :src="list.photo" class="img">  <!-- 头像 -->
              <div style="float: left;width: 200px;height: 20px ">
                <p style="color: #99a9bf;width: 100px;float: left;margin-top: 10px">车辆牌照：</p><p style="float: left">{{list.plateNumber}}</p>
              </div>
              <div style="float: left;width: 200px;height: 20px;margin-top: 10px">
                <p style="color: #99a9bf;width: 100px;float: left">使用责任人：</p><p style="float: left">{{list.userId}}</p>
              </div>
              <div style="float: left;width: 200px;height: 20px ;margin-top: 10px">
                <p style="color: #99a9bf;width: 100px;float: left">所属机构：</p><p style="float: left">{{list.orgId}}</p>
              </div>
              <div style="float: left;width: 200px;height: 20px  ;margin-top: 10px">
                <p style="color: #99a9bf;width: 100px;float: left">车辆状态：</p><p style="float: left">{{list.vehicleState}}</p>
              </div>
            </div>
            <!-- 证件信息 -->
            <div class="user" style="width: 15%;">
              <div style="float: left;width: 200px;height: 20px ">
                <p style="color: #99a9bf;width: 100px;float: left;margin-top: 10px">车辆牌照：</p><p style="float: left">{{list.plateNumber}}</p>
              </div>
              <div style="float: left;width: 200px;height: 20px;margin-top: 10px">
                <p style="color: #99a9bf;width: 100px;float: left">使用责任人：</p><p style="float: left">{{list.userId}}</p>
              </div>
              <div style="float: left;width: 200px;height: 20px ;margin-top: 10px">
                <p style="color: #99a9bf;width: 100px;float: left">所属机构：</p><p style="float: left">{{list.orgId}}</p>
              </div>
              <div style="float: left;width: 200px;height: 20px  ;margin-top: 10px">
                <p style="color: #99a9bf;width: 100px;float: left">车辆状态：</p><p style="float: left">{{list.vehicleState}}</p>
              </div>
            </div>
            <!-- 技术信息 -->
            <div class="user" style="width: 20%;">
              <div style="float: left;width: 200px;height: 20px ">
                <p style="color: #99a9bf;width: 100px;float: left;margin-top: 10px">车辆牌照：</p><p style="float: left">{{list.plateNumber}}</p>
              </div>
              <div style="float: left;width: 200px;height: 20px;margin-top: 10px">
                <p style="color: #99a9bf;width: 100px;float: left">使用责任人：</p><p style="float: left">{{list.userId}}</p>
              </div>
              <div style="float: left;width: 200px;height: 20px ;margin-top: 10px">
                <p style="color: #99a9bf;width: 100px;float: left">所属机构：</p><p style="float: left">{{list.orgId}}</p>
              </div>
              <div style="float: left;width: 200px;height: 20px  ;margin-top: 10px">
                <p style="color: #99a9bf;width: 100px;float: left">车辆状态：</p><p style="float: left">{{list.vehicleState}}</p>
              </div>
            </div>
            <!-- 安全信息 -->
            <div class="user" style="width: 20%;">
              <div style="float: left;width: 200px;height: 20px ">
                <p style="color: #99a9bf;width: 100px;float: left;margin-top: 10px">车辆牌照：</p><p style="float: left">{{list.plateNumber}}</p>
              </div>
              <div style="float: left;width: 200px;height: 20px;margin-top: 10px">
                <p style="color: #99a9bf;width: 100px;float: left">使用责任人：</p><p style="float: left">{{list.userId}}</p>
              </div>
              <div style="float: left;width: 200px;height: 20px ;margin-top: 10px">
                <p style="color: #99a9bf;width: 100px;float: left">所属机构：</p><p style="float: left">{{list.orgId}}</p>
              </div>
              <div style="float: left;width: 200px;height: 20px  ;margin-top: 10px">
                <p style="color: #99a9bf;width: 100px;float: left">车辆状态：</p><p style="float: left">{{list.vehicleState}}</p>
              </div>
            </div>
          </div>

        </div>
        <!--<el-table :key='tableKey' :data="list" v-loading="listLoading" element-loading-text="给我一点时间" border fit
                  highlight-current-row style="width: 100%">
          <el-table-column type="selection" class="selection" align="center" prop='uuid'></el-table-column>
          <el-table-column type="index" label="序号"  align="center" width="50"></el-table-column>
          <el-table-column label="负责人ID">
            <template slot-scope="scope">
              <span>{{scope.row.userId}}</span>
            </template>
          </el-table-column>
          <el-table-column label="组织ID">
            <template slot-scope="scope">
              <span>{{scope.row.orgId}}</span>
            </template>
          </el-table-column>
          <el-table-column label="型号(车辆品牌)">
            <template slot-scope="scope">
              <span>{{scope.row.motorcycleType}}</span>
            </template>
          </el-table-column>
          <el-table-column label="车辆状态">
            <template slot-scope="scope">
              <span>{{scope.row.vehicleState}}</span>
            </template>
          </el-table-column>
          <el-table-column label="自编号">
            <template slot-scope="scope">
              <span>{{scope.row.number}}</span>
            </template>
          </el-table-column>
          <el-table-column label="所属机构">
            <template slot-scope="scope">
              <span>{{scope.row.affiliation}}</span>
            </template>
          </el-table-column>
          <el-table-column label="教练车学牌">
            <template slot-scope="scope">
              <span>{{scope.row.plateNumber}}</span>
            </template>
          </el-table-column>
          <el-table-column label="原车辆牌照">
            <template slot-scope="scope">
              <span>{{scope.row.oldPlateNumber}}</span>
            </template>
          </el-table-column>
          <el-table-column label="发动机号">
            <template slot-scope="scope">
              <span>{{scope.row.engineNo}}</span>
            </template>
          </el-table-column>
          <el-table-column label="车架号">
            <template slot-scope="scope">
              <span>{{scope.row.vinNo}}</span>
            </template>
          </el-table-column>
          <el-table-column label="车身颜色">
            <template slot-scope="scope">
              <span>{{scope.row.carColor}}</span>
            </template>
          </el-table-column>
          <el-table-column label="车牌颜色">
            <template slot-scope="scope">
              <span>{{scope.row.plateColor}}</span>
            </template>
          </el-table-column>
          <el-table-column label="出厂时间">
            <template slot-scope="scope">
              <span>{{scope.row.factoryTime}}</span>
            </template>
          </el-table-column>
          <el-table-column label="注册登记日期">
            <template slot-scope="scope">
              <span>{{scope.row.registerTime}}</span>
            </template>
          </el-table-column>
          <el-table-column label="车辆类别(如:教练车,公交...)">
            <template slot-scope="scope">
              <span>{{scope.row.vehicleType}}</span>
            </template>
          </el-table-column>
          <el-table-column label="核定载客人">
            <template slot-scope="scope">
              <span>{{scope.row.allowNumber}}</span>
            </template>
          </el-table-column>
          <el-table-column label="燃料类别 ">
            <template slot-scope="scope">
              <span>{{scope.row.fuelType}}</span>
            </template>
          </el-table-column>
          <el-table-column label="技术等级">
            <template slot-scope="scope">
              <span>{{scope.row.technicalLevel}}</span>
            </template>
          </el-table-column>
          <el-table-column label="厂牌">
            <template slot-scope="scope">
              <span>{{scope.row.brand}}</span>
            </template>
          </el-table-column>
          <el-table-column label="备注">
            <template slot-scope="scope">
              <span>{{scope.row.remark}}</span>
            </template>
          </el-table-column>
          <el-table-column label="操作人">
            <template slot-scope="scope">
              <span>{{scope.row.operator}}</span>
            </template>
          </el-table-column>
          <el-table-column label="创建时间/通过时间">
            <template slot-scope="scope">
              <span>{{scope.row.createTime}}</span>
            </template>
          </el-table-column>
          <el-table-column label="更新时间/回访时间">
            <template slot-scope="scope">
              <span>{{scope.row.updateTime}}</span>
            </template>
          </el-table-column>

          <el-table-column label="操作">
            <template slot-scope="scope">
              <el-button size="mini" type="success"
                         @click="update(scope.row)">编辑
              </el-button>
              <el-button size="mini" type="danger"
                         @click="delete(scope.row)">删除
              </el-button>
            </template>
          </el-table-column>

        </el-table>-->
        <div v-show="!listLoading" class="pagination-container">
          <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange"
                         :current-page.sync="listQuery.page"
                         :page-sizes="[10,20,30, 50]" :page-size="listQuery.limit"
                         layout="total, sizes, prev, pager, next, jumper" :total="total">
          </el-pagination>
        </div>
      </el-card>
    </div>
    <div v-show="showModule=='info'">
      <el-card>
        <!-- 这里手写 -->

        <div class="dialog-footer">
          <el-button @click="cancel">取 消</el-button>
          <el-button v-if="dialogStatus=='create'" type="primary" @click="create">确 定</el-button>
          <el-button v-else type="primary" @click="update">修 改</el-button>
        </div>
      </el-card>
    </div>
  </div>
</template>

<script>
  import { fetchList, getObj } from '@/api/vehicle/vehicle'
  import waves from '@/directive/waves/index.js' // 水波纹指令

  export default {
    name: 'table_vehicle',
    directives: {
      waves
    },
    data() {
      return {
        vehicle: {},
        list: [
          {
            motorcycleType: 1,
            photo: 1,
            plateNumber: 1,
            userId: 1,
            orgId: 1,
            vehicleState: 1
          },
          {
            motorcycleType: 1,
            photo: 1,
            plateNumber: 1,
            userId: 1,
            orgId: 1,
            vehicleState: 1
          }
        ],
        total: null,
        listLoading: true,
        showModule: 'list',
        listQuery: {
          page: 1,
          limit: 20
        }
      }
    },
    created() {
      this.getList()
    },
    methods: {
      getList() {
        this.listLoading = false
        fetchList(this.listQuery).then(response => {
          this.list = response.data.data.list
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
      create() {
        this.vehicle = {}
        this.showModule = 'info'
      },
      update(row) {
        getObj(row.roleId)
          .then(response => {
            this.vehicle = response.data
            this.showModule = 'info'
          })
      },
      search() {
        this.listQuery.page = 1
        this.getList()
      },
      delete(id) {
        this.getList()
      },
      cancel() {
        this.showModule = 'list'
      }
    }
  }
</script>
<style scoped>

  .car_table{
    width: 98%;
    height: 170px;
    clear: both;
    background-color: #f7f7f7;
    margin: 10px 0 0 10px;
  }
  .tab_title{
    float: left;
    text-align: left;
    height: 30px;
    margin: 10px 0 0 10px;
  }

  .user_info{
    float: left;
    width: 100%;
    height: 150px;
    margin: 10px 0 0 10px;
  }
  .img{
    width: 150px;
    height: 150px;
    float: left;
    margin-right:10px;
  }
  .user{
    float: left;
    height: 150px;
  }
</style>
