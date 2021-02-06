<template>
  <div class="category-list">
    <Scroll class="content" :probtype="3">
      <div
        class="category-list-item"
        v-for="(item, index) in categoryList"
        :key="index"
        :class="{ active: index === currentIndex }"
        @click="itemClick(item, index)"
      >
        {{ item.title }}
      </div>
    </Scroll>
  </div>
</template>

<script>
import Scroll from '../../../components/common/scroll/Scroll'

import { getSubcategory } from '../../../network/category'

export default {
  components: { Scroll },
  props: {
    categoryList: {
      type: Array,
      default() {
        return []
      }
    }
  },
  data() {
    return {
      currentIndex: 0
    }
  },
  created() {
    getSubcategory(3627).then(res => {
      this.$bus.$emit('contentTop', res.data.list)
    })
  },
  methods: {
    itemClick(item, index) {
      this.currentIndex = index

      getSubcategory(item.maitKey).then(
        res => {
          this.$bus.$emit('contentTop', res.data.list)
        }
        // console.log(res)
      )
      //
    }
  }
}
</script>

<style scoped>
.active {
  background-color: #ffffff;
  border-left: 3px solid #fa8888;
  color: var(--color-high-text);
  font-weight: 550;
}
.category-list {
  height: 100%;
  width: 100px;
  background-color: #f6f6f6;
  text-align: center;
  font-size: 14px;
  overflow: hidden;
}
.content {
  height: calc(100% - 44px - 49px);
  overflow: hidden;
}
.category-list-item {
  line-height: 45px;
}
</style>
