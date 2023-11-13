<template>
  <!--  标题-->
  <van-nav-bar
      title="世界详细"
      left-text="返回"
      left-arrow
      @click-left="onClickLeft"
  />
  <div style="width: 100%;">
    <van-row>
      <van-col span="8" style="text-align:center;">
        <van-image  width="70" height="100"
                    :src="imgUrl+world.imgUrl" @click="handleSee(world.id)"
        /></van-col>
      <van-col span="16">
        <div style="margin-top: 8px">
        <van-badge :content="world.ranks">
          <h3 style="margin: 0px" @click="handleSee(world.id)">{{ world.name }} <van-tag v-if="world.source=='原创'">原创</van-tag></h3>
        </van-badge>
        <div>
          <van-tag round  type="danger"  size="default">{{ worldTypesMap.get(world.types) }}</van-tag>
          <van-tag round  v-if="world.source != null " v-for="tag in world.source.split(';')"   size="default" type="success">{{tag}}</van-tag>
          <van-tag round  v-if="world.tags != null "  v-for="tag in world.tags.split(';')"   size="default" type="danger">{{tag}}</van-tag>
        </div>
        <div>
          <van-button   type="primary" size="small">关注</van-button>       <van-button   type="primary" size="small">讨论</van-button>
        </div>
        </div>
      </van-col>
    </van-row>
  </div>
  <div  style="width: 100%">
    <div v-html="world.intro" />
  </div>
  <van-divider />
  <van-tabs v-model:active="active">
    <van-tab title="简介">
      <div v-html="world.description" />
    </van-tab>
    <van-tab title="元素">
      <van-list>
        <van-cell v-for="element in elementList"  :title="element.title" :value="element.updateTime" :label="element.intro" :to="{path:'/element/index', query: {eid:element.id,wid:element.wid,temType:element.softtype}}"/>
      </van-list>
      <van-button type="primary"  size="mini" @click="handleElementList()">更多</van-button>
    </van-tab>
    <van-tab title="故事">
      <van-list>
        <van-cell v-for="story in storyList"  :title="story.name"  :value="story.updateTime" :label="story.intro" is-link  :to="{path:'/story/index', query: {sid:story.id,wid:story.wid}}" />
      </van-list>
      <van-button type="primary"  size="mini" @click="handleStoryList()">更多</van-button>
    </van-tab>
    <van-tab title="创造者">
      <van-list>
        <van-cell v-for="manage in manageList"  :title="manage.userName"  :value="manage.ranks" :label="manage.sign" />
      </van-list>
    </van-tab>
  </van-tabs>
  <van-divider />
  <!--  推荐  -->
  <div id="u2_text" class="text ">
    <span>评论</span>
    <span style="float: right" @click="handleCommentList()">更多</span>
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
import {  getWorld } from "@/api/wiki/world";
import {  listComment } from "@/api/wiki/comment";
import {  getWorldManage } from "@/api/wiki/manage";
import { listElement } from "@/api/wiki/element";
import { listStory } from "@/api/wiki/story";
const {  appContext : { config: { globalProperties } }  } = getCurrentInstance();

const router = useRouter()
// 接收url里的参数
const route = useRoute();
//console.log(route.query.id,"参数");
//世界信息
const world=ref({})
//评论信息
const commentList=ref([])

//分页信息
const dateRange = ref([]);

//评论内容与通用分页查询条件
const data = reactive({
  commentForm: {},
  queryParams: {
    pageNum: 1,
    pageSize:3,
    wid: undefined,
  },
  rules: {
    comment: [{ required: true, message: "评论不能为空", trigger: "blur" }],
  }
});
const storyTypesMap=new Map([
  [6,"科学"],
  [1,"武侠"],
  [2,"仙侠"],
  [3,"魔幻"],
  [4,"奇幻"],
  [5,"其他"]
])

const worldTypesMap=new Map([
  [6,"科学"],
  [1,"武侠"],
  [2,"仙侠"],
  [3,"魔幻"],
  [4,"奇幻"],
  [5,"其他"]
])
const { queryParams, commentForm, rules } = toRefs(data);
const wid=ref(-1);
wid.value=route.query.wid;
world.value.id = route.query.wid;
//console.log("世界id="+world.value.id);
const imgUrl = inject("$imgUrl")
const imageUrl=ref('')

function handleElementList(){
  router.push("/element/list?wid="+world.value.id+"&wname="+world.value.name);
}
function handleDiscuss(){
  router.push("/discuss/list?wid="+world.value.id+"&wname="+world.value.name+"&source="+1);
}
function handleCommentList(){
  router.push("/comment/list?wid="+world.value.id+"&wname="+world.value.name+"&source="+1);
}
function handleAddStory(){
  router.push("/admin/storyAdd?wid="+world.value.id+"&wname="+world.value.name+"&source="+1);
}
function handleStoryList(){
  router.push("/story/list?wid="+world.value.id+"&wname="+world.value.name+"&source="+1);
}

// function handleFllow(){
//   addFllow(wid.value).then(response => {
//     ElMessage.success("关注成功");
//   });
// }
const onClickLeft = () => history.back();

/** 查询世界详细 */
function handWorld(id:number) {
  getWorld(id).then(response => {
    //console.log("查询世界详细:"+JSON.stringify(response))
    world.value = response.data
    imageUrl.value=imgUrl+response.data.imgUrl;
  });
}
//评论信息
function getAllWorldComment() {
  queryParams.value.wid=wid.value;
  listComment(globalProperties.addDateRange(queryParams.value, dateRange.value)).then(response => {
    //console.log("查询世界详细:"+JSON.stringify(response))
    commentList.value = response.rows
  });
}
//管理员信息
const manageList=ref([])
//小心
function getAllWorldManage(id:number) {
  getWorldManage(id).then(response => {
    //console.log("查询世界详细:"+JSON.stringify(response))
    manageList.value = response.rows
  });
}
//管理员信息
const elementList = ref([]);
/** 查询元素列表 */
function getElementList() {
  queryParams.value.wid=wid.value;
  listElement(globalProperties.addDateRange(queryParams.value, dateRange.value)).then(response => {
    elementList.value = response.rows;
  });
}

const  storyList=ref([{}])
function getStoryList() {
  queryParams.value.wid=wid.value;
  listStory(globalProperties.addDateRange(queryParams.value, dateRange.value)).then(response => {
    storyList.value = response.rows;
  });
}

const active = ref(0);

//世界信息
handWorld(world.value.id);
//管理员信息
getAllWorldManage(world.value.id)
//评论功能
getAllWorldComment()
getElementList()
getStoryList();
</script>

<style scoped>
.van-tab{
  flex: none!important;
}
</style>
