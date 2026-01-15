<script setup>
import { useCartStore } from '@/stores/cart'

const cartStore = useCartStore()
</script>
<template>
  <section class="checkout_section">
    <h3 class="section_title">
      <span class="material-symbols-rounded icon icon">shopping_bag</span>
      購買清單
    </h3>
    <ul class="item_list">
      <li v-for="item in cartStore.cartList" :key="item.id" class="item_row">
        <div class="item_img">
          <img :src="item.image" alt="item.title">
        </div>
        <div class="item_info">
          <h4 class="title">{{ item.title }}</h4>
          <p class="spec">{{ item.spec }}</p>
          <p class="price">${{ item.price }}</p>
        </div>
        <div class="item_qty">
          <p>x{{ item.qty }}</p>
        </div>
      </li>
    </ul>
  </section>
</template>
<style lang="scss" scoped>
  .checkout_section {
    padding: 24px;
    background-color: $white;
    border: 1px solid $gray;
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
    .item_list {
      display: flex;
      flex-direction: column;
      gap: 16px;
      .item_row {
        display: flex;
        align-items: center;
        gap: 12px;
        padding: 12px 0;
        border-bottom: 1px solid $gray;
        &:last-child {
          border-bottom: none;
          padding-bottom: 0;
        }
        &:first-child {
          padding-top: 0;
        }
        .item_img {
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
        .item_info {
          flex: 1;
          display: flex;
          flex-direction: column;
          gap: 6px;
          .title {
            @include body2(true);
          }
          .spec {
            @include body3;
          }
          .price {
            @include body3(true);
          }
        }
        .item_qty {
          @include body2(true);
        }
      }
    }
  }
</style>