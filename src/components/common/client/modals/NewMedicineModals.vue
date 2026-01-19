<script setup>
import { ref, computed, onMounted } from 'vue'
import { storeToRefs } from 'pinia'
import { useMedicineStore } from '@/stores/medicine.js'


const activeTab = ref(0)
const tabs = [
  { key: '早上', label: '早上' },
  { key: '中午', label: '中午' },
  { key: '晚上', label: '晚上' },
]

const medicineStore = useMedicineStore()
const { items } = storeToRefs(medicineStore)
const { fetchItems } = medicineStore

onMounted(() => {
  fetchItems()
})

const currentTabKey = computed(() => tabs[activeTab.value]?.key)
const visibleItems = computed(()=>{
  return items.value.filter((item)=>Array.isArray(item.timeCourse) && item.timeCourse.includes(currentTabKey.value))
})

const toggleChecked = (item) => {
  item.checked = !item.checked
}

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
</script>

<template>
  <div class="new-medicine__overlay" @click="onOverlayClick" @keydown="onKeydown" tabindex="0">
    <div class="new-medicine__modal" @click.stop>
      <header class="new-medicine__header">
        <h2 class="new-medicine__title">吃藥紀錄</h2>
        <button class="new-medicine__close" @click="closeModal" type="button" aria-label="Close">
          X
        </button>
        <p class="new-medicine__date">Today: 2026/01/18</p>
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
          :key="item.id"
          class="new-medicine__item"
          @click="toggleChecked(item)"
          role="button"
          tabindex="0"
          @keydown.enter="toggleChecked(item)"
          @keydown.space.prevent="toggleChecked(item)"
        >
          <div class="new-medicine__thumb">
            <img :src="item.image" alt="" />
          </div>
          <div class="new-medicine__info">
            <div class="new-medicine__name">{{ item.name }}</div>
            <div class="new-medicine__chips">
              <span v-if="item.eatTimes" class="new-medicine__chip">{{ item.eatTimes }}</span>
              <span v-if="item.oneTime" class="new-medicine__chip">{{ item.oneTime }}份</span>
            </div>
          </div>
          <div class="new-medicine__status" :class="{ 'is-checked': item.checked }">
            <span v-if="item.checked">✓</span>
          </div>
        </div>
      </div>

      <button class="new-medicine__submit" type="button">完成</button>
    </div>
  </div>
</template>

<style scoped lang="scss">
.new-medicine__overlay {
  position: fixed;
  inset: 0;
  background-color: rgba(0, 0, 0, 0.45);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;

  .new-medicine__modal {
    background-color: $white;
    padding: 24px;
    border-radius: 12px;
    width: 420px;
    height: 667px;
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
    margin: 6px 0 0;
    color: $primaryDark;
  }

  .new-medicine__date {
    margin: 0;
    color: $gray;
    font-size: 14px;
  }

  .new-medicine__close {
    @include closeButton;
    position: absolute;
    right: 18px;
    top: 16px;
    width: 32px;
    height: 32px;
    border-radius: 50%;
    background-color: $primaryDark;
    color: $white;
  }

  .new-medicine__tabs {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 10px;
  }

  .new-medicine__tab {
    padding: 8px 12px;
    border-radius: 999px;
    border: 1px solid $primaryDark;
    background: $white;
    color: $primaryDark;
    font-size: 14px;

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

    &.is-checked {
      background: $primaryDark;
      border-color: $primaryDark;
    }
  }

  .new-medicine__submit {
    width: 100%;
    height: 48px;
    border-radius: 8px;
    background-color: $primaryDark;
    color: $white;
    border: none;
    cursor: pointer;
  }
}
</style>
