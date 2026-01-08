<script setup>
import TheHeader from '@/components/common/TheHeader.vue'
</script>
<template>
    <div>
        <TheHeader
        title="飲食日記"
        subtitle="拍照上傳，簡單步驟將每日飲食好好記錄。"
        imageSrc="/src/assets/images/Banner_diary.svg"
    />
    <router-view />
    </div>
</template>
<style lang="scss" scoped></style>