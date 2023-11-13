<template>
  <!--  标题-->
  <van-nav-bar
      :title="world.name"
      left-text="返回"
      left-arrow
      @click-left="onClickLeft"
  />
  <van-search v-model="queryParams.name" placeholder="请输入搜索关键词"  @search="getListSelect" />
  <van-dropdown-menu>
    <van-dropdown-item v-model="storyTypeDefault" :options="storyType" @change="getListSelect"/>
    <van-dropdown-item v-model="orderByDefault" :options="orderBy" @change="getListSelect"/>
  </van-dropdown-menu>

  <van-pull-refresh v-model="refreshing" @refresh="onRefresh">
    <van-list
        v-model:loading="loading"
        v-model:error="error"
        :finished="finished"
        finished-text="没有更多了"
        error-text="请求失败，点击重新加载"
        @load="onLoad"
    >
      <van-row>
        <van-col span="24" v-for="story in list" >
          <van-row>
            <van-col span="8" style="text-align:center;">
              <van-image  width="70" height="100"
                          :src="imgUrl+story.imgUrl" @click="handleSee(story.id)"
              /></van-col>
            <van-col span="16">
              <h3 style="margin: 0px" @click="handleSee(story.id)">{{ story.name }} <van-tag v-if="story.source=='原创'">原创</van-tag></h3>
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
  </van-pull-refresh>
</template>

<script lang="ts" setup >
import {getCurrentInstance, inject, reactive, ref, toRefs} from 'vue';
import {useRouter,useRoute} from "vue-router";
import {  getWorld } from "@/api/wiki/world";
import { listStory } from "@/api/wiki/story";
const router = useRouter();
const route = useRoute();
const imgUrl = inject("$imgUrl")
const {  appContext : { config: { globalProperties } }  } = getCurrentInstance();

const wid=ref(-1);
wid.value=route.query.wid;

const storyTypeDefault = ref(0);

const orderByDefault = ref('0');

const storyType = [
  {text: '全部', value: 0},
  { text: '武侠', value: 1 },
  { text: '仙侠', value: 2 },
  { text: '魔幻', value: 3 },
  { text: '奇幻', value: 4 },
  { text: '其他', value: 5 },
  { text: '科学', value: 6 },

];

const orderBy = [
  { text: '默认排序', value: '0' },
  { text: '等级排序', value: 'ranks' },
  { text: '查看排序', value: 'count_see' },
];

const value = ref('');
const page=ref(1);
//list列表
const list = ref([]);
const error = ref(false);
const loading = ref(false);
const finished = ref(false);
const refreshing = ref(false);

const onLoad = () => {
  console.log("触发onLoad")

  setTimeout(() => {
    console.log("触发setTimeout")

    if (refreshing.value) {
      list.value = [];
      refreshing.value = false;
    }
    getList(page.value);
    page.value = page.value+1;
    loading.value = false;

  }, 2000);
};

const onRefresh = () => {
  // 清空列表数据
  finished.value = false;
  console.log("触发onRefresh")
  // 重新加载数据
  // 将 loading 设置为 true，表示处于加载状态
  loading.value = true;

  onLoad();
};
function  getListSelect(){
  refreshing.value=true;
  page.value=1
  onRefresh()
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
    wid:wid.value,
    types: 0,
  },
  rules: {
    // userName: [{ required: true, message: "用户名称不能为空", trigger: "blur" }, { min: 2, max: 20, message: "用户名称长度必须介于 2 和 20 之间", trigger: "blur" }],
  }
});
const { queryParams, form, rules } = toRefs(data);
const onClickLeft = () => history.back();
//查看详细
function handleSee(id:number){
  router.push("/story/index?sid="+id+"&wid="+wid.value);
}
/** 查询世界列表 */
function getList(page:number) {
  // console.log("比较:"+(queryParams.value.types == 0))
  if(storyTypeDefault.value == 0){
    queryParams.value.types = undefined
  }else{
    queryParams.value.types = storyTypeDefault.value
  }
  if(orderByDefault.value == '0'){
    queryParams.value.orderByColumn = undefined
  }else{
    queryParams.value.orderByColumn = orderByDefault.value
  }
  queryParams.value.pageSize=20
  queryParams.value.pageNum=page
  listStory(globalProperties.addDateRange(queryParams.value, dateRange.value)).then(response => {
    storyList.value =  response.rows;
    list.value=list.value.concat(storyList.value);
    if(storyList.value.length == 0) {
      finished.value = true;
    }
  }).catch(() => {
    error.value = true;
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
</script>

<style scoped>

</style>
