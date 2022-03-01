<!-- 简介 -->
<template>
  <div class="box">
    <div class="timeBox">
      <div class="date">{{currentDate}}</div>
      <div class="time">{{timer}}</div>
    </div>
    <div class="introduction">
      <div class="title">
        实验室简介
      </div>
      <div class="content">
        中国人民解放军总医院中国人民解放军总医院中国人民解放军总医院中国人民解放军总医院中国人民解放军总医院中国人民解放军总医院中国人民解放军总医院中国人民解放军总医院中国人民解放军总医院中国人民解放军总医院中国人民解放军总医院中国人民解放军总医院中国人民解放军总医院中国人民解放军总医院中国人民解放军总医院中国人民解放军总医院中国人民解放军总医院中国人民解放军总医院中国人民解放军总医院中国人民解放军总医院
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
    background-size: cover;
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
</style>