<template>
  <!--  标题-->
  <van-nav-bar
      title="故事详细"
      left-text="返回"
      left-arrow
      @click-left="onClickLeft"

  />
  <div style="width: 100%;">
    <van-row>
      <van-col span="8" style="text-align:center;">
        <van-image  width="70" height="100"
                    :src="imgUrl+story.imgUrl"
        />
      </van-col>
      <van-col span="16">
        <div style="margin-top: 8px">

        <van-badge :content="story.ranks">
          <h3 style="margin: 0px" >{{ story.name }} <van-tag v-if="story.source=='原创'">原创</van-tag></h3>
        </van-badge>
          <h5 style="margin: 0px">世界:{{ story.wname }}</h5>
        <div>
          <van-tag round  type="danger"  size="default">{{ storyTypesMap.get(story.types) }}</van-tag>
          <van-tag round  v-if="story.source != null " v-for="tag in story.source.split(';')"   size="default" type="success">{{tag}}</van-tag>
          <van-tag round  v-if="story.tags != null "  v-for="tag in story.tags.split(';')"   size="default" type="danger">{{tag}}</van-tag>
        </div>
        <div>
          <van-button round  type="primary" size="small">收藏</van-button>       <van-button round  type="primary" size="small">讨论</van-button>
        </div>
        </div>
      </van-col>
    </van-row>
  </div>
  <div  style="width: 100%">
    <div v-html="story.intro" />
  </div>
  <van-divider />
  <van-tabs v-model:active="active">
    <van-tab title="简介">
      <div  style="width: 100%">
        <div v-html="story.description" />
      </div>
    </van-tab>
    <van-tab title="章节">
      <van-list>
        <van-cell v-for="chapter in chapterList"  :title="chapter.title" :value="chapter.updateTime"  :to="{path:'/chapter/index', query: {sid:chapter.sid,wid:chapter.wid,sname:chapter.sname,wname:chapter.wname,scid:chapter.id}}"/>
      </van-list>
      <van-button type="primary"  size="mini" @click="handleChapter">更多</van-button>
    </van-tab>
    <van-tab title="作者">
      <van-list>
        <van-cell v-for="author in authorList"  :title="author.userName"  :value="author.ranks" :label="author.sign" />
      </van-list>
    </van-tab>
  </van-tabs>
  <van-divider />
  <!--  评论  -->
  <div id="u2_text" class="text ">
    <span>评论</span>
    <span style="float: right">更多</span>
  </div>
  <van-list>
    <van-cell v-for="comment in commentList">
      <van-row >
        <van-col span="8" style="text-align:center;">
          <van-image
              round
              width="3rem"
              height="3rem"
              :src="imgUrl+comment.circleUrl"
          /></van-col>
        <van-col span="16">
          <h4 style="margin: 0rem">{{ comment.createName }}</h4>
          <p style="margin: 0rem">{{ comment.comment }}</p>
          <p style="margin: 0rem">{{ comment.createTime }}</p>
        </van-col>
      </van-row>
    </van-cell>
  </van-list>

</template>

<script lang="ts" setup>
import {getCurrentInstance, inject, reactive, ref, toRefs} from 'vue'
//接受参数
import {useRoute, useRouter} from "vue-router";  // 引用vue-router
import {  getStory } from "@/api/wiki/story";
import {  listComment } from "@/api/wiki/comment";
import {  listAuthor } from "@/api/wiki/author";
import { listChapter } from "@/api/wiki/chapter";
const {  appContext : { config: { globalProperties } }  } = getCurrentInstance();

const router = useRouter()
// 接收url里的参数
const route = useRoute();

const sid = ref(null);
sid.value = route.query.sid;
const wid = ref(null);
wid.value = route.query.wid;
const wname = ref('');

const storyTypesMap=new Map([
  [6,"科学"],
  [1,"武侠"],
  [2,"仙侠"],
  [3,"魔幻"],
  [4,"奇幻"],
  [5,"其他"]
])

//console.log(route.query.id,"参数");
//世界信息
const story=ref({})
//评论信息
const commentList=ref([])
//管理员信息
const authorList=ref([])
//分页信息
const dateRange = ref([]);
//管理员信息
const chapterList = ref([]);
//评论内容与通用分页查询条件
const data = reactive({
  commentForm: {},
  queryParams: {
    pageNum: 1,
    pageSize:3,
    wid: undefined,
    sid: sid.value,
    level: 1,
  },
  rules: {
    comment: [{ required: true, message: "评论不能为空", trigger: "blur" }],
  }
});

const { queryParams, commentForm, rules } = toRefs(data);

//console.log("世界id="+story.value.id);
const imgUrl = inject("$imgUrl")
const imageUrl=ref('')

function handleChapter(){
  router.push("/chapter/list?sid="+sid.value+"&wid"+wid.value);
}
function handleDiscuss(){
  router.push("/discuss/list?sid="+sid.value+"&wid="+wid.value+"&source="+2);
}
function handleComment(){
  router.push("/comment/list?sid="+sid.value+"&wid="+wid.value+"&source="+2);
}

function handStory() {
  getStory(sid.value).then(response => {
    //console.log("查询世界详细:"+JSON.stringify(response))
    story.value = response.data
    wid.value = response.data.wid;
    wname.value = response.data.wname;
    imageUrl.value=imgUrl+response.data.imgUrl;
  });
}
//评论信息
function getAllStoryComment() {
  queryParams.value.wid=wid.value;
  queryParams.value.sid=sid.value;
  listComment(globalProperties.addDateRange(queryParams.value, dateRange.value)).then(response => {
    //console.log("查询世界详细:"+JSON.stringify(response))
    commentList.value = response.rows
  });
}
//小心
function handleAuthor() {
  listAuthor(sid.value).then(response => {
    //console.log("查询世界详细:"+JSON.stringify(response))
    authorList.value = response.rows
  });
}
/** 查询元素列表 */
function handleChapterList() {
  queryParams.value.wid=wid.value;
  listChapter(globalProperties.addDateRange(queryParams.value, dateRange.value)).then(response => {
    chapterList.value = response.rows;
  });
}
const onClickLeft = () => history.back();
const active = ref(1);
getAllStoryComment()
handStory();
//评论功能
handleAuthor();
handleChapterList()
</script>

<style scoped>
.van-tab{
  flex: none!important;
}
</style>
