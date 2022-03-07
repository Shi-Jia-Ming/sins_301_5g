<!-- 详情 -->
<template>
  <div class="page_box">
    <div class="leftCon">
      <!-- 基本信息 -->
      <div class="info">
        <BasicInfo :basicData="basicData" />
      </div>
      <!-- 统计图 -->
      <div class="summaryGraph">
        <SummaryGraph :echartsData="echartsData" :userId="userId" :equipmentId="equipmentId" />
      </div>
    </div>
    <div class="rightCon">
      <OtherInfo :equipmentInfo="equipmentInfo" :userInfo="userInfo" />
    </div>
  </div>
</template>

<script>
import BasicInfo from './components/basicInfo.vue'
import SummaryGraph from './components/summaryGraph.vue'
import OtherInfo from './components/otherInfo.vue'
import request from '@/utils/request'

export default {
  components: {
    BasicInfo,
    SummaryGraph,
    OtherInfo
  },
  data() {
    return {
      userId: null,
      equipmentId: null,
      userInfo: {},
      equipmentInfo: {},
      // prop echarts data
      echartsData: {},
      // prop basicInfo data
      basicData: {},
      // 轮循
      timer: null
    }
  },
  methods: {
    getDetailData(userId, equipmentId){
      return request({
        url: 'infusionPump/findUserInfoAndEquipmentInfo',
        methods: 'get',
        params: {
          userId,
          equipmentId
        }
      })
    },
    getEchartsData(userId){
      const myDate = new Date()
      let timer = myDate.toISOString().substring(myDate.toISOString().indexOf('T'), -1)
      const timestamp = Date.parse(myDate)
      return request({
        url: 'infusionPump/findLineChart',
        method: 'post',
        data: {
          userId,
          startTime: timer,
          endTime: timer,
          timestamp
        }
      })
    },
    getBasicData(userId){
      const timestamp = Date.parse(new Date())
      return request({
        url: 'infusionPump/findDetails',
        method: 'get',
        params: {
          userId,
          timestamp
        }
      })
    },
    allRequest(){
      const requestAll = [this.getDetailData(this.userId, this.equipmentId), this.getEchartsData(this.userId), this.getBasicData(this.userId)]
      this.loading()
      Promise.all(requestAll).then(res=>{
        this.userInfo = res[0].data.userInfo
        this.equipmentInfo = res[0].data.equipmentInfo
        this.echartsData = res[1].data
        this.basicData = res[2].data
      }).finally(_=>{
        this.closeLoading()
      })
    }
  },
  mounted(){
    this.userId = this.$route.params.userId
    this.equipmentId = this.$route.params.equipmentId
    // 判断是否带参数进入页面
    if( !this.userId || !this.equipmentId ){
      this.$message({
        type: 'warning',
        message: '无效参数'
      })
      this.$router.go(-1)
    }else{
      this.allRequest()
      this.timer = setInterval(_ => {
        this.allRequest()
      }, 10000);
    }
  },
  beforeDestroy(){
    this.closeLoading()
    if( this.timer ){
      clearInterval(this.timer)
    }
  }
}
</script>

<style lang="scss" scoped>
  .page_box{
    justify-content: space-between;
    display: flex;
    .leftCon{
      flex: 0.63;
      .summaryGraph{
        margin-top: 30px;
      }
    }
    .rightCon{
      flex: 0.3;
    }
  }
</style>