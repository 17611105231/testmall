import { debounce } from './utils'
import BackTop from 'components/content/backtop/BackTop'

export const itemListenMinin = {
  data() {
    return {
      ItemImgListener: null
    }
  },
  mounted() {
    this.ItemImgListener = () => {
      refresh()
    }
    const refresh = debounce(this.$refs.scroll.refresh, 50)
    this.$bus.$on('itemImageLoad', this.ItemImgListener)
  }
}

export const backTopMixin = {
  components: {
    BackTop
  },
  data() {
    return { backTopVisable: false }
  },

  methods: {
    backClick() {
      this.$refs.scroll.scrollTo(0, 0)
    }
  }
}
