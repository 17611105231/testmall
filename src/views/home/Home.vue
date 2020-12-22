<template>
  <div id="home">
    <NavBar class="home-nav">
      <div slot="center">购物街</div>
    </NavBar>
    <TabControl
      class="tab-control1"
      v-show="tabControlVisable"
      :titles="['流行', '新款', '精选']"
      @tabClick="tabClick"
      ref="tabControl1"
    ></TabControl>
    <Scroll
      ref="scroll"
      class="content"
      :probe-type="3"
      @scroll="contentScroll"
      :pull-up-load="true"
      @pullingUp="loadMore"
    >
      <HomeSwiper
        :banners="banners"
        @swiperImageLoad="swiperImageLoad"
      ></HomeSwiper>
      <HomeRecommendView :recommends="recommends"></HomeRecommendView>
      <FeatureView></FeatureView>
      <TabControl
        v-show="!tabControlVisable"
        :titles="['流行', '新款', '精选']"
        @tabClick="tabClick"
        ref="tabControl2"
      ></TabControl>
      <GoodsList :goods="showGoods"></GoodsList>
    </Scroll>
    <BackTop v-show="backTopVisable" @click.native="backClick"></BackTop>
  </div>
</template>

<script>
import HomeSwiper from './childComps/HomeSwiper'
import HomeRecommendView from './childComps/HomeRecommendView'
import FeatureView from './childComps/FeatureView'

import NavBar from 'components/common/navbar/NavBar'
import TabControl from 'components/content/tabControl/TabControl'
import GoodsList from 'components/content/goods/GoodsList'
import Scroll from 'components/common/scroll/Scroll'

import { getHomeMultidata, getHomeGoods } from 'network/home'

import { debounce } from 'common/utils'
import { itemListenMinin, backTopMixin } from '../../common/mixin'

export default {
  components: {
    HomeSwiper,
    HomeRecommendView,
    FeatureView,
    NavBar,
    TabControl,
    GoodsList,
    Scroll
  },
  mixins: [itemListenMinin, backTopMixin],
  data() {
    return {
      banners: [],
      recommends: [],
      goods: {
        pop: { page: 0, list: [] },
        new: { page: 0, list: [] },
        sell: { page: 0, list: [] }
      },
      currentType: 'pop',
      backTopVisable: false,
      tabOffsetTop: 0,
      tabControlVisable: false,
      saveY: 0
    }
  },
  activated() {
    this.$refs.scroll.scrollTo(0, this.saveY, 0)
    this.$refs.scroll.refresh()
  },
  deactivated() {
    // 保存y值
    this.saveY = this.$refs.scroll.scroll.y
    // console.log(this.$refs.scroll)
    //取消全局事件的监听
    this.$bus.$off('itemImageLoad', this.ItemImgListener)
  },
  created() {
    // 1.请求多个数据
    this.getHomeMultidata()
    // 2.请求商品数据
    this.getHomeGoods('pop')
    this.getHomeGoods('new')
    this.getHomeGoods('sell')
  },
  mounted() {
    // 1.监听item中的图片加载完成
  },

  computed: {
    // 根据当前currenttype向子组件传递列表数据
    showGoods() {
      return this.goods[this.currentType].list
    }
  },
  methods: {
    /* 事件监听相关的方法 */

    // tab栏切换
    tabClick(index) {
      switch (index) {
        case 0:
          this.currentType = 'pop'
          break
        case 1:
          this.currentType = 'new'
          break
        case 2:
          this.currentType = 'sell'
          break
      }
      this.$refs.tabControl1.currentIndex = index
      this.$refs.tabControl2.currentIndex = index
    },
    //返回顶部

    contentScroll(position) {
      // 1.返回顶部按钮的显示与隐藏
      this.backTopVisable = position.y < -1000
      // 2.决定tabOffsetTop是否吸顶
      this.tabControlVisable = -position.y >= this.tabOffsetTop
    },
    // 上拉加载更多
    loadMore() {
      this.getHomeGoods(this.currentType)
    },
    swiperImageLoad() {
      // 2.获取tabcontrol的offsettop
      this.tabOffsetTop = this.$refs.tabControl2.$el.offsetTop
    },

    /* 网络请求相关的方法 */
    getHomeMultidata() {
      getHomeMultidata().then(res => {
        this.banners = res.data.banner.list
        this.recommends = res.data.recommend.list
        // console.log(this.banners)
        // console.log(this.recommends)
      })
    },
    getHomeGoods(type) {
      const page = this.goods[type].page + 1
      getHomeGoods(type, page).then(res => {
        this.goods[type].list.push(...res.data.list)
        this.goods[type].page += 1

        //完成上拉加载更多
        this.$refs.scroll.finishPullUp()
      })
    }
  }
}
</script>

<style scoped>
#home {
  height: 100vh;
  position: relative;
}
.home-nav {
  background: var(--color-tint);
  color: #fff;
}

/* .content {
  height: calc(100% - 93px);
  overflow: hidden;
  margin-top: 44px;
} */
.content {
  overflow: hidden;
  position: absolute;
  top: 44px;
  bottom: 49px;
  right: 0;
  left: 0;
}
.tab-control1 {
  position: fixed;
  height: 40px;
  top: 43px;
  right: 0;
  left: 0;
}
</style>
