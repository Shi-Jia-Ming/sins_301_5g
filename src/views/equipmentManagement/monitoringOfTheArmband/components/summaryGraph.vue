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
          params: {a: 10}
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
          boundaryGap: '50%',
          data: ["14:00","05","10","15","20","25","30","35","40","45","50","55","15:00"]
        },
        yAxis: [
          {
            type: 'value',
            name: '心率（bpm）',
            axisLine: {
              show: true,
              lineStyle: {
                color: '#f75a35'
              }
            }
          },
          {
            type: 'value',
            name: '体温（°C）',
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
            data: [120, 132, 101, 134, 90, 50, 30,120, 132, 101, 134, 90, 50],
            symbol: 'circle',
            yAxisIndex: 0,
            smooth: true,
            itemStyle: {
              color: '#0494ec'
            }
          },
          {
            name: "心率",
            type: "line",
            data: [20, 82, 91, 24, 90, 33, 30,20, 82, 91, 24, 90, 33],
            symbol: 'circle',
            yAxisIndex: 1,
            smooth: true,
            itemStyle: {
              color: '#f75a35'
            }
          }
        ]
      }
    }
  },
  methods: {
    initEcharts() {
      const chartDom = this.$refs.echarts;
      echarts.init(chartDom).setOption(this.option);
    },
  },
  mounted() {
    this.initEcharts();
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