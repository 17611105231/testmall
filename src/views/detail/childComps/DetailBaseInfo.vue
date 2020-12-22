<template>
  <div v-if="Object.keys(goods).length !== 0" class="base-info">
    <div class="info-title">{{ goods.title }}</div>
    <div class="info-price">
      <span class="n-price">{{ goods.newPrice }}</span>
      <span class="o-price">{{ goods.oldPrice }}</span>
      <span v-if="goods.discount" class="discount">{{ goods.discount }}</span>
    </div>
    <div class="info-other">
      <span>{{ goods.columns[0] }}</span>
      <span>{{ goods.columns[1] }}</span>
      <span>{{ goods.services[goods.services.length - 1].name }}</span>
    </div>
    <div class="info-service">
      <span
        class="info-service-item"
        v-for="index in goods.services.length - 1"
        :key="index"
      >
        <img :src="goods.services[index - 1].icon" alt="" />
        <span>{{ goods.services[index - 1].name }}</span>
      </span>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    goods: {
      type: Object,
      defaule() {
        return {}
      }
    }
  }
}
</script>

<style scoped>
.base-info {
  padding: 17px 8px 0px;
  border-bottom: 5px solid #f2f5f8;
}
.info-title {
  color: #222;
}
.info-price {
  margin-top: 8px;
}
.n-price {
  color: var(--color-high-text);
  font-size: 24px;
  padding-right: 5px;
}
.o-price {
  font-size: 13px;
  color: gray;
  text-decoration: line-through;
}
.discount {
  background-color: var(--color-high-text);
  color: #fff;
  padding: 3px 4px;
  font-size: 12px;
  border-radius: 8px;
  position: relative;
  top: -8px;
  left: 5px;
}
.info-other {
  margin-top: 15px;
  font-size: 13px;
  display: flex;
  text-align: center;
  justify-content: space-between;
  border-bottom: 1px solid rgba(100, 100, 100, 0.1);
  padding: 8px 0;
  color: #9b9b9b;
}
.info-service {
  font-size: 13px;
  color: #333;
  display: flex;
  justify-content: space-between;
  line-height: 60px;
}
.info-service img {
  width: 14px;
  position: relative;
  top: 2px;
}
</style>
