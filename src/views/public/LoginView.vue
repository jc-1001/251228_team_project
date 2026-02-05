<script setup>
// --- 1. Import 區塊必須在最上方 ---
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { publicApi } from '@/utils/publicApi';

// --- 2. ER-Model定義變數 ---
const router = useRouter();
const email = ref('');      // 對應 member_core.email
const password = ref('');   // 對應 member_core.password
const rememberMe = ref(false);

// --- 3. 登入邏輯 (連動資料庫) ---
const handleLogin = async () => {
    try {
        const response = await publicApi.post('member/login_api.php', {
            email: email.value,      // 對應 ER-Model
            password: password.value
        });

        console.log("收到回傳：", response.data);

        if (response.data.status === 'success') { // 與 PHP 對齊
            const user = response.data.user;
            localStorage.setItem('userProfile', JSON.stringify(user));
            localStorage.setItem('isUserLogin', 'true');
            alert('登入成功！');
            router.push({ name: 'Home' }); 
        } else {
            // 使用防呆邏輯，若沒抓到 message 就顯示預設文字
            alert('登入失敗：' + (response.data.message || '帳號密碼錯誤'));
        }
    } catch (error) {
        alert('伺服器連線失敗');
    }
};
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
              <label>電子信箱</label>
              <input type="email" v-model="email" placeholder="Group1@unicare.com" required />
            </div>

            <div class="input-group">
              <label>密碼</label>
              <input type="password" v-model="password" placeholder="123456" required />
            </div>

            <div class="form-footer">
              <label class="checkbox-label">
                <input type="checkbox" v-model="rememberMe"> 記住我
              </label>
              <router-link to="/forgot-password" class="link">忘記密碼？</router-link>
            </div>

            <button type="submit" class="btn-login">登入</button>
          </form>

          <div class="register-way">或是用其他方式</div>
          <div class="register-icon">
            <img src="/src/assets/images/google.svg" alt="Google">
            <img src="/src/assets/images/fb.svg" alt="fb">
          </div>
          <div class="register-hint">
            還不是會員? <router-link to="/Register" class="link">註冊</router-link>
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
.login-visual {
  flex: 1.2;
  background-color: #e0f2f1;
  padding: 60px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  .brand-info .logo { height: 45px; }
  .illustration { width: 100%; max-height: 350px; object-fit: contain; }
}
.login-form-container {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 60px;
  .form-box { width: 100%; max-width: 360px; h2 { font-size: 28px; margin-bottom: 10px; } }
}
.input-group {
  margin-bottom: 24px;
  label { display: block; margin-bottom: 8px; font-weight: bold; color: #555;}
  input { width: 100%; padding: 14px; border: 1px solid #e0e0e0; border-radius: 12px; }
}
.form-footer {
  display: flex;
  justify-content: space-between;
  margin-bottom: 30px;
  .checkbox-label { cursor: pointer; display: flex; align-items: center; gap: 8px; }
}
.btn-login {
  width: 100%; padding: 16px; background-color: #2E6669; color: white; border-radius: 12px; border: none; font-weight: bold; cursor: pointer;
}
.register-icon { display: flex; justify-content: center; gap: 30px; margin-top: 15px; }
.register-hint, .register-way { text-align: center; margin-top: 20px; font-size: 14px; }
.link { color: #2E6669; text-decoration: none; }
</style>