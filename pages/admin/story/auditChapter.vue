<template>
  <van-nav-bar
      title="待审核章节"
      left-text="返回"
      left-arrow
      @click-left="onClickLeft"
  />
</template>

<script lang="ts" setup>
const onClickLeft = () => history.back();

</script>

<style scoped>

</style>
