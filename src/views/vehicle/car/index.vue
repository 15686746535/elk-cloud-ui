<template>
  <div>
    <el-card class="box-card1">
      <el-select v-model="value4" clearable placeholder="请选择车牌号">
        <el-option v-for="item in licence_plate" :key="item.value" :label="item.name" :value="item.id">
        </el-option>
      </el-select>
    </el-card>

  </div>
</template>

<script>
    export default {
      name: 'index',
      data() {
        return {
          licence_plate: [{
            id: '1',
            name: '渝B 123456'
          }, {
            id: '2',
            name: '渝B 123456'
          }, {
            id: '3',
            name: '渝B 123456'
          }, {
            id: '4',
            name: '渝B 123456'
          }, {
            id: '5',
            name: '渝B 123456'
          }],
          value4: ''
        }
      }
    }
</script>

<style scoped>
  .box-card1 {
    width: 80%;
    margin: 50px 0 0 50px;
  }
</style>
