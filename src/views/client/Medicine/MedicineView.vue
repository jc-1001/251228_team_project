<script setup>
import TheHeader from '@/components/common/TheHeader.vue'
import MedicineSection from '@/views/client/Medicine/common/MedicineSection.vue'


</script>

<template>
  <section class="medicine-view">
    <TheTopIcon />
    <TheHeader 
    title="數位藥箱"
    subtitle="從規律服藥開始，打造樂活人生。"
    imageSrc="/src/assets/images/Banner_mdc.svg"
    />
    <MedicineSection />
  </section>
</template>
<style lang="scss" scoped></style>
