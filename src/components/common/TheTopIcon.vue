<script setup>
import { ref, computed, onMounted } from 'vue'
import { useCartStore } from '@/stores/cart'
import AppIcon from '@/components/common/AppIcon.vue'
import { publicApi } from '@/utils/publicApi'
// 真實會員ID key userProfile
const getMemberId = () => {
  const profileString = localStorage.getItem('userProfile')
  if (!profileString) return null
  try {
    const profile = JSON.parse(profileString)
    return profile.member_id || profile.id
  } catch (e) {
    return parseInt(profileString)
  }
}

const cartStore = useCartStore()

// 購物車內商品筆數
const cartQty = computed(() => {
  return cartStore.cartList.length
})

const topIcons = computed(() => [
  {
    // 鈴鐺標記有選單
    notification_id: 'notice',
    name: '提醒',
    icon: 'notifications',
    path: null,
    badge: true,
    hasDropdown: true,
  },
  { name: '購物車', icon: 'shopping_cart', path: '/cart', badge: cartQty.value },
  { name: '頭像', icon: 'person', path: '/profile', badge: false },
])
// 個人通知初始值
const notifications = ref([])
const isDropdownOpen = ref(false) // 控制選單顯示

// 串接API(個人通知訊息)
const fetchNotification = async () => {
  const mid = getMemberId()
  if (!mid) return
  try {
    //http://localhost:8888/unicare_api/notifications/get_notification.php

    const response = await publicApi.get(`notifications/get_notification.php?mid=${mid}`)
    const data = response.data

    // 判斷 data 是否為陣列，若不是則包成陣列
    notifications.value = Array.isArray(data) ? data : data ? [data] : []

    console.log('成功抓到個人通知資料：', notifications.value)
  } catch (error) {
    console.error('抓取通知失敗：', error)
  }
}

// 元件生命週期(加載完立即執行)
onMounted(() => {
  fetchNotification()
})

// 鈴鐺紅點消失及訊息已讀後消失
// 計算未讀訊息
const unreadCount = computed(() => {
  return notifications.value.filter((n) => !n.is_read).length
})
// 點擊訊息後、標記為已讀
// 串接API已讀之後動態更新(PATCH)
const markAsRead = async (note) => {
  // 如果是第一次註冊welcome_bonus不跑後端 API
  if (note.notification_id === 'welcome_bonus') {
    note.is_read = true
    notifications.value = notifications.value.filter(
      (n) => n.notification_id !== note.notification_id,
    )
    return //直接結束不跑API
  }

  const mid = getMemberId()
  if (!mid) return
  try {
    // http://localhost:8888/unicare_api/notifications/mark_as_read.php
    const response = await publicApi.patch(`notifications/mark_as_read.php?mid=${mid}`, {
      notification_id: note.notification_id,
      is_read: true, // 點擊要修改成已讀
    })

    // 已讀之後進入if並變更樣式移除之
    if (response.status === 200 || response.data.success) {
      // 先等後端成功，才移除前端畫面
      note.is_read = true
      notifications.value = notifications.value.filter(
        (n) => n.notification_id !== note.notification_id,
      )
    }
  } catch (error) {
    console.log('個人通知更新失敗', error)
  }
}

// 判斷顯示紅點與否
const showBadge = (item) => {
  if (item.notification_id === 'notice') {
    return unreadCount.value > 0 //未讀顯示紅點
  }
  // 確保拿到的是純數字
  const badgeValue = typeof item.badge === 'object' ? item.badge.value : item.badge
  return typeof badgeValue === 'number' && badgeValue > 0
}

