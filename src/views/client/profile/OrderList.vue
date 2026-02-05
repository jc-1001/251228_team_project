<script setup>
import { computed, onMounted } from 'vue'
import { useRouter } from 'vue-router';
import { useOrderStore } from '@/stores/order';
import { useCartStore } from '@/stores/cart';
import { useToast } from '@/composable/useCartToast'
import { parsePublicFile } from '@/utils/parseFile';
import TheProfileHeader from '@/components/common/TheProfileHeader.vue'
import TheprofileSide from '@/components/common/TheprofileLayout.vue'

const router = useRouter()
const orderStore = useOrderStore()
const cartStore = useCartStore()
const { showToast } = useToast()

onMounted(()=>{
  orderStore.fetchUserOrders()
})

// status 訂單狀態設定
const statusStyle = {
  '訂單成立': {
    class: 'status_create',
    text: '訂單成立'
  },
  '備貨中': {
    class: 'status_pending',
    text: '備貨中'
  },
  '配送中': {
    class: 'status_delivery',
    text: '配送中'
  },
  '已完成': {
    class: 'status_completed',
    text: '已完成'
  },
  '已取消': {
    class: 'status_cancel',
    text: '已取消'
  },
}

// 查看詳情
const goToDetail = (dbId) => {
  router.push(`/order/${dbId}`)
}

// 再買一次功能
const buyAgain = (items) => {
  items.forEach(product => {
    cartStore.addToCart(product, product.qty)
  })
  showToast('已再次加入購物車！')
  router.push('/cart')
}

console.log(orderStore.orderList);

</script>

<template>
  <TheProfileHeader />
  <TheprofileSide title="我的訂單">
    <div class="empty_order" v-if="orderStore.orderList.length === 0">
      <p>目前還沒有任何訂單紀錄喔！</p>
      <router-link to="/shop" class="btn_go_shop">去商城逛逛</router-link>
    </div>
    <div class="order_list" v-else>
      <div class="order_card" v-for="order in orderStore.orderList" :key="order.id" @click="goToDetail(order.db_id)">
        <div class="card_header">
          <span :class="statusStyle[order.status]?.class || 'status_pending'">
            {{ statusStyle[order.status]?.text || order.status }}
          </span>
          <span class="order_date">{{ order.date }}</span>
        </div>
        <div class="card_body">
          <div class="product_img" v-if="order.items && order.items.length > 0">
            <img :src="parsePublicFile(order.items[0].image)" :alt="order.items[0].title">
          </div>
          <div class="product_info">
            <h4 class="title">{{ order.items[0].title }}
              <span v-if="order.items.length > 1" style="font-size: 12px; color: #888;">
                等共 {{ order.items.length }} 件商品
              </span>
            </h4>
            <p class="spec">規格：{{ order.items[0].spec }}</p>
            <p class="qty">x{{ order.items[0].qty }}</p>
          </div>
          <div class="product_price">
            ${{ order.items[0].price }}
          </div>
        </div>
        <div class="card_footer">
          <div class="total_info">
            訂單金額: ${{ order.total }}
          </div>
          <div class="action_buttons">
            <button class="btn_buy_again" @click.stop="buyAgain(order.items)">再買一次</button>
          </div>
        </div>
      </div>
    </div>
  </TheprofileSide>
</template>

<style lang="scss" scoped>
.empty_order {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 32px 0;

  p {
    margin-bottom: 40px;
    @include body2(true);
    color: $grayDark;
  }

  .btn_go_shop {
    margin-bottom: 64px;
    padding: 8px 24px;
    @include body2(true);
    color: $white;
    background-color: $primaryDark;
    border-radius: $radius-sm;
    transition: all .3s;

    &:hover {
      background-color: $primary;
    }
  }

  img {
    width: 25%;
  }
}

.order_list {
  display: flex;
  flex-direction: column;
  gap: 24px;
  padding-top: 16px;
  .order_card {
    padding: 12px 16px;
    border: 1px solid $gray;
    border-radius: $radius_sm;
    box-shadow: $shadow;
    cursor: pointer;
    transition: all .3s;
    &:hover {
      transform: translateY(-3px);
    }
    .card_header {
      display: flex;
      justify-content: space-between;
      padding-bottom: 8px;
      @include body3;
      border-bottom: 1px solid $gray;
      span[class^=status] {
        display: inline-block;
        padding: 1px 8px;
        font-weight: 600; 
        border: 1px solid $accent;
        border-radius: $radius_sm;
      }
      span.status_create { 
        color: #488EDE;
        border-color: #488EDE;
      }
      span.status_pending { 
        color: $accent;
      }
      span.status_delivery {
        color: $primary;
        border-color: $primary;
      }
      span.status_cancel {
        color: $grayDark; 
        border-color: $grayDark;
      }
    }
    .card_body {
      display: flex;
      justify-content: space-between;
      align-items: flex-end;
      gap: 12px;
      padding: 16px 0;
      @include body2;
      border-bottom: 1px solid $gray;

      .product_img {
        width: 80px;
        height: 80px;
        border-radius: $radius_sm;
        overflow: hidden;
        img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }
      }
      .product_info {
        flex: 1;
        display: flex;
        flex-direction: column;
        gap: 4px;
        .title {
          @include body2(true);
        }
        .spec {
          @include body3;
        }
      }
    }
    .card_footer {
      display: flex;
      flex-direction: column;
      align-items: flex-end;
      gap: 8px;
      padding: 12px 0;
      .total_info {
        @include body2(true);
        // color: $primaryDark;
      }
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
}
</style>
