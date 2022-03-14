<!-- 历史统计图 -->
<template>
  <div class="page_box">
    <div class="topContent">
      <div class="leftCon">
        <BasicInfo title="历史基本信息" :basicData="basicData" />
      </div>
      <div class="rightCon">
        <userInfo :userInfo="userInfo" />
      </div>
    </div>
    <div class="historyEcharts">
      <historyEcharts :echartsData="echartsData" :userId="userId" :equipmentId="equipmentId" />
    </div>
  </div>
</template>

<script>
import BasicInfo from './components/basicInfo.vue'
import userInfo from './components/userInfo.vue'
import historyEcharts from './components/historyEcharts.vue'
import request from '@/utils/request'

export default {
  components: {
    BasicInfo,
    userInfo,
    historyEcharts
  },
  data() {
    return {
      userId: null,
      equipmentId: null,
      // prop basicInfo data
      basicData: {},
      // prop echarts data
      echartsData: {},
      // prop userInfo data
      userInfo: {},
      // 轮循
      timer: null
    }
  },
  methods: {
    // 轮循方法
    timerBasicData(){
      this.getBasicData(this.userId, this.equipmentId).then(({data}) =>{
        this.basicData = data
      })
    },
    getBasicData(userId, equipmentId){
      const timestamp = Date.parse(new Date())
      return request({
        url: 'fiber/findChannelInfo',
        method: 'get',
        params: {
          userId,
          timestamp,
          equipmentId
        }
      })
    },
    getEchartsData(userId){
      const myDate = new Date()
      let timer = myDate.toISOString().substring(myDate.toISOString().indexOf('T'), -1)
      const timestamp = Date.parse(myDate)
      return request({
        url: 'fiber/findLineChart',
        method: 'post',
        data: {
          userId,
          startTime: timer,
          endTime: timer,
          timestamp
        }
      })
    },
    getUserInfo(userId, equipmentId){
      return request({
        url: 'fiber/findUserInfoAndEquipmentInfo',
        methods: 'get',
        params: {
          userId,
          equipmentId
        }
      })
    },
    allRequest(){
      const requestAll = [this.getBasicData(this.userId), this.getEchartsData(this.userId), this.getUserInfo(this.userId, this.equipmentId)]
      this.loading()
      Promise.all(requestAll).then(res=>{
        this.basicData = res[0].data
        this.echartsData = res[1].data
        this.userInfo = res[2].data.userInfo
      }).finally(_=>{
        this.closeLoading()
      })
    }
  },
  mounted(){
    if( this.$route.params !== {} ){
      this.userId = this.$route.params.userId
      this.equipmentId = this.$route.params.equipmentId
      this.allRequest()
      this.timer = setInterval(_ => {
        this.timerBasicData()
      }, 10000)
    }else{
      this.$message({
        type: 'warning',
        message: '无效参数'
      })
      this.$router.go(-1)
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
    .topContent{
      display: flex;
      justify-content: space-between;
      .rightCon{
        min-width: 25%;
      }
    }
    .historyEcharts{
      margin-top: 40px;
    }
  }
</style>