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
          :type="dateType"
          range-separator="至"
          start-placeholder="开始时间"
          end-placeholder="结束时间"
          value-format="yyyy-MM-dd"
          size="small"
          @change="handleDate"
        >
        </el-date-picker>
      </div>
    </div>
    <div class="echarts" v-loading="echartsLoading">
      <div ref="echarts"></div>
    </div>
  </div>
</template>

<script>
import * as echarts from 'echarts'
import request from '@/utils/request'

export default {
  data(){
    return {
      dateTypeArr: ['日', '月'],
      current: 0,
      dateType: 'daterange',
      dateValue: '',
      // echarts配置项
      option: {
        tooltip: {
          trigger: "axis"
        },
        legend: {
          data: ["体温"]
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
          data: []
        },
        yAxis: [
          {
            type: 'value',
            name: '体温（°C）'
          }
        ],
        series: [
          {
            name: "体温",
            type: "line",
            data: [],
            symbol: 'circle',
            smooth: true,
            itemStyle: {
              color: '#0e92ee'
            }
          }
        ]
      },
      echartsLoading: false,
      exampleEcharts: null
    }
  },
  props: {
    echartsData: {
      type: Object,
      default: ()=> {}
    },
    userId: {
      type: Number,
      default: null
    }
  },
  watch: {
    echartsData: {
      handler(){
        const { temperature, time } = this.echartsData
        this.option.xAxis.data = time
        this.option.series[0].data = temperature
        this.initEcharts()
      },
      deep: true
    }
  },
  methods: {
    toggleType(e){
      this.current = e
      switch(e){
        case 0:
          this.dateType = 'daterange'
          break;
        case 1:
          this.dateType = 'monthrange'
          break;
      }
    },
    initEcharts() {
      const chartDom = this.$refs.echarts;
      this.exampleEcharts = echarts.init(chartDom)
      this.exampleEcharts.setOption(this.option);
    },
    handleDate(){
      if( !this.dateValue ) return false
      const [startTime, endTime] = this.dateValue
      this.echartsLoading = true
      request({
        url: 'ear/findLineChart',
        method: 'post',
        data: {
          userId: this.userId,
          startTime,
          endTime
        }
      }).then(res=>{
        const { temperature, time } = res.data
        this.option.xAxis.data = time
        this.option.series[0].data = temperature
        this.exampleEcharts.setOption(this.option, true)
      }).finally(_=>{
        this.echartsLoading = false
      })
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