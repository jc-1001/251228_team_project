<script setup>
import { reactive } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();
const memberProfile = reactive({
  full_name: '',
  email: '',
  password: '',
  confirmPassword: '',
  phone_number: '',
  gender: 'F',
  birth_date: '',
  blood_type: 'A',
  height: null,
  weight: null,
  chronic_disease_description: '',
  family_history: '',
  allergy_history: '',
  is_smoking: false,
  is_drinking: false,
  emergency_contact_name: '',
  emergency_contact_relationship: '',
  emergency_contact_phone: '',
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

  // 自動產生 M0000X 編號
  const generateMemberId = () => {
    if (allUsers.length === 0) return 'M00001';
    const lastId = allUsers[allUsers.length - 1].member_id || 'M00000';
    const nextNum = parseInt(lastId.replace('M', '')) + 1;
    return `M${nextNum.toString().padStart(5, '0')}`;
  };

  const newUser = {
    ...memberProfile,
    member_id: generateMemberId(),
    id: Date.now()
  };

  allUsers.push(newUser);
  localStorage.setItem('allUsers', JSON.stringify(allUsers));
  
  alert(`註冊成功！您的編號為 ${newUser.member_id}，請重新登入。`);
  router.push('/login'); // 引導至登入頁面
};
</script>

<template>
  <div class="auth-container">
    <div class="auth-card">
      <h2 class="title">會員註冊</h2>
      <form @submit.prevent="handleRegister">
        <div class="input-grid">
          <div class="form-group"><label>姓名</label><input v-model="memberProfile.full_name" required></div>
          <div class="form-group"><label>Email</label><input type="email" v-model="memberProfile.email" required></div>
          <div class="form-group"><label>密碼</label><input type="password" v-model="memberProfile.password" required></div>
          <div class="form-group"><label>確認密碼</label><input type="password" v-model="memberProfile.confirmPassword" required></div>
        </div>
        <button type="submit" class="primary-btn">確認註冊</button>
      </form>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.auth-container { display: flex; justify-content: center; padding: 40px; background: #f6f7f9; min-height: 100vh; }
.auth-card { background: white; padding: 40px; border-radius: 12px; width: 100%; max-width: 600px; box-shadow: 0 4px 20px rgba(0,0,0,0.1); }
.title { color: #2E6669; text-align: center; margin-bottom: 30px; }
.input-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 20px; }
.form-group { display: flex; flex-direction: column; label { margin-bottom: 8px; font-weight: bold; } input { padding: 10px; border: 1px solid #ddd; border-radius: 8px; } }
.primary-btn { width: 100%; margin-top: 30px; padding: 14px; background: #2E6669; color: white; border: none; border-radius: 30px; cursor: pointer; font-weight: bold; }
@media (max-width: 480px) { .input-grid { grid-template-columns: 1fr; } }
</style>