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
          <h3 style="margin: 0px" >{{ story.name }}
            <van-tag v-if="story.source=='原创'">原创</van-tag>
            <van-tag round  type="warning"  size="default">{{ storyStatusMap.get(story.status) }}</van-tag>
          </h3>
        </van-badge>
          <h5 style="margin: 0px">世界:{{ story.wname }}</h5>
        <div>
          <van-tag round  type="danger"  size="default">{{ storyTypesMap.get(story.types) }}</van-tag>
          <van-tag round  v-if="story.source != null " v-for="tag in story.source.split(';')"   size="default" type="success">{{tag}}</van-tag>
          <van-tag round  v-if="story.tags != null "  v-for="tag in story.tags.split(';')"   size="default" type="danger">{{tag}}</van-tag>
        </div>
          <div class="van-multi-ellipsis--l2">
            {{ story.intro }}
          </div>
        <div>
          <van-button round  type="primary" size="small" @click="handleSee(story.id,story.wid)">详细</van-button>
          <van-button round  type="primary" size="small" @click="handleEdit(story.id)">编辑</van-button>
          <van-button round v-if="story.status == 1"  type="primary" size="small" @click="handleIssue(story.id)">发布</van-button>
        </div>
        </div>
      </van-col>
    </van-row>
  </div>
  <div  style="width: 100%">
    <div v-html="story.description" />
  </div>
  <van-divider />
  <van-cell-group class="user-group">
    <van-cell icon="records" title="章节列表" is-link :to="{path:'/admin/storyReel', query: {wid:story.wid,wname:story.wname,sid:story.id,sname:story.name}}"/>
    <van-cell icon="records" title="章节审核" is-link :to="{path:'/admin/storyDraftChapterList', query: {wid:story.wid,wname:story.wname,sid:story.id,sname:story.name}}"/>
    <van-cell icon="records" title="评论列表" is-link :to="{path:'/admin/storyComment', query: {wid:story.wid,wname:story.wname,sid:story.id,sname:story.name,source:1}}"/>
    <van-cell icon="records" title="讨论列表" is-link :to="{path:'/admin/storyDiscuss', query: {wid:story.wid,wname:story.wname,sid:story.id,sname:story.name,source:1}}"/>
  </van-cell-group>

</template>

<script lang="ts" setup>
import {getCurrentInstance, inject, reactive, ref, toRefs} from 'vue'
//接受参数
import {useRoute, useRouter} from "vue-router";  // 引用vue-router
import {  getStoryAdmin,issue } from "@/api/admin/story";
const {  appContext : { config: { globalProperties } }  } = getCurrentInstance();

const router = useRouter()
// 接收url里的参数
const route = useRoute();

const sid = ref(null);
sid.value = route.query.sid;
const wid = ref(null);
wid. value = route.query.wid;
const wname = ref('');

const storyStatusMap = new Map([
  [1, "草稿"],
  [2, "待审核"],
  [3, "正常"],
  [5, "审核不通过"],
  [4, "删除"],
  [6, "隐藏"],
  [7, "锁定"],
]);
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
//分页信息
const dateRange = ref([]);
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

function handleIssue(id:number){
  //console.log("发布："+JSON.stringify(row))
  issue(id).then(response => {
    handStory();
  });
}

function handStory() {
  getStoryAdmin(sid.value).then(response => {
    //console.log("查询世界详细:"+JSON.stringify(response))
    story.value = response.data
    wid.value = response.data.wid;
    wname.value = response.data.wname;
    imageUrl.value=imgUrl+response.data.imgUrl;
  });
}
function handleSee(sid:number,wid:number){
  router.push("/story/index?sid="+sid+"&wid="+wid)
}
function handleEdit(sid:number){
  router.push("/admin/storyEdit?sid="+sid)
}
const onClickLeft = () => history.back();
const active = ref(1);
handStory();
//评论功能
</script>

<style scoped>
.van-tab{
  flex: none!important;
}
</style>
