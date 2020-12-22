<template>
  <div v-if="Object.keys(paramInfo).length !== 0" class="param-info">
    <div class="top">
      <table
        v-for="(table, index) in paramInfo.sizes"
        class="sizes"
        :key="index"
      >
        <tr v-for="(tr, indey) in table" :key="indey">
          <td v-for="(td, indez) in tr" :key="indez">{{ td }}</td>
        </tr>
      </table>

      <table class="infos">
        <tr v-for="(item, index) in paramInfo.infos" :key="index">
          <td>{{ item.key }}</td>
          <td>{{ item.value }}</td>
        </tr>
      </table>
    </div>
    <div class="bottom">
      <img v-if="paramInfo.image" :src="paramInfo.image" alt="" />
    </div>
  </div>
</template>

<script>
export default {
  props: {
    paramInfo: {
      type: Object,
      default() {
        return {}
      }
    }
  }
}
</script>

<style scoped>
.param-info {
  padding: 25px 14px;
  background-color: #fff;
  border-top: 5px solid rgba(150, 150, 150, 0.1);
  border-bottom: 5px solid rgba(150, 150, 150, 0.1);
}
.param-info table {
  width: 100%;
  font-size: 14px;
  border-collapse: collapse;
}
.param-info table tr:nth-last-child(1) {
  border-bottom: 2px solid rgba(150, 150, 150, 0.1);
}
.param-info .sizes tr {
  display: flex;
}
.param-info .sizes td,
.param-info .infos td {
  flex: 1;
  padding: 12px 0px;
  border-bottom: 1px solid rgba(100, 100, 100, 0.1);
}
.param-info .infos td:nth-child(2) {
  padding-left: 55px;
  color: #ee6984;
}
.bottom img {
  width: 100%;
}
</style>
