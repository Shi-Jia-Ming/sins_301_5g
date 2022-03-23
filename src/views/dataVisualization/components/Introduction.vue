<!-- 简介 -->
<template>
  <div class="box">
    <div class="timeBox">
      <div class="date">{{currentDate}}</div>
      <div class="time">{{timer}}</div>
    </div>
    <div class="introduction" v-loading="introductionLoading">
      <div class="title">
        实验室简介
      </div>
      <div class="content">
        <vueSeamlessScroll :data="content" :class-option="defaultOption">
          <div v-for="item in content" v-html="item">
            <!-- {{ item }} -->
          </div>
        </vueSeamlessScroll>
      </div>
    </div>
  </div>
</template>

<script>
import vueSeamlessScroll from "vue-seamless-scroll"

export default {
  components: {
    vueSeamlessScroll,
  },
  computed: {
    defaultOption() {
      return {
        step: 0.2, // 数值越大速度滚动越快
        limitMoveNum: 2, // 开始无缝滚动的数据量 this.dataList.length
        hoverStop: true, // 是否开启鼠标悬停stop
        direction: 1, // 0向下 1向上 2向左 3向右
        openWatch: true, // 开启数据实时监控刷新dom
        singleHeight: 0, // 单步运动停止的高度(默认值0是无缝不停止的滚动) direction => 0/1
        singleWidth: 0, // 单步运动停止的宽度(默认值0是无缝不停止的滚动) direction => 2/3
        waitTime: 1000, // 单步运动停止的时间(默认值1000ms)
      };
    },
    currentDate(){
      const myDate = new Date()
      let date = myDate.toISOString()
      date = date.substring(date.indexOf('T'), -1)
      return date
    }
  },
  props: {
    introductionLoading: {
      type: Boolean,
      default: false
    },
    content: {
      type: Array,
      default: ()=> []
    }
  },
  data() {
    return {
      timer: null
    }
  },
  methods: {
    currentTimer(){
      const myDate = new Date()
      this.timer = myDate.toLocaleTimeString()
      setInterval(()=>{
        const myDate = new Date()
        this.timer = myDate.toLocaleTimeString()
      },1000)
    }
  },
  mounted(){
    this.currentTimer()
  }
}
</script>

<style lang="scss" scoped>
.box{
  .timeBox{
    width: 100%;
    height: 3.75vw;
    background-image: url('~@/assets/icon_images/pic_shijian.png');
    background-size: contain;
    background-position: center;
    background-repeat: no-repeat;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 2.60416vw;
    font-size: 1.5625vw;
    font-weight: bold;
    color: #29d4ff;
  }
  .introduction{
    width: 100%;
    height: 12.76041vw;
    background-image: url('~@/assets/icon_images/pic_SYSbeijing.png');
    background-position: center;
    background-repeat: no-repeat;
    background-size: contain;
    display: flex;
    flex-flow: column;
    box-sizing: border-box;
    padding: 0 1.04166vw;
    .title{
      height: 1.5625vw;
      display: flex;
      align-items: center;
      font-size: 0.9375vw;
      font-weight: bold;
      color: #29d4ff;
    }
    .content{
      flex: 1;
      padding: 0.52083vw 0;
      overflow-y: auto;
      font-size: 0.83333vw;
      color: #29d4ff;
      line-height: 1.30208vw;
      text-indent: 2em;
      font-weight: bold;
      letter-spacing: 0.1em;
    }
  }
}
.box ::v-deep .el-loading-mask{
  background-color: unset;
  border-radius: 10px;
}
</style>