<template>
  <div class="cart">
    <NavBar class="nav-bar">
      <div slot="center">购物车({{ cartLength }})</div>
    </NavBar>

    <!-- 商品的列表 -->
    <CartList></CartList>

    <!-- 底部的汇总 -->
    <CartBottomBar></CartBottomBar>
  </div>
</template>

<script>
import NavBar from '../../components/common/navbar/NavBar'
import CartList from './childComps/CartList'
import CartBottomBar from './childComps/CartBottomBar'

import { mapGetters } from 'vuex'
export default {
  name: 'Cart',
  components: { NavBar, CartList, CartBottomBar },
  computed: {
    ...mapGetters(['cartLength'])
  }
}
</script>

<style scoped>
.cart {
  height: 100vh;
}
.nav-bar {
  color: aliceblue;
  background-color: var(--color-tint);
  position: relative;
  z-index: 9;
}
</style>
