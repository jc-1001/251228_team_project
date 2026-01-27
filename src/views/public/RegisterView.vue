<script setup>
import { reactive } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();

// 1. 根據 ER_MODEL 定義響應式資料欄位
const memberProfile = reactive({
  full_name: '',                 // 姓名
  email: '',                     // 電子信箱 (唯一識別)
  password: '',                  // 密碼
  confirmPassword: '',           // 確認密碼
  phone_number: '',              // 電話
  gender: 'F',                   // 性別 (M/F/O)
  birth_date: '',                // 生日
  blood_type: 'A',               // 血型
  height: null,                  // 身高
  weight: null,                  // 體重
  chronic_disease_description: '', // 慢性病說明
  family_history: '',            // 家族病史
  allergy_history: '',           // 過敏病史
  is_smoking: false,             // 抽菸習慣
  is_drinking: false,            // 飲酒習慣
  emergency_contact_name: '',    // 緊急聯絡人
  emergency_contact_relationship: '', // 關係
  emergency_contact_phone: '',   // 緊急聯絡人電話
});

// 2. 註冊與自動編號邏輯
const handleRegister = () => {
  // 基礎驗證
  if (memberProfile.password !== memberProfile.confirmPassword) {
    alert('密碼與確認密碼不符！');
    return;
  }

  // A. 取得目前所有使用者陣列
  const allUsers = JSON.parse(localStorage.getItem('allUsers') || '[]');

  // B. 檢查 Email 是否重複
  if (allUsers.find(u => u.email === memberProfile.email)) {
    alert('此 Email 已被註冊，請換一個或直接登入。');
    return;
  }

  // C. 自動產生累加的會員編號 (M00001 格式)
  const generateMemberId = () => {
    if (allUsers.length === 0) return 'M00001';
    
    // 找出最後一筆資料的 ID 數字部分並加 1
    const lastId = allUsers[allUsers.length - 1].member_id || 'M00000';
    const nextNum = parseInt(lastId.replace('M', '')) + 1;
    return `M${nextNum.toString().padStart(5, '0')}`;
  };

  const newMemberId = generateMemberId();

  // D. 準備最終儲存物件
  const newUser = {
    ...memberProfile,
    member_id: newMemberId, // 會員流水號
    id: Date.now(),         // 系統唯一識別 ID (用於路由)
    created_at: new Date().toLocaleString()
  };

  // E. 寫入 LocalStorage
  allUsers.push(newUser);
  localStorage.setItem('allUsers', JSON.stringify(allUsers));
  
  // F. 同步至「當前登入者」，讓個人檔案頁 (ProfileEdit) 能立刻抓到
  localStorage.setItem('userProfile', JSON.stringify(newUser));

  alert(`註冊成功！您的會員編號為：${newMemberId}`);

  // G. 跳轉到首頁 (路徑請確保與 router/index.js 一致)
  router.push('/home');
};
</script>

<template>
  <div class="register-page">
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
                <label>電子信箱</label>
                <input type="email" v-model="memberProfile.email" placeholder="example@mail.com" required>
              </div>
              <div class="form-group">
                <label>設定密碼</label>
                <input type="password" v-model="memberProfile.password" required>
              </div>
              <div class="form-group">
                <label>確認密碼</label>
                <input type="password" v-model="memberProfile.confirmPassword" required>
              </div>
              <div class="form-group">
                <label>手機電話</label>
                <input type="text" v-model="memberProfile.phone_number" placeholder="09xx-xxx-xxx">
              </div>
              <div class="form-group">
                <label>出生日期</label>
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
                <input type="text" v-model="memberProfile.chronic_disease_description" placeholder="無則填寫「無」">
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

.register-page {
  background-color: #F6F7F9;
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
  label { margin-bottom: 8px; font-weight: 500; }
  input, select {
    padding: 12px;
    border: 1px solid #ddd;
    border-radius: 8px;
    &:focus { border-color: $primary-teal; outline: none; }
  }
  &.full-width { grid-column: span 2; }
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
    &:hover { background: darken($primary-teal, 5%); transform: translateY(-2px); transition: 0.3s; }
  }
}

@media (max-width: 480px) {
  .input-grid { grid-template-columns: 1fr; }
  .profile-card { padding: 25px 15px; }
  .action-bar .btn-save { width: 100%; }
}
</style>