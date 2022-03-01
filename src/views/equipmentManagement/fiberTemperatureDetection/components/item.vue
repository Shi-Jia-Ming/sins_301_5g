<template>
  <div class="itemBox">
    <div v-for="item in dataList" :key="item" class="item" @click="gotoDetail">
      <div class="top normal_status">
        <div class="avatar">
          <img
            src="https://img2.baidu.com/it/u=3421237124,2219416572&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=500"
          />
        </div>
        <div class="info">
          <div class="name">XXX床位</div>
          <div class="number">KT2-H13354</div>
        </div>
      </div>
      <div class="bot">
        <div class="lx_flex list">
          <div class="list_flex">
            <span class="text"> 一通道 </span>
            <span class="status normal_status"> 36.5°C </span>
          </div>
          <div class="list_flex">
            <span class="text"> 一通道 </span>
            <span class="status normal_status"> 36.5°C </span>
          </div>
        </div>
        <div class="lx_flex list">
          <div class="list_flex">
            <span class="text"> 二通道 </span>
            <span class="status warning_status"> 36.5°C </span>
          </div>
          <div class="list_flex">
            <span class="text"> 二通道 </span>
            <span class="status error_status"> 36.5°C </span>
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
  methods: {
    gotoDetail() {
      this.$router.push({
        path: "/equipment/fiberDetail",
        name: 'MattressDetail',
        params: { a: 12 },
      });
      // this.$router.push('/equipment/mattress/detail')
    },
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
  .normal_status {
    background-color: #00c6bb;
  }
  .warning_status {
    background-color: #ffb444;
  }
  .error_status {
    background-color: #ff214b;
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
