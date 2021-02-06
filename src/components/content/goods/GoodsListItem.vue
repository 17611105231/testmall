<template>
  <div class="goodsListItem" @click="itemClick">
    <img v-lazy="showImage" alt="" @load="imageLoad" />
    <div class="goods-info">
      <p>{{ goodsItem.title }}</p>
      <span class="price">￥{{ goodsItem.price }}</span>
      <span class="collect">{{ goodsItem.cfav }}</span>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    goodsItem: {
      type: Object,
      dafault() {
        return {}
      }
    }
  },
  computed: {
    showImage() {
      // return this.goodsItem.show.img || this.goodsItem.image
      if (this.goodsItem.image) return this.goodsItem.image

      return this.goodsItem.show.img
    }
  },
  methods: {
    imageLoad() {
      this.$bus.$emit('itemImageLoad')
    },
    itemClick() {
      this.$router.push({ path: '/detail', query: { iid: this.goodsItem.iid } })
    }
  }
}
</script>

<style scoped>
.goodsListItem {
  flex: 50%;
  padding: 5px;
  padding-bottom: 40px;
  position: relative;
}
img {
  width: 100%;
  border-radius: 5px;
}
.goods-info {
  position: absolute;
  bottom: 5px;
  left: 0;
  right: 0;
  font-size: 12px;
  text-align: center;
}
.goods-info p {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.goods-info .price {
  color: var(--color-high-text);
  margin-right: 20px;
}
.goods-info .collect {
  position: relative;
}
.goods-info .collect::before {
  content: '';
  position: absolute;
  left: -14px;
  top: -1px;
  width: 14px;
  height: 14px;
  background: url('../../../assets/img/detail/detail_bottom.png');
  background-position: 0px -16px;
  background-size: 14px;
}
</style>
