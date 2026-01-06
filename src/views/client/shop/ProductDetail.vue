<script setup>
import { ref, computed } from 'vue'
import { useRoute } from 'vue-router'
import { allProducts } from '@/data/shop/productInfo'

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
  <section class="product_detail_card">
    <div class="product_pic">
      <img :src="currentProduct.image" :alt="currentProduct.title" class="large_image">
      <img src="" alt="" class="small_image">
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
</template>

<style lang="scss" scoped>
  
</style>