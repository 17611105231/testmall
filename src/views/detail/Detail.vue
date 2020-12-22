<template>
  <div id="detail">
    <DetailNavBar
      ref="detailnav"
      class="detail-nav"
      @titleClick="titleClick"
    ></DetailNavBar>

    <Scroll class="content" ref="scroll" @scroll="contentScroll" :probeType="3">
      <DetailSwiper :top-images="topImages"></DetailSwiper>
      <DetailBaseInfo :goods="goods"></DetailBaseInfo>
      <DetailShopInfo :shop="shop"></DetailShopInfo>
      <DetailGoodsInfo
        :detail-info="detailInfo"
        @imageLoad="imageLoad"
      ></DetailGoodsInfo>
      <DetailParamInfo ref="params" :param-info="paramInfo"></DetailParamInfo>
      <DetailCommentInfo
        ref="comment"
        :comment-info="commentInfo"
      ></DetailCommentInfo>
      <GoodsList ref="recommend" :goods="recommends"></GoodsList>
    </Scroll>
    <DetailBottomBar @addCart="addToCart"></DetailBottomBar>
    <BackTop v-show="backTopVisable" @click.native="backClick"></BackTop>
  </div>
</template>

<script>
import DetailNavBar from './childComps/DetailNavBar'
import DetailSwiper from './childComps/DetailSwiper'
import DetailBaseInfo from './childComps/DetailBaseInfo'
import DetailShopInfo from './childComps/DetailShopInfo'
import DetailGoodsInfo from './childComps/DetailGoodsInfo'
import DetailParamInfo from './childComps/DetailParamInfo'
import DetailCommentInfo from './childComps/DetailCommentInfo'
import DetailBottomBar from './childComps/DetailBottomBar'

import Scroll from 'components/common/scroll/Scroll'
import GoodsList from 'components/content/goods/GoodsList'

import {
  getDetail,
  getRecommend,
  Goods,
  Shop,
  GoodsParam
} from 'network/detail.js'
import { debounce } from 'common/utils'
import { itemListenMinin, backTopMixin } from '../../common/mixin'

export default {
  name: 'Detail',
  mixins: [itemListenMinin, backTopMixin],
  data() {
    return {
      //参数
      iid: '',
      //轮播图
      topImages: [],
      goods: {},
      shop: {},
      detailInfo: {},
      paramInfo: {},
      commentInfo: {},
      recommends: [],
      themeTopYs: [],
      currentIndex: null
    }
  },
  components: {
    DetailNavBar,
    DetailSwiper,
    DetailBaseInfo,
    DetailShopInfo,
    DetailGoodsInfo,
    DetailParamInfo,
    DetailCommentInfo,
    Scroll,
    GoodsList,
    DetailBottomBar
  },
  created() {
    // 保存传入的iid
    this.iid = this.$route.query.iid
    // 根据id发送请求
    getDetail(this.iid).then(res => {
      // console.log(res)
      //获取顶部轮播图的信息
      const data = res.result
      this.topImages = data.itemInfo.topImages
      //获取商品信息
      this.goods = new Goods(
        data.itemInfo,
        data.columns,
        data.shopInfo.services
      )
      //创建店铺信息对象
      this.shop = new Shop(data.shopInfo)
      //保存商品的详情信息
      this.detailInfo = data.detailInfo
      //获取参数信息
      this.paramInfo = new GoodsParam(
        data.itemParams.info,
        data.itemParams.rule
      )
      //取出评论信息

      if (data.rate.cRate !== 0) {
        this.commentInfo = data.rate.list[0]
      }
      // this.$nextTick(() => {
      //   this.themeTopYs = [
      //     0,
      //     this.$refs.params.$el.offsetTop,
      //     this.$refs.comment.$el.offsetTop,
      //     this.$refs.recommend.$el.offsetTop
      //   ]
      // })
    }),
      getRecommend().then(res => (this.recommends = res.data.list))
  },
  mounted() {},
  updated() {},

  destroyed() {
    this.$bus.$off('itemImageLoad', this.ItemImgListener)
  },
  methods: {
    imageLoad() {
      this.$refs.scroll.refresh()
      ;(this.themeTopYs = [
        0,
        this.$refs.params.$el.offsetTop,
        this.$refs.comment.$el.offsetTop,
        this.$refs.recommend.$el.offsetTop,
        Number.MAX_VALUE
      ]),
        console.log(this.themeTopYs)
    },
    titleClick(index) {
      console.log(index)
      this.$refs.scroll.scrollTo(0, -this.themeTopYs[index], 300)
    },
    contentScroll(position) {
      //回到顶部
      this.backTopVisable = position.y < -1000

      // console.log(position)
      //方法一
      //   if (-position.y >= this.themeTopYs[3]) {
      //     this.$refs.detailnav.currentIndex = 3
      //   } else if (-position.y >= this.themeTopYs[2]) {
      //     this.$refs.detailnav.currentIndex = 2
      //   } else if (-position.y >= this.themeTopYs[1]) {
      //     this.$refs.detailnav.currentIndex = 1
      //   } else {
      //     this.$refs.detailnav.currentIndex = 0
      //   }
      // }
      for (let i = 0; i < this.themeTopYs.length; i++) {
        // console.log(Number(i))
        // 方法一
        // if (
        //   this.currentIndex !== i &&
        //   ((i < this.themeTopYs.length - 1 &&
        //     -position.y >= this.themeTopYs[i] &&
        //     -position.y < this.themeTopYs[i + 1]) ||
        //     (i === this.themeTopYs.length - 1 &&
        //       -position.y >= this.themeTopYs[i]))
        // ) {
        //   this.currentIndex = i
        //   this.$refs.detailnav.currentIndex = this.currentIndex
        // }
        //方法二
        if (
          this.currentIndex !== i &&
          -position.y >= this.themeTopYs[i] &&
          -position.y < this.themeTopYs[i + 1]
        ) {
          this.currentIndex = i
          this.$refs.detailnav.currentIndex = this.currentIndex
        }
      }
    },
    addToCart() {
      // console.log(1)
      // 1.获取购物车需要展示的信息
      const product = {}
      product.image = this.topImages[0]
      product.title = this.goods.title
      product.desc = this.goods.desc
      product.price = this.goods.nowPrice
      product.iid = this.iid
      // 2.将商品添加到购物车
      this.$store.dispatch('addCart', product).then(res => {
        this.$toast.show(res, 2000)
        // console.log(this.$toast.show)
      })
    }
  }
}
</script>

<style scoped>
#detail {
  z-index: 1;
  position: relative;
  background-color: #fff;
  height: 100vh;
}
.detail-nav {
  position: absolute;
  top: -1px;
  right: -1px;
  left: -1px;
  z-index: 9;
  background-color: #fff;
}
.content {
  position: absolute;
  top: 44px;
  bottom: 60px;
}
</style>
