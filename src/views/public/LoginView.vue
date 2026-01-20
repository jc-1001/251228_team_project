<script setup>
import { ref } from 'vue'

// 定義登入表單資料
const email = ref('')
const password = ref('')
const rememberMe = ref(false)

const handleLogin = () => {
  console.log('登入資訊：', { email: email.value, password: password.value })
  // 這裡之後可以加入 API 串接邏輯
}
</script>

<template>
  <div class="login-page">
    <div class="login-wrapper">
      <div class="login-visual">
        <div class="brand-info">
          <img src="@/assets/images/common/logo.svg" class="logo">
        </div>
        <img src="/src/assets/images/Login.svg" alt="Login" class="illustration">
      </div>

      <div class="login-form-container">
        <div class="form-box">
          <h2>會員登入</h2>

          <form @submit.prevent="handleLogin">
            <div class="input-group">
              <label>帳號</label>
              <input type="email" v-model="email" required>
            </div>

            <div class="input-group">
              <label>密碼</label>
              <input type="password" v-model="password" required>
            </div>

            <div class="form-footer">
              <label class="checkbox-label">
                <input type="checkbox" v-model="rememberMe"> 記住我
              </label>
              <router-link to="/forgot-password" class="link">忘記密碼？</router-link>
            </div>

            <button type="submit" class="btn-login">登入</button>
          </form>

          <div class="register-way">
            或是用其他方式
          </div>
          <div class="register-icon">
            <img src="\src\assets\images\google.svg" alt="Google">
            <img src="\src\assets\images\fb.svg" alt="fb">
          </div>
          <div class="register-hint">
            還不是會員? <router-link to="/register" class="link">註冊</router-link>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.login-page {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #f6f7f9;
}

.login-wrapper {
  display: flex;
  width: 100%;
  max-width: 1100px;
  height: 650px;
  background: white;
  border-radius: 24px;
  overflow: hidden;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.08);
}

/* 左側視覺區 */
.login-visual {
  flex: 1.2;
  background-color: #e0f2f1;
  padding: 60px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;

  .brand-info {
    .logo { height: 45px; margin-bottom: 20px; }
  }

  .illustration {
    width: 100%;
    max-height: 350px;
    object-fit: contain;
  }
}

/* 右側表單區 */
.login-form-container {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 60px;
  font-weight: bold;
  
  .form-box {
    width: 100%;
    max-width: 360px;

    h2 { font-size: 28px; margin-bottom: 10px; color: #333; }
  }
}

.input-group {
  margin-bottom: 24px;
  label { display: block; margin-bottom: 8px; font-weight: 500; color: #555; font-weight: bold;}
  input {
    width: 100%;
    padding: 14px;
    border: 1px solid #e0e0e0;
    border-radius: 12px;
    outline: none;
    transition: 0.3s;
    &:focus { border-color: #2E6669; box-shadow: 0 0 0 3px rgba(46, 102, 105, 0.1); }
  }
}

.form-footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 30px;
  font-size: 14px;
  .checkbox-label { display: flex; align-items: center; gap: 8px; color: #666; cursor: pointer; }
}

.btn-login {
  width: 100%;
  padding: 16px;
  background-color: #2E6669;
  color: white;
  border: none;
  border-radius: 12px;
  font-size: 16px;
  font-weight: bold;
  cursor: pointer;
  transition: 0.3s;
  &:hover { background-color: #3d868a; transform: translateY(-2px); }
}

.link { color: #2E6669; text-decoration: none; font-weight: 500; &:hover { text-decoration: underline; } }

.register-hint , .register-way { text-align: center; margin-top: 30px; font-size: 14px; color: #777; }

.register-icon { 
  display: grid; 
  justify-self: center;
  gap: 30px;
  margin-top: 15px;
  // border: 1px solid #666;
  grid-template-columns: repeat(2, 1fr);
  grid-template-rows: 100%;
}

/* 響應式：手機版改為上下堆疊 */
@media (max-width: 900px) {
  .login-wrapper { flex-direction: column; height: auto; margin: 20px; }
  .login-visual { padding: 40px; .illustration { display: none; } }
}
</style>