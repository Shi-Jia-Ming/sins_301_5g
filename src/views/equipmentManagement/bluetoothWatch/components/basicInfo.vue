<!-- 详情-基本信息 -->
<template>
  <div>
    <div class="title">
      <!-- 图标 -->
      <i class="iconfont iconbianhaoxinxi"></i>
      <!-- 标题 -->
      <span>{{ title }}</span>
    </div>
    <div class="itemBox">
      <div class="item" :class=" basicData.heartRateStatus === 1 ? 'normal' : basicData.heartRateStatus === 2 ? 'warning' : basicData.heartRateStatus === 3 ? 'error' : 'normal' ">
        <div class="top">
          <div class="left">心率</div>
          <div class="right">
            {{ basicData.heartRateStatus === 1 ? '正常' : basicData.heartRateStatus === 2 ? '警告' : basicData.heartRateStatus === 3 ? '异常' : '正常' }}
          </div>
        </div>
        <div class="bot">
          <div class="left">
            {{ basicData.heartRate || 0 }}bpm
          </div>
          <div class="right">
            <img src="@/assets/icon_images/icon-xinlv.png" />
          </div>
        </div>
      </div>
      <div class="item" :class=" basicData.breatheStatus === 1 ? 'normal' : basicData.breatheStatus === 2 ? 'warning' : basicData.breatheStatus === 3 ? 'error' : 'normal' ">
        <div class="top">
          <div class="left">呼吸</div>
          <div class="right">
            {{ basicData.breatheStatus === 1 ? '正常' : basicData.breatheStatus === 2 ? '警告' : basicData.breatheStatus === 3 ? '异常' : '正常' }}
          </div>
        </div>
        <div class="bot">
          <div class="left">
            {{ basicData.breathe || 0 }}次
          </div>
          <div class="right">
            <img src="@/assets/icon_images/icon-huxi.png" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      default: '基本信息'
    },
    basicData: {
      type: Object,
      default: ()=> {}
    }
  }
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
  .warning{
    background-color: #ffffee;
    color: #ff8300;
  }
  .error{
    background-color: #ffeeee;
    color: #ff0000;
  }
}
</style>