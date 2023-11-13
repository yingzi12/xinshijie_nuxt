<template>
  <!--  标题-->
  <van-nav-bar
      title="章节列表"
      left-text="返回"
      left-arrow
      @click-left="onClickLeft"
  />

  <van-index-bar :index-list="indexList">
    <div v-for="reel in reelList" >
     <van-index-anchor  :index="reel.title" />
     <van-cell  v-for="chap in reel.chapterList" :title="chap.title"  :to="{path:'/chapter/index', query: {sid:chap.sid,wid:chap.wid,sname:chap.sname,wname:chap.wname,scid:chap.id}}" />
    </div>
  </van-index-bar>

</template>
<script lang="ts" setup >
import { getCurrentInstance, reactive, ref, toRefs} from 'vue'
import { listChapterAll } from "@/api/wiki/chapter";
import { getStory} from "@/api/wiki/story";
import { useRoute, useRouter} from "vue-router";

const {  appContext : { config: { globalProperties } }  } = getCurrentInstance();
const  indexList=ref([]);

// 接收url里的参数
const route = useRoute();
const router = useRouter()
const sid = ref(null);
sid.value = route.query.sid;
const wid = ref(null);
wid.value = route.query.wid;
const data = reactive({
  form: {},
  queryParams: {
    pageNum: 1,

    title: undefined,
    types: undefined,
    sid:sid.value
  }
});


const { queryParams, form } = toRefs(data);

const reelList = ref([]);
const total = ref(0);
const dateRange = ref([]);

/**查看元素详细*/
function handleSee(id:number,wid:number,softtype:number){
  router.push("/element/index?eid="+id+"&wid="+wid+"&temType="+softtype);
}

//添加新元素,需要登录权限
function handleAdd(){
  router.push("/admin/storyChapterAdd?sid=" + sid.value +"&wid=" + wid.value);
}

const story=ref('')
/** 查询世界详细 */
function handStory() {
  getStory(sid.value).then(response => {
    //console.log("查询世界详细:"+JSON.stringify(response))
    story.value = response.data
  });
}
/** 查询元素列表 */
function getList() {
  queryParams.value.sid=sid.value;
  listChapterAll(globalProperties.addDateRange(queryParams.value, dateRange.value)).then(response => {
    reelList.value = response.data;
    for(var j = 0,len=reelList.value.length; j < len; j++) {
      indexList.value.push(reelList.value[j].title)
    }
  });
}
getList();
handStory();
const onClickLeft = () => history.back();
</script>

<style scoped>

</style>
