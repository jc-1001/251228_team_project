<script setup>
import { onMounted, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { publicApi } from '@/utils/publicApi'
import { useCartStore } from '@/stores/cart'
import SuccessMessageModal from '@/components/common/client/modals/SuccessMessageModal.vue'

const route = useRoute()
const router = useRouter()
const cartStore = useCartStore()

const successModal = ref(null)

const statusMsg = ref('正在確認付款中，請稍候...')

onMounted(async () => {
  // 1. 從網址取得 transactionId
  // LINE Pay 跳回來時會帶參數：?transactionId=xxxxxxxx&orderId=...
  const transactionId = route.query.transactionId
  
  if (!transactionId) {
    statusMsg.value = '交易失敗：缺少交易代碼'
    return
  }

  try {
    // 2. 呼叫後端確認付款
    const res = await publicApi.post('shop/linepay_confirm.php', {
      transactionId: transactionId
    })

    if (res.data.success) {
      statusMsg.value = '付款成功！正在跳轉...'
      
      // 3. 清空購物車 (這就是你原本想做的 handleSuccessConfirm)
      cartStore.clearCart()

      // 4. 延遲一下讓使用者看到成功訊息，然後跳轉
      setTimeout(() => {
        successModal.value.show();
        router.push('/orderlist') // 跳轉到訂單管理頁
      }, 1500)
    } else {
      statusMsg.value = '付款失敗：' + res.data.message
    }

  } catch (error) {
    console.error(error)
    statusMsg.value = '系統發生錯誤，請聯繫客服'
  }
})
</script>

<template>
  <SuccessMessageModal ref="successModal" :title="'付款完成!'" @confirmed="handleSuccessConfirm" />
  <div class="confirm-page">
    <div class="card">
      <h2>LINE Pay 付款結果</h2>
      <p>{{ statusMsg }}</p>
      </div>
  </div>
</template>

<style scoped>
.confirm-page {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 60vh;
  background-color: #f9f9f9;
}
.card {
  background: white;
  padding: 40px;
  border-radius: 10px;
  box-shadow: 0 4px 10px rgba(0,0,0,0.1);
  text-align: center;
}
h2 {
  color: #00c300; /* LINE Green */
  margin-bottom: 20px;
}
</style>