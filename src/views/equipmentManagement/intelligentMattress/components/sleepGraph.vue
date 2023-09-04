<!-- 详情-统计图 -->
<template>
  <div>
    <div class="title">
      <div class="left">
        <i class="iconfont iconshujutongji"></i>
        <span>统计图</span>
      </div>

    </div>
    <div class="echarts">
      <div ref="echarts"></div>
    </div>
  </div>
</template>

<script>
import * as echarts from "echarts"
import request from "@/utils/request";
import $ from 'jquery'

export default {
  props: {
    echartsData: {
      type: Object,
      default: ()=> {}
    },
    userId: {
      type: Number,
      default: null
    },
    equipmentId: {
      type: Number,
      default: null
    }
  },
  data() {
    return {
      chartDom: null,
      chartInter: null
    }
  },
  watch: {
    echartsData: {
      handler(){
        let { breathe, breatheStatus, heartRate, breatheOriginalData,heartRateOriginalData, heartRateStatus } = this.echartsData
        // if( time.length > 200 ){
        //   time = time.slice(-200)
        //   heartRate = heartRate.slice(-200)
        //   breathe = breathe.slice(-200)
        // }

        // this.option.xAxis.data = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32]
        //
        // // this.option.series[0].data = breathe
        // let str = heartRateOriginalData + "";
        // str = str.replaceAll(' ','');
        // str = str.substring(1,str.length-1)
        // str = str.split(',');
        // let heartData = [];
        // for(let i = 0; i < 32; i++){
        //   heartData.push(parseInt(str[i]));
        // }
        // this.option.series[0].data = heartData
        // console.log("heartRateOriginalData", heartData)
        // this.initEcharts()

      },
      deep: true
    }
  },
  methods: {
    initEcharts() {
      console.log("echartsData:",this.echartsData.heartRate)
      // {
      //  breath:["0","22","18"],
      //  heartRate:["21","11","20"],
      //  time:["09:55","09:56","09:57"]
      // }

      // 心率阈值：
      // 清醒期：60-100次/分钟 取>=75
      // REM睡眠期：60-90次/分钟 取65-75
      // 浅睡期：50-70次/分钟 取55-65
      // 深睡期：40-60次/分钟 取<=55

      // 呼吸速率阈值：
      // 清醒期：12-20次/分钟
      // REM睡眠期：12-25次/分钟
      // 浅睡期：15-30次/分钟
      // 深睡期：10-20次/分钟

      // 只要心率对应的睡眠分期与同时期呼吸对应的睡眠分期的呼吸速率范围相符就确定此刻的分期
      // 当心率在5分钟的区间内均低至65以下时，我们认为睡眠开始，取5分钟的开始时间为睡眠开始时间
      // 当心率有5分钟的区间均高于70时，我们认为睡眠结束，以开始时间作为睡眠结束时间

      let option;
      let xArray = [];
      let sleepData = [43, 47, 88, 59, 42, 44, 50, 63, 51, 49, 56, 32, 90, 41, 43, 75, 92, 89, 29, 78, 80, 84, 39, 37, 85, 89, 46, 55, 52, 35, 98, 90, 56, 38, 49, 25, 28, 95, 55, 54, 85, 92, 75, 60, 59, 30, 86, 51, 32, 95, 26, 43, 60, 81, 59, 58, 81, 28, 57, 59, 29, 90, 48, 81, 25, 36, 26, 30, 71, 56, 62, 89, 66, 88, 47, 48, 84, 54, 56, 61, 67, 43, 34, 78, 27, 71, 74, 87, 81, 35, 80, 74, 68, 79, 81, 61, 47, 33, 77, 96];
      let tempRandomData;
      for(let i = 0; i < 100; i++){
        xArray.push(i)
        // tempRandomData = Math.floor(Math.random() * 100);
        // if(tempRandomData < 25 ){
        //   tempRandomData += 26
        // }
        // sleepData.push(tempRandomData)
      }

      // console.log(sleepData)

      option = {
              legend:{
                data:["1","2","3","4"]
              },
              title: {
                text: '睡眠',
                left: '1%'
              },
              tooltip: {
                trigger: 'axis'
              },
              grid: {
                left: '5%',
                right: '15%',
                bottom: '10%'
              },
              xAxis: {
                data: xArray
              },
              yAxis: {},
              toolbox: {
                right: 10,
                feature: {
                  dataZoom: {
                    yAxisIndex: 'none'
                  },
                  restore: {},
                  saveAsImage: {}
                }
              },
              dataZoom: [
                {
                  type: 'inside'
                }
              ],
              visualMap: {
                top: 50,
                right: 10,
                pieces: [
                  {
                    gt: 0,
                    lte: 25,
                    color: '#FBDB0F'
                  },
                  {
                    gt: 25,
                    lte: 50,
                    color: '#FC7D02'
                  },
                  {
                    gt: 50,
                    lte: 75,
                    color: '#FD0100'
                  },
                  {
                    gt: 75,
                    color: '#AA069F'
                  }
                ],
                outOfRange: {
                  color: '#999'
                }
              },
              series: {
                name: '睡眠',
                type: 'line',
                data: sleepData,
                markLine: {
                  silent: true,
                  lineStyle: {
                    color: '#333'
                  },
                  data: [
                    {
                      yAxis: 100
                    },
                    {
                      yAxis: 200
                    },
                    {
                      yAxis: 300
                    }
                  ]
                }
              }
            }


      // option && myChart.setOption(option);
      this.chartDom = echarts.init(this.$refs.echarts)
      this.chartDom.setOption(option)
    }
  },
  mounted() {
    this.initEcharts()
    // this.chartInter = setInterval(()=>{
    //   if( this.option.xAxis.data.length > 200 ){
    //     this.option.series[0].data.shift()
    //     // this.option.series[1].data.shift()
    //     this.option.xAxis.data.shift()
    //     this.chartDom.setOption(this.option)
    //   }
    // },2000)
  },
  beforeDestroy() {
    if( this.chartInter !== null ){
      clearInterval(this.chartInter)
    }
  }
};
</script>

<style lang="scss" scoped>
.title {
  display: flex;
  align-items: center;
  justify-content: space-between;
  .left {
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
  .right {
    color: #00c5b9;
    font-size: 18px;
    position: relative;
    &::after {
      content: "";
      width: 0%;
      height: 2px;
      background-color: #00c5b9;
      position: absolute;
      left: 0;
      bottom: -5px;
      opacity: 0;
      transition: 0.3s;
    }
    &:hover::after {
      width: 100%;
      opacity: 1;
    }
  }
}
.echarts {
  margin-top: 20px;
  width: 100%;
  height: 400px;
  div {
    width: 100%;
    height: 100%;
  }
}
</style>