<!-- 详情-基本信息 -->
<template>
  <div>
    <div class="title">
      <i class="iconfont iconbianhaoxinxi"></i>
      <span>{{title}}</span>
    </div>
    <div class="itemBox">
      <div class="item" :class=" classStatus(basicData.status) ">
        <div class="leftCon">
          <div class="top">
            <div class="icon">
              <i class="iconfont iconshuyederen"></i>
            </div>
            <div class="name">{{ basicData.userInfo && basicData.userInfo.userName }}</div>
          </div>
          <div class="bot">
            <div class="module">
              <div class="module_title">
                已输液量/总量
              </div>
              <div class="module_val">
                <countTo :startVal='0' :endVal='basicData.alreadyLiquid' :duration='3000' />ML/
                <countTo :startVal='0' :endVal='basicData.totalLiquid' :duration='3000' />ML
              </div>
            </div>
            <div class="module">
              <div class="module_title">
                输液速度
              </div>
              <div class="module_val">
                <countTo :startVal='0' :endVal='basicData.speed' :duration='3000' />ML/H
              </div>
            </div>
            <div class="module">
              <div class="module_title">
                剩余时间
              </div>
              <div class="module_val">
                {{ basicData.residueTime || 0 }}
              </div>
            </div>
          </div>
        </div>
        <div class="rightCon" v-if="basicData.warnInfo">
          <div class="tips">
            <div v-for="item in basicData.warnInfo" :key="item">
              {{ warningText(item) }}
            </div>
          </div>
        </div>
      </div>
      <div class="operate">
        <div class="status">
          {{ InfusionStatus(basicData) }}
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
  computed: {
    InfusionStatus(){
      return (item)=> {
        let text = ''
        if( item.status ){
          if( item.speed !== 0 ){
            text = '输液中'
          }else{
            text = '待机'
          }
        }else{
          text = '空闲'
        }
        return text
      }
    },
    classStatus(){
      return function(temperature){
        let text = ''
        switch(temperature){
          case 0:
            text = 'disable'
            break;
          case 1:
            text = 'normal'
            break;
          case 2:
            text = 'warning'
            break;
          case 3:
            text = 'error'
            break;
        }
        return text
      }
    },
    warningText(){
      return (item) => {
        let text = ''
        switch(item){
          case 'QP':
            text = '气泡'
            break;
          case 'JS':
            text = '结束'
            break;
          case 'WL':
            text = '网络'
            break;
          case 'BB':
            text = '背板'
            break;
          case 'ZS':
            text = '截取阻塞信息'
            break;
          case 'DLJD':
            text = '电池电量极低'
            break;
          case 'DLD':
            text = '电池电量低'
            break;
          case 'YJ':
            text = '预警'
            break;
          case 'TZ':
            text = '停止'
            break;
          case 'KVO':
            text = 'kvo报警'
            break;
          case 'CC':
            text = '超出范围'
            break;
          default:
            text = ''
            break;
        }
        return text
      }
    }
  },
  props: {
    title: {
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
  justify-content: space-between;
  align-items: flex-start;
  margin-top: 15px;
  .item{
    height: 110px;
    width: 45.3125vw;
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
      width: 45%;
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
  .tips{
    display: flex;
    width: 100%;
    padding: 10px 20px;
    height: 100%;
    flex-wrap: wrap;
    div{
      width: 30%;
      font-size: 13px;
      margin: 0 1.5%;
    }
  }

  .operate{
    display: flex;
    div{
      padding: 10px 16px;
      font-weight: 500;
      line-height: 1;
      white-space: nowrap;
      border-radius: 5px;
      display: flex;
      justify-content: center;
      align-items: center;
      color: #FFF;
      margin-left: 10px;
    }
    .status{
      background-color: #5188ff;
      border: 1px solid #5188ff;
    }
    .operateBtn{
      background-color: #2ed42a;
      border: 1px solid #2ed42a;
    }
  }

  .disable{
    background-color: #f1fcff;
    color: #00a399;
    .rightCon{
      &::after{
        background-color: #00a399;
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