<template>
    <div class="itemBox">
      <div v-for="item in dataList" :key="item.equipmentId" class="item" >
        <div class="top" :class="statusClass(item.status)"> 
          <div class="avatar">
            <img src="https://img2.baidu.com/it/u=3421237124,2219416572&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=500">
          </div>
          <div class="info">
            <div class="name">{{ item.status ? item.userName : '设备离线' }}</div>
            <div class="number">{{ item.equipmentCode }}</div>
          </div>
        </div>
        <div class="bot" @click="gotoDetail(item)">
          <div class="lx_flex list">
            <div class="list_flex">
              <span class="text">
                心率
              </span>
              <span class="status" :class=" item.heartRate <= 150 ? 'normal_status' : item.heartRate <= 180 ? 'warning_status' : 'error_status' ">
                {{ item.heartRate || 0 }}&nbsp;bpm
              </span>
            </div>
            <div class="list_flex">
              <span class="text">
                在床状态
              </span>
              <span class="status normal_status">
                {{ item.inBedStatus === 1 ? '床垫受压' : item.inBedStatus === 2 ? '有人在床' : '无人在床' }}
              </span>
            </div>
          </div>
          <div class="lx_flex list">
            <div class="list_flex">
              <span class="text">
                呼吸
              </span>
              <span class="status" :class=" item.inBedStatus === 2 ? item.breathe > 10 && item.breathe <= 20 ? 'normal_status' : item.breathe > 20 && item.breathe <= 24 ? 'warning_status' : 'error_status' : 'normal_status' ">
                {{ item.breathe || 0 }}&nbsp;次/分
              </span>
            </div>
            <div class="list_flex">
              <span class="text">
                抖动
              </span>
              <span class="status normal_status">
                {{ item.shake ? item.shake : 0 }}
              </span>
            </div>
          </div>
          <div class="lx_flex list">
            <div class="list_flex">
              <span class="text">
                呼吸暂停
              </span>
              <span class="status" :class=" item.status !== 0 ? item.respiratoryRate < 100 ? 'normal_status' : 'error_status' : 'normal_status' ">
                {{ item.respiratoryRate || 0 }}
              </span>
            </div>
            <div class="list_flex">
              <span class="text">
                设备状态
              </span>
              <span class="status" :class=" item.mattressStatus < 25 ? 'normal_status' : item.mattressStatus === 25 ? 'warning_status' : item.mattressStatus === 30 ? 'error_status' : 'normal_status' ">
                {{ item.mattressStatus < 25 ? '正常' : item.mattressStatus === 25 ? '异常' : item.mattressStatus === 30 ? '无光' : '正常' }}
              </span>
            </div>
          </div>
        </div>
<!--        增加删除设备按钮-->
        <el-button type="danger" @click="deleteDevice(item)" style="float: right; margin-right: 15px; margin-bottom: 10px">删除</el-button>
      </div>
    </div>
</template>

<script>

import request from "@/utils/request";

export default {
  props: {
    dataList: {
      type: Array,
      default: ()=> []
    }
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
          path: '/equipment/mattressDetail',
          name: 'MattressDetail',
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
    },
    deleteDeviceRequest(e) {
      // console.log(e.equipmentId)
      request({
        url: '/equipment/del?id='+e.equipmentId,
        method: 'delete',
      })
    },
    deleteDevice(e) {
      this.$confirm('是否删除此设备？', '确认信息', {
        distinguishCancelAndClose: true,
        confirmButtonText: '删除',
        cancelButtonText: '放弃'
      })
          .then(() => {
            this.deleteDeviceRequest(e)
            this.$message({
              type: 'info',
              message: '删除成功'
            });
          })
          .catch(action => {
            this.$message({
              type: 'info',
              message: action === 'cancel'
                  ? '放弃删除'
                  : '放弃删除'
            })
          });
    }
  }

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
    .item{
      float: left;
      width: 24%;
      margin-left: 1.33%;
      margin-top: 10px;
      transition: 0.3s;
      border-radius: 5px;
      overflow: hidden;
      cursor: pointer;
      border: 1px solid #00000015;

      &:hover{
        box-shadow: 0 0 10px #0000002e;
      }

      &:nth-child(4n-3){
        margin-left: 0;
      }

      &:nth-child(-n+4){
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
            margin-top: 6px;
            font-weight: bold;
          }
        }
      }

      .bot{
        padding: 15px;
        .list{
          justify-content: space-between;
          margin-top: 10px;
          align-items: center;
          &:first-child{
            margin-top: 0;
          }
        }
        .list_flex{
          width: 45%;
          display: flex;
          justify-content: space-between;
          .text{
            font-size: 14px;
          }
          .status{
            width: 60px;
            height: 22px;
            line-height: 22px;
            color: #FFF;
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
