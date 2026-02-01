<template>
  <div
    class="app-icon"
    :style="{ width: size + 'px', height: size + 'px' }"
    v-html="svgContent"
  ></div>
</template>

<script setup>
import { ref, watchEffect } from 'vue'

const props = defineProps({
  name: { type: String, required: true },
  size: { type: [Number, String], default: 20 },
})

const svgContent = ref('')

watchEffect(async () => {
  // 注意：在程式碼中引用 public 資源時，不需要寫 /public
  try {
    const response = await fetch(`./images/home/${props.name}.svg`)
    if (response.ok) {
      svgContent.value = await response.text()
    }
  } catch (err) {
    console.error('載入 SVG 失敗:', err)
  }
})
</script>

<style scoped>
.app-icon :deep(svg) {
  width: 100%;
  height: 100%;
  fill: currentColor; /* 關鍵：確保顏色跟隨父層文字顏色 */
  display: block;
}
</style>
