<script setup>

</script>

<template>
  <div class="quantity_selector">
    <button class="qty_btn minus">-</button>
    <input type="text" class="qty_input" value="1">
    <button class="qty_btn plus">+</button>
  </div>
</template>

<style lang="scss" scoped>
.quantity_selector {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 24px;
  width: 150px;
  height: 40px;
  border: 1px solid $black;
  border-radius: $radius-sm;

  .qty_btn {
    border: none;
    background-color: transparent;
    @include subtitle2(true);
    color: $black;
    cursor: pointer;
  }

  .qty_input {
    width: 50px;
    border: none;
    text-align: center;
  }

}
</style>