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
        {{ content }}
      </div>
    </div>
  </div>
</template>

<script>
export default {
  computed: {
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
      type: String,
      default: ''
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