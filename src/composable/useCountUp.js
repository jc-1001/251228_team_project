import { ref, watch, onMounted } from 'vue'

export function useCountUp(target, duration = 1500) {
  const current = ref(0)
  
  const animate = (end) => {
    const start = current.value
    const startTime = performance.now()
    
    const update = (currentTime) => {
      const elapsed = currentTime - startTime
      const progress = Math.min(elapsed / duration, 1)
      
      // easeOutCubic 緩動效果
      const easeProgress = 1 - Math.pow(1 - progress, 3)
      current.value = Math.floor(start + (end - start) * easeProgress)
      
      if (progress < 1) {
        requestAnimationFrame(update)
      } else {
        current.value = end
      }
    }
    
    requestAnimationFrame(update)
  }
  
  watch(target, (newVal) => {
    if (typeof newVal === 'number') {
      animate(newVal)
    }
  })
  
  onMounted(() => {
    if (typeof target.value === 'number') {
      animate(target.value)
    }
  })
  
  return current
}