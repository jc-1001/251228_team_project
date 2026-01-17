<script setup>

</script>
<template>
  <div class="summary_card">
    <h3 class="summary_title">
      <span class="material-symbols-rounded icon">shopping_cart</span>
      訂單摘要
    </h3>
  </div>
</template>
<style lang="scss" scoped>
.summary_card {
  padding: 24px;
  background-color: $white;
  border: 1px solid $gray;
  border-radius: $radius_md;

  position: sticky;
  top: 24px;

  .summary_title {
    display: flex;
    align-items: center;
    gap: 4px;
    margin-bottom: 16px;
    @include body1(true);
    color: $primaryDark;

    .icon {
      @include subtitle2;
    }
  }
}
</style>