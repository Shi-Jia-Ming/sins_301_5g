<!-- 详情-基本信息 -->
<template>
  <div>
    <div class="title">
      <i class="iconfont iconbianhaoxinxi"></i>
      <span>{{title}}</span>
    </div>
    <div class="itemBox">
      <div class="item" :class=" basicData.heartRateStatus === 1 ? 'normal' : basicData.heartRateStatus === 2 ? 'warning' : basicData.heartRateStatus === 3 ? 'error' : 'normal' ">
        <div class="top">
          <div class="left">心率</div>
          <div class="right">
            {{ basicData.heartRateStatus === 1 ? '正常' : basicData.heartRateStatus === 2 ? '警告' : basicData.heartRateStatus === 3 ? '异常' : '正常' }}
          </div>
        </div>
        <div class="bot">
          <div class="left">
            {{ basicData.heartRate || 0 }}bpm
          </div>
          <div class="right">
            <img src="@/assets/icon_images/icon-xinlv.png" />
          </div>
        </div>
      </div>
      <div class="item" :class=" basicData.breatheStatus === 1 ? 'normal' : basicData.breatheStatus === 2 ? 'warning' : basicData.breatheStatus === 3 ? 'error' : 'normal' ">
        <div class="top">
          <div class="left">呼吸</div>
          <div class="right">
            {{ basicData.breatheStatus === 1 ? '正常' : basicData.breatheStatus === 2 ? '警告' : basicData.breatheStatus === 3 ? '异常' : '正常' }}
          </div>
        </div>
        <div class="bot">
          <div class="left">
            {{ basicData.breathe || 0 }}次
          </div>
          <div class="right">
            <img src="@/assets/icon_images/icon-huxi.png" />
          </div>
        </div>
      </div>
      <el-button type="success" style="font-size:20px;text-align: center;width: 240px;height: 120px;border-radius: 10px;margin-left: 25px;padding: 10px;"
                 :loading="loading" @click="handleClick">
        点此检查心率状态
      </el-button>
    </div>
  </div>
</template>

<script>
import request from "@/utils/request";

export default {
  data() {
    return {
      loading: false
    };
  },
  methods: {
    getPythonRecognition(userId, equipmentId){
      return request({
        url: 'ECG/recognition',
        method: 'get',
        params: {
          userId,
          equipmentId
        }
      })
    },
    handleClick() {
      // 显示加载状态
      this.loading = true;

      // 调用自定义的方法
      const requestAll = [this.getPythonRecognition(1, 4)]
      console.log(requestAll)
      this.loading_s()
      Promise.all(requestAll).then(res=>{
        // console.log("res:", res)
        console.log(res[0].data.pythonOutput)
        let heartStatus = res[0].data.pythonOutput[4]
        let heartMessage;
        if(heartStatus === "N"){
          heartMessage = "心拍正常"
        }else if(heartStatus === "A"){
          heartMessage = "房性早搏心拍(房性期前收缩)"
        }else if(heartStatus === "V"){
          heartMessage = "室性期前收缩"
        }else if(heartStatus === "L"){
          heartMessage = "左束支阻滞心拍"
        }else if(heartStatus === "R"){
          heartMessage = "右束支阻滞心拍"
        }

        this.$alert(heartMessage+'\n'+
            res[0].data.pythonOutput[0]+'\n'+
            res[0].data.pythonOutput[1]+'\n'+
            res[0].data.pythonOutput[2]+'\n'+
            res[0].data.pythonOutput[3]+'\n'+
            res[0].data.pythonOutput[4],
            '心率状态检查结果', {
          confirmButtonText: '确定',
          callback: action => {
            this.$message({
              type: 'info',
              message: `确定`
            });
          }
        });
      }).finally(_=>{
        this.closeLoading()
      })
      // 示例代码：模拟一个异步请求
      setTimeout(() => {
        // 隐藏加载状态
        this.loading = false;

        // 处理请求结果
        // TODO: 在这里编写你的代码
      }, 12000);
    }
  },
  props: {
    title: {
      type: String,
      default: '基本信息'
    },
    basicData: {
      type: Object,
      default: ()=> {}
    }
  },

}
</script>

<style lang="scss" scoped>
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
.itemBox{
  display: flex;
  margin-top: 15px;
  .item{
    width: 240px;
    height: 120px;
    border-radius: 10px;
    margin-left: 25px;
    padding: 10px;
    display: flex;
    flex-flow: column;
    justify-content: space-between;
    &:first-child{
      margin-left: 0;
    }

    .top{
      display: flex;
      justify-content: space-between;
      align-items: center;
      .left{
        font-size: 20px;
      }
      .right{
        font-size: 16px;
      }
    }
    .bot{
      display: flex;
      justify-content: space-between;
      align-items: center;
      .left{
        font-size: 16px;
        font-weight: bold;
        span{
          font-size: 24px;
          margin-right: 3px;
        }
      }
      .right{
        img{
          width: 25px;
        }
      }
    }
  }
  .normal{
    background-color: #f1fcff;
    color: #00a399;
  }
  .warning{
    background-color: #ffffee;
    color: #ff8300;
  }
  .error{
    background-color: #ffeeee;
    color: #ff0000;
  }
}
</style>