<script setup>
import { computed } from 'vue'
import { useRouter } from 'vue-router';
import { useCartStore } from '@/stores/cart';
import QuantitySelector from '@/components/shop/QuantitySelector.vue'
import cartEmptyPic from '@/assets/images/shop/cart_empty_draw.svg'
import ErrorMessageModal from '@/components/common/client/modals/ErrorMessageModal.vue';

const router = useRouter()
const cartStore = useCartStore()

// 移除商品
const handleRemove = (id) => {
  cartStore.removeProduct(id)
}

// 更新商品數量
const handleUpdateQty = (id, num) => {
  cartStore.updateQty(id, num)
}

// 全選/全不選商品
const isAllSelected = computed({
  get: () => {
    return cartStore.cartList.every(item => item.checked)
  },
  set: (val) => {
    cartStore.setAllChecked(val)
  }
})

// 判斷能不能進到結帳頁
const goCheckout = () => {
  if(cartStore.checkoutList.length < 1) {
    alert('請先勾選商品再進行結帳')
  } else {
    router.push('/checkout')
  }
}


</script>
<template>
  <div class="cart_page">
    <div class="breadcrumb">
      <router-link :to="'/shop'" class="breadcrumb_location" v-if="cartStore.cartList.length > 0">&lt 繼續購物</router-link>
    </div>
    <h3 class="cart_page_title" v-if="cartStore.cartList.length > 0">我的購物車</h3>
    <section class="cart_container">
      <header class="cart_row cart_header" v-if="cartStore.cartList.length > 0">
        <div class="col_check">
          <input type="checkbox" v-model="isAllSelected">
        </div>
        <div class="col_product">商品</div>
        <div class="col_price">單價</div>
        <div class="col_qty">數量</div>
        <div class="col_subtotal">小計</div>
        <div class="col_action">操作</div>
      </header>

      <ul class="cart_list" v-if="cartStore.cartList.length > 0">
        <li v-for="item in cartStore.cartList" :key="item.id" class="cart_row cart_item">
          <div class="col_check">
            <input type="checkbox" v-model="item.checked">
          </div>
          <div class="col_img">
            <img :src="item.image" :alt="item.title">
          </div>
          <div class="col_info">
            <h3 class="product_title">{{ item.title }}</h3>
            <p class="product_spec">{{ item.spec }}</p>
          </div>
          <div class="col_price">
            <p>${{ item.price }}</p>
          </div>
          <div class="col_qty">
            <QuantitySelector :qty="item.qty" @add="handleUpdateQty(item.id, item.qty + 1)"
              @minus="handleUpdateQty(item.id, item.qty - 1)" />
          </div>
          <div class="col_subtotal">
            <p>${{ item.price * item.qty }}</p>
          </div>
          <div class="col_action">
            <button type="button" class="btn_delete" @click="handleRemove(item.id)">
              <span class="material-symbols-rounded">delete</span>
            </button>
          </div>
        </li>
      </ul>
      <footer class="cart_footer" v-if="cartStore.cartList.length > 0">
        <div class="cart_select_all">
          <input type="checkbox" id="selectAll" v-model="isAllSelected">
          <label for="selectAll">全選 ({{cartStore.cartList.filter(i => i.checked).length}})</label>
        </div>
        <div class="cart_total_info">
          <span class="total_label">總金額</span>
          <span class="total_price">${{ cartStore.totalAmount }}</span>
        </div>
        <div class="checkout_action">
          <button type="button" class="btn_checkout" @click="goCheckout">結帳</button>
        </div>
      </footer>
      <!-- 空購車提示畫面 -->
      <div class="cart_empty_info" v-else>
        <p>購物車內沒有商品，快來樂活商城逛逛吧!</p>
        <router-link :to="'/shop'" class="btn_go_shop">前往樂活商城</router-link>
        <img :src="cartEmptyPic" alt="購物車內沒有商品提示插圖">
      </div>
    </section>
  </div>
