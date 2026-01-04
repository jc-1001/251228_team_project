<template>
  <div class="medicine-section">
    <div class="container">
      <div class="medicine-header">
        <h2>藥品專區</h2>
        <button>新增/修改</button>
      </div>
      <!-- Swiper 輪播的部分 -->
      <div class="swiper-container">
        <Swiper
          :modules="[Navigation, Pagination]"
          :slides-per-view="4"
          :space-between="32"
          :loop="true"
          navigation
          pagination
          class="medicine-swiper"
        >
          <SwiperSlide v-for="item in items" :key="item.id">
            <div class="card">
              <div class="medicine-img">
                <img src="https://picsum.photos/id/310/299/300" alt="" />
              </div>
              {{ item.name }}
              <span class="nexttime">下次服用時間：{{ item.nexttime }}</span>
              <div class="label">
                <span class="effect">{{ item.effect }}</span>
                <span class="dayeat">每日:{{ item.dayEat }}次</span>
                <span class="onetime">一次:{{ item.oneTime }}粒</span>
              </div>
            </div>
          </SwiperSlide>
        </Swiper>
      </div>
    </div>
  </div>
</template>

<script setup>
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
    nexttime: '08:00',
    effect: '降血壓',
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

<style scoped lang="scss">
* {
  box-sizing: border-box;
}
.container {
  max-width: 1280px;
  margin: 0 auto;
  padding: 0 16px;
}
.medicine-swiper {
  background-color: $primaryLight;
  padding: 0 48px;
  .card {
    width: 310px;
    display: flex;
    flex-direction: column;
    align-items: center;
    background: #fff;
    border-radius: $radius_md;
    gap: 32px;
    // margin: 45px;
    image {
      width: 100%;
      height: auto;
    }
    .nexttime {
      @include body2;
      color: $primaryDark();
    }
    .label {
      display: flex;
      justify-content: center;
      align-items: center;
      margin: 16px auto;
      span {
        color: $primaryDark;
        @include body3;
        border: 1px solid $primaryDark;
        border-radius: 100px;
        padding: 2px 16px;
      }
    }
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
