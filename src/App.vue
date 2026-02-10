<script setup>
import { computed, ref, watch, onMounted } from 'vue'
import { RouterView, useRoute } from 'vue-router'
import { storeToRefs } from 'pinia'
import { useLoadingStore } from './stores/loading'
import loading_icon from '../public/images/loading/logo_icon 1.svg'
import TheHeader from './components/common/TheHeader.vue'
import TheSidebar from './components/common/TheSidebar.vue'
import TheTopIcon from './components/common/TheTopIcon.vue'
// 背景圖引入區
import homeBg from '@/assets/images/Bg_home.svg'
import shopBg from '@/assets/images/shop/bg_deco_pill.svg?url'
import checkoutBg from '@/assets/images/shop/banner_img_checkout.svg?url'
import detailBg from '@/assets/images/shop/banner_img_detail.svg?url'
import metricBg from '@/assets/images/BG_metrics.svg?url'
import DietBg from '@/assets/images/BG_diary.svg?url'

import medicinebg from '@/assets/images/BG_mdc.svg?url'
import { publicApi } from './utils/publicApi'
import { useRouter } from 'vue-router';
const route = useRoute()

const mainContainer = ref(null)

// 監聽路由路徑變化-只要換頁就觸發
watch(
  () => route.path,
  () => {
    if (mainContainer.value) {
      // 強制把捲軸設回 0 (最頂端)
      mainContainer.value.scrollTop = 0
    }
  },
)

// 背景裝飾圖更換邏輯
const changeBg = computed(() => {
  if (route.path.includes('home')) {
    return { 'background-image': `url("${homeBg}")`, 'background-position': 'right 250px' }
  }
  if (route.path.includes('shop')) {
    return { 'background-image': `url("${shopBg}")`, 'background-position': 'right 250px' }
  }
  if (route.path.includes('checkout')) {
    return { 'background-image': `url("${checkoutBg}")`, 'background-position': 'right bottom' }
  }
  if (route.path.includes('orderlist')) {
    return {
      'background-image': `url("${detailBg}")`,
      'background-position': 'right top',
      'background-size': '750px',
    }
  }
  if (route.path.includes('ORD')) {
    return {
      'background-image': `url("${detailBg}")`,
      'background-position': 'right top',
      'background-size': '750px',
    }
  }
  if (route.path.includes('medicine')) {
    return { 'background-image': `url("${medicinebg}")`, 'background-position': 'right 250px' }
  }
  if (route.path.includes('Metrics')) {
    return { 'background-image': `url("${metricBg}")`, 'background-position': 'right 250px' }
  }
  if (route.path.includes('Diet')) {
    return { 'background-image': `url("${DietBg}")`, 'background-position': 'right 250px' }
  }
  return {}
})


// loading邏輯
const loadingStore = useLoadingStore()
// 監控數量
const { isGlobalLoading } = storeToRefs(loadingStore)

onMounted(() => {
  const completeLoading = () => {
    // 額外延遲，確保使用者看得到動畫，且轉場更平滑
    setTimeout(() => {
      loadingStore.setPageLoaded()
    }, 500)
  }
  // 檢查瀏覽器狀態
  if (document.readyState === 'complete') {
    completeLoading()
  } else {
    window.addEventListener('load', completeLoading)
  }
})

</script>

<template>
  <Transition name="fade">
    <div v-if="isGlobalLoading" class="loading-bg">
      <div class="loading-container">
        <img :src="loading_icon" class="loading-logo logo-1" alt="logo1" />
      </div>
      <p>資料載入中...</p>
    </div>
  </Transition>

  <div class="app_layout">
    <TheSidebar v-if="$route.meta.showSidebar" />
    <main 
      class="main_content" 
      :class="{ 'is-landing': $route.path === '/Landing' || $route.path === '/' }"
      :style="changeBg" 
      ref="mainContainer"
    >
      <TheHeader
        v-if="$route.meta.showHeader"
        :title="$route.meta.title"
        :subtitle="$route.meta.subtitle"
      />
      <TheTopIcon v-if="$route.meta.showTopIcon" />
      <RouterView />
    </main>
  </div>
</template>

<style lang="scss">
/* 定義動畫軌跡 */
@keyframes bounceAndScale {
  0%,
  100% {
    // 原來樣子
    transform: translateY(0) scale(1);
    filter: drop-shadow(0 5px 5px rgba(0, 0, 0, 0.1));
  }
  50% {
    transform: translateY(-20px) scale(1.1);
    // 向上跳 20px 放大 1.1 倍
    filter: drop-shadow(0 20px 10px rgba(0, 0, 0, 0.05));
  }
}
// 遮罩
.loading-bg {
  position: fixed;
  inset: 0;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background: rgba(255, 255, 255, 0.7);
  z-index: 999;

  .loading-container {
    display: flex;
    gap: 20px;
    margin-bottom: 15px;
  }

  .loading-logo {
    width: 60px;
    height: auto;
    // 動畫時間
    animation: bounceAndScale 0.8s ease-in-out infinite;
  }

  p {
    color: $grayDark;
    font-size: 16px;
    letter-spacing: 1.5px;
  }
}

// 主要版面

.app_layout {
  display: flex;
  min-height: 100vh;
  background-color: $bgBody;

  > aside {
    flex-shrink: 0;
  }
}


.main_content {
  flex: 1;
  min-width: 0;
  padding: 28px 54px 40px;
  // 首頁雙重卷軸解決
  max-width: 100vw; // 🔴 限制最大寬度為螢幕寬
  min-height: 100vh;
  // overflow-y: auto;
  background-repeat: no-repeat;
  // 背景圖固定
  background-attachment: fixed;

  &.is-landing {
    padding: 0 !important;
  }
  @media screen and (max-width: 1024px) {
    padding: 32px 24px;
    // 平板/手機版
    &.is-landing {
      padding: 0 !important;
    }
  }
  @media screen and (max-width: 576px) {
    height: auto;
  }
}
</style>
