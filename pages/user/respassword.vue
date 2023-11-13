<template>
  <van-form @submit="onSubmit">
    <van-cell-group inset>
      <van-field
          v-model="form.oldPassword"
          type="password"
          name="密码"
          label="密码"
          placeholder="密码"
          :rules="[{ required: true, message: '请填写密码' }]"
      />
      <van-field
          v-model="form.newPassword"
          type="password"
          name="密码"
          label="密码"
          placeholder="密码"
          :rules="[{ required: true, message: '请填写密码' }]"
      />
      <van-field
          v-model="form.newPassword2"
          type="password"
          name="密码"
          label="密码"
          placeholder="密码"
          :rules="[{ required: true, message: '请填写密码' }]"
      />
    </van-cell-group>
    <div style="margin: 16px;">
      <van-button round block type="primary" native-type="submit">
        提交
      </van-button>
    </div>
  </van-form>
</template>

<script lang="ts" setup>
import {  resetPwd } from "@/api/admin/user";
import {reactive} from "vue";
import {Dialog} from "vant";

// do not use same name with ref
const form = reactive({
  oldPassword: '',
  newPassword: '',
  newPassword2: '',
})

const onSubmit = () => {
  if(!form.newPassword){
    Dialog.alert({message: "新密码不能为空"}).then(() => {
      // on close
    });
    return
  }
  if(!form.oldPassword){
    Dialog.alert({message: "老密码不能为空"}).then(() => {
      // on close
    });
    return;
  };
  if(form.newPassword != form.newPassword2 ){
    Dialog.alert({message: "重复密码不匹配"}).then(() => {
      // on close
    });
    return
  }
  resetPwd(form).then(response => {
    Dialog.alert({message: "修改成功"}).then(() => {
      // on close
    });
  })
  //console.log('submit!')
}
</script>

<style scoped>

</style>
