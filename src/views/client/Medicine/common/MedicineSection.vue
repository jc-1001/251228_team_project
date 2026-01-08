<script setup>
import SectionHeader from '@/views/client/Medicine/common/SectionHeader.vue'
import MedicineCard from '@/views/client/Medicine/common/MedicineCard.vue'
import MedicineCardModal from '@/components/common/client/modals/MedicineCardModal.vue'
const showModal = ref(false)
import { ref } from 'vue'
import { Swiper, SwiperSlide } from 'swiper/vue'
import { Navigation, Pagination } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'

const items = ref([
  {
    id: 1,
    name: '脈優',
    dayEat: 1,
    oneTime: '1',
  },
  { id: 2, name: 'Product B' },
  { id: 3, name: 'Product C' },
  { id: 4, name: 'Product D' },
  { id: 5, name: 'Product E' },
  { id: 6, name: 'Product F' },
])
</script>

<template>
  <MedicineCardModal v-if="showModal" @close="showModal = false" />
  <section class="medicine-Section">
      <SectionHeader 
      title="藥品專區"
      @createClick="showModal = true"
      />
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

.swiper-slide{
  display: flex;
  justify-content: center;
  align-items: center;
}
.medicine-swiper {
  background-color: $primaryLight;
  padding: 48px 24px;
  box-shadow: $shadowDark;
  border-radius: $radius_md;
  }
  :deep(.swiper-button-next),
  :deep(.swiper-button-prev) {
    top: 50%;
    transform: translateY(-50%);
    color: $primaryDark;
    position: absolute;
  }

</style>

