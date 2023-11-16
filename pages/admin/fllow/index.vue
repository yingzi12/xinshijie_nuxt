<template>
  <van-nav-bar
      title="我的关注"
      left-text="返回"
      left-arrow
      @click-left="onClickLeft"
  />
  <van-list>
    <van-swipe-cell v-for="world in fllowList">
      <van-row>
        <van-col span="8" style="text-align:center;">
          <van-image  width="70" height="100"
                      :src="imgUrl+world.imgUrl" @click="handleSee(world.id)"
          /></van-col>
        <van-col span="16">
          <h3 style="margin: 0px" @click="handleSee(world.id)">{{ world.name }} <van-tag v-if="world.source=='原创'">原创</van-tag></h3>
          <van-tag round  type="danger"  size="default">{{ worldTypesMap.get(world.types) }}</van-tag>
          <van-tag round  v-if="world.source != null " v-for="tag in world.source.split(';')"   size="default" type="success">{{tag}}</van-tag>
          <van-tag round  v-if="world.tags != null "  v-for="tag in world.tags.split(';')"   size="default" type="danger">{{tag}}</van-tag>
          <div class="van-multi-ellipsis--l2">
            {{ world.intro }}
          </div>
        </van-col>
      </van-row>

      <template #right>
        <van-button square text="取消关注" type="danger" class="delete-button" @click="handleClick(world.id)"/>
      </template>
    </van-swipe-cell>
  </van-list>
  <van-pagination
      v-model="currentPage"
      :total-items="total"
      :items-per-page="20"
      :show-page-size="3"
      force-ellipses
  />
</template>

<script lang="ts" setup>
import {getCurrentInstance, reactive, ref, toRefs} from 'vue'
import { listFllow,fllowClose } from "@/api/admin/fllow";
import {useRouter} from "vue-router";
const router = useRouter();
const total = ref(0);
const data = reactive({
  form: {},
  queryParams: {
    pageNum: 1,

    name: undefined,
    types: undefined,
  },
  rules: {
    // userName: [{ required: true, message: "用户名称不能为空", trigger: "blur" }, { min: 2, max: 20, message: "用户名称长度必须介于 2 和 20 之间", trigger: "blur" }],
  }
});
const config = useRuntimeConfig();
const worldTypes=reactive([{id:6,name:"科学"},{id:1,name:"武侠"},{id:2,name:"仙侠"},{id:3,name:"魔幻"},{id:4,name:"奇幻"},{id:5,name:"其他"}])
const worldTypesMap=new Map([
  [6,"科学"],
  [1,"武侠"],
  [2,"仙侠"],
  [3,"魔幻"],
  [4,"奇幻"],
  [5,"其他"],
])

const currentPage = ref(1);
const { queryParams, form, rules } = toRefs(data);
const dateRange = ref([]);
const fllowList = ref([]);
//查看详细
function handleSee(id:number){
  router.push("/world/index?wid="+id);
}
function handleClick(wid:number){
  fllowClose(wid).then(response => {
    // ElMessage.success("取消成功");
    getList();
  });
}
/** 查询世界列表 */
function getList() {
  listFllow(globalProperties.addDateRange(queryParams.value, dateRange.value)).then(response => {
    fllowList.value = response.rows;
    total.value = response.total;
  });
}
const onClickLeft = () => history.back();

getList();
</script>

<style scoped>

</style>
