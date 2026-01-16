<script setup>
import { ref } from 'vue'

const form = ref({
  user: {
    name: '',
    phone: '',
    email: '',
    address: '',
  },
  note: '',
  paymentType: 'credit', // 預設信用卡
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
</script>
<template>
  <div class="checkout_form">
    <section class="form_section">
      <h3 class="section_title">
        <span class="material-symbols-rounded icon">person</span>
        收件人資訊
      </h3>
      <div class="form_grid">
        <div class="form_group">
          <label for="name">姓名</label>
          <input type="text" id="name" placeholder="請輸入真實姓名" v-model="form.user.name">
        </div>
        <div class="form_group">
          <label for="phone">手機號碼</label>
          <input type="text" id="phone" placeholder="09xx-xxx-xxx" v-model="form.user.phone">
        </div>
        <div class="form_group full_width">
          <label for="email">電子信箱</label>
          <input type="text" id="email" placeholder="example@email.com" v-model="form.user.email">
        </div>
        <div class="form_group full_width">
          <label for="address">地址</label>
          <input type="text" id="address" placeholder="請輸入詳細地址" v-model="form.user.address">
        </div>
        <div class="form_group full_width">
          <label for="note">備註</label>
          <textarea id="note" placeholder="請輸入備註事項" rows="3" v-model="form.note"></textarea>
        </div>
      </div>
    </section>
    <section class="form_section">
      <h3 class="section_title">
        <span class="material-symbols-rounded icon">credit_card</span>
        付款方式
      </h3>
      <div class="payment_options">
        <div class="payment_card" :class="{'active': form.paymentType === 'credit'}">
          <div class="payment_header">
            <label class="payment_radio">
              <input type="radio" value="credit" v-model="form.paymentType">
              <span>信用卡 / 金融卡</span>
            </label>
          </div>
          <div class="payment_details form_grid" v-if="form.paymentType === 'credit'">
            <div class="form_group full_width">
              <label>卡號</label>
              <input type="text" placeholder="0000 0000 0000 0000" v-model="form.creditInfo.cardNumber">
            </div>
            <div class="form_group">
              <label>有效期限 (MM/YY)</label>
              <input type="text" placeholder="MM/YY" v-model="form.creditInfo.expiry">
            </div>
            <div class="form_group">
              <label>卡片末三碼 (CVC)</label>
              <input type="text" placeholder="123" v-model="form.creditInfo.cvc">
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
        <span class="material-symbols-rounded icon">receipt_long</span>
        發票資訊
      </h3>
      <div class="form_grid">
        <div class="form_group full_width">
          <label>發票類型</label>
          <select v-model="form.invoiceType">
            <option value="personal">個人電子發票 (二聯式)</option>
            <option value="company">公司行號 (三聯式)</option>
            <option value="mobile">手機載具</option>
          </select>
        </div>
        <div class="form_group full_width" v-if="form.invoiceType === 'company'">
          <label>統一編號</label>
          <input type="text" placeholder="請輸入8碼統編" v-model="form.invoiceTaxId">
        </div>
        <div class="form_group full_width" v-if="form.invoiceType === 'mobile'">
          <label>手機條碼</label>
          <input type="text" placeholder="/ABC+123" v-model="form.invoiceMobile">
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

    .icon {
      @include subtitle2;
    }
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

  label {
    @include body3(true);
    display: block;
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