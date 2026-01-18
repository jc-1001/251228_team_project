<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import axios from 'axios'

const router = useRouter()
const users = ref([])

// 1. 取得使用者資料 (範例使用 fakestoreapi)
onMounted(async () => {
  try {
    const res = await axios.get('https://fakestoreapi.com/users')
    users.value = res.data
  } catch (error) {
    console.error('取得資料失敗:', error)
  }
})

// 2. 點擊導向更新頁面，並帶入使用者 ID
const goToUpdate = (id) => {
  router.push({
    // path: `/updateUserStatus/${id}` // 確保路由設定有接收參數，如 /updateUserStatus/:id
    path: `/updateUserStatus` 
  })
}
</script>

<template>
  <div class="users-page">
    <div class="container">
      <div class="header-section">
        <h2>使用者管理系統</h2>
        <p>點擊下方表格列，即可進入詳細狀態更新頁面</p>
      </div>

      <div class="table-wrapper">
        <table class="user-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>使用者名稱</th>
              <th>電子郵件</th>
              <th>電話號碼</th>
              <th>城市</th>
              <th>操作</th>
            </tr>
          </thead>
          <tbody>
            <tr 
              v-for="user in users" 
              :key="user.id" 
              @click="goToUpdate(user.id)"
              class="clickable-row"
            >
              <td>#{{ user.id }}</td>
              <td class="username">{{ user.username }}</td>
              <td>{{ user.email }}</td>
              <td>{{ user.phone }}</td>
              <td>{{ user.address.city }}</td>
              <td>
                <button class="edit-btn">更新狀態</button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      
      <div v-if="users.length === 0" class="loading">
        載入中...
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.users-page {
  padding: 40px 20px;
  background-color: #f8f9fa;
  min-height: 100vh;
}

.container {
  max-width: 1100px;
  margin: 0 auto;
}

.header-section {
  margin-bottom: 30px;
  h2 { color: #2E6669; margin-bottom: 10px; }
  p { color: #666; font-size: 14px; }
}

.table-wrapper {
  background: white;
  border-radius: 12px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.05);
  overflow: hidden;
}

.user-table {
  width: 100%;
  border-collapse: collapse;
  text-align: left;

  thead {
    background-color: #2E6669;
    color: white;
    tr th { padding: 15px 20px; font-weight: 500; }
  }

  tbody {
    tr {
      border-bottom: 1px solid #eee;
      transition: background 0.2s;
      
      &.clickable-row {
        cursor: pointer;
      }

      &:hover {
        background-color: #f0f7f7;
      }

      td {
        padding: 15px 20px;
        color: #444;
        font-size: 15px;
      }

      .username {
        font-weight: bold;
        color: #2E6669;
      }
    }
  }
}

.edit-btn {
  background: transparent;
  border: 1px solid #2E6669;
  color: #2E6669;
  padding: 6px 15px;
  border-radius: 4px;
  font-size: 13px;
  pointer-events: none; /* 讓點擊事件穿透到 tr */
}

.loading {
  text-align: center;
  padding: 50px;
  color: #999;
}
</style>