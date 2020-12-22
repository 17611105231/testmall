<template>
  <div class="cart-list">
    <Scroll ref="scroll" class="content" :probeType="3">
      <CartListItem
        v-for="(item, index) in cartList"
        :key="index"
        :product="item"
      ></CartListItem>
    </Scroll>
  </div>
</template>

<script>
import Scroll from '../../../components/common/scroll/Scroll'

import CartListItem from './CartListItem'

import { mapGetters } from 'vuex'
export default {
  components: { Scroll, CartListItem },
  computed: {
    ...mapGetters(['cartList'])
  },
  activated() {
    this.$refs.scroll.refresh()
  }
}
</script>

<style scoped>
.cart-list {
  height: calc(100% - 49px - 44px - 44px);
}
.content {
  height: 100%;
  overflow: hidden;
}
</style>
