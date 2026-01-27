<script setup>
import { reactive } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();

// 嚴格對應 ER MODEL 欄位名稱
const memberProfile = reactive({
  // 會員核心資料 (Members 表)
  full_name: '',
  email: '',
  password: '',
  confirmPassword: '',
  phone_number: '',
  gender: 'M',
  birth_date: '',
  role: 'member',
  account_status: 1,
  
  // 健康檔案資料 (Members 表)
  height: null,
  weight: null,
  blood_type: 'A',
  // 慢性病
  has_chronic_disease: false, 
  chronic_disease_description: '',
  // 家族病史
  has_family_history: false,
  family_history_description: '',
  // 過敏史
  has_allergies: false,
  allergy_description: '',
  // 生活習慣
  is_smoking: false,
  is_drinking: false,
  
  // 緊急聯絡人資料 (Emergency_Contacts 表)
  contact_name: '',
  relationship: '',
  emergency_phone_number: '' // 避免與會員電話衝突
});

const handleRegister = () => {
  if (memberProfile.password !== memberProfile.confirmPassword) {
    alert('密碼與確認密碼不符！');
    return;
  }

  const allUsers = JSON.parse(localStorage.getItem('allUsers') || '[]');
  if (allUsers.find(u => u.email === memberProfile.email)) {
    alert('此 Email 已被註冊！');
    return;
  }

  const newUser = {
    ...memberProfile,
    member_id: `M${String(allUsers.length + 1).padStart(5, '0')}`,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  };

  allUsers.push(newUser);
  localStorage.setItem('allUsers', JSON.stringify(allUsers));
  alert('註冊成功！');
  router.push('/login');
};
</script>

<template>
  <div class="auth-container">
    <div class="auth-card">
      <h2 class="title">會員註冊</h2>
      <form @submit.prevent="handleRegister">
        
        <h3 class="section-title">基本資訊</h3>
        <div class="input-grid">
          <div class="form-group">
            <label>姓名</label>
            <input v-model="memberProfile.full_name" placeholder="請輸入全名" required>
          </div>
          <div class="form-group">
            <label>性別</label>
            <select v-model="memberProfile.gender">
              <option value="M">男 (M)</option>
              <option value="F">女 (F)</option>
              <option value="O">其他 (O)</option>
            </select>
          </div>
          <div class="form-group">
            <label>電子信箱</label>
            <input type="email" v-model="memberProfile.email" placeholder="example@mail.com" required>
          </div>
          <div class="form-group">
            <label>聯絡電話</label>
            <input v-model="memberProfile.phone_number" placeholder="09xxxxxxxx">
          </div>
          <div class="form-group">
            <label>密碼</label>
            <input type="password" v-model="memberProfile.password" required>
          </div>
          <div class="form-group">
            <label>確認密碼</label>
            <input type="password" v-model="memberProfile.confirmPassword" required>
          </div>
          <div class="form-group">
            <label>生日</label>
            <input type="date" v-model="memberProfile.birth_date">
          </div>
          <div class="form-group">
            <label>血型</label>
            <select v-model="memberProfile.blood_type">
              <option value="A">A 型</option>
              <option value="B">B 型</option>
              <option value="AB">AB 型</option>
              <option value="O">O 型</option>
            </select>
          </div>
        </div>

        <h3 class="section-title">健康檔案與習慣</h3>
        <div class="input-grid">
          <div class="form-group">
            <label>身高 (cm)</label>
            <input type="number" step="0.1" v-model="memberProfile.height">
          </div>
          <div class="form-group">
            <label>體重 (kg)</label>
            <input type="number" step="0.1" v-model="memberProfile.weight">
          </div>
          
          <div class="form-group full-width">
            <label>相關病史</label>
            <div class="inline-row">
              <div class="radio-group">
                <label><input type="radio" :value="true" v-model="memberProfile.has_chronic_disease"> 有</label>
                <label><input type="radio" :value="false" v-model="memberProfile.has_chronic_disease"> 無</label>
              </div>
              <input class="history-input" v-model="memberProfile.chronic_disease_description" placeholder="輸入描述">
            </div>
          </div>

          <div class="form-group full-width">
            <label>家族病史</label>
            <div class="inline-row">
              <div class="radio-group">
                <label><input type="radio" :value="true" v-model="memberProfile.has_family_history"> 有</label>
                <label><input type="radio" :value="false" v-model="memberProfile.has_family_history"> 無</label>
              </div>
              <input class="history-input" v-model="memberProfile.family_history_description" placeholder="輸入描述">
            </div>
          </div>

          <div class="form-group full-width">
            <label>藥物/食物過敏</label>
            <div class="inline-row">
              <div class="radio-group">
                <label><input type="radio" :value="true" v-model="memberProfile.has_allergies"> 有</label>
                <label><input type="radio" :value="false" v-model="memberProfile.has_allergies"> 無</label>
              </div>
              <input class="history-input" v-model="memberProfile.allergy_description" placeholder="輸入描述">
            </div>
          </div>

          <div class="form-group">
            <label>有無抽菸</label>
            <div class="radio-group">
              <label><input type="radio" :value="true" v-model="memberProfile.is_smoking"> 有</label>
              <label><input type="radio" :value="false" v-model="memberProfile.is_smoking"> 無</label>
            </div>
          </div>
          <div class="form-group">
            <label>有無飲酒</label>
            <div class="radio-group">
              <label><input type="radio" :value="true" v-model="memberProfile.is_drinking"> 有</label>
              <label><input type="radio" :value="false" v-model="memberProfile.is_drinking"> 無</label>
            </div>
          </div>
        </div>

        <h3 class="section-title">緊急聯絡人</h3>
        <div class="input-grid">
          <div class="form-group">
            <label>聯絡人姓名</label>
            <input v-model="memberProfile.contact_name">
          </div>
          <div class="form-group">
            <label>關係</label>
            <input v-model="memberProfile.relationship" placeholder="例如：父子">
          </div>
          <div class="form-group full-width">
            <label>聯絡人電話</label>
            <input v-model="memberProfile.emergency_phone_number" placeholder="09xxxxxxxx">
          </div>
        </div>
        <br>
          <input type="checkbox"><span> 我已閱讀並同意UniCare服務條款與隱私權政策</span>
        
          <button type="submit" class="primary-btn">註冊</button>
      </form>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.auth-container {
  display: flex;
  justify-content: center;
  padding: 40px 10px;
  background: #f6f7f9;
  min-height: 100vh;
}

