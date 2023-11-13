<template>
  <van-nav-bar
      title="编辑章节草稿"
      left-text="返回"
      left-arrow
      @click-left="onClickLeft"
  />
  <van-form @submit="handleChapterUpdate">
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
import { getDraftChapter,updateDraftChapter } from "@/api/admin/draftChapter";
import {useRoute, useRouter} from "vue-router";
import {Dialog} from "vant";
const content =ref("")

// 接收url里的参数
const route = useRoute();
const router = useRouter()
const sid = ref(null);
sid.value = route.query.sid;
const dscid = ref(null);
dscid.value = route.query.dscid;
const scname = ref('');
scname.value = <string>route.query.scname;
const sname = ref('');
sname.value = <string>route.query.sname;
//console.log("世界id="+wid.value);
const {  appContext : { config: { globalProperties } }  } = getCurrentInstance();

const data = reactive({
  form: {},
  queryParams: {
    pageNum: 1,
    title: undefined,
    sid:sid.value,
    level:1
  }
});
const { queryParams, form } = toRefs(data);
const onClickLeft = () => history.back();
const handleChapterUpdate =  () => {
  form.value.sid=sid.value
  if(form.value.content.length<10&& form.value.content.length>=20000){
    Dialog.alert({message:"章节内容不能少于10个字符,大于20000个字符"});
    return;
  }
  updateDraftChapter(form.value).then(response => {
        console.log("修改成功:"+JSON.stringify(response))
        router.push("/admin/storyChapter?sid="+sid.value+"&sname="+sname.value+"&scid="+scid.value+"&scname="+scname.value);
   })
}
function handleInfo(){
  getDraftChapter(sid.value,dscid.value,1).then(response => {
    form.value=response.data
    content.value=form.value.content
    console.log("content:"+content.value)
  });
}
handleInfo()

</script>

<style scoped>

</style>
