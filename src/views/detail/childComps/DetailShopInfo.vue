<template>
  <div class="detail-shop-info">
    <div class="top">
      <img :src="shop.logo" alt="" />
      <span>{{ shop.name }}</span>
    </div>
    <div class="middle">
      <div class="middle-left  middle-item ">
        <div class="left middle-left-left">
          <div class="xiaoliang">{{ shop.sells | sell }}</div>
          <div class="middle-left-text">总销量</div>
        </div>
        <div class="left">
          <div class="xiaoliang">{{ shop.goodsCount }}</div>
          <div class="middle-left-text">全部宝贝</div>
        </div>
      </div>
      <div class="middle-right middle-item">
        <table>
          <tr v-for="(item, index) in shop.score" :key="index">
            <td>{{ item.name }}</td>
            <td :style="{ color: item.isBetter ? '#F24E4B' : '#5ea732' }">
              {{ item.score }}
            </td>
            <td
              v-if="item.isBetter"
              :style="{
                color: item.isBetter ? '#F24E4B' : '#5ea732'
              }"
            >
              高
            </td>
            <td
              v-else
              :style="{
                color: item.isBetter ? '#F24E4B' : '#5ea732'
              }"
            >
              低
            </td>
          </tr>
        </table>
      </div>
    </div>
    <div class="bottom">
      <div class="jindian">进店逛逛</div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    shop: {
      type: Object,
      dafault() {
        return {}
      }
    }
  },
  filters: {
    sell(val) {
      if (val >= 10000) {
        return `${(val / 10000).toFixed(1)}万`
      }
    }
  }
}
</script>

<style scoped>
.detail-shop-info {
  padding: 30px 8px;
  border-bottom: 5px solid #f2f5f8;
}
.top {
  line-height: 45px;
  display: flex;
  /* justify-content: center; */
  align-items: center;
}
.top img {
  width: 45px;
  height: 45px;
  border-radius: 50%;
  border: 1px solid #9c9a9a;
  margin-right: 15px;
}
.top span {
  font-size: 16px;
}
.middle {
  display: flex;
  margin: 20px 0 15px;
}
.middle-left {
  text-align: center;
  display: flex;
  align-items: center;
  justify-content: center;
  border-right: 1px solid rgba(0, 0, 0, 0.1);
}

.middle-item {
  flex: 1;
}
.middle-left-left {
  margin-right: 30px;
}
.xiaoliang {
  font-size: 18px;
  color: 5f5f5f;
}
.middle-left-text {
  font-size: 12px;
  margin-top: 10px;
  color: 5f5f5f;
}
.middle-right {
  display: flex;
  justify-content: center;
  font-size: 13px;
  color: 33ee3e;
}
.middle-right tr td {
  padding: 5px;
}
.jindian {
  background-color: #f2f5f8;
  width: 150px;
  text-align: center;
  border-radius: 10px;
  line-height: 30px;
  margin: 0 auto;
  color: #777778;
  font-size: 14px;
}
</style>
