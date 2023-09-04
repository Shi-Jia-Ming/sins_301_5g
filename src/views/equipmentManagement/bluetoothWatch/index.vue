<!-- 蓝牙手表设备管理界面 -->
<template>
  <div class="page_box">
    <div style="height: 30px">设备数量：{{ dataList.length }}</div>
    <div style="height: 30px">异常设备数量：{{ dataList.length }}</div>
    <el-radio-group v-model="radio" style="height: 30px">
      <!-- TODO -->
      <el-radio :label="3">全部</el-radio>
      <el-radio :label="6">离线设备</el-radio>
      <el-radio :label="9">在线设备</el-radio>
    </el-radio-group>
    <!-- 输入框 -->
    <el-input style="margin-bottom: 20px" v-model="input" placeholder="请输入需要搜索的设备编号"></el-input>
    <!-- 设备列表 -->
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
      timer: null,
      radio: 3
    }
  },
  methods: {
    getItemData(){
      // 获取时间戳
      const timestamp = Date.parse(new Date())
      this.loading_s()
      request({
        url: 'mattress/findBaseInfo',
        method: 'get',
        params: {
          timestamp
        }
      }).then(({data})=>{
        this.dataList = [{breathe: null,
            equipmentCode: "1",
            equipmentId: 1,
            heartRate: null,
            inBedStatus: null,
            mattressStatus: null,
            respiratoryRate: null,
            shake: null,
            status: 0,
            stopBreatheSign: null,
            userId: 1,
            userName: "testuser"},{breathe: null,
            equipmentCode: "2",
            equipmentId: 1,
            heartRate: null,
            inBedStatus: null,
            mattressStatus: null,
            respiratoryRate: null,
            shake: null,
            status: 0,
            stopBreatheSign: null,
            userId: 1,
            userName: "testuser"},{breathe: null,
            equipmentCode: "3",
            equipmentId: 1,
            heartRate: null,
            inBedStatus: null,
            mattressStatus: null,
            respiratoryRate: null,
            shake: null,
            status: 0,
            stopBreatheSign: null,
            userId: 1,
            userName: "testuser"},{breathe: null,
            equipmentCode: "4",
            equipmentId: 1,
            heartRate: null,
            inBedStatus: null,
            mattressStatus: null,
            respiratoryRate: null,
            shake: null,
            status: 0,
            stopBreatheSign: null,
            userId: 1,
            userName: "testuser"}]
      }).finally(_=>{
        this.closeLoading()
      })
    }
  },
  mounted(){
    // 在页面开始挂载的时候向后端请求数据
    this.getItemData()
    this.timer = setInterval(_ => {
      this.getItemData()
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