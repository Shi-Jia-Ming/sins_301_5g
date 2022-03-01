<!-- 历史数据统计图 -->
<template>
  <div>
    <div class="title">
      <i class="iconfont iconshujutongji"></i>
      <span>历史数据统计图</span>
    </div>
    <div class="actionBar">
      <div class="type">
        <div v-for="(item, index) in dateTypeArr" :key="item" :class=" index === current ? 'active' : '' " @click="toggleType(index)">
          {{ item }}
        </div>
      </div>
      <div class="date">
        <el-date-picker
          v-model="dateValue"
          type="daterange"
          range-separator="至"
          start-placeholder="开始时间"
          end-placeholder="结束时间"
          size="small"
        >
        </el-date-picker>
      </div>
    </div>
    <div class="echarts">
      <div ref="echarts"></div>
    </div>
  </div>
</template>

<script>
import * as echarts from 'echarts'

export default {
  data(){
    return {
      dateTypeArr: ['日', '月', '年'],
      current: 0,
      dateValue: '',
      // echarts配置项
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
          boundaryGap: '50%',
          data: ["14:00","05","10","15","20","25","30","35","40","45","50","55","15:00"]
        },
        yAxis: [
          {
            type: 'value',
            name: '体温（°C）',
            axisLine: {
              show: true
            }
          }
        ],
        series: [
          {
            name: "一通道",
            type: "line",
            data: [120, 132, 101, 134, 90, 50, 30,120, 132, 101, 134, 90, 50],
            symbol: 'circle',
            smooth: true,
            itemStyle: {
              color: '#ffa858'
            }
          },
          {
            name: "二通道",
            type: "line",
            data: [20, 82, 91, 24, 90, 33, 30,20, 82, 91, 24, 90, 33],
            symbol: 'circle',
            smooth: true,
            itemStyle: {
              color: '#d000fa'
            }
          },
          {
            name: "三通道",
            type: "line",
            data: [123,45,56,123,45,34,56,66,34,68,34,79,78],
            symbol: 'circle',
            smooth: true,
            itemStyle: {
              color: '#00be66'
            }
          },
          {
            name: "四通道",
            type: "line",
            data: [60,89,34,89,94,72,83,85,38,94,323,95,96],
            symbol: 'circle',
            smooth: true,
            itemStyle: {
              color: '#7680f9'
            }
          }
        ]
      }
    }
  },
  methods: {
    toggleType(e){
      this.current = e
    },
    initEcharts() {
      const chartDom = this.$refs.echarts;
      echarts.init(chartDom).setOption(this.option);
    }
  },
  mounted() {
    this.initEcharts();
  }
}
</script>

<style lang="scss" scoped>
.title {
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
.actionBar{
  margin-top: 20px;
  display: flex;
  align-items: center;
  .type{
    display: flex;
    border-radius: 5px;
    background-color: #f1f1f1;
    overflow: hidden;
    margin-right: 20px;
    div{
      width: 50px;
      text-align: center;
      font-size: 14px;
      height: 30px;
      line-height: 30px;
      background-color: #f1f1f1;
      transition: 0.3s;
      border-radius: 0;
      color: #202234;
      cursor: pointer;
    }
    div.active{
      background-color: #00c6bb;
      color: #FFF;
      border-radius: 5px;
    }
  }
}
.echarts{
  margin-top: 10px;
  height: 480px;
  div{
    width: 100%;
    height: 100%;
  }
}
</style>