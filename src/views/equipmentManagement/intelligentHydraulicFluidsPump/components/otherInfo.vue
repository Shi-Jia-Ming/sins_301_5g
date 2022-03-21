<!-- 详情-右侧信息 -->
<template>
  <div>
    <!-- 个人信息 -->
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
    <!-- 设备信息 -->
    <div class="item">
      <div class="header">
        <div class="title">
          <i class="iconfont iconshebeii"></i>
          <span>设备信息</span>
        </div>
      </div>
      <div class="content lx_flex">
        <div class="leftCon">
          <div class="list">
            <div class="text">设备名称：</div>
            <div class="val">
              {{ equipmentInfo.equipmentName }}
            </div>
          </div>
          <div class="list">
            <div class="text">设备编号：</div>
            <div class="val">
              {{ equipmentInfo.equipmentCode }}
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- 报警提示 -->
    <div class="item">
      <div class="header">
        <div class="title">
          <i class="iconfont icontishifill"></i>
          <span>报警提示</span>
        </div>
      </div>
      <div class="content">
        <div class="list error">
          <div class="text">气泡报警</div>
        </div>
        <div class="list error">
          <div class="text">阻塞报警</div>
        </div>
        <div class="list error">
          <div class="text">KVO报警</div>
        </div>
        <div class="list error">
          <div class="text">电池电量过低报警</div>
          <div class="val" style="margin-left: 10px;">电量≤15%</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    userInfo: {
      type: Object,
      default: ()=> {}
    },
    equipmentInfo: {
      type: Object,
      default: ()=> {}
    }
  }
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
    .icon {
      font-size: 18px;
      cursor: pointer;
      i {
        font-weight: bold;
        color: #202234;
        transition: 0.3s;
        &:hover {
          color: #000000;
        }
      }
    }
  }
  .content {
    margin-top: 20px;
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
      margin-top: 15px;
      &:first-child {
        margin-top: 0;
      }
    }
    .normal{
      padding-left: 20px;
      position: relative;
      &::after{
        content: "";
        width: 15px;
        height: 15px;
        border-radius: 50%;
        position: absolute;
        top: 50%;
        transform: translateY(-50%);
        left: 0;
        background-color: #00bf69;
      }
    }
    .warning{
      padding-left: 20px;
      position: relative;
      &::after{
        content: "";
        width: 15px;
        height: 15px;
        border-radius: 50%;
        position: absolute;
        top: 50%;
        transform: translateY(-50%);
        left: 0;
        background-color: #ffb444;
      }
    }
    .error{
      padding-left: 20px;
      position: relative;
      &::after{
        content: "";
        width: 15px;
        height: 15px;
        border-radius: 50%;
        position: absolute;
        top: 50%;
        transform: translateY(-50%);
        left: 0;
        background-color: #ff001e;
      }
    }
  }
  .content.lx_flex{
    align-items: center;
    justify-content: space-between;
    .rightCon{
      width: 30%;
      img{
        width: 100%;
        border-radius: 5px;
      }
    }
  }
}
</style>