</template>
<style lang="scss" scoped>
.cart_page {
  .breadcrumb_location {
    display: inline-block;
    margin-bottom: 12px;
    @include body3;
    transition: all .3s;

    &:hover {
      color: $primary;
    }
  }

  .cart_page_title {
    margin-bottom: 16px;
    @include subtitle1(true);
    color: $primaryDark;
  }

  .cart_container {
    .cart_row {
      display: grid;
      grid-template-columns: 50px 100px 1fr 1fr 1fr 1fr 80px;
      align-items: center;
      gap: 12px;
      text-align: center;
      padding: 16px 24px;
      background-color: $white;
      border: 1px solid $gray;
      border-radius: $radius_md;

      .col_check {
        display: flex;
        justify-content: center;
      }

      &.cart_header {
        margin-bottom: 16px;

        .col_product {
          grid-column: 2/4;
          text-align: left;
        }
      }
    }

    .cart_list {
      .cart_item {
        margin-bottom: 12px;

        .col_img img {
          width: 80px;
          height: 80px;
          object-fit: cover;
          border-radius: $radius_sm;
        }

        .col_info {
          padding-left: 8px;
          text-align: left;

          .product_title {
            margin-bottom: 4px;
            @include body2(true);
          }

          .product_spec {
            @include body3;
            color: $grayDark;
          }
        }

        .col_qty {
          margin: 0 auto;
        }

        .col_subtotal p {
          color: $primary;
          font-weight: bold;
        }

        .btn_delete {
          color: $primaryDark;
          background: none;
          border: none;
          cursor: pointer;

          &:hover {
            color: $accent;
          }
        }
      }
    }

    .cart_footer {
      display: flex;
      align-items: center;
      gap: 16px;
      margin-top: 16px;
      padding: 16px 40px;
      background-color: $white;
      border: 1px solid $gray;
      border-radius: $radius_md;
      @media (max-width: 1024px) {
        padding: 16px 22px;
      }

      .cart_select_all {
        flex: 3;
        display: flex;
        align-items: center;
        gap: 8px;
        text-align: left;
        cursor: pointer;

        input {
          cursor: pointer;
        }

        label {
          @include body3(true);
          color: $black;
          cursor: pointer;
        }
      }

      .cart_total_info {
        flex: 1;
        display: flex;
        flex-direction: column;
        align-items: flex-end;
        gap: 2px;

        .total_label {
          @include body3;
          color: $grayDark;
          @media (max-width: 576px) {
            display: none;
          }
        }

        .total_price {
          @include subtitle2(true);
          color: $primary;
          @media (max-width: 576px) {
            @include body1(true);
          }
        }
      }

      .checkout_action {
        .btn_checkout {
          width: 100%;
          padding: 8px 40px;
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
          @media (max-width: 576px) {
            padding: 8px 24px;
          }
        }
      }
    }

    .cart_empty_info {
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
        @media (max-width: 768px) {
          width: 50%;
        }
        @media (max-width: 576px) {
          width: 60%;
        }
      }
    }
  }
}

input[type="checkbox"] {
  width: 18px;
  height: 18px;
  accent-color: $primary;
  cursor: pointer;
}

// rwd
@media (max-width: 768px) {
  .cart_container {

    .cart_header {
      display: none !important;
    }

    .cart_row.cart_item {
      grid-template-columns: 1fr 2fr 8fr 2fr !important;
      grid-template-rows: auto auto auto;
      gap: 12px !important;
      padding: 16px !important;

      .col_check {
        grid-column: 1 / 2;
        grid-row: 1 / 4;
        justify-self: center;
      }

      .col_img {
        grid-column: 2 / 3;
        grid-row: 1 / 4;

        img {
          width: 90px;
          height: 90px;
        }
      }

      .col_info {
        grid-column: 3 / 5;
        grid-row: 1 / 2;
        padding-left: 0 !important;

        .product_title {
          font-size: 16px;
          font-weight: bold;
        }
      }

      .col_price {
        display: none;
      }

      .col_subtotal {
        grid-column: 3 / 5;
        grid-row: 2 / 3;
        text-align: left;

        p {
          font-size: 18px;
          margin: 4px 0;
        }
      }

      .col_qty {
        grid-column: 3 / 4;
        grid-row: 3 / 4;
        margin: 0 !important;
        justify-self: start;
      }

      .col_action {
        grid-column: 4 / 5;
        grid-row: 3 / 4;
        align-self: center;
      }
    }
  }
}
@media (max-width: 576px) {
  .cart_container {
    .cart_row.cart_item {
      grid-template-columns: 1fr 5fr 8fr 2fr !important;
    }
  }
}
</style>