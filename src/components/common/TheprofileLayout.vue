<script setup>
import { ref } from 'vue'
import { RouterLink } from 'vue-router'
const profileItem = ref([
  { name: '個人資料', icon: 'person', path: '/profile' },
  { name: '我的積分', icon: 'stars', path: '/mypoint' },
  { name: '我的訂單', icon: 'Article', path: '/orderlist' },
])
defineProps({
  title: {
    type: String,
    default: '我是大標題', // 預設值
  },
})
</script>
<template>
  <main class="profile-layout">
    <aside class="sidebar">
      <div class="user-info">
        <div class="pf-img">
          <img src="@/assets/images/user-pic.svg" alt="頭像" />
        </div>
        <p class="user-name">陳小姐</p>
      </div>

      <nav class="menu-list">
        <RouterLink v-for="item in profileItem" :key="item.name" :to="item.path" class="menu-item">
          <span class="material-symbols-rounded">{{ item.icon }}</span>
          <span class="menu_name">{{ item.name }}</span>
        </RouterLink>
      </nav>

      <button class="logout-btn">登出</button>
    </aside>

    <section class="content-area">
      <h3 class="content-title">
        {{ title }}
      </h3>
      <hr style="margin: 16px 0" class="line" />

      <slot></slot>
    </section>
  </main>
</template>
<style lang="scss" scoped>
.profile-layout {
  display: flex;
  gap: 24px; // 左右欄間距
  min-height: 100vh;
  @media (max-width: 1024px) {
    display: grid;
  }

  // 左側側邊欄
  .sidebar {
    width: 240px; // 固定寬度
    height: fit-content;
    background-color: white;
    border-radius: 12px;
    padding: 30px 20px;
    display: flex;
    flex-direction: column;
    align-items: center;
    box-shadow: $shadow;

    .user-info {
      text-align: center;
      .pf-img img {
        width: 80px;
        height: 80px;
      }
      .user-name {
        @include subtitle2(true);
        color: $primaryDark;
        font-size: 16px;
        margin-top: 12px;
      }
    }

    .menu-list {
      width: 100%;
      flex-grow: 1; // 讓選單推擠登出按鈕向下
      margin: 30px 0;

      .menu-item {
        @include subtitle2(true);
        font-size: 16px;
        display: flex;
        align-items: center;
        gap: 10px;
        padding: 12px 20px;
        margin-bottom: 8px;
        text-decoration: none;
        color: $primaryDark;
        border-radius: 8px;
        &:hover,
        &.router-link-active {
          color: $white;
          background: $linear2;
        }
      }
    }

    .logout-btn {
      width: 100%;
      padding: 12px;
      background-color: $primaryDark;
      color: white;
      border: none;
      border-radius: $radius_md;
      cursor: pointer;
    }
  }

  // rwd
  @media (max-width: 1024px) {
    display: block;

    .sidebar {
      width: 100%;
      padding: 10px 0;
      background-color: transparent;
      box-shadow: none;
      flex-direction: column;

      .user-info,
      .logout-btn {
        display: none;
      }

      .menu-list {
        margin: 10px 0;
        display: flex;
        justify-content: flex-start;
        gap: 12px;
        overflow-x: auto; //可橫向捲動

        .menu-item {
          flex: 1;
          justify-content: center;
          padding: 8px 16px;
          margin-bottom: 0;
          border: 1px solid $primaryDark;
          border-radius: 50px;
          white-space: nowrap;

          .material-symbols-rounded {
            display: none;
          }

          &.router-link-active {
            background: $primary;
            color: white;
            border-color: $primary;
          }

          &:not(.router-link-active) {
            background: white;
            color: $primaryDark;
          }
        }
      }
    }

    .content-area {
      padding: 20px;
      margin-top: 10px;
    }
  }

  // 右側內容區
  .content-area {
    flex: 1; // 自動填滿剩餘空間
    background-color: white;
    border-radius: 12px;
    padding: 30px;
    box-shadow: $shadow;
    .content-title {
      color: $primaryDark;
    }
  }
}
</style>
