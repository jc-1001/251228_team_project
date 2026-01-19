<script setup>
import Swal from 'sweetalert2'
const props = defineProps({
  title: {
    type: String,
    default: '成功的標題', //初始值
  },
})

// 定義 emit，讓父層知道使用者最後選了什麼
const emit = defineEmits(['confirmed'])

Swal.fire({
  title: props.title,
  icon: 'success',
  confirmButtonText: '確定',
  showCloseButton: true,
  buttonsStyling: false,
  customClass: {
    popup: 'my-custom-bg',
    title: 'my-custom-title',
    icon: 'my-custom-icon',
    confirmButton: 'my-confirm-btn', // 確定按鈕
  },
}).then((result) => {
  emit('confirmed') 
})
</script>
<template></template>
<style lang="scss">
// 燈箱本體：增加圓角與陰影
.my-custom-bg {
  background-color: #ffffff !important;
  border-radius: 12px !important;
  padding-bottom: 24px !important;
  box-shadow: $shadowDark !important;
}

// 標題字體
.my-custom-title {
  font-size: 20px !important;
  color: $black !important;
  margin-top: 10px !important;
}

// 按鈕通用基礎樣式(「是」與「否」)
.my-confirm-btn,
.my-deny-btn {
  width: 120px !important;
  height: 45px !important;
  border-radius: 6px !important;
  font-size: 16px !important;
  font-weight: bold !important;
  border: none !important;
  cursor: pointer;
  margin: 0 8px !important;
  display: flex !important;
  align-items: center;
  justify-content: center;
  transition: opacity 0.2s;

  &:hover {
    opacity: 0.9;
  }
}

// 「是」按鈕顏色：深青色
.my-confirm-btn {
  background-color: $primaryDark !important;
  color: white !important;
}

// 「否」按鈕顏色：珊瑚橘
.my-deny-btn {
  background-color: $accent !important;
  color: white !important;
}

// Icon 顏色
.swal2-icon.swal2-warning {
  border-color: $accent !important;
  color: $accent !important;
}
.swal2-icon.swal2-success {
  border-color: $primaryDark !important;
  color: $primaryDark !important;
}
.my-result-title {
  font-size: 20px !important;
}
</style>
