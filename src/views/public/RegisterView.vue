<script setup>
import { reactive } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();
const memberProfile = reactive({
  full_name: '',                 // 姓名
  email: '',                     // 帳號
  password: '',                  // 密碼
  confirmPassword: '',           // 前端確認用
  phone_number: '',              // 電話
  gender: 'F',                   // 性別
  birth_date: '',                // 生日
  blood_type: 'A',               // 血型
  height: null,                  // 身高
  weight: null,                  // 體重
  chronic_disease_description: '', // 慢性病說明
  family_history: '',            // 家族病史
  allergy_history: '',           // 過敏病史
  is_smoking: false,             // 抽菸習慣
  is_drinking: false,            // 飲酒習慣
  emergency_contact_name: '',    // 緊急聯絡人姓名
  emergency_contact_relationship: '', // 關係
  emergency_contact_phone: '',   // 緊急聯絡人電話
});

const handleRegister = () => {
  // 1. 取得目前所有使用者，若無則建立空陣列
  const allUsers = JSON.parse(localStorage.getItem('allUsers') || '[]');

  // 2. 檢查是否已註冊過
  if (allUsers.find(u => u.email === memberProfile.email)) {
    alert('此 Email 已被註冊！');
    return;
  }

  // 3. 加入新使用者並存回 LocalStorage
  allUsers.push({ ...memberProfile, id: Date.now() }); // 給一個唯一 ID
  localStorage.setItem('allUsers', JSON.stringify(allUsers));
  
  // 4. 同步更新「當前登入者」供 ProfileEdit 使用
  localStorage.setItem('userProfile', JSON.stringify(memberProfile));

  alert('註冊成功！');
  router.push('/home');
};
</script>

<template>
  <div class="profile-page">
    <div class="content-wrapper">
      <main class="profile-card">
        <h1 class="section-title">會員註冊系統</h1>
        
        <form @submit.prevent="handleRegister">
          <section class="form-section">
            <h3 class="subsection-title">帳號與基本資訊</h3>
            <div class="input-grid">
              <div class="form-group">
                <label>姓名</label>
                <input type="text" v-model="memberProfile.full_name" placeholder="請輸入全名" required>
              </div>
              <div class="form-group">
                <label>電子信箱 (Email)</label>
                <input type="email" v-model="memberProfile.email" placeholder="example@mail.com" required>
              </div>
              <div class="form-group">
                <label>密碼</label>
                <input type="password" v-model="memberProfile.password" placeholder="設定您的密碼" required>
              </div>
              <div class="form-group">
                <label>確認密碼</label>
                <input type="password" v-model="memberProfile.confirmPassword" placeholder="再次輸入密碼" required>
              </div>
              <div class="form-group">
                <label>電話</label>
                <input type="text" v-model="memberProfile.phone_number" placeholder="09xx-xxx-xxx">
              </div>
              <div class="form-group">
                <label>生日</label>
                <input type="date" v-model="memberProfile.birth_date">
              </div>
            </div>
          </section>

          <hr class="divider">

          <section class="form-section">
            <h3 class="subsection-title">身體健康檔案</h3>
            <div class="input-grid">
              <div class="form-group">
                <label>血型</label>
                <select v-model="memberProfile.blood_type">
                  <option value="A">A型</option>
                  <option value="B">B型</option>
                  <option value="O">O型</option>
                  <option value="AB">AB型</option>
                </select>
              </div>
              <div class="form-group">
                <label>身高 (cm)</label>
                <input type="number" v-model="memberProfile.height">
              </div>
              <div class="form-group">
                <label>體重 (kg)</label>
                <input type="number" v-model="memberProfile.weight">
              </div>
              <div class="form-group full-width">
                <label>慢性病說明</label>
                <input type="text" v-model="memberProfile.chronic_disease_description" placeholder="請填寫慢性病，無則填無">
              </div>
              <div class="form-group full-width">
                <label>家族病史</label>
                <input type="text" v-model="memberProfile.family_history" placeholder="例如：糖尿病、心臟病史">
              </div>
              <div class="form-group full-width">
                <label>過敏病史</label>
                <input type="text" v-model="memberProfile.allergy_history" placeholder="例如：藥物過敏、海鮮過敏">
              </div>
              <div class="form-group">
                <label>抽菸習慣</label>
                <div class="radio-group">
                  <label><input type="radio" :value="true" v-model="memberProfile.is_smoking"> 有</label>
                  <label><input type="radio" :value="false" v-model="memberProfile.is_smoking"> 無</label>
                </div>
              </div>
              <div class="form-group">
                <label>飲酒習慣</label>
                <div class="radio-group">
                  <label><input type="radio" :value="true" v-model="memberProfile.is_drinking"> 有</label>
                  <label><input type="radio" :value="false" v-model="memberProfile.is_drinking"> 無</label>
                </div>
              </div>
            </div>
          </section>

          <hr class="divider">

          <section class="form-section">
            <h3 class="subsection-title">緊急聯絡資訊</h3>
            <div class="input-grid">
              <div class="form-group">
                <label>緊急聯絡人姓名</label>
                <input type="text" v-model="memberProfile.emergency_contact_name">
              </div>
              <div class="form-group">
                <label>關係</label>
                <input type="text" v-model="memberProfile.emergency_contact_relationship">
              </div>
              <div class="form-group">
                <label>緊急聯絡人電話</label>
                <input type="text" v-model="memberProfile.emergency_contact_phone">
              </div>
            </div>
          </section>

          <div class="action-bar">
            <button type="submit" class="btn-save">確認註冊</button>
          </div>
        </form>
      </main>
    </div>
  </div>
</template>

<style lang="scss" scoped>
$primary-teal: #2E6669;
$bg-light: #F6F7F9;

.profile-page {
  background-color: $bg-light;
  padding: 40px 10%;
  min-height: 100vh;
}

.profile-card {
  background: #fff;
  border-radius: 12px;
  padding: 40px;
  box-shadow: 0 4px 20px rgba(0,0,0,0.08);

  .section-title {
    color: $primary-teal;
    margin-bottom: 30px;
    font-size: 28px;
    text-align: center;
  }
}

.subsection-title {
  font-size: 18px;
  margin-bottom: 20px;
  color: #444;
  border-left: 4px solid $primary-teal;
  padding-left: 10px;
}

.input-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 20px 40px;
}

.form-group {
  display: flex;
  flex-direction: column;
  label { margin-bottom: 8px; font-weight: 500; color: #555; }
  input, select {
    padding: 12px;
    border: 1px solid #ddd;
    border-radius: 8px;
    font-size: 15px;
    &:focus { border-color: $primary-teal; outline: none; }
  }
  &.full-width { grid-column: span 2; }
}

.radio-group {
  display: flex;
  gap: 25px;
  padding: 10px 0;
  label { display: flex; align-items: center; cursor: pointer; input { margin-right: 8px; } }
}

.divider { margin: 40px 0; border: 0; border-top: 1px solid #eee; }

.action-bar {
  display: flex;
  justify-content: center;
  margin-top: 40px;
  .btn-save {
    background-color: $primary-teal;
    color: white;
    padding: 14px 80px;
    border: none;
    border-radius: 30px;
    font-size: 18px;
    font-weight: bold;
    cursor: pointer;
  }
}

@media (max-width: 768px) {
  .input-grid { grid-template-columns: 1fr; }
  .form-group.full-width { grid-column: span 1; }
}

@media (max-width: 480px) {
  .profile-card { padding: 25px 15px; }
  .action-bar .btn-save { width: 100%; }
}
</style>