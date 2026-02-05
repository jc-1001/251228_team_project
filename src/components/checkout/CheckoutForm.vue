<script setup>
import { ref, onMounted } from 'vue'
import { useUserStore } from '@/stores/userStore'

import personIcon from '@/assets/images/shop/icon/person.svg'
import creditIcon from '@/assets/images/shop/icon/credit_card.svg'
import receiptIcon from '@/assets/images/shop/icon/receipt_long.svg'

// linepay icon
import linepayIcon from '@/assets/images/shop/linepay_logo.png'


const userStore = useUserStore()

const form = ref({
  user: {
    name: '',
    phone: '',
    email: '',
    address: '',
  },
  note: '',
  paymentType: 'linepay', // 預設linepay
  creditInfo: { // 信用卡資訊
    cardNumber: '',
    expiry: '',
    cvc: '',
  },
  // 發票選項: 'personal' (二聯) | 'company' (三聯) | 'mobile' (手機載具)
  invoiceType: 'personal',
  invoiceTaxId: '', // 統一編號 (三聯才要填)
  invoiceMobile: '' // 手機條碼 (載具才要填)
})

// 表單驗證資料
const errors = ref({
  user: {
    name: '',
    phone: '',
    email: '',
    address: '',
  },
  note: '',
  paymentType: 'linepay', 
  creditInfo: { 
    cardNumber: '',
    expiry: '',
    cvc: '',
  },
  invoiceType: 'personal',
  invoiceTaxId: '',
  invoiceMobile: ''
})

// 表單驗證函式
const validateField = (fieldCategory, fieldName)=>{
  let value = ''
  if( fieldCategory === 'invoice' ) {
    value = form.value[fieldName]
  }else {
    value = form.value[fieldCategory][fieldName]
  }

  let errorMsg = ''

  // 1. 收件人
  if(fieldCategory === 'user') {
    switch (fieldName) {
      case 'name':
        if(!value) errorMsg = '請輸入真實姓名'
        break
      case 'phone':
        if(!value) errorMsg = '請輸入手機號碼'
        // Regex 正規表達式
        else if (!/^09\d{8}$/.test(value) && !/^09\d{2}-\d{3}-\d{3}$/.test(value))
          errorMsg = '格式錯誤 (09xx-xxx-xxx)'
        break
      case 'email':
        if(!value) errorMsg = '請輸入Email'
        else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value))
          errorMsg = 'Email 格式不正確'
        break
      case 'address':
        if (!value) errorMsg = '請輸入地址'
        break
    }
  }
  // 2. 信用卡驗證
  if(fieldCategory === 'creditInfo' && form.value.paymentType === 'credit') {
    switch(fieldName) {
      case 'cardNumber':
        if(!value) errorMsg = '必填'
        else if (!/^\d{4}\s?\d{4}\s?\d{4}\s?\d{4}$/.test(value)) errorMsg = '卡號格式錯誤'
        break 
      case 'expiry':
        if(!value) errorMsg = '必填'
        else if (!/^\d{4}$/.test(value)) errorMsg = '4碼數字'
        break
      case 'cvc':
        if(!value) errorMsg = '必填'
        else if (!/^\d{3}$/.test(value)) errorMsg = '3碼數字'
        break
    }
  }
  // 3. 發票驗證
  if(fieldCategory === 'invoice') {
    if(fieldName === 'invoiceTaxId' && form.value.invoiceType === 'company') {
      if(!value) errorMsg = '請輸入統編'
      else if (!/^\d{8}$/.test(value)) errorMsg = '統編為8碼數字'
    }
    if(fieldName === 'invoiceTaxId' && form.value.invoiceType === 'mobile') {
      if(!value) errorMsg = '請輸入載具號碼'
      else if (!/^\/[0-9A-Z.+-]{7}$/.test(value)) errorMsg = '格式錯誤 (ex: /ABC+123)'
    }
  }

  if(fieldCategory === 'invoice') {
    errors.value[fieldName] = errorMsg
  } else {
    errors.value[fieldCategory][fieldName] = errorMsg
  }
}

