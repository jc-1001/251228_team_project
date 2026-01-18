<script setup>
import TheInput from '../../TheInput.vue'
const props = defineProps({
  // 控制開關
  modelValue: {
    type: Boolean,
    default: false,
  },
  // 標題
  title: {
    type: String,
    default: '我是燈箱的標題',
  },
  // 傳入的資料（例如商品內容）
  data: {
    type: Object,
    default: () => ({}),
  },
})

const emit = defineEmits(['update:modelValue'])

const close = () => {
  emit('update:modelValue', false)
}
</script>
<template>
  <main v-if="modelValue">
    <div class="mask" @click.self="close">
      <div class="modal">
        <div class="cancelled" @click="close" style="cursor: pointer">
          <span class="material-symbols-rounded"> cancel </span>
        </div>
        <div class="modal-text">
          <div class="modal-title">
            <h2>{{ title }}</h2>
          </div>
          <div class="time">
            <h5>{{ data.time || '暫無時間' }}</h5>
          </div>
        </div>
        <div class="content">
          <TheInput :title="data.inputLabel || '請輸入'" />
          <slot></slot>
        </div>
      </div>
    </div>
  </main>
</template>
<style lang="scss" scoped>
.mask {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;

  // 半透明背景
  background-color: rgba(0, 0, 0, 0.5);

  // 讓內部燈箱置中
  display: flex;
  justify-content: center;
  align-items: center;
  // 最上層
  z-index: 999;
}
.modal {
  padding: 20px;
  width: 400px;
  height: 500px;
  background-color: white;
  border: 1px solid black;
  position: relative;
  border-radius: 10px;
  border-width: $shadowDark;
  .cancelled {
    color: $primaryDark;
    position: absolute;
    top: 16px;
    right: 16px;
  }
  .modal-text {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 12px;
    margin: 20px 0;
    .modal-title {
      color: $primaryDark;
    }
  }
}
</style>
