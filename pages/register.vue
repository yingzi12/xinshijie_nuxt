<template>
  <!--  标题-->
  <van-nav-bar
      title="注册"
      left-text="返回"
      left-arrow
      @click-left="onClickLeft"
  />
  <van-form @failed="onFailed">
    <van-cell-group inset>
      <!-- 通过 pattern 进行正则校验 -->
      <van-field
          label="用户名"
          v-model="value1"
          name="pattern"
          placeholder="用户名,注册成功将不可修改"
          :rules="[{ pattern, message: '请输入正确内容' }]"
      />
      <!-- 通过 pattern 进行正则校验 -->
      <van-field
          label="昵称"
          v-model="value1"
          name="pattern"
          placeholder="昵称"
          :rules="[{ pattern, message: '请输入正确内容' }]"
      />
      <!-- 通过 validator 进行函数校验 -->
      <van-field
          label="密码"
          type="password"
          v-model="value2"
          name="validator"
          placeholder="密码"
          :rules="[{ validator, message: '请输入正确内容' }]"
      />
      <!-- 通过 validator 进行函数校验 -->
      <van-field
          label="重复密码"
          type="password"
          v-model="value2"
          name="validator"
          placeholder="重复密码"
          :rules="[{ validator, message: '请输入正确内容' }]"
      />
      <!-- 通过 validator 返回错误提示 -->
      <van-field
          label="电子邮箱"
          v-model="value3"
          name="validatorMessage"
          placeholder="电子邮箱"
          :rules="[{ validator: validatorMessage }]"
      />
    </van-cell-group>
    <div style="margin: 16px;">
      <van-button round block type="primary" native-type="submit">
        提交
      </van-button>
    </div>
  </van-form>
  <van-divider style="margin: 0px"/>
  <div>
    <p style="text-align:center">互联网宗教信息服务许可证 编号：沪（2022）0000000</p>
    <p style="text-align:center">copyright © 2002-2022 m.aiavr.com</p>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import { Toast } from 'vant';
const onClickLeft = () => history.back();

const value1 = ref('');
const value2 = ref('');
const value3 = ref('abc');
const pattern = /\d{6}/;

// 校验函数返回 true 表示校验通过，false 表示不通过
const validator = (val: string) => /1\d{10}/.test(val);

// 校验函数可以直接返回一段错误提示
const validatorMessage = (val: string) => `${val} 不合法，请重新输入`;

// 校验函数可以返回 Promise，实现异步校验
const asyncValidator = (val: string) =>
    new Promise((resolve) => {
      Toast.loading('验证中...');

      setTimeout(() => {
        Toast.clear();
        resolve(val === '1234');
      }, 1000);
    });

const onFailed = (errorInfo: string) => {
  console.log('failed', errorInfo);
};
</script>

<style scoped>
p{
  margin: 0px;
  font-size: 12px;
  color: #999999;
}
</style>
