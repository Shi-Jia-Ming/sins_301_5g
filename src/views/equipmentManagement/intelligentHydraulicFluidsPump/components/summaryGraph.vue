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
          path: '/equipment/infusionPumpHistoryChart',
          name: 'InfusionPumpHistoryChart',
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
          data: ["输液量"]
        },
        grid: {
          left: "3%",
          right: "4%",
          bottom: "3%",
          containLabel: true
        },
        xAxis: {
          type: "category",
          boundaryGap: false,
          data: []
        },
        yAxis: [
          {
            type: 'value',
            boundaryGap: false,
            name: '输液量（ML）',
            axisLine: {
              show: true,
              lineStyle: {
                color: '#ffa759'
              }
            }
          }
        ],
        series: [
          {
            name: "输液量",
            type: "line",
            data: [],
            symbol: 'circle',
            smooth: false,
            itemStyle: {
              color: '#ffa759'
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
        let { alreadyLiquid, time } = this.echartsData
        if( time.length > 200 ){
          time = time.slice(-200)
          alreadyLiquid = alreadyLiquid.slice(-200)
        }
        if( this.option.xAxis.data.length !== 0 ){
          if( this.option.xAxis.data[this.option.xAxis.data.length - 1] !== time[time.length - 1] ){
            this.option.xAxis.data.push(time[time.length - 1])
            this.option.series[0].data.push(alreadyLiquid[alreadyLiquid.length - 1])
            this.chartDom.setOption(this.option)
          }
        }else{
          this.option.xAxis.data = time
          this.option.series[0].data = alreadyLiquid
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
}
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