<template>
  <!--  标题-->
  <!--  标题-->
  <van-nav-bar
      title="找回密码"
      left-text="返回"
      left-arrow
      @click-left="onClickLeft"
  />
  <van-cell-group inset>
    <van-field
        v-model="email"
        center
        clearable
        label="电子邮箱"
        placeholder="请输入电子邮箱"
    >
      <template #button>
        <van-button size="small" type="primary">发送验证邮件</van-button>
      </template>
    </van-field>
  </van-cell-group>
  <van-divider style="margin: 0px"/>
  <div>
    <p style="text-align:center">互联网宗教信息服务许可证 编号：沪（2022）0000000</p>
    <p style="text-align:center">copyright © 2002-2022 m.aiavr.com</p>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
const onClickLeft = () => history.back();
const email=ref("")
</script>

<style scoped>
p{
  margin: 0px;
  font-size: 12px;
  color: #999999;
}
</style>
