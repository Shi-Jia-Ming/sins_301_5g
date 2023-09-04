<template>
  <!-- 登录容器 -->
  <div class="login-container">
    <!-- 登录界面的表单 -->
    <el-form ref="loginForm" :model="loginForm" :rules="loginRules" class="login-form" auto-complete="on" label-position="left">

      <!-- 标题容器 -->
      <div class="title-container">
        <h3 class="title">Login</h3>
      </div>

      <!-- 表单的第一个字段输入：用户名 -->
      <el-form-item prop="username">
        <!-- 用户名字段的图标 -->
        <span class="svg-container">
          <svg-icon icon-class="user" />
        </span>
        <!-- 用户名的输入框 -->
        <el-input
          ref="username"
          v-model="loginForm.username"
          placeholder="Username"
          name="username"
          type="text"
          tabindex="1"
          auto-complete="on"
        />
      </el-form-item>


      <!-- 表单的第二个字段输入：密码 -->
      <el-form-item prop="password">
        <!-- 密码字段的图标 -->
        <span class="svg-container">
          <svg-icon icon-class="password" />
        </span>
        <!--密码的输入框 -->
        <el-input
          :key="passwordType"
          ref="password"
          v-model="loginForm.password"
          :type="passwordType"
          placeholder="Password"
          name="password"
          tabindex="2"
          auto-complete="on"
          @keyup.enter.native="handleLogin"
        />
        <!-- 显示密码按钮 -->
        <!-- showPwd函数：更改密码的状态，显示或隐藏 -->
        <span class="show-pwd" @click="showPwd">
          <svg-icon :icon-class="passwordType === 'password' ? 'eye' : 'eye-open'" />
        </span>
      </el-form-item>

      <!-- 表单的第三个字段：验证码 -->
      <el-form-item style="width: 60%" prop="identifycode">
        <div>
          <!-- 高是47px -->
          <el-input
              ref="identifycode"
              v-model="loginForm.identifycode"
              name="identifycode"
              placeholder="Identifycode"
              tabindex="3"
              @keyup.enter.native="handleLogin"
          />
        </div>
      </el-form-item>


      <!-- 验证码图片 -->
      <div @click="refreshCode">
        <identify-code
            :identifyCode="identifyCode"
            :contentWidth="150"
            :contentHeight="50"
            :fontSizeMin="50"
            style="vertical-align: middle;
                       height: 47px;
                       position: relative;
                       left: 300px;
                       top: -74px"
        />
      </div>

      <!-- 登录按钮 -->
      <el-button :loading="loading" type="primary" style="width:100%;margin-bottom:30px;" @click.native.prevent="handleLogin">Login</el-button>

<!--      <div class="tips">-->
<!--        <span style="margin-right:20px;">username: admin</span>-->
<!--        <span> password: 111111</span>-->
<!--      </div>-->

    </el-form>
  </div>
</template>

<script>
/* 导入validUsername用于检查用户名是否合符合要求 */
import { validUsername } from '@/utils/validate'
import request from "@/utils/request";
import IdentifyCode from "@/views/login/components/IdentifyCode";


