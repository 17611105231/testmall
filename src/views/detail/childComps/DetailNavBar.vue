<template>
  <div>
    <NavBar>
      <div slot="left" class="back" @click="backClick">
        <img src="~/assets/img/common/back.svg" alt="" />
      </div>
      <div slot="center" class="title">
        <div
          v-for="(item, index) in titles"
          :key="index"
          @click="titleClick(index)"
          :class="{ active: index === currentIndex }"
        >
          {{ item }}
        </div>
      </div>
    </NavBar>
  </div>
</template>

<script>
import NavBar from 'components/common/navbar/NavBar'
export default {
  components: { NavBar },
  data() {
    return {
      titles: ['商品', '参数', '评论', '推荐'],
      currentIndex: 0
    }
  },
  methods: {
    //   title切换
    titleClick(index) {
      ;(this.currentIndex = index), this.$emit('titleClick', index)
    },
    // 返回
    backClick() {
      this.$router.go(-1)
    }
  }
}
</script>

<style scoped>
.title {
  display: flex;
  font-size: 13px;
  box-sizing: border-box;
}
.title div {
  flex: 1;
  /* margin-top: 5px; */
}
.active {
  color: var(--color-high-text);
}
.back {
  position: relative;
}
.back img {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, 50%);
}
</style>
