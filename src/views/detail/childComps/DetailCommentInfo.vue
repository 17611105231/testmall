<template>
  <div v-if="Object.keys(commentInfo).length !== 0" class="comment-info">
    <div class="top">
      <div class="title">用户评价</div>
      <div class="more">更多</div>
    </div>
    <div class="middle">
      <div class="middle-title">
        <img :src="commentInfo.user.avatar" alt="" />
        <span>{{ commentInfo.user.uname }}</span>
      </div>
      <div class="middle-content">{{ commentInfo.content }}</div>
      <div class="middle-foot">
        <span>{{ commentInfo.created | showDate }}</span>
        <span>{{ commentInfo.style }}</span>
        <div>
          <img
            v-for="(item, index) in commentInfo.images"
            :key="index"
            :src="item"
            alt=""
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { formatDate } from 'common/utils'
export default {
  props: {
    commentInfo: {
      type: Object,
      default() {
        return {}
      }
    }
  },
  filters: {
    showDate(value) {
      // 1.将时间戳转成date对象
      const date = new Date(value * 1000)
      // 2.将date进行格式化
      return formatDate(date, 'yyyy-MM-dd')
    }
  }
}
</script>

<style scoped>
.comment-info {
  padding: 10px 15px 20px;
  background-color: #fff;
  border-bottom: 5px solid #f2f5f8;
}
.top {
  display: flex;
  line-height: 40px;
  justify-content: space-between;
  align-items: center;
  font-size: 14px;
  color: black;
  padding-right: 18px;
  position: relative;
  border-bottom: 2px solid rgba(150, 150, 150, 0.13);
}

.top .more::after {
  content: '';
  position: absolute;
  top: 14.5px;
  right: 2px;
  width: 10px;
  height: 10px;
  border-top: 1px solid rgba(150, 150, 150);
  border-right: 1px solid rgba(150, 150, 150);
  transform: rotate(45deg);
}
.middle-title {
  height: 61px;
  line-height: 61px;
  font-size: 14px;
  color: black;
}
.middle-title img {
  width: 42px;
  border-radius: 50%;
  vertical-align: middle;
  margin-right: 17px;
}
.middle-content {
  font-size: 13.5px;
  margin-top: 7px;
  line-height: 20px;
}
.middle-foot {
  margin-top: 10px;
  font-size: 12.5px;
  color: rgba(150, 150, 150);
}
.middle-foot span {
  margin-right: 12px;
}
.middle-foot img {
  margin-top: 8px;
  margin-right: 5px;
  width: 70px;
  height: 70px;
}
</style>
