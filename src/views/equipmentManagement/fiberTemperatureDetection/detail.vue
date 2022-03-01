<!-- 详情 -->
<template>
  <div class="page_box">
    <div class="leftCon">
      <!-- 基本信息 -->
      <div class="info">
        <BasicInfo />
      </div>
      <!-- 统计图 -->
      <div class="summaryGraph">
        <SummaryGraph />
      </div>
    </div>
    <div class="rightCon">
      <OtherInfo />
    </div>
  </div>
</template>

<script>
import BasicInfo from './components/basicInfo.vue'
import SummaryGraph from './components/summaryGraph.vue'
import OtherInfo from './components/otherInfo.vue'

export default {
  components: {
    BasicInfo,
    SummaryGraph,
    OtherInfo
  },
  data() {
    return {
      
    }
  },
  mounted(){
    // console.log(this.$route.params)
  }
}
</script>

<style lang="scss" scoped>
  .page_box{
    justify-content: space-between;
    display: flex;
    .leftCon{
      flex: 0.63;
      .summaryGraph{
        margin-top: 30px;
      }
    }
    .rightCon{
      flex: 0.3;
    }
  }
</style>