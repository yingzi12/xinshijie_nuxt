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
    <van-button v-if="chapter.previous" :to="{path:'/chapter/index', query: {sid:chapter.previous.sid,wid:chapter.previous.wid,sname:chapter.previous.sname,wname:chapter.previous.wname,scid:chapter.previous.id}}" >上一章 {{chapter.previous.title}}</van-button>
    <van-button  v-if="chapter.next" :to="{path:'/chapter/index', query: {sid:chapter.next.sid,wid:chapter.next.wid,sname:chapter.next.sname,wname:chapter.next.wname,scid:chapter.next.id}}" >下一章 {{chapter.next.title}}</van-button>
  </div>

</template>

<script lang="ts" setup>
//元素内容
import {  ref } from 'vue'
import {  getChapter } from "@/api/wiki/chapter";
import {  getStory } from "@/api/wiki/story";
//接受参数
import { useRoute ,useRouter}  from "vue-router";

const router = useRouter()
// 接收url里的参数
const route = useRoute();

//世界信息
const scid = ref(null);
const sid = ref(null);
scid.value = route.query.scid;
sid.value = route.query.sid;
const wid = ref(null);
wid.value = route.query.wid;

const chapter=ref({})

/** 查询元素详细 */
function getInfo() {
  console.log("sid:"+JSON.stringify(sid))
  getChapter(sid.value,scid.value).then(response => {
    chapter.value = response.data
  });
}

function handleEdit(){
  router.push("/admin/storyChapterEdit?sid="+ sid.value+"&scid=" +scid.value+"&sname=" +chapter.value.sname+"&wname=" +chapter.value.wname+"&wid=" +wid.value)
}
const story=ref({})
/** 查询世界详细 */
function handStory() {
  getStory(sid.value).then(response => {
    //console.log("查询世界详细:"+JSON.stringify(response))
    story.value = response.data
  });
}
handStory()
getInfo();
const onClickLeft = () => history.back();
const onClickRight = () => {
  router.push("/chapter/list?sid="+sid.value+"&wid="+wid.value);
}
</script>

<style >
img{
  width: 100%;
}
</style>
