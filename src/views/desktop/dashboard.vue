<template>
    <div class="dashboard" align="center">
      <dashboard-chart :data="plan"></dashboard-chart>
    </div>
</template>
<script>
import DashboardChart from '@/components/DashboardChart'
import { getPlan } from '@/api/upms/user'

export default {
  components: {
    DashboardChart
  },
  data() {
    return {
      edit: false,
      plan: {
        mine: { value: 0, name: '目标：0\n完成：0' },
        team: { value: 0, name: '目标：0\n完成：0' }
      }
    }
  },
  created() {
  },
  mounted() {
  },
  methods: {
    getPlan() {
      getPlan().then(response => {
        if (response.data.code === 0) {
          this.progress = response.data.data
        }
      })
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
@import "src/styles/mixin.scss";
.dashboard {
  position: fixed;
  width: 100%;
  height: 600px;
  bottom: -150px;
}
</style>
