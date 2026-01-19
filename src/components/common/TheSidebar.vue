<script setup>
import { ref } from 'vue'
import { RouterLink } from 'vue-router'
import sidebarLogo from '@/assets/images/common/logo.svg'
import sidebarDeco from '@/assets/images/common/sidebar_deco.svg'

const isSidebarOpen = ref(false)

const menuItems = ref([
  { name: '首頁戰情室', icon: 'dashboard', path: '/HomeView' },
  { name: '飲食日記', icon: 'restaurant', path: '/DietLog' },
  { name: '數位藥箱', icon: 'medication', path: '/medicine' },
  { name: '身體數值中心', icon: 'bar_chart', path: '/Metrics' },
  { name: '樂活商城', icon: 'storefront', path: '/shop' },
  { name: '幫助中心', icon: 'help', path: '/' },
])
</script>

<template>
  <button class="hb-btn" @click="isSidebarOpen = true">
    <span class="bar"></span>
    <span class="bar"></span>
    <span class="bar"></span>
  </button>

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
  height: 100vh;
  background-color: $white;
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

/* RWD */

@media (max-width: 1024px) {
  .main-layout {
    margin-left: 0;
  }

  .hb-btn {
    display: flex;
    flex-direction: column;
    margin: 14px 0 0 16px;
    gap: 4px;
    position: fixed;
    width: 40px;
    height: 40px;
    background: white;
    border-radius: 50%;
    box-shadow: $shadow;
    align-items: center;
    justify-content: center;
    top: 20px;
    left: 20px;
    z-index: 90;
    border: none;
    cursor: pointer;

    .bar {
      width: 20px;
      height: 2.5px;
      background-color: $primaryDark;
      border-radius: 5px;
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
}
</style>
