<template>
  <!--  标题-->
  <van-nav-bar
      title="世界详细"
      left-text="返回"
      left-arrow
      @click-left=""
  />
  <div style="width: 100%;">
    <h3 style="margin: 0px">标题</h3>
    <van-tag>标签</van-tag>    <van-tag>标签</van-tag><van-tag>标签</van-tag>
      <p style="margin: 0px">基础用法与原生 img 标签一致，可以设置 src、width、height、alt 等原生属性。</p>
  </div>
  <div  style="width: 100%">
    <p>这是一个说明这是一个说明这是一个说明这是一个说明
      这是一个说明这是一个说明
      这是一个说明</p>
  </div>
  <van-divider />
  <van-button>审核</van-button>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
const active = ref(2);
const list=ref([{}])

</script>

<style scoped>
.van-tab{
  flex: none!important;
}
</style>
