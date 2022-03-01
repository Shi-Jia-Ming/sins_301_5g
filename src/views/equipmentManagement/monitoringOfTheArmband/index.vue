<!-- 监测臂环 -->
<template>
  <div class="page_box">
    <Item :dataList="dataList" />
  </div>
</template>

<script>
import Item from "./components/item.vue";
export default {
  components: {
    Item
  },
  data() {
    return {
      dataList: [1, 2, 3, 4, 5, 6]
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
