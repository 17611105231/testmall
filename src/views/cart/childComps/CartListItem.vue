<template>
  <div class="cart-list-item">
    <div class="check">
      <CheckButton
        @click.native="check"
        :isChange="product.checked"
      ></CheckButton>
    </div>
    <div class="img">
      <img :src="product.image" alt="" />
    </div>
    <div class="data">
      <div class="info">
        <p>{{ product.title }}</p>
        <p>商品描述：{{ product.desc }}</p>
      </div>
      <div class="price">
        <div class="price-left left">{{ product.price | price }}</div>
        <div class="price-right right">x{{ product.count }}</div>
      </div>
    </div>
  </div>
</template>

<script>
import CheckButton from 'components/content/checkButton/CheckButton'
export default {
  props: {
    product: {
      type: Object,
      default() {
        return {}
      }
    }
  },
  components: { CheckButton },
  data() {
    return {}
  },
  methods: {
    check() {
      this.$store.commit('check', this.product)
    }
  },
  filters: {
    price(value) {
      return '￥' + value
    }
  }
}
</script>

<style scoped>
.cart-list-item {
  display: flex;
  /* margin-top: 10px; */
  padding: 10px 5px;
  border-bottom: 1px solid rgb(184, 182, 182);
}
.check {
  width: 18px;
  margin-right: 5px;
  display: flex;
  align-items: center;
}
.img img {
  width: 80px;
  height: 100px;
  flex: 4;
  border-radius: 5px;
  margin-right: 12px;
  margin-bottom: -4px;
}
.info {
  padding: 0 3px;
}
.data {
  flex: 8;
  overflow: hidden;
}
.data p {
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
}
.data p:first-child {
  font-size: 17px;
  color: black;
}
.data p:nth-child(2) {
  font-size: 14px;
  margin-top: 15px;
}
.price {
  position: relative;
  bottom: -26px;
}
.price-left {
  color: #f55115;
}
.price-right {
  margin-right: 10px;
  color: black;
}
</style>
