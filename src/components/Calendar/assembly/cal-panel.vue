<template>
  <div class="cal-wrapper">
    <div class="cal-header">
      <div class="year l" ><div class="arrow-left el-icon-d-arrow-left" @click="preYear">&nbsp;</div></div>
      <div class="month l"><div class="arrow-left el-icon-arrow-left" @click="preMonth">&nbsp;</div></div>
      <div class="title">{{curYearMonth}}</div>
      <div class="month r" ><div class="arrow-right el-icon-arrow-right" @click="nextMonth">&nbsp;</div></div>
      <div class="year r" ><div class="arrow-right el-icon-d-arrow-right" @click="nextYear">&nbsp;</div></div>
    </div>
    <div class="cal-body">
      <div class="weeks">
        <span
          v-for="(dayName, dayIndex) in i18n[calendar.options.locale].dayNames"
          class="item"
          :key="dayIndex"
          >
          {{i18n[calendar.options.locale].dayNames[(dayIndex + calendar.options.weekStartOn) % 7]}}
        </span>
      </div>
      <div class="dates" >
        <div v-for="date in dayList" class="item"
          :class="[{
            today: date.status ? (today == date.date) : false,
            event: date.status ? (date.title != undefined) : false,
            [calendar.options.className] : (date.date == selectedDay)
          }, ...date.customClass]"
          :key="date.date" >
          <p class="date-num"
            @click="handleChangeCurday(date)"
            :style="{color: date.title != undefined ? ((date.date == selectedDay) ? '#fff' : customColor) : 'inherit'}">
            {{date.status ? (date.date || '').split('/')[2] : '&nbsp;'}}</p>
          <span v-if="date.status ? (today == date.date) : false" class="is-today" :style="{backgroundColor: customColor }" ></span>
          <span v-if="date.status ? (date.title != undefined) : false" class="is-event"
            :style="{borderColor: customColor, backgroundColor: (date.date == selectedDay) ? customColor : 'inherit'}"></span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import i18n from '../i18n.js'
import { dateTimeFormatter, isEqualDateStr } from '../tools.js'

export default {
  name: 'cal-panel',
  data() {
    return {
      i18n
    }
  },
  props: {
    events: {
      type: Array,
      required: true
    },
    calendar: {
      type: Object,
      required: true
    },
    selectedDay: {
      type: String,
      required: false
    }
  },
  created() {
    this.curTime()
  },
  computed: {
    dayList() {
      var firstDay = new Date(this.calendar.params.curYear, this.calendar.params.curMonth, 1)
      let dayOfWeek = firstDay.getDay()
      // 根据当前日期计算偏移量 // Calculate the offset based on the current date
      if (this.calendar.options.weekStartOn > dayOfWeek) {
        dayOfWeek = dayOfWeek - this.calendar.options.weekStartOn + 7
      } else {
        dayOfWeek = dayOfWeek - this.calendar.options.weekStartOn
      }

      var startDate = new Date(firstDay)
      startDate.setDate(firstDay.getDate() - dayOfWeek)
      var item
      var status
      var tempArr = []
      var tempItem
      for (let i = 0; i < 42; i++) {
        item = new Date(startDate)
        item.setDate(startDate.getDate() + i)

        if (this.calendar.params.curMonth === item.getMonth()) {
          status = 1
        } else {
          status = 0
        }
        tempItem = {
          date: `${item.getFullYear()}/${item.getMonth() + 1}/${item.getDate()}`,
          status: status,
          customClass: []
        }
        this.events.forEach((event) => {
          if (isEqualDateStr(event.date, tempItem.date)) {
            tempItem.title = event.title
            tempItem.desc = event.desc || ''
            if (event.customClass) tempItem.customClass.push(event.customClass)
          }
        })
        tempArr.push(tempItem)
      }
      return tempArr
    },
    today() {
      var dateObj = new Date()
      return `${dateObj.getFullYear()}/${dateObj.getMonth() + 1}/${dateObj.getDate()}`
    },
    curYearMonth() {
      var tempDate = Date.parse(new Date(`${this.calendar.params.curYear}/${this.calendar.params.curMonth + 1}/01`))
      return dateTimeFormatter(tempDate, this.i18n[this.calendar.options.locale].format)
    },
    customColor() {
      return this.calendar.options.color
    }
  },
  methods: {
    curTime() {
      this.$EventCalendar.toDate('all')
      this.$emit('month-changed', this.curYearMonth)
    },
    preYear() {
      var year = this.curYearMonth.substring(0, 4)
      var month = this.curYearMonth.substring(5, 7)
      var time = (parseInt(year) - 1) + '/' + month + '/01'
      this.$EventCalendar.toDate(time)
      this.$emit('month-changed', this.curYearMonth)
    },
    nextYear() {
      var year = this.curYearMonth.substring(0, 4)
      var month = this.curYearMonth.substring(5, 7)
      var time = (parseInt(year) + 1) + '/' + month + '/01'
      this.$EventCalendar.toDate(time)
      this.$emit('month-changed', this.curYearMonth)
    },
    nextMonth() {
      this.$EventCalendar.nextMonth()
      this.$emit('month-changed', this.curYearMonth)
    },
    preMonth() {
      this.$EventCalendar.preMonth()
      this.$emit('month-changed', this.curYearMonth)
    },
    handleChangeCurday(date) {
      if (date.status) {
        this.$emit('cur-day-changed', date.date)
      }
    }
  }
}
</script>
