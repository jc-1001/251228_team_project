<script setup>
import { ref, computed } from 'vue'
import { allProducts } from '@/data/shop/productInfo'
import ProductCard from '@/components/shop/ProductCard.vue'
import TheTopIcon from '@/components/common/TheTopIcon.vue'
import bannerImage from '@/assets/images/shop/banner_img_shop.svg'

// 商品列表
const product = ref(allProducts)

// 分類按鈕
const categories = ref(['全部商品', '骨骼關節保養', '心血管循環', '晶亮護眼'])
const currentCategory = ref('全部商品')
// 切換分類
const selectCategory = (name) => {
  currentCategory.value = name
}

// 切換各分類中的商品卡片
// 筆記:computed計算屬性，是為了將一個「運算過程」轉換為一個「具備快取能力的響應式狀態」
const filteredProducts = computed(() => {
  if (currentCategory.value === '全部商品') {
    return product.value
  } 
  return product.value.filter((item)=>{
    return item.category === currentCategory.value
  })
})
</script>

<template>
  <div class="mall_page">
    <TheTopIcon/>
    <div class="banner">
      <div class="banner_txt">
        <h2>樂活商城</h2>
        <p>用健康積分兌換好禮，照顧自己也照顧家人!</p>
      </div>
      <div class="banner_pic">
        <img :src=bannerImage alt="">
      </div>
    </div>
    <div class="category_btns">
      <button v-for="cat in categories" :key="cat" class="category_btns_el"
        :class="{ 'active': currentCategory === cat }" @click="selectCategory(cat)">{{ cat }}</button>
    </div>
    <div class="product_card_list">
      <ProductCard v-for="item in filteredProducts" :key="item.id" :category="item.category" :image="item.image"
        :title="item.title" :spec="item.spec" :price="item.price" :tag="item.tag" />
    </div>
  </div>
</template>

<style lang="scss" scoped>
.mall_page {
  .banner {
    display: flex;
    justify-content: space-between;
    align-items: flex-end;
    margin-bottom: 40px;
    color: $primaryDark;
    background: $linear1;
    border: 2px solid $white;
    border-radius: 10px;
    box-shadow: $shadow;

    .banner_txt {
      display: flex;
      flex-direction: column;
      gap: 4px;
      padding: 32px 40px;

      h2 {
        @include title3(true);
      }

      p {
        @include body2;
      }
    }

    .banner_pic {
      padding: 8px 24px 0 0;

      img {
        object-fit: cover;
        width: 80%;
      }
    }
  }

  .category_btns {
    display: flex;
    gap: 16px;
    margin-bottom: 40px;
    overflow-y: auto;
    padding-bottom: 4px;

    .category_btns_el {
      padding: 0 12px;
      width: 170px;
      height: 45px;
      @include body1(true);
      line-height: 43px;
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

  .product_card_list {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)); // 概念類似於 repeat(數量, 尺寸(最小, 最大))，數量的另一種選擇為auto-fill
    grid-template-rows: auto;
    gap: 32px;
  }
}
</style>