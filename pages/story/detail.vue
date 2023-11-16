<script lang="ts" setup>

import {useRoute, useRouter} from 'vue-router';
import {tansParams} from '~/utils/tools';

const config = useRuntimeConfig();

const router = useRouter();
const route = useRoute();

const world = ref({});
const commentList = ref([]);
const dateRange = ref([]);
const imgUrl = config.app.imgUrl;
const imageUrl = ref('');
const wid = ref(route.query.wid);
world.value.id = wid.value;
const data = reactive({
  commentForm: {},
  queryParams: {
    pageNum: 1,
    pageSize: 3,
    wid: parseInt(route.query.wid || '-1'),
  },
  rules: {
    comment: [{required: true, message: "评论不能为空", trigger: "blur"}],
  }
});

const {queryParams, commentForm, rules} = toRefs(data);

const onLoad = async () => {
  await handWorld(queryParams.value.wid);
  await getAllWorldManage(queryParams.value.wid);
  await getAllWorldComment();
  await getElementList();
  await getStoryList();
};

onMounted(onLoad);


function handleElementList() {
  router.push("/element/list?wid=" + world.value.id + "&wname=" + world.value.name);
}

function handleDiscuss() {
  router.push("/discuss/list?wid=" + world.value.id + "&wname=" + world.value.name + "&source=" + 1);
}

function handleCommentList() {
  router.push("/comment/list?wid=" + world.value.id + "&wname=" + world.value.name + "&source=" + 1);
}

function handleAddStory() {
  router.push("/admin/storyAdd?wid=" + world.value.id + "&wname=" + world.value.name + "&source=" + 1);
}

function handleStoryList() {
  router.push("/story/list?wid=" + world.value.id + "&wname=" + world.value.name + "&source=" + 1);
}

// function handleFllow(){
//   addFllow(wid.value).then(response => {
//     ElMessage.success("关注成功");
//   });
// }
const onClickLeft = () => history.back();

/** 查询世界详细 */
async function handWorld() {
  const response = await $fetch('/api/wiki/world/info?id=' + wid.value);
  world.value = response.data
  imageUrl.value = imgUrl + world.value.imgUrl;
}

//评论信息
async function getAllWorldComment() {
  queryParams.value.wid = wid.value;

  const response = await $fetch('/api/wiki/comment/list?' + tansParams(queryParams.value));
  commentList.value = response.data
  // imageUrl.value=imgUrl+world.value.imgUrl;
  //
  // listComment(globalProperties.addDateRange(queryParams.value, dateRange.value)).then(response => {
  //   //console.log("查询世界详细:"+JSON.stringify(response))
  //   commentList.value = response.rows
  // });
}

//管理员信息
const manageList = ref([])

//小心
async function getAllWorldManage() {
  const response = await $fetch('/api/wiki/manage/getWorldManage?wid=' + wid.value);
  manageList.value = response.data
}

//管理员信息
const elementList = ref([]);

/** 查询元素列表 */
async function getElementList() {
  queryParams.value.wid = wid.value;
  const response = await $fetch('/api/wiki/element/list?' + tansParams(queryParams.value));
  elementList.value = response.data
  // listElement(globalProperties.addDateRange(queryParams.value, dateRange.value)).then(response => {
  //   elementList.value = response.rows;
  // });
}

const storyList = ref([{}])

async function getStoryList() {
  queryParams.value.wid = wid.value;
  const response = await $fetch('/api/wiki/story/list?' + tansParams(queryParams.value));
  storyList.value = response.data
  // listStory(globalProperties.addDateRange(queryParams.value, dateRange.value)).then(response => {
  //   storyList.value = response.rows;
  // });
}

const active = ref(0);

//世界信息
handWorld();
//管理员信息
getAllWorldManage()
//评论功能
getAllWorldComment()
getElementList()
getStoryList();
</script>

