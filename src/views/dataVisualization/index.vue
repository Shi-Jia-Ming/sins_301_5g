<!-- 数据大屏 -->
<template>
  <div id="dataV" :style="{width: width + 'px', height: height + 'px'}">
  <!-- <dv-full-screen-container id="dataV"> -->
    <div class="header">
      <HeaderContent />
    </div>
    <div class="content">
      <div class="leftCon">
        <Item :propData="mattress" :itemLoading="itemLoading" title="高灵敏度婴儿生命体征监测仪" />
        <Item :propData="arm" :itemLoading="itemLoading" title="便携式臂环体温心率设备" />
        <Item :propData="fiber" :itemLoading="itemLoading" title="高精度多通道温度监测系统" />
      </div>
      <div class="centerCon">
        <bigImg />
        <warningInfo :warnInfoLoading="warnInfoLoading" :listData="listData" />
      </div>
      <div class="rightCon">
        <Introduction :introductionLoading="introductionLoading" :content="content" />
        <Item :propData="pump" :itemLoading="itemLoading" title="便携式输液装置" />
        <Item :propData="ear" :itemLoading="itemLoading" title="耳挂式生命体征监测仪" />
      </div>
    </div>
  <!-- </dv-full-screen-container> -->
  </div>
</template>

<script>
import HeaderContent from './components/header.vue'
import Item from './components/item.vue'
import Introduction from './components/Introduction.vue'
import bigImg from './components/bigImg.vue'
import warningInfo from './components/warningInfo.vue'
import request from '@/utils/request'

export default {
  components: {
    HeaderContent,
    Item,
    Introduction,
    bigImg,
    warningInfo
  },
  data(){
    return {
      // item
      arm: {},
      ear: {},
      fiber: {},
      mattress: {},
      pump: {},
      itemLoading: false,
      // Introduction
      introductionLoading: false,
      content: [],
      // warningInfo
      warnInfoLoading: false,
      listData: [],
      // 轮循
      timer: null,
      width: 0,
      height: 0
    }
  },
  methods: {
    getItemData(timestamp){
      this.itemLoading = false
      return request({
        url: 'equipment/dataScreen',
        method: 'get',
        params: {
          timestamp
        }
      })
    },
    getContext(){
      this.introductionLoading = false
      return request({
        url: 'equipment/findContext',
        method: 'get'
      })
    },
    getAbnormalData(timestamp){
      this.warnInfoLoading = false
      return request({
        url: 'equipment/findAbnormalData',
        method: 'get',
        params: {
          timestamp
        }
      })
    },
    allRequest(){
      const timestamp = Date.parse(new Date())
      const requestArr = [this.getItemData(timestamp), this.getContext(), this.getAbnormalData(timestamp)]
      Promise.all(requestArr).then(res=>{
        const { arm, ear, fiber, mattress, pump } = res[0]
        this.itemLoading = false
        this.arm = arm
        this.ear = ear
        this.fiber = fiber
        this.mattress = mattress
        this.pump = pump

        this.introductionLoading = false
        // this.content = res[1].data
        this.content = []
        for(let i = 0; i < 3; i++){
          this.content.push(res[1].data)
        }

        this.warnInfoLoading = false
        this.listData = res[2].data
      })
    },
    // 获取屏幕分辨率
    getResolution(){
      // const width = window.screen.width
      const width = document.body.offsetWidth
      const height = window.screen.height
      // const height = document.body.offsetHeight
      this.width = width
      this.height = height
    }
  },
  mounted(){
    this.allRequest()
    this.timer = setInterval(_=>{
      this.allRequest()
    }, 3000)
    // 监听屏幕变化
    window.onresize = ()=> {
      this.getResolution()
    }
  },
  created(){
    this.getResolution()
  },
  beforeDestroy(){
    if( this.timer ){
      clearInterval(this.timer)
    }
  }
}
</script>

<style lang="scss" scoped>
#dataV{
  background-image: radial-gradient(#243a9b, #10183e);
  // width: 100vw;
  // height: 100vh;
  display: flex;
  flex-flow: column;
  padding: 1.82291vw 2.60416vw 0.26041vw;
  // transform: scale(1) !important;
  .header{
    height: 3.95833vw;
    width: 100%;
  }
  .content{
    flex: 1;
    margin-top: 0.52083vw;
    display: flex;
    justify-content: space-between;
    .leftCon,.rightCon{
      width: 26.4%;
      display: flex;
      flex-flow: column;
      justify-content: space-between;
    }
    .centerCon{
      width: 44.5%;
      display: flex;
      justify-content: space-between;
      flex-flow: column;
    }
  }
}
</style>