<script setup>
import { ref } from 'vue'
import { RouterLink } from 'vue-router'
import ProductCard from '@/components/shop/ProductCard.vue'
import fishOilImg from '@/assets/images/' // 測試用

const categories = ref(['全部商品', '骨骼關節保養', '心血管循環', '晶亮護眼'])
const currentCategory = ref('全部商品')
// 切換分類
const selectCategory = (name) => {
  currentCategory.value = name
}
</script>

<template>
  <div class="mall_page">
    <div class="category_btns">
      <button v-for="cat in categories" :key="cat" class="category_btns_el" :class="{'active':currentCategory === cat}" @click="selectCategory(cat)">{{ cat }}</button>
    </div>
    <div class="test_area">
      <ProductCard :image="fishOilImg" title="頂級深海rTG魚油" spec="60錠/瓶" :price="1280" tag="熱銷" />

    </div>
  </div>
</template>

<style lang="scss" scoped>
.mall_page {
  .category_btns {
    display: flex;
    gap: 16px;
    margin-bottom: 40px;
    overflow-y: auto;
    padding-bottom: 4px;

    .category_btns_el {
      padding: 0 24px;
      padding: 0 12px;
      width: 170px;
      height: 50px;
      @include subtitle2(true);
      line-height: 50px;
      background-color: $white;
      color: $grayDark;
      text-align: center;
      border: 1px solid $grayDark;
      border-radius: 100px;
      cursor: pointer;
      transition: all .3s;
      white-space: nowrap;

      &:hover,
      &.active {
        color: $white;
        background-color: $primary;
        border: 1px solid $primary;
      }
    }
  }
}

.test_area {
  // padding: 5px;
  margin-bottom: 100px;
  width: 300px;
  /* 先限制一個寬度，模擬它在網格裡的樣子 */
  // margin: 0 auto;
  background-color: #f0f0f0;
  /* 給個背景色比較好分辨 */
}
</style>