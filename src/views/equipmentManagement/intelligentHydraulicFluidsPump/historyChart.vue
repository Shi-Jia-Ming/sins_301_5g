<!-- 历史统计图 -->
<template>
  <div class="page_box">
    <div class="topContent">
      <div class="leftCon">
        <BasicInfo title="历史基本信息" />
      </div>
      <div class="rightCon">
        <userInfo />
      </div>
    </div>
    <div class="historyEcharts">
      <historyEcharts />
    </div>
  </div>
</template>

<script>
import BasicInfo from './components/basicInfo.vue'
import userInfo from './components/userInfo.vue'
import historyEcharts from './components/historyEcharts.vue'

export default {
  components: {
    BasicInfo,
    userInfo,
    historyEcharts
  },
  data() {
    return {
      
    }
  },
  mounted(){
    
  }
}
</script>

<style lang="scss" scoped>
  .page_box{
    .topContent{
      display: flex;
      justify-content: space-between;
      .leftCon{
        flex: 0.9;
      }
      .rightCon{
        min-width: 25%;
      }
    }
    .historyEcharts{
      margin-top: 40px;
    }
  }
</style>