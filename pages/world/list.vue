<script lang="ts" setup>
const config = useRuntimeConfig();

import { useRoute, useRouter } from 'vue-router';
import { tansParams } from '~/utils/tools';

const route = useRoute();
const router = useRouter();
const imgUrl = config.app.imgUrl;

const selectWorldName = ref(route.query.selectWorldName);
const worldTypeDefault = ref(0);
const orderByDefault = ref('0');
const orderBy = [
  { text: '默认排序', value: '0' },
  { text: '等级排序', value: 'ranks' },
  { text: '查看排序', value: 'count_see' },
];

const list = ref([]);
const error = ref(false);
const loading = ref(false);
const finished = ref(false);
const total = ref(0);
const dateRange = ref([]);
const worldList = ref([]);

const data = reactive({
  queryParams: {
    pageNum: 1,
    pageSize: 20,
    orderByColumn: undefined,
    name: undefined,
    types: 0,
  },
});

const { queryParams } = toRefs(data);

const updateQueryParams = () => {
  queryParams.value.types = worldTypeDefault.value === 0 ? undefined : worldTypeDefault.value;
  queryParams.value.orderByColumn = orderByDefault.value === '0' ? undefined : orderByDefault.value;
  queryParams.value.name = selectWorldName.value || undefined;
};
const count=ref(0)
const isLoading = ref(false);

const onLoad = () => {
  if (isLoading.value) return;
  isLoading.value = true;
  if(count>10){
    finished.value = true;
  }else {
    count.value=count.value+1;
    setTimeout(() => {
    getList(queryParams.value.pageNum)
    loading.value = false;
    }, 1000);
  }
};

const getList = async (page:number) => {
  updateQueryParams();
  queryParams.value.pageNum = page;

  try {
    const response = await $fetch('/api/wiki/world/list?' + tansParams(queryParams.value));
    worldList.value = response.data;
    list.value = [...list.value, ...worldList.value];
    if (worldList.value.length === 0) {
      finished.value = true;
    }

  } catch (err) {
    console.error('Error fetching list:', err);
    error.value = true;
  } finally {
    loading.value = false;
    isLoading.value = false;
  }
  queryParams.value.pageNum = page+1;

};


const onClickLeft = () => router.back();
const handleSee = (id: number) => router.push('/world/detail?wid=' + id);

</script>

<template>
  <!--  标题-->
  <van-nav-bar
      title="世界列表"
      left-text="返回"
      left-arrow
      @click-left="onClickLeft"
  />
  <van-search v-model="queryParams.name" placeholder="请输入搜索关键词"  @search="getList(1)" />
  <van-dropdown-menu>
    <van-dropdown-item v-model="worldTypeDefault" :options="worldTypesArr" />
    <van-dropdown-item v-model="orderByDefault" :options="orderBy" />
  </van-dropdown-menu>

    <van-list
        v-model:loading="loading"
        :finished="finished"
        finished-text="没有更多了"
        @load="onLoad"
        error-text="请求失败，点击重新加载"
    >
      <div class="book-ol book-ol-normal"  v-for="world in list" >
        <div class="book-li">
          <a :href="'/world/detail?wid='+world.id" class="book-layout">
            <img style="width: 92px;height: 123px"
                :src="imgUrl+world.imgUrl"
                onerror="this.src='/style/image/empty.png'"
                class="book-cover" :alt="world.name">
            <div class="book-cell">
              <h4 class="book-title">{{world.name}}<van-tag v-if="world.source=='原创'">原创</van-tag></h4>
              <p class="book-desc">{{world.intro}}
              </p>
              <div class="book-meta">
                <div class="book-meta-l">
                  <span class="book-author">{{ world.createName }}</span>
                </div>
                <div class="book-meta-r">
							<span class="tag-small-group origin-right">
								<em class="tag-small gray">{{ worldTypesMap.get(world.status) }}</em>
								<em class="tag-small red"><font color="red">{{ worldStatusMap.get(world.status) }}</font></em>
							</span>
                </div>
              </div>
            </div>
          </a>
        </div>
      </div>
    </van-list>
</template>
<style scoped>

</style>
