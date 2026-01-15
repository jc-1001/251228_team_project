<script setup>
const { item } = defineProps({
  item: {
    type: Object,
    required: true,
  },
});

</script>
<template>
  <div class="card">
    <div class="medicine-img">
      <img :src="item.image" alt="" />
    </div>
    {{ item.name }}
    <div class="label">
      <span class="dayeat">每日{{ item.dayEat }}次</span>
      <span class="onetime">一次{{ item.oneTime }}份</span>
    </div>
  </div>
</template>
<style scoped lang="scss">
.card {
  min-width: 300px;
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
  .nexttime {
    @include body2;
    color: $primaryDark;
  }
  .label {
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 16px auto;
    span {
      color: $primaryDark;
      @include body3;
      border: 1px solid $primaryDark;
      border-radius: 100px;
      padding: 2px 16px;
      margin: auto 8px;
    }
  }
}
</style>
