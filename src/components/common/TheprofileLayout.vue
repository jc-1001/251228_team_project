<script setup>
import { ref } from 'vue'
import { RouterLink } from 'vue-router'
import AppIcon from '@/components/common/AppIcon.vue'
const profileItem = ref([
  { name: '個人資料', icon: 'person', path: '/profile' },
  { name: '我的積分', icon: 'stars', path: '/mypoint' },
  { name: '我的訂單', icon: 'article', path: '/orderlist' },
])

import { onMounted } from 'vue' // 確保有引入 onMounted

const userName = ref('訪客') // 預設值

onMounted(() => {
  // 從快取讀取登入時存入的資料
  const savedData = localStorage.getItem('userProfile')
  if (savedData) {
    const userData = JSON.parse(savedData)
    // 讀取資料庫對應的姓名欄位 full_name
    userName.value = userData.full_name || '會員'
  }
})

defineProps({
  title: {
    type: String,
    default: '個人中心', // 預設值
  },
  showTitle: {
    type: Boolean,
    default: true,
  },
})

const handleUserLogout = () => {
  if (confirm('確定要登出嗎？')) {
    localStorage.removeItem('isUserLogin') // 清除會員通行證
    localStorage.removeItem('userProfile') // 清除主要使用者資料標記
    localStorage.removeItem('myCart') // 清除購物車項目
    window.location.href = '/' // 導回登陸首頁或登入頁
  }
}
</script>
<template>
  <main class="profile-layout">
    <aside class="sidebar">
      <div class="user-info">
        <div class="pf-img">
          <img src="@/assets/images/user-pic.svg" alt="頭像" />
        </div>
        <p class="user-name">{{ userName }}</p>
      </div>

      <nav class="menu-list">
        <RouterLink v-for="item in profileItem" :key="item.name" :to="item.path" class="menu-item">
          <AppIcon :name="item.icon" size="20" class="menu-icon" />
          <span class="menu_name">{{ item.name }}</span>
        </RouterLink>
      </nav>

      <button class="logout-btn" @click="handleUserLogout">
        <AppIcon name="logout" size="20" class="logout-icon-svg" />
        登出
      </button>
    </aside>

    <section class="content-area">
      <template v-if="showTitle">
        <h3 class="content-title">
          {{ title }}
        </h3>
        <hr style="margin: 16px 0" class="line" />
      </template>

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
        border-radius: 50%;
        object-fit: cover;
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
        background-color: $white;
        border-radius: 8px;
        transition: all 0.3s;
        .menu-icon {
          color: inherit;
          transition: color 0.3s ease;
        }

        &:hover,
        &.router-link-active {
          color: $white;
          background: $linear2;
        }
      }
    }

    .logout-btn {
      display: flex;
      justify-content: center;
      gap: 5px;
      align-items: center;
      width: 100%;
      padding: 12px;
      background-color: $primaryDark;
      @include body2(true);
      color: white;
      border: none;
      border-radius: $radius_md;
      cursor: pointer;
      &:hover {
        opacity: 0.9;
      }
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

      .user-info {
        display: flex;
        align-items: center;
        gap: 12px;
        margin-bottom: 16px;
        width: 100%;

        .pf-img img {
          width: 50px;
          height: 50px;
        }

        .user-name {
          margin-top: 0;
          font-size: 18px;
        }
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
          border: 1px solid $grayDark;
          border-radius: 50px;
          white-space: nowrap;

          .menu-icon {
            display: none;
          }

          &:hover,
          &.router-link-active {
            background: $primary;
            color: white;
            border-color: $primary;
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

@media (max-width: 768px) {
  .profile-layout {
    flex-direction: column;
    gap: 16px;
    padding: 20px 0;

    .sidebar {
      width: 100%;
      padding: 16px;

      .user-info {
        display: flex;
        align-items: center;
        gap: 12px;
        margin-bottom: 16px;
        width: 100%;

        .pf-img img {
          width: 50px;
          height: 50px;
        }

        .user-name {
          margin-top: 0;
          font-size: 18px;
        }
      }

      .menu-list {
        display: flex;
        flex-direction: row;
        margin: 0 0 16px 0;
        gap: 8px;
        overflow-x: auto;
        white-space: nowrap;
        padding-bottom: 4px;

        &::-webkit-scrollbar {
          display: none;
        }

        .menu-item {
          margin-bottom: 0;
          flex-shrink: 0;
          padding: 8px 16px;
          font-size: 14px;
          background-color: #f5f5f5;

          &:hover,
          &.router-link-active {
            color: $white;
            background-color: $primary;
            border-color: $primary;
          }
        }
      }

      .logout-btn {
        padding: 8px;
        @include body3(true);
      }
    }

    .content-area {
      padding: 20px;
      min-height: auto;
    }
  }
}
</style>
