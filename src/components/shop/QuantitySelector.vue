<script setup>
const props = defineProps({
  qty:{
    type: Number,
    required: true,
    default:1
  }
})

// emit的概念是子物件"發射需求"給父物件，父物件接收訊號後執行
const emit = defineEmits(['add', 'minus'])

</script>

<template>
  <div class="quantity_selector">
    <button type="button" class="qty_btn minus" @click="emit('minus')" :disabled="qty <= 1">-</button>
    <input type="text" class="qty_input" :value="qty" readonly>
    <button  type="button" class="qty_btn plus" @click="emit('add')">+</button>
  </div>
</template>

<style lang="scss" scoped>
.quantity_selector {
  flex: 1;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 4px 12px;
  max-width: 150px;
  background-color: $white;
  border: 1px solid $black;
  border-radius: $radius-sm;
  @media screen and (max-width: 1200px) {
    width: 120px;
  }
  

  .qty_btn {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 40px;
    height: 100%;
    border: none;
    background-color: transparent;
    @include subtitle2(true);
    color: $black;
    cursor: pointer;
    transition: all .3s;
    &:hover {
      color: $primary;
    }
    &:disabled {
      opacity: 0.3;
      cursor: not-allowed;
    }
  }

  .qty_input {
    width: 50px;
    border: none;
    text-align: center;
    background-color: transparent;
    outline: none;
    @include body2;
  }

}
</style>