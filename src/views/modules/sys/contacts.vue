<template>
    <div>
      {{parmas.token}}
      <el-button type="primary"  size="mini" @click="download"><i class="el-icon-search"></i>下载</el-button>
    </div>
</template>

<script>
  import request from '@/utils/request'
  import { getToken, setToken } from '@/utils/auth'
  export default {
    data() {
      return {
        parmas: {}
      }
    },
    mounted() {
      this.getParmas()
    },
    methods: {
      // 获取参数
      getParmas() {
        var url = location.search
        console.log(url)
        var parmas = {}
        if (url.indexOf('?') > -1) {
          var str = url.substr(1)
          var strs = str.split('&')
          for (var i = 0; i < strs.length; i++) {
            parmas[strs[i].split('=')[0]] = unescape(strs[i].split('=')[1])
          }
        }
        console.log(parmas)
        this.parmas = parmas
        setToken(parmas.token)
      },
      download() {
        request({
          url: '/app/coach/contacts/download',
          method: 'get',
          responseType: 'arraybuffer'
        }).then(response => {
          var time = new Date()
          var blob = new Blob([response.data], { type: 'application/x-xls;charset=utf-8' })
          var downloadElement = document.createElement('a')
          var href = window.URL.createObjectURL(blob) // 创建下载的链接
          downloadElement.href = href
          downloadElement.download = time.toLocaleString() + '.vcf' // 下载后文件名
          document.body.appendChild(downloadElement)
          downloadElement.click() // 点击下载
          document.body.removeChild(downloadElement) // 下载完成移除元素
          window.URL.revokeObjectURL(href) // 释放掉blob对象
        })
      }
    }
  }
</script>

<style scoped>
</style>
