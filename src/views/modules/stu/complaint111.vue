<!--<template>-->
  <!--<div class="${pathName}">-->
    <!--<el-card style="height: 100%" v-show="showModule=='list'">-->
      <!--<el-input @keyup.enter.native="search" style="width: 200px;" class="filter-item" placeholder="职位名字" v-model="listQuery.condition"></el-input>-->
      <!--<el-button class="filter-item" type="primary"  icon="el-icon-search" style="margin-bottom: 15px" @click="search">搜索</el-button>-->
      <!--<el-table :key='0'  :height="tableHeight-220" :data="list" v-loading="listLoading" :stripe="true" :fit="false" element-loading-text="给我一点时间" border fit highlight-current-row style="width: 100%" >-->
        <!--<el-table-column type="index" label="序号"  align="center" width="50"></el-table-column>-->
<!--#foreach($column in $columns)-->
<!--#if($column.columnName != $pk.columnName)-->
        <!--<el-table-column label="${column.comments}">-->
          <!--<template slot-scope="scope">-->
            <!--<span>{{scope.row.$column.attrname}}</span>-->
          <!--</template>-->
        <!--</el-table-column>-->
<!--#end-->
<!--#end-->
        <!--<el-table-column  align="center" label="操作" width="250">-->
          <!--<template slot-scope="scope">-->
            <!--<el-button size="mini" type="success" @click="info(scope.row)">编辑</el-button>-->
          <!--</template>-->
        <!--</el-table-column>-->
      <!--</el-table>-->
      <!--<div v-show="!listLoading" class="pagination-container">-->
        <!--<el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange"-->
                       <!--:current-page.sync="listQuery.page"-->
                       <!--:page-sizes="[10,20,30, 50]" :page-size="listQuery.limit"-->
                       <!--layout="total, sizes, prev, pager, next, jumper" :total="total">-->
        <!--</el-pagination>-->
      <!--</div>-->
    <!--</el-card>-->

    <!--<el-card v-show="showModule=='info'">-->
      <!--<el-row>-->
        <!--<el-card style="margin-bottom: 5px;height: 100%;" body-style="padding:10px 20px">-->
          <!--<div style="float: left;height: 40px;line-height: 40px;">-->
            <!--|&nbsp;<span style="font-size: 18px;color:rgb(145,145,145)">详细信息</span>-->
          <!--</div>-->
          <!--<div style="float: right">-->
            <!--<el-button type="primary" style="float: right;margin-top: 10px;margin-right: 10px;" @click="back">返回</el-button>-->
          <!--</div>-->

        <!--</el-card>-->
      <!--</el-row>-->

      <!--<div class="dialog-footer">-->
        <!--<el-button @click="cancel">取 消</el-button>-->
        <!--<el-button v-if="dialogStatus=='create'" type="primary" @click="create">确 定</el-button>-->
        <!--<el-button v-else type="primary" @click="save">修 改</el-button>-->
      <!--</div>-->
    <!--</el-card>-->
  <!--</div>-->
<!--</template>-->

<!--<script>-->
<!--import { fetchList, getObj } from '@/api/complaint'-->
<!--import waves from '@/directive/waves/index.js' // 水波纹指令-->

<!--export default {-->
  <!--name: 'table_${pathName}',-->
  <!--directives: {-->
    <!--waves-->
  <!--},-->
  <!--props: {-->
    <!--area: Array-->
  <!--},-->
  <!--watch: {-->
    <!--area: function(val) {-->
      <!--this.tableHeight = val[1]-->
    <!--}-->
  <!--},-->
  <!--data() {-->
    <!--return {-->
      <!--// ${pathName}: {},-->
      <!--tableHeight: this.area[1],-->
      <!--list: [],-->
      <!--total: null,-->
      <!--listLoading: true,-->
      <!--edit: false,-->
      <!--showModule: 'list',-->
      <!--listQuery: {-->
        <!--page: 1,-->
        <!--limit: 20,-->
        <!--condition: null-->
      <!--}-->
    <!--}-->
  <!--},-->
  <!--created() {-->
    <!--this.getList()-->
  <!--},-->
  <!--methods: {-->
    <!--// 获取数据集合-->
    <!--getList() {-->
      <!--this.listLoading = true-->
      <!--fetchList(this.listQuery).then(response => {-->
        <!--this.list = response.data.data.list-->
        <!--this.total = response.data.data.totalCount-->
        <!--this.listLoading = false-->
      <!--})-->
    <!--},-->
    <!--// 点击添加按钮-->
    <!--create() {-->
      <!--this.${pathName} = {}-->
      <!--this.showModule = 'info'-->
    <!--},-->
    <!--// 点击查看详情-->
    <!--info(row) {-->
      <!--// 这里id需要改-->
      <!--getObj(row.id).then(response => {-->
        <!--this.${pathName} = response.data-->
        <!--this.showModule = 'info'-->
      <!--})-->
    <!--},-->
    <!--save() {-->

    <!--},-->
    <!--// 点击搜索按钮-->
    <!--search() {-->
      <!--this.listQuery.page = 1-->
      <!--this.getList()-->
    <!--},-->
    <!--// 点击删除按钮-->
    <!--delete(id) {-->
      <!--this.getList()-->
    <!--},-->
    <!--// 取消编辑-->
    <!--cancel() {-->
      <!--this.edit = false-->
      <!--this.info(row)-->
    <!--},-->
    <!--// 返回-->
    <!--back() {-->
      <!--this.showModule = 'list'-->
      <!--this.edit = false-->
      <!--this.getList()-->
    <!--},-->
    <!--// 分页尺寸改变-->
    <!--handleSizeChange(val) {-->
      <!--this.listQuery.limit = val-->
      <!--this.getList()-->
    <!--},-->
    <!--// 翻页-->
    <!--handleCurrentChange(val) {-->
      <!--this.listQuery.page = val-->
      <!--this.getList()-->
    <!--}-->
  <!--}-->
<!--}-->
<!--</script>-->
