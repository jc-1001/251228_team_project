<script setup>
import { useRouter } from 'vue-router'
const router = useRouter()
const goToRestock = () => {
  router.push('/shop')
}
</script>
<template>
  <section class="home-reserve-medicine">
    <p class="home-reserve-medicine__subtitle">降血壓藥僅剩3天份!請盡速補貨</p>
    <div class="home-reserve-medicine__content">
      <button class="home-reserve-medicine__button" type="button " @click="goToRestock">
        前往補貨
      </button>
    </div>
  </section>
</template>
<style scoped lang="scss">
.home-reserve-medicine {
  background-color: $white;
  border-radius: 8px;
  padding: 0 24px;

  &__subtitle {
    @include body3;
    color: $primary;
    font-weight: bold;
    margin-bottom: 8px;
  }

  &__content {
    display: flex;
    justify-content: center;
  }

  &__button {
    @include body2(true);
    background-color: $primaryDark;
    width: 100%;
    color: $white;
    border: none;
    border-radius: 4px;
    padding: 8px 16px;
    cursor: pointer;
    margin: 24px 8px;

    &:hover {
      background-color: $white;
        color: $primaryDark;
    }
  }
}
</style>
