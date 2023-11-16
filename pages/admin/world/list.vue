<template>
  <!--  标题-->
  <van-nav-bar
      title="世界管理"
      left-text="返回"
      right-text="创建世界"
      left-arrow
      @click-left="onClickLeft"
      @click-right="onClickRight"
  />
  <van-search v-model="queryParams.name" placeholder="请输入搜索关键词"  @search="getListSelect" />
  <van-dropdown-menu>
    <van-dropdown-item v-model="worldTypeDefault" :options="worldType" @change="getListSelect"/>
    <van-dropdown-item v-model="worldStatusDefault" :options="worldStatus" @change="getListSelect"/>
    <van-dropdown-item v-model="orderByDefault" :options="orderBy" @change="getListSelect"/>
  </van-dropdown-menu>

    <van-list>
      <van-row>
        <van-col span="24" v-for="world in worldList" >
          <van-row>
            <van-col span="8" style="text-align:center;">
              <van-image  width="70" height="100"
                          :src="imgUrl+world.imgUrl" @click="handleSee(world.id)"
              /></van-col>
            <van-col span="16">
              <h3 style="margin: 0px" @click="handleSee(world.id)">{{ world.name }}
                <van-tag v-if="world.source=='原创'">原创</van-tag>
                <van-tag round  type="warning"  size="default">{{ worldStatusMap.get(world.status) }}</van-tag>
              </h3>
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
  <van-pagination v-model="queryParams.pageNum" :total-items="total" :items-per-page="20" @change="getList" />
</template>

<script lang="ts" setup >
import {getCurrentInstance, inject, reactive, ref, toRefs} from 'vue';
import {useRouter} from "vue-router";
import { listWorld } from "@/api/wiki/world";
const router = useRouter();
const imgUrl = config.app.imgUrl;
const config = useRuntimeConfig();

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
  [5, "正常"],

]);
const value = ref('');

function  getListSelect(){
  console.log("getListSelect")
  queryParams.value.pageNum=1
  getList();
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
    status:undefined,
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
function getList() {
  // console.log("比较:"+(queryParams.value.types == 0))
  if(worldTypeDefault.value == 0){
    queryParams.value.types = undefined
  }else{
    queryParams.value.types = worldTypeDefault.value
  }
  if(worldStatusDefault.value == 0){
    queryParams.value.status = undefined
  }else{
    queryParams.value.status = worldStatusDefault.value
  }
  if(orderByDefault.value == '0'){
    queryParams.value.orderByColumn = undefined
  }else{
    queryParams.value.orderByColumn = orderByDefault.value
  }
  queryParams.value.pageSize=10
  listWorld(globalProperties.addDateRange(queryParams.value, dateRange.value)).then(response => {
    worldList.value =  response.rows;
    total.value=response.total
  }).catch(() => {

  });
}
//查看详细
function onClickRight(){
  router.push("/admin/worldAdd");
}
getList()
</script>

<style scoped>

</style>