// 資料自動填入
onMounted(()=>{
  if(userStore.isLoggedIn) {
    form.value.user.name = userStore.userData.name
    form.value.user.phone = userStore.userData.phone
    form.value.user.email = userStore.userData.email
    form.value.user.address = userStore.userData.address
  }
})

// 訂單送出前，全表格檢查 - 簡單檢查
const validateAll = ()=> {
  // 1. 收件人
  validateField( 'user', 'name' )
  validateField( 'user', 'phone' )
  validateField('user', 'email')
  validateField('user', 'address')
  // 2. 信用卡驗證
  if(form.value.paymentType === 'credit') {
    validateField( 'creditInfo', 'cardNumber' )
    validateField('creditInfo', 'expiry')
    validateField('creditInfo', 'cvc')
  }
  // 3. 發票驗證
  if(form.value.invoiceType === 'company') {
    validateField( 'invoice', 'invoiceTaxId' )
  }
  if(form.value.invoiceType === 'mobile') {
    validateField( 'invoice', 'invoiceMobile' )
  }

  // 檢查表單是否有任何errorMsg
  let isVaild = true

  // 1. 收件人
  // 將錯誤訊息物件的值轉成陣列，比較好檢查內容
  // Object.values，value記得加s
  const userErrorList = Object.values(errors.value.user)
  const hasUserError = userErrorList.some(msg => msg !== '')

  if(hasUserError) {
    isVaild = false
  }

  // 2. 信用卡驗證
  if(form.value.paymentType === 'credit') {
    const creditErrorList = Object.values(errors.value.creditInfo)
    const hasCreditError = creditErrorList.some(msg => msg !== '')
    if(hasCreditError) {
      isVaild = false
    }
  }

  // 3. 發票驗證
  if(form.value.invoiceType === 'company') {
    if(errors.value.invoiceTaxId !== '') {
      isVaild = false
    }
  }
  if(form.value.invoiceType === 'mobile') {
    if(errors.value.invoiceMobile !== '') {
      isVaild = false
    }
  }

  return isVaild
}

// 讓父層也讀得到子層的函式&資料
defineExpose ({
  validateAll,
  form
})

