<script setup>
import { ref, computed, onMounted } from 'vue'
import { storeToRefs } from 'pinia'
import { useMedicineStore } from '@/stores/medicine.js'

const activeTab = ref(0)
const tabs = [
  { key: '早上', label: '早上' },
  { key: '中午', label: '中午' },
  { key: '晚上', label: '晚上' },
  { key: '睡前', label: '睡前' },
]

const medicineStore = useMedicineStore()
const { items } = storeToRefs(medicineStore)
const { fetchItems } = medicineStore

onMounted(() => {
  fetchItems()
})

const currentTabKey = computed(() => tabs[activeTab.value]?.key)
const visibleItems = computed(() => {
  return items.value.filter(
    (item) => Array.isArray(item.timeCourse) && item.timeCourse.includes(currentTabKey.value),
  )
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
          <span class="material-symbols-outlined">close</span>
        </button>
        <p class="new-medicine__date">今日日期:2026/01/22</p>
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
            <span v-if="item.checked" class="material-symbols-outlined">check</span>
          </div>
        </div>
      </div>

      <button class="new-medicine__submit" type="button">完成</button>
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
    max-height: 70vh;
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
