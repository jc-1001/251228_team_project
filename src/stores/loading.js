import { defineStore } from 'pinia'
import { computed, ref } from 'vue'

export const useLoadingStore = defineStore('loading', () => {
    // API加載狀態
    const activeCount = ref(0)
    // 頁面加載狀態
    const isPageLoaded = ref(false)

    const show = () => { activeCount.value++ }
    const hide = () => {
        // 不會變成負數
        if (activeCount.value > 0) activeCount.value--
    }

    // 頁面加載狀態函式
    const setPageLoaded = () => { isPageLoaded.value = true }

    // 當全部的API加載完畢時 且&& 頁面圖片全部加載完畢，才會回傳 false (停止載入中)
    const isGlobalLoading = computed(() => {
        return activeCount.value > 0 || !isPageLoaded.value
    })


    // 呼叫回傳
    return { activeCount, isPageLoaded, show, hide, setPageLoaded, isGlobalLoading }
})