</script>
<template>
  <div class="checkout_form">
    <section class="form_section">
      <h3 class="section_title">
        <span class="icon"><img :src="personIcon"></span>
        收件人資訊
      </h3>
      <div class="form_grid">
        <div class="form_group">
          <div class="label_container">
            <label for="name">姓名</label>
            <span class="error_text" v-if="errors.user.name">{{ errors.user.name }}</span>
          </div>
            <input type="text" id="name" placeholder="請輸入真實姓名" v-model="form.user.name" :class="{'error_border' : errors.user.name}" @blur="validateField('user', 'name')" @input="validateField('user', 'name')">
        </div>
        <div class="form_group">
          <div class="label_container">
            <label for="phone">手機號碼</label>
            <span class="error_text" v-if="errors.user.phone">{{ errors.user.phone }}</span>
          </div>
            <input type="text" id="phone" placeholder="09xx-xxx-xxx" v-model="form.user.phone" :class="{'error_border' : errors.user.phone}" @blur="validateField('user', 'phone')" @input="validateField('user', 'phone')">
        </div>
        <div class="form_group full_width">
          <div class="label_container">
            <label for="email">電子信箱</label>
            <span class="error_text" v-if="errors.user.email">{{ errors.user.email }}</span>
          </div>
            <input type="text" id="email" placeholder="example@email.com" v-model="form.user.email" :class="{'error_border' : errors.user.email}" @blur="validateField('user', 'email')" @input="validateField('user', 'email')">
        </div>
        <div class="form_group full_width">
          <div class="label_container">           
            <label for="address">地址</label>
            <span class="error_text" v-if="errors.user.address">{{ errors.user.address }}</span>
          </div>
            <input type="text" id="address" placeholder="請輸入詳細地址" v-model="form.user.address" :class="{'error_border' : errors.user.address}" @blur="validateField('user', 'address')" @input="validateField('user', 'address')">
        </div>
        <div class="form_group full_width">
          <div class="label_container">      
            <label for="note">備註</label>
          </div>
            <textarea id="note" placeholder="請輸入備註事項" rows="3" v-model="form.note"></textarea>
        </div>
      </div>
    </section>
    <section class="form_section">
      <h3 class="section_title">
        <span class="icon"><img :src="creditIcon"></span>
        付款方式
      </h3>
      <div class="payment_options">
        <div class="payment_card" :class="{'active': form.paymentType === 'linepay'}">
          <div class="payment_header">
            <label class="payment_radio">
              <input type="radio" value="linepay" v-model="form.paymentType">
              <span>
                <img :src="linepayIcon" alt="linepay_icon" class="linepay">
              </span>
            </label>
          </div>
          <!-- <div class="payment_details info_box" v-if="form.paymentType === 'linepay'">
            <p>即將跳轉至付款畫面</p>
          </div> -->
        </div>
        <div class="payment_card" :class="{'active': form.paymentType === 'credit'}">
          <div class="payment_header">
            <label class="payment_radio">
              <input type="radio" value="credit" v-model="form.paymentType">
              <span>信用卡 / 金融卡</span>
            </label>
          </div>
          <div class="payment_details form_grid" v-if="form.paymentType === 'credit'">
            <div class="form_group full_width">
              <div class="label_container">
                <label>卡號</label>
                <span class="error_text" v-if="errors.creditInfo.cardNumber">{{ errors.creditInfo.cardNumber }}</span>
              </div>
                <input type="text" placeholder="0000 0000 0000 0000" v-model="form.creditInfo.cardNumber" :class="{'error_border' : errors.creditInfo.cardNumber}" @blur="validateField('creditInfo', 'cardNumber')" @input="validateField('creditInfo', 'cardNumber')">
            </div>
            <div class="form_group">
              <div class="label_container">
                <label>有效期限 (MM/YY)</label>
                <span class="error_text" v-if="errors.creditInfo.expiry">{{ errors.creditInfo.expiry }}</span>
              </div>
                <input type="text" placeholder="MM/YY" v-model="form.creditInfo.expiry" :class="{'error_border' : errors.creditInfo.expiry}" @blur="validateField('creditInfo', 'expiry')" @input="validateField('creditInfo', 'expiry')">
            </div>
            <div class="form_group">
              <div class="label_container">
                <label>卡片末三碼 (CVC)</label>
                <span class="error_text" v-if="errors.creditInfo.cvc">{{ errors.creditInfo.cvc }}</span>
              </div>
                <input type="text" placeholder="123" v-model="form.creditInfo.cvc" :class="{'error_border' : errors.creditInfo.cvc}" @blur="validateField('creditInfo', 'cvc')" @input="validateField('creditInfo', 'cvc')">
            </div>
          </div>
        </div>
        <div class="payment_card" :class="{'active': form.paymentType === 'atm'}">
          <div class="payment_header">
            <label class="payment_radio">
              <input type="radio" value="atm" v-model="form.paymentType">
              <span>ATM 轉帳</span>
            </label>
          </div>
          <div class="payment_details info_box" v-if="form.paymentType === 'atm'">
            <p class="bank_notice">請將款項匯入以下帳號：</p>
            <p class="bank_code"><span>收款銀行(代碼): </span>玉山銀行 (808)</p>
            <p class="bank_account"><span>收款銀行帳號: </span>1234-5678-901234</p>
          </div>
        </div>
      </div>
    </section>
    <section class="form_section">
      <h3 class="section_title">
        <span class="icon">
          <img :src="receiptIcon" alt="">
        </span>
        發票資訊
      </h3>
      <div class="form_grid">
        <div class="form_group full_width">
          <div class="label_container">
            <label>發票類型</label>
          </div>
          <select v-model="form.invoiceType">
            <option value="personal">個人電子發票 (二聯式)</option>
            <option value="company">公司行號 (三聯式)</option>
            <option value="mobile">手機載具</option>
          </select>
        </div>
        <div class="form_group full_width" v-if="form.invoiceType === 'company'">
          <div class="label_container">
            <label>統一編號</label>
            <span class="error_text" v-if="errors.invoiceTaxId">{{ errors.invoiceTaxId }}</span>
          </div>
            <input type="text" placeholder="請輸入8碼統編" v-model="form.invoiceTaxId" :class="{'error_border' : errors.invoiceTaxId}" @blur="validateField('invoice', 'invoiceTaxId')" @input="validateField('invoice', 'invoiceTaxId')">
        </div>
        <div class="form_group full_width" v-if="form.invoiceType === 'mobile'">
          <div class="label_container">
            <label>手機條碼</label>
            <span class="error_text" v-if="errors.invoiceMobile">{{ errors.invoiceMobile }}</span>
          </div>
            <input type="text" placeholder="/ABC+123" v-model="form.invoiceMobile" :class="{'error_border' : errors.invoiceMobile}" @blur="validateField('invoice', 'invoiceMobile')" @input="validateField('invoice', 'invoiceMobile')">
        </div>
      </div>
    </section>
  </div>
