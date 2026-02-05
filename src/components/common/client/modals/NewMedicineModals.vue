<script setup>
import { computed, onMounted, ref } from 'vue'
import { storeToRefs } from 'pinia'
import { useMedicineStore } from '@/stores/medicine.js'

const activeTab = ref(0)
const tabs = [
  { key: 'MORNING', label: '早上' },
  { key: 'NOON', label: '中午' },
  { key: 'EVENING', label: '晚上' },
  { key: 'BEDTIME', label: '睡前' },
]

const medicineStore = useMedicineStore()
const { scheduleItems, isLoading } = storeToRefs(medicineStore)
const { fetchScheduleItems, createMedicationRecords, fetchTodaySchedule } = medicineStore

onMounted(() => {
  fetchScheduleItems()
})

const currentTabKey = computed(() => tabs[activeTab.value]?.key)
const visibleItems = computed(() =>
  scheduleItems.value.filter((item) => item.time_slot === currentTabKey.value)
)

const selectedIds = ref(new Set())
const toggleChecked = (item) => {
  if (item.taken_today) return
  if (selectedIds.value.has(item.schedule_id)) {
    selectedIds.value.delete(item.schedule_id)
  } else {
    selectedIds.value.add(item.schedule_id)
  }
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

const todayLabel = computed(() => {
  const now = new Date()
  const y = now.getFullYear()
  const m = String(now.getMonth() + 1).padStart(2, '0')
  const d = String(now.getDate()).padStart(2, '0')
  return `${y}/${m}/${d}`
})

const emit = defineEmits(['close'])
const closeModal = () => {
  emit('close')
}
const onOverlayClick = () => {
  closeModal()
}
const onKeydown = (event) => {
  if (event.key === 'Escape') {
    closeModal()
  }
}

const handleSubmit = async () => {
  const ids = Array.from(selectedIds.value)
  if (!ids.length) return
  try {
    await createMedicationRecords(ids)
    selectedIds.value.clear()
    await fetchScheduleItems()
    await fetchTodaySchedule()
    closeModal()
  } catch (error) {
    console.error('Failed to create records:', error)
  }
}
</script>

<template>
  <div class="new-medicine__overlay" @click="onOverlayClick" @keydown="onKeydown" tabindex="0">
    <div class="new-medicine__modal" @click.stop>
      <header class="new-medicine__header">
        <h2 class="new-medicine__title">記錄服藥</h2>
        <button class="new-medicine__close" @click="closeModal" type="button" aria-label="Close">
          <span class="material-symbols-outlined">close</span>
        </button>
        <p class="new-medicine__date">今日：{{ todayLabel }}</p>
      </header>

      <div class="new-medicine__tabs">
        <button
          v-for="(tab, index) in tabs"
          :key="tab.key"
          type="button"
          class="new-medicine__tab"
          :class="{ 'is-active': activeTab === index }"
          @click="activeTab = index"
        >
          {{ tab.label }}
        </button>
      </div>

      <div class="new-medicine__content">
        <div
          v-for="item in visibleItems"
          :key="item.schedule_id"
          class="new-medicine__item"
          @click="toggleChecked(item)"
          :class="{ 'is-disabled': item.taken_today }"
          role="button"
          tabindex="0"
          @keydown.enter="toggleChecked(item)"
          @keydown.space.prevent="toggleChecked(item)"
        >
          <div class="new-medicine__thumb">
            <img v-if="item.image" :src="item.image" alt="" />
          </div>
          <div class="new-medicine__info">
            <div class="new-medicine__name">{{ item.medication_name }}</div>
            <div class="new-medicine__chips">
              <span class="new-medicine__chip">{{ instructionLabel(item.instruction) }}</span>
              <span class="new-medicine__chip">一次 {{ item.dose_qty }} 份</span>
            </div>
          </div>
          <div
            class="new-medicine__status"
            :class="{ 'is-checked': selectedIds.has(item.schedule_id), 'is-disabled': item.taken_today }"
          >
            <span v-if="selectedIds.has(item.schedule_id)" class="material-symbols-outlined">check</span>
          </div>
        </div>
        <p v-if="!isLoading && !visibleItems.length" class="new-medicine__empty">此時段沒有用藥</p>
        <p v-else-if="isLoading" class="new-medicine__empty">讀取中...</p>
      </div>

      <button class="new-medicine__submit" type="button" @click="handleSubmit">送出</button>
    </div>
  </div>
</template>

<style scoped lang="scss">
@import url('https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200');
.new-medicine__overlay {
  position: fixed;
  inset: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
  overflow-y: auto;

  .new-medicine__modal {
    background-color: $white;
    padding: 24px;
    border-radius: 12px;
    width: 400px;
    height: min(667px, 70vh);
    position: relative;
    display: grid;
    grid-template-rows: auto auto 1fr auto;
    gap: 12px;
    box-shadow: $shadowDark;
  }

  .new-medicine__header {
    display: grid;
    gap: 6px;
    text-align: center;
  }

  .new-medicine__title {
    @include subtitle1(true);
    margin: 8px 0 0;
    color: $primaryDark;
  }

  .new-medicine__date {
    color: $black;
    @include body2;
    margin-bottom: 16px;
  }

  .new-medicine__close {
    @include closeButton;
    padding-top: 5px;
  }

  .new-medicine__tabs {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 10px;
  }

  .new-medicine__tab {
    flex: 1;
    padding: 4px 0;
    border-radius: 30px;
    @include body1(true);
    border: 1px solid $primaryDark;
    background: $white;
    color: $primaryDark;
    text-align: center;
    cursor: pointer;
    transition: all 0.3s;
    &.is-active {
      background: $primaryDark;
      color: $white;
    }
  }

  .new-medicine__content {
    gap: 12px;
    overflow: auto;
    padding-right: 4px;
  }

  .new-medicine__item {
    display: grid;
    grid-template-columns: 72px 1fr auto;
    max-height: 120px;
    gap: 12px;
    padding: 12px;
    border: 1px solid $gray;
    border-radius: 12px;
    align-items: center;
    background-color: $white;
  }
  .new-medicine__item.is-disabled {
    opacity: 0.55;
    cursor: not-allowed;
  }

  .new-medicine__thumb {
    width: 72px;
    height: 72px;
    border-radius: 8px;
    overflow: hidden;
    background-color: $grayLight;

    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      display: block;
    }
  }

  .new-medicine__info {
    display: grid;
    gap: 8px;
  }

  .new-medicine__name {
    color: $primaryDark;
    font-weight: 600;
  }

  .new-medicine__chips {
    display: flex;
    gap: 8px;
    flex-wrap: wrap;
  }

  .new-medicine__chip {
    padding: 2px 12px;
    border-radius: 999px;
    border: 1px solid $primaryDark;
    color: $primaryDark;
    font-size: 12px;
  }

  .new-medicine__status {
    width: 28px;
    height: 28px;
    border-radius: 50%;
    border: 2px solid $gray;
    display: grid;
    place-items: center;
    color: $white;
    background: $grayLight;
    &:hover {
      color: $white;
      background-color: $primary;
      border: 1px solid $primary;
    }
    &.is-checked {
      background: $primaryDark;
      border-color: $primaryDark;
    }
    &.is-disabled {
      background: $gray;
      border-color: $gray;
    }
  }

  .new-medicine__submit {
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

  .new-medicine__empty {
    @include body3;
    color: $grayDark;
  }
}

@media (max-width: 420px) {
  .new-medicine__overlay {
    padding: 16px;
  }

  .new-medicine__overlay .new-medicine__modal {
    width: 100%;
    max-width: 100%;
    height: min(667px, 90vh);
  }
}
</style>
