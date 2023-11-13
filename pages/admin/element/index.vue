<template>
  <!--  标题-->
  <van-nav-bar
      :title="world.name"
      left-text="返回"
      left-arrow
      @click-left="onClickLeft"
  />
  <div >
    <!--  元素名称-->
    <div >
      <h1 class="title">{{ worldElement.title }}</h1>
      <div class="lessen"><span>分类:</span>
        <el-tag size="small" v-for="cname in worldElement.cnameList">
          {{cname}}
        </el-tag>
      </div>
      <div class="lessen"><span>更新时间:</span><el-tag size="small">{{worldElement.updateTime}}</el-tag></div>
    </div>
    <van-divider />
    <!--  简介 -->
    <div style="margin-bottom: 20px;margin-left: 25px">
      <div v-html="worldElement.intro"> </div>
    </div>
    <!-- 元素内容 -->
    <component :is="temPage"  v-bind="worldElement" ></component>
    <van-divider />
    <!--功能-->
    <div class="center" style="height: 80px;">
      <van-button @click="handleReturn()">返回</van-button>
    </div>
  </div>
</template>

<script lang="ts" setup>
import {markRaw, reactive, ref, shallowRef} from 'vue'
import {  getElementDetails } from "@/api/wiki/element";
import {  getWorld } from "@/api/wiki/world";
//接受参数
import { useRoute ,useRouter}  from "vue-router";

// import biologly from '../view/biology'
// import goods from '../view/goods'
import index from '../view/index'
// import race from '../view/race'
// import role from '../view/role'

const temTypesMap=new Map([
  [1,shallowRef(index)],
  [2,shallowRef(index)],
  [3,shallowRef(index)],
  [4,shallowRef(index)],
  [5,shallowRef(index)],
])

const router = useRouter()
// 接收url里的参数
const route = useRoute();

const temType = ref(1);
if(!route.query.temType || isNaN(route.query.temType)){
  temType.value =1
}else {
  temType.value =route.query.temType;
  if(temType.value>5 || temType.value<=0 ){
    temType.value =1
  }
}
const  temPage=temTypesMap.get(parseInt(temType.value))
const worldElement=ref({})

//世界信息
const eid = ref(null);
const wid = ref(null);
eid.value = route.query.eid;
wid.value = route.query.wid;

/** 查询元素详细 */
function getElement() {
  getElementDetails(wid.value,eid.value).then(response => {
    worldElement.value = response.data
  });
}

function handleList(){
  router.push("/element/list?wid="+ wid.value+"&deid=" +eid.value)
}

function handleReturn(){
  router.back()
}
const world=ref({})
/** 查询世界详细 */
function handWorld() {
  getWorld(wid.value).then(response => {
    //console.log("查询世界详细:"+JSON.stringify(response))
    world.value = response.data
  });
}
const onClickLeft = () => history.back();
handWorld()
getElement();

</script>

<style scoped>
img{
  width: 100%;
}
</style>
