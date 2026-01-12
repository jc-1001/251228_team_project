<script setup>
import SectionHeader from '@/views/client/Medicine/common/SectionHeader.vue'
import MedicineCard from '@/views/client/Medicine/common/MedicineCard.vue'
import MedicineCardModal from '@/components/common/client/modals/MedicineCardModal.vue'
import { storeToRefs } from 'pinia'
import { ref, onMounted } from 'vue'
import { useMedicineStore } from '@/stores/medicine.js'
import { Swiper, SwiperSlide } from 'swiper/vue'
import { Navigation } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'

const showModal = ref(false)

const medicineStore = useMedicineStore()
const { items } = storeToRefs(medicineStore)
const { fetchItems } = medicineStore

onMounted(() => {
  fetchItems()
})

</script>

<template>
  <MedicineCardModal v-if="showModal" @closeModal="showModal = false" />
  <section class="medicine-Section">
    <SectionHeader title="我的藥品" @createClick="showModal = true" />
    <Swiper
      :modules="[Navigation]"
      :slides-per-view="4"
      :space-between="16"
      :loop="true"
      navigation
      class="medicine-swiper"
    >
      <SwiperSlide v-for="item in items" :key="item.id">
        <MedicineCard :item="item" />
      </SwiperSlide>
    </Swiper>
  </section>
</template>

<style scoped lang="scss">
.medicine-swiper {
  background-color: $primaryLight;
  padding: 48px 24px;
  box-shadow: $shadowDark;
  border-radius: $radius_md;
  .swiper-slide {
    display: flex;
    justify-content: center;
    align-items: center;
  }
  :deep(.swiper-button-next),
  :deep(.swiper-button-prev) {
    top: 50%;
    transform: translateY(-50%);
    color: $primaryDark;
    position: absolute;
  }
}
</style>
