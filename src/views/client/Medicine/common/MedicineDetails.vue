<script setup>
import { computed, onMounted, ref, watch } from 'vue'
import { storeToRefs } from 'pinia'
import { useMedicineStore } from '@/stores/medicine.js'
import editMedicineCard from '@/views/client/Medicine/common/editMedicineCard.vue'

const { medicationId } = defineProps({
  medicationId: {
    type: Number,
    required: true,
  },
})

const emit = defineEmits(['closeCardDetail'])

const timeSlots = ['早上', '中午', '晚上', '睡前']
const slotKeyMap = {
  早上: 'MORNING',
  中午: 'NOON',
  晚上: 'EVENING',
  睡前: 'BEDTIME',
}
const usageOptions = [
  { label: '無', value: 'NONE' },
  { label: '餐前', value: 'BEFORE_MEAL' },
  { label: '餐後', value: 'AFTER_MEAL' },
  { label: '不拘', value: 'ANY' },
  { label: '睡前', value: 'BEDTIME' },
]
const quantityOptions = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10]

const usageOptionsBySlot = (slot) => {
  if (slot === '睡前') {
    return usageOptions.filter((opt) => ['NONE', 'BEDTIME'].includes(opt.value))
  }
  return usageOptions.filter((opt) => opt.value !== 'BEDTIME')
}

const medicineStore = useMedicineStore()
const { detail } = storeToRefs(medicineStore)
const { fetchDetail } = medicineStore

const showEditCard = ref(false)
const openEditCard = () => {
  showEditCard.value = true
}

const handleEditSaved = () => {
  showEditCard.value = false
  closeCardDetail()
}

const handleEditDeleted = () => {
  showEditCard.value = false
  closeCardDetail()
}

const closeCardDetail = () => {
  emit('closeCardDetail')
}

const onOverlayClick = () => {
  closeCardDetail()
}

const onKeydown = (event) => {
  if (event.key === 'Escape') {
    closeCardDetail()
  }
}

const detailData = computed(() => detail.value || {})

const scheduleBySlot = computed(() => {
  const schedule = detailData.value.schedule || {}
  return timeSlots.map((slot) => {
    const key = slotKeyMap[slot]
    const entry = schedule?.[key] || {}
    return {
      slot,
      instruction: entry.instruction || 'NONE',
      doseQty: entry.dose_qty ?? 0,
    }
  })
})

onMounted(() => {
  fetchDetail(medicationId)
})

watch(
  () => medicationId,
  (nextId) => {
    if (nextId) fetchDetail(nextId)
  }
)
</script>

<template>
  <editMedicineCard
    v-if="showEditCard"
    :medicationId="medicationId"
    @saved="handleEditSaved"
    @deleted="handleEditDeleted"
    @closeEditCard="showEditCard = false"
  />
  <div
    v-if="!showEditCard"
    class="medicine-modal__overlay"
    @click="onOverlayClick"
    @keydown="onKeydown"
    tabindex="0"
  >
    <div class="medicine-modal__card" @click.stop>
      <button @click="closeCardDetail" class="medicine-modal__close" type="button" aria-label="關閉">
        <span class="material-symbols-outlined">close</span>
      </button>
      <h1 class="medicine-modal__title">藥品詳情</h1>
      <form class="medicine-modal__content" action="#">
        <div class="medicine-modal__body">
          <section class="medicine-modal__image">
            <div class="medicine-modal__image-form">
              <div class="form-group">
                <label for="medicine-name">藥品名</label>
                <input id="medicine-name" type="text" :value="detailData.name || ''" readonly />
              </div>
              <div class="form-row">
                <div class="form-group">
                  <label for="expiration-date">有效期限</label>
                  <input id="expiration-date" type="date" :value="detailData.expiryDate || ''" readonly />
                </div>
                <div class="form-group">
                  <label for="quantity">藥品數量</label>
                  <input id="quantity" type="text" :value="detailData.stockQty ?? ''" readonly />
                </div>
              </div>
            </div>
            <label class="medicine-modal__image-drop">
              <img v-if="detailData.image" :src="detailData.image" alt="medicine" class="input-img" />
              <img v-else src="@/assets/images/camera.svg" alt="camera icon" />
              <span v-if="!detailData.image">尚未上傳藥品照片</span>
            </label>
          </section>

          <section class="medicine-modal__form">
            <div class="form-group">
              <label for="notes">備註</label>
              <input id="notes" type="text" :value="detailData.note || ''" readonly />
            </div>

            <div class="medicine-modal__schedule">
              <div class="schedule__head"></div>
              <div class="schedule__head">醫囑用法</div>
              <div class="schedule__head">服用數量</div>

              <template v-for="row in scheduleBySlot" :key="row.slot">
                <div class="schedule__row-label">{{ row.slot }}</div>
                <select class="schedule__select" :value="row.instruction" disabled>
                  <option
                    v-for="opt in usageOptionsBySlot(row.slot)"
                    :key="opt.value"
                    :value="opt.value"
                  >
                    {{ opt.label }}
                  </option>
                </select>
                <select class="schedule__select" :value="row.doseQty" disabled>
                  <option v-for="qty in quantityOptions" :key="qty" :value="qty">
                    {{ qty }}
                  </option>
                </select>
              </template>
            </div>
          </section>
        </div>

        <div class="medicine-modal__footer">
          <button class="btn-primary" type="button" @click="openEditCard">編輯</button>
        </div>
      </form>
    </div>
  </div>
