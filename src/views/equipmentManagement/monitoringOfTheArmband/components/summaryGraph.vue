<!-- 详情-统计图 -->
<template>
  <div>
    <div class="title">
      <div class="left">
        <i class="iconfont iconshujutongji"></i>
        <span>统计图</span>
      </div>
      <div class="right">
        <router-link :to="{
          path: '/equipment/armbandHistoryChart',
          name: 'ArmbandHistoryChart',
          query: {
            userId: this.userId,
            equipmentId: this.equipmentId
          }
        }"> 历史数据统计图 > </router-link>
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
          data: ["体温", "心率"]
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
            name: '体温（°C）',
            boundaryGap: false,
            axisLine: {
              show: true,
              lineStyle: {
                color: '#a600ff'
              }
            },
            min: 34,
            max: 44
          },
          {
            type: 'value',
            name: '心率（bpm）',
            boundaryGap: false,
            axisLine: {
              show: true,
              lineStyle: {
                color: '#0494ec'
              }
            }
          }
        ],
        series: [
          {
            name: "体温",
            type: "line",
            data: [],
            symbol: 'circle',
            yAxisIndex: 0,
            smooth: true,
            itemStyle: {
              color: '#a600ff'
            }
          },
          {
            name: "心率",
            type: "line",
            data: [],
            symbol: 'circle',
            yAxisIndex: 1,
            smooth: true,
            itemStyle: {
              color: '#0494ec'
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
        let { temperature, heartRate, time } = this.echartsData
        if( time.length > 200 ){
          time = time.slice(-200)
          temperature = temperature.slice(-200)
          heartRate = heartRate.slice(-200)
        }
        if( this.option.xAxis.data.length !== 0 ){
          if( this.option.xAxis.data[this.option.xAxis.data.length - 1] !== time[time.length - 1] ){
            this.option.xAxis.data.push(time[time.length - 1])
            this.option.series[0].data.push(temperature[temperature.length - 1])
            this.option.series[1].data.push(heartRate[heartRate.length - 1])
            this.chartDom.setOption(this.option)
          }
        }else{
          this.option.xAxis.data = time
          this.option.series[0].data = temperature
          this.option.series[1].data = heartRate
          this.initEcharts()
        }
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
    this.chartInter = setInterval(()=>{
      if( this.option.xAxis.data.length > 200 ){
        this.option.series[0].data.shift()
        this.option.series[1].data.shift()
        this.option.xAxis.data.shift()
        this.chartDom.setOption(this.option)
      }
    },10000)
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
  height: 550px;
  div {
    width: 100%;
    height: 100%;
  }
}
</style>