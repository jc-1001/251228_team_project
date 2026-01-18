<script setup>
defineProps({
  title: String,
  type: {
    type: String,
    default: 'text', //預設值，可以改成number...
  },
})
</script>
<template>
  <div class="input-box">
    <div class="input-title">{{ title }}</div>
    <input :type="type" class="custom-input" placeholder="請輸入內容" />
  </div>
</template>
<style lang="scss" scoped>
.input-box {
  width: 100%;
  margin: 16px 0;
}
.input-title {
  margin-left: 5px;
  color: $black;
  margin-bottom: 5px;
}
input {
  height: 36px;
  width: 100%;
  border-radius: 10px;
  transition: all 0.3s ease;
  outline: none;
  &:focus {
    border-color: $gray;
  }

  &::placeholder {
    color: #aaa;
    padding: 10px;
    font-size: 12px;
  }
}
</style>
