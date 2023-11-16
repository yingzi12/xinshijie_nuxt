<template>
  <!--  标题-->
  <van-nav-bar
      title="编辑故事"
      left-text="返回"
      left-arrow
      @click-left="onClickLeft"
  />
  <van-form @submit="onSubmit">
    <van-cell-group inset>
      <van-field name="uploader" label="图片">
        <template #input>
          <van-uploader result-type="file"  :before-read="beforeRead"  v-model="imageUrl" :max-count="1" :max-size="5000 * 1024" @oversize="onOversize" :after-read="afterRead" @delete="handleDeleteImage"/>
        </template>
      </van-field>
      <van-field
          v-model="form.name"
          name="名称"
          label="名称"
          placeholder="名称"
          :rules="[{ required: true, message: '请填写名称' },{ min: 1, max: 100, message: '故事名称长度必须介于 1 和 100 之间'},]"

      />
      <van-field name="radio" label="数据源" >
        <template #input>
          <van-checkbox-group v-model="form.checkList" direction="horizontal" @click="handleSurce">
            <van-checkbox  v-if="ischeck==0  || ischeck==1" name="原创">原创</van-checkbox>
            <van-checkbox  v-if="ischeck==0 || ischeck==2" name="游戏">游戏</van-checkbox>
            <van-checkbox  v-if="ischeck==0 || ischeck==2" name="小说">小说</van-checkbox>
            <van-checkbox  v-if="ischeck==0 || ischeck==2" name="电影">电影</van-checkbox>
            <van-checkbox  v-if="ischeck==0 || ischeck==2" name="动漫">动漫</van-checkbox>
            <van-checkbox  v-if="ischeck==0 || ischeck==2" name="电视剧">电视剧</van-checkbox>
            <van-checkbox  v-if="ischeck==0 || ischeck==2"  name="其他">其他</van-checkbox>
          </van-checkbox-group>
        </template>
      </van-field>
<!--      类别-->
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
              v-model="typeValue"
              title="请选择分类"
              :options="worldType"
              @close="show = false"
              @finish="onFinish"
          />
        </van-popup>
<!--      分类-->
      <van-field
          v-model="form.intro"
          rows="2"
          autosize
          type="textarea"
          maxlength="50"
          show-word-limit
          name="简介"
          label="简介"
          placeholder="简介"
          :rules="[{ required: true, message: '请填写简介' }]"
      />
      <van-field
          v-model="form.description"
          rows="2"
          autosize
          type="textarea"
          maxlength="50"
          show-word-limit
          name="说明"
          label="说明"
          placeholder="说明"
          :rules="[{ required: true, message: '请填写说明' }]"
      />

    </van-cell-group>
    <div style="margin: 16px;">
      <van-button round block type="primary" native-type="submit">
        提交
      </van-button>
    </div>
  </van-form>
</template>

<script lang="ts" setup>
import {inject, reactive, ref, toRefs} from 'vue'
import {  updateWorld,updateImage ,getWorld} from "@/api/admin/world";
import {useRoute, useRouter} from "vue-router";
import {Dialog, Toast} from "vant";
const router = useRouter()
// 接收url里的参数
const route = useRoute();
//console.log(route.query.wid,"参数");
const wid = ref(null);
wid.value = route.query.wid;

const data = reactive({
  form: {},
  queryParams: {
    pageNum: 1,
    name: '',
    types: undefined,
  },
  rules: {
    name: [{ required: true, message: "故事名称不能为空", trigger: "blur" }, { min: 1, max: 100, message: "故事名称长度必须介于 1 和 100 之间", trigger: "blur" }],
    wid: [{ required: true, message: "世界编号不能为空", trigger: "blur" }],
    wname: [{ required: true, message: "世界名称不能为空", trigger: "blur" }],
    types: [{ required: true, message: "必须选择分类", trigger: "blur" }],
    checkList: [{ required: true, message: "必须选择分类", trigger: "blur" }],
    intro: [{ required: true, message: "故事简介不能为空", trigger: "blur" }, { min: 10, max: 300, message: "故事简介长度必须介于 10 和 300 之间", trigger: "blur" }],
    description: [{ required: true, message: "故事描述不能为空", trigger: "blur" }, { min: 10, max:1000, message: "故事描述长度必须介于 2 和 1000 之间", trigger: "blur" }],

  }
});
interface Image {
  url: string
}
const { queryParams, form, rules } = toRefs(data);

const imgUrl = config.app.imgUrl;
const imageUrl = ref<[Image]>([{url:""}]);
const wname = ref('');
const onSubmit = (values) => {
  console.log('submit', values);
  console.log('form', JSON.stringify(form));
  form.value.types=typeValue.value
  form.value.source=form.value.checkList.map(String).join(';')
  updateWorld(form.value).then(response => {
    console.log("修改成功:"+    JSON.stringify(response))
    router.push("/admin/world?wid="+form.value.id);
  })
};
const onClickLeft = () => history.back();

const show = ref(false);
const fieldValue = ref('武侠');
const typeValue = ref(1);
// 选项列表，children 代表子选项，支持多级嵌套
const worldType = [
  { text: '武侠', value: 1 },
  { text: '仙侠', value: 2 },
  { text: '魔幻', value: 3 },
  { text: '奇幻', value: 4 },
  { text: '其他', value: 5 },
  { text: '科学', value: 6 },
];
const worldTypesMap=new Map([
  [6,"科学"],
  [1,"武侠"],
  [2,"仙侠"],
  [3,"魔幻"],
  [4,"奇幻"],
  [5,"其他"]
])
// 全部选项选择完毕后，会触发 finish 事件
const onFinish = ({ selectedOptions }) => {
  show.value = false;
  fieldValue.value = selectedOptions.map((option) => option.text).join('/');
};

const onOversize = (file) => {
  console.log(file);
  Toast('文件大小不能超过 5Mkb');
};
// 返回布尔值
const beforeRead = (file) => {
  if (!/.(jpg|jpeg|png)$/.test(file.type) ) {
    Toast('请上传 jpg,jpeg,png 格式图片');
    return false;
  }
  return true;
};


const afterRead = (file) => {
  const tempFile = file.file
  const type = tempFile.type
  const size = tempFile.size
  const newName = new Date().getTime() + tempFile.name
  let uploadFile = new File([tempFile],newName,{type,size})
  // 此时可以自行将文件上传至服务器
  let formData = new FormData()
  formData.append('upload',uploadFile)
  updateImage(formData).then(
      response => {
        form.value.imgUrl=response.fileName
        imageUrl.value[0].url=response.url
      }
  )

};
//删除图片
function handleDeleteImage(){
  form.value.imgUrl="";
}
const  intro=ref('')

//源
const ischeck=ref(0)
function handleSurce(){
  if(form.value.checkList.length==0){
    ischeck.value=0;
  }else {
    if (form.value.checkList.indexOf("原创") != -1) {
      ischeck.value = 1;
    } else {
      ischeck.value = 2;
    }
  }
}

/** 查询世界详细 */
function handleWorld() {
  getWorld(wid.value).then(response => {
    form.value = response.data
    form.value.checkList=form.value.source.split(';')
    imageUrl.value[0].url=imgUrl+response.data.imgUrl
    typeValue.value=response.data.types
    fieldValue.value=worldTypesMap.get(response.data.types)
    // getWorld(form.value.wid).then(response => {
    //   form.value.wid= response.data.id;
    //   form.value.wname= response.data.name;
    //   intro.value=response.data.intro
    // });
    handleSurce()
  });
  console.log(JSON.stringify(form))
}
handleWorld();
</script>

<style scoped>

</style>
