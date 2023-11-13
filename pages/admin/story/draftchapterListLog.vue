<template>
  <!--  标题-->
  <van-nav-bar
      title="章节审核历史记录"
      left-text="返回"
      left-arrow
      @click-left="onClickLeft"
  />

  <van-list>
    <van-cell  v-for="chap in chapterList">
    <van-row>
      <van-col span="8" @click="handleStory(chap.sid,chap.wid)">{{ chap.sname }}</van-col>
      <van-col span="12" @click="handleDraftchapter(chap)">{{ chap.title }}</van-col>
      <van-col span="4" @click="handleDraftchapter(chap)">{{ elementStatus.get(chap.status) }}</van-col>
    </van-row>
    </van-cell>
<!--    <van-cell v-for="chap in chapterList" :title="chap.title" :value="elementStatus.get(chap.status)"  :to="{path:'/admin/draftchapter', query: {sid:chap.sid,wid:chap.wid,sname:chap.sname,wname:chap.wname,dscid:chap.id}}"/>-->
  </van-list>
  <van-pagination v-model="queryParams.pageNum" :total-items="total" :items-per-page="20" @change="getList" />
</template>
<script lang="ts" setup >
import { getCurrentInstance, reactive, ref, toRefs} from 'vue'
import { listDraftChapterAdmin } from "@/api/admin/draftChapter";
import { useRoute, useRouter} from "vue-router";

const { appContext : { config: { globalProperties } } } = getCurrentInstance();

const onClickLeft = () => history.back();

// 接收url里的参数
const route = useRoute();
const router = useRouter()

const sid=ref(-1);
sid.value=route.query.sid;

const data = reactive({
  form: {},
  queryParams: {
    pageNum: 1,
    auditStatus:1,
    title: undefined,
    sid:sid.value,
  }
});
const { queryParams, form } = toRefs(data);
const elementStatus = new Map([
  [7, "草稿"],
  [1, "发布"],
  [3, "审核不通过"],
  [2, "通过审核"],
  [4, "删除"]
]);

const chapterList = ref([]);
const total = ref(0);
const dateRange = ref([]);

function handleStory(sid:number,wid:number){
  router.push("/story/index?sid="+sid+"&wid="+wid);
}
function handleDraftchapter(chap){
router.push({path:'/admin/draftchapter', query: {sid:chap.sid,wid:chap.wid,sname:chap.sname,wname:chap.wname,dscid:chap.id}});
}
const story=ref('')
/** 查询元素列表 */
function getList() {
  listDraftChapterAdmin(globalProperties.addDateRange(queryParams.value, dateRange.value)).then(response => {
    chapterList.value = response.rows;
    total.value=response.total
  });
}
getList();

</script>

<style scoped>

</style>
