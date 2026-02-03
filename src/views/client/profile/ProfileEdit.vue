
<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import TheProfileHeader from '@/components/common/TheProfileHeader.vue'
import TheprofileSide from '@/components/common/TheprofileLayout.vue'
import axios from 'axios' 
const router = useRouter()

// 嚴格對應資料庫與註冊 API 的欄位名稱
const profile = ref({
  full_name: '',
  email: '',
  phone_number: '',
  gender: 'M',
  birth_date: '',
  blood_type: 'A',
  height: null,
  weight: null,
  
  // // 健康檔案習慣
  // has_chronic_disease: false,
  // chronic_disease_description: '',
  // has_family_history: false,
  // family_history_description: '',
  // has_allergies: false,
  // allergy_description: '',
  // is_smoking: false,
  // is_drinking: false,

  // 緊急聯絡人 (對齊 register_api.php 接收的名稱)
  contact_name: '',
  relationship: '',
  emergency_phone_number: '' // 原本可能是 emergency_contact_phone，請改為跟註冊一致
});

onMounted(() => {
  const savedData = localStorage.getItem('userProfile')
  if (savedData) {
    const userData = JSON.parse(savedData)
    // 使用解構賦值，把抓到的資料填入 profile
    Object.assign(profile.value, userData)
  }
})

const handleSave = async () => {
  try {
    // 1. 呼叫後端 API 更新資料庫
    const res = await axios.post('http://localhost:8888/unicare_api/member/update_api.php', profile.value);

    if (res.data.status === 'success') {
      // 2. 成功後，同步更新瀏覽器的快取 (localStorage)
      localStorage.setItem('userProfile', JSON.stringify(profile.value));
      
      alert('個人資料已踏實同步至資料庫！');
      
      // 3. (選做) 跳轉回首頁或重新整理
      // router.push({ name: 'Home' });
    } else {
      alert('更新失敗：' + res.data.message);
    }
  } catch (error) {
    console.error("更新出錯：", error);
    alert('無法連線到伺服器，更新失敗。');
  }
}
</script>

<template>
  <TheProfileHeader />
  <TheprofileSide>
    <div class="profile-edit-container">
      <form @submit.prevent="handleSave">
        <div class="form-section">
          <div class="form-title">基本資料</div>
          <div class="form-grid-single">
            <div class="form-group">
              <label>姓名</label>
              <input v-model="profile.full_name" type="text" placeholder="請輸入姓名">
            </div>
            <div class="form-group">
              <label>性別</label>
              <select v-model="profile.gender">
                <option value="M">男 (M)</option>
                <option value="F">女 (F)</option>
                <option value="O">其他 (O)</option>
              </select>
            </div>
            <div class="form-group">
              <label>電子信箱 (帳號)</label>
              <input v-model="profile.email" type="email" disabled class="disabled-input">
            </div>
            <div class="form-group">
              <label>聯絡電話</label>
              <input v-model="profile.phone_number" type="text" placeholder="09xxxxxxxx">
            </div>
            <div class="form-group">
              <label>生日</label>
              <input v-model="profile.birth_date" type="date">
            </div>
            <div class="form-group">
              <label>血型</label>
              <select v-model="profile.blood_type">
                <option value="A">A 型</option>
                <option value="B">B 型</option>
                <option value="AB">AB 型</option>
                <option value="O">O 型</option>
              </select>
            </div>
          </div>
        </div>

        <div class="form-section">
          <div class="form-title">身體指標</div>
          <div class="form-grid-single">
            <div class="form-group">
              <label>身高 (cm)</label>
              <input v-model="profile.height" type="number" step="0.1" placeholder="例如 170.5">
            </div>
            <div class="form-group">
              <label>體重 (kg)</label>
              <input v-model="profile.weight" type="number" step="0.1" placeholder="例如 65.2">
            </div>
          </div>
        </div>

        <div class="form-section">
          <div class="form-title">緊急聯絡人</div>
          <div class="form-grid-single">
            <div class="form-group">
              <label>聯絡人姓名</label>
              <input v-model="profile.contact_name">
            </div>
            <div class="form-group">
              <label>關係</label>
              <input v-model="profile.relationship">
            </div>
            <div class="form-group">
              <label>聯絡電話</label>
              <input v-model="profile.emergency_phone_number">
            </div>
          </div>
        </div>

        <div class="form-actions">
          <button type="submit" class="save-btn">儲存</button>
        </div>
      </form>
    </div>
  </TheprofileSide>
</template>

<style lang="scss" scoped>
.profile-edit-container {
  max-width: 600px; // 單欄佈局收窄最大寬度，視覺更集中
  margin: 0 auto;
  padding: 20px 15px;

  .form-section {
    margin-bottom: 20px;
    padding: 20px;
    background: #fff;
    border-radius: 12px;
    box-shadow: 0 2px 10px rgba(0,0,0,0.05);
  }

  .form-title {
    font-size: 1.1rem;
    color: #2E6669;
    font-weight: bold;
    margin-bottom: 20px;
    border-left: 4px solid #2E6669;
    padding-left: 12px;
  }

  // 核心修改：移除 grid 兩欄設定，改為垂直排列
  .form-grid-single {
    display: flex;
    flex-direction: column;
    gap: 18px;
  }

  .form-group {
    display: flex;
    flex-direction: column;
    label { 
      font-weight: 600; 
      margin-bottom: 8px; 
      color: #4a5568; 
      font-size: 0.9rem; 
    }
    input, select { 
      padding: 12px; 
      border: 1px solid #cbd5e0; 
      border-radius: 8px;
      font-size: 1rem;
      width: 100%;
      box-sizing: border-box;
      &:focus { outline: none; border-color: #2E6669; }
    }
    .disabled-input { background-color: #f7fafc; cursor: not-allowed; }
  }

  .form-actions {
    display: flex;
    justify-content: center;
    margin-top: 30px;
    .save-btn {
      width: 100%; // 儲存按鈕全寬化，更適合單欄排版
      max-width: 300px;
      padding: 14px;
      background: #2E6669;
      color: white;
      border: none;
      border-radius: 30px;
      font-size: 1.1rem;
      font-weight: bold;
      cursor: pointer;
      transition: background 0.2s;
      &:hover { background: #245254; }
    }
  }
}

// 針對極小螢幕 (360px 以下) 的微調
@media (max-width: 360px) {
  .profile-edit-container { padding: 10px; }
  .form-section { padding: 15px; }
  .form-title { font-size: 1rem; }
}
</style>