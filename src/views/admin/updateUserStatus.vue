<script setup>
import { ref, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import axios from 'axios'

const route = useRoute()
const router = useRouter()
const userId = route.params.id // 從網址取得 ID

// 使用者狀態資料
const userStatus = ref({
  username: '',
  email: '',
  status: 'active', // 預設狀態
  role: 'user',
  lastLogin: '2024-01-18'
})

// 1. 取得該名使用者的原始資料
onMounted(async () => {
  try {
    // 這裡使用您 API 的路徑，範例使用 fakestoreapi
    const res = await axios.get(`https://fakestoreapi.com/users/${userId}`)
    userStatus.value.username = res.data.username
    userStatus.value.email = res.data.email
  } catch (error) {
    console.error('取得使用者資料失敗:', error)
  }
})

// 2. 儲存更新後的狀態
const updateStatus = async () => {
  try {
    // 模擬 API 傳送
    console.log('更新資料:', userStatus.value)
    alert(`使用者 ${userStatus.value.username} 狀態已更新為：${userStatus.value.status}`)
    router.push('/users') // 更新完回到清單頁
  } catch (error) {
    alert('更新失敗')
  }
}

// 返回上一頁
const goBack = () => {
  router.back()
}
</script>

<template>
  <div class="update-status-page">
    <div class="card">
      <div class="card-header">
        <button class="back-btn" @click="goBack">← 返回清單</button>
        <h2>使用者詳細資料</h2> <!-- (ID: #{{ userId }}) -->
      </div>

      <form @submit.prevent="updateStatus" class="status-form">
        <div class="info-group">
          <div class="info-item">
            <label>使用者名稱</label>
            <p>{{ userStatus.username }}</p>
          </div>
          <div class="info-item">
            <label>電子郵件</label>
            <p>{{ userStatus.email }}</p>
          </div>
          <div class="info-item">
            <label>帳號建立時間</label>
            <p>{{ userStatus.enroll }}</p>
          </div>
          <div class="info-item">
            <label>已註冊時間</label>
            <p>{{  }}</p>
          </div>
        </div>

        <hr />

        <div class="edit-group">
          <div class="form-item">
            <label for="status">帳號狀態設定</label>
            <select id="status" v-model="userStatus.status" class="status-select">
              <option value="active">正常 (Active)</option>
              <option value="suspended">停權 (Suspended)</option>
              <option value="pending">審核中 (Pending)</option>
            </select>
          </div>

          <div class="form-item">
            <label for="role">權限角色</label>
            <select id="role" v-model="userStatus.role" class="status-select">
              <option value="user">一般使用者</option>
              <option value="admin">管理員</option>
              <option value="editor">編輯者</option>
            </select>
          </div>
        </div>

        <div class="form-actions">
          <button type="submit" class="save-btn">儲存變更</button>
          <button type="button" class="cancel-btn" @click="goBack">取消</button>
        </div>
      </form>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.update-status-page {
  padding: 60px 20px;
  background-color: #f0f4f4;
  min-height: 100vh;
  display: flex;
  justify-content: center;
}

.card {
  background: white;
  width: 100%;
  max-width: 600px;
  border-radius: 16px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.08);
  overflow: hidden;
}

.card-header {
  background-color: #2e6669;
  padding: 30px;
  color: white;
  position: relative;

  .back-btn {
    background: rgba(255, 255, 255, 0.2);
    border: none;
    color: white;
    padding: 5px 12px;
    border-radius: 4px;
    cursor: pointer;
    margin-bottom: 10px;
    font-size: 13px;
    &:hover { background: rgba(255, 255, 255, 0.3); }
  }

  h2 { margin: 0; font-size: 22px; color: white; }
}

.status-form {
  padding: 40px;

  .info-group {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 20px;
    margin-bottom: 25px;

    label { font-size: 13px; color: #888; display: block; margin-bottom: 5px; }
    p { font-weight: bold; color: #333; margin: 0; font-size: 16px; }
  }

  hr { border: 0; border-top: 1px solid #eee; margin: 25px 0; }

  .edit-group {
    .form-item {
      margin-bottom: 25px;
      label { display: block; font-weight: bold; color: #2e6669; margin-bottom: 10px; }
    }
  }

  .status-select {
    width: 100%;
    padding: 12px;
    border: 1px solid #ddd;
    border-radius: 8px;
    font-size: 15px;
    outline: none;
    &:focus { border-color: #2e6669; }
  }

  .form-actions {
    display: flex;
    gap: 15px;
    margin-top: 40px;

    button {
      flex: 1;
      padding: 12px;
      border-radius: 8px;
      font-weight: bold;
      cursor: pointer;
      transition: 0.3s;
    }

    .save-btn {
      background-color: #2e6669;
      color: white;
      border: none;
      &:hover { background-color: #3d868a; }
    }

    .cancel-btn {
      background-color: white;
      border: 1px solid #ddd;
      color: #666;
      &:hover { background-color: #f9f9f9; }
    }
  }
}
</style>