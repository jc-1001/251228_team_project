<script setup>
import { computed, ref, watch } from 'vue'
import { RouterView, useRoute } from 'vue-router'
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
    return { 'background-image': `url("${detailBg}")`, 'background-position': 'right top', 'background-size': '750px' }
  }
  if (route.path.includes('ORD')) {
    return { 'background-image': `url("${detailBg}")`, 'background-position': 'right top', 'background-size': '750px' }
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
</script>

<template>
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
.app_layout {
  display: flex;
  min-height: 100vh;
  background-color: $bgBody;
}

// route.params.id = '/Landing'
// scroll-behavior: smooth

.main_content {
  flex: 1;
  padding: 28px 54px 40px;
  height: 100vh;
  overflow-y: auto;
  background-repeat: no-repeat;

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
