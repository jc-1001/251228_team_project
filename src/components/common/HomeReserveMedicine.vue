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
    flex: 1;
    background: $primaryDark;
    color: $white;
    padding: 8px;
    border: none;
    border-radius: $radius_sm;
    @include subtitle2(true);
    cursor: pointer;
    transition: background 0.3s;
    &:hover {
        background-color: $white;
        color: $primaryDark;
        outline: 1px solid $primaryDark;
    
    }
  }
}
</style>
