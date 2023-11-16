<template>
  <!--  标题-->
  <van-nav-bar
      title="元素列表"
      left-text="返回"
      right-text="新增世界"
      left-arrow
      @click-left="onClickLeft"
      @click-right="onClickRight"
  />
  <van-search v-model="queryParams.title" placeholder="请输入搜索关键词"
              @search="getListSelect"
              @clear="onCancel"/>
  <van-field
      v-model="fieldValue"
      is-link
      readonly
      label="分类"
      placeholder="请选择分类"
      @click="show = true"
  />
  <van-popup v-model:show="show" round position="bottom">
    <van-cascader
        v-model="queryParams.types"
        title="请选择分类"
        :options="dataStree"
        @close="onClose"
        @change="onChange"
    />
  </van-popup>
    <van-list
        v-model:loading="loading"
        v-model:error="error"
        :finished="finished"
        finished-text="没有更多了"
        error-text="请求失败，点击重新加载"
        @load="onLoad"
    >
      <van-row>
        <van-col span="24" v-for="element in list" >
          <van-row>
            <van-col span="8" style="text-align:center;">
              <van-image  width="70" height="100"
                          :src="imgUrl+element.imgUrl" @click="handleSee(element.id,element.wid,element.softtype)"
              /></van-col>
            <van-col span="16">
              <h3 style="margin: 0px" @click="handleSee(element.id)">{{ element.title }}</h3>
              <van-tag v-for='idLabel in element.idLabels.split(",")' round  type="danger"  size="default">
                {{idLabel.split("$$")[1]}}
              </van-tag>
              <div class="van-multi-ellipsis--l2">
                {{ element.intro }}
              </div>
            </van-col>
          </van-row>
        </van-col>
      </van-row>
    </van-list>
<!--  </van-pull-refresh>-->
</template>

<script lang="ts" setup >
import {getCurrentInstance, inject, reactive, ref, toRefs} from 'vue';
import {useRoute, useRouter} from "vue-router";
import { listAudit,auditDraft } from "@/api/admin/draftElement";
import { getTreeMobile} from "@/api/wiki/category";
import { getWorld} from "@/api/wiki/world";
const router = useRouter();
const imgUrl = config.app.imgUrl;
const config = useRuntimeConfig();
// 接收url里的参数
const route = useRoute();
const wid = ref(null);
wid.value = route.query.wid;

const data = reactive({
  form: {},
  queryParams: {
    pageNum: 1,
    title: undefined,
    types: undefined,
    auditStatus:0,
    wid:wid.value
  }
});

const worldTypeDefault = ref(0);

const orderByDefault = ref('0');

const elementType = [
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
function  getListSelect(){
  // 清空列表数据
  finished.value = false;
  console.log("触发getListSelect")
  // 重新加载数据
  // 将 loading 设置为 true，表示处于加载状态
  loading.value = true;
  refreshing.value=true;
  page.value=1
  onLoad()
}

//分类选择
const show = ref(false);
const fieldValue = ref('');
const cascaderValue = ref('');
// 全部选项选择完毕后，会触发 finish 事件
const onChange= ({ selectedOptions }) => {
  // show.value = false;
  fieldValue.value = selectedOptions.map((option) => option.text).join('/');
};
const onClose=()=>{
  show.value = false;
  // queryParams.value.types= cascaderValue.value
  console.log("选中的分类:"+cascaderValue.value);
  getListSelect();
}
const onCancel = () => {
  console.log("删除标题过滤")
  queryParams.value.title=undefined;
  getListSelect();

}
const { queryParams, form } = toRefs(data);

const elementList = ref([]);
const dataStree = ref([])
const total = ref(0);
const dateRange = ref([]);
//搜索的分类
const categoryValue= ref();
//搜索的元素名称
const title= ref();

/**查看元素详细*/
function handleSee(id:number,wid:number,softtype:number){
  router.push("/draftElement/index?deid="+id+"&wid="+wid+"&temType="+softtype);
}
const world=ref('')
/** 查询世界详细 */
function handWorld() {
  getWorld(wid.value).then(response => {
    //console.log("查询世界详细:"+JSON.stringify(response))
    world.value = response.data
  });
}
/** 查询元素列表 */
function getList(page:number) {
  queryParams.value.pageNum=page
  queryParams.value.wid=wid.value;
  listAudit(globalProperties.addDateRange(queryParams.value, dateRange.value)).then(response => {
    elementList.value = response.rows;
    total.value = response.total;
    list.value=list.value.concat(elementList.value);
    if(elementList.value.length == 0) {
      console.log("关闭自动刷新:"+elementList.value.length)
      finished.value = true;
    }
  }).catch(() => {
    error.value = true;
  });
}
const onClickLeft = () => history.back();
/** 查询分类列表 */
function getCategoryTree() {
  getTreeMobile(wid.value).then(response => {
    dataStree.value = response.data
  });
}
getCategoryTree();
// getList();
handWorld();
</script>

<style scoped>

</style>
