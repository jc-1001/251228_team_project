<script setup>
import CheckoutItems from '@/components/checkout/CheckoutItems.vue'
import CheckoutForm from '@/components/checkout/CheckoutForm.vue'
import CheckoutSummary from '@/components/checkout/CheckoutSummary.vue'

</script>
<template>
  <!-- <h3>結帳頁</h3> -->
  <div class="checkout_page">
    <div class="breadcrumb">
      <router-link :to="'/cart'" class="breadcrumb_location">&lt 返回購物車</router-link>
    </div>
    <h3 class="checkout_page_title">填寫資料與結帳</h3>
    <div class="checkout_container">
      <section class="checkout_info">
        <CheckoutItems />
        <CheckoutForm />
      </section>
      <section class="checkout_summary">
        <CheckoutSummary />
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