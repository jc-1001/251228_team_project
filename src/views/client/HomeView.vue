<script setup>
import TheHeader from '@/components/common/TheHeader.vue'
</script>
<template>
  <div>
    <TheHeader
      title="早上好，陳小姐！"
      subtitle="今天感覺如何？別忘了量血壓喔～"
      imageSrc="/src/assets/images/HomeView-header.svg"
    />
    <!-- 圖片路徑暫時 -->
    <router-view />
  </div>
</template>
<style lang="scss" scoped></style>
