<script setup>
import { ref } from 'vue'
import TheProfileHeader from '@/components/common/TheProfileHeader.vue'
import TheprofileSide from '@/components/common/TheprofileLayout.vue'

// 定義表單資料
const profile = ref({
  username: 'ingrid',
  email: 'ingrid@example.com',
  phone: '0912345678',
  gender: 'female',
  birthday: '1987-01-01',
  height: '160',
  weight: '45'
})

// 儲存功能
const handleSave = () => {
  console.log('儲存資料:', profile.value)
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
          <label>性別</label>
          <div class="radio-group">
            <label><input type="radio" value="male" v-model="profile.gender"> 男</label>
            <label><input type="radio" value="female" v-model="profile.gender"> 女</label>
            <label><input type="radio" value="other" v-model="profile.gender"> 其他</label>
          </div>
        </div>

        <div class="form-group">
          <label>生日</label>
          <input type="date" v-model="profile.birthday">
        </div>

        <div class="form-group">
          <label>身高 cm</label>
          <input type="height" v-model="profile.height">
        </div>

        <div class="form-group">
          <label>體重 kg</label>
          <input type="weight" v-model="profile.weight">
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
  padding: 20px;


  .form-group {
    margin-bottom: 20px;
    display: flex;
    flex-direction: column;
    gap: 8px;

    label {
      font-weight: bold;
      color: #2E6669; // 使用 UniCare 品牌色
    }

    input[type="text"],
    input[type="email"],
    input[type="tel"],
    input[type="date"], 
    input[type="height"], 
    input[type="weight"], 
    input[type="bloodType"] {
      padding: 10px;
      border: 1px solid #ddd;
      border-radius: 6px;
    }

    input:disabled {
      background-color: #f5f5f5;
    }
  }

  .radio-group {
    display: flex;
    gap: 15px;
  }

  .form-actions {
    display: flex;
    gap: 10px;
    margin-top: 30px;

    button {
      padding: 10px 25px;
      border-radius: 6px;
      cursor: pointer;
    }

    .btn-submit {
      background: #2E6669;
      color: white;
      border: none;
    }

    .btn-cancel {
      background: white;
      border: 1px solid #ccc;
    }
  }
}
</style>