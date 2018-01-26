<template>
  <ul id="tree" class="tree">
    <template v-for="(model,index) in list">
      <leaf  :model="model" id="tree_"  :sort="index" :open="open" :extent="list.length"></leaf>
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
    props: ['list', 'open'],
    created() {
      // console.log(this.type)
    },
    methods: {
      emitChange(value) {
      }
    }
  }

</script>
<style scoped>
  .tree * {
    padding: 0;
    margin: 0;
    font-size: 14px;
    font-family: Verdana, Arial, Helvetica, AppleGothic, sans-serif;
  }

</style>
