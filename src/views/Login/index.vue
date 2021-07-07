<template>
  <div id="login-wrap">
    <div class="container"
         id="container"
         :class="{
    'left-active': isLogin,
    'right-active': !isLogin
  }">
      <!-- 登陆 -->
      <div class="form-container sign-in-container">
        <n-form :model="loginForm"
                ref="formRef"
                label-placement="left"
                label-align="right"
                :style="{
     
    }">
          <n-form-item label="账号："
                       path="account">
            <n-input placeholder="请输入账号"
                     v-model:value="loginForm.account" />
          </n-form-item>
          <n-form-item label="密码："
                       path="account">
            <n-input placeholder="请输入密码"
                     v-model:value="loginForm.password" />
          </n-form-item>
          <n-form-item label=""
                       path="role">
            <n-radio-group v-model:value="loginForm.role">
              <n-radio-button value="student">学生</n-radio-button>
              <n-radio-button value="teacher">老师</n-radio-button>
              <n-radio-button value="club">社长</n-radio-button>
              <n-radio-button value="union">社联</n-radio-button>
            </n-radio-group>
          </n-form-item>
          <button class="sign-in-btn"
                  @click="handleLogin">登录</button>
          <a class="switch-btn"
             id="signIn"
             @click="switchForm">注册社团</a>
        </n-form>
      </div>
      <!-- 注册 -->
      <div class="form-container sign-up-container">
        <n-form :model="registerForm"
                ref="formRef"
                label-placement="left"
                label-align="right">
          <n-form-item label="账号："
                       path="account">
            <n-input placeholder="请输入账号"
                     v-model:value="registerForm.club_account" />
          </n-form-item>
          <n-form-item label="密码："
                       path="password">
            <n-input placeholder="请输入密码"
                     v-model:value="registerForm.club_password" />
          </n-form-item>
          <n-form-item label="名字：">
            <n-input placeholder="请输入社团名"
                     v-model:value="registerForm.club_name" />
          </n-form-item>
          <n-form-item label="社长：">
            <n-input placeholder="请输入社长姓名"
                     v-model:value="registerForm.president" />
          </n-form-item>
          <n-form-item label="学号：">
            <n-input placeholder="请输入社长学号"
                     v-model:value="registerForm.president_id" />
          </n-form-item>
          <n-form-item label="老师：">
            <n-input placeholder="请输入指导老师姓名"
                     v-model:value="registerForm.teacher_name" />
          </n-form-item>
          <n-form-item label="工号："
                       path="account">
            <n-input placeholder="请输入指导老师工号"
                     v-model:value="registerForm.teacher_id" />
          </n-form-item>
          <button class="sign-up-btn"
                  @click="handleRegister">注册</button>
          <a class="switch-btn"
             id="signUp"
             @click="switchForm">去登陆</a>
        </n-form>
      </div>
      <div class="illustration-container">
        <div class="illustration-wrapper">
          <div class="illustration illustration-left">
          </div>
          <div class="illustration illustration-right">
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref } from 'vue'
import { onMounted } from "vue"
import { useMessage, useDialog } from 'naive-ui'
import { useRouter } from 'vue-router'
import request from '../../networks/index'
export default {

  setup (props) {
    const router = useRouter()
    const info = useMessage();
    const dialog = useDialog();
    let isLogin = ref(true)
    const switchForm = () => {
      isLogin.value = !isLogin.value
    }

    const loginForm = ref({
      account: null,
      password: null,
      role: null,
    })

    const handleLogin = () => {
      dialog.success({
        title: '确认',
        content: '你确定要登录？',
        positiveText: '确定',
        negativeText: '不要了',
        onPositiveClick: () => {

          request({
            url: 'login',
            method: 'post',
            data: loginForm.value
          }).then(res => {
            const { data: { id, token, role, message } } = res

            if (token) {
              console.log(id);
              info.success('登录成功')
              sessionStorage.setItem('id', id)
              sessionStorage.setItem('token', token)
              sessionStorage.setItem('role', role)
              router.push({
                path: `/${role}`,
                params: {
                  id: id
                }
              })
            } else {
              console.log(message);
              info.error(message)
            }

          }).catch(err => {
            console.log(err);
            info.error('登录失败')
          })
        },
        onNegativeClick: () => {
          info.success('不确定')
        }
      })
    }

    const registerForm = ref({
      club_account: null,
      club_password: null,
      club_name: null,
      president: null,
      president_id: null,
      teacher_name: null,
      teacher_id: null,
      status: 0
    })
    const handleRegister = () => {
      dialog.success({
        title: '确认',
        content: '你确定要注册？',
        positiveText: '确定',
        negativeText: '不要了',
        onPositiveClick: () => {
          request({
            url: 'register',
            method: 'post',
            data: registerForm.value
          }).then(res => {
            info.success('注册成功，请耐心等待审核')
            setTimeout(() => {
              window.location.reload()
            })

          }).catch(err => {
            console.log(err);
            info.error('注册申请提交失败, 请检查社长学号或教师工号是否有误')
          })
        },
        onNegativeClick: () => {
          info.info('不确定')
        }
      })
    }


    onMounted(() => {

    })
    return {
      isLogin,
      switchForm,

      loginForm,
      handleLogin,

      registerForm,
      handleRegister

    }
  }
}
</script>

