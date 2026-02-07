<script setup>
import { computed, onMounted, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useCartStore } from '@/stores/cart'
import TheProfileHeader from '@/components/common/TheProfileHeader.vue'
import TheprofileSide from '@/components/common/TheprofileLayout.vue'
import { useToast } from '@/composable/useCartToast'
import { parsePublicFile } from '@/utils/parseFile';
import { publicApi } from '@/utils/publicApi'

// icon
import orderIcon from '@/assets/images/shop/icon/order.svg'
import inventoryIcon from '@/assets/images/shop/icon/inventory.svg'
import shipping from '@/assets/images/shop/icon/shipping.svg'
import checkIcon from '@/assets/images/shop/icon/order_check.svg'
import personIcon from '@/assets/images/shop/icon/person.svg'
import creditIcon from '@/assets/images/shop/icon/credit_card.svg'
import shoppingIcon from '@/assets/images/shop/icon/shopping_cart.svg'

const route = useRoute()
const router = useRouter()
const cartStore = useCartStore()
const { showToast } = useToast()

// 從網址抓訂單id
const currentOrderId = route.params.id

// 定義一個響應式變數來接 API 資料
const order = ref(null)

const fetchOrderDetail = async () => {
  try {
    // 會員大改1
    const profile = JSON.parse(localStorage.getItem('userProfile') || '{}')
    const memberId = profile.member_id || 0

    // 會員大改2
    const res = await publicApi.get('member_center/get_my_order_detail.php', {
      params:{
        id: currentOrderId,
        member_id: memberId
      }
    })
    // const res = await publicApi.get('member_center/get_my_order_detail.php', {params:{id: currentOrderId}})

    if(!res.data) {
      alert('找不到該筆訂單')
      router.push('/orderlist')
      return
    }
    order.value = res.data

    // 資料載入後，讓配送進度條動起來
    setTimeout(()=>{
    displayWidth.value = targetWidth.value
  },300)

  } catch (err){
    console.error(err)
    alert('讀取失敗')
  }
}


// 訂單進度
const steps = [
  { label: '訂單成立', icon: `${orderIcon}` },      
  { label: '備貨中',   icon: `${inventoryIcon}` },     
  { label: '配送中',   icon: `${shipping}` },  
  { label: '已完成',   icon: `${checkIcon}` }
]
const currentStep = computed(()=>{
  if(!order.value) return 0
  if(order.value.status === '取消') return -1
  
  const statusMap = {
    '訂單成立': 1,
    '備貨中': 2,
    '配送中': 3,
    '已完成': 4
  }

  return statusMap[order.value.status] || 1
})

const invoiceMap = {
  company: '公司統編',
  mobile: '手機載具',
  personal: '個人發票'
}

const paymentMap = {
  linepay: 'LINE Pay',
  credit: '信用卡付款',
  atm: 'ATM轉帳'
}

// 預設進度條
const displayWidth = ref('0%')

// status進度條計算
const targetWidth = computed(()=>{
  if(currentStep.value <= 1) return '0%'
  const percentage = ((currentStep.value -1)/(steps.length-1))*100
  return `${percentage}%`
})


// 再買一次
const buyAgain = ()=>{
  if(!order.value) return
  order.value.items.forEach(product => {
    cartStore.addToCart(product, product.qty)
  })
  showToast('已再次加入購物車')
  router.push('/cart')
}

onMounted(()=>{
  fetchOrderDetail()
})

</script>

<template>
  <TheProfileHeader/>

  <TheprofileSide  title="訂單詳情" :showTitle="false">
    <div class="detail_container" v-if="order">
      <div class="detail_header">
        <router-link to="/orderlist" class="back_link">
          &lt 返回我的訂單
        </router-link>
        <div class="order_info_bar">
          <h3 class="order_no">訂單編號: {{ order.id }}</h3>
          <p class="order_date">下單時間: {{ order.date }}</p>
        </div>
      </div>
      <div v-if="order.status === '已取消'" class="status_cancel_bar">
        訂單已取消
      </div>
      <div v-else class="stepper">
        <div class="line_container">
          <div class="track_line"></div>
          <div class="progress_line" :style="{ width: displayWidth }"></div>
        </div>
        <div v-for="(step, index) in steps" :key="step.label" class="step_item" :class="{ 'active' : (index + 1) <= currentStep }">
          <div class="circle">
            <span class="step_icon">
              <img :src="step.icon">
            </span>
          </div>
          <p class="label">{{ step.label }}</p>
        </div>
      </div>
      <div class="info_grid">
        <section class="info_card">
          <h4 class="title">
            <span class="icon">
              <img :src="personIcon">
            </span>收件資訊
          </h4>
          <p><strong>收件人 </strong>{{ order.user.name }}</p>
          <p><strong>電話 </strong>{{ order.user.phone }}</p>
          <p><strong>地址 </strong>{{ order.user.address }}</p>
        </section>
        <section class="info_card">
          <h4 class="title">
            <span class="icon">
              <img :src="creditIcon">
            </span>付款資訊</h4>
          <p><strong>方式 </strong>{{ paymentMap[order.paymentType] }}</p>
          <p><strong>狀態 </strong>{{ order.isPaid == 0 ? '尚未付款' : '已付款' }}</p>
          <p><strong>發票 </strong>{{ invoiceMap[order.invoiceType] }}</p>
        </section>
      </div>
      <section class="items_section">
        <h4 class="title">
          <span class="icon">
            <img :src="shoppingIcon">
          </span>商品明細
        </h4>
        <ul class="item_list">
          <li class="item_row" v-for="item in order.items" :key="item.id">
            <img :src="parsePublicFile(item.image)" alt="item.title">
            <div class="item_detail">
              <p class="title">{{ item.title }}</p>
              <p class="price">${{ item.price }}</p>
            </div>
            <div class="item_price">
              <p class="qty">x{{ item.qty }}</p>
            </div>
          </li>
        </ul>
      </section>
      <div class="summary_section">
        <div class="row">
          <span>商品總金額</span>
          <span>${{ order.items.reduce((total, item)=> total + item.price * item.qty, 0 ) }}</span>
        </div>
        <div class="row">
          <span>運費總金額</span>
          <span>${{ order.shippingFee }}</span>
        </div>
        <div v-if="order.discount > 0" class="row discount">
          <span>積分折抵</span>
          <span>-${{ order.discount }}</span>
        </div>
        <div class="row total">
          <span>總付款金額</span>
          <span class="highlight">${{ order.total }}</span>
        </div>
        <div class="actions">
          <button class="btn_buy_again" @click="buyAgain">再買一次</button>
        </div>
      </div>
    </div>
  </TheprofileSide>
