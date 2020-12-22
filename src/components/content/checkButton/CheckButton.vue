<template>
  <div class="check-button" :class="{ check: isChange }">
    <img src="~assets/img/cart/tick.svg" alt="" />
  </div>
</template>

<script>
export default {
  props: { isChange: { type: Boolean, default: false } }
}
</script>

<style scoped>
.check-button {
  width: 18px;
  height: 18px;

  border-radius: 50%;
  border: 2px solid #aaa;
}
img {
  width: 16px;
  height: 16px;
}
.check {
  background-color: var(--color-tint);
  border-color: var(--color-tint);
}
</style>
