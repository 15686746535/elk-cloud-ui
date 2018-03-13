<template>
  <div class="app-container calendar-list-container" :style="{height: client.height + 'px'}">
    <el-card :style="{height: (client.height-45) + 'px'}">
    </el-card>
  </div>
</template>

<script>
  import { fetchList, getObj, addObj, putObj } from '@/api/student/student'
  import Dict from '@/components/Dict'
  import waves from '@/directive/waves/index.js' // 水波纹指令
  import { mapGetters } from 'vuex'
  export default {
    name: 'table_student',
    components: {
      Dict
    },
    directives: {
      waves
    },
    data() {
      return {
        student: {}
      }
    },
    created() {
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
      getDict(val) {
      },
      // 添加
      add() {
        addObj(this.student).then(response => {
        })
      },
      generateInfo() {
        if (this.student.idNumber.length === 18) {
          this.student.birthday = this.student.idNumber.substring(6, 10) + '-' + this.student.idNumber.substring(10, 12) + '-' + this.student.idNumber.substring(12, 14)
          this.student.sex = this.student.idNumber.substr(16, 1) % 2
        }
      }
    }
  }
</script>

<style>

  .img{
    width: 100px;
    height: 100px;
    padding: 0;
    border-radius: 150px;
    overflow: hidden;
  }

  .clearfix:before,
  .clearfix:after {
    display: table;
    content: "";
  }
  .clearfix:after {
    clear: both
  }
  .subject{
    width: 140px;
    height: 30px;
    display:block;
    margin: 10px auto;
    color: rgb(124,124,124);
    background: none;
    border: none;
    font-size: 14px;
  }
  .pass{
    width: 70px;
    height: 30px;
    border-radius: 10px;
    color: #fff;
    text-align: center;
    border: none;
    background-color: rgb(66,185,131);
  }
  .noPass{
    width: 70px;
    height: 30px;
    border-radius: 10px;
    color:#fff;
    border: none;
    text-align: center;
    background-color: rgb(177,177,177);
  }
  .cost{
    width: 140px;
    height: 30px;
    display:block;
    margin: 10px auto;
    text-align: left;
    color: rgb(124,124,124);
    background: none;
    border: none;
    font-size: 14px;
  }
  .image {
    max-width: 200px;
    max-height: 200px;
  }
.text_css{
  color:#495060;
  font-size: 18px;
  word-break:keep-all;/* 不换行 */
  white-space:nowrap;/* 不换行 */
  overflow:hidden;/* 内容超出宽度时隐藏超出部分的内容 */
  text-overflow:ellipsis;/* 当对象内文本溢出时显示省略标记(...) ；需与overflow:hidden;一起使用。*/
}

</style>
