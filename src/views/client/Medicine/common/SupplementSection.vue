<script setup>
import MedicineCarousel from '@/views/client/Medicine/common/MedicineCarousel.vue'
import MedicineCardModal from '@/views/client/Medicine/common/MedicineCardModal.vue'
import editMedicineCard from '@/views/client/Medicine/common/editMedicineCard.vue'
import { storeToRefs } from 'pinia'
import { ref, onMounted } from 'vue'
import { useMedicineStore } from '@/stores/medicine.js'

const medicineStore = useMedicineStore()
const { supplements } = storeToRefs(medicineStore)
const { fetchItems } = medicineStore

onMounted(async () => {
  await fetchItems('保健食品')
})

const showModal = ref(false)
const showEditModal = ref(false)
const selectedId = ref(null)

const handleEdit = (item) => {
  selectedId.value = item?.id ?? null
  showEditModal.value = true
}
</script>

<template>
  <MedicineCardModal 
  v-if="showModal" 
  category="保健食品" 
  @closeModal="showModal = false" />
  <editMedicineCard
    v-if="showEditModal"
    :medicationId="selectedId"
    @closeEditCard="showEditModal = false"
    @saved="showEditModal = false"
    @deleted="showEditModal = false"
  />
  <div v-if="!supplements.length" class="medicine-empty">
    <h3 class="medicine-empty__title">尚未加入保健食品</h3>
    <p class="medicine-empty__desc">點擊下方按鈕開始建立你的保健食品清單</p>
    <button class="medicine-empty__btn" type="button" @click="showModal = true">新增保健食品</button>
  </div>
  <MedicineCarousel
    v-else
    title="我的保健食品"
    :items="supplements"
    variant="supplement"
    @createClick="showModal = true"
    @editMedication="handleEdit"
  />
</template>
<style scoped lang="scss">
.medicine-empty {
  background-color: $primaryLight;
  padding: 48px 24px;
  box-shadow: $shadowDark;
  border-radius: $radius_md;
  display: grid;
  place-items: center;
  gap: 12px;
  text-align: center;
  margin-top: 16px
}

.medicine-empty__title {
  @include subtitle1(true);
  color: $primaryDark;
}

.medicine-empty__desc {
  @include body2;
  color: $grayDark;
}

.medicine-empty__btn {
  background: $primaryDark;
  color: $white;
  padding: 8px 18px;
  border: none;
  border-radius: $radius_md;
  @include body2;
  cursor: pointer;
  transition: all 0.2s ease;
  &:hover {
    background: $white;
    color: $primaryDark;
    outline: 1px solid $primaryDark;
  }
}
</style>

