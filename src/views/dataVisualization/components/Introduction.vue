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
    height: 72px;
    background-image: url('~@/assets/icon_images/pic_shijian.png');
    background-size: contain;
    background-position: center;
    background-repeat: no-repeat;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 50px;
    font-size: 30px;
    font-weight: bold;
    color: #29d4ff;
  }
  .introduction{
    width: 100%;
    height: 245px;
    background-image: url('~@/assets/icon_images/pic_SYSbeijing.png');
    background-position: center;
    background-repeat: no-repeat;
    background-size: contain;
    display: flex;
    flex-flow: column;
    box-sizing: border-box;
    padding: 0 20px;
    .title{
      height: 30px;
      display: flex;
      align-items: center;
      font-size: 18px;
      font-weight: bold;
      color: #29d4ff;
    }
    .content{
      flex: 1;
      padding: 10px 0;
      overflow-y: auto;
      font-size: 16px;
      color: #29d4ff;
      line-height: 25px;
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

@media screen and (max-width: 1800px) {
  .box{
    .timeBox{
      height: 60px;
      font-size: 24px;
      background-size: 100% 100%;
      padding: 0 30px;
    }
    .introduction{
      margin-top: 5px;
      height: 210px;
      background-size: 100% 100%;
      padding: 0 10px;
      .title{
        height: 26px;
        font-size: 16px;
      }
      .content{
        padding: 5px 0;
        font-size: 13px;
        line-height: 20px;
      }
    }
  }
}
</style>