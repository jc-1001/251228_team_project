<script setup>
import { ref } from 'vue'

const topIcons = ref([
  { name: '提醒', icon: 'notifications', path: '/', badge: true },
  { name: '購物車', icon: 'shopping_cart', path: '/', badge: 100 },
  { name: '頭像', icon: 'account_circle', path: '/', badge: 0 },
])
</script>
<template>
  <!-- 頂部icon -->
  <div class="global-top-bar">
    <div
      v-for="item in topIcons"
      :key="item.name"
      class="icon-circle"
      @click="$router.push(item.path)"
    >
      <span class="material-icons">{{ item.icon }}</span>
      <!-- 數字紅點 -->
      <div v-if="typeof item.badge === 'number' && item.badge > 0" class="badge-number">
        {{ item.badge > 99 ? '99+' : item.badge }}
      </div>
      <!-- 僅紅點 -->
      <div v-else-if="item.badge === true" class="badge-dot"></div>
    </div>
  </div>
</template>
<style lang="scss" scoped>
// 頂部icon
.global-top-bar {
  display: flex;
  justify-content: end;
  gap: 12px;
}
.icon-circle {
  //   border: 1px solid black;
  width: 40px;
  height: 40px;
  background: white;
  border-radius: 50%;
  box-shadow: $shadow;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  position: relative;
}
.material-icons {
  color: $primaryDark;
}
// 提醒紅點
.badge-number {
  position: absolute;
  top: -4px;
  right: -4px;
  background-color: $accent;
  color: white;
  font-size: 10px; // 自設
  font-family: 'noto sans TC'; // 參考設計規範
  font-weight: bold;
  min-width: 18px;
  height: 18px;
  border-radius: $radius_md;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0 4px;
  box-shadow: $shadow;
}
.badge-dot {
  position: absolute;
  top: -2px;
  right: -2px;
  background-color: $accent;
  min-width: 15px;
  height: 15px;
  border-radius: $radius_md;
}
</style>
