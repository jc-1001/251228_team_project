<script setup>
import { ref, computed } from 'vue'
import { useRoute } from 'vue-router'
import { allProducts } from '@/data/shop/productInfo'
import TheTopIcon from '@/components/common/TheTopIcon.vue'


const route = useRoute()
// const product = ref(allProducts)
// 筆記: find可以回傳找出的唯一值 / filter則是回傳"陣列"，即使只有一個也會回傳陣列
const currentProduct = computed(() => {
  return allProducts.find((item) => {
    return item.id === parseInt(route.params.id)
  })
})

console.log(currentProduct.value.title);




</script>

<template>
  <div class="product_datail_page">
    <TheTopIcon />
    <div class="breadcrumb"></div>
    <section class="product_detail_card">
      <div class="product_pic">
        <img :src="currentProduct.detailImg" :alt="currentProduct.title" class="large_image">
        <img :src="currentProduct.image" :alt="currentProduct.title" class="small_image">
      </div>
      <div class="product_body">
        <div class="product_content">
          <div class="product_txt">
            <p class="product_tag">{{ currentProduct.tag }}</p>
            <h3 class="product_title">{{ currentProduct.title }}</h3>
          </div>
          <div class="product_price">
            <p>${{ currentProduct.price }}</p>
          </div>
        </div>
        <div class="product_button">

        </div>
      </div>
    </section>
    <section class="product_info_card">

    </section>
  </div>
</template>

<style lang="scss" scoped>
  .product_datail_page {
    .product_detail_card {
      display: flex;
      gap: 32px;
      padding: 40px 32px;
      background-color: $white;
      border-radius: $radius-md;
      .product_pic{
        display: flex;
        flex-direction: column;
        gap: 16px;
        flex: 1.5;
        .large_image {
          border-radius: $radius-md;
        }
        .small_image {
          width: 15%;
        }
      }
      .product_body {
        display: flex;
        flex-direction: column;
        gap: 8px;
        flex: 1;
      }
    }
  }
</style>