<script lang="ts" setup>
</script>

<template>
  <div>
    <div class="header h-ind">
      <a href="./" class="logo-a">
        <img src="/style/image/logo.png" alt="">
      </a>
      <div class="header-operate">
        <div class="wapapp app1">
          <a style="color:red" href="https://www.51xs.uk/app/">APP客户端</a>
        </div>
        <div class="LoginBox mb11" id="LoginBox">
          <div class="R-Btn b"><a href="https://www.51xs.uk/?member/ucenter/">会员</a></div>
        </div>
        <a id="toggle-nav" href="javascript:shownav();" class="icon icon-more"></a>
      </div>
    </div>
    <slot />
  </div>
</template>

<style scoped>

</style>