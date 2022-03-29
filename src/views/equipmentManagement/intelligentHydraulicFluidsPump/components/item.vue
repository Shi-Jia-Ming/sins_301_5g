<template>
  <div class="itemBox">
    <div v-for="item in dataList" :key="item.equipmentId" class="item" @click="gotoDetail(item)">
      <div class="top" :class="statusClass(item.status)">
        <div class="avatar">
          <img src="https://img2.baidu.com/it/u=3421237124,2219416572&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=500" />
        </div>
        <div class="info">
          <div class="name">{{ item.status ? item.userName : '设备离线' }}</div>
          <div class="number">{{ item.equipmentCode }}</div>
        </div>
      </div>
      <div class="bot">
        <div class="list lx_flex">
          <div class="text">已输液量/总量（ML)</div>
          <div class="number">{{ item.alreadyLiquid || 0 }}/{{ item.totalLiquid || 0 }}</div>
        </div>
        <div class="list lx_flex">
          <div class="text">速度（ML/H）</div>
          <div class="number">{{ item.speed || 0 }}</div>
        </div>
        <div class="list lx_flex">
          <div class="text">剩余时间（min）</div>
          <div class="number">{{ item.residueTime || 0 }}</div>
        </div>
        <div class="list lx_flex" style="justify-content: unset;flex-wrap: wrap;align-items: flex-start;">
          <!-- <div class="earlyWarning" :class=" item.bubble ? 'text_normal' : 'text_error' ">
            {{ item.bubble ? '' : '气泡预警' }}
          </div>
          <div class="status" :class=" item.block ? 'text_normal' : 'text_error' ">{{ item.block ? '' : '阻塞' }}</div>
          <div class="status" :class=" item.energy ? 'text_normal' : 'text_error' ">{{ item.energy ? '' : '电量预警' }}</div>
          <div class="status" :class=" item.kvo ? 'text_normal' : 'text_error' ">{{ item.kvo ? '' : 'kvo' }}</div> -->
          <!-- <div class="status" :class=" item.block ? 'text_normal' : 'text_error' ">
            {{ InfusionStatus(item) }}
          </div> -->
          <div v-for="items in item.warnInfo" :key="items" class="text_error status">
            {{ warningText(items) }}
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
      default: () => []
    }
  },
  computed: {
    statusClass(){
      return function(status){
        return status === 0 ? 'disabled_status' : status === 1 ? 'normal_status' : status === 2 ? 'warning_status' : 'error_status'
      }
    },
    InfusionStatus(){
      return (item)=> {
        let text = ''
        if( item.status ){
          if( item.speed !== 0 ){
            text = '输液中'
          }else{
            text = '待机'
          }
        }else{
          text = '空闲'
        }
        return text
      }
    },
    warningText(){
      return (item) => {
        let text = ''
        switch(item){
          case 'QP':
            text = '气泡'
            break;
          case 'JS':
            text = '结束'
            break;
          case 'WL':
            text = '网络'
            break;
          case 'BB':
            text = '背板'
            break;
          case 'ZS':
            text = '截取阻塞信息'
            break;
          case 'DLJD':
            text = '电池电量极低'
            break;
          case 'DLD':
            text = '电池电量低'
            break;
          case 'YJ':
            text = '预警'
            break;
          case 'TZ':
            text = '停止'
            break;
          case 'KVO':
            text = 'kvo报警'
            break;
          case 'CC':
            text = '超出范围'
            break;
          default:
            text = ''
            break;
        }
        return text
      }
    }
  },
  methods: {
    gotoDetail(e){
      const { userId, equipmentId } = e
      if( userId && equipmentId ){
        this.$router.push({
          path: '/equipment/infusionPumpDetail',
          name: 'InfusionPumpDetail',
          query: {
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
    color: #ff8300;
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
    width: 19%;
    margin-left: 1.25%;
    margin-top: 10px;
    transition: 0.3s;
    border-radius: 5px;
    overflow: hidden;
    cursor: pointer;
    border: 1px solid #00000015;

    &:hover {
      box-shadow: 0 0 10px #0000002e;
    }

    &:nth-child(5n-4) {
      margin-left: 0;
    }

    &:nth-child(-n + 5) {
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
        margin-top: 15px;
        align-items: center;
        &:first-child {
          margin-top: 0;
        }
        .text {
          font-size: 14px;
          font-weight: bold;
        }
        .number {
          width: 60px;
          height: 20px;
          text-align: center;
          line-height: 20px;
          color: #fff;
          font-size: 12px;
          background-color: #00c6bb;
          border-radius: 3px;
          font-weight: bold;
        }
        .earlyWarning {
          font-size: 14px;
          font-weight: bold;
        }
        .status {
          font-size: 14px;
          font-weight: bold;
          color: #7100fa;
          line-height: 20px;
          height: 20px;
          width: 32%;
          margin: 0 0.6%;
        }
        .text_error {
          color: #ff214b;
        }
        .text_normal {
          color: #00c6bb;
        }
        .text_warning {
          color: #ff8300;
        }
      }
    }
  }
}
</style>
