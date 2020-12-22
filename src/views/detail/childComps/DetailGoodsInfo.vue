<template>
  <div v-if="Object.keys(detailInfo).length !== 0" class="goods-info">
    <div class="info-desc">
      <div class="start line"></div>
      <div class="info">{{ detailInfo.desc }}</div>
      <div class="end line right"></div>
    </div>
    <div class="info-key">{{ detailInfo.detailImage[0].key }}</div>
    <div class="info-list">
      <img
        v-for="(item, index) in detailInfo.detailImage[0].list"
        :key="index"
        :src="item"
        alt=""
        @load="imageLoad"
      />
    </div>
  </div>
</template>

<script>
export default {
  props: {
    detailInfo: {
      type: Object,
      default() {
        return {}
      }
    }
  },
  data() {
    return {
      counter: 0,
      imagesLength: 0
    }
  },
  methods: {
    imageLoad() {
      if (++this.counter === this.imagesLength) {
        this.$emit('imageLoad')
      }
    }
  },
  watch: {
    detailInfo() {
      this.imagesLength = this.detailInfo.detailImage[0].list.length
    }
  }
}
</script>

<style scoped>
.info-desc {
  padding: 15px;
  font-size: 14px;
}
.info-desc .line {
  width: 90px;
  height: 2px;
  background-color: rgb(141, 141, 141);
}
.info-desc .start {
  position: relative;
}
.info-desc .start::before {
  content: '';
  position: absolute;
  width: 5px;
  height: 5px;
  background-color: black;
  top: -1.5px;
}
.info-desc .info {
  padding: 15px 0;
}
.info-desc .end {
  position: relative;
}
.info-desc .end::before {
  content: '';
  position: absolute;
  width: 5px;
  height: 5px;
  background-color: black;
  top: -1.5px;
  right: 0;
}
.info-key {
  padding: 15px 10px;
  color: black;
  font-size: 15px;
}

.info-list img {
  width: 100%;
}
</style>
