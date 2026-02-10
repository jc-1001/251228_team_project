<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useCartStore } from '@/stores/cart'
import { useOrderStore } from '@/stores/order'

import CheckoutItems from '@/components/checkout/CheckoutItems.vue'
import CheckoutForm from '@/components/checkout/CheckoutForm.vue'
import CheckoutSummary from '@/components/checkout/CheckoutSummary.vue'

import SuccessMessageModal from '@/components/common/client/modals/SuccessMessageModal.vue'
import { publicApi } from '@/utils/publicApi'

const router = useRouter()
const cartStore = useCartStore()
const orderStore = useOrderStore()

// const showSuccess = ref(false)

// Template Refs - 樣板參考
const checkoutFormRef = ref(null)

const successModal = ref(null)

// 處理結帳送出
const handleCheckoutSubmit = async (summaryData)=>{
  if(!checkoutFormRef.value) {
    return
  }

  const isValid = checkoutFormRef.value.validateAll()

  if(isValid) {
    // 準備組裝"訂單頁"需要的資料

    // 表單填寫 - 訂單資料
    // 使用"深拷貝"將訂單資料成為一個不能被修改的紀錄，成為快照
    // JSON.stringify將物件轉成字串後，就會切斷與原本物件的連結(因為字串沒有連結功能)
    const formData = JSON.parse(JSON.stringify(checkoutFormRef.value.form))

    // 會員大改1
    const profile = JSON.parse(localStorage.getItem('userProfile') || '{}')
    const memberId = profile.member_id || 0

    // orderPayLoad
    // 修改成跟"資料庫欄位"一樣
    const orderPayLoad = {
      // 會員大改2
      member_id: memberId,
      recipient_name: formData.user.name,
      recipient_phone: formData.user.phone,
      recipient_email: formData.user.email,
      recipient_address: formData.user.address,
      note: formData.note,
      payment_type: formData.paymentType,
      invoice_type: formData.invoiceType,
      invoice_info: formData.invoiceType === 'company' ? formData.invoiceTaxId : formData.invoiceMobile,
      // 購物車商品快照
      items: cartStore.checkoutList,
      // 金額資訊
      total: summaryData.total,
      shippingFee: summaryData.shippingFee,
      discount: summaryData.discount
    }

    console.log('送出的商品資料:', orderPayLoad.items)

    // 呼叫orderStore建立訂單
    const success = await orderStore.createOrder( orderPayLoad )

    if(success) {
    if(orderPayLoad.payment_type === 'linepay') {
      try {
        const res = await publicApi.post('shop/linepay_request.php', {
          orderId: orderStore.currentOrder.orderNumber
        })

        if(res.data.success) {
          // 跳轉到linepay付款頁面
          window.location.href = res.data.paymentUrl
        } else {
          alert('LINE Pay 請求失敗')
        }
      } catch(err) {
        console.error(err)
          alert('LINE Pay 連線錯誤')
      }
    } else {
      successModal.value.show();
    }
    }
  } else {
    alert('部分欄位有誤，請檢查紅字部分！')
  }
}
const handleSuccessConfirm = ()=>{
  // showSuccess.value = false
  cartStore.clearCart()
  // 導到訂單管理頁
  router.push('/orderlist')
}

</script>
<template>
  <SuccessMessageModal ref="successModal" :title="'已送出訂單!'" @confirmed="handleSuccessConfirm" />
  <div class="checkout_page">
    <div class="breadcrumb">
      <router-link :to="'/cart'" class="breadcrumb_location">&lt 返回購物車</router-link>
    </div>
    <h3 class="checkout_page_title">填寫資料與結帳</h3>
    <div class="checkout_container">
      <section class="checkout_info">
        <CheckoutItems />
        <CheckoutForm ref="checkoutFormRef" />
      </section>
      <section class="checkout_summary">
        <CheckoutSummary @submit="handleCheckoutSubmit"/>
      </section>
    </div>
  </div>
</template>
<style lang="scss" scoped>
.checkout_page {
  display: flex;
  flex-direction: column;

  .breadcrumb_location {
    display: inline-block;
    margin-bottom: 12px;
    @include body3;
    transition: all .3s;

    &:hover {
      color: $primary;
    }
  }

  .checkout_page_title {
    margin-bottom: 16px;
    @include subtitle1(true);
    color: $primaryDark;
  }

  .checkout_container {
    display: flex;
    flex-wrap: wrap;
    gap: 24px;
    .checkout_info {
      flex: 2 1 500px;
      display: flex;
      flex-direction: column;
      gap: 24px;
    }
    .checkout_summary {
      flex: 1 1 300px;
    }
  }
}
</style>