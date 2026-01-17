<script setup>
import { ref } from 'vue'
import NewMedicineTime from '@/components/common/client/NewMedicineTime.vue'
const activeTab = ref()

const tabs = [
  { key: 'morning', label: '早上' },
  { key: 'noon', label: '中午' },
  { key: 'evening', label: '晚上' },
  { key: 'bedtime', label: '睡前' },
]

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
      <header @click.stop>
        <h2 class="new-medicine__title">吃藥紀錄</h2>
        <button class="new-medicine__close" @click="closeModal">X</button>
        <p class="new-medicine__date">今日日期:</p>
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
        <div v-show="activeTab === 0">早上內容</div>
        <div v-show="activeTab === 1">中午內容</div>
        <div v-show="activeTab === 2">晚上內容</div>
        <div v-show="activeTab === 3">睡前內容</div>
      </div>
      <button class="new-medicine__submit">完成</button>
    </div>
  </div>
</template>
<style scoped lang="scss">
.new-medicine__overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
  .new-medicine__modal {
    background-color: $white;
    padding: 20px;
    border-radius: 8px;
    width: 420px;
    height: 667px;
    position: relative;
    .new-medicine__close {
      @include closeButton;
    }
  }
}
.new-medicine__tabs {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 12px;
  margin: 16px 0;
}

.new-medicine__tab {
  padding: 8px 12px;
  border-radius: 999px;
  border: 1px solid $primaryDark;
  background: $white;
  color: $primaryDark;
}

.new-medicine__tab.is-active {
  background: $primaryDark;
  color: $white;
}
</style>
