<script setup>
import SectionHeader from '@/views/client/Medicine/common/SectionHeader.vue'
import MedicineCard from '@/views/client/Medicine/common/MedicineCard.vue'
import { Swiper, SwiperSlide } from 'swiper/vue'
import { Navigation, EffectCards } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/effect-cards'

defineProps({
  title: {
    type: String,
    default: '',
  },
  effect: {
    type: String,
    default: 'slide',
  },
  items: {
    type: Array,
    default: () => [],
  },
  variant: {
    type: String,
    default: 'medicine',
  },
  slidesPerView: {
    type: Number,
    default: 4,
  },
  spaceBetween: {
    type: Number,
    default: 16,
  },
  loop: {
    type: Boolean,
    default: true,
  },
  navigation: {
    type: Boolean,
    default: true,
  },
  breakpoints: {
    type: Object,
    default: () => ({
      1: {
        slidesPerView: 1,
        spaceBetween: 16,
        effect: 'cards',
      },
      640: {
        slidesPerView: 2,
        spaceBetween: 16,
        effect: 'slide',
      },
      1024: {
        slidesPerView: 3,
        spaceBetween: 16,
        effect: 'slide',
      },
      1440: {
        slidesPerView: 4,
        spaceBetween: 16,
        effect: 'slide',
      },
    }),
  },
})

const emit = defineEmits(['createClick', 'showCardDetail'])
</script>

<template>
  <section class="medicine-section">
    <SectionHeader :title="title" @createClick="emit('createClick')" />
    <Swiper
      :modules="[Navigation, EffectCards]"
      :slides-per-view="slidesPerView"
      :space-between="spaceBetween"
      :loop="loop"
      :navigation="navigation"
      :breakpoints="breakpoints"
      :effect="effect"
      class="medicine-swiper"
    >
      <SwiperSlide v-for="item in items" :key="item.id">
        <MedicineCard
          :item="item"
          :variant="variant"
          @showCardDetail="emit('showCardDetail', item)"
        />
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
