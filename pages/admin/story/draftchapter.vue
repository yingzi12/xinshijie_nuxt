<template>
  <!--  标题-->
  <van-nav-bar
      :title="story.title"
      left-text="返回"
      right-text="目录"
      left-arrow
      @click-left="onClickLeft"
      @click-right="onClickRight"
  />
  <div >
    <!--  元素名称-->
    <div >
      <h1 class="title">{{ chapter.title }}</h1>
      <div class="lessen"><span>更新时间:</span><el-tag size="small">{{chapter.updateTime}}</el-tag></div>
    </div>
    <el-divider />
    <div   style="margin-left: 25px">
      <div v-html="chapter.content"> </div>
    </div>
  </div>
  <div>
    <van-button v-if="chapter.status == 7" @click="handleAudit">审核</van-button>
  </div>

</template>

<script lang="ts" setup>
//元素内容
import {  ref } from 'vue'
import {  getDraftChapterAdmin,audit } from "@/api/admin/draftChapter";
//接受参数
import { useRoute ,useRouter}  from "vue-router";
import {Dialog} from "vant";

const router = useRouter()
// 接收url里的参数
const route = useRoute();

//世界信息
const dscid = ref(null);
const sid = ref(null);
dscid.value = route.query.dscid;
sid.value = route.query.sid;
const wid = ref(null);
wid.value = route.query.wid;

const chapter=ref({})

/** 查询元素详细 */
function getInfo() {
  console.log("sid:"+JSON.stringify(sid))
  getDraftChapterAdmin(sid.value,dscid.value).then(response => {
    chapter.value = response.data
  });
}

function handleAudit(){
  //console.log("发布："+JSON.stringify(row))
  audit(sid.value,dscid.value).then(response => {
    Dialog.alert({message:'发布成功'})
    router.push("/admin/draftchapterList?sid="+sid.value+"&wid="+wid.value);
  });
}
const story=ref({})
getInfo();
const onClickLeft = () => history.back();
const onClickRight = () => {
  router.push("/admin/draftchapterList?sid="+sid.value+"&wid="+wid.value);
}
</script>

<style >
img{
  width: 100%;
}
</style>
