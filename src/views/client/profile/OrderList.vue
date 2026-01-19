<script setup>
import { computed } from 'vue'
import { useRouter } from 'vue-router';
import { useOrderStore } from '@/stores/order';
import { useCartStore } from '@/stores/cart';
import TheProfileHeader from '@/components/common/TheProfileHeader.vue'
import TheprofileSide from '@/components/common/TheprofileLayout.vue'

const router = useRouter()
const orderStore = useOrderStore()
const cartStore = useCartStore()

// status 訂單狀態設定
const statusStyle = {
  '訂單成立': {
    class: 'status_pending',
    text: '待出貨'
  },
  '已完成': {
    class: 'status_completed',
    text: '已完成'
  },
  '取消': {
    class: 'status_cancel',
    text: '已取消'
  },
}

// 查看詳情
const goToDetail = (orderId) => {
  router.push(`/order/${orderId}`)
}

// 再買一次功能
const buyAgain = (items) => {
  items.foreach(product => {
    cartStore.addToCart(product, product.qty)
  })
  alert('已將商品再次加入購物車！')
  router.push('/cart')
}

console.log(orderStore.orderList);

</script>

<template>
  <TheProfileHeader />
  <TheprofileSide title="我的訂單">
    <div class="empty_order" v-if="orderStore.orderList.length === 0">
      <p>目前還沒有任何訂單紀錄喔！</p>
      <router-link to="/shop" class="btn_go_shop">前往樂活商城</router-link>
    </div>
    <div class="order_list" v-else>
      <div class="order_card" v-for="order in orderStore.orderList" :key="order.id">
        <div class="card_header">
          <h4 class="title">{{ order.items[0].title }}<span> 等{{ order.items.length - 1 }}件商品</span></h4>
          <p class="price">${{ order.items[0].price }}</p>
        </div>
        <div class="card_footer">
          <div class="info">
            <p>{{ order.id }}</p>
            <!-- <p>{{ order.date }}</p> -->
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
  .order_card {
    padding: 16px;
    border: 1px solid $grayDark;
    border-radius: $radius_sm;
    .card_header {
      display: flex;
      justify-content: space-between;
      .title {
        @include body2(true);
      }
      .price {
        @include body2(true);
        color: $primary;
      }
    }
  }
}
</style>
