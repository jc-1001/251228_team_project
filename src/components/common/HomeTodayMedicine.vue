<script setup>
import { computed, onMounted } from 'vue'
import { storeToRefs } from 'pinia'
import { useMedicineStore } from '@/stores/medicine.js'

const medicineStore = useMedicineStore()
const { todaySchedule, isLoading } = storeToRefs(medicineStore)
const { fetchTodaySchedule } = medicineStore

const timeSlotLabel = (slot) => {
  const map = {
    MORNING: '早上',
    NOON: '中午',
    AFTERNOON: '下午',
    EVENING: '晚上',
    BEDTIME: '睡前',
  }
  return map[slot] || slot
}

const instructionLabel = (instruction) => {
  const map = {
    BEFORE_MEAL: '餐前',
    AFTER_MEAL: '餐後',
    ANY: '不拘',
    BEDTIME: '睡前',
  }
  return map[instruction] || instruction
}

const timeOrder = {
  MORNING: 1,
  NOON: 2,
  EVENING: 3,
  BEDTIME: 4,
}

const viewItems = computed(() =>
  [...todaySchedule.value]
    .sort((a, b) => (timeOrder[a.time_slot] ?? 99) - (timeOrder[b.time_slot] ?? 99))
    .map((item, index) => ({
      id: `${item.medication_id}-${item.time_slot}-${index}`,
      name: item.medication_name,
      image: item.image,
      timeLabel: timeSlotLabel(item.time_slot),
      instruction: instructionLabel(item.instruction),
      doseQty: item.dose_qty ?? '',
    })),
)

onMounted(() => {
  fetchTodaySchedule()
})
</script>

<template>
  <section class="today-medicine">
    <div class="today-medicine__list">
      <article v-for="item in viewItems" :key="item.id" class="today-medicine__card">
        <div class="today-medicine__thumb">
          <img v-if="item.image" :src="item.image" alt="" />
          <div v-else class="today-medicine__thumb--empty">無圖片</div>
        </div>
        <div class="today-medicine__content">
          <div class="today-medicine__name">{{ item.name }}</div>
          <div class="today-medicine__tags">
            <span class="today-medicine__tag">{{ item.instruction }}</span>
            <span class="today-medicine__tag">一次 {{ item.doseQty }} 份</span>
          </div>
        </div>
        <div class="today-medicine__time">{{ item.timeLabel }}</div>
      </article>
      <p v-if="!isLoading && !viewItems.length" class="today-medicine__empty">目前沒有今日用藥</p>
      <p v-else-if="isLoading" class="today-medicine__empty">讀取中...</p>
    </div>
  </section>
</template>

<style scoped lang="scss">
.today-medicine {
  background-color: $white;
  border-radius: 8px;
  padding: 0 24px 24px 24px;

  .today-medicine__list {
    display: grid;
    gap: 16px;
    max-height: 220px;
    overflow: auto;
  }

  .today-medicine__card {
    display: grid;
    grid-template-columns: 80px 1fr auto;
    gap: 16px;
    align-items: center;
    border: 1px solid $gray;
    border-radius: $radius_md;
    background: $white;
  }

  .today-medicine__thumb {
    width: 80px;
    height: 80px;
    border-radius: $radius_sm;
    overflow: hidden;
    background: $grayLight;
    display: grid;
    place-items: center;

    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      display: block;
    }
  }

  .today-medicine__thumb--empty {
    @include body3;
    color: $grayDark;
  }

  .today-medicine__content {
    display: grid;
    gap: 12px;
  }

  .today-medicine__name {
    @include body1(true);
    color: $primaryDark;
    font-size: 14px;
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
    padding: 2px 8px;
    @include body3;
    font-size: 12px;
  }

  .today-medicine__time {
    background: $primaryLight;
    color: $primaryDark;
    border-radius: $radius_sm;
    padding: 8px;
    margin: 8px;
    @include body1(true);
    font-size: 12px;
  }

  .today-medicine__empty {
    @include body3;
    color: $grayDark;
  }
}
</style>
