import { defineStore } from 'pinia'
import { ref, computed, watch } from 'vue'

export const useCartStore = defineStore('cart', () => {

  // 1. State (資料)：購物車列表
  // localStorage只能存文字
  // JSON.parse:把「字串」變回「陣列」
  const cartList = ref(JSON.parse(localStorage.getItem('myCart')) || [])

  // 2. Getters (計算)：
  // 計算購物車商品總數量 (給 Header 的小紅點用)
  const cartCount = computed(() => {
    return cartList.value.reduce((total, item) => total + item.qty, 0)
  })

  // 計算購物車商品總金額 
  const totalAmount = computed(() => {
    // 1. 先過濾(filter) 2.再加總(reduce)
    return cartList.value.filter(item => item.checked).reduce((total, item) => total + (item.price * item.qty), 0)
  })

  // 篩選有打勾的商品進入結帳頁
  const checkoutList = computed(()=>{
    return cartList.value.filter(item => item.checked)
  })

  // 3. Action (動作)：

  // 加入購物車
  const addToCart = (product, count = 1) => {
    const existingItem = cartList.value.find((item) => {
      return item.id === product.id
    })

    if (existingItem) {
      existingItem.qty += count
      console.log(`商品已存在，數量增加 ${count}，目前數量:`, existingItem.qty)
    } else {
      cartList.value.push({
        id: product.id,
        title: product.title,
        price: product.price,
        image: product.image || product.gallery?.[0]?.small || '',
        spec: product.spec,
        qty: count,
        checked: true
      })
      console.log('新商品加入購物車:', product.title)
    }
  }

  // 移除商品
  const removeProduct = (id) => {
    cartList.value = cartList.value.filter((item) => {
      return item.id != id
    })
  }

  // 更新商品數量
  const updateQty = (id, num) => {
    const item = cartList.value.find((item) => {
      return item.id === id
    })
    if (item) {
      item.qty = num
    }
  }

  // 全選/全不選商品
  const setAllChecked = (status) => {
    cartList.value.forEach((item)=>{
      item.checked = status
    })
  }

  // Persistence (持久化)
  // watch( 偵測目標 , 執行動作 , 設定選項 )
  watch(cartList, (newVal) => {
    // JSON.stringify:把物件打包成字串，才能存進localStorage
    localStorage.setItem('myCart', JSON.stringify(newVal))
  }, { deep: true })

  // 4. Return (匯出):
  return {
    cartList,
    cartCount,
    totalAmount,
    checkoutList,
    addToCart,
    removeProduct,
    updateQty,
    setAllChecked
  }

})