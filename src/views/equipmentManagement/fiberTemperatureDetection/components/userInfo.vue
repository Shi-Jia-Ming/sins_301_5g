<!-- 历史统计图-个人信息 -->
<template>
  <div>
    <div class="item">
      <div class="header">
        <div class="title">
          <i class="iconfont icongerenh"></i>
          <span>个人信息</span>
        </div>
      </div>
      <div class="content">
        <div class="list">
          <div class="text">
            姓名：
          </div>
          <div class="val">{{ userInfo.userName }}</div>
        </div>
        <div class="list">
          <div class="text">性别：</div>
          <div class="val">{{ userInfo.sex === 1 ? '男' : '女' }}</div>
        </div>
        <div class="list">
          <div class="text">血型：</div>
          <div class="val">{{ userInfo.bloodType }}</div>
        </div>
        <div class="list">
          <div class="text">身高：</div>
          <div class="val">{{ userInfo.height }}cm</div>
        </div>
        <div class="list">
          <div class="text">年龄：</div>
          <div class="val">{{ userInfo.age }}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import countTo from 'vue-count-to'
export default {
  components: {
    countTo
  },
  props: {
    title: {
      type: String,
      default: '基本信息'
    },
    userInfo: {
      type: Object,
      default: ()=> {}
    }
  },
  data() {
    return {}
  },
  mounted() {}
}
</script>

<style lang="scss" scoped>
.item {
  margin-top: 35px;
  &:first-child {
    margin-top: 0;
  }
  .header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    .title {
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
  }
  .content {
    margin-top: 10px;
    padding: 10px 15px;
    background-color: #0000000d;
    border-radius: 5px;
    transition: 0.3s;
    &:hover {
      box-shadow: 0 0 10px #00000033;
    }
    .list {
      display: flex;
      align-items: center;
      font-size: 16px;
      color: #201f35;
      margin-top: 10px;
      &:first-child {
        margin-top: 0;
      }
    }
  }
}
</style>