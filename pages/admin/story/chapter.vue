<template>
  <!--  标题-->
  <van-nav-bar
      :title="sname"
      left-text="返回"
      right-text="创建章节"
      left-arrow
      @click-left="onClickLeft"
      @click-right="onClickRight"

  />
  <van-list>
    <van-swipe-cell v-for="reel in chapterList">
      <van-cell :border="false" :title="reel.title" :value="reel.createTime" />
      <template #right>
        <van-button square type="primary" text="查看内容" @click="handleSee(reel)" />
        <van-button square type="success" text="修改" @click="handleUpdate(reel)" />
        <!--        <van-button square type="success" text="修改" @click="onClickUpdateShow(reel.title)" />-->
        <van-button square type="danger" text="删除" @click="handleDelete(reel.sid,reel.id)"/>
      </template>
    </van-swipe-cell>
  </van-list>
<!--添加-->
  <van-action-sheet v-model:show="show" title="标题">
    <div class="content">
      <van-form @submit="handleReelAdd">
        <van-cell-group inset>
          <van-field
              v-model="form.title"
              name="分类/目录"
              label="分类/目录"
              placeholder="分类/目录"
              :rules="[{ required: true, message: '请填写分类/目录' }]"
          />
        </van-cell-group>
        <div style="margin: 16px;">
          <van-button round block type="primary" native-type="submit">
            提交
          </van-button>
        </div>
      </van-form>
    </div>
  </van-action-sheet>

  <van-action-sheet v-model:show="updateShow" title="标题">
    <div class="content">
      <van-form @submit="handleUpdateName">
        <van-cell-group inset>
          <van-field
              v-model="form.title"
              name="分类/目录"
              label="分类/目录"
              placeholder="分类/目录"
              :rules="[{ required: true, message: '请填写分类/目录' }]"
          />
        </van-cell-group>
        <div style="margin: 16px;">
          <van-button round block type="primary" native-type="submit">
            提交
          </van-button>
        </div>
      </van-form>
    </div>
  </van-action-sheet>

</template>

<script lang="ts" setup>
import {  listChapter,delChapter,addChapter,updateChapterName } from "@/api/admin/chapter";
import {getCurrentInstance, reactive, ref, toRefs} from "vue";
import {useRoute, useRouter} from "vue-router";
import type {FormInstance} from "vant";
import {Dialog} from "vant";

const route = useRoute();
const router = useRouter();

const config = useRuntimeConfig();

const sid = ref(null);
sid.value = route.query.sid;
const scid = ref(null);
scid.value = route.query.scid;
const sname = ref('');
sname.value = <string>route.query.sname;

const data = reactive({
  form: {},
  queryParams: {
    pageNum: 1,
    title: undefined,
    sid:sid.value,
    pid:scid.value,
    level:1
  },
  rules: {
    title: [{ required: true, message: "分类/目录名称不能为空", trigger: "blur" }, { min: 2, max: 20, message: "用户名称长度必须介于 2 和 20 之间", trigger: "blur" }],
  }
});
const ruleFormRef = ref<FormInstance>()
const { queryParams, form, rules } = toRefs(data);
const chapterList = ref([]);
const total = ref(0);
const dateRange = ref([]);
const onClickLeft = () => history.back();
const show=ref(false)
const updapteShow=ref(false)

const onClickRight = () => {
  router.push("/admin/chapterAdd?sid="+sid.value+"&sname="+sname.value+"&scid="+scid.value);
}

const handleReelAdd =  () => {
  // dialogVisible.value=false
  form.value.sid=sid.value
  addChapter(form.value).then(response => {
    console.log("添加成功:" + JSON.stringify(response))
    form.value.title = ''
    form.value.id = -1
    show.value=false

    getList();
  });
}

const title = ref('');

const handleUpdateName =  () => {
  // dialogUpdateNameVisible.value=false
  form.value.sid=sid.value
  updateChapterName(form.value).then(response => {
    console.log("修改成功:"+JSON.stringify(response))
    form.value.title=''
    updapteShow.value=false
    getList();
  })
}
function handleDelete (sid:number,id:number){
  Dialog.confirm({
    title: '警告',
    message:
        '是否确定该删除改分卷/目录,一旦删除将无法恢复',
  }).then(() => {
     delChapter(sid,id).then(response => {
       getList();
     })
  }).catch(() => {});
}

function handleSee(reel){
  router.push("/chapter/index?sid="+reel.sid+"&sname="+sname.value+"&scid="+reel.id+"&scname="+reel.title+"&wid="+reel.wid);
}
function handleUpdate(reel){
  router.push("/admin/chapterEdit?sid="+reel.sid+"&sname="+sname.value+"&scid="+reel.id+"&scname="+reel.title+"&wid="+reel.wid);
}

/** 查询元素列表 */
function getList() {
  listChapter(globalProperties.addDateRange(queryParams.value, dateRange.value)).then(response => {
    chapterList.value = response.rows;
    total.value = response.total;
  });
}
getList();
</script>

<style scoped>
.content {
  padding: 16px 16px 160px;
}
</style>