<style>
  #login-wrap {
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .container {
    background-color: #fff;
    border-radius: 40px;
    position: relative;
    overflow: hidden;
    width: 768px;
    max-width: 100%;
    height: 480px;
  }

  .form-container form {
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding: 0 30px;
  }

  .validation-in-btn {
    position: absolute;
    top: 0;
    width: 35px;
    height: 30px;
    box-sizing: border-box;
    border: 1px solid #fe6b57;
    background: #fff url(../image/向右icon.png) no-repeat 7px 7px;
    background-size: 18px 13px;
    z-index: 3;
    cursor: pointer;
  }

  .validation-in-tip {
    position: absolute;
    width: 100%;
    margin: 5px 0;
    text-align: center;
    z-index: 2;
    font-size: 13px;
    color: #fe6b57;
    font-weight: bold;
    user-select: none;
  }

  i {
    font-size: 18px;
    vertical-align: -3px;
  }

  .validation-in-bg {
    position: absolute;
    height: 100%;
    background: rgba(252, 227, 223, 1.5);
    z-index: 1;
  }

  button {
    outline: none;
    border: none;
    border-radius: 8px;
    color: #fff;
    font-weight: bold;
    font-size: 15px;
    height: 45px;
    width: 240px;
  }

  .sign-in-btn {
    background: linear-gradient(90deg, #f6ac9f, #fe6b57);
    position: relative;
    transition: all 0.2s;
  }

  .sign-up-btn {
    background: linear-gradient(90deg, #ffcca9, #ffc182);
    position: relative;
    transition: all 0.2s;
  }

  .sign-up-btn::after,
  .sign-in-btn::after {
    content: "";
    position: absolute;
    top: 15px;
    left: 0;
    width: 240px;
    height: 30px;
    background-image: linear-gradient(
      rgba(0, 0, 0, 0),
      rgba(255, 255, 255, 0.4),
      rgba(0, 0, 0, 0)
    );
    transform: rotate(-45deg) translate(0, -360px);
  }

  .sign-up-btn:hover,
  .sign-in-btn:hover {
    cursor: pointer;
    box-shadow: 3px 3px 3px rgba(0, 0, 0, 0.1);
  }

  .sign-in-btn:hover::after,
  .sign-up-btn:hover::after {
    transition: 0.6s;
    transform: rotate(-45deg) translate(0, 100px);
  }

  a.switch-btn {
    color: #f6ac9f;
    /* 过渡效果 */
  }

  a.switch-btn:hover {
    text-decoration: underline !important;
  }

  .form-container {
    position: absolute;
    top: 0;
    height: 100%;
  }
  /* 登录页 */
  .sign-in-container {
    /* 定位在右边 */
    right: 0;
    width: 50%;
    /* 覆盖在注册页上面 */
    z-index: 2;
    /* 登陆换成注册时的过渡效果 */
    transition: transform 0.6s ease-out;
  }
  /* 注册页 */
  .sign-up-container {
    right: 0;
    width: 50%;
    /* 隐藏注册页 */
    opacity: 0;
    /* 注册页在下面 */
    z-index: 1;
    /* 注册换成登陆时的过渡效果 */
    transition: all 0.6s ease-out;
  }
  /* 插画层 */
  .illustration-container {
    position: absolute;
    /* 插画层在左边 */
    left: 0;
    /* 只显示一张插画 */
    width: 50%;
    height: 100%;
    overflow: hidden;
    /* 过渡效果 */
    transition: all 0.6s ease-out;
    /* 层级关系最高 */
    z-index: 100;
  }

  .illustration-wrapper {
    height: 100%;
    width: 200%;
    position: relative;
    left: -100%;
  }

  .illustration {
    position: absolute;
    width: 50%;
    height: 100%;
  }

  .illustration-left {
    background: linear-gradient(90deg, #ffcca9, #ffc182);
    background-size: 422px 480px;
  }
  /* 背景图 */
  .illustration-right {
    /* 初始时被显现 */
    background: linear-gradient(90deg, #f6ac9f, #fe6b57);
    background-size: 465px 480px;
    right: 0;
  }

  /* 动画类 .right-active*/
  /* 将登陆页切换到右侧，且隐藏 */
  .right-active .sign-in-container {
    left: 0;
    z-index: -1;
  }

  /* 将插画页换到左边 */
  .right-active .illustration-container {
    left: 50%;
  }

  /* 使注册页显示到登陆页上面 */
  .right-active .sign-up-container {
    /* 使注册页出现 */
    opacity: 1;
    z-index: 3;
    left: 0;
  }

  .right-active .illustration-wrapper {
    left: 0;
  }

  .form-container .form-title {
    user-select: none;
    font-size: 24px;
    font-weight: bold;
  }

  .sign-in-title,
  .sign-in-tip {
    color: #f6ac9f;
  }

  .sign-up-title,
  .sign-up-tip {
    color: #e0b9ba;
  }

  .form-container .form-tip {
    user-select: none;
    font-size: 16px;
    font-weight: bold;
  }

  .sign-in-header {
    margin: 0 0 10px -65px;
  }

  .sign-up-header {
    margin: 0 0 10px -85px;
  }

  .input-box {
    width: 75%;
    position: relative;
  }

  .username-font,
  .password-font {
    position: absolute;
    user-select: none;
    background-color: #fff;
    font-size: 12px;
    padding: 0 5px;
    color: #f6ac9f;
  }

  .username-font {
    top: 10px;
    left: 13px;
  }

  .register-username-font,
  .register-password-font {
    color: #e0b9ba;
  }

  .password-font {
    top: 72px;
    left: 15px;
  }

  .sign-in-forget,
  .sign-up-forget {
    float: right;
    font-size: 12px;
    color: #f6ac9f;
    user-select: none;
    margin-bottom: 20px;
  }

  .sign-up-forget {
    color: #e0b9ba;
  }

  #signUp,
  #signIn {
    display: block;
    text-align: center;
    width: 220px;
    text-decoration: none;
    font-size: 12px;
    margin-top: 8px;
  }

  .sign-in-input:hover {
    box-shadow: 0 0 0 4px rgb(254 107 87 / 10%);
  }

  .sign-up-input:hover {
    box-shadow: 0 0 0 4px rgb(247 179 96 / 10%);
  }

  .tip {
    background-color: rgba(255, 255, 255, 0.2);
    position: fixed;
    width: 768px;
    top: 5%;
    left: 50%;
    transform: translate(-50%, -50%);
    text-align: center;
    padding: 10px;
    font-size: 16px;
    border-radius: 40px;
    cursor: pointer;
    color: #f6ac9f;
    display: none;
  }
  .invalid-border {
    border: 1px solid red !important;
  }
  .invalid-tip {
    color: red !important;
  }
  .success-login {
    position: absolute;
    top: 155px;
    right: 335px;
    width: 384px;
    height: 480px;
    background-color: rgba(255, 255, 255, 0.93);
    border-radius: 0 40px 40px 0;
    z-index: 100;
    display: none;
  }
  .success-login .logging-in {
    position: absolute;
    top: 55%;
    left: 50%;
    transform: translate(-50%, -50%);
    border-bottom: 3px solid #f2f2f2;
    color: #f2f2f2;
  }
  .success-login i {
    position: absolute;
    top: 160px;
    left: 160px;
    font-size: 55px;
    color: #fe6b57;
  }
  .success-login .logging-in::before {
    content: "Loading...";
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    color: #fe6b57;
    overflow: hidden;
    border-bottom: 3px solid #fe6b57;
    animation: logging 5s linear infinite;
  }

  @keyframes logging {
    0% {
      width: 0;
    }
    100% {
      width: 100%;
    }
  }
</style>