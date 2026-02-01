<script setup>
const emit = defineEmits(['showCardDetail'])
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
</script>
<template>
  <div class="card" :class="`card--${variant}`" @click="emit('showCardDetail', item)">
    <div class="medicine-img">
      <img :src="item.image" alt="" />
    </div>
    <h3 class="title">{{ item.name }}</h3>
    <div class="label">
      <span class="stock_qty">剩餘：{{ item.stockQty }}</span>
      <span class="expiry_date">有效期限：{{ item.expiryDate }}</span>
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
  &:hover {
    transform: translateY(-5px);
    box-shadow: $shadowHover;
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
  .title {
    @include subtitle2(true);
    color: $primaryDark;
  }
  .nexttime {
    @include body2;
    color: $primaryDark;
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
}
</style>
