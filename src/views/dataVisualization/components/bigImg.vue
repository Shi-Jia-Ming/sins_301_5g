<template>
  <div class="box">
    <img src="@/assets/icon_images/pic_Dbeijingps.png">
  </div>
</template>

<script>
export default {
  
}
</script>

<style lang="scss" scoped>
.box{
  width: 100%;
  height: 525px;
  background-image: url('~@/assets/icon_images/pic_Dbeijing.png');
  background-size: contain;
  background-repeat: no-repeat;
  background-position: center;
  padding: 13px 34px 31px 32px;
  img{
    width: 100%;
    border-radius: 10px;
    height: 100%;
    mask-image: url('~@/assets/icon_images/pic_dbx.png');
    mask-repeat: no-repeat;
    mask-position: center;
    mask-size: contain;
  }
}
</style>