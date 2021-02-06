<template>
  <div class="category-content">
    <Scroll class="content" :probtype="3">
      <div class="content-top">
        <div
          class="content-top-item"
          v-for="(item, index) in contentTop"
          :key="index"
        >
          <a :href="item.link"><img :src="item.image" alt=""/></a>
          <span>{{ item.title }}</span>
        </div>
      </div>
    </Scroll>
  </div>
</template>

<script>
import Scroll from '../../../components/common/scroll/Scroll'

export default {
  components: { Scroll },
  data() {
    return {
      contentTop: []
    }
  },
  created() {
    this.$bus.$on('contentTop', value => {
      this.contentTop = value
    })
  }
}
</script>

<style scoped>
.category-content {
  height: 100%;
  position: absolute;
  top: 44px;
  right: 0;
  bottom: 49px;
  left: 100px;
  overflow: hidden;
}
.content {
  height: calc(100% - 44px - 49px);
}
.content-top {
  /* display: flex; */
  /* flex-wrap: wrap; */
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  padding: 13px 4px;
}
.content-top-item {
  /* flex: 30%; */
  padding: 7px 12px;
  font-size: 12px;
  text-align: center;
}
.content-top-item img {
  width: 100%;
  margin-bottom: 15px;
}
</style>
