<!-- 数据大屏 -->
<template>
  <dv-full-screen-container id="dataV">
    <div class="header">
      <HeaderContent />
    </div>
    <div class="content">
      <div class="leftCon">
        <Item />
        <Item />
        <Item />
      </div>
      <div class="centerCon">
        <bigImg />
        <warningInfo />
      </div>
      <div class="rightCon">
        <Introduction />
        <Item />
        <Item />
      </div>
    </div>
  </dv-full-screen-container>
</template>

<script>
import HeaderContent from './components/header.vue'
import Item from './components/item.vue'
import Introduction from './components/Introduction.vue'
import bigImg from './components/bigImg.vue'
import warningInfo from './components/warningInfo.vue'
export default {
  components: {
    HeaderContent,
    Item,
    Introduction,
    bigImg,
    warningInfo
  }  
}
</script>

<style lang="scss" scoped>
#dataV{
  background-image: radial-gradient(#243a9b, #10183e);
  display: flex;
  flex-flow: column;
  padding: 35px 50px 5px;
  .header{
    height: 76px;
    width: 100%;
  }
  .content{
    flex: 1;
    margin-top: 10px;
    display: flex;
    justify-content: space-between;
    .leftCon,.rightCon{
      width: 26.4%;
      display: flex;
      flex-flow: column;
      justify-content: space-between;
    }
    .centerCon{
      width: 44.5%;
      display: flex;
      justify-content: space-between;
      flex-flow: column;
    }
  }
}
</style>