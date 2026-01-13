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
    image: 'src/assets/images/mdc1_1.jpg',
  },
  {
    id: 2,
    name: '阿斯匹靈',
    dayEat: 2,
    oneTime: '2',
    image: 'src/assets/images/mdc1_2.jpg',
  },
  {
    id: 3,
    name: '維他命C',
    dayEat: 3,
    oneTime: '1',
    image: 'src/assets/images/mdc1_3.jpg',
  },
  {
    id: 4,
    name: '感冒藥',
    dayEat: 2,
    oneTime: '1',
    image: 'src/assets/images/mdc1_4.jpg',
  },
  {
    id: 5,
    name: '止痛藥',
    dayEat: 1,
    oneTime: '2',
    image: 'src/assets/images/mdc1_2.jpg',
  },
])
</script>

<template>
  <MedicineCardModal v-if="showModal" @closeModal="showModal = false" />
  <section class="medicine-Section">
    <SectionHeader title="我的保健品" @createClick="showModal = true" />
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
