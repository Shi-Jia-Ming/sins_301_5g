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
      option: {
        tooltip: {
          trigger: "axis"
        },
        legend: {
          data: ["心率波形"]
        },
        grid: {
          left: "3%",
          right: "4%",
          bottom: "3%",
          containLabel: true
        },
        // x轴
        xAxis: {
          type: "category",
          boundaryGap: false,
          data: []
        },
        yAxis: [
          {
            type: 'value',
            name: '心率波形',
            boundaryGap: false,
            axisLine: {
              show: true,
              lineStyle: {
                color: '#ff7ab5'
              }
            }
          }
        ],
        series: [
          {
            name: "心率波形",
            type: "line",
            data: [],
            symbol: 'circle',
            yAxisIndex: 0,
            smooth: true,
            itemStyle: {
              color: '#ff7ab5'
            }
          }
        ]
      },
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

        this.option.xAxis.data = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32]

        // this.option.series[0].data = breathe
        let str = heartRateOriginalData + "";
        str = str.replaceAll(' ','');
        str = str.substring(1,str.length-1)
        str = str.split(',');
        let heartData = [];
        for(let i = 0; i < 32; i++){
          heartData.push(parseInt(str[i]));
        }
        this.option.series[0].data = heartData
        // console.log("heartRateOriginalData", heartData)
        this.initEcharts()

      },
      deep: true
    }
  },
  methods: {
    initEcharts() {
      this.chartDom = echarts.init(this.$refs.echarts)
      this.chartDom.setOption(this.option)
    }
  },
  mounted() {
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
  height: 200px;
  div {
    width: 100%;
    height: 100%;
  }
}
</style>