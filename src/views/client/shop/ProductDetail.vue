<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { useProductStore } from '@/stores/product'
import ProductGallery from '@/components/shop/ProductGallery.vue'
import ProductIntro from '@/components/shop/ProductIntro.vue'
import ProductInfoTabs from '@/components/shop/ProductInfoTabs.vue'

const route = useRoute()
const productStore = useProductStore()

const currentProduct = ref({})

onMounted(async () => {
  const id = route.params.id

  const data = await productStore.fetchProductDetail(id)

  if(data) {
    currentProduct.value = data
    // console.log('詳情頁資料拿到囉：', currentProduct.value)

    // 最近瀏覽紀錄
    let viewedList = JSON.parse(localStorage.getItem('recent_viewed')) || []

    // 避免重複記錄
    viewedList = viewedList.filter(itemId => String(itemId) !== String(id))

    viewedList.unshift(id)

    // 只留前4筆
    if(viewedList.length > 4) viewedList.pop()
    
    
    localStorage.setItem('recent_viewed', JSON.stringify(viewedList))


  } else {
    console.log('找不到商品')
  }
})


const categoryIdMap = {
  1: '骨骼關節保養',
  2: '心血管循環',
  3: '晶亮護眼'
}

</script>

<template>
  <div class="product_datail_page">
    <div class="breadcrumb">
      <router-link :to="'/shop'" class="breadcrumb_location">樂活商城</router-link>
      <span class="breadcrumb_category" v-if="currentProduct.category_id">{{ categoryIdMap[currentProduct.category_id] }}</span>
      <span class="breadcrumb_product">{{ currentProduct.title }}</span>
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

    .breadcrumb_location {
      &:hover {
        color: $primary
      }
    }

    .breadcrumb_product {
      @include body3(true);
      color: $primaryDark;
    }
  .breadcrumb_category::before,
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