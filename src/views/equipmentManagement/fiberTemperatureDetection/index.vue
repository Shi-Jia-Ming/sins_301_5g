<!-- 光纤测温 -->
<template>
  <div class="page_box">
    <Item :dataList="dataList" />
  </div>
</template>

<script>
import Item from "./components/item.vue"
import request from '@/utils/request'

export default {
  components: {
    Item
  },
  data() {
    return {
      dataList: []
    }
  },
  methods: {
    getItemData(){
      this.loading()
      request({
        url: 'fiber/findBaseInfo',
        method: 'get'
      }).then(res=>{
        this.dataList = res.data
      }).finally(_=>{
        this.closeLoading()
      })
    }
  },
  mounted(){
    this.getItemData()
  }
}
</script>

<style lang="scss" scoped>

</style>