// 計算訊息時間差的函式
const formatTime = (timeStr) => {
  if (!timeStr) return ''
  // 資料庫字串轉 Date 物件
  const now = new Date()
  const past = new Date(timeStr.replace(/-/g, '/')) // 處理 Safari 的相容性
  const diffInSeconds = Math.floor((now - past) / 1000)

  // 定義時間級距
  const min = 60
  const hour = min * 60
  const day = hour * 24
  const month = day * 30
  const year = day * 365

  // 顯示文字設定
  if (diffInSeconds < min) return '剛剛'
  if (diffInSeconds < hour) return Math.floor(diffInSeconds / min) + ' 分鐘前'
  if (diffInSeconds < day) return Math.floor(diffInSeconds / hour) + ' 小時前'
  if (diffInSeconds < month) return Math.floor(diffInSeconds / day) + ' 天前'
  if (diffInSeconds < year) return Math.floor(diffInSeconds / month) + ' 個月前'

  return Math.floor(diffInSeconds / year) + ' 年前'
}
</script>
<template>
  <!-- 頂部icon -->
  <div class="global-top-bar">
    <div
      v-for="item in topIcons"
      :key="item.name"
      class="icon-circle"
      @click="item.path ? $router.push(item.path) : null"
      @mouseenter="item.notification_id === 'notice' ? (isDropdownOpen = true) : null"
      @mouseleave="isDropdownOpen = false"
    >
      <AppIcon :name="item.icon" size="24" />
      <!-- 數字紅點 -->
      <template v-if="showBadge(item)">
        <div v-if="typeof item.badge === 'number'" class="badge-number">
          {{ item.badge > 99 ? '99+' : item.badge }}
        </div>

        <!-- 僅紅點 -->
        <div v-else-if="item.badge === true" class="badge-dot"></div
      ></template>
      <!-- 點擊訊息跳出燈箱 -->
      <div class="notice"></div>
      <!-- 個人通知清單 -->
      <Transition name="fade">
        <div
          v-if="item.notification_id === 'notice' && isDropdownOpen"
          class="notification-dropdown"
          @click.stop
        >
          <div class="dropdown-header">通知</div>
          <ul class="dropdown-list">
            <li
              v-for="note in notifications"
              :key="note.notification_id"
              :class="{ 'is-read': note.is_read }"
              @click="markAsRead(note)"
            >
              <div class="note-title">{{ note.title }}</div>
              <div class="note-content">{{ note.content }}</div>
              <div class="note-created_at">{{ formatTime(note.created_at) }}</div>
            </li>
          </ul>
          <div v-if="notifications.length === 0" class="empty-msg">目前沒有新訊息</div>
        </div>
      </Transition>
    </div>
  </div>
</template>
<style lang="scss" scoped>
// 頂部icon
.global-top-bar {
  display: flex;
  margin-bottom: 16px;
  justify-content: end;
  gap: 12px;
  margin-bottom: 20px; //與下方物件的距離
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
  // icon顏色
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
// 個人通知選單樣式
.notification-dropdown {
  position: absolute;
  top: 50px; // 在 icon 下方
  right: 0;
  width: 350px;
  background: $accentLight;
  border-radius: $radius_md;
  box-shadow: $shadowDark;
  // padding: 15px;
  z-index: 100;
  @media (max-width: 765px) {
    width: 250px;
    right: auto;
  }

  .dropdown-header {
    color: $white;
    background-color: $primaryDark;
    font-weight: bold;
    border-bottom: 1px solid #eee;
    padding: 10px;
    // margin-bottom: 8px;
  }

  .dropdown-list {
    list-style: none;
    padding: 0px;
    font-size: 14px;

    li {
      .note-title {
        font-weight: bold;
      }
      .note-content {
        padding: 5px 10px;
      }
      // 未讀訊息樣式
      padding: 5px;
      border-bottom: 1px dashed #333333;
      &:last-child {
        border: none;
      }
      // 點選後的樣式
      &.is-read {
        padding: 5px;
        background-color: $white;
        color: $grayDark;
        cursor: default;
      }
    }
  }
}
.empty-msg {
  padding: 20px;
  text-align: center;
  background-color: $gray;
  color: $grayDark;
}
// 選單動畫
.fade-enter-active,
.fade-leave-active {
  transition:
    opacity 0.3s,
    transform 0.3s;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
  transform: translateY(-10px);
}
</style>
