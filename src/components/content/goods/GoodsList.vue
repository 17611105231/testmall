<template>
  <div class="goods">
    <GoodsListItem
      :goodsItem="item"
      v-for="(item, index) in goods"
      :key="index"
    ></GoodsListItem>
  </div>
</template>

<script>
import GoodsListItem from './GoodsListItem'
export default {
  components: { GoodsListItem },
  props: {
    goods: {
      type: Array,
      default() {
        return []
      }
    }
  }
}
</script>

<style scoped>
.goods {
  display: flex;
  flex-wrap: wrap;
  padding: 0 4px;
}
</style>
