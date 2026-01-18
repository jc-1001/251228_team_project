<script setup>
import { ref } from 'vue'
import { RouterLink } from 'vue-router'
import sidebarLogo from '@/assets/images/common/logo-white.svg'
import sidebarDeco from '@/assets/images/common/sidebar_deco.svg'

const isSidebarOpen = ref(false)

const menuItems = ref([
  { name: '數據儀錶板', icon: 'dashboard', path: '/HomeView' },
  { name: '使用者管理', icon: 'Users', path: '/Users' },
  { name: '商品管理', icon: 'updateUserStatus', path: '/updateUserStatus' },
  { name: '訂單管理', icon: '', path: '/' },
  { name: '系統通知', icon: '', path: '/' }
])
</script>

<template>

  <aside class="sidebar" :class="{ 'is-mobile-open': isSidebarOpen }">
    <div class="sidebar_logo">
      <img :src="sidebarLogo" alt="UniCare品牌logo" />
    </div>

    <RouterLink
      v-for="item in menuItems"
      :key="item.name"
      :to="item.path"
      class="menu_item"
      @click="isSidebarOpen = false"
    >
      <span class="material-symbols-rounded menu_icon">{{ item.icon }}</span>
      <span class="menu_name">{{ item.name }}</span>
    </RouterLink>
    <div class="sidebar_deco">
      <img :src="sidebarDeco" alt="sidebar裝飾圖形" />
    </div>
  </aside>

  <div v-if="isSidebarOpen" class="sidebar-overlay" @click="isSidebarOpen = false"></div>
</template>

<style lang="scss" scoped>
.sidebar {
  padding: 40px 24px;
  display: flex;
  flex-direction: column;
  gap: 16px;
  width: 250px;
  // width: 303px;
  height: 100vh;
  background-color: $primaryDark;
  box-shadow: $shadow;
  border-radius: 0 20px 20px 0;
  position: sticky;
  top: 0;
  overflow: hidden;

  .hamburger-btn {
    display: none;
  }

  .sidebar_logo {
    padding-left: 24px;
    margin-bottom: 8px;
    img {
      width: 80%;
    }
  }

  .menu_item {
    display: flex;
    align-items: center;
    gap: 6px;
    padding: 16px 24px;
    @include body1(true);
    color: $primaryDark;
    border-radius: 10px;
    transition: background 0.3s;

    &:hover,
    &.router-link-active {
      color: $white;
      background: $linear2;
    }
  }

  .sidebar_deco {
    margin-left: -24px;
  }
}


  .sidebar {
    position: fixed;
    top: 0;
    left: 0;
    transform: translateX(-100%);
    transition: transform 0.3s ease-in-out;
    z-index: 1000;

    &.is-mobile-open {
      transform: translateX(0);
    }
  }
  .sidebar-overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.3);
    z-index: 999;
  }
</style>
