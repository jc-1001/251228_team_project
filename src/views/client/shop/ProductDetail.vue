<script setup>
import { ref, computed } from 'vue'
import { useRoute } from 'vue-router'
import { allProducts } from '@/data/shop/productInfo'
import ProductGallery from '@/components/shop/ProductGallery.vue'
import ProductIntro from '@/components/shop/ProductIntro.vue'
import ProductInfoTabs from '@/components/shop/ProductInfoTabs.vue'

const route = useRoute()
// const product = ref(allProducts)
// 筆記: find可以回傳找出的唯一值 / filter則是回傳"陣列"，即使只有一個也會回傳陣列
const currentProduct = computed(() => {
  return allProducts.find((product) => {
    return product.id === parseInt(route.params.id)
  })
})

</script>

<template>
  <div class="product_datail_page">
    <div class="breadcrumb">
      <router-link :to="'/shop'" class="breadcrumb_location">樂活商城</router-link>
      <router-link class="breadcrumb_category">{{ currentProduct.category }}</router-link>
      <router-link class="breadcrumb_product">{{ currentProduct.title }}</router-link>
    </div>
    <section class="product_detail_card">
      <ProductGallery :gallery="currentProduct?.gallery"/>
      <ProductIntro :product="currentProduct"/>
    </section>
    <ProductInfoTabs :features="currentProduct?.features" :details="currentProduct?.details"/>
  </div>
</template>

<style lang="scss" scoped>
.product_datail_page {
  .breadcrumb {
    margin-bottom: 16px;
    @include body3;
    color: $grayDark;

    .breadcrumb_product {
      @include body3(true);
      color: $primaryDark;
    }
  :hover {
    color: $primary;
  }
  .breadcrumb_location::after,
  .breadcrumb_category::after {
    content: ' / ';
  }
  }
  .product_detail_card {
    display: flex;
    flex-wrap: wrap;
    gap: 32px;
    margin-bottom: 24px;
    padding: 40px 32px;
    background-color: $white;
    border-radius: $radius-md;
    box-shadow: $shadow;
  }
}
</style>