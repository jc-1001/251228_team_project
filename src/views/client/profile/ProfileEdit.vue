<script setup>
import { ref } from 'vue'
import TheProfileHeader from '@/components/common/TheProfileHeader.vue'
import TheprofileSide from '@/components/common/TheprofileLayout.vue'

const profile = ref({
  username: 'ingrid',
  email: 'ingrid@example.com',
  phone: '0912345678',
  gender: 'female',
  birthday: '1987-01-01',
  height: '160',
  weight: '45',
  bloodType:'O',
  phone_number:'0912345678',
  contact_name:'Mom',
  relationship:'母女',
})

const handleSave = () => {
  alert('資料已儲存！')
}
</script>

<template>
  <TheProfileHeader />

  <TheprofileSide title="個人資料編輯">
    <div class="profile-edit-container">
      <form @submit.prevent="handleSave">
        <div class="form-group">
          <label>使用者名稱</label>
          <input type="text" v-model="profile.username" placeholder="請輸入名稱">
        </div>

        <div class="form-group">
          <label>電子郵件</label>
          <input type="email" v-model="profile.email" disabled>
          <small>電子郵件為登入帳號，不可修改</small>
        </div>

        <div class="form-group">
          <label>手機號碼</label>
          <input type="tel" v-model="profile.phone">
        </div>

        <div class="form-group">
          <label>生日</label>
          <input type="date" v-model="profile.birthday">
        </div>

        <div class="form-group">
          <label>身高 cm</label>
          <input type="number" v-model="profile.height">
        </div>

        <div class="form-group">
          <label>體重 kg</label>
          <input type="number" v-model="profile.weight">
        </div>

        <div class="form-group">
          <label>血型</label>
          <input type="text" v-model="profile.bloodType">
        </div>

        <div class="form-group">
          <label>緊急聯絡人</label>
          <input type="text" v-model="profile.contact_name" placeholder="請輸入姓名">
        </div>

        <div class="form-group">
          <label>緊急聯絡人關係</label>
          <input type="text" v-model="profile.relationship">
        </div>

        <div class="form-group">
          <label>緊急聯絡人手機號碼</label>
          <input type="tel" v-model="profile.phone_number">
        </div>

        <div class="form-actions">
          <button type="submit" class="btn-submit">儲存變更</button>
          <button type="button" class="btn-cancel">取消</button>
        </div>
      </form>
    </div>
  </TheprofileSide>
</template>

<style lang="scss" scoped>
.profile-edit-container {
  max-width: 600px;
  margin: 0 auto;
  padding: 20px;

  .form-group {
    margin-bottom: 24px;
    display: flex;
    flex-direction: column;
    gap: 8px;

    label {
      font-weight: 600;
      color: #2E6669;
    }

    input {
      padding: 12px;
      border: 1px solid #ddd;
      border-radius: 8px;
      font-size: 16px;
      &:focus { border-color: #2E6669; outline: none; }
      &:disabled { background: #f5f5f5; color: #999; }
    }

    small { color: #888; margin-top: -4px; }
  }

  .form-actions {
    display: flex;
    gap: 15px;
    margin-top: 30px;

    button {
      flex: 1;
      padding: 12px;
      border-radius: 8px;
      cursor: pointer;
      font-weight: bold;
      transition: 0.3s;
    }

    .btn-submit {
      background: #2E6669;
      color: white;
      border: none;
      &:hover { background: #3d868a; }
    }

    .btn-cancel {
      background: white;
      border: 1px solid #ccc;
      &:hover { background: #f9f9f9; }
    }
  }
}

/* RWD 768px 斷點 */
@media (max-width: 768px) {
  .profile-edit-container {
    padding: 10px;
    
    .form-actions {
      flex-direction: column; // 手機版按鈕上下堆疊
      gap: 10px;
      button { width: 100%; }
    }
    
    .form-group input {
      font-size: 14px; // 稍微縮小字體以利輸入
      padding: 10px;
    }
  }
}
</style>