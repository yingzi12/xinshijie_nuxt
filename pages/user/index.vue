<template>
  <div style="margin: 10px">
    <van-row>
      <van-col span="8">
         <van-image
          round
          fit="cover"
          width="80%"
          height="80%"
          :src="imageUrl"/>
      </van-col>
      <van-col span="16">
        <h3  style="margin: 0px">{{user.userName}}( {{ user.nickName }} )</h3>
        <p style="margin: 0px">id:{{ user.userId }}</p>
        <p style="margin: 0px">{{ user.sign }}</p>
      </van-col>
    </van-row>
  </div>
  <div>
    <van-row class="user-links">
      <van-col span="6">
        <router-link to="/admin/storyList">
        <van-icon name="pending-payment" />
        故事管理
        </router-link>
      </van-col>
      <van-col span="6">
        <router-link to="/admin/draftchapterList">
        <van-icon name="records" />
        章节草稿
        </router-link>
      </van-col>
      <van-col span="6">
        <router-link to="/admin/worldList">
        <van-icon name="tosend" />
        世界管理
        </router-link>
      </van-col>
      <van-col span="6">
        <router-link to="/admin/draftElementList">
        <van-icon name="logistics" />
        元素草稿
        </router-link>
      </van-col>
    </van-row>

    <van-cell-group class="user-group">
      <van-cell icon="records" title="我的关注" is-link to="/admin/follow"/>
      <van-cell icon="records" title="我的收藏" is-link to="/admin/harding"/>
    </van-cell-group>

    <van-cell-group>
      <van-cell icon="gold-coin-o" title="修改信息" is-link  to="/user/edit" />
      <van-cell icon="gift-o" title="修改密码" is-link  to="/user/updatePassword"/>
      <van-cell icon="gift-o" title="退出登录" is-link @click="logout()" />
    </van-cell-group>
  </div>
</template>

<script lang="ts" setup>
import useUserStore from '@/store/modules/user'
import {  getUser } from "@/api/admin/user";
import {inject, ref} from "vue";
const user = ref({})
const imgUrl = inject("$imgUrl")

const imageUrl=ref('')
function handleUser(){
  getUser().then(response => {
    user.value=response.data
    imageUrl.value=imgUrl+response.data.avatar;
    //console.log(JSON.stringify(user))
  })
}
handleUser();
const userStore = useUserStore()

function logout() {
  userStore.logOut().then(() => {
    location.href = '/index';
  })
}

</script>

<style lang="less">
.user {
  &-poster {
    width: 100%;
    height: 53vw;
    display: block;
  }

  &-group {
    margin-bottom: 15px;
  }

  &-links {
    padding: 15px 0;
    font-size: 12px;
    text-align: center;
    background-color: #fff;

    .van-icon {
      display: block;
      font-size: 24px;
    }
  }
}
</style>
