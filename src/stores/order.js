import { defineStore } from 'pinia'
import { ref } from 'vue'
import { publicApi } from '@/utils/publicApi'

export const useOrderStore = defineStore('order',()=>{
  // 1. State
  const orderList = ref([])
  const currentOrder = ref(null) // 用來存剛結帳成功的那筆

  // 2. Action
  // 建立訂單 (送給php)

  const createOrder = async (orderPayLoad) => {
    try {
      // .post固定要帶兩個參數 .post( 'php網址', 'Payload' )
      const res = await publicApi.post('shop/create_order.php', orderPayLoad)
      if(res.data.success) {
        console.log('訂單建立成功!訂單號碼:', res.data.orderNumber);

        // 儲存回傳的訂單號碼
        currentOrder.value = res.data

        return true
      }
    } catch(err) {
      console.error('訂單建立失敗:', err)
      // php回傳的錯誤訊息
      if (err.response && err.response.data) {
        alert('結帳失敗: ' + err.response.data.error)
      } else {
        alert('系統發生錯誤，請稍後再試')
      }

      return false
    }
  }

  return {
    orderList,
    currentOrder,
    createOrder
  }
})