<script lang="ts" setup>
const active = ref(0);
const world = {
  active: '/icon/solution2.svg',
  inactive:
      '/icon/earth.svg',
};
const story = {
  active: '/icon/read.svg',
  inactive:
      '/icon/read_black.svg',
};
</script>

<template>
  <van-tabbar v-model="active">
    <van-tabbar-item icon="home-o">主页</van-tabbar-item>
    <van-tabbar-item >
      <span>世界</span>
      <template #icon="props">
        <img :src="props.active ? world.active : world.inactive" />
      </template>
    </van-tabbar-item>
    <van-tabbar-item >
      <span>故事</span>
      <template #icon="props">
        <img :src="props.active ? story.active : story.inactive" />
      </template>
    </van-tabbar-item>
    <van-tabbar-item icon="search">搜索</van-tabbar-item>
    <van-tabbar-item icon="friends-o">用户</van-tabbar-item>

    <van-tabbar-item icon="setting-o">管理</van-tabbar-item>
  </van-tabbar>
</template>

<style scoped>

</style>