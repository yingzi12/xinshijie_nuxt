<template>
  <!--  标题-->
  <van-nav-bar
      title="故事管理"
      left-text="返回"
      right-text="新增故事"
      left-arrow
      @click-left="onClickLeft"
      @click-right="onClickRight"
  />
  <van-search v-model="queryParams.name" placeholder="请输入搜索关键词"  @search="getListSelect" />
  <van-dropdown-menu>
    <van-dropdown-item v-model="storyTypeDefault" :options="storyType" @change="getListSelect"/>
    <van-dropdown-item v-model="storyStatusDefault" :options="storyStatus" @change="getListSelect"/>
    <van-dropdown-item v-model="orderByDefault" :options="orderBy" @change="getListSelect"/>
  </van-dropdown-menu>

    <van-list>
      <van-row>
        <van-col span="24" v-for="story in storyList" >
          <van-row>
            <van-col span="8" style="text-align:center;">
              <van-image  width="70" height="100"
                          :src="imgUrl+story.imgUrl" @click="handleSee(story.id,story.wid)"
              /></van-col>
            <van-col span="16">
              <h3 style="margin: 0px" @click="handleSee(story.id,story.wid)">{{ story.name }}
                <van-tag v-if="story.source=='原创'">原创</van-tag>
                <van-tag round  type="warning"  size="default">{{ storyStatusMap.get(story.status) }}</van-tag>
              </h3>
              <van-tag round  type="danger"  size="default">{{ storyTypesMap.get(story.types) }}</van-tag>

              <van-tag round  v-if="story.source != null " v-for="tag in story.source.split(';')"   size="default" type="success">{{tag}}</van-tag>
              <van-tag round  v-if="story.tags != null "  v-for="tag in story.tags.split(';')"   size="default" type="danger">{{tag}}</van-tag>
              <div class="van-multi-ellipsis--l2">
                {{ story.intro }}
              </div>
            </van-col>
          </van-row>
        </van-col>
      </van-row>
    </van-list>
    <van-pagination v-model="queryParams.pageNum" :total-items="total" :items-per-page="20" @change="getList" />

</template>

<script lang="ts" setup >
import {getCurrentInstance, inject, reactive, ref, toRefs} from 'vue';
import {useRouter,useRoute} from "vue-router";
import {  getWorld } from "@/api/admin/world";
import { listStory } from "@/api/admin/story";
const router = useRouter();
const route = useRoute();
const imgUrl = config.app.imgUrl;
const config = useRuntimeConfig();

// const wid=ref(-1);
// wid.value=route.query.wid;

const storyTypeDefault = ref(0);
const storyStatusDefault = ref(0)
const orderByDefault = ref('0');

const storyType = [
  {text: '全部分类', value: 0},
  { text: '武侠', value: 1 },
  { text: '仙侠', value: 2 },
  { text: '魔幻', value: 3 },
  { text: '奇幻', value: 4 },
  { text: '其他', value: 5 },
  { text: '科学', value: 6 },

];

const storyStatus = [
  {text: '全部状态', value: 0},
  {text:  "草稿", value: 1},
  {text: "待审核", value: 2},
  {text:  "正常", value: 3},
  {text:  "审核不通过", value: 4},
  {text:  "隐藏", value:6},
  {text:  "锁定", value: 7},
];
const orderBy = [
  { text: '默认排序', value: '0' },
  { text: '等级排序', value: 'ranks' },
  { text: '查看排序', value: 'count_see' },
];
const storyStatusMap = new Map([
  [1, "草稿"],
  [2, "待审核"],
  [3, "正常"],
  [5, "审核不通过"],
  [6, "隐藏"],
  [7, "锁定"],
]);
const value = ref('');

function  getListSelect(){
  queryParams.value.pageNum=1
  getList()
}


const storyTypesMap=new Map([
  [6,"科学"],
  [1,"武侠"],
  [2,"仙侠"],
  [3,"魔幻"],
  [4,"奇幻"],
  [5,"其他"]
])

const total = ref(0);
const dateRange = ref([]);
const storyList = ref([]);

const data = reactive({
  form: {},
  queryParams: {
    pageNum: 1,
    pageSize:20,
    orderByColumn:undefined,
    name: undefined,
    // wid:wid.value,
    types: 0,
    status: 0,
  },
  rules: {
    // userName: [{ required: true, message: "用户名称不能为空", trigger: "blur" }, { min: 2, max: 20, message: "用户名称长度必须介于 2 和 20 之间", trigger: "blur" }],
  }
});
const { queryParams, form, rules } = toRefs(data);
const onClickLeft = () => history.back();
//查看详细
function onClickRight(){
  router.push("/admin/storyAdd");
}
//查看详细
function handleSee(id:number,wid:number){
  router.push("/admin/story?sid="+id+"&wid="+wid);
}
/** 查询世界列表 */
function getList() {
  // console.log("比较:"+(queryParams.value.types == 0))
  if(storyTypeDefault.value == 0){
    queryParams.value.types = undefined
  }else{
    queryParams.value.types = storyTypeDefault.value
  }
  if(storyStatusDefault.value == 0){
    queryParams.value.status = undefined
  }else{
    queryParams.value.status = storyStatusDefault.value
  }
  if(orderByDefault.value == '0'){
    queryParams.value.orderByColumn = undefined
  }else{
    queryParams.value.orderByColumn = orderByDefault.value
  }
  queryParams.value.pageSize=10
  listStory(globalProperties.addDateRange(queryParams.value, dateRange.value)).then(response => {
    storyList.value =  response.rows;
    total.value=response.total
  }).catch(() => {
  });
}
const world=ref({})
/** 查询世界详细 */
function handWorld(id:number) {
  getWorld(id).then(response => {
    //console.log("查询世界详细:"+JSON.stringify(response))
    world.value = response.data
  });
}
getList()
</script>

<style scoped>

</style>
