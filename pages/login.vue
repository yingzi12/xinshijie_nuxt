<template>
  <!--  标题-->
  <van-nav-bar
      title="登录"
      left-text="返回"
      left-arrow
      @click-left="onClickLeft"
  />
  <van-divider style="margin: 0px"/>
  <van-form @submit="handleLogin">
    <van-cell-group inset>
      <van-field
          v-model="loginForm.username"
          name="用户名"
          label="用户名"
          placeholder="用户名"
          :rules="[{ required: true, message: '请填写用户名' }]"
      />
      <van-field
          v-model="loginForm.password"
          type="password"
          name="密码"
          label="密码"
          placeholder="密码"
          :rules="[{ required: true, message: '请填写密码' }]"
      />
      <img  :src="codeUrl" @click="getCode"/>
      <van-field
          v-model="loginForm.code"
          center
          clearable
          label="验证码"
          placeholder="请输入验证码"
          :rules="[{ required: true, message: '请填写密码' }]"
      >
      </van-field>
    </van-cell-group>
    <div style="margin: 16px;">
      <van-button round block type="primary" native-type="submit" >
        提交
      </van-button>
    </div>
  </van-form>
  <van-row>
    <van-col span="12"><van-button @click="handleRegister">注册</van-button></van-col>
    <van-col span="12"  ><van-button  style="float: right;" @click="handleFindPassword">找回密码</van-button></van-col>
  </van-row>
  <div>
    <p style="text-align:center">互联网宗教信息服务许可证 编号：沪（2022）0000000</p>
    <p style="text-align:center">copyright © 2002-2022 m.aiavr.com</p>
  </div>
</template>

<script lang="ts" setup>
import {getCurrentInstance, ref} from 'vue';
import { getCodeImg } from "@/api/login";
import Cookies from "js-cookie";
import { encrypt, decrypt } from "@/utils/jsencrypt";
import useUserStore from "@/store/modules/user";
import { Toast } from 'vant';

import {useRouter} from "vue-router";
const router = useRouter();

const username = ref('');
const password = ref('');
const captcha = ref('');

const userStore = useUserStore()
const { proxy }   = getCurrentInstance();

const loginForm = ref({
  username: "",
  password: "",
  rememberMe: false,
  code: "",
  uuid: ""
});

const loginRules = {
  username: [{ required: true, trigger: "blur", message: "请输入您的账号" }],
  password: [{ required: true, trigger: "blur", message: "请输入您的密码" }],
  code: [{ required: true, trigger: "change", message: "请输入验证码" }]
};

const codeUrl = ref("");
const loading = ref(false);
// 验证码开关
const captchaEnabled = ref(true);
// 注册开关
const register = ref(true);
const redirect = ref(undefined);

function handleLogin() {
      loading.value = true;
      // 勾选了需要记住密码设置在 cookie 中设置记住用户名和密码
      if (loginForm.value.rememberMe) {
        Cookies.set("username", loginForm.value.username, { expires: 30 });
        Cookies.set("password", encrypt(loginForm.value.password), { expires: 30 });
        Cookies.set("rememberMe", loginForm.value.rememberMe, { expires: 30 });
      } else {
        // 否则移除
        Cookies.remove("username");
        Cookies.remove("password");
        Cookies.remove("rememberMe");
      }
      // 调用action的登录方法
      userStore.login(loginForm.value).then(() => {
        router.push({ path: redirect.value || "/" });
      }).catch(() => {
        loading.value = false;
        // 重新获取验证码
        if (captchaEnabled.value) {
          getCode();
        }
      });
}

function getCode() {
  getCodeImg().then(res => {
    captchaEnabled.value = res.captchaEnabled === undefined ? true : res.captchaEnabled;
    if (captchaEnabled.value) {
      codeUrl.value = "data:image/gif;base64," + res.img;
      loginForm.value.uuid = res.uuid;
    }
  });
}

function getCookie() {
  const username = Cookies.get("username");
  const password = Cookies.get("password");
  const rememberMe = Cookies.get("rememberMe");
  loginForm.value = {
    username: username === undefined ? loginForm.value.username : username,
    password: password === undefined ? loginForm.value.password : decrypt(password),
    rememberMe: rememberMe === undefined ? false : Boolean(rememberMe)
  };
}
const onClickLeft = () => history.back();

getCode();
getCookie();

function  handleRegister(){
  router.push("/register")
}
function  handleFindPassword(){
  router.push("/findpassword")
}
</script>

<style scoped>
p{
  margin: 0px;
  font-size: 12px;
  color: #999999;
}
</style>
