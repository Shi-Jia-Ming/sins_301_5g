<template>
  <div class="itemBox">
    <div v-for="item in dataList" :key="item.userId" class="item" @click="gotoDetail(item)">
      <div class="top" :class="statusClass(item.status)">
        <div class="avatar">
          <img
            src="https://img2.baidu.com/it/u=3421237124,2219416572&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=500"
          />
        </div>
        <div class="info">
          <div class="name">{{ item.status ? item.userName : '无人在床' }}</div>
          <div class="number">{{ item.status ? item.equipmentCode : '' }}</div>
        </div>
      </div>
      <div class="bot">
        <div class="lx_flex list">
          <div class="list_flex">
            <span class="text"> 一通道 </span>
            <span class="status" :class="statusClass(item.status)"> {{item.firstChannelTemperature}}°C </span>
          </div>
          <div class="list_flex">
            <span class="text"> 二通道 </span>
            <span class="status" :class="statusClass(item.status)"> {{item.secondChannelTemperature}}°C </span>
          </div>
        </div>
        <div class="lx_flex list">
          <div class="list_flex">
            <span class="text"> 三通道 </span>
            <span class="status" :class="statusClass(item.status)"> {{item.thirdChannelTemperature}}°C </span>
          </div>
          <div class="list_flex">
            <span class="text"> 四通道 </span>
            <span class="status" :class="statusClass(item.status)"> {{item.fourthChannelTemperature}}°C </span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    dataList: {
      type: Array,
      default: () => [],
    },
  },
  computed: {
    statusClass(){
      return function(status){
        return status === 0 ? 'disabled_status' : status === 1 ? 'normal_status' : status === 2 ? 'warning_status' : 'error_status'
      }
    }
  },
  methods: {
    gotoDetail(e){
      const { userId, equipmentId } = e
      if( userId && equipmentId ){
        this.$router.push({
          path: '/equipment/fiberDetail',
          name: 'FiberDetail',
          params: {
            userId,
            equipmentId
          }
        })
      }else{
        this.$message({
          type: 'warning',
          message: '该设备暂无详细数据'
        })
      }
    }
  },
};
</script>

<style lang="scss" scoped>
.itemBox {
  width: 100%;
  height: 100%;
  &::after {
    content: "";
    display: block;
    clear: both;
  }
  .normal_status{
    background-color: #00c6bb;
    color: #007a7f;
  }
  .warning_status{
    background-color: #ffb444;
    color: #ce4c1b;
  }
  .error_status{
    background-color: #ff214b;
    color: #ba0005;
  }
  .disabled_status {
    background-color: #bfbfbf;
    color: #333333;
  }

  .item {
    float: left;
    width: 24%;
    margin-left: 1.33%;
    margin-top: 10px;
    transition: 0.3s;
    border-radius: 5px;
    overflow: hidden;
    cursor: pointer;
    border: 1px solid #00000015;

    &:hover {
      box-shadow: 0 0 10px #0000002e;
    }

    &:nth-child(4n-3) {
      margin-left: 0;
    }

    &:nth-child(-n + 4) {
      margin-top: 0;
    }

    .top {
      display: flex;
      padding: 10px 20px;
      align-items: center;
      border-radius: 5px;
      .avatar {
        border-radius: 50%;
        width: 45px;
        height: 45px;
        overflow: hidden;
        img {
          width: 100%;
          height: 100%;
        }
      }
      .info {
        flex: 1;
        margin-left: 15px;
        .name {
          color: #fff;
          font-size: 18px;
          font-weight: bold;
        }
        .number {
          font-size: 12px;
          color: #007a7f;
          margin-top: 6px;
          font-weight: bold;
        }
      }
    }

    .bot {
      padding: 15px;
      .list {
        justify-content: space-between;
        margin-top: 10px;
        align-items: center;
        &:first-child {
          margin-top: 0;
        }
      }
      .list_flex {
        width: 45%;
        display: flex;
        justify-content: space-between;
        .text {
          font-size: 14px;
        }
        .status {
          width: 60px;
          height: 22px;
          line-height: 22px;
          color: #fff;
          font-size: 12px;
          border-radius: 3px;
          font-weight: bold;
          text-align: center;
        }
      }
    }
  }
}
</style>
