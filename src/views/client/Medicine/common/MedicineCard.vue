<script setup>
import { computed, ref } from 'vue'

const emit = defineEmits(['editMedication'])
const { item, variant } = defineProps({
  item: {
    type: Object,
    required: true,
  },
  variant: {
    type: String,
    default: 'medicine',
  },
})

const scheduleRows = computed(() => {
  const schedule = item?.schedule || {}
  const slots = [
    { key: 'MORNING', label: '早上' },
    { key: 'NOON', label: '中午' },
    { key: 'EVENING', label: '晚上' },
    { key: 'BEDTIME', label: '睡前' },
  ]
  const instructionLabel = (instruction) => {
    const map = {
      NONE: '無',
      BEFORE_MEAL: '餐前',
      AFTER_MEAL: '餐後',
      ANY: '不拘',
      BEDTIME: '睡前',
    }
    return map[instruction] || '無'
  }
  return slots.map((slot) => {
    const entry = schedule?.[slot.key] || {}
    const instruction = instructionLabel(entry.instruction || 'NONE')
    const doseQty = entry.dose_qty ?? null
    return {
      label: slot.label,
      instruction,
      doseQty,
      hasDose: instruction !== '無' && doseQty !== null && doseQty !== '',
    }
  })
})

const noteText = computed(() => {
  const note = item?.note ?? ''
  return note.trim() === '' ? '無' : note
})

const isFlipped = ref(false)
const toggleFlip = () => {
  isFlipped.value = !isFlipped.value
}
</script>
<template>
  <div
    class="card"
    :class="[`card--${variant}`, { 'is-flipped': isFlipped }]"
    @click="toggleFlip"
  >
    <div class="front-page">
      <div class="card-info">
        <div class="medicine-img">
          <img :src="item.image" alt="" />
        </div>
        <h3 class="title">{{ item.name }}</h3>

        <div class="label">
          <span class="status-badge" :class="item.isActive ? 'is-active' : 'is-inactive'">
            {{ item.isActive ? '啟用中' : '停用中' }}
          </span>
          <span class="stock_qty">剩餘：{{ item.stockQty }}</span>
        </div>
      </div>
    </div>

    <div class="back-page">
      <div class="card-content">
        <h3 class="title">{{ item.name }}</h3>
        <span class="expiry_date">有效期限：{{ item.expiryDate || '未知' }}</span>
        <div class="schedule">
          <span class="schedule-title">用藥排程</span>
          <ul class="schedule-list">
            <li v-for="row in scheduleRows" :key="row.label">
              <span>{{ row.label }}：</span>
              <span>
                {{ row.instruction }}
                <span v-if="row.hasDose"> {{ row.doseQty }} 份</span>
              </span>
            </li>
          </ul>
        </div>
        <span class="note">備註：{{ noteText }}</span>

        <button
          class="card-button"
          type="button"
          @click.stop="emit('editMedication', item)"
        >
          編輯藥品
        </button>
      </div>
    </div>
  </div>
</template>
<style scoped lang="scss">
.card {
  width: 220px;
  height: 320px;
  display: grid;
  justify-items: center;
  align-items: center;
  background: $white;
  border-radius: $radius_md;
  gap: 16px;
  box-shadow: $shadow;
  cursor: pointer;
  transform-style: preserve-3d;
  transition: transform 0.8s ease-in-out;
  &.hover {
    transform: rotateY(180deg);
  }
  .card-info {
    width: 100%;
    display: grid;
    gap: 8px;
    justify-items: center;
    .title {
      color: $primaryDark;
      @include body1(true);
      text-align: center;
    }
  }
  .medicine-img {
    aspect-ratio: 4 / 3;
    border-top-left-radius: $radius_md;
    border-top-right-radius: $radius_md;
    overflow: hidden;
    img {
      width: 100%;
      height: 100%;
      display: block;
      object-fit: cover;
    }
  }
  .back-page,
  .front-page {
    position: absolute;
    width: 100%;
    height: 100%;
    backface-visibility: hidden;
    border-radius: 15px;
  }
  .back-page {
    transform: rotateY(180deg);
  }
  .label {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    margin: 16px auto;
    span {
      color: $primaryDark;
      @include body3;
      border: 1px solid $primaryDark;
      border-radius: 100px;
      padding: 2px 16px;
      margin: 4px;
    }
  }

  .status-badge {
    display: inline-flex;
    align-self: center;
    padding: 2px 10px;
    border-radius: $radius_md;
    border: 1px solid $gray;
    color: $grayDark;
    background: $white;
    @include body3;
  }

  .status-badge.is-active {
    border-color: $primaryDark;
    color: $primaryDark;
    background: $primaryLight;
  }

  .status-badge.is-inactive {
    border-color: $accent;
    color: $accent;
    background: $accentLight;
  }

  .card-content {
    width: 100%;
    height: 100%;
    display: grid;
    gap: 8px;
    padding: 16px;
    .title {
      color: $primaryDark;
      @include body1(true);
      text-align: center;
    }
  }
  .expiry_date{
    color: $primaryDark;
    @include body3;
  }
  .schedule {
    display: grid;
    gap: 6px;
  }

  .schedule-title {
    color: $primaryDark;
    @include body3;
  }

  .schedule-list {
    display: grid;
    gap: 4px;
    padding: 0;
    margin: 0;
    list-style: none;
    color: $primaryDark;
    @include body3;
  }

  .note {
    color: $primaryDark;
    @include body3;
  }

  .card-button {
    margin-top: auto;
    align-self: center;
    padding: 6px 16px;
    border-radius: $radius_md;
    border: 1px solid $primaryDark;
    background: $primaryDark;
    color: $white;
    cursor: pointer;
    @include body3;
    transition: all 0.2s ease;
    &:hover {
      background: $white;
      color: $primaryDark;
    }
  }
}

.card.is-flipped {
  transform: rotateY(180deg);
}

@media (hover: hover) and (pointer: fine) {
  .card:hover {
    transform: rotateY(180deg);
  }
}
</style>
