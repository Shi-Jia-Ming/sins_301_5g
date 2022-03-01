<!-- 详情-基本信息 -->
<template>
  <div>
    <div class="title">
      <i class="iconfont iconbianhaoxinxi"></i>
      <span>{{title}}</span>
    </div>
    <div class="itemBox">
      <div class="item normal">
        <div class="top">
          <div class="left">体温</div>
          <div class="right">正常</div>
        </div>
        <div class="bot">
          <div class="left">
            <span>38.5</span>°C
          </div>
          <div class="right">
            <img src="@/assets/icon_images/icon-wenduji.png" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import countTo from 'vue-count-to'
export default {
  components: {
    countTo
  },
  props: {
    title: {
      type: String,
      default: '基本信息'
    }
  },
  data() {
    return {}
  },
  mounted() {}
}
</script>

<style lang="scss" scoped>
.title {
  display: flex;
  align-items: center;
  i {
    font-size: 18px;
    margin-right: 10px;
  }
  span {
    font-size: 16px;
    font-weight: bold;
    color: #202234;
  }
}
.itemBox{
  display: flex;
  margin-top: 15px;
  .item{
    width: 240px;
    height: 120px;
    border-radius: 10px;
    margin-left: 25px;
    padding: 10px;
    display: flex;
    flex-flow: column;
    justify-content: space-between;
    &:first-child{
      margin-left: 0;
    }

    .top{
      display: flex;
      justify-content: space-between;
      align-items: center;
      .left{
        font-size: 20px;
      }
      .right{
        font-size: 16px;
      }
    }
    .bot{
      display: flex;
      justify-content: space-between;
      align-items: center;
      .left{
        font-size: 16px;
        font-weight: bold;
        span{
          font-size: 24px;
          margin-right: 3px;
        }
      }
      .right{
        img{
          width: 25px;
        }
      }
    }
  }
  .normal{
    background-color: #f1fcff;
    color: #00a399;
  }
  .error{
    background-color: #ffeeee;
    color: #ff0000;
  }
}
</style>