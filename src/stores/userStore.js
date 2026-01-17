import { defineStore } from "pinia";
import { ref } from 'vue';

export const useUserStore = defineStore('user', ()=>{
  // 模擬已登入狀態
  const isLoggedIn = ref(true)

  // 模擬使用者資料
  const userData = ref({
    name: '陳美玲',
    phone: '0912-345-678',
    email: 'marychen@gmail.com',
    address: '台北市信義區健康路一段100號',
  })

  return {
    isLoggedIn,
    userData
  }
})