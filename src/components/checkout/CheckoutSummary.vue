<script setup>
import { ref, computed, onMounted } from 'vue';
import { useCartStore } from '@/stores/cart';
import { publicApi } from '@/utils/publicApi';

import shoppingIcon from '@/assets/images/shop/icon/shopping_cart.svg'

const cartStore = useCartStore();

// (因為按鈕按下去，是要通知父層去送出表單)
const emit = defineEmits(['submit'])

// 模擬資料區
const shippingFee = ref(100)
const userPoint = ref(0)
const maxDiscount = computed (() => {
  if(userPoint.value <= 0) return 0

  return Math.floor(userPoint.value / 10)
})

// 抓取資料
const fetchPoint = async () => {
  try {
    const res = await publicApi.get('http://localhost:8888/unicare_api/member/get_total_points.php')

    userPoint.value = res.data.total_points
  } catch (err) {
    console.error(err)
  }
}

onMounted(() => {
  fetchPoint()
})

// 使用積分
const isUsePoints = ref(false) 


// 計算總金額
const finalTotal = computed(()=>{
  let total = cartStore.totalAmount
  total += shippingFee.value
  if(isUsePoints.value) {
    total -= maxDiscount.value
  }
  return Math.max(0, total)
})

// 通知父層-使用者按"送出訂單"了
const handleSubmit = ()=>{
  // 打包訂單資料
  const summaryData = {
    total: finalTotal.value,
    shippingFee: shippingFee.value,
    discount: isUsePoints.value ? maxDiscount.value : 0,
    userPoints: isUsePoints.value
  }

  emit('submit', summaryData)
}


</script>
<template>
  <div class="summary_card">
    <h3 class="summary_title">
      <span class="material-symbols-rounded icon">
        <img :src="shoppingIcon">
      </span>
      訂單摘要
    </h3>
    <label class="points_section">
      <div class="checkbox_wrapper">
        <input type="checkbox" v-model="isUsePoints" :disabled="userPoint <= 0">
      </div>
      <div class="points_info">
        <p class="title">使用積分折抵</p>
        <p class="subtitle">現有 {{ userPoint }} 點 (可折抵 {{ maxDiscount }} 元)</p>
      </div>
    </label>
    <div class="price_list">
      <div class="price_row">
        <span>商品總金額</span>
        <span>${{ cartStore.totalAmount }}</span>
      </div>
      <div class="price_row">
        <span>運費總金額</span>
        <span>${{ shippingFee }}</span>
      </div>
      <transition name="fade">
        <div class="price_row discount" v-if="isUsePoints">
          <span>積分折抵</span>
          <span>-${{ maxDiscount }}</span>
        </div>
      </transition>
    </div>
    <hr class="divider">
    <div class="total_row">
      <span>總付款金額</span>
      <span class="total_price">${{ finalTotal }}</span>
    </div>
    <button class="btn_submit" @click="handleSubmit">
      送出訂單
    </button>
  </div>
</template>
<style lang="scss" scoped>
.summary_card {
  padding: 24px;
  background-color: $white;
  border: 1px solid $gray;
  border-radius: $radius_md;

  position: sticky;
  top: 24px;

  .summary_title {
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

// 積分區域
.points_section {
  display: flex;
  align-items: center;
  gap: 16px;
  padding: 24px;
  background: $linear1;
  border: 1px solid $gray;
  border-radius: $radius_md;
  cursor: pointer;

  .checkbox_wrapper {
    input[type="checkbox"] {
      width: 18px;
      height: 18px;
      accent-color: $primary;
      margin-top: 2px;
      cursor: pointer;
    }
  }
  
  .points_info {
    display: flex;
    flex-direction: column;
    gap: 4px;
    color: $primaryDark;

    .title {
      @include body2(true);
    }

    .subtitle {
      @include body3;
    }
  }
}

// 金額列表
.price_list {
  display: flex;
  flex-direction: column;
  gap: 8px;
  padding: 16px 0;
  .price_row {
    display: flex;
    justify-content: space-between;
    span {
      @include body3;
    }
    &.discount :nth-child(2) {
      @include body3(true);
      color: $primary;
    }
  }
}

.divider {
  border: none;
  border-top: 1px solid $gray;
}

// 總金額
.total_row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 16px 0;
  @include body2;
  .total_price {
    @include body1(true);
    color: $primary;
  }
}

// 結帳按鈕
.btn_submit {
  width: 100%;
  height: 40px;
  border: none;
  border-radius: 5px;
  @include body2(true);
  color: $white;
  background-color: $primaryDark;
  cursor: pointer;
  transition: all .3s;

  &:hover {
    background-color: $primary;
  }

  &.disabled {
    background-color: $disabled;
    cursor: not-allowed;
  }
}

// 淡入動畫
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.4s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>