</template>

<style lang="scss" scoped>
  .detail_container {
    display: flex;
    flex-direction: column;
    gap: 16px;
  }
  .detail_header {
    padding-bottom: 4px;
    border-bottom: 1px solid $gray;
    .back_link {
      display: block;
      margin-bottom: 16px;
      @include body3;
      transition: all .3s;
      &:hover {
        color: $primary;
      }
    }
    .order_info_bar {
      display: flex;
      flex-wrap: wrap;
      justify-content: space-between;
      align-items: flex-end;
      margin-bottom: 12px;
      .order_no {
        @include body1(true);
        color: $primaryDark
      }
      .order_date {
        @include body3;
      }
    }
  }
  // 訂單進度條
  .stepper {
    position: relative;
    display: flex;
    justify-content: space-between;
    margin: 20px 0 40px 0;
    .line_container {
      position: absolute;
      top: 22px;
      left: 40px; 
      right: 40px;
      height: 6px;
      z-index: 0;
    }
    // 進度線底部
    .track_line {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background-color: $gray;
      border-radius: 4px;
    }
    // 進度線
    .progress_line {
      position: absolute;
      top: 0;
      left: 0;
      height: 100%;
      background-color: #88d6ce;
      border-radius: 8px;
      transition: width .8s ease;
      z-index: 1;
    }
    .step_item {
      position: relative;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      // flex: 1;
      width: 80px;
      z-index: 2;
      .circle {
        display: flex;
        justify-content: center;
        align-items: center;
        margin-bottom: 8px;
        width: 45px;
        height: 45px;
        color: $white;
        background-color: $gray;
        border-radius: 50%;
        transition: all .3s;
        .step_icon {
          @include subtitle2;
        }
      }
      .label {
        @include body3(true);
        color: $gray;
      }
      &.active {
        .circle {
          border-color: $primary;
          background-color: $primary;
          color: white;
        }
        .label {
          color: $primaryDark;
        }
      }
    }
  }
  // 訂單取消狀態-訂單進度區
  .status_cancel_bar {
    margin-bottom: 24px;
    padding: 12px;
    color: $grayDark;
    text-align: center;
    background-color: #f5f5f5;
    border-radius: 8px;
  }
  // 訂單資訊
  .info_grid {
    display: flex;
    flex-wrap: wrap;
    gap: 12px;
    .info_card {
      flex: 1 1 350px;
      display: flex;
      flex-direction: column;
      gap: 8px;
      padding: 16px;
      border: 1px solid $gray;
      border-radius: $radius_md;
      h4.title {
        display: flex;
        align-items: center;
        gap: 4px;
        margin-bottom: 6px;
        @include body2(true);
        color: $primaryDark;
        .icon {
          width: 20px;
        }
      }
      strong {
        margin-right: 8px;
        @include body3;
        color: #666;
      }
    }
  }
  // 商品明細
  .items_section {
    display: flex;
    flex-direction: column;
    gap: 24px;
    padding: 16px;
    border: 1px solid $gray;
    border-radius: $radius_md;
    h4.title {
      display: flex;
      align-items: center;
      gap: 4px;
      @include body2(true);
      color: $primaryDark;
      .icon {
        width: 20px;
      }
    }
    .item_list {
      display: flex;
      flex-direction: column;
      gap: 16px;
      .item_row {
        display: flex;
        justify-content: space-between;
        align-items: center;
        gap: 12px;
        padding-bottom: 16px;
        &:not(:last-child) {
          border-bottom: 1px solid $gray;
        }
        img {
          width: 80px;
          height: 80px;
          object-fit: cover;
          border-radius: $radius_sm;
        }
        .item_detail {
          flex: 1;
          display: flex;
          flex-direction: column;
          gap: 4px;
        }
      }
    }
  }
  // 金額總計
  .summary_section {
    display: flex;
    flex-direction: column;
    align-self: flex-end;
    gap: 8px;
    width: 350px;
    @media (max-width: 576px) {
      width: 100%; 
    }
    .row {
      display: flex;
      justify-content: space-between;
      @include body3;
      color: #666;
      &.discount {
        color: $primary; 
        font-weight: bold;
      }
      &.total {
        display: flex;
        align-items: center;
        padding-top: 8px;
        @include body2(true);
        color: $black;
        border-top: 1px solid $gray;
        .highlight {
          color: $primary; font-size: 20px; 
          background-size: auto;
        }
      }
    }
    .actions {
      margin-top: 4px;
      align-self: flex-end;
      .btn_buy_again {
        padding: 6px 40px;
        @include body2(true);
        color: $white;
        background-color: $primaryDark;
        border: none;
        border-radius: $radius_sm;
        transition: all .3s;
        cursor: pointer;
  
        &:hover {
          background-color: $primary;
        }
      }
    }
  }
</style>
