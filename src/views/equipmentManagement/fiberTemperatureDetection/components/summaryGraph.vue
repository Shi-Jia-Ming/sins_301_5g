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
          path: '/equipment/fiberHistoryChart',
          name: 'FiberHistoryChart',
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
          data: ["一通道", "二通道", "三通道", "四通道"]
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
              show: true
            }
          }
        ],
        series: [
          {
            name: "一通道",
            type: "line",
            data: [],
            symbol: 'circle',
            smooth: true,
            itemStyle: {
              color: '#00feff'
            }
          },
          {
            name: "二通道",
            type: "line",
            data: [],
            symbol: 'circle',
            smooth: true,
            itemStyle: {
              color: '#d000fa'
            }
          },
          {
            name: "三通道",
            type: "line",
            data: [],
            symbol: 'circle',
            smooth: true,
            itemStyle: {
              color: '#00be66'
            }
          },
          {
            name: "四通道",
            type: "line",
            data: [],
            symbol: 'circle',
            smooth: true,
            itemStyle: {
              color: '#7680f9'
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
        let { countFirstT, countSecondT, countThirdT, countFourT, time } = this.echartsData
        if( time.length > 200 ){
          time = time.slice(-200)
          countFirstT = countFirstT.slice(-200)
          countSecondT = countSecondT.slice(-200)
          countThirdT = countThirdT.slice(-200)
          countFourT = countFourT.slice(-200)
        }
        if( this.option.xAxis.data.length !== 0 ){
          if( this.option.xAxis.data[this.option.xAxis.data.length - 1] !== time[time.length - 1] ){
            this.option.xAxis.data.push(time[time.length - 1])
            this.option.series[0].data.push(countFirstT[countFirstT.length - 1])
            this.option.series[1].data.push(countSecondT[countSecondT.length - 1])
            this.option.series[2].data.push(countThirdT[countThirdT.length - 1])
            this.option.series[3].data.push(countFourT[countFourT.length - 1])
            this.chartDom.setOption(this.option)
          }
        }else{
          this.option.xAxis.data = time
          this.option.series[0].data = countFirstT
          this.option.series[1].data = countSecondT
          this.option.series[2].data = countThirdT
          this.option.series[3].data = countFourT
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
        this.option.series[2].data.shift()
        this.option.series[3].data.shift()
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