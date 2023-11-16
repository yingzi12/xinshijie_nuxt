<template>
  <van-form @failed="submitForm">
    <van-cell-group inset>
      <van-field name="uploader" label="头像">
        <template #input>
          <van-uploader v-model="imageUrl" :after-read="afterRead" />
        </template>
      </van-field>
      <!-- 通过 pattern 进行正则校验 -->
      <van-field
          v-model="ruleForm.nickName"
          name="pattern"
          placeholder="昵称"
          :rules="[{ required: true, message: '请填写用户名' }]"
      />
      <van-field
          v-model="ruleForm.phonenumber"
          name="pattern"
          placeholder="手机号"
          :rules="[{ required: true, message: '请填写手机号' }]"
      />
      <van-field
          v-model="ruleForm.sign"
          rows="2"
          autosize
          type="textarea"
          maxlength="50"
          show-word-limit
          name="签名"
          label="签名"
          placeholder="签名"
          :rules="[{ required: true, message: '请填写签名' }]"
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
import {  getUser,updateUserBasic } from "@/api/admin/user";
import {useRouter} from "vue-router";
import {Dialog} from "vant";
const router = useRouter()

const config = useRuntimeConfig();

const baseUrl = inject("$baseUrl")
const imgUrl = config.app.imgUrl;

const uploadImgUrl = ref(baseUrl + "/common/uploadImage"); // 上传的图片服务器地址
const imageUrlPath = ref('')

//获取用户信息
const user = ref({})
const imageUrl=ref('')
function handleUser(){
  getUser().then(response => {
    user.value=response.data
    ruleForm.email=user.value.email
    ruleForm.avatar=user.value.avatar
    ruleForm.nickName=user.value.nickName
    ruleForm.phonenumber=user.value.phonenumber
    ruleForm.sign=user.value.sign
    imageUrl.value=imgUrl+user.value.avatar;
    imageUrlPath.value=user.value.avatar;
    //console.log(JSON.stringify(user))
  })
}
handleUser()

// 输入
const ruleForm = reactive({
  nickName: '',
  email: '',
  phonenumber: '',
  sign: '',
  avatar:'',
})

const submitForm =  () => {
  updateUserBasic(ruleForm).then(response => {
    Dialog.alert({
      message:"修改成功"}).then(() => {
      // on confirm
    })
    router.push("/user/index");
  })
}
const afterRead = (file) => {

  // 此时可以自行将文件上传至服务器
  console.log(file);
};

</script>

<style scoped>

</style>