</template>

<style lang="scss" scoped>
@import url('https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200');

* {
  box-sizing: border-box;
}

.medicine-modal__overlay {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.12);
  display: grid;
  place-items: center;
  z-index: 1000;

  .medicine-modal__card {
    position: relative;
    width: 800px;
    max-width: 90vw;
    max-height: 90vh;
    background-color: $white;
    border-radius: $radius_md;
    box-shadow: $shadowDark;
    padding: 16px 40px;
    gap: 16px;
    overflow: auto;

    .medicine-modal__title {
      @include title2;
      color: $primaryDark;
      text-align: center;
      margin-bottom: 16px;
    }

    .medicine-modal__close {
      @include closeButton;
      padding-top: 5px;
    }

    .medicine-modal__content {
      display: grid;
      grid-template-rows: 1fr auto;
      gap: 24px;

      .medicine-modal__body {
        display: grid;
        grid-template-columns: 1fr 1fr;
        gap: 16px;
        align-items: self-start;

        .form-row {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 8px;
        }

        .form-group {
          display: grid;
          gap: 8px;
        }

        label {
          @include body2;
          color: $primaryDark;
        }

        input,
        select {
          padding: 8px;
          border: 1px solid $primaryDark;
          border-radius: $radius_sm;
          @include body3;
        }

        .medicine-modal__image {
          display: grid;
          gap: 8px;

          .medicine-modal__image-drop {
            width: 100%;
            max-width: 520px;
            height: 164px;
            border-radius: $radius_sm;
            border: 1px solid $primaryDark;
            background-color: $primaryLight;
            display: flex;
            flex-direction: column;
            gap: 8px;
            align-items: center;
            justify-content: center;
            text-align: center;
            color: $primaryDark;
            @include body3;

            .input-img {
              width: 100%;
              height: 100%;
              object-fit: contain;
              border-radius: $radius_sm;
            }
          }

          .medicine-modal__image-form {
            display: grid;
            gap: 16px;
          }
        }

        .medicine-modal__form {
          display: grid;
          gap: 16px;

          .medicine-modal__schedule {
            display: grid;
            grid-template-columns: 80px 1fr 1fr;
            gap: 10px 12px;
            padding: 16px;
            border-radius: $radius_sm;
            background-color: $grayLight;

            .schedule__head {
              @include body3;
              color: $primaryDark;
              text-align: center;
            }

            .schedule__row-label {
              @include body3;
              color: $primaryDark;
              display: flex;
              align-items: center;
              justify-content: center;
            }

            .schedule__select {
              width: 100%;
            }
          }
        }
      }

      .medicine-modal__footer {
        display: flex;
        justify-content: center;

        .btn-primary {
          flex: 0.3;
          background: $accent;
          color: $white;
          padding: 8px;
          border: none;
          border-radius: $radius_sm;
          @include subtitle2(true);
          cursor: pointer;
          transition: background 0.3s;
          &:hover {
            background-color: $accentLight;
            color: $accent;
            outline: 1px solid $accent;
          }
        }
      }
    }
  }
}

@media (max-width: 1024px) {
  .medicine-modal__overlay {
    .medicine-modal__card {
      width: min(920px, 100%);

      .medicine-modal__content {
        .medicine-modal__body {
          grid-template-columns: 1fr;
        }
      }
    }
  }
}

@media (max-width: 768px) {
  .medicine-modal__overlay {
    place-items: start center;
    padding: 16px;

    .medicine-modal__card {
      padding: 24px 20px;
      max-height: 90vh;
      width: 100%;
      max-width: 100%;

      .medicine-modal__content {
        .medicine-modal__body {
          gap: 20px;

          .medicine-modal__image {
            .medicine-modal__image-drop {
              height: clamp(220px, 45vw, 320px);
            }
          }
        }
      }
    }
  }
}

@media (max-width: 400px) {
  .medicine-modal__overlay {
    .medicine-modal__card {
      width: 100%;
      max-width: 100%;
      border-radius: 0;
      padding: 10px 8px;

      .medicine-modal__content {
        .medicine-modal__body {
          .medicine-modal__form {
            .medicine-modal__schedule {
              grid-template-columns: 64px 1fr;
              gap: 16px 20px;

              .schedule__head:nth-child(3) {
                display: none;
              }

              .schedule__select:nth-of-type(2n) {
                grid-column: 2;
              }
            }
          }

          .form-row {
            grid-template-columns: 1fr;
          }

          input,
          select {
            min-height: 44px;
          }
        }
      }
    }
  }
}
</style>
