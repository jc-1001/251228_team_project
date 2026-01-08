<script setup>
import { computed } from 'vue'
import { RouterView, useRoute } from 'vue-router'
import TheSidebar from './components/common/TheSidebar.vue'
import TheTopIcon from './components/common/TheTopIcon.vue'
// 背景圖引入區
import shopBg from '@/assets/images/shop/bg_deco_pill.svg?url'

const route = useRoute()

// 背景裝飾圖更換邏輯
const changeBg = computed(() => {
  if (route.path.includes('shop')) {
    return { 'background-image': `url("${shopBg}")`, 'background-position': 'right 250px' }
  }
  return {}
})
</script>

<template>
  <div class="app_layout">
    <TheSidebar v-if="$route.meta.showSidebar" />
    <!-- 後台間距設定:如果有admin存在就會padding=0 -->
    <main
      class="main_content"
      :class="{ 'is-admin-root': $route.path.includes('admin') }"
      :style="changeBg"
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

.main_content {
  flex: 1;
  padding: 24px 54px; // 原先是 padding: 32px 80px; 如果有人已經開始切版，而且大跑版請跟NLee說!
  height: 100vh;
  overflow-y: auto;
  background-repeat: no-repeat;
  // 後台的外圍間距(!!!)
  &.is-admin-root {
    padding: 0 !important;
  }
}
</style>
