<script setup>
import TheHeader from '@/components/common/TheHeader.vue'
import MedicineSection from '@/views/client/Medicine/common/MedicineSection.vue'
import medicinebanner from '@/assets/images/Banner_mdc.svg'


</script>

<template>
  <section class="medicine-view">
    <TheTopIcon />
    <TheHeader 
    title="數位藥箱"
    subtitle="從規律服藥開始，打造樂活人生。"
    :imageSrc="medicinebanner"
    />
    <MedicineSection />
  </section>
</template>
