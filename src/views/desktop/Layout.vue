<template>
  <div class="app-container calendar-list-container" :style="{height: $store.state.app.client.height + 'px'}">
    <a href="#/stu/student" @click="studentOpen('学员管理')">学员管理</a>
    <el-dialog @close="dialog_show = false" :title="title" width="800px" :visible.sync="dialog_show">
        <student></student>
    </el-dialog>
  </div>
</template>

<script>
import student from '@/views/modules/stu/student'

export default {
  name: 'layout',
  components: {
    student
  },
  data() {
    return {
      title: '测试',
      dialog_show: false
    }
  },
  methods: {
    studentOpen(title) {
      this.$layer.open({
        type: 2,
        title: title, // title
        maxmin: true,
        area: ['1024px', '600px'], // 宽 高
        shadeClose: false, // 点击遮罩关闭
        shade: false, // 遮罩 默认不显示
        content: {
          content: student,
          parent: this, // 当前的vue对象
          data: [] // props
        }
      })
    }
  },
  computed: {
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
@import "src/styles/mixin.scss";
.app-wrapper {
  @include clearfix;
  position: relative;
  height: 100%;
  width: 100%;
}
</style>
