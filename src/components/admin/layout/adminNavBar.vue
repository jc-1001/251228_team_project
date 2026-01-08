<script setup>
import { ref } from 'vue'
import { RouterLink } from 'vue-router'
import sidebarLogo from '@/assets/images/common/logo-white.svg'
import sidebarDeco from '@/assets/images/common/sidebar_deco.svg'
// 其他子頁面必須包含父層路徑
const menuItems = ref([
  { name: '數據儀錶板', icon: 'insights', path: '/admin' },
  { name: '使用者管理', icon: 'contact_page', path: '/admin/users' },
  { name: '商品管理', icon: 'storefront', path: '/admin/products' },
  { name: '訂單管理', icon: 'assignment', path: '/admin/orders' },
  { name: '系統通知', icon: 'forum', path: '/admin/notices' },
])
</script>

<template>
  <aside class="sidebar">
    <div class="sidebar_logo">
      <img :src="sidebarLogo" alt="UniCare品牌logo" />
    </div>
    <RouterLink v-for="item in menuItems" :key="item.name" :to="item.path" class="menu_item">
      <span class="material-icons-round menu_icon">{{ item.icon }}</span>
      <span class="menu_name">{{ item.name }}</span>
    </RouterLink>
    <div class="sidebar_deco">
      <img :src="sidebarDeco" alt="sidebar裝飾圖形" />
    </div>
  </aside>
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
  background-color: $primary;
  box-shadow: $shadow;
  border-radius: 0 20px 20px 0;
  position: sticky;
  top: 0;
  overflow: hidden;

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
    color: $white;
    border-radius: 10px;
    transition: background 0.3s;

    &:hover,
    &.router-link-exact-active {
      color: $primaryDark;
      background: $white;
    }
  }

  .sidebar_deco {
    margin-left: -24px;
  }
}
</style>
