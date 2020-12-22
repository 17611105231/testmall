<template>
  <div class="bottom-bar">
    <div class="bottom-bar-item">
      <div class="item-left">
        <div class="server s">
          <i class="iserver i"></i>
          <div>客服</div>
        </div>
        <div class="shop s">
          <i class="ishop i"></i>
          <div>店铺</div>
        </div>
        <div class="collect s">
          <i class="icollect i"></i>
          <div>收藏</div>
        </div>
      </div>
      <div class="item-right">
        <div class="car" @click="addToCart">加入购物车</div>
        <div class="sell">购买</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  methods: {
    addToCart() {
      this.$emit('addCart')
    }
  }
}
</script>

<style scoped>
.bottom-bar {
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0;
  height: 58px;
  background-color: #fff;
  /* background-color: red; */
}
.bottom-bar-item {
  display: flex;
}

.item-left {
  display: flex;
  flex: 1;
}
.item-left div {
  flex: 1;
}
.item-right {
  display: flex;
  height: 58px;
  text-align: center;
  flex: 1;
}

.item-right div {
  flex: 1;
}
.iserver {
  background: url('../../../assets/img/detail/detail_bottom.png') 0 -52px;
  background-size: 22px;
}
.ishop {
  background: url('../../../assets/img/detail/detail_bottom.png') 0 -96px;
  background-size: 22px;
}
.icollect {
  background: url('../../../assets/img/detail/detail_bottom.png') 0 3px;
  background-size: 22px;
}
.s {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  text-align: center;
  font-size: 13px;
  margin-bottom: 4px;
}
.i {
  display: block;
  width: 22px;
  height: 22px;
  margin: 0 15px;
  margin-top: 3px;
}
.car {
  background-color: #ffe817;
  color: rgb(27, 27, 27);
}
.sell {
  background-color: #ff6699;
  color: #fff;
}
.car,
.sell {
  height: 100%;
  line-height: 58px;
  font-size: 15px;
}
</style>
