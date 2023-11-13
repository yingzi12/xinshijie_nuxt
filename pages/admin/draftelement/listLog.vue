<template>
  <!--  标题-->
  <van-nav-bar
      title="元素草稿历史记录"
      left-text="返回"
      right-text="元素草稿"
      left-arrow
      @click-left="onClickLeft"
      @click-right="onClickRight"
  />

  <van-list>
    <van-cell  v-for="ele in elementList">
    <van-row>
      <van-col span="8" @click="handleWorld(ele.wid)">{{ ele.wname }}</van-col>
      <van-col span="12" @click="handleElement(ele)">{{ ele.title }}</van-col>
      <van-col span="4"  @click="handleElement(ele)">{{ elementStatus.get(ele.status) }}</van-col>
    </van-row>
    </van-cell>
  </van-list>
  <van-pagination v-model="queryParams.pageNum" :total-items="total" :items-per-page="20" @change="getList" />
</template>
<script lang="ts" setup >
import { getCurrentInstance, reactive, ref, toRefs} from 'vue'
import { listDraft } from "@/api/admin/draftElement";
import { useRoute, useRouter} from "vue-router";

const { appContext : { config: { globalProperties } } } = getCurrentInstance();

const onClickLeft = () => history.back();

// 接收url里的参数
const route = useRoute();
const router = useRouter()
const data = reactive({
  form: {},
  queryParams: {
    pageNum: 1,
    title: undefined,
    types: undefined,
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

const elementList = ref([]);
const total = ref(0);
const dateRange = ref([]);

function handleWorld(wid:number){
  router.push("/world/index?wid="+wid);
}
function handleElement(ele){
router.push({path:'/admin/draftElement', query: {deid:ele.id,wid:ele.wid,ename:ele.name,wname:ele.wname}});
}
const story=ref('')
/** 查询元素列表 */
function getList() {
  listDraft(globalProperties.addDateRange(queryParams.value, dateRange.value)).then(response => {
    elementList.value = response.rows;
    total.value=response.total
  });
}
getList();

</script>

<style scoped>

</style>
