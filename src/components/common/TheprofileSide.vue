<script setup>
import { ref } from 'vue'
import { RouterLink } from 'vue-router'
const profileItem = ref([
  { name: '個人資料', icon: 'dashboard', path: '/HomeView' },
  { name: '我的積分', icon: 'restaurant', path: '/DietLog' },
  { name: '我的訂單', icon: 'medication', path: '/medicine' },
])
</script>
<template>
  <div class="profile-card">
    <div class="pf-img"></div>
    <div class="pf-index"></div>
    <button class="logout">登出</button>
  </div>
</template>
<style lang="scss" scoped></style>
