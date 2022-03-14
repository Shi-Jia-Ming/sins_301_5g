<template>
  <div class="header">
    <div class="text">301-5G医疗实验室</div>
  </div>  
</template>

<script>
export default {
  
}
</script>

<style lang="scss" scoped>
.header{
  width: 100%;
  height: 100%;
  background-image: url('~@/assets/icon_images/pic_BT.png');
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  display: flex;
  justify-content: center;
  align-items: flex-start;
  .text{
    font-size: 2.5vw;
    background-image:-webkit-linear-gradient(right,#54f9ff,#57aaff);
    -webkit-background-clip:text;
    -webkit-text-fill-color:transparent;
    font-weight: bold;
  }
}
</style>