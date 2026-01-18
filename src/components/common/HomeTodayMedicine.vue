<script setup>

import { computed, onMounted } from 'vue'
import { storeToRefs } from 'pinia'
import { useMedicineStore } from '@/stores/medicine.js'

const medicineStore = useMedicineStore()
const { items } = storeToRefs(medicineStore)
const { fetchItems } = medicineStore

onMounted(() => {
  fetchItems()
})

const viewItems = computed(() =>
  items.value.map((item) => ({
    id: item.id,
    name: item.name,
    image: item.image,
    timeLabel: item.timeCourse?.[0] || '',
    tags: [item.eatTimes, item.oneTime].filter(Boolean),
  }))
)

</script>

<template>
  <section class="today-medicine">
    <div class="today-medicine__list">
      <article v-for="item in viewItems" :key="item.id" class="today-medicine__card">
        <div class="today-medicine__thumb">
          <img :src="item.image" alt="" />
        </div>
        <div class="today-medicine__content">
          <div class="today-medicine__name">{{ item.name }}</div>
          <div class="today-medicine__tags">
            <span v-for="tag in item.tags" :key="tag" class="today-medicine__tag">
              {{ tag }}
            </span>
          </div>
        </div>
        <div class="today-medicine__time">{{ item.timeLabel }}</div>
      </article>
    </div>
  </section>
</template>

<style scoped lang="scss">
.today-medicine {
  background: $white;
  border-radius: $radius_md;
  box-shadow: $shadow;
  padding: 0 32px;

  .today-medicine__list {
    display: grid;
    gap: 16px;
  }

  .today-medicine__card {
    display: grid;
    grid-template-columns: 92px 1fr auto;
    gap: 16px;
    align-items: center;
    border: 1px solid $gray;
    border-radius: $radius_md;
    background: $white;
  }

  .today-medicine__thumb {
    width: 92px;
    height: 92px;
    border-radius: $radius_sm;
    overflow: hidden;
    background: $grayLight;

    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      display: block;
    }
  }

  .today-medicine__content {
    display: grid;
    gap: 12px;
  }

  .today-medicine__name {
    @include body1;
    color: $primaryDark;
  }

  .today-medicine__tags {
    display: flex;
    flex-wrap: wrap;
    gap: 8px;
  }

  .today-medicine__tag {
    border: 1px solid $primaryDark;
    color: $primaryDark;
    border-radius: 999px;
    padding: 4px 16px;
    @include body3;
  }

  .today-medicine__time {
    background: $primaryLight;
    color: $primaryDark;
    border-radius: $radius_sm;
    padding: 8px;
    margin: 8px 24px 0 0;
    @include body1(true);
  }
}
</style>
