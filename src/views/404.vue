<template>
  <div style="padding-top: 150px;height: 100%;" align="center">
    <img style="margin-top: 50px"  src="../../static/img/ku_100.png"/>
    <p style="color: #2d8df9">{{msg}}</p>
  </div>
</template>
<script>
  export default {
    name: 'defect',
    directives: {
    },
    data() {
      return {
        msg: '功能下线···'
      }
    },
    created() {
    },
    methods: {
    }
  }
</script>
