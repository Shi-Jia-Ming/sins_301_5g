<!-- 智能床垫 -->
<template>
  <div class="page_box">
    <Item :dataList="dataList" />
  </div>
</template>

<script>
import Item from "./components/item.vue";
import request from "@/utils/request";

export default {
  components: {
    Item,
  },
  data() {
    return {
      dataList: [],
    };
  },
  methods: {
    getListData() {
      this.loading()
      request({
        url: "mattress/findBaseInfo",
        method: "get"
      }).then(res => {
        this.dataList = res.data
        this.closeLoading()
      })
    },
  },
  mounted() {
    this.getListData();
  },
  beforeDestroy(){
    this.closeLoading()
  }
};
</script>

<style lang="scss" scoped>
</style>