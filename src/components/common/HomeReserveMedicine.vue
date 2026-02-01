<script setup>
import { onMounted } from 'vue'
import { storeToRefs } from 'pinia'
import { useRouter } from 'vue-router'
import { useMedicineStore } from '@/stores/medicine.js'

const router = useRouter()
const goToRestock = () => {
  router.push('/shop')
}

const medicineStore = useMedicineStore()
const { lowStock, isLoading } = storeToRefs(medicineStore)
const { fetchLowStock } = medicineStore

onMounted(() => {
  fetchLowStock()
})
</script>
<template>
  <section class="home-reserve-medicine">
    <p class="home-reserve-medicine__subtitle">藥品/保健食品庫存提醒（7 天內）</p>
    <div class="home-reserve-medicine__content">
      <ul v-if="lowStock.length" class="home-reserve-medicine__list">
        <li v-for="item in lowStock" :key="item.medication_name" class="home-reserve-medicine__item">
          <span class="home-reserve-medicine__name">{{ item.medication_name }}</span>
          <span class="home-reserve-medicine__message">{{ item.message }}</span>
        </li>
      </ul>
      <p v-else-if="!isLoading" class="home-reserve-medicine__empty">目前沒有需要補貨的項目</p>
      <p v-else class="home-reserve-medicine__empty">讀取中...</p>
      <button class="home-reserve-medicine__button" type="button" @click="goToRestock">
        前往補貨
      </button>
    </div>
  </section>
</template>
<style scoped lang="scss">
.home-reserve-medicine {
  background-color: $white;
  border-radius: 8px;
  padding: 24px;

  &__subtitle {
    @include body3;
    color: $primary;
    font-weight: bold;
    margin-bottom: 16px;
  }

  &__content {
    display: grid;
    gap: 16px;
  }

  &__list {
    list-style: none;
    padding: 0;
    margin: 0;
    display: grid;
    gap: 8px;
  }

  &__item {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 12px;
    padding: 10px 12px;
    border-radius: 8px;
    background-color: $primaryLight;
  }

  &__name {
    @include body2;
    color: $primaryDark;
    font-weight: 600;
  }

  &__message {
    @include body3;
    color: $primaryDark;
  }

  &__empty {
    @include body3;
    color: $grayDark;
  }

  &__button {
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
