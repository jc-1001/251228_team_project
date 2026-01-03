<script setup>
import { RouterView } from 'vue-router'
import TheSidebar from './components/common/TheSidebar.vue'

</script>

<template>
  <div class="app_layout">
    <TheSidebar />
    <main class="main_content">
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