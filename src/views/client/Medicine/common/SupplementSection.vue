<script setup>
import MedicineCarousel from '@/views/client/Medicine/common/MedicineCarousel.vue'
import MedicineCardModal from '@/views/client/Medicine/common/MedicineCardModal.vue'
import MedicineDetails from '@/views/client/Medicine/common/MedicineDetails.vue'
import { storeToRefs } from 'pinia'
import { ref, onMounted } from 'vue'
import { useMedicineStore } from '@/stores/medicine.js'

const medicineStore = useMedicineStore()
const { supplements } = storeToRefs(medicineStore)
const { fetchItems } = medicineStore

onMounted(() => {
  fetchItems('保健食品')
})

const showModal = ref(false)
const showCardDetail = ref(false)
const selectedId = ref(null)

const handleShowDetail = (item) => {
  selectedId.value = item?.id ?? null
  showCardDetail.value = true
}
</script>

<template>
  <MedicineCardModal 
  v-if="showModal" 
  category="保健食品" 
  @closeModal="showModal = false" />
  <MedicineDetails
    v-if="showCardDetail"
    :medicationId="selectedId"
    @closeCardDetail="showCardDetail = false"
  />
  <MedicineCarousel
    title="我的保健食品"
    :items="supplements"
    variant="supplement"
    @createClick="showModal = true"
    @showCardDetail="handleShowDetail"
  />
</template>

