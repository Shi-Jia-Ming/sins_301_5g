<!-- 历史数据统计图 -->
<template>
  <div>
    <div class="title">
      <i class="iconfont iconshujutongji"></i>
      <span>历史数据统计图</span>
    </div>
    <div class="actionBar">
      <div class="date">
        <el-date-picker
          v-model="dateValue"
          :type="dateType"
          value-format="yyyy-MM-dd"
          placeholder="选择日期"
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
      dateType: 'date',
      dateValue: '',
      // echarts配置项
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
          data: ["输液量"]
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
            smooth: true,
            itemStyle: {
              color: '#ffa759'
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
    },
    equipmentId: {
      type: Number,
      default: null
    }
  },
  watch: {
    echartsData: {
      handler(){
        const { alreadyLiquid, time } = this.echartsData
        this.option.xAxis.data = time
        this.option.series[0].data = alreadyLiquid
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
      echarts.init(chartDom).setOption(this.option);
    },
    initEcharts() {
      const chartDom = this.$refs.echarts;
      this.exampleEcharts = echarts.init(chartDom)
      this.exampleEcharts.setOption(this.option);
    },
    handleDate(){
      if( !this.dateValue ) return false
      const startTime = this.dateValue, endTime = this.dateValue
      this.echartsLoading = true
      request({
        url: 'infusionPump/findLineChart',
        method: 'post',
        data: {
          userId: this.userId,
          startTime,
          endTime,
          equipmentId: this.equipmentId
        }
      }).then(res=>{
        const { alreadyLiquid, time } = res.data
        this.option.xAxis.data = time
        this.option.series[0].data = alreadyLiquid
        if( this.exampleEcharts ){
          this.exampleEcharts.setOption(this.option, true)
        }else{
          this.initEcharts()
        }
      }).finally(_=>{
        this.echartsLoading = false
      })
    }
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