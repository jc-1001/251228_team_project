<script setup>
import MedicineCarousel from '@/views/client/Medicine/common/MedicineCarousel.vue'
import MedicineCardModal from '@/views/client/Medicine/common/MedicineCardModal.vue'
import MedicineDetails from '@/views/client/Medicine/common/MedicineDetails.vue'
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
const showCardDetail = ref(false)
</script>

<template>
  <MedicineCardModal v-if="showModal" @closeModal="showModal = false" />
  <MedicineDetails v-if="showCardDetail" @closeCardDetail="showCardDetail = false" />
  <MedicineCarousel
    title="我的藥品"
    :items="items"
    @createClick="showModal = true"
    @showCardDetail="showCardDetail = true"
  />
  <MedicineCarousel
    title="我的保健品"
    :items="items"
    @createClick="showModal = true"
    @showCardDetail="showCardDetail = true"
  />
</template>
