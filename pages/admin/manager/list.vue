<template>
  <!--  标题-->
  <van-nav-bar
      title="世界列表"
      left-text="返回"
      left-arrow
      @click-left="onClickLeft"
  />
  <van-search v-model="queryParams.name" placeholder="请输入搜索关键词"  @search="getListSelect" />
  <van-dropdown-menu>
    <van-dropdown-item v-model="worldTypeDefault" :options="worldType" @change="getListSelect"/>
    <van-dropdown-item v-model="worldStatusDefault" :options="worldStatus" @change="getListSelect"/>
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
        <van-col span="24" v-for="world in list" >
          <van-row>
            <van-col span="8" style="text-align:center;">
              <van-image  width="70" height="100"
                          :src="imgUrl+world.imgUrl" @click="handleSee(world.id)"
              /></van-col>
            <van-col span="16">
              <h3 style="margin: 0px" @click="handleSee(world.id)">{{ world.name }} <van-tag v-if="world.source=='原创'">原创</van-tag></h3>
              <van-tag round  type="warning"  size="default">{{ worldStatusMap.get(world.status) }}</van-tag>
              <van-tag round  type="danger"  size="default">{{ worldTypesMap.get(world.types) }}</van-tag>
              <van-tag round  v-if="world.source != null " v-for="tag in world.source.split(';')"   size="default" type="success">{{tag}}</van-tag>
              <van-tag round  v-if="world.tags != null "  v-for="tag in world.tags.split(';')"   size="default" type="danger">{{tag}}</van-tag>
              <div class="van-multi-ellipsis--l2">
                {{ world.intro }}
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
import {useRouter} from "vue-router";
import { listWorld } from "@/api/wiki/world";
const router = useRouter();
const imgUrl = inject("$imgUrl")
const {  appContext : { config: { globalProperties } }  } = getCurrentInstance();

const worldTypeDefault = ref(0);
const worldStatusDefault = ref(0);

const orderByDefault = ref('0');

const worldType = [
  {text: '全部', value: 0},
  { text: '武侠', value: 1 },
  { text: '仙侠', value: 2 },
  { text: '魔幻', value: 3 },
  { text: '奇幻', value: 4 },
  { text: '其他', value: 5 },
  { text: '科学', value: 6 },

];
const worldStatus = [
  {text: '全部', value: 0},
  { text: '待发布', value: 1 },
  { text: '锁定', value: 2 },
  { text: '隐藏', value: 3 },
  { text: '删除', value: 4 },
  { text: '正常', value: 5 },
];
const orderBy = [
  { text: '默认排序', value: '0' },
  { text: '等级排序', value: 'ranks' },
  { text: '查看排序', value: 'count_see' },
];

const worldStatusMap = new Map([
  [1, "待发布"],
  [2, "锁定"],
  [3, "隐藏"],
  [4, "删除"],
  [5, "正常"],

]);
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


const worldTypesMap=new Map([
  [6,"科学"],
  [1,"武侠"],
  [2,"仙侠"],
  [3,"魔幻"],
  [4,"奇幻"],
  [5,"其他"]
])
const onClickLeft = () => history.back();
const total = ref(0);
const dateRange = ref([]);
const worldList = ref([]);

const data = reactive({
  form: {},
  queryParams: {
    pageNum: 1,
    pageSize:20,
    orderByColumn:undefined,
    name: undefined,
    types: 0,
  },
  rules: {
    // userName: [{ required: true, message: "用户名称不能为空", trigger: "blur" }, { min: 2, max: 20, message: "用户名称长度必须介于 2 和 20 之间", trigger: "blur" }],
  }
});
const { queryParams, form, rules } = toRefs(data);

//查看详细
function handleSee(id:number){
  router.push("/admin/world?wid="+id);
}
/** 查询世界列表 */
function getList(page:number) {
  // console.log("比较:"+(queryParams.value.types == 0))
  if(worldTypeDefault.value == 0){
    queryParams.value.types = undefined
  }else{
    queryParams.value.types = worldTypeDefault.value
  }
  if(orderByDefault.value == '0'){
    queryParams.value.orderByColumn = undefined
  }else{
    queryParams.value.orderByColumn = orderByDefault.value
  }
  queryParams.value.pageSize=20
  queryParams.value.pageNum=page
  listWorld(globalProperties.addDateRange(queryParams.value, dateRange.value)).then(response => {
    worldList.value =  response.rows;
    list.value=list.value.concat(worldList.value);
    if(worldList.value.length == 0) {
      finished.value = true;
    }
  }).catch(() => {
    error.value = true;
  });
}

</script>

<style scoped>

</style>
