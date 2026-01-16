<script setup>
import CheckoutItems from '@/components/checkout/CheckoutItems.vue';
import CheckoutForm from '@/components/checkout/CheckoutForm.vue';

</script>
<template>
  <!-- <h3>結帳頁</h3> -->
  <div class="checkout_page">
    <CheckoutItems/>
    <CheckoutForm/>
  </div>
</template>
<style lang="scss" scoped>
  .checkout_page {
    display: flex;
    flex-direction: column;
    gap: 24px;
  }
</style>