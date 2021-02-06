<template>
  <div id="category">
    <NavBar class="category-nav-bar"><div slot="center">分类</div></NavBar>
    <CategoryList :categoryList="categoryList"></CategoryList>
    <CategoryContent></CategoryContent>
  </div>
</template>

<script>
import NavBar from '../../components/common/navbar/NavBar'
import CategoryList from './childComps/CategoryList'
import CategoryContent from './childComps/CategoryContent'

import { getCategory } from '../../network/category'
export default {
  components: { NavBar, CategoryList, CategoryContent },
  data() {
    return {
      categoryList: []
    }
  },
  created() {
    getCategory().then(res => (this.categoryList = res.data.category.list))
  },
  methods: {}
}
</script>

<style scoped>
#category {
  height: 100vh;
  position: relative;
}
.category-nav-bar {
  background-color: var(--color-tint);
  color: aliceblue;
}
</style>
