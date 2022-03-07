<!-- 预警消息 -->
<template>
  <div class="box" v-loading="warnInfoLoading">
    <div class="title">
      <i class="iconfont iconyujing1"></i>
      <span>预警信息</span>
    </div>
    <div class="content">
      <div class="header">
        <div>日期</div>
        <div>姓名</div>
        <div>异常类别</div>
        <div>实时情况</div>
      </div>
      <div class="scrollContent">
        <vueSeamlessScroll :data="listData" :class-option="defaultOption">
          <div class="con">
            <div class="list" v-for="(item, index) in listData" :key="index">
              <div class="date">{{ item.time }}</div>
              <div class="name">{{ item.userName }}</div>
              <div class="category">{{ item.abnormalType }}</div>
              <div class="condition">{{ item.info }}</div>
            </div>
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
  },
  props: {
    listData: {
      type: Array,
      default: ()=> []
    },
    warnInfoLoading: {
      type: Boolean,
      default: false
    }
  }
}
</script>

<style lang="scss" scoped>
.box {
  width: 100%;
  height: 410px;
  background-image: url("~@/assets/icon_images/pic_XXYJbeijing.png");
  background-size: contain;
  background-repeat: no-repeat;
  background-position: center;
  padding: 0 30px;
  display: flex;
  justify-content: space-between;
  flex-flow: column;

  .title {
    display: flex;
    align-items: center;
    height: 45px;
    padding: 0 10px;
    i {
      font-size: 30px;
      font-weight: bold;
      color: #29d4ff;
    }
    span {
      color: #29d4ff;
      font-size: 24px;
      margin-left: 15px;
      font-weight: bold;
    }
  }
  .content {
    width: 100%;
    flex: 1;
    display: flex;
    flex-flow: column;
    justify-content: space-between;
    overflow: hidden;
    .header {
      display: flex;
      align-items: center;
      height: 46px;
      div {
        flex: 1;
        text-align: center;
        margin: 0 10px;
        color: #29d4ff;
        font-size: 20px;
        font-weight: bold;
      }
    }
    .scrollContent{
      flex: 1;
      overflow: hidden;
      padding: 10px;
      .con{
        width: 100%;
        height: 100%;
        .list{
          display: flex;
          height: 35px;
          align-items: center;
          justify-content: space-between;
          font-size: 18px;
          color: #29d4ff;
          div{
            flex: 1;
            text-align: center;
            margin: 0 10px;
          }
          .warning{
            color: #ff9d34;
          }
        }
      }
    }
  }
}
.box ::v-deep .el-loading-mask{
  background-color: unset;
  border-radius: 10px;
}
</style>