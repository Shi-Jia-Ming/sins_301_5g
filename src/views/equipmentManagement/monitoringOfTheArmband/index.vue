<!-- 监测臂环 -->
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
      dataList: [],
      timer: null
    }
  },
  methods: {
    getItemData(){
      // 获取时间戳
      const timestamp = Date.parse(new Date())
      this.loading()
      request({
        url: 'arm/findBaseInfo',
        method: 'get',
        params: {
          timestamp
        }
      }).then(({data})=>{
        this.dataList = data
      }).finally(_=>{
        this.closeLoading()
      })
    }
  },
  mounted(){
    this.getItemData()
    this.timer = setInterval(_ => {
      this.getItemData(false)
    }, 10000)
  },
  beforeDestroy() {
    this.closeLoading()
    if( this.timer ){
      clearInterval(this.timer)
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
