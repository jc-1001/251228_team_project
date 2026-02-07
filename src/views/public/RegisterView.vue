
<script setup>
import { reactive, ref } from 'vue';
import { useRouter } from 'vue-router';
import { publicApi } from '@/utils/publicApi';

const router = useRouter();

// 1. 對應資料結構，reactive 物件在 script 存取不需加 .value
const memberProfile = reactive({
  full_name: '',
  email: '',
  password: '',
  confirmPassword: '',
  phone_number: '',
  gender: 'M',
  birth_date: '',
  role: 'member',
  account_status: 1,
  
  height: null,
  weight: null,
  blood_type: 'A',
  has_chronic_disease: false, 
  chronic_disease_description: '',
  has_family_history: false,
  family_history_description: '',
  has_allergies: false,
  allergy_description: '',
  is_smoking: false,
  is_drinking: false,
  
  contact_name: '',
  relationship: '',
  emergency_phone_number: ''
});

// 2. 註冊處理邏輯

// 建立錯誤訊息物件
const errors = reactive({
  full_name: '',
  email: '',
  phone_number: '',
  contact_name: '',
  emergency_phone_number: ''
});

const agreePolicy = ref(false);

const handleRegister = async () => {
  // 錯誤訊息
  Object.keys(errors).forEach(key => errors[key] = '');

  let isValid = true;

  // 1. 驗證姓名
  if (!memberProfile.full_name.trim()) {
    errors.full_name = '請填寫真實姓名';
    isValid = false;
  }

  // 2. 驗證電子信箱 (正規表示式檢查)
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!memberProfile.email) {
    errors.email = '請填寫電子信箱';
    isValid = false;
  } else if (!emailRegex.test(memberProfile.email)) {
    errors.email = '信箱格式不正確';
    isValid = false;
  }

  // 3. 驗證聯絡電話 (至少8-10位數字)
  const phoneRegex = /^09\d{8}$/; // 假設為台灣手機格式
  if (!memberProfile.phone_number) {
    errors.phone_number = '請填寫聯絡電話';
    isValid = false;
  } else if (!phoneRegex.test(memberProfile.phone_number)) {
    errors.phone_number = '手機格式需為 09 開頭的 10 位數字';
    isValid = false;
  }

  // 4. 驗證聯絡人姓名
  if (!memberProfile.contact_name.trim()) {
    errors.contact_name = '請填寫緊急聯絡人姓名';
    isValid = false;
  }

  // 5. 驗證聯絡人電話
  if (!memberProfile.emergency_phone_number) {
    errors.emergency_phone_number = '請填寫緊急聯絡人電話';
    isValid = false;
  } else if (!phoneRegex.test(memberProfile.emergency_phone_number)) {
    errors.emergency_phone_number = '電話格式不正確';
    isValid = false;
  }

  if (!isValid) return; // 如果驗證不通過，停止執行註冊

  if (!agreePolicy.value) {
    alert('請先閱讀並勾選同意服務條款與隱私權政策');
    return;
  }
 

  // 2. 密碼確認
  if (memberProfile.password !== memberProfile.confirmPassword) {
    alert('兩次輸入的密碼不一致！');
    return;
  }

  try {
    // 在 apiConfig.js還沒定義，API_ENDPOINTS.REGISTER可以先保留原本的網址，但建議統一
    const res = await publicApi.post('member/register_api.php', memberProfile);

    if (res.data.status === 'success') {
      alert('註冊成功！歡迎加入 UniCare');
      router.push({ name: 'Login' });
    } else {
      alert('註冊失敗：' + res.data.message);
    }
  } catch (error) {
    console.error("API 連線錯誤：", error);
    alert('無法連線到伺服器，（Port: 8888）。');
  }
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
            <input 
              v-model="memberProfile.full_name" 
              type="text" 
              placeholder="請輸入真實姓名"
              :class="{ 'error-input': errors.full_name }"
            />
            <span v-if="errors.full_name" class="error-msg">{{ errors.full_name }}</span>
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
            <input
             v-model="memberProfile.email"
             type="email"
             placeholder="example@mail.com"
             :class="{ 'error-input': errors.email }"
            />
            <span v-if="errors.email" class="error-msg">{{ errors.email }}</span>
          </div>
          <div class="form-group">
            <label>聯絡電話</label>
            <input
             v-model="memberProfile.phone_number"
             type="tel"
             placeholder="09xxxxxxxx"
             :class="{ 'error-input': errors.phone_number }"
            />
            <span v-if="errors.phone_number" class="error-msg">{{ errors.phone_number }}</span>
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
            <input
             v-model="memberProfile.contact_name"
             type="text" 
             placeholder="緊急聯絡人姓名"
             :class="{ 'error-input': errors.contact_name }"
          />
          <span v-if="errors.contact_name" class="error-msg">{{ errors.contact_name }}</span>
          </div>
          <div class="form-group">
            <label>關係</label>
            <input v-model="memberProfile.relationship" placeholder="例如：父子">
          </div>
          <div class="form-group full-width">
            <label>聯絡人電話</label>
            <input
              v-model="memberProfile.emergency_phone_number"
              type="tel"
              placeholder="09xxxxxxxx"
              :class="{ 'error-input': errors.emergency_phone_number }"
            />
            <span v-if="errors.emergency_phone_number" class="error-msg">{{ errors.emergency_phone_number }}</span>
          </div>
        </div>
        <br>
          <div class="policy-check">
            <input type="checkbox" id="policy" v-model="agreePolicy" required>
            <label for="policy"> 我已閱讀並同意UniCare服務條款與隱私權政策</label>
          </div>
        
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

// 錯誤提示樣式
.error-input {
  border-color: #ff5252 !important;
  background-color: #fff5f5;
}

.error-msg {
  color: #ff5252;
  font-size: 0.75rem;
  margin-top: 4px;
  display: block;
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