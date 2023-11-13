<template>
  <van-nav-bar
      title="标题"
      left-text="返回"
      right-text="创建章节"
      left-arrow
      @click-left="onClickLeft"
      @click-right="onClickRight"
  />
  <van-list
      v-model:loading="loading"
      :finished="finished"
      finished-text="没有更多了"
      @load="onLoad"
  >
  <van-cell v-for="item in list" title="章节名称 这是章节名称" is-link to="/admin/chapterIndex" />
  </van-list>
</template>

<script lang="ts" setup>
import {Toast} from "vant";
import {ref} from "vue";

const onClickLeft = () => history.back();
const onClickRight = () => Toast('按钮');

const list = ref([]);
const loading = ref(false);
const finished = ref(false);

const onLoad = () => {
  // 异步更新数据
  // setTimeout 仅做示例，真实场景中一般为 ajax 请求
  setTimeout(() => {
    for (let i = 0; i < 10; i++) {
      list.value.push(list.value.length + 1);
    }

    // 加载状态结束
    loading.value = false;

    // 数据全部加载完成
    if (list.value.length >= 20) {
      finished.value = true;
    }
  }, 1000);
};


</script>

<style scoped>

</style>
