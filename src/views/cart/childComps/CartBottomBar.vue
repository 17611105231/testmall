<template>
  <div class="cart-bottom-bar">
    <div class="checkAll">
      <CheckButton
        @click.native="checkAll"
        :isChange="checkStatus"
      ></CheckButton>
      <span>全选</span>
    </div>
    <div class="total">合计:{{ priceAll }}</div>
    <div class="buy">去计算({{ cartListCheckedLength }})</div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import CheckButton from 'components/content/checkButton/CheckButton'

export default {
  components: { CheckButton },
  data() {
    return {}
  },
  computed: {
    ...mapGetters(['cartList', 'cartLength', 'cartListCheckedLength']),

    priceAll() {
      //   this.cartListChecked.forEach(item => {
      //     total += item.price * item.count
      //   })
      //   return (
      //     '￥' +
      //     this.cartListChecked.reduce((preValue, item) => {
      //       return item.price * item.count
      //     }, 0)
      //   )
      return (
        '￥' +
        this.cartList
          .filter(item => item.checked === true)
          .reduce((preValue, item) => {
            return preValue + item.price * item.count
          }, 0)
          .toFixed(2)
      )
    },
    checkStatus() {
      if (
        this.cartList.length === 0 ||
        this.cartLength !== this.cartListCheckedLength
      )
        return false
      return true
    }
  },
  methods: {
    checkAll() {
      if (this.checkStatus) {
        this.cartList.forEach(item => {
          item.checked = false
        })
      } else {
        this.cartList.forEach(item => {
          item.checked = true
        })
      }
    }
  }
}
</script>

<style scoped>
.cart-bottom-bar {
  height: 44px;
  position: absolute;
  bottom: 49px;
  right: 0;
  left: 0;
  background: #eeeeee;
  box-shadow: 0 -2px 3px rgb(211, 210, 210);
  display: flex;
  align-items: center;
}
.checkAll {
  display: flex;
  align-items: center;
  margin-left: 15px;
}
.checkAll span {
  margin-left: 5px;
  font-size: 14px;
  color: #918b8b;
}
.total {
  margin-left: 15px;
}
.buy {
  width: 100px;
  line-height: 44px;
  background-color: #ff4500;
  position: absolute;
  right: 0;
  color: white;
  text-align: center;
  font-size: 14px;
}
</style>