.auth-card {
  background: white;
  padding: 30px;
  border-radius: 12px;
  width: 100%;
  max-width: 700px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
}

.title {
  color: #2E6669;
  text-align: center;
  margin-bottom: 25px;
}

.section-title {
  font-size: 1.1rem;
  color: #2E6669;
  border-bottom: 2px solid #e2e8f0;
  padding-bottom: 8px;
  margin: 25px 0 15px;
}

.input-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 15px 20px;
}

.form-group {
  display: flex;
  flex-direction: column;
  label {
    margin-bottom: 6px;
    font-size: 0.9rem;
    color: #4a5568;
    font-weight: 500;
  }
  input, select {
    padding: 10px;
    border: 1px solid #cbd5e0;
    border-radius: 6px;
    font-size: 0.95rem;
    &:focus { outline: none; border-color: #2E6669; }
  }
}

.full-width { grid-column: span 2; }

.inline-row {
  display: flex;
  align-items: center;
  gap: 15px;
  .radio-group { display: flex; gap: 10px; white-space: nowrap; }
  .history-input { flex: 1; }
}

.radio-group {
  display: flex;
  gap: 20px;
  padding: 8px 0;
  label {
    display: flex;
    align-items: center;
    gap: 5px;
    cursor: pointer;
    font-weight: normal;
  }
}

.primary-btn {
  width: 100%;
  padding: 14px;
  background: #2E6669;
  color: white;
  border: none;
  border-radius: 8px;
  font-size: 1.1rem;
  font-weight: bold;
  cursor: pointer;
  margin-top: 35px;
  &:hover { background: #245254; }
}

/* 響應式設計 */
@media (max-width: 600px) {
  .input-grid { grid-template-columns: 1fr; }
  .full-width { grid-column: span 1; }
  .inline-row { flex-direction: column; align-items: flex-start; gap: 8px; .history-input { width: 100%; } }
}

/* 針對寬度 360px 以下的優化 */
@media (max-width: 360px) {
  .auth-card { padding: 15px; }
  .title { font-size: 1.4rem; }
  .section-title { font-size: 1rem; }
  .form-group label { font-size: 0.85rem; }
  .primary-btn { font-size: 1rem; padding: 12px; }
  .radio-group { gap: 15px; }
}
</style>