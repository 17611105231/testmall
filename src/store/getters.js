export default {
  cartLength(state) {
    return state.cartList.length
  },
  cartList(state) {
    return state.cartList
  },
  cartListCheckedLength(state) {
    return state.cartList.filter(item => item.checked === true).length
  }
}