export default {
  name: 'Login',
  components: {'identify-code': IdentifyCode},
  /* 变量 */
  data() {
    const validateUsername = (rule, value, callback) => {
      if (!validUsername(value)) {
        callback(new Error('Please enter the correct user name'))
      } else {
        callback()
      }
    }
    const validatePassword = (rule, value, callback) => {
      if (value.length < 6) {
        callback(new Error('The password can not be less than 6 digits'))
      } else {
        callback()
      }
    }
    const validateIdentifyCode = (rule, value, callback) => {
      if (value !== this.identifyCode) {
        callback(new Error('Error identifycode'))
      } else {
        callback()
      }
    }
    /* 生成验证码的字符范围 */
    const identifyCodes =  "abcdefhijkmnprstwxyz0123456789"
    /* 生成的验证码 */
    const identifyCode = ""
    return {
      loginForm: {
        username: 'admin',
        password: '111111',
        identifycode: ''
      },
      loginRules: {
        username: [{ required: true, trigger: 'blur', validator: validateUsername }],
        password: [{ required: true, trigger: 'blur', validator: validatePassword }],
        identifycode: [{required: true, trigger: 'blur', validator: validateIdentifyCode}]
      },
      loading: false,
      passwordType: 'password',
      redirect: "/equipment",
      identifyCode,identifyCodes
    }
  },
  /* 监听器 */
  watch: {
    $route: {
      handler: function(route) {
        this.redirect = route.query && route.query.redirect
      },
      immediate: true
    }
  },
  /* 方法 */
  methods: {
    showPwd() {
      if (this.passwordType === 'password') {
        this.passwordType = ''
      } else {
        this.passwordType = 'password'
      }
      this.$nextTick(() => {
        this.$refs.password.focus()
      })
    },
    handleLogin: function () {
      this.$refs.loginForm.validate(valid => {
        if (valid) {
          this.loading = true
          // this.$router.push({ path: this.redirect || '/' })
          /* 向后端发送请求 */
          request({
            url: '/systemUser/login',
            method: 'post',
            params: {
              userAccount: this.loginForm.username,
              password: this.loginForm.password
            }
          }).then((res) => {
            if (res.code === 200) {
              /* 直接进入equipment路由页面，在equipment界面设置路由守卫 */
              this.$router.push("/equipment")

              this.loading = false
            }

          }).catch(() => {
            this.loading = false
          })
        } else {
          return false
        }
      })
    },
    /* 生成随机数 */
    randomNum(min, max) {
      return Math.floor(Math.random() * (max - min) + min)
    },
    //刷新验证码
    refreshCode() {
      this.identifyCode = "";
      this.makeCode(this.identifyCodes, 4);
    },
    //生成验证码，l为生成验证码的长度
    makeCode(o, l) {
      for (let i = 0; i < l; i++) {
        //随机字符串拼接
        this.identifyCode += this.identifyCodes[
            this.randomNum(0, this.identifyCodes.length)
            ];
      }
    }
  },
  mounted() {
    this.identifyCode = "";
    this.makeCode(this.identifyCodes, 4);
  }
}
</script>

<style lang="scss">
/* 修复input 背景不协调 和光标变色 */
/* Detail see https://github.com/PanJiaChen/vue-element-admin/pull/927 */

$bg:#283443;
$light_gray:#fff;
$cursor: #fff;

@supports (-webkit-mask: none) and (not (cater-color: $cursor)) {
  .login-container .el-input input {
    color: $cursor;
  }
}

/* reset element-ui css */
.login-container {
  .el-input {
    display: inline-block;
    height: 47px;
    width: 85%;

    input {
      background: transparent;
      border: 0;
      -webkit-appearance: none;
      border-radius: 0;
      padding: 12px 5px 12px 15px;
      color: $light_gray;
      height: 47px;
      caret-color: $cursor;

      &:-webkit-autofill {
        box-shadow: 0 0 0 1000px $bg inset !important;
        -webkit-text-fill-color: $cursor !important;
      }
    }
  }

  .el-form-item {
    border: 1px solid rgba(255, 255, 255, 0.1);
    background: rgba(0, 0, 0, 0.1);
    border-radius: 5px;
    color: #454545;
  }
}
</style>

<style lang="scss" scoped>
$bg:#2d3a4b;
$dark_gray:#889aa4;
$light_gray:#eee;

.login-container {
  min-height: 100%;
  width: 100%;
  background-color: $bg;
  overflow: hidden;

  .login-form {
    position: relative;
    width: 520px;
    max-width: 100%;
    padding: 160px 35px 0;
    margin: 0 auto;
    overflow: hidden;
  }

  .tips {
    font-size: 14px;
    color: #fff;
    margin-bottom: 10px;

    span {
      &:first-of-type {
        margin-right: 16px;
      }
    }
  }

  .svg-container {
    padding: 6px 5px 6px 15px;
    color: $dark_gray;
    vertical-align: middle;
    width: 30px;
    display: inline-block;
  }

  .title-container {
    position: relative;

    .title {
      font-size: 26px;
      color: $light_gray;
      margin: 0 auto 40px auto;
      text-align: center;
      font-weight: bold;
    }
  }

  .show-pwd {
    position: absolute;
    right: 10px;
    top: 7px;
    font-size: 16px;
    color: $dark_gray;
    cursor: pointer;
    user-select: none;
  }
}
</style>
