<script setup>
import { RouterView } from 'vue-router'
import TheSidebar from './components/common/TheSidebar.vue'
import TheTopIcon from './components/common/TheTopIcon.vue'
</script>

<template>
  <div class="app_layout">
    <TheSidebar />

    <main class="main_content">
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
  padding: 32px 80px;
  height: 100vh;
  overflow-y: auto;
}
</style>
