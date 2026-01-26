<script setup>
import { ref, reactive } from 'vue';

// 根據 ER_MODEL Members 表格命名的初始資料
const memberData = reactive({
  member_id: 1001,
  email: 'Group1@unicare.com',
  full_name: '管理員一號',
  phone_number: '0912-345-678',
  gender: 'M', // 'M', 'F', 'O'
  birth_date: '1990-01-01',
  blood_type: 'A', // A, B, AB, O
  height: 175.5,
  weight: 70.2,
  has_chronic_disease: false,
  chronic_disease_description: '',
  account_status: 1, // 0: 停用, 1: 正常
});

const isEditing = ref(false);

const handleSave = () => {
  // 這裡執行 API 儲存邏輯
  console.log('儲存資料:', memberData);
  alert('會員資料已更新！');
  isEditing.value = false;
};
</script>

<template>
  <div class="member-profile-container">
    <div class="profile-card">
      <div class="header">
        <h2>會員核心與健康檔案</h2>
        <button @click="isEditing = !isEditing" class="btn-edit">
          {{ isEditing ? '取消修改' : '編輯資料' }}
        </button>
      </div>

      <hr />

      <form @submit.prevent="handleSave" class="profile-form">
        <section class="form-section">
          <h3><span class="material-icons">person</span> 基本資訊</h3>
          <div class="grid-layout">
            <div class="form-group">
              <label>會員編號 (member_id)</label>
              <input type="text" v-model="memberData.member_id" disabled />
            </div>
            <div class="form-group">
              <label>電子信箱 (email)</label>
              <input type="email" v-model="memberData.email" :disabled="!isEditing" />
            </div>
            <div class="form-group">
              <label>姓名 (full_name)</label>
              <input type="text" v-model="memberData.full_name" :disabled="!isEditing" />
            </div>
            <div class="form-group">
              <label>電話 (phone_number)</label>
              <input type="text" v-model="memberData.phone_number" :disabled="!isEditing" />
            </div>
          </div>
        </section>

        <section class="form-section">
          <h3><span class="material-icons">monitor_weight</span> 生理與健康指標</h3>
          <div class="grid-layout">
            <div class="form-group">
              <label>性別 (gender)</label>
              <select v-model="memberData.gender" :disabled="!isEditing">
                <option value="M">男 (M)</option>
                <option value="F">女 (F)</option>
                <option value="O">其他 (O)</option>
              </select>
            </div>
            <div class="form-group">
              <label>生日 (birth_date)</label>
              <input type="date" v-model="memberData.birth_date" :disabled="!isEditing" />
            </div>
            <div class="form-group">
              <label>血型 (blood_type)</label>
              <select v-model="memberData.blood_type" :disabled="!isEditing">
                <option v-for="type in ['A', 'B', 'AB', 'O']" :key="type" :value="type">{{ type }} 型</option>
              </select>
            </div>
            <div class="form-group">
              <label>身高 (height) cm</label>
              <input type="number" step="0.1" v-model="memberData.height" :disabled="!isEditing" />
            </div>
            <div class="form-group">
              <label>體重 (weight) kg</label>
              <input type="number" step="0.1" v-model="memberData.weight" :disabled="!isEditing" />
            </div>
            <div class="form-group checkbox-group">
              <label>慢性病狀態 (has_chronic_disease)</label>
              <input type="checkbox" v-model="memberData.has_chronic_disease" :disabled="!isEditing" />
              <span>是否有慢性病</span>
            </div>
          </div>
          
          <div class="form-group full-width" v-if="memberData.has_chronic_disease">
            <label>慢性病描述 (chronic_disease_description)</label>
            <textarea v-model="memberData.chronic_disease_description" :disabled="!isEditing" rows="3"></textarea>
          </div>
        </section>

        <div class="footer-actions" v-if="isEditing">
          <button type="submit" class="btn-save">確認儲存更新</button>
        </div>
      </form>
    </div>
  </div>
</template>

<style lang="scss" scoped>
$primary-color: #0062ff;
$bg-color: #f4f7fe;
$white: #ffffff;
$border-color: #e0e4ec;

.member-profile-container {
  padding: 24px;
  background-color: $bg-color;
  min-height: 100vh;
}

.profile-card {
  background: $white;
  padding: 30px;
  border-radius: 16px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.05);
  max-width: 1000px;
  margin: 0 auto;

  .header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 20px;
    h2 { color: #333; margin: 0; }
  }
}

.form-section {
  margin: 30px 0;
  h3 {
    font-size: 1.1rem;
    color: $primary-color;
    display: flex;
    align-items: center;
    gap: 8px;
    margin-bottom: 20px;
  }
}

.grid-layout {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 20px;
}

.form-group {
  display: flex;
  flex-direction: column;
  gap: 8px;

  label {
    font-size: 0.85rem;
    font-weight: 600;
    color: #666;
  }

  input, select, textarea {
    padding: 10px 14px;
    border: 1px solid $border-color;
    border-radius: 8px;
    background-color: #fafbfc;
    transition: 0.3s;
    &:focus { outline: none; border-color: $primary-color; background-color: #fff; }
    &:disabled { background-color: #f0f2f5; cursor: not-allowed; }
  }

  &.full-width { grid-column: 1 / -1; }
}

.checkbox-group {
  flex-direction: row;
  align-items: center;
  padding-top: 30px;
  input { width: 20px; height: 20px; }
}

.btn-edit, .btn-save {
  padding: 10px 24px;
  border-radius: 8px;
  cursor: pointer;
  font-weight: 600;
  transition: 0.3s;
}

.btn-edit {
  background: transparent;
  border: 1px solid $primary-color;
  color: $primary-color;
  &:hover { background: $primary-color; color: $white; }
}

.btn-save {
  background: $primary-color;
  color: $white;
  border: none;
  width: 100%;
  margin-top: 20px;
  &:hover { opacity: 0.9; transform: translateY(-1px); }
}
</style>