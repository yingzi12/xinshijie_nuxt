<script lang="ts" setup>
const config = useRuntimeConfig();
const imgUrl=config.app.imgUrl
const active = ref(0);


const selectWorldName=ref(undefined);

//编辑推荐 4个
const worldEditList = ref([]);
async function getEditList() {
  const request = await $fetch('/api/wiki/recommendWorld/list?kind=2').catch((error) => error.data)
  worldEditList.value=request.value.data
}
//最新
//随机推荐 18个
const worldNewList = ref([]);
async function getNewList() {
  const request = await $fetch('/api/wiki/recommendWorld/list?kind=5').catch((error) => error.data)
  worldNewList.value=request.value.data
}

const worldRandomList = ref([]);
//随机推荐4个
async function getRandomList() {
  const request = await $fetch('/api/wiki/recommendWorld/list?kind=8').catch((error) => error.data)
  worldRandomList.value=request.value.data
}
//精品 9个
const boutiqueList = ref([]);
async function getBoutiqueList() {
  const request = await $fetch('/api/wiki/recommendWorld/list?kind=17').catch((error) => error.data)
  boutiqueList.value=request.value.data

}

const activeList = ref([]);
async function getActiveList() {
  const request = await $fetch('/api/wiki/recommendWorld/list?kind=11').catch((error) => error.data)
  activeList.value = request.value.data
}
function selectWname(){

}
getNewList();
getEditList();
getRandomList();
getBoutiqueList();
getActiveList();
</script>
<template>

  <van-search class="div-maggin" v-model="selectWorldName" placeholder="请输入搜索关键词"
               @search="selectWname"
  />
  <van-divider style="margin: 0px;" />
  <van-grid class="div-maggin home-nav"  :border="false" :column-num="6">
    <van-grid-item icon='/icon/solution2.svg' text="优秀世界" to="/world/index"/>
    <van-grid-item icon='/icon/novel.svg' text="热门故事" to="/story/index" />
    <van-grid-item icon='/icon/user.svg' text="收藏" to="/user/index"/>
  </van-grid>
  <!--  轮播栏目-->
  <van-swipe class="my-swipe div-maggin" :autoplay="3000" indicator-color="white">
    <van-swipe-item><van-image width="100%" height="200px" fit="fill" src='/head/9.jpeg'/></van-swipe-item>
    <van-swipe-item><van-image width="100%" height="200px" fit="fill" src='/head/10.jpeg'/></van-swipe-item>
    <van-swipe-item><van-image width="100%" height="200px" fit="fill" src='/head/9.jpeg'/></van-swipe-item>
    <van-swipe-item><van-image width="100%" height="200px" fit="fill" src='/head/9.jpeg'/></van-swipe-item>
    <van-swipe-item><van-image width="100%" height="200px" fit="fill" src='/head/11.jpeg'/></van-swipe-item>
  </van-swipe>
  <van-divider style="margin: 0px;" />
  <div class="novel">
    <div class="novel-header">
      <div class="novel-header-l">
        <h3 class="novel-title">世界-热门推荐</h3>
      </div>
      <div class="novel-header-r">
        <a href="/?pbcode/shuku/">更多</a>
      </div>
    </div>
    <div class="novel-slide">
      <ol class="novel-slide-ol">

        <li class="novel-slide-li">
          <a href="/?pbcode/contents/66/8719.html" class="novel-slide-a" title="凡间狱">
            <img crs="https://www.51xs.uk/files/article/image/8/8719/8719s.jpg" src="https://www.51xs.uk/files/article/image/8/8719/8719s.jpg" onerror="this.src='style/image/empty.jpg'" class="novel-slide-img" alt="凡间狱">
            <div class="novel-slide-caption">凡间狱</div>
            <p class="novel-slide-author"><span class="gray">风尘散人</span></p>
          </a>
        </li>
        <li class="novel-slide-li">
          <a href="/?pbcode/contents/55/8717.html" class="novel-slide-a" title="网游三国之城市攻略">
            <img crs="https://www.51xs.uk/files/article/image/8/8717/8717s.jpg" src="https://www.51xs.uk/files/article/image/8/8717/8717s.jpg" onerror="this.src='style/image/empty.jpg'" class="novel-slide-img" alt="网游三国之城市攻略">
            <div class="novel-slide-caption">网游三国之城市攻略</div>
            <p class="novel-slide-author"><span class="gray">百里玺</span></p>
          </a>
        </li>
        <li class="novel-slide-li">
          <a href="/?pbcode/contents/33/8712.html" class="novel-slide-a" title="升迁之路">
            <img crs="https://www.51xs.uk/files/article/image/8/8712/8712s.jpg" src="https://www.51xs.uk/files/article/image/8/8712/8712s.jpg" onerror="this.src='style/image/empty.jpg'" class="novel-slide-img" alt="升迁之路">
            <div class="novel-slide-caption">升迁之路</div>
            <p class="novel-slide-author"><span class="gray">夏言冰</span></p>
          </a>
        </li>
        <li class="novel-slide-li">
          <a href="/?pbcode/contents/44/8713.html" class="novel-slide-a" title="凰歌千秋">
            <img crs="https://www.51xs.uk/files/article/image/8/8713/8713s.jpg" src="https://www.51xs.uk/files/article/image/8/8713/8713s.jpg" onerror="this.src='style/image/empty.jpg'" class="novel-slide-img" alt="凰歌千秋">
            <div class="novel-slide-caption">凰歌千秋</div>
            <p class="novel-slide-author"><span class="gray">白鹭成双</span></p>
          </a>
        </li>
        <li class="novel-slide-li">
          <a href="/?pbcode/contents/44/8714.html" class="novel-slide-a" title="狂兵龙王">
            <img crs="https://www.51xs.uk/files/article/image/8/8714/8714s.jpg" src="https://www.51xs.uk/files/article/image/8/8714/8714s.jpg" onerror="this.src='style/image/empty.jpg'" class="novel-slide-img" alt="狂兵龙王">
            <div class="novel-slide-caption">狂兵龙王</div>
            <p class="novel-slide-author"><span class="gray">卿卫军</span></p>
          </a>
        </li>
        <li class="novel-slide-li">
          <a href="/?pbcode/contents/44/8715.html" class="novel-slide-a" title="侯府后院是非多">
            <img crs="https://www.51xs.uk/files/article/image/8/8715/8715s.jpg" src="https://www.51xs.uk/files/article/image/8/8715/8715s.jpg" onerror="this.src='style/image/empty.jpg'" class="novel-slide-img" alt="侯府后院是非多">
            <div class="novel-slide-caption">侯府后院是非多</div>
            <p class="novel-slide-author"><span class="gray">汪了个喵</span></p>
          </a>
        </li>
        <li class="novel-slide-li">
          <a href="/?pbcode/contents/33/8710.html" class="novel-slide-a" title="宫倾">
            <img crs="https://www.51xs.uk/files/article/image/8/8710/8710s.jpg" src="https://www.51xs.uk/files/article/image/8/8710/8710s.jpg" onerror="this.src='style/image/empty.jpg'" class="novel-slide-img" alt="宫倾">
            <div class="novel-slide-caption">宫倾</div>
            <p class="novel-slide-author"><span class="gray">泪千姒</span></p>
          </a>
        </li>
        <li class="novel-slide-li">
          <a href="/?pbcode/contents/33/8711.html" class="novel-slide-a" title="一品御厨">
            <img crs="https://www.51xs.uk/files/article/image/8/8711/8711s.jpg" src="https://www.51xs.uk/files/article/image/8/8711/8711s.jpg" onerror="this.src='style/image/empty.jpg'" class="novel-slide-img" alt="一品御厨">
            <div class="novel-slide-caption">一品御厨</div>
            <p class="novel-slide-author"><span class="gray">墨轻愁</span></p>
          </a>
        </li>			</ol>
    </div>
  </div>
  <div class="novel">
    <div class="novel-header">
      <div class="novel-header-l">
        <h3 class="novel-title">世界-热门</h3>
        <span class="novel-title-desc">经典不错过</span>
      </div>
      <div class="novel-header-r">
        <a href="/?pbcode/quanben/" class="novel-header-btn">更多</a>
      </div>
    </div>
    <ol class="book-ol book-ol-normal">

      <li class="book-li">
        <a href="/?pbcode/contents/66/8719.html" class="book-layout">
          <img crs="https://www.51xs.uk/files/article/image/8/8719/8719s.jpg" src="https://www.51xs.uk/files/article/image/8/8719/8719s.jpg" onerror="this.src='style/image/empty.jpg'" class="book-cover" alt="凡间狱">
          <div class="book-cell">
            <h4 class="book-title">凡间狱</h4>
            <p class="book-desc">我是一个金盆洗手的盗墓贼，为了寻找失踪的秦教授，不得不重操旧业，结果却意外卷入一个天大的漩涡，也遇到了许多诡异事件。寿衣出行的夜游者。衔尸寻仇的死人头。光怪陆离，不可想象。为了求生，我不得不摇身一变，成为一个卫道士。古老的职业，亘古长存，戍守在黑夜与黎明之间，对抗冥冥中一切不可预知的存在。天有道，万灵亦有道。长夜漫漫，勿问归途……</p>
            <div class="book-meta">
              <div class="book-meta-l"><span class="book-author">风尘散人</span></div>
              <div class="book-meta-r">
							<span class="tag-small-group origin-right">
								<em class="tag-small red">已完结</em>
								<em class="tag-small blue">865人在看</em>
							</span>
              </div>
            </div>
          </div>
        </a>
      </li>
      <li class="book-li">
        <a href="/?pbcode/contents/55/8717.html" class="book-layout">
          <img crs="https://www.51xs.uk/files/article/image/8/8717/8717s.jpg" src="https://www.51xs.uk/files/article/image/8/8717/8717s.jpg" onerror="this.src='style/image/empty.jpg'" class="book-cover" alt="网游三国之城市攻略">
          <div class="book-cell">
            <h4 class="book-title">网游三国之城市攻略</h4>
            <p class="book-desc">【起点第四编辑组签约作品】类型：城市建设+即时战略=网游三国之城市攻略简介：战争，就是烧军饷、烧粮食、烧士兵、烧物资，没有一个强悍的后方基地怎么行呢？主角展小白要在三国里掀起一股建设狂潮。建设乡村、探索名士、攀升科技、兴修水利、开垦农田、勘探矿业、繁荣贸易、筹集装备、驯养马匹、整顿士气、征服领土，引领三国。</p>
            <div class="book-meta">
              <div class="book-meta-l"><span class="book-author">百里玺</span></div>
              <div class="book-meta-r">
							<span class="tag-small-group origin-right">
								<em class="tag-small red">已完结</em>
								<em class="tag-small blue">852人在看</em>
							</span>
              </div>
            </div>
          </div>
        </a>
      </li>
      <li class="book-li">
        <a href="/?pbcode/contents/33/8712.html" class="book-layout">
          <img crs="https://www.51xs.uk/files/article/image/8/8712/8712s.jpg" src="https://www.51xs.uk/files/article/image/8/8712/8712s.jpg" onerror="this.src='style/image/empty.jpg'" class="book-cover" alt="升迁之路">
          <div class="book-cell">
            <h4 class="book-title">升迁之路</h4>
            <p class="book-desc">是农家子弟，抑或是元老后裔？且看在扑朔迷离的身世中，林远方如何自如地操控着升迁密码，成为共和国一颗冉冉升起的政治新星</p>
            <div class="book-meta">
              <div class="book-meta-l"><span class="book-author">夏言冰</span></div>
              <div class="book-meta-r">
							<span class="tag-small-group origin-right">
								<em class="tag-small red">已完结</em>
								<em class="tag-small blue">800人在看</em>
							</span>
              </div>
            </div>
          </div>
        </a>
      </li>
      <li class="book-li">
        <a href="/?pbcode/contents/44/8713.html" class="book-layout">
          <img crs="https://www.51xs.uk/files/article/image/8/8713/8713s.jpg" src="https://www.51xs.uk/files/article/image/8/8713/8713s.jpg" onerror="this.src='style/image/empty.jpg'" class="book-cover" alt="凰歌千秋">
          <div class="book-cell">
            <h4 class="book-title">凰歌千秋</h4>
            <p class="book-desc">《凰歌千秋》由台湾新月出版社出版，出版更名《贼星贵妻》淘宝橙小说书店可购买。---------------------------------------------------------------这是一个关于当代杰出女贼姬千秋，与大晋继位皇帝韩子矶之间的不要脸的爱情故事。姬千秋是个见义勇为路见不平的女贼，韩子矶是个心怀天下心有不甘的帝王。一个是地下泥，一个是天上花，八竿子打不到一起的两人，却偏遇上月老作怪，红线乱扯，小小女贼入得辉煌殿堂，七尺帝王也做起了自欺勾当。鸡飞狗跳的另类生活，蕴藏深处的暗波流转。江山谋，美人计，猜心术，卧底迷。待迷雾重重拨开，真相会长什么模样？等一朝天下戏唱罢，怕是有人要笑着问他：“你到底是要怀里美人千秋，还是要这韩氏江山万代？”</p>
            <div class="book-meta">
              <div class="book-meta-l"><span class="book-author">白鹭成双</span></div>
              <div class="book-meta-r">
							<span class="tag-small-group origin-right">
								<em class="tag-small red">已完结</em>
								<em class="tag-small blue">779人在看</em>
							</span>
              </div>
            </div>
          </div>
        </a>
      </li>		</ol>
  </div>
  <div class="novel">
    <div class="novel-header">
      <div class="novel-header-l">
        <h3 class="novel-title" id="classic-element">世界-分类推荐</h3> <span class="novel-title-desc">热门好书抢先看</span>
      </div>
    </div>
    <van-tabs v-model:active="active">
      <van-tab title="奇幻·玄幻">
        <ol class="book-ol book-ol-normal">

          <li class="book-li">
            <a href="/?pbcode/contents/66/8719.html" class="book-layout">
              <img crs="https://www.51xs.uk/files/article/image/8/8719/8719s.jpg" src="https://www.51xs.uk/files/article/image/8/8719/8719s.jpg" onerror="this.src='style/image/empty.jpg'" class="book-cover" alt="凡间狱">
              <div class="book-cell">
                <h4 class="book-title">凡间狱</h4>
                <p class="book-desc">我是一个金盆洗手的盗墓贼，为了寻找失踪的秦教授，不得不重操旧业，结果却意外卷入一个天大的漩涡，也遇到了许多诡异事件。寿衣出行的夜游者。衔尸寻仇的死人头。光怪陆离，不可想象。为了求生，我不得不摇身一变，成为一个卫道士。古老的职业，亘古长存，戍守在黑夜与黎明之间，对抗冥冥中一切不可预知的存在。天有道，万灵亦有道。长夜漫漫，勿问归途……</p>
                <div class="book-meta">
                  <div class="book-meta-l"><span class="book-author">风尘散人</span></div>
                  <div class="book-meta-r">
							<span class="tag-small-group origin-right">
								<em class="tag-small red">已完结</em>
								<em class="tag-small blue">865人在看</em>
							</span>
                  </div>
                </div>
              </div>
            </a>
          </li>
          <li class="book-li">
            <a href="/?pbcode/contents/55/8717.html" class="book-layout">
              <img crs="https://www.51xs.uk/files/article/image/8/8717/8717s.jpg" src="https://www.51xs.uk/files/article/image/8/8717/8717s.jpg" onerror="this.src='style/image/empty.jpg'" class="book-cover" alt="网游三国之城市攻略">
              <div class="book-cell">
                <h4 class="book-title">网游三国之城市攻略</h4>
                <p class="book-desc">【起点第四编辑组签约作品】类型：城市建设+即时战略=网游三国之城市攻略简介：战争，就是烧军饷、烧粮食、烧士兵、烧物资，没有一个强悍的后方基地怎么行呢？主角展小白要在三国里掀起一股建设狂潮。建设乡村、探索名士、攀升科技、兴修水利、开垦农田、勘探矿业、繁荣贸易、筹集装备、驯养马匹、整顿士气、征服领土，引领三国。</p>
                <div class="book-meta">
                  <div class="book-meta-l"><span class="book-author">百里玺</span></div>
                  <div class="book-meta-r">
							<span class="tag-small-group origin-right">
								<em class="tag-small red">已完结</em>
								<em class="tag-small blue">852人在看</em>
							</span>
                  </div>
                </div>
              </div>
            </a>
          </li>
          <li class="book-li">
            <a href="/?pbcode/contents/33/8712.html" class="book-layout">
              <img crs="https://www.51xs.uk/files/article/image/8/8712/8712s.jpg" src="https://www.51xs.uk/files/article/image/8/8712/8712s.jpg" onerror="this.src='style/image/empty.jpg'" class="book-cover" alt="升迁之路">
              <div class="book-cell">
                <h4 class="book-title">升迁之路</h4>
                <p class="book-desc">是农家子弟，抑或是元老后裔？且看在扑朔迷离的身世中，林远方如何自如地操控着升迁密码，成为共和国一颗冉冉升起的政治新星</p>
                <div class="book-meta">
                  <div class="book-meta-l"><span class="book-author">夏言冰</span></div>
                  <div class="book-meta-r">
							<span class="tag-small-group origin-right">
								<em class="tag-small red">已完结</em>
								<em class="tag-small blue">800人在看</em>
							</span>
                  </div>
                </div>
              </div>
            </a>
          </li>
          <li class="book-li">
            <a href="/?pbcode/contents/44/8713.html" class="book-layout">
              <img crs="https://www.51xs.uk/files/article/image/8/8713/8713s.jpg" src="https://www.51xs.uk/files/article/image/8/8713/8713s.jpg" onerror="this.src='style/image/empty.jpg'" class="book-cover" alt="凰歌千秋">
              <div class="book-cell">
                <h4 class="book-title">凰歌千秋</h4>
                <p class="book-desc">《凰歌千秋》由台湾新月出版社出版，出版更名《贼星贵妻》淘宝橙小说书店可购买。---------------------------------------------------------------这是一个关于当代杰出女贼姬千秋，与大晋继位皇帝韩子矶之间的不要脸的爱情故事。姬千秋是个见义勇为路见不平的女贼，韩子矶是个心怀天下心有不甘的帝王。一个是地下泥，一个是天上花，八竿子打不到一起的两人，却偏遇上月老作怪，红线乱扯，小小女贼入得辉煌殿堂，七尺帝王也做起了自欺勾当。鸡飞狗跳的另类生活，蕴藏深处的暗波流转。江山谋，美人计，猜心术，卧底迷。待迷雾重重拨开，真相会长什么模样？等一朝天下戏唱罢，怕是有人要笑着问他：“你到底是要怀里美人千秋，还是要这韩氏江山万代？”</p>
                <div class="book-meta">
                  <div class="book-meta-l"><span class="book-author">白鹭成双</span></div>
                  <div class="book-meta-r">
							<span class="tag-small-group origin-right">
								<em class="tag-small red">已完结</em>
								<em class="tag-small blue">779人在看</em>
							</span>
                  </div>
                </div>
              </div>
            </a>
          </li>		</ol>

      </van-tab>
      <van-tab title="武侠·仙侠">
        <ol class="book-ol book-ol-normal">

          <li class="book-li">
            <a href="/?pbcode/contents/66/8719.html" class="book-layout">
              <img crs="https://www.51xs.uk/files/article/image/8/8719/8719s.jpg" src="https://www.51xs.uk/files/article/image/8/8719/8719s.jpg" onerror="this.src='style/image/empty.jpg'" class="book-cover" alt="凡间狱">
              <div class="book-cell">
                <h4 class="book-title">凡间狱</h4>
                <p class="book-desc">我是一个金盆洗手的盗墓贼，为了寻找失踪的秦教授，不得不重操旧业，结果却意外卷入一个天大的漩涡，也遇到了许多诡异事件。寿衣出行的夜游者。衔尸寻仇的死人头。光怪陆离，不可想象。为了求生，我不得不摇身一变，成为一个卫道士。古老的职业，亘古长存，戍守在黑夜与黎明之间，对抗冥冥中一切不可预知的存在。天有道，万灵亦有道。长夜漫漫，勿问归途……</p>
                <div class="book-meta">
                  <div class="book-meta-l"><span class="book-author">风尘散人</span></div>
                  <div class="book-meta-r">
							<span class="tag-small-group origin-right">
								<em class="tag-small red">已完结</em>
								<em class="tag-small blue">865人在看</em>
							</span>
                  </div>
                </div>
              </div>
            </a>
          </li>
          <li class="book-li">
            <a href="/?pbcode/contents/55/8717.html" class="book-layout">
              <img crs="https://www.51xs.uk/files/article/image/8/8717/8717s.jpg" src="https://www.51xs.uk/files/article/image/8/8717/8717s.jpg" onerror="this.src='style/image/empty.jpg'" class="book-cover" alt="网游三国之城市攻略">
              <div class="book-cell">
                <h4 class="book-title">网游三国之城市攻略</h4>
                <p class="book-desc">【起点第四编辑组签约作品】类型：城市建设+即时战略=网游三国之城市攻略简介：战争，就是烧军饷、烧粮食、烧士兵、烧物资，没有一个强悍的后方基地怎么行呢？主角展小白要在三国里掀起一股建设狂潮。建设乡村、探索名士、攀升科技、兴修水利、开垦农田、勘探矿业、繁荣贸易、筹集装备、驯养马匹、整顿士气、征服领土，引领三国。</p>
                <div class="book-meta">
                  <div class="book-meta-l"><span class="book-author">百里玺</span></div>
                  <div class="book-meta-r">
							<span class="tag-small-group origin-right">
								<em class="tag-small red">已完结</em>
								<em class="tag-small blue">852人在看</em>
							</span>
                  </div>
                </div>
              </div>
            </a>
          </li>
          <li class="book-li">
            <a href="/?pbcode/contents/33/8712.html" class="book-layout">
              <img crs="https://www.51xs.uk/files/article/image/8/8712/8712s.jpg" src="https://www.51xs.uk/files/article/image/8/8712/8712s.jpg" onerror="this.src='style/image/empty.jpg'" class="book-cover" alt="升迁之路">
              <div class="book-cell">
                <h4 class="book-title">升迁之路</h4>
                <p class="book-desc">是农家子弟，抑或是元老后裔？且看在扑朔迷离的身世中，林远方如何自如地操控着升迁密码，成为共和国一颗冉冉升起的政治新星</p>
                <div class="book-meta">
                  <div class="book-meta-l"><span class="book-author">夏言冰</span></div>
                  <div class="book-meta-r">
							<span class="tag-small-group origin-right">
								<em class="tag-small red">已完结</em>
								<em class="tag-small blue">800人在看</em>
							</span>
                  </div>
                </div>
              </div>
            </a>
          </li>
          <li class="book-li">
            <a href="/?pbcode/contents/44/8713.html" class="book-layout">
              <img crs="https://www.51xs.uk/files/article/image/8/8713/8713s.jpg" src="https://www.51xs.uk/files/article/image/8/8713/8713s.jpg" onerror="this.src='style/image/empty.jpg'" class="book-cover" alt="凰歌千秋">
              <div class="book-cell">
                <h4 class="book-title">凰歌千秋</h4>
                <p class="book-desc">《凰歌千秋》由台湾新月出版社出版，出版更名《贼星贵妻》淘宝橙小说书店可购买。---------------------------------------------------------------这是一个关于当代杰出女贼姬千秋，与大晋继位皇帝韩子矶之间的不要脸的爱情故事。姬千秋是个见义勇为路见不平的女贼，韩子矶是个心怀天下心有不甘的帝王。一个是地下泥，一个是天上花，八竿子打不到一起的两人，却偏遇上月老作怪，红线乱扯，小小女贼入得辉煌殿堂，七尺帝王也做起了自欺勾当。鸡飞狗跳的另类生活，蕴藏深处的暗波流转。江山谋，美人计，猜心术，卧底迷。待迷雾重重拨开，真相会长什么模样？等一朝天下戏唱罢，怕是有人要笑着问他：“你到底是要怀里美人千秋，还是要这韩氏江山万代？”</p>
                <div class="book-meta">
                  <div class="book-meta-l"><span class="book-author">白鹭成双</span></div>
                  <div class="book-meta-r">
							<span class="tag-small-group origin-right">
								<em class="tag-small red">已完结</em>
								<em class="tag-small blue">779人在看</em>
							</span>
                  </div>
                </div>
              </div>
            </a>
          </li>		</ol>

      </van-tab>
      <van-tab title="都市·青春">
        <ol class="book-ol book-ol-normal">

          <li class="book-li">
            <a href="/?pbcode/contents/66/8719.html" class="book-layout">
              <img crs="https://www.51xs.uk/files/article/image/8/8719/8719s.jpg" src="https://www.51xs.uk/files/article/image/8/8719/8719s.jpg" onerror="this.src='style/image/empty.jpg'" class="book-cover" alt="凡间狱">
              <div class="book-cell">
                <h4 class="book-title">凡间狱</h4>
                <p class="book-desc">我是一个金盆洗手的盗墓贼，为了寻找失踪的秦教授，不得不重操旧业，结果却意外卷入一个天大的漩涡，也遇到了许多诡异事件。寿衣出行的夜游者。衔尸寻仇的死人头。光怪陆离，不可想象。为了求生，我不得不摇身一变，成为一个卫道士。古老的职业，亘古长存，戍守在黑夜与黎明之间，对抗冥冥中一切不可预知的存在。天有道，万灵亦有道。长夜漫漫，勿问归途……</p>
                <div class="book-meta">
                  <div class="book-meta-l"><span class="book-author">风尘散人</span></div>
                  <div class="book-meta-r">
							<span class="tag-small-group origin-right">
								<em class="tag-small red">已完结</em>
								<em class="tag-small blue">865人在看</em>
							</span>
                  </div>
                </div>
              </div>
            </a>
          </li>
          <li class="book-li">
            <a href="/?pbcode/contents/55/8717.html" class="book-layout">
              <img crs="https://www.51xs.uk/files/article/image/8/8717/8717s.jpg" src="https://www.51xs.uk/files/article/image/8/8717/8717s.jpg" onerror="this.src='style/image/empty.jpg'" class="book-cover" alt="网游三国之城市攻略">
              <div class="book-cell">
                <h4 class="book-title">网游三国之城市攻略</h4>
                <p class="book-desc">【起点第四编辑组签约作品】类型：城市建设+即时战略=网游三国之城市攻略简介：战争，就是烧军饷、烧粮食、烧士兵、烧物资，没有一个强悍的后方基地怎么行呢？主角展小白要在三国里掀起一股建设狂潮。建设乡村、探索名士、攀升科技、兴修水利、开垦农田、勘探矿业、繁荣贸易、筹集装备、驯养马匹、整顿士气、征服领土，引领三国。</p>
                <div class="book-meta">
                  <div class="book-meta-l"><span class="book-author">百里玺</span></div>
                  <div class="book-meta-r">
							<span class="tag-small-group origin-right">
								<em class="tag-small red">已完结</em>
								<em class="tag-small blue">852人在看</em>
							</span>
                  </div>
                </div>
              </div>
            </a>
          </li>
          <li class="book-li">
            <a href="/?pbcode/contents/33/8712.html" class="book-layout">
              <img crs="https://www.51xs.uk/files/article/image/8/8712/8712s.jpg" src="https://www.51xs.uk/files/article/image/8/8712/8712s.jpg" onerror="this.src='style/image/empty.jpg'" class="book-cover" alt="升迁之路">
              <div class="book-cell">
                <h4 class="book-title">升迁之路</h4>
                <p class="book-desc">是农家子弟，抑或是元老后裔？且看在扑朔迷离的身世中，林远方如何自如地操控着升迁密码，成为共和国一颗冉冉升起的政治新星</p>
                <div class="book-meta">
                  <div class="book-meta-l"><span class="book-author">夏言冰</span></div>
                  <div class="book-meta-r">
							<span class="tag-small-group origin-right">
								<em class="tag-small red">已完结</em>
								<em class="tag-small blue">800人在看</em>
							</span>
                  </div>
                </div>
              </div>
            </a>
          </li>
          <li class="book-li">
            <a href="/?pbcode/contents/44/8713.html" class="book-layout">
              <img crs="https://www.51xs.uk/files/article/image/8/8713/8713s.jpg" src="https://www.51xs.uk/files/article/image/8/8713/8713s.jpg" onerror="this.src='style/image/empty.jpg'" class="book-cover" alt="凰歌千秋">
              <div class="book-cell">
                <h4 class="book-title">凰歌千秋</h4>
                <p class="book-desc">《凰歌千秋》由台湾新月出版社出版，出版更名《贼星贵妻》淘宝橙小说书店可购买。---------------------------------------------------------------这是一个关于当代杰出女贼姬千秋，与大晋继位皇帝韩子矶之间的不要脸的爱情故事。姬千秋是个见义勇为路见不平的女贼，韩子矶是个心怀天下心有不甘的帝王。一个是地下泥，一个是天上花，八竿子打不到一起的两人，却偏遇上月老作怪，红线乱扯，小小女贼入得辉煌殿堂，七尺帝王也做起了自欺勾当。鸡飞狗跳的另类生活，蕴藏深处的暗波流转。江山谋，美人计，猜心术，卧底迷。待迷雾重重拨开，真相会长什么模样？等一朝天下戏唱罢，怕是有人要笑着问他：“你到底是要怀里美人千秋，还是要这韩氏江山万代？”</p>
                <div class="book-meta">
                  <div class="book-meta-l"><span class="book-author">白鹭成双</span></div>
                  <div class="book-meta-r">
							<span class="tag-small-group origin-right">
								<em class="tag-small red">已完结</em>
								<em class="tag-small blue">779人在看</em>
							</span>
                  </div>
                </div>
              </div>
            </a>
          </li>		</ol>
      </van-tab>
    </van-tabs>
  </div>

  <div class="novel">
    <div class="novel-header">
      <div class="novel-header-l">
        <h3 class="novel-title">故事-编辑推荐</h3>
        <span class="novel-title-desc">经典不错过</span>
      </div>
      <div class="novel-header-r">
        <a href="/?pbcode/quanben/" class="novel-header-btn">更多</a>
      </div>
    </div>
    <ol class="book-ol book-ol-normal">

      <li class="book-li">
        <a href="/?pbcode/contents/66/8719.html" class="book-layout">
          <img crs="https://www.51xs.uk/files/article/image/8/8719/8719s.jpg" src="https://www.51xs.uk/files/article/image/8/8719/8719s.jpg" onerror="this.src='style/image/empty.jpg'" class="book-cover" alt="凡间狱">
          <div class="book-cell">
            <h4 class="book-title">凡间狱</h4>
            <p class="book-desc">我是一个金盆洗手的盗墓贼，为了寻找失踪的秦教授，不得不重操旧业，结果却意外卷入一个天大的漩涡，也遇到了许多诡异事件。寿衣出行的夜游者。衔尸寻仇的死人头。光怪陆离，不可想象。为了求生，我不得不摇身一变，成为一个卫道士。古老的职业，亘古长存，戍守在黑夜与黎明之间，对抗冥冥中一切不可预知的存在。天有道，万灵亦有道。长夜漫漫，勿问归途……</p>
            <div class="book-meta">
              <div class="book-meta-l"><span class="book-author">风尘散人</span></div>
              <div class="book-meta-r">
							<span class="tag-small-group origin-right">
								<em class="tag-small red">已完结</em>
								<em class="tag-small blue">865人在看</em>
							</span>
              </div>
            </div>
          </div>
        </a>
      </li>
      <li class="book-li">
        <a href="/?pbcode/contents/55/8717.html" class="book-layout">
          <img crs="https://www.51xs.uk/files/article/image/8/8717/8717s.jpg" src="https://www.51xs.uk/files/article/image/8/8717/8717s.jpg" onerror="this.src='style/image/empty.jpg'" class="book-cover" alt="网游三国之城市攻略">
          <div class="book-cell">
            <h4 class="book-title">网游三国之城市攻略</h4>
            <p class="book-desc">【起点第四编辑组签约作品】类型：城市建设+即时战略=网游三国之城市攻略简介：战争，就是烧军饷、烧粮食、烧士兵、烧物资，没有一个强悍的后方基地怎么行呢？主角展小白要在三国里掀起一股建设狂潮。建设乡村、探索名士、攀升科技、兴修水利、开垦农田、勘探矿业、繁荣贸易、筹集装备、驯养马匹、整顿士气、征服领土，引领三国。</p>
            <div class="book-meta">
              <div class="book-meta-l"><span class="book-author">百里玺</span></div>
              <div class="book-meta-r">
							<span class="tag-small-group origin-right">
								<em class="tag-small red">已完结</em>
								<em class="tag-small blue">852人在看</em>
							</span>
              </div>
            </div>
          </div>
        </a>
      </li>
      <li class="book-li">
        <a href="/?pbcode/contents/33/8712.html" class="book-layout">
          <img crs="https://www.51xs.uk/files/article/image/8/8712/8712s.jpg" src="https://www.51xs.uk/files/article/image/8/8712/8712s.jpg" onerror="this.src='style/image/empty.jpg'" class="book-cover" alt="升迁之路">
          <div class="book-cell">
            <h4 class="book-title">升迁之路</h4>
            <p class="book-desc">是农家子弟，抑或是元老后裔？且看在扑朔迷离的身世中，林远方如何自如地操控着升迁密码，成为共和国一颗冉冉升起的政治新星</p>
            <div class="book-meta">
              <div class="book-meta-l"><span class="book-author">夏言冰</span></div>
              <div class="book-meta-r">
							<span class="tag-small-group origin-right">
								<em class="tag-small red">已完结</em>
								<em class="tag-small blue">800人在看</em>
							</span>
              </div>
            </div>
          </div>
        </a>
      </li>
      <li class="book-li">
        <a href="/?pbcode/contents/44/8713.html" class="book-layout">
          <img crs="https://www.51xs.uk/files/article/image/8/8713/8713s.jpg" src="https://www.51xs.uk/files/article/image/8/8713/8713s.jpg" onerror="this.src='style/image/empty.jpg'" class="book-cover" alt="凰歌千秋">
          <div class="book-cell">
            <h4 class="book-title">凰歌千秋</h4>
            <p class="book-desc">《凰歌千秋》由台湾新月出版社出版，出版更名《贼星贵妻》淘宝橙小说书店可购买。---------------------------------------------------------------这是一个关于当代杰出女贼姬千秋，与大晋继位皇帝韩子矶之间的不要脸的爱情故事。姬千秋是个见义勇为路见不平的女贼，韩子矶是个心怀天下心有不甘的帝王。一个是地下泥，一个是天上花，八竿子打不到一起的两人，却偏遇上月老作怪，红线乱扯，小小女贼入得辉煌殿堂，七尺帝王也做起了自欺勾当。鸡飞狗跳的另类生活，蕴藏深处的暗波流转。江山谋，美人计，猜心术，卧底迷。待迷雾重重拨开，真相会长什么模样？等一朝天下戏唱罢，怕是有人要笑着问他：“你到底是要怀里美人千秋，还是要这韩氏江山万代？”</p>
            <div class="book-meta">
              <div class="book-meta-l"><span class="book-author">白鹭成双</span></div>
              <div class="book-meta-r">
							<span class="tag-small-group origin-right">
								<em class="tag-small red">已完结</em>
								<em class="tag-small blue">779人在看</em>
							</span>
              </div>
            </div>
          </div>
        </a>
      </li>		</ol>
  </div>
  <div class="novel">
    <div class="novel-header">
      <div class="novel-header-l">
        <h3 class="novel-title" id="classic-element">故事-分类推荐</h3> <span class="novel-title-desc">热门好书抢先看</span>
      </div>
    </div>
    <van-tabs v-model:active="active">
      <van-tab title="奇幻·玄幻">
        <div class="novel-slide">
          <ol class="novel-slide-ol">

            <li class="novel-slide-li">
              <a href="/?pbcode/contents/66/8719.html" class="novel-slide-a" title="凡间狱">
                <img crs="https://www.51xs.uk/files/article/image/8/8719/8719s.jpg" src="https://www.51xs.uk/files/article/image/8/8719/8719s.jpg" onerror="this.src='style/image/empty.jpg'" class="novel-slide-img" alt="凡间狱">
                <div class="novel-slide-caption">凡间狱</div>
                <p class="novel-slide-author"><span class="gray">风尘散人</span></p>
              </a>
            </li>
            <li class="novel-slide-li">
              <a href="/?pbcode/contents/55/8717.html" class="novel-slide-a" title="网游三国之城市攻略">
                <img crs="https://www.51xs.uk/files/article/image/8/8717/8717s.jpg" src="https://www.51xs.uk/files/article/image/8/8717/8717s.jpg" onerror="this.src='style/image/empty.jpg'" class="novel-slide-img" alt="网游三国之城市攻略">
                <div class="novel-slide-caption">网游三国之城市攻略</div>
                <p class="novel-slide-author"><span class="gray">百里玺</span></p>
              </a>
            </li>
            <li class="novel-slide-li">
              <a href="/?pbcode/contents/33/8712.html" class="novel-slide-a" title="升迁之路">
                <img crs="https://www.51xs.uk/files/article/image/8/8712/8712s.jpg" src="https://www.51xs.uk/files/article/image/8/8712/8712s.jpg" onerror="this.src='style/image/empty.jpg'" class="novel-slide-img" alt="升迁之路">
                <div class="novel-slide-caption">升迁之路</div>
                <p class="novel-slide-author"><span class="gray">夏言冰</span></p>
              </a>
            </li>
            <li class="novel-slide-li">
              <a href="/?pbcode/contents/44/8713.html" class="novel-slide-a" title="凰歌千秋">
                <img crs="https://www.51xs.uk/files/article/image/8/8713/8713s.jpg" src="https://www.51xs.uk/files/article/image/8/8713/8713s.jpg" onerror="this.src='style/image/empty.jpg'" class="novel-slide-img" alt="凰歌千秋">
                <div class="novel-slide-caption">凰歌千秋</div>
                <p class="novel-slide-author"><span class="gray">白鹭成双</span></p>
              </a>
            </li>
            <li class="novel-slide-li">
              <a href="/?pbcode/contents/44/8714.html" class="novel-slide-a" title="狂兵龙王">
                <img crs="https://www.51xs.uk/files/article/image/8/8714/8714s.jpg" src="https://www.51xs.uk/files/article/image/8/8714/8714s.jpg" onerror="this.src='style/image/empty.jpg'" class="novel-slide-img" alt="狂兵龙王">
                <div class="novel-slide-caption">狂兵龙王</div>
                <p class="novel-slide-author"><span class="gray">卿卫军</span></p>
              </a>
            </li>
            <li class="novel-slide-li">
              <a href="/?pbcode/contents/44/8715.html" class="novel-slide-a" title="侯府后院是非多">
                <img crs="https://www.51xs.uk/files/article/image/8/8715/8715s.jpg" src="https://www.51xs.uk/files/article/image/8/8715/8715s.jpg" onerror="this.src='style/image/empty.jpg'" class="novel-slide-img" alt="侯府后院是非多">
                <div class="novel-slide-caption">侯府后院是非多</div>
                <p class="novel-slide-author"><span class="gray">汪了个喵</span></p>
              </a>
            </li>
            <li class="novel-slide-li">
              <a href="/?pbcode/contents/33/8710.html" class="novel-slide-a" title="宫倾">
                <img crs="https://www.51xs.uk/files/article/image/8/8710/8710s.jpg" src="https://www.51xs.uk/files/article/image/8/8710/8710s.jpg" onerror="this.src='style/image/empty.jpg'" class="novel-slide-img" alt="宫倾">
                <div class="novel-slide-caption">宫倾</div>
                <p class="novel-slide-author"><span class="gray">泪千姒</span></p>
              </a>
            </li>
            <li class="novel-slide-li">
              <a href="/?pbcode/contents/33/8711.html" class="novel-slide-a" title="一品御厨">
                <img crs="https://www.51xs.uk/files/article/image/8/8711/8711s.jpg" src="https://www.51xs.uk/files/article/image/8/8711/8711s.jpg" onerror="this.src='style/image/empty.jpg'" class="novel-slide-img" alt="一品御厨">
                <div class="novel-slide-caption">一品御厨</div>
                <p class="novel-slide-author"><span class="gray">墨轻愁</span></p>
              </a>
            </li>			</ol>
        </div>

      </van-tab>
      <van-tab title="武侠·仙侠">
        <div class="novel-slide">
          <ol class="novel-slide-ol">

            <li class="novel-slide-li">
              <a href="/?pbcode/contents/66/8719.html" class="novel-slide-a" title="凡间狱">
                <img crs="https://www.51xs.uk/files/article/image/8/8719/8719s.jpg" src="https://www.51xs.uk/files/article/image/8/8719/8719s.jpg" onerror="this.src='style/image/empty.jpg'" class="novel-slide-img" alt="凡间狱">
                <div class="novel-slide-caption">凡间狱</div>
                <p class="novel-slide-author"><span class="gray">风尘散人</span></p>
              </a>
            </li>
            <li class="novel-slide-li">
              <a href="/?pbcode/contents/55/8717.html" class="novel-slide-a" title="网游三国之城市攻略">
                <img crs="https://www.51xs.uk/files/article/image/8/8717/8717s.jpg" src="https://www.51xs.uk/files/article/image/8/8717/8717s.jpg" onerror="this.src='style/image/empty.jpg'" class="novel-slide-img" alt="网游三国之城市攻略">
                <div class="novel-slide-caption">网游三国之城市攻略</div>
                <p class="novel-slide-author"><span class="gray">百里玺</span></p>
              </a>
            </li>
            <li class="novel-slide-li">
              <a href="/?pbcode/contents/33/8712.html" class="novel-slide-a" title="升迁之路">
                <img crs="https://www.51xs.uk/files/article/image/8/8712/8712s.jpg" src="https://www.51xs.uk/files/article/image/8/8712/8712s.jpg" onerror="this.src='style/image/empty.jpg'" class="novel-slide-img" alt="升迁之路">
                <div class="novel-slide-caption">升迁之路</div>
                <p class="novel-slide-author"><span class="gray">夏言冰</span></p>
              </a>
            </li>
            <li class="novel-slide-li">
              <a href="/?pbcode/contents/44/8713.html" class="novel-slide-a" title="凰歌千秋">
                <img crs="https://www.51xs.uk/files/article/image/8/8713/8713s.jpg" src="https://www.51xs.uk/files/article/image/8/8713/8713s.jpg" onerror="this.src='style/image/empty.jpg'" class="novel-slide-img" alt="凰歌千秋">
                <div class="novel-slide-caption">凰歌千秋</div>
                <p class="novel-slide-author"><span class="gray">白鹭成双</span></p>
              </a>
            </li>
            <li class="novel-slide-li">
              <a href="/?pbcode/contents/44/8714.html" class="novel-slide-a" title="狂兵龙王">
                <img crs="https://www.51xs.uk/files/article/image/8/8714/8714s.jpg" src="https://www.51xs.uk/files/article/image/8/8714/8714s.jpg" onerror="this.src='style/image/empty.jpg'" class="novel-slide-img" alt="狂兵龙王">
                <div class="novel-slide-caption">狂兵龙王</div>
                <p class="novel-slide-author"><span class="gray">卿卫军</span></p>
              </a>
            </li>
            <li class="novel-slide-li">
              <a href="/?pbcode/contents/44/8715.html" class="novel-slide-a" title="侯府后院是非多">
                <img crs="https://www.51xs.uk/files/article/image/8/8715/8715s.jpg" src="https://www.51xs.uk/files/article/image/8/8715/8715s.jpg" onerror="this.src='style/image/empty.jpg'" class="novel-slide-img" alt="侯府后院是非多">
                <div class="novel-slide-caption">侯府后院是非多</div>
                <p class="novel-slide-author"><span class="gray">汪了个喵</span></p>
              </a>
            </li>
            <li class="novel-slide-li">
              <a href="/?pbcode/contents/33/8710.html" class="novel-slide-a" title="宫倾">
                <img crs="https://www.51xs.uk/files/article/image/8/8710/8710s.jpg" src="https://www.51xs.uk/files/article/image/8/8710/8710s.jpg" onerror="this.src='style/image/empty.jpg'" class="novel-slide-img" alt="宫倾">
                <div class="novel-slide-caption">宫倾</div>
                <p class="novel-slide-author"><span class="gray">泪千姒</span></p>
              </a>
            </li>
            <li class="novel-slide-li">
              <a href="/?pbcode/contents/33/8711.html" class="novel-slide-a" title="一品御厨">
                <img crs="https://www.51xs.uk/files/article/image/8/8711/8711s.jpg" src="https://www.51xs.uk/files/article/image/8/8711/8711s.jpg" onerror="this.src='style/image/empty.jpg'" class="novel-slide-img" alt="一品御厨">
                <div class="novel-slide-caption">一品御厨</div>
                <p class="novel-slide-author"><span class="gray">墨轻愁</span></p>
              </a>
            </li>			</ol>
        </div>

      </van-tab>
      <van-tab title="都市·青春">
        <div class="novel-slide">
          <ol class="novel-slide-ol">

            <li class="novel-slide-li">
              <a href="/?pbcode/contents/66/8719.html" class="novel-slide-a" title="凡间狱">
                <img crs="https://www.51xs.uk/files/article/image/8/8719/8719s.jpg" src="https://www.51xs.uk/files/article/image/8/8719/8719s.jpg" onerror="this.src='style/image/empty.jpg'" class="novel-slide-img" alt="凡间狱">
                <div class="novel-slide-caption">凡间狱</div>
                <p class="novel-slide-author"><span class="gray">风尘散人</span></p>
              </a>
            </li>
            <li class="novel-slide-li">
              <a href="/?pbcode/contents/55/8717.html" class="novel-slide-a" title="网游三国之城市攻略">
                <img crs="https://www.51xs.uk/files/article/image/8/8717/8717s.jpg" src="https://www.51xs.uk/files/article/image/8/8717/8717s.jpg" onerror="this.src='style/image/empty.jpg'" class="novel-slide-img" alt="网游三国之城市攻略">
                <div class="novel-slide-caption">网游三国之城市攻略</div>
                <p class="novel-slide-author"><span class="gray">百里玺</span></p>
              </a>
            </li>
            <li class="novel-slide-li">
              <a href="/?pbcode/contents/33/8712.html" class="novel-slide-a" title="升迁之路">
                <img crs="https://www.51xs.uk/files/article/image/8/8712/8712s.jpg" src="https://www.51xs.uk/files/article/image/8/8712/8712s.jpg" onerror="this.src='style/image/empty.jpg'" class="novel-slide-img" alt="升迁之路">
                <div class="novel-slide-caption">升迁之路</div>
                <p class="novel-slide-author"><span class="gray">夏言冰</span></p>
              </a>
            </li>
            <li class="novel-slide-li">
              <a href="/?pbcode/contents/44/8713.html" class="novel-slide-a" title="凰歌千秋">
                <img crs="https://www.51xs.uk/files/article/image/8/8713/8713s.jpg" src="https://www.51xs.uk/files/article/image/8/8713/8713s.jpg" onerror="this.src='style/image/empty.jpg'" class="novel-slide-img" alt="凰歌千秋">
                <div class="novel-slide-caption">凰歌千秋</div>
                <p class="novel-slide-author"><span class="gray">白鹭成双</span></p>
              </a>
            </li>
            <li class="novel-slide-li">
              <a href="/?pbcode/contents/44/8714.html" class="novel-slide-a" title="狂兵龙王">
                <img crs="https://www.51xs.uk/files/article/image/8/8714/8714s.jpg" src="https://www.51xs.uk/files/article/image/8/8714/8714s.jpg" onerror="this.src='style/image/empty.jpg'" class="novel-slide-img" alt="狂兵龙王">
                <div class="novel-slide-caption">狂兵龙王</div>
                <p class="novel-slide-author"><span class="gray">卿卫军</span></p>
              </a>
            </li>
            <li class="novel-slide-li">
              <a href="/?pbcode/contents/44/8715.html" class="novel-slide-a" title="侯府后院是非多">
                <img crs="https://www.51xs.uk/files/article/image/8/8715/8715s.jpg" src="https://www.51xs.uk/files/article/image/8/8715/8715s.jpg" onerror="this.src='style/image/empty.jpg'" class="novel-slide-img" alt="侯府后院是非多">
                <div class="novel-slide-caption">侯府后院是非多</div>
                <p class="novel-slide-author"><span class="gray">汪了个喵</span></p>
              </a>
            </li>
            <li class="novel-slide-li">
              <a href="/?pbcode/contents/33/8710.html" class="novel-slide-a" title="宫倾">
                <img crs="https://www.51xs.uk/files/article/image/8/8710/8710s.jpg" src="https://www.51xs.uk/files/article/image/8/8710/8710s.jpg" onerror="this.src='style/image/empty.jpg'" class="novel-slide-img" alt="宫倾">
                <div class="novel-slide-caption">宫倾</div>
                <p class="novel-slide-author"><span class="gray">泪千姒</span></p>
              </a>
            </li>
            <li class="novel-slide-li">
              <a href="/?pbcode/contents/33/8711.html" class="novel-slide-a" title="一品御厨">
                <img crs="https://www.51xs.uk/files/article/image/8/8711/8711s.jpg" src="https://www.51xs.uk/files/article/image/8/8711/8711s.jpg" onerror="this.src='style/image/empty.jpg'" class="novel-slide-img" alt="一品御厨">
                <div class="novel-slide-caption">一品御厨</div>
                <p class="novel-slide-author"><span class="gray">墨轻愁</span></p>
              </a>
            </li>			</ol>
        </div>
      </van-tab>
    </van-tabs>
  </div>
  <div class="novel">
    <div class="novel-header">
      <div class="novel-header-l">
        <h3 class="novel-title">故事-热门</h3>
        <span class="novel-title-desc">经典不错过</span>
      </div>
      <div class="novel-header-r">
        <a href="/?pbcode/quanben/" class="novel-header-btn">更多</a>
      </div>
    </div>
    <ol class="book-ol book-ol-normal">

      <li class="book-li">
        <a href="/?pbcode/contents/66/8719.html" class="book-layout">
          <img crs="https://www.51xs.uk/files/article/image/8/8719/8719s.jpg" src="https://www.51xs.uk/files/article/image/8/8719/8719s.jpg" onerror="this.src='style/image/empty.jpg'" class="book-cover" alt="凡间狱">
          <div class="book-cell">
            <h4 class="book-title">凡间狱</h4>
            <p class="book-desc">我是一个金盆洗手的盗墓贼，为了寻找失踪的秦教授，不得不重操旧业，结果却意外卷入一个天大的漩涡，也遇到了许多诡异事件。寿衣出行的夜游者。衔尸寻仇的死人头。光怪陆离，不可想象。为了求生，我不得不摇身一变，成为一个卫道士。古老的职业，亘古长存，戍守在黑夜与黎明之间，对抗冥冥中一切不可预知的存在。天有道，万灵亦有道。长夜漫漫，勿问归途……</p>
            <div class="book-meta">
              <div class="book-meta-l"><span class="book-author">风尘散人</span></div>
              <div class="book-meta-r">
							<span class="tag-small-group origin-right">
								<em class="tag-small red">已完结</em>
								<em class="tag-small blue">865人在看</em>
							</span>
              </div>
            </div>
          </div>
        </a>
      </li>
      <li class="book-li">
        <a href="/?pbcode/contents/55/8717.html" class="book-layout">
          <img crs="https://www.51xs.uk/files/article/image/8/8717/8717s.jpg" src="https://www.51xs.uk/files/article/image/8/8717/8717s.jpg" onerror="this.src='style/image/empty.jpg'" class="book-cover" alt="网游三国之城市攻略">
          <div class="book-cell">
            <h4 class="book-title">网游三国之城市攻略</h4>
            <p class="book-desc">【起点第四编辑组签约作品】类型：城市建设+即时战略=网游三国之城市攻略简介：战争，就是烧军饷、烧粮食、烧士兵、烧物资，没有一个强悍的后方基地怎么行呢？主角展小白要在三国里掀起一股建设狂潮。建设乡村、探索名士、攀升科技、兴修水利、开垦农田、勘探矿业、繁荣贸易、筹集装备、驯养马匹、整顿士气、征服领土，引领三国。</p>
            <div class="book-meta">
              <div class="book-meta-l"><span class="book-author">百里玺</span></div>
              <div class="book-meta-r">
							<span class="tag-small-group origin-right">
								<em class="tag-small red">已完结</em>
								<em class="tag-small blue">852人在看</em>
							</span>
              </div>
            </div>
          </div>
        </a>
      </li>
      <li class="book-li">
        <a href="/?pbcode/contents/33/8712.html" class="book-layout">
          <img crs="https://www.51xs.uk/files/article/image/8/8712/8712s.jpg" src="https://www.51xs.uk/files/article/image/8/8712/8712s.jpg" onerror="this.src='style/image/empty.jpg'" class="book-cover" alt="升迁之路">
          <div class="book-cell">
            <h4 class="book-title">升迁之路</h4>
            <p class="book-desc">是农家子弟，抑或是元老后裔？且看在扑朔迷离的身世中，林远方如何自如地操控着升迁密码，成为共和国一颗冉冉升起的政治新星</p>
            <div class="book-meta">
              <div class="book-meta-l"><span class="book-author">夏言冰</span></div>
              <div class="book-meta-r">
							<span class="tag-small-group origin-right">
								<em class="tag-small red">已完结</em>
								<em class="tag-small blue">800人在看</em>
							</span>
              </div>
            </div>
          </div>
        </a>
      </li>
      <li class="book-li">
        <a href="/?pbcode/contents/44/8713.html" class="book-layout">
          <img crs="https://www.51xs.uk/files/article/image/8/8713/8713s.jpg" src="https://www.51xs.uk/files/article/image/8/8713/8713s.jpg" onerror="this.src='style/image/empty.jpg'" class="book-cover" alt="凰歌千秋">
          <div class="book-cell">
            <h4 class="book-title">凰歌千秋</h4>
            <p class="book-desc">《凰歌千秋》由台湾新月出版社出版，出版更名《贼星贵妻》淘宝橙小说书店可购买。---------------------------------------------------------------这是一个关于当代杰出女贼姬千秋，与大晋继位皇帝韩子矶之间的不要脸的爱情故事。姬千秋是个见义勇为路见不平的女贼，韩子矶是个心怀天下心有不甘的帝王。一个是地下泥，一个是天上花，八竿子打不到一起的两人，却偏遇上月老作怪，红线乱扯，小小女贼入得辉煌殿堂，七尺帝王也做起了自欺勾当。鸡飞狗跳的另类生活，蕴藏深处的暗波流转。江山谋，美人计，猜心术，卧底迷。待迷雾重重拨开，真相会长什么模样？等一朝天下戏唱罢，怕是有人要笑着问他：“你到底是要怀里美人千秋，还是要这韩氏江山万代？”</p>
            <div class="book-meta">
              <div class="book-meta-l"><span class="book-author">白鹭成双</span></div>
              <div class="book-meta-r">
							<span class="tag-small-group origin-right">
								<em class="tag-small red">已完结</em>
								<em class="tag-small blue">779人在看</em>
							</span>
              </div>
            </div>
          </div>
        </a>
      </li>		</ol>
  </div>
  <van-divider style="margin: 0px"/>
  <div>
    <p style="text-align:center">互联网宗教信息服务许可证 编号：沪（2022）0000000</p>
    <p style="text-align:center">copyright © 2002-2022 m.aiavr.com</p>
  </div>

</template>



<style scoped>
.div-maggin{
  margin: 10px 0 0 0;
}
/*.my-swipe .van-swipe-item {*/
/*  color: #fff;*/
/*  font-size: 20px;*/
/*  line-height: 150px;*/
/*  text-align: center;*/
/*  background-color: #39a9ed;*/
/*}*/
.my-swipe img{
  height: 200px;
  width: 100%;
}
p{
  margin: 0px;
  font-size: 12px;
  color: #999999;
}
.kind-top {
  margin: .75rem 0;
  background-color: #fff;
  overflow: hidden
}



</style>
