<!-- 详情-基本信息 -->
<template>
  <div>
    <div class="title">
      <i class="iconfont iconbianhaoxinxi"></i>
      <span>{{title}}</span>
    </div>
    <div class="itemBox">
      <div class="item normal">
        <div class="leftCon">
          <div class="top">
            <div class="icon">
              <i class="iconfont iconshuyederen"></i>
            </div>
            <div class="name">XXXXXX床位</div>
          </div>
          <div class="bot">
            <div class="module">
              <div class="module_title">
                总量
              </div>
              <div class="module_val">
                <countTo :startVal='0' :endVal='500' :duration='3000' />ML/
                <countTo :startVal='0' :endVal='264' :duration='3000' />ML
              </div>
            </div>
            <div class="module">
              <div class="module_title">
                输液速度
              </div>
              <div class="module_val">
                <countTo :startVal='0' :endVal='100' :duration='3000' />ML/H
              </div>
            </div>
            <div class="module">
              <div class="module_title">
                剩余时间
              </div>
              <div class="module_val">
                <countTo :startVal='0' :endVal='72' :duration='3000' />min
              </div>
            </div>
          </div>
        </div>
        <div class="rightCon">
          无异常
        </div>
      </div>
      <div class="operate">
        <el-button type="primary" disabled>输液中...</el-button>
        <el-button type="success">暂停</el-button>
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
  justify-content: space-between;
  margin-top: 15px;
  .item{
    height: 110px;
    width: 650px;
    border-radius: 10px;
    padding: 10px;
    display: flex;
    justify-content: space-between;
    .leftCon{
      display: flex;
      flex-flow: column;
      justify-content: space-between;
      flex: 1;
      padding-right: 30px;
      .top{
        display: flex;
        align-items: center;
        .icon{
          i{
            font-size: 26px;
          }
        }
        .name{
          margin-left: 15px;
          font-size: 20px;
        }
      }
      .bot{
        display: flex;
        justify-content: space-between;
        .module{
          .module_title{
            font-size: 12px;
            font-weight: bold;
          }
          .module_val{
            margin-top: 0px;
            font-size: 20px;
          }
        }
      }
    }
    .rightCon{
      display: flex;
      justify-content: center;
      align-items: center;
      font-size: 16px;
      font-weight: bold;
      position: relative;
      width: 100px;
      &::after{
        content: "";
        width: 2px;
        height: 80px;
        position: absolute;
        top: 50%;
        transform: translateY(-50%);
        left: 0;
      }
    }
  }
  .normal{
    background-color: #f1fcff;
    color: #00a399;
    .rightCon{
      &::after{
        background-color: #00a399;
      }
    }
  }
  .warning{
    background-color: #fff8f3;
    color: #ffb546;
    .rightCon{
      &::after{
        background-color: #ffb546;
      }
    }
  }
  .error{
    background-color: #ffeeee;
    color: #ff0000;
    .rightCon{
      &::after{
        background-color: #ff0000;
      }
    }
  }
}
</style>