<template>
  <!--  标题-->
  <van-nav-bar
      title="世界详细"
      left-text="返回"
      left-arrow
      @click-left="onClickLeft"
  />
  <div class="novel novel-merge book-detail-x">
    <div class="book-detail-info">
      <div class="book-layout">
        <!--        <img style="width: 145px;height: 192px"-->
        <!--             :src="imgUrl+world.imgUrl"-->
        <!--             onerror="this.src='/style/image/empty2.webp'"-->
        <!--             class="book-cover-blur" :alt="world.name"/>-->
        <img src="https://www.51xs.uk/files/article/image/8/8719/8719s.jpg" onerror="this.src='style/image/empty.jpg'"
             alt="凡间狱" class="book-cover">
        <div class="book-cell">
          <h1 class="book-title">凡间狱</h1>
          <p class="book-meta a">
            <!--            <a href="/?66/">科幻·灵异</a>-->
            <van-tag round type="danger" size="default">科幻·灵异</van-tag>
            <van-tag round type="danger" size="default">科幻·灵异</van-tag>

            <!--            <a href="/?pbcode/author/风尘散人/">风尘散人</a>-->
          </p>
          <p class="book-meta">浏览：<font id="visits8719">865</font>人在看<a class="dt dt0"
                                                                             href="https://www.51xs.uk/?pbcode/txt/66/8719/"
                                                                             target="_blank">下载TXT</a></p>
          <p class="book-meta" id="newtime">时间：2019-12-27 13:01:12</p>
          <p class="book-meta" id="newchapter">最新：<a href="/?pbcode/article/7259/">第0412章 终章</a></p>
        </div>
        <div class="contentxx" style="float:left;width:100%;padding:0px;background:none;margin:10px 0px 0px 0px">
          <a href="/?pbcode/tags/" title="Tags标签">Tags标签</a>：
          <a href="/?pbcode/tags/20999/" title="凡间">凡间</a>、<a href="/?pbcode/tags/21000/"
                                                                  title="金盆洗手">金盆洗手</a>、<a
            href="/?pbcode/tags/21001/" title="盗墓贼">盗墓贼</a>、<a href="/?pbcode/tags/21002/"
                                                                     title="结果">结果</a>、<a
            href="/?pbcode/tags/21003/" title="天大">天大</a>、<a href="/?pbcode/tags/21004/" title="漩涡">漩涡</a>、<a
            href="/?pbcode/tags/21005/" title="诡异">诡异</a>、<a href="/?pbcode/tags/21006/" title="寿衣">寿衣</a>、<a
            href="/?pbcode/tags/21007/" title="夜游者">夜游者</a>、<a href="/?pbcode/tags/21008/"
                                                                     title="卫道士">卫道士</a></div>
      </div>

      <div class="share4xx">
        <strong>分享到：</strong>
        <a href="javascript:" title="微信扫码分享" onclick="share4xx(8719)" class="a1"></a>
        <a href="https://sns.qzone.qq.com/cgi-bin/qzshare/cgi_qzshare_onekey?url=https://www.51xs.uk/?pbcode/contents/66/8719.html&amp;title=凡间狱&amp;summary=我是一个金盆洗手的盗墓贼，为了寻找失踪的秦教授，不得不重操旧业，结果却意外卷入一个天大的漩涡，也遇到了许多诡异事件。寿衣出行的夜游者。衔尸寻仇的死人头。光怪陆离，不可想象。为了求生，我不得不摇身一变，成为一个卫道士。古老的职业，亘古长存，戍守在黑夜与黎明之间，对抗冥冥中一切不可预知的存在。天有道，万灵亦有道。长夜漫漫，勿问归途……&amp;pics=https://www.51xs.uk/files/article/image/8/8719/8719s.jpg"
           title="分享到QQ空间" target="_blank" class="a2"></a>
        <a href="https://service.weibo.com/share/share.php?url=https://www.51xs.uk/?pbcode/contents/66/8719.html&amp;title=凡间狱//我是一个金盆洗手的盗墓贼，为了寻找失踪的秦教授，不得不重操旧业，结果却意外卷入一个天大的漩涡，也遇到了许多诡异事件。寿衣出行的夜游者。衔尸寻仇的死人头。光怪陆离，不可想象。为了求生，我不得不摇身一变，成为一个卫道士。古老的职业，亘古长存，戍守在黑夜与黎明之间，对抗冥冥中一切不可预知的存在。天有道，万灵亦有道。长夜漫漫，勿问归途……（分享自 @51小说）&amp;pic=https://www.51xs.uk/files/article/image/8/8719/8719s.jpg"
           title="分享到新浪微博" target="_blank" class="a3"></a>
        <a href="https://connect.qq.com/widget/shareqq/index.html?url=https://www.51xs.uk/?pbcode/contents/66/8719.html&amp;title=凡间狱&amp;summary=我是一个金盆洗手的盗墓贼，为了寻找失踪的秦教授，不得不重操旧业，结果却意外卷入一个天大的漩涡，也遇到了许多诡异事件。寿衣出行的夜游者。衔尸寻仇的死人头。光怪陆离，不可想象。为了求生，我不得不摇身一变，成为一个卫道士。古老的职业，亘古长存，戍守在黑夜与黎明之间，对抗冥冥中一切不可预知的存在。天有道，万灵亦有道。长夜漫漫，勿问归途……&amp;pics=https://www.51xs.uk/files/article/image/8/8719/8719s.jpg"
           title="分享给QQ好友" target="_blank" class="a5"></a>
        <div class="ma-img-box" id="ma-img-box-8719" title="微信扫码分享">
          <div class="ma-img" id="ma-img-8719"
               data="https://www.51xs.uk/core/qrcode.php?string=https://www.51xs.uk/?pbcode/contents/66/8719.html"></div>
          <div class="ma-close" onclick="share4xx(8719)">关闭</div>
        </div>
      </div>
      <div class="book-detail-btn">
        <ul class="btn-group">
          <li class="btn-group-cell"><a href="/?pbcode/article/6848/" id="continue-reading"
                                        class="btn-normal">立即阅读</a></li>
          <li class="btn-group-cell"><a href="/?pbcode/chapter/8719/" class="btn-normal white">章节目录</a></li>
          <li class="btn-group-cell"><a href="/?pbcode/article/6848/#ting" class="btn-normal white">听 书</a></li>
        </ul>
        <p class="lastread" id="lastread"></p>
      </div>
    </div>
  </div>
  <van-tabs v-model:active="active">
    <van-tab title="简介" class="tab-title">
      <div class="detail-tab">
      <div v-html="world.description"/>
      </div>
    </van-tab>
    <van-tab title="元素" class="tab-title">
      <div class="detail-tab">
      <van-list>
        <van-cell v-for="element in elementList" :title="element.title" :value="element.updateTime"
                  :label="element.intro"
                  :to="{path:'/element/index', query: {eid:element.id,wid:element.wid,temType:element.softtype}}"/>
      </van-list>
      <a v-if="elementList.length > 0" href="">
        <van-nav-bar title="更多"/>
      </a>
        </div>
    </van-tab>
    <van-tab title="故事" class="tab-title">
      <div class="detail-tab">
      <van-list>
        <van-cell v-for="story in storyList" :title="story.name" :value="story.updateTime" :label="story.intro" is-link
                  :to="{path:'/story/index', query: {sid:story.id,wid:story.wid}}"/>
      </van-list>
      <a v-if="storyList.length > 0" href="">
        <van-nav-bar title="更多"/>
      </a>
        </div>
    </van-tab>
    <van-tab title="创造者" class="tab-title">
      <div class="detail-tab">
      <van-list>
        <van-cell v-for="manage in manageList" :title="manage.userName" :value="manage.ranks" :label="manage.sign"/>
      </van-list>
      </div>
    </van-tab>
  </van-tabs>
  <van-divider/>

  <div class="novel">
    <div class="CommentBox" id="CommentBox">
      <div class="novel-header">
        <div class="novel-header-l">
          <h3 class="novel-title">发表评论</h3>
        </div>
      </div>

      <div class="c mbl">
        <div class="f">
          <form name="formcomment" id="formcomment" method="post"
                action="https://www.51xs.uk/?comment/add/&amp;contentid=8719" onsubmit="return cgSubmit();">
            <div class="txt">
              <div class="ny">内容：</div>
              <div class="words_box">
                <textarea name="comment" id="comment" required="" rows="6" cols="58" tabindex="2" title="评论内容"
                          onchange="cgCount(this)" onkeyup="cgCount(this)"></textarea>
              </div>

            </div>
            <div class="ckc">
              <span class="ny">验证码：</span>
              <input type="text" name="checkcode" required="" id="checkcode" placeholder="请输入验证码">
              <img src="https://www.51xs.uk/core/code.php"
                   onclick="this.src='https://www.51xs.uk/core/code.php?t='+(new Date).getTime()" height="26">
            </div>
            <div class="btn">
              <div class="tj">
                <input type="submit" name="newcommu" tabindex="4" value="提交评论" title="提交评论">
              </div>
              <div class="div_r">剩余字数：<b id="cgNum">360</b>/360</div>
            </div>

            <!--            <style>-->
            <!--              .CommentBox .c .ckc{ float: left; margin-top: 5px; width: calc(100% - 42px); margin-left: 47px; height: 26px; overflow: hidden; }-->
            <!--              .CommentBox .c .ckc input{ float: left; padding: 0px; border: 1px solid #dedddd; height: calc(100% - 2px); overflow: hidden;text-indent:5px; }-->
            <!--              .CommentBox .c .ckc img{ height: 100%; margin-left: 5px; cursor: pointer; }-->
            <!--            </style>-->


          </form>
        </div>
      </div>
      <div class="ccbox mbl" id="ccbox">
        <ul class="ulc" id="ulc">

          <li>
            <div class="pic"><img src="https://www.51xs.uk/uploads/empty/33.gif"></div>
            <div class="words">
              <p>嘿嘿……
              </p>
            </div>
            <div class="info">
              <div class="name"><span>发表人：</span>乡秀树
              </div>
              <div class="time"><span>发表于：</span>2023-11-13 22:01:35</div>
            </div>
          </li>
          <li>
            <div class="pic"><img src="https://www.51xs.uk/uploads/empty/81.gif"></div>
            <div class="words">
              <p>╮(╯▽╰)╭好……
              </p>
            </div>
            <div class="info">
              <div class="name"><span>发表人：</span>ζ朢山朢水咫朢妳υ
              </div>
              <div class="time"><span>发表于：</span>2023-11-13 17:42:53</div>
            </div>
          </li>
          <li>
            <div class="pic"><img src="https://www.51xs.uk/uploads/empty/67.gif"></div>
            <div class="words">
              <p>亲爱滴------顶你啊--------------
              </p>
            </div>
            <div class="info">
              <div class="name"><span>发表人：</span>↘荷叶绿了
              </div>
              <div class="time"><span>发表于：</span>2023-11-12 17:24:12</div>
            </div>
          </li>
        </ul>

        <div class="cm">
          <div class="i">每页显示<b>10</b>条</div>
          <div class="n">
            <div><img src="https://www.51xs.uk/template/tpl/image/loading.gif" id="cIMG" style="display: none;"></div>
            <div><a class="info">第<b>1</b>页</a><a class="no" title="没有上一页">&lt;&lt;</a><a class="no"
                                                                                                 title="已经是第一页了">&lt;</a>
            </div>
            <div><a href="javascript:commentNow('8719','1','yes');" title="下一页">&gt;</a><a
                href="javascript:commentNow('8719','1','yes');" title="最后一页">&gt;&gt;</a></div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.van-tab {
  flex: none !important;
}
.detail-tab{
  min-height: 100px;
  background-color: white;
}
.tab-title{
  background-color: #1E9FFF;
  font-size: 20px;
}
</style>
