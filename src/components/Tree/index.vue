<template>
  <ul id="tree" class="tree" style="padding: 0;">
    <template v-for="(model,index) in list">
      <leaf  :model="model" :recordList="recordList" @node-click="nodeClick" @node-checkbox="nodeCheckbox" :choiceType="choiceType"
             :id="id" clazz="tree_" :sort="index" :open="open" :listSize="list.length"></leaf>
    </template>
  </ul>
</template>

<script>
  import Leaf from '@/components/Tree/leaf'

  export default {
    name: 'tree',
    components: {
      Leaf
    },
    props: ['list', 'open', 'id', 'choiceType', 'recordList'],
    data() {
      return {
        node: null
      }
    },
    methods: {
      nodeCheckbox(val, isAdd) {
        this.$emit('node-checkbox', val, isAdd)
      },
      nodeClick(node) {
        this.$emit('node-click', node)
      }
    }
  }

</script>
<style scoped>
  .tree * {
    padding: 0!important;
    margin: 0;
    font-size: 14px;
    font-family: Verdana, Arial, Helvetica, AppleGothic, sans-serif;
  }

</style>
