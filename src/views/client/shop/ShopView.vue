<script setup>
import { ref, computed, onMounted } from 'vue'
// 引入商品資料庫資料
import { useProductStore } from '@/stores/product'
import ProductCard from '@/components/shop/ProductCard.vue'
import TheHeader from '@/components/common/TheHeader.vue'
import bannerImage from '@/assets/images/shop/banner_img_shop.svg'

import searchIcon from '@/assets/images/shop/icon/search.svg'

// 獲取積分小互動
import LuckyChest from '@/components/shop/LuckyChest.vue' 


// 商品列表
const productStore = useProductStore()

onMounted(() => {
  productStore.fetchProducts()
})

// 分類按鈕
const categories = ref(['全部商品', '骨骼關節保養', '心血管循環', '晶亮護眼'])
const currentCategory = ref('全部商品')
// 切換分類
const selectCategory = (name) => {
  currentCategory.value = name
}

// 對接資料庫的category_id
const categoryMap = {
  '骨骼關節保養': 1,
  '心血管循環': 2,
  '晶亮護眼': 3
}

// 搜尋文字
const searchQuery = ref('')

// 搜尋邏輯
// 筆記:computed計算屬性，是為了將一個「運算過程」轉換為一個「具備快取能力的響應式狀態」
const filteredProducts = computed(() => {
  const query = searchQuery.value.toLowerCase().trim()

  return productStore.products.filter((item) => {
    // 1. 處理分類切換
    let matchCategory = false
    if(currentCategory.value === '全部商品') {
      matchCategory = true
    } else {
      // 把選到的"分類名稱"轉成數字，與資料庫對接
      const targetId = categoryMap[currentCategory.value]
      matchCategory = Number(item.category_id) === targetId
    }

    // 2.處理搜尋過濾
    const matchSearch = query === '' || item.title.toLowerCase().includes(query) || (item.keywords && item.keywords.toLowerCase().includes(query))

    return matchCategory && matchSearch
  })
})

// 最近瀏覽紀錄
const recentProducts = computed(()=>{
  const viewedIds = JSON.parse(localStorage.getItem('recent_viewed')) || []

  return viewedIds.map(id => {
    return productStore.products.find(p => String(p.product_id) === String(id))
  }).filter(item => item !== undefined)
})


</script>

<template>
  <div class="mall_page">
    <TheHeader
      title="樂活商城"
      subtitle="用健康積分兌換好禮，照顧自己也照顧家人!"
      :imageSrc="bannerImage"
    class="banner" />
    <LuckyChest />

    <div class="controls_container">
      <div class="category_btns">
        <button v-for="cat in categories" :key="cat" class="category_btns_el" :class="{ 'active': currentCategory === cat }" @click="selectCategory(cat)">{{ cat }}</button>
      </div>
      <div class="search_wrapper">
        <span class="search_icon">
          <img :src="searchIcon" alt="">
        </span>
        <input type="text" v-model="searchQuery" placeholder="請輸入商品名稱或關鍵字">
      </div>
    </div>
    <div class="product_card_list">
      <ProductCard v-for="item in filteredProducts" :key="item.product_id" v-bind="item" :id="item.product_id"/>
      <div v-if="filteredProducts.length === 0" class="no-result">
        未找到相關商品
      </div>
    </div>
    <section v-if="recentProducts.length > 0" class="recent_section">
      <div class="divider">
        <span class="text">您最近看過的商品</span>
      </div>
      <div class="product_card_list">
        <ProductCard 
          v-for="item in recentProducts" 
          :key="item.product_id" 
          v-bind="item" 
          :id="item.product_id"
        />
      </div>
    </section>
  </div>
</template>

<style lang="scss" scoped>
.mall_page {
  .banner {
    margin-bottom: 32px;
  }

  .category_btns {
    display: flex;
    flex-wrap: wrap;
    gap: 12px;
    .category_btns_el {
      padding: 5px 12px;
      width: 150px;
      @include body1(true);
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
      @media screen and (max-width: 768px) {
        flex: 1 1 auto;
        padding: 8px 12px;
        @include body2(true);
      }
    }
  }

  .product_card_list {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(250px, 1fr)); // 概念類似於 repeat(數量, 尺寸(最小, 最大))，數量的另一種選擇為auto-fill
    grid-template-rows: auto;
    gap: 32px;
    .no-result {
      grid-column: 1 / -1;
      padding: 40px;
      @include body1;
      text-align: center;
      color: $grayDark;
    }
  }
}

.controls_container {
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: 16px;
  margin-bottom: 40px;
  .search_wrapper {
    position: relative;
    width: 320px;
    @media screen and (max-width: 768px) {
      width: 100%;
    }
    input {
      padding: 8px 12px 8px 40px;
      width: 100%;
      @include body3;
      outline: none;
      color: $black;
      border-radius: 50px;
      border: 1px solid $grayDark;
      transition: all .3s;
      &:focus {
        border: 1px solid $primary;
        box-shadow: 0 0 0 3px rgba($primary, 0.1);
        outline: none;
      }
    }
    .search_icon {
      position: absolute;
      top: 50%;
      left: 12px;
      transform: translateY(-50%);
      color: $primaryDark;
      pointer-events: none;
    }
  }
}

// 最近瀏覽紀錄
.recent_section {
  margin-top: 60px;
  
  .divider {
    display: flex;
    align-items: center;
    margin-bottom: 36px;
    color: $grayDark;
    
    &::before,
    &::after {
      content: '';
      flex: 1;
      height: 1.5px;
      background-color: $gray;
    }
    
    .text {
      padding: 0 16px;
      @include subtitle2(true);
      color: $primaryDark;
    }
  }
}
</style>