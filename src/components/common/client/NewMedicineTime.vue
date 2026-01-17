<script setup>
    import { ref } from 'vue'

    const activeTab = ref();

    const tabs = [
        { key: 'morning', label: '早上' },
        { key: 'noon', label: '中午' },
        { key: 'evening', label: '晚上' },
        { key: 'bedtime', label: '睡前' },
        ]
</script>

<template>
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
</template>


<style scoped lang="scss">
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