<template>
  <h3>故事管理</h3>
  <van-row class="user-links">
    <van-col span="4">
      <van-icon name="pending-payment" />
      内容
    </van-col>
    <van-col span="4">
      <van-icon name="records" />
      管理员列表
    </van-col>
    <van-col span="4">
      <van-icon name="tosend" />
      元素列表
    </van-col>
    <van-col span="4">
      <van-icon name="logistics" />
      元素审核
    </van-col>
    <van-col span="4">
      <van-icon name="logistics" />
      评论管理
    </van-col>
    <van-col span="4">
      <van-icon name="logistics" />
      讨论管理
    </van-col>
  </van-row>
  <van-list
      v-model:loading="loading"
      :finished="finished"
      finished-text="没有更多了"
      @load="onLoad"
  >
    <van-cell title="我是用户名" value="查看" />
    <van-cell title="我是用户名" value="查看" />
    <van-cell title="我是用户名" value="查看" />
    <van-cell title="我是用户名" value="查看" />
    <van-cell title="我是用户名" value="查看" />
    <van-cell title="我是用户名" value="查看" />

  </van-list>
</template>

<script lang="ts" setup>

</script>

<style scoped>
.user-links {
  padding: 15px 0;
  font-size: 12px;
  text-align: center;
  background-color: #fff;
}
.van-icon {
  display: block;
  font-size: 24px;
}

</style>