</template>
<style lang="scss" scoped>
// 收件人資訊 =======
.checkout_form {
  display: flex;
  flex-direction: column;
  gap: 24px;
}

// 共用區塊樣式
.form_section {
  position: relative;
  padding: 24px;
  background-color: $white;
  border: 1px solid $gray;
  // box-shadow: $shadow;
  border-radius: $radius_md;

  .section_title {
    display: flex;
    align-items: center;
    gap: 4px;
    margin-bottom: 16px;
    @include body1(true);
    color: $primaryDark;
  }
}

// 表單grid系統
.form_grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 16px;

  .full_width {
    grid-column: 1/3;
  }
}

// 輸入框組件
.form_group {
  display: flex;
  flex-direction: column;
  gap: 6px;

  .label_container {
    display: flex;
    justify-content: space-between;
    align-items: center;
    label {
      @include body3(true);
      display: block;
    }
    .error_text {
      font-size: 13px;
      letter-spacing: 0.15em;
      color: $accent;
    }
  }
  

  input, select, textarea {
    padding: 8px 12px;
    width: 100%;
    @include body3;
    background-color: $white;
    border: 1px solid $grayDark;
    border-radius: $radius_sm;
    transition: all .3s;
    &:focus {
      border: 1px solid $primary;
      box-shadow: 0 0 0 3px rgba($primary, 0.1);
      outline: none;
    }
    &.error_border {
      &:focus {
        border-color: $accent;
        box-shadow: 0 0 0 3px rgba(255, 77, 79, 0.2);
      }
    }
  }
  textarea {
    resize: none;
    height: 80px;
  }
}

// 付款方式 =======
.payment_options {
  display: flex;
  flex-direction: column;
  gap: 16px;
  .payment_card {
    border: 1px solid $grayDark;
    border-radius: $radius_md;
    overflow: hidden;
    transition: all .3s;
    &.active {
      border-color: $primary;
      background-color: $primaryLight;
      background-color: #EEF5E7;
    }
    .payment_header {
      padding: 8px 16px;
      cursor: pointer;
      .payment_radio {
        display: flex;
        align-items: center;
        gap: 8px;
        width: 100%;
        cursor: pointer;
        input[type="radio"] {
          width: 16px;
          height: 16px;
          accent-color: $primaryDark;
          cursor: pointer;
        }
        span {
          @include body2(true);
          img.linepay {
            padding: 3px 0;
            width: 70px;
          }
        }
      }
    }
    .payment_details {
      padding: 16px;
      border-top: 1px solid $grayDark;
      background-color: $white;
      color: $black;
      &.info_box {
        p { 
          margin-bottom: 8px; 
          color: $black; 
          @include body3;
        }
        .bank_notice {
          margin-bottom: 12px;
          padding-bottom: 12px;
          border-bottom: 1px solid $gray;
        }
        .bank_code, .bank_account { 
          @include body2(true);
          color: $primaryDark; 
          span {
            @include body3;
          }
        }
      }
    }
  }
}

@media (max-width: 768px) {
  .form_grid {
    grid-template-columns: 1fr;
    
    .full_width {
      grid-column: auto;
    }
  }
}

</style>