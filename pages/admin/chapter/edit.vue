<template>
  <van-nav-bar
      title="编辑章节"
      left-text="返回"
      left-arrow
      @click-left="onClickLeft"
  />
  <van-form @submit="handleChapterAdd">
    <van-cell-group inset>
      <van-field
          v-model="form.title"
          name="章节名称"
          label="章节名称"
          placeholder="章节名称"
          :rules="[{ required: true, message: '请填写章节名称' }, { min: 2, max: 20, message: '用户名称长度必须介于 2 和 20 之间' }]"
      />
    </van-cell-group>
    <div>
      <h5>章节内容</h5>
      <van-field
          v-model="form.content"
          rows="15"
          autosize
          type="textarea"
          placeholder="请输入章节内容"
      />
    </div>
    <div style="margin: 16px;">
      <van-button round block type="primary" native-type="submit">
        提交
      </van-button>
    </div>
  </van-form>
</template>

<script lang="ts" setup>
import {getCurrentInstance, reactive, ref, toRefs} from 'vue'
import { getChapter } from "@/api/admin/chapter";
import { addDraftChapter } from "@/api/admin/draftChapter";

import {useRoute, useRouter} from "vue-router";
import {Dialog} from "vant";
const content =ref("<h1>请输入内容</h1>")

// 接收url里的参数
const route = useRoute();
const router = useRouter()
const sid = ref(null);
sid.value = route.query.sid;
const scid = ref(null);
scid.value = route.query.scid;
const scname = ref('');
scname.value = route.query.scname;
const sname = ref('');
sname.value = route.query.sname;
//console.log("世界id="+wid.value);
const config = useRuntimeConfig();

const data = reactive({
  form: {},
  queryParams: {
    pageNum: 1,

    title: undefined,
    sid:sid.value,
    pid:scid.value,
    level:1
  }
});
const { queryParams, form } = toRefs(data);

const handleChapterAdd =  () => {
  form.value.sid=sid.value
  form.value.isNew=2
  if(form.value.content.length<10&& form.value.content.length>=20000){
    Dialog.alert({message:"章节内容不能少于10个字符,大于20000个字符"});
    return;
  }
  addDraftChapter(form.value).then(response => {
        console.log("添加成功:"+JSON.stringify(response))
    router.push("/admin/draftchapterList");
   })
}
function handleInfo(){
  getChapter(sid.value,scid.value).then(response => {
    form.value = response.data
    form.value.sourceScid = response.data.id
  });
}
handleInfo()
const onClickLeft = () => history.back();

</script>

<style scoped>

</style>
