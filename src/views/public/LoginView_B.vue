<script setup>
import { ref } from 'vue';

const username = ref('');
const password = ref('');

const handleLogin = () => {
  console.log('嘗試登入:', username.value);
  // 在此處理登入邏輯
};
</script>

<template>
  <div class="login-container">
    <div class="login-card">
      <div class="logo-section">
        <!-- <img src="" alt="UniCare Logo" class="logo-img" /> -->
        <h1 class="brand-name">UniCare</h1>
      </div>

      <h2 class="title">後台登入</h2>

      <form @submit.prevent="handleLogin" class="login-form">
        <div class="input-group">
          <i class="icon-user"></i>
          <input 
            type="text" 
            v-model="username" 
            placeholder="輸入管理員帳號" 
            required 
          />
        </div>

        <div class="input-group">
          <i class="icon-lock"></i>
          <input 
            type="password" 
            v-model="password" 
            placeholder="輸入管理員密碼" 
            required 
          />
        </div>

        <button type="submit" class="login-btn">登入</button>
      </form>
    </div>
  </div>
</template>

<style lang="scss" scoped>
// 定義顏色變數
$bg-color: #e0f2f1;      // 背景淺綠色
$primary-teal: #336766;  // 按鈕與Logo深青色
$text-gray: #8e8e8e;     // 佔位符文字顏色
$border-color: #cccccc;  // 輸入框邊框顏色
$white: #ffffff;

.login-container {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background-color: $bg-color;
  font-family: "PingFang TC", "Microsoft JhengHei", sans-serif;
}

.login-card {
  background-color: $white;
  padding: 50px 60px;
  border-radius: 12px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.05);
  width: 100%;
  max-width: 450px;
  text-align: center;

  .logo-section {
    display: flex;
    justify-content: center;
    align-items: center;
    margin-bottom: 20px;

    .logo-img {
      height: 40px;
      margin-right: 10px;
    }

    .brand-name {
      font-size: 32px;
      font-weight: bold;
      color: $primary-teal;
      margin: 0;
    }
  }

  .title {
    font-size: 18px;
    color: #333;
    margin-bottom: 30px;
    letter-spacing: 2px;
  }
}

.login-form {
  .input-group {
    position: relative;
    margin-bottom: 20px;

    // 圖標（建議使用 FontAwesome 或 SVG）
    &::before {
      content: ''; 
      position: absolute;
      left: 15px;
      top: 50%;
      transform: translateY(-50%);
      width: 20px;
      height: 20px;
      background-size: contain;
      background-repeat: no-repeat;
      opacity: 0.5;
    }

    input {
      width: 100%;
      padding: 12px 15px 12px 45px; // 留空間給圖標
      border: 1.5px solid $border-color;
      border-radius: 8px;
      font-size: 16px;
      transition: border-color 0.3s;
      box-sizing: border-box;

      &::placeholder {
        color: $text-gray;
      }

      &:focus {
        outline: none;
        border-color: $primary-teal;
      }
    }
  }

  .login-btn {
    width: 100%;
    padding: 14px;
    background-color: $primary-teal;
    color: $white;
    border: none;
    border-radius: 8px;
    font-size: 18px;
    font-weight: 500;
    cursor: pointer;
    transition: background-color 0.3s, transform 0.1s;
    margin-top: 10px;

    &:hover {
      background-color: darken($primary-teal, 5%);
    }

    &:active {
      transform: scale(0.98);
    }
  }
}
</style>