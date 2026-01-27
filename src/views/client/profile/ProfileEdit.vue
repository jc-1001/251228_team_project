<script setup>
import { ref, onMounted } from 'vue'
import TheProfileHeader from '@/components/common/TheProfileHeader.vue'
import TheprofileSide from '@/components/common/TheprofileLayout.vue'

// 預設資料（與註冊欄位一致）
const profile = ref({
  full_name: '',
  email: '',
  phone_number: '',
  gender: '',
  birth_date: '',
  blood_type: '',
  height: '',
  weight: '',
  chronic_disease_description: '',
  family_history: '',
  allergy_history: '',
  is_smoking: false,
  is_drinking: false,
  emergency_contact_name: '',
  emergency_contact_relationship: '',
  emergency_contact_phone: ''
})

// 頁面載入時讀取資料
onMounted(() => {
  const savedData = localStorage.getItem('userProfile')
  if (savedData) {
    profile.value = JSON.parse(savedData)
  }
})

// 儲存修改
const handleSave = () => {
  localStorage.setItem('userProfile', JSON.stringify(profile.value))
  alert('個人檔案更新成功！')
}
</script>

<template>
  <TheProfileHeader />

  <TheprofileSide title="個人資料編輯">
    <div class="profile-edit-container">
      <form @submit.prevent="handleSave">
        
        <div class="form-section">
          <div class="form-group">
            <label>姓名</label>
            <input type="text" v-model="profile.full_name">
          </div>
          <div class="form-group">
            <label>電子郵件 (帳號)</label>
            <input type="email" v-model="profile.email" disabled class="disabled-field">
            <small>電子郵件為帳號唯一識別，不可修改</small>
          </div>
          <div class="form-group">
            <label>手機號碼</label>
            <input type="text" v-model="profile.phone_number">
          </div>
        </div>

        <div class="form-section">
          <div class="form-title">身體檔案</div>
          <div class="row-group">
            <div class="form-group">
              <label>身高 (cm)</label>
              <input type="number" v-model="profile.height">
            </div>
            <div class="form-group">
              <label>體重 (kg)</label>
              <input type="number" v-model="profile.weight">
            </div>
          </div>
          <div class="form-group">
            <label>慢性病說明</label>
            <input type="text" v-model="profile.chronic_disease_description">
          </div>
          <div class="form-group">
            <label>家族病史</label>
            <input type="text" v-model="profile.family_history">
          </div>
        </div>

        <div class="form-section">
          <div class="form-title">緊急聯絡資訊</div>
          <div class="form-group">
            <label>聯絡人姓名</label>
            <input type="text" v-model="profile.emergency_contact_name">
          </div>
          <div class="form-group">
            <label>聯絡人電話</label>
            <input type="text" v-model="profile.emergency_contact_phone">
          </div>
        </div>

        <div class="form-actions">
          <button type="submit" class="save-btn">儲存修改</button>
        </div>
      </form>
    </div>
  </TheprofileSide>
</template>

<style lang="scss" scoped>
.profile-edit-container {
  max-width: 700px;
  margin: 0 auto;
  padding: 20px;

  .form-section {
    margin-bottom: 30px;
    padding: 20px;
    background: #fff;
    border-radius: 8px;
  }

  .form-title {
    font-size: 18px;
    color: #2E6669;
    font-weight: bold;
    margin-bottom: 15px;
    border-bottom: 1px solid #eee;
    padding-bottom: 5px;
  }

  .form-group {
    margin-bottom: 20px;
    display: flex;
    flex-direction: column;
    label { font-weight: 600; margin-bottom: 5px; color: #555; }
    input { 
      padding: 12px; 
      border: 1px solid #ddd; 
      border-radius: 8px;
      &:focus { border-color: #2E6669; outline: none; }
    }
    .disabled-field { background-color: #f9f9f9; color: #999; }
  }

  .row-group { display: grid; grid-template-columns: 1fr 1fr; gap: 20px; }

  .form-actions {
    margin-top: 30px;
    .save-btn {
      width: 100%;
      background: #2E6669;
      color: #fff;
      padding: 14px;
      border: none;
      border-radius: 8px;
      font-size: 16px;
      font-weight: bold;
      cursor: pointer;
      &:hover { background: darken(#2E6669, 5%); }
    }
  }
}

@media (max-width: 480px) {
  .row-group { grid-template-columns: 1fr; }
}
</style>