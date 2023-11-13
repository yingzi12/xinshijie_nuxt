<template>
  <van-form @submit="onSubmit">
    <van-cell-group inset>
      <van-field
          v-model="title"
          name="名称"
          label="名称"
          placeholder="名称"
          :rules="[{ required: true, message: '请填写元素名称' }]"
      />
      <van-field
          v-model="intro"
          name="简介"
          label="简介"
          placeholder="元素简介"
          :rules="[{ required: true, message: '请填写元素简介' }]"
      />
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
            v-model="cascaderValue"
            title="请选择分类"
            :options="options"
            @close="show = false"
            @finish="onFinish"
        />
      </van-popup>
    </van-cell-group>
    <div>
      <h5>元素内容</h5>
      <van-field
          v-model="form.content"
          rows="15"
          autosize
          type="textarea"
          placeholder="请输入章节内容"
      />
    </div>
    <div style="margin: 16px;">
      <van-button round block type="primary" native-type="submit">
        提交
      </van-button>
    </div>
  </van-form>
</template>

<script lang="ts" setup>
import {ref} from "vue";
import {Dialog} from "vant";
const content =ref("<h1>文本标题2333</h1>")
const titleText =ref("替换标题文本")

function  replace(){
  Dialog.alert({
    title: '标题',
    message: '代码是写出来给人看的，附带能在机器上运行。'+content.value,
  }).then(() => {
    // on close
  });
  // content.value=titleText.value
}
const show = ref(false);
const fieldValue = ref('');
const cascaderValue = ref('');
// 选项列表，children 代表子选项，支持多级嵌套
const options = [
  {
    text: '浙江省',
    value: '330000',
    children: [{ text: '杭州市', value: '330100' }],
  },
  {
    text: '江苏省',
    value: '320000',
    children: [{ text: '南京市', value: '320100' }],
  },
];
// 全部选项选择完毕后，会触发 finish 事件
const onFinish = ({ selectedOptions }) => {
  show.value = false;
  fieldValue.value = selectedOptions.map((option) => option.text).join('/');
};

</script>

<style scoped>

</style>
