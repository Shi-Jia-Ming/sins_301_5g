<template>
    <div class="itemBox">
      <div v-for="item in dataList" :key="item" class="item" @click="gotoDetail">
        <div class="top  warning_status"> 
          <div class="avatar">
            <img src="https://img2.baidu.com/it/u=3421237124,2219416572&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=500">
          </div>
          <div class="info">
            <div class="name">YouLi</div>
            <div class="number">KT2-H13354</div>
          </div>
        </div>
        <div class="bot">
          <div class="list lx_flex">
            <div class="text">
              体温
            </div>
            <div class="status">
              正常
            </div>
          </div>
          <div class="list lx_flex">
            <div class="temperature">
              36.8°C
            </div>
            <div class="temperature_icon">
              <img src="@/assets/icon_images/icon-wenduji.png">
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
      default: ()=> []
    }
  },
  methods: {
    gotoDetail() {
      this.$router.push({
        path: "/equipment/earTemperaturePumpDetail",
        params: { a: 12 },
      });
      // this.$router.push('/equipment/mattress/detail')
    },
  },
}
</script>

<style lang="scss" scoped>
  .itemBox{
    width: 100%;
    height: 100%;
    &::after{
      content: "";
      display: block;
      clear: both;
    }
    .normal_status{
      background-color: #00c6bb;
    }
    .warning_status{
      background-color: #ffb444;
    }
    .error_status{
      background-color: #ff214b;
    }
    .disabled_status {
      background-color: #bfbfbf;
    }

    .item{
      float: left;
      width: 19%;
      margin-left: 1.25%;
      margin-top: 10px;
      transition: 0.3s;
      border-radius: 5px;
      overflow: hidden;
      cursor: pointer;
      border: 1px solid #00000015;

      &:hover{
        box-shadow: 0 0 10px #0000002e;
      }

      &:nth-child(5n-4){
        margin-left: 0;
      }

      &:nth-child(-n+5){
        margin-top: 0;
      }

      .top{
        display: flex;
        padding: 10px 20px;
        align-items: center;
        border-radius: 5px;
        .avatar{
          border-radius: 50%;
          width: 45px;
          height: 45px;
          overflow: hidden;
          img{
            width: 100%;
            height: 100%;
          }
        }
        .info{
          flex: 1;
          margin-left: 15px;
          .name{
            color: #FFF;
            font-size: 18px;
            font-weight: bold;
          }
          .number{
            font-size: 12px;
            // color: #007a7f;
            margin-top: 6px;
            font-weight: bold;
          }
        }
      }

      .bot{
        padding: 15px;
        .list{
          justify-content: space-between;
          margin-top: 15px;
          align-items: center;
          &:first-child{
            margin-top: 0;
          }
          .text{
            font-size: 14px;
            font-weight: bold;
          }
          .status{
            font-size: 12px;
            font-weight: bold;
          }
          // 状态字体颜色
          .normal {
            color: #00c6bb;
          }
          .warning {
            color: #ffb544;
          }
          .error {
            color: #ff214b;
          }

          .temperature{
            font-size: 16px;
            font-weight: bold;
          }
          .temperature_icon{
            img {
              width: 25px;
            }
          } 
        }
      }
    }
  }
</style>
