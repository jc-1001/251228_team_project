<script setup>
import { ref, computed } from 'vue'
import QuantitySelector from '@/components/shop/QuantitySelector.vue'
// 引入pinia的store
import { useCartStore } from '@/stores/cart'
import { useToast } from '@/composable/useCartToast';

import checkCircleIcon from '@/assets/images/shop/icon/check_circle.svg'
import warningIcon from '@/assets/images/shop/icon/warning.svg'
import lineIcon from '@/assets/images/shop/line_icon.png'

// sweetalert2
const { showToast } = useToast()

const props = defineProps({
  product: {
    type: Object,
    required: true,
    default: () => ({})
  }
})

// 啟用store
const cartStore = useCartStore()

// 用來暫存使用者目前選擇數量(不會直接存入qty)
const buyCount = ref(1)

// 庫存警示判斷
const isLowStock = computed(()=>{
  const stock = props.product.stock_quantity
  return stock > 0 && stock <= 3 
})

// 售完判斷
const isSoldOut = computed(()=>{
  return props.product.stock_quantity === 0
})

// 接收加入購物車函式
const handleAddToCart = ()=>{
  cartStore.addToCart(props.product, buyCount.value)
  
  showToast()
}

// 處理暫存購買數量
const handleAdd = ()=> {
  if( buyCount.value < props.product.stock_quantity ) {
    buyCount.value ++
  }
}

const handleMinus = ()=> {
  if( buyCount.value > 1 ) {
    buyCount.value --
  }
}

// 分享到 LINE
const shareToLine = () => {
  // 分享的文字內容
  const productName = props.product.title
  const productPrice = props.product.price

  // 組合成文案
  const text = `好物推薦：${productName}\n優惠價：$${productPrice}，快來看看吧！\n`

  // 拿到目前頁面的完整網址
  const currentUrl = window.location.href
  
  // LINE官方規定的分享網址格式
  const lineShareUrl = `https://social-plugins.line.me/lineit/share?text=${encodeURIComponent(text + currentUrl)}`
  
  // 開啟一個分享視窗 (寬500, 高500)
  window.open(lineShareUrl, '_blank', 'width=500,height=500')
}

</script>
<template>
  <div class="product_body">
    <div class="product_content">
      <div class="product_txt">
        <div class="info_wrapper">
          <p v-if="product.tag" class="product_tag">{{ product.tag }}</p>
          <button class="btn_share_line" @click="shareToLine">
            <img :src="lineIcon" alt="line" width="24">
            <span>分享</span>
          </button>
        </div>
        <h3 class="product_title">{{ product.title }}</h3>
        <p class="product_desc">{{ product.description }}</p>
      </div>
      <div class="product_price_info">
        <p>價格: <span class="product_price">${{ product.price }}</span></p>
        <p class="point_reminder">
          <span class="point_remind_icon">
            <img :src="checkCircleIcon">
          </span>本商品符合積分折抵資格(結帳時使用)
        </p>
      </div>
    </div>
    <div class="product_action">
      <p v-if="isLowStock" class="stock_warning">
        <span class="warning_icon">
          <img :src="warningIcon">
        </span>
        庫存量剩餘: {{ product.stock_quantity }}
      </p>
      <div class="action_row">
        <QuantitySelector :qty="buyCount" @add="handleAdd" @minus="handleMinus"/>
        <button type="button" class="btn_add_to_cart" :disabled="isSoldOut" :class="{'disabled':isSoldOut}" @click="handleAddToCart">{{ isSoldOut ? '補貨中':'加入購物車' }}</button>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.product_body {
  flex: 1 1 200px;
  display: flex;
  flex-direction: column;
  gap: 8px;
  @media (max-width: 1200px) {
    flex: 1 1 500px;
  }
  .product_content {
    display: flex;
    flex-direction: column;
    gap: 32px;
    .product_txt {
      display: flex;
      flex-direction: column;
      align-items: flex-start;
      gap: 8px;
      .info_wrapper {
        width: 100%;
        display: flex;
        justify-content: space-between;
        align-items: center;
        .product_tag {
          padding: 2px 8px;
          @include body3;
          color: $white;
          background-color: $accent;
          border-radius: $radius-sm;
        }
        .btn_share_line {
          display: flex;
          gap: 4px;
          padding: 2px 8px;
          @include body3(true);
          color: $white;
          background-color: #06C755;
          border: none;
          border-radius: $radius_sm;
          cursor: pointer;
        }
      }
      .product_title {
        margin-bottom: 12px;
        @include title2;
        color: $primaryDark;
        @media (max-width: 575px) {
          @include subtitle1(true);
        }
      }
      .product_desc {
        @include body2;
      }
    }
    .product_price_info {
      display: flex;
      flex-direction: column;
      gap: 8px;
      margin-bottom: 40px;
      padding: 16px 24px;
      color: $primaryDark;
      background: $linear1;
      border: 1px solid $gray;
      border-radius: $radius-md;
      .product_price {
        @include subtitle1(true);
      }
      .point_reminder {
        display: flex;
        align-items: center;
        @include body3(true);
        .point_remind_icon {
          @include body1;
          margin-right: 4px;
        }
      }
    }
  }
  .product_action {
    .stock_warning {
      display: flex;
      align-items: center;
      margin-bottom: 4px;
      @include body3;
      color: $accent;
      .warning_icon {
        margin-right: 4px;
        font-size: 15px;
      }
    }
    .action_row {
      display: flex;
      gap: 8px;
      flex-wrap: wrap;
      .btn_add_to_cart {
        flex: 2;
        padding: 8px 32px;
        border: none;
        border-radius: $radius-sm;
        color: $white;
        background-color: $primaryDark;
        @include body2(true);
        transition: all .3s;
        cursor: pointer;
        &:hover {
          background-color: $primary;
        }
        &.disabled {
          background-color: $disabled;
          cursor: not-allowed;
        }
      }
    }
  }
}
</style>