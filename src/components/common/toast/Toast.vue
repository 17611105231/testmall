<template>
  <div class="toast" v-show="isShow">
    <div>{{ message }}</div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      message: '',
      isShow: false
    }
  },
  methods: {
    show(message, duration) {
      this.isShow = true
      this.message = message
      setTimeout(() => {
        this.isShow = false
        this.message = ''
      }, duration)
    }
  }
}
</script>

<style scoped>
.toast {
  padding: 8px 10px;
  background-color: rgba(0, 0, 0, 0.75);
  color: aliceblue;
  text-align: center;
  border-radius: 5px;
  font-size: 13px;
  position: fixed;
  z-index: 9;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}
</style>
