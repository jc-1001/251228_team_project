<script setup>
import MedicineCarousel from '@/views/client/Medicine/common/MedicineCarousel.vue'
import MedicineCardModal from '@/views/client/Medicine/common/MedicineCardModal.vue'
import { storeToRefs } from 'pinia'
import { ref, onMounted } from 'vue'
import { useMedicineStore } from '@/stores/medicine.js'


const medicineStore = useMedicineStore()
const { items } = storeToRefs(medicineStore)
const { fetchItems } = medicineStore

onMounted(() => {
  fetchItems()
})

const showModal = ref(false)
</script>

<template>
  <MedicineCardModal v-if="showModal"   @closeModal="showModal = false"/>
  <MedicineCarousel
    title="我的藥品"
    :items="items"
    @createClick="showModal = true"
  />
    <MedicineCarousel
    title="我的保健品"
    :items="items"
    @createClick="showModal = true"
  />
</template>
