<template>
  <div id="schedule_calendar">
    <el-event-calendar :events="demoEvents" :style="{ height: tableHeight -28+'px'}" @event-selected="eventSelected"></el-event-calendar>
  </div>
</template>

<script>
import ElEventCalendar from '@/components/Calendar'
import { queryAgency } from '@/api/activiti/agency'
import { getApp } from '@/router'
import { parseTime } from '@/utils/index'

export default {
  name: 'schedule',
  props: {
    area: Array
  },
  components: {
    ElEventCalendar
  },
  watch: {
    area: function(val) {
      this.tableHeight = val[1]
    }
  },
  data() {
    return {
      tableHeight: this.area[1],
      demoEvents: []
    }
  },
  created() {
    this.getAgency()
  },
  methods: {
    getAgency() {
      // 代办
      queryAgency({ type: '1', status: '0' }).then(response => {
        var demoEvents = []
        if (response.data.code === 0) {
          var list = response.data.data
          list.forEach(function(item) {
            demoEvents.push({
              date: parseTime(item.agencyTime, '{y}/{m}/{d}'), // agencyTime
              title: item.title, // title
              appId: item.appId || null,
              linkId: item.linkId || null, // linkId
              desc: item.message // message
            })
          })
        }
        this.demoEvents = demoEvents
      })
    },
    eventSelected(event) {
      if (event.appId) {
        var app = getApp(event.appId)
        if (app && event.linkId) {
          var open = {
            id: event.appId,
            title: event.title,
            content: app.content,
            icon: app.icon,
            params: {
              display: 'info',
              linkId: event.linkId
            }
          }
          this.layerOpen(open)
        }
      }
    },
    // 打开应用
    layerOpen(app) {
      this.$layer.open({
        type: 2,
        id: app.id + '_schedule', // title
        title: app.title, // title
        shadeClose: false, // 点击遮罩关闭
        prohibit: this.$store.state.app.prohibit,
        tabIcon: app.icon, // 应用图标 任务栏显示
        shade: false, // 遮罩 默认不显示
        content: {
          content: app.content,
          parent: this, // 当前的vue对象
          data: app.params || []// props
        }
      })
    }
  }
}
</script>
<style rel="stylesheet/scss" lang="scss" scoped>

</style>
