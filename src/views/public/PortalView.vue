<script setup>
import { ref } from 'vue'

// 定義功能入口資料
const portals = ref([
  { id: 1, title: '前台', iconName: 'front.png', path: '/Login' },
  { id: 2, title: '後台', iconName: 'back.png', path: '/AdminLogin' }
])
</script>

<template>
  <div class="portal-page">
    <div class="portal-container">
      <header class="portal-header">
        <img src="\src\assets\images\20260118\logo.png" alt="Logo" class="logo">
      </header>

      <div class="portal-grid">
        <router-link 
          v-for="item in portals" 
          :key="item.id" 
          :to="item.path"
          class="portal-card"
        >
          <div class="icon-wrapper" :style="{ backgroundColor: item.color }">
            <img :src="`\\src\\assets\\images\\20260118\\${item.iconName}`" :alt="item.title" class="card-icon">
          </div>
          <h3>{{ item.title }}</h3>
        </router-link>
      </div>

    </div>
  </div>
</template>

<style lang="scss" scoped>
.portal-page {
  min-height: 100vh;
  background-color: #e0f2f1;
  display: flex;
  justify-content: center;
  align-items: center;
}

.portal-container {
  width: 100%;
  max-width: 1000px;
}

.portal-header {
  margin-bottom: 60px;
  display: flex;
  justify-content: center; // 確保水平置中
  
  .logo { 
    height: auto; 
    width: 300px; // 這裡調整 Logo 的大小
    filter: drop-shadow(0 4px 6px rgba(0,0,0,0.1));
  }
}

/* 網格佈局 */
.portal-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 40px; // 增加卡片間距
}

/* 卡片設計 */
.portal-card {
  background: white;
  padding: 50px 30px;
  border-radius: 32px;
  text-decoration: none;
  transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
  display: flex;
  flex-direction: column;
  align-items: center;
  box-shadow: 0 15px 35px rgba(0,0,0,0.05);

  &:hover {
    transform: translateY(-15px);
    box-shadow: 0 25px 50px rgba(46, 102, 105, 0.2);
    
    .card-icon {
      transform: scale(1.1);
    }
  }

  .icon-wrapper {
    width: 120px;
    height: 120px;
    border-radius: 24px;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-bottom: 25px;
    
    .card-icon {
      width: 70%; // 圖片在方框內的大小
      height: auto;
      transition: transform 0.3s ease;
    }
  }

  h3 {
    font-size: 24px;
    color: #2E6669;
    margin: 0;
    font-weight: 600;
  }
}

/* 手機版適應 */
@media (max-width: 600px) {
  .portal-grid {
    grid-template-columns: 1fr;
  }
  .logo {
    width: 200px;
  }
}
</style>