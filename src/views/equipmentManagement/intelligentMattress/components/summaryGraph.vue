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
          path: '/equipment/mattressHistoryChart',
          name: 'MattressHistoryChart',
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
    time: {
      type: Array,
      default: ()=> []
    },
    breathe: {
      type: Array,
      default: ()=> []
    },
    bpm: {
      type: Array,
      default: ()=> []
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
        dataZoom: [
          {
            type: 'inside',
            throttle: '50',
            minValueSpan: 6,
            start: 1,
            end: 50,
            zoomLock: true
          }
        ],
        tooltip: {
          trigger: "axis"
        },
        legend: {
          data: ["呼吸", "心率"]
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
          boundaryGap: '50%',
          data: this.time
        },
        yAxis: [
          {
            type: 'value',
            name: '呼吸（R）',
            axisLine: {
              show: true,
              lineStyle: {
                color: '#ff007c'
              }
            }
          },
          {
            type: 'value',
            name: '心率（bpm）',
            axisLine: {
              show: true,
              lineStyle: {
                color: '#a58bf6'
              }
            }
          }
        ],
        series: [
          {
            name: "呼吸",
            type: "line",
            data: this.breathe,
            symbol: 'circle',
            yAxisIndex: 0,
            smooth: true,
            itemStyle: {
              color: '#ff007c'
            }
          },
          {
            name: "心率",
            type: "line",
            data: this.bpm,
            symbol: 'circle',
            yAxisIndex: 1,
            smooth: true,
            itemStyle: {
              color: '#a58bf6'
            }
          }
        ]
      }
    }
  },
  watch: {
    time: {
      handler(){
        this.option.xAxis.data = this.time
        this.option.series[0].data = this.breathe
        this.option.series[1].data = this.bpm
        this.initEcharts()
      },
      deep: true
    }
  },
  methods: {
    initEcharts() {
      const chartDom = this.$refs.echarts;
      echarts.init(chartDom).setOption(this.option);
    },
  },
  mounted() {
    
  },
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