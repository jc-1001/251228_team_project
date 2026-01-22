import { defineStore } from 'pinia'
import { ref, watch } from 'vue'

export const useOrderStore = defineStore('order',()=>{
  // 1. State
  const orderList = ref(JSON.parse(localStorage.getItem('myOrderList')) || [])

  // 2. Action
  // 新增訂單 (Create Order)
  // @param {Object} orderPayLoad - 從結帳頁傳過來的整包資料

  const createOrder = ( orderPayLoad )=>{

    // 訂單編號
    const orderId = `ORD-${Date.now()}-${Math.floor(Math.random()*1000)}`
    // 下單時間
    const now = new Date()

    const yyyy = now.getFullYear()
    const mm = String(now.getMonth() + 1).padStart(2, '0')
    const dd = String(now.getDate()).padStart(2, '0')
    const hh = String(now.getHours()).padStart(2, '0')
    const min = String(now.getMinutes()).padStart(2, '0')

    const dateString = `${yyyy}-${mm}-${dd} ${hh}:${min}`
    // 組合整個訂單
    const newOrder = {
      id: orderId,
      date: dateString,
      status: '備貨中',
      // 把結帳頁傳來的資料 (商品、收件人、金額) 全部"展開"放進來
      // ...展開運算子
      ...orderPayLoad
    }
    // 將新訂單存入陣列中
    orderList.value.unshift(newOrder)

    console.log('訂單建立成功！編號:', orderId);
  }

  // 3. Persistence (持久化保存)
  watch(orderList,(newVal)=>{
    localStorage.setItem('myOrderList',JSON.stringify(newVal))
  },{ deep:true })


  return {
    orderList,
    createOrder
  }
})