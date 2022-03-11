<template>
  <div class="item" v-loading="itemLoading">
    <div class="title">
      {{title}}
    </div>
    <div class="total">
      <div v-for="(item,index) in totalData" :key="index">
        {{item}}
      </div>
    </div>
    <div class="normal">
      <i class="iconfont iconyujing1"></i>
      <span class="number">
        <countTo :startVal='0' :endVal='normalData' :duration='3000' />
      </span>
    </div>
    <div class="bot">
      <div class="warning">
        <i class="iconfont iconyujing1"></i>
        <span class="number">
          <countTo :startVal='0' :endVal='warningData' :duration='3000' />
        </span>
      </div>
      <div class="error">
        <i class="iconfont iconyujing1"></i>
        <span class="number">
          <countTo :startVal='0' :endVal='errorData' :duration='3000' />
        </span>
      </div>
    </div>
  </div>
</template>

<script>
import countTo from 'vue-count-to'
import request from '@/utils/request'

export default {
  components: {
    countTo
  },
  props: {
    title: {
      type: String,
      default: ''
    },
    propData: {
      type: Object,
      default: ()=> {}
    },
    itemLoading: {
      type: Boolean,
      default: false
    }
  },
  data(){
    return {
      normalData: null,
      warningData: null,
      errorData: null
    }
  },
  watch: {
    propData: {
      handler(){
        const { abnormal, normal, warn } = this.propData
        this.normalData = normal
        this.warningData = warn
        this.errorData = abnormal
      },
      deep: true
    }
  },
  computed: {
    totalData(){
      let total = (this.normalData + this.warningData + this.errorData).toString()
      if( total.length < 8 ){
        let count = 8 - total.length
        // 将total拆分为数组
        total = total.toString().split('')
        for( let i = 0; i < count; i++ ){
          total.unshift('0')
        }
        // 转回string
        total = total.join('')
      }
      return total
    }
  }
}
</script>

<style lang="scss" scoped>
.item{
  width: 100%;
  height: 310px;
  background-image: url('~@/assets/icon_images/pic_Zbeijing.png');
  background-size: contain;
  background-position: center;
  background-repeat: no-repeat;
  overflow: hidden;
  padding: 0 25px;
  .title{
    height: 75px;
    display: flex;
    align-items: center;
    font-size: 24px;
    font-weight: bold;
    color: #6cd6f3;
    padding-left: 10px;
    text-shadow: 0 0 3px #6cd6f3;
  }
  .total{
    display: flex;
    margin-top: 28px;
    width: 65%;
    justify-content: space-between;
    div{
      color: #75effd;
      width: 28px;
      height: 40px;
      display: flex;
      justify-content: center;
      align-items: center;
      // text-align: center;
      font-size: 30px;
      font-weight: bold;
      background-image: url('~@/assets/icon_images/pic_SZbiankuang.png');
      background-size: cover;
      background-position: center;
      background-repeat: no-repeat;
    }
  }
  .normal{
    margin-top: 28px;
    display: flex;
    align-items: center;
    i{
      font-size: 30px;
      font-weight: bold;
      color: #4cf4af;
    }
    span{
      margin-left: 10px;
      font-size: 30px;
      color: #4cf4af;
      font-weight: bold;
      letter-spacing: 0.15em;
    }
  }
  .bot{
    margin-top: 37px;
    display: flex;
    .warning{
      display: flex;
      align-items: center;
      flex: 1;
      i{
        font-size: 30px;
        font-weight: bold;
        color: #ff9d34;
      }
      span{
        margin-left: 10px;
        font-size: 30px;
        color: #ff9d34;
        font-weight: bold;
        letter-spacing: 0.15em;
      }
    }
    .error{
      display: flex;
      align-items: center;
      flex: 1;
      i{
        font-size: 30px;
        font-weight: bold;
        color: #ff4f32;
      }
      span{
        margin-left: 10px;
        font-size: 30px;
        color: #ff4f32;
        font-weight: bold;
        letter-spacing: 0.15em;
      }
    }
  }
}
.item ::v-deep .el-loading-mask{
  background-color: unset;
  border-radius: 10px;
}
@media screen and (max-width: 1800px) {
  .item{
    height: 238px;
    padding: 0 10px;
    background-size: 100% 100%;
    .title{
      height: 55px;
      font-size: 20px;
    }
    .total{
      margin-top: 15px;
      margin-left: 10px;
      width: 60%;
      div{
        width: 20px;
        height: 30px;
        background-size: contain;
        font-size: 20px;
      }
    }
    .normal{
      margin-top: 27px;
      margin-left: 10px;
      i{
        font-size: 24px;
      }
      span{
        font-size: 24px;
        margin-left: 7px;
      }
    }
    .bot{
      margin-top: 30px;
      margin-left: 10px;
      .warning, .error{
        i{
          font-size: 24px;
        }
        span{
          font-size: 24px;
          margin-left: 7px;
        }
      }
      
    }
  }
}
</style>