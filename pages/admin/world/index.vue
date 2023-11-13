<template>

  <!--  标题-->
  <van-nav-bar
      title="世界详细"
      left-text="返回"
      left-arrow
      @click-left="onClickLeft"
  />
  <div style="width: 100%;">
    <van-row>
      <van-col span="8" style="text-align:center;">
        <van-image  width="70" height="100"
                    :src="imgUrl+world.imgUrl" @click="handleSee(world.id)"
        /></van-col>
      <van-col span="16">
        <div style="margin-top: 8px">
        <van-badge :content="world.ranks">
          <h3 style="margin: 0px" @click="handleSee(world.id)">{{ world.name }}
            <van-tag v-if="world.source=='原创'">原创</van-tag>
            <van-tag round  type="warning"  size="default">{{ worldStatusMap.get(world.status) }}</van-tag>
          </h3>
        </van-badge>
        <div>
          <van-tag round  type="danger"  size="default">{{ worldTypesMap.get(world.types) }}</van-tag>
          <van-tag round  v-if="world.source != null " v-for="tag in world.source.split(';')"   size="default" type="success">{{tag}}</van-tag>
          <van-tag round  v-if="world.tags != null "  v-for="tag in world.tags.split(';')"   size="default" type="danger">{{tag}}</van-tag>
        </div>
          <div class="van-multi-ellipsis--l2">
            {{ world.intro }}
          </div>
        <div>
          <van-button   type="primary" size="small" @click="handleSee(world.id)">详细</van-button>
          <van-button   type="primary" size="small" @click="handleEdit(world.id)">编辑</van-button>
          <van-button   v-if="world.status == 1"  type="primary" size="small" @click="handleIssoue()">发布</van-button>
        </div>
        </div>
      </van-col>
    </van-row>
  </div>
  <div  style="width: 100%">
    <div v-html="world.description" />
  </div>

  <van-divider />
  <!--  推荐  -->
  <van-cell-group class="user-group">
    <van-cell icon="records" title="元素审核" is-link :to="{path:'/admin/worldDraftElementList', query: {wid:wid,wname:world.name}}"/>
<!--    <van-cell icon="records" title="居民列表" is-link :to="{path:'/admin/worldRedident', query: {wid:wid,wname:world.name}}"/>-->
    <van-cell icon="records" title="评论列表" is-link :to="{path:'/admin/worldComment', query: {wid:wid,wname:world.name,source:1}}"/>
    <van-cell icon="records" title="讨论列表" is-link :to="{path:'/admin/worldDiscuss', query: {wid:wid,wname:world.name,source:1}}"/>
  </van-cell-group>
</template>

<script lang="ts" setup>
import {getCurrentInstance, inject, reactive, ref, toRefs} from 'vue'
//接受参数
import {useRoute, useRouter} from "vue-router";  // 引用vue-router
import {  getWorld,issue } from "@/api/admin/world";
import {Toast} from "vant";
const {  appContext : { config: { globalProperties } }  } = getCurrentInstance();

const router = useRouter()
// 接收url里的参数
const route = useRoute();
//console.log(route.query.id,"参数");
//世界信息
const world=ref({})
//分页信息
const dateRange = ref([]);

//评论内容与通用分页查询条件
const data = reactive({
  commentForm: {},
  queryParams: {
    pageNum: 1,
    pageSize:3,
    wid: undefined,
  },
  rules: {
    comment: [{ required: true, message: "评论不能为空", trigger: "blur" }],
  }
});
const worldStatusMap = new Map([
  [5, "正常"],
  [1, "待发布"],
  [2, "锁定"],
  [3, "隐藏"],
  [4, "删除"]
]);

const worldTypesMap=new Map([
  [6,"科学"],
  [1,"武侠"],
  [2,"仙侠"],
  [3,"魔幻"],
  [4,"奇幻"],
  [5,"其他"]
])
const { queryParams, commentForm, rules } = toRefs(data);
const wid=ref(-1);
wid.value=route.query.wid;
world.value.id = route.query.wid;
//console.log("世界id="+world.value.id);
const imgUrl = inject("$imgUrl")
const imageUrl=ref('')

//查看详细
function handleSee(id:number){
  router.push("/world/index?wid="+id);
}
function handleEdit(id:number){
  router.push("/admin/worldEdit?wid="+id);
}
const onClickLeft = () => history.back();

/** 查询世界详细 */
function handWorld(id:number) {
  getWorld(id).then(response => {
    //console.log("查询世界详细:"+JSON.stringify(response))
    world.value = response.data
    imageUrl.value=imgUrl+response.data.imgUrl;
  });
}

function handleIssoue(){
  Toast('请在PC环境操作');
  //console.log("发布："+JSON.stringify(row))
  // issue(row.id).then(response => {
  //   handWorld(world.value.id);
  // });
}
const active = ref(0);

//世界信息
handWorld(world.value.id);
</script>

<style scoped>
.van-tab{
  flex: none!important;
}
</style>
