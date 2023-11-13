<template>

  <van-search class="div-maggin" v-model="selectWorldName" placeholder="请输入搜索关键词"
               @search="onSearch"
  />
  <van-divider style="margin: 0px;" />
  <van-grid class="div-maggin home-nav"  :border="false" :column-num="4">
    <van-grid-item icon='/icon/solution2.svg' text="世界" to="/world/index"/>
    <van-grid-item icon='/icon/novel.svg' text="故事" to="/story/index" />
    <van-grid-item icon='/icon/user.svg' text="个人" to="/user/index"/>
    <van-grid-item icon='/icon/userManage.svg' text="管理" to="/admin/index" />
  </van-grid>
  <!--  轮播栏目-->
  <van-swipe class="my-swipe div-maggin" :autoplay="3000" indicator-color="white">
    <van-swipe-item><van-image width="100%" height="200px" fit="fill" src='/head/9.jpeg'/></van-swipe-item>
    <van-swipe-item><van-image width="100%" height="200px" fit="fill" src='/head/10.jpeg'/></van-swipe-item>
    <van-swipe-item><van-image width="100%" height="200px" fit="fill" src='/head/11.jpeg'/></van-swipe-item>
  </van-swipe>
  <van-divider style="margin: 0px;" />

  <!--  推荐  -->
  <div id="u2_text" class="text ">
    <van-row>
      <van-col span="12" style="float: left"><h2 style="margin: 0px;">推荐</h2></van-col>
      <van-col span="12"  ><h2 style="margin: 0px;float: right" @click="handleList()">更多</h2></van-col>
    </van-row>
  </div>
  <van-swipe-cell  v-for="world in worldRedact">
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
  </van-swipe-cell>
  <van-divider />
  <div class="novel">
    <div class="novel-header">
      <div class="novel-header-l">
        <h3 class="novel-title">热门推荐</h3>
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
        <h3 class="novel-title">热门小说</h3>
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
        <h3 class="novel-title" id="classic-element">分类推荐</h3> <span class="novel-title-desc">热门好书抢先看</span>
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
        <h3 class="novel-title">热门小说</h3>
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
        <h3 class="novel-title" id="classic-element">分类推荐</h3> <span class="novel-title-desc">热门好书抢先看</span>
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
        <h3 class="novel-title">热门小说</h3>
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
        <h3 class="novel-title">热门小说</h3>
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

<script lang="ts" setup>
import {getCurrentInstance, inject, reactive, ref, toRefs} from 'vue';
import {useRouter} from "vue-router";
// import { listWorld } from "@/api/wiki/world";
const imgUrl = inject("$imgUrl")
const {  appContext : { config: { globalProperties } }  } = getCurrentInstance();

const router = useRouter();

const active = ref(0);
const value = ref('');

function  handleUser(){
  console.log("user")
  router.push("/user/index")
}

function  handleAdmin(){
  router.push("/admin/index")
}
//编辑推荐 4个
const worldRedact = ref([]);
//随机推荐 18个
const worldRandom = ref([]);
const worldOriginal = ref([]);
const worldChoiceness = ref([]);

const total = ref(0);
const dateRange = ref([]);
const selectWorldName=ref(undefined);

const data = reactive({
  form: {},
  queryParams: {
    pageNum: 1,
    pageSize:20,
    name: undefined,
    types: null,
  },
  rules: {
    // userName: [{ required: true, message: "用户名称不能为空", trigger: "blur" }, { min: 2, max: 20, message: "用户名称长度必须介于 2 和 20 之间", trigger: "blur" }],
  }
});
const { queryParams, form, rules } = toRefs(data);
//查看详细
function handleSee(id:number){
  router.push("/world/index?wid="+id);
}

function handleList(){
  router.push("/world/list");
}
/** 查询世界列表 */
function getRedactList() {
  queryParams.value.pageSize=4
  // listWorld(globalProperties.addDateRange(queryParams.value, dateRange.value)).then(response => {
  //   worldRedact.value = response.rows;
  // });
}
function getOriginalList() {
  queryParams.value.pageSize=4
  // listWorld(globalProperties.addDateRange(queryParams.value, dateRange.value)).then(response => {
  //   worldOriginal.value = response.rows;
  // });
}
function getChoicenessList() {
  queryParams.value.pageSize=4
  // listWorld(globalProperties.addDateRange(queryParams.value, dateRange.value)).then(response => {
  //   worldChoiceness.value = response.rows;
  // });
}
function getRandomList() {
  queryParams.value.pageSize=9
  // listWorld(globalProperties.addDateRange(queryParams.value, dateRange.value)).then(response => {
  //   worldRandom.value = response.rows;
  // });
}

const onSearch = (val) => {
  if(val != null && val != undefined) {
    router.push("/world/list?selectWorldName=" + val);
  }
}


getRedactList()
getOriginalList();
getChoicenessList();
getRandomList()
</script>

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
