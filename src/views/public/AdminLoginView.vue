<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

// 管理員登入資料
const adminForm = ref({
  account: '',
  password: '',
  adminKey: '' // 假設後台有多一層管理員金鑰驗證
})

const handleAdminLogin = () => {
  console.log('管理員驗證中...', adminForm.value)
  // 驗證成功後導向後台主頁
  // router.push('/admin/dashboard')
}
</script>

<template>
  <div class="admin-login-page">
    <div class="login-overlay">
      <div class="login-card">
        <div class="card-header">
          <img src="\src\assets\images\20260118\logo.png" alt="Logo" class="admin-logo">
          <h2>後台登入</h2>
        </div>

        <form @submit.prevent="handleAdminLogin" class="login-form">
          <div class="form-item">
            <label>帳號</label>
            <div class="input-wrapper">
              <input type="text" v-model="adminForm.account" placeholder="輸入管理員帳號" required>
            </div>
          </div>

          <div class="form-item">
            <label>密碼</label>
            <div class="input-wrapper">
              <input type="password" v-model="adminForm.password" placeholder="輸入管理員密碼" required>
            </div>
          </div>

          <button type="submit" class="admin-btn">登入</button>
        </form>
      </div>
    </div>
  
  </div>
</template>

<style lang="scss" scoped>
.admin-login-page {
  height: 100vh;
  width: 100%;
  background-color: #e0f2f1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  position: relative;
  overflow: hidden;
}

.login-card {
  width: 100%;
  max-width: 420px;
  background: rgba(255, 255, 255, 0.98);
  padding: 50px 40px;
  border-radius: 12px;
  box-shadow: 0 15px 50px rgba(0, 0, 0, 0.3);
  z-index: 10;
}

.card-header {
  text-align: center;
  margin-bottom: 40px;

  .admin-logo {
    height: 50px;
    margin-bottom: 15px;
    display: block;
    margin: 12px auto;
  }

  h2 {
    color: #1a3c3e;
    font-size: 24px;
    margin-bottom: 8px;
    letter-spacing: 1px;
  }

  p {
    color: #777;
    font-size: 14px;
  }
}

.form-item {
  margin-bottom: 25px;

  label {
    display: block;
    font-size: 14px;
    font-weight: 600;
    color: #444;
    margin-bottom: 8px;
  }

  .input-wrapper {
    display: flex;
    align-items: center;
    background: #f4f7f7;
    border: 1px solid #ddd;
    border-radius: 6px;
    padding: 0 15px;
    transition: 0.3s;

    &:focus-within {
      border-color: #2E6669;
      background: #fff;
      box-shadow: 0 0 0 3px rgba(46, 102, 105, 0.1);
    }

  
    input {
      flex: 1;
      border: none;
      background: transparent;
      padding: 12px 0;
      outline: none;
      font-size: 16px;
    }
  }
}

.admin-btn {
  width: 100%;
  padding: 15px;
  background: #1a3c3e;
  color: #fff;
  border: none;
  border-radius: 6px;
  font-size: 16px;
  font-weight: bold;
  cursor: pointer;
  transition: 0.3s;
  margin-top: 10px;

  &:hover {
    background: #2E6669;
    letter-spacing: 1px;
  }
}
</style>