<script setup>
import { ref } from 'vue'
import TheProfileHeader from '@/components/common/TheProfileHeader.vue'
import TheprofileSide from '@/components/common/TheprofileLayout.vue'
</script>

<template>
  <TheProfileHeader />

  <TheprofileSide title="個人資料">
    <!-- 在下面編輯 h1自己刪掉 -->
    <h1>這是內容區域</h1>
  </TheprofileSide>
</template>

<style lang="scss" scoped></style>
