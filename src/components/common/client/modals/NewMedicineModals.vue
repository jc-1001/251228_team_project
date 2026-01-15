<script setup>
import { ref } from 'vue'
const showModal = ref(false)

const closeModal = () => {
    showModal.value = false
}
const openModal = () => {
    showModal.value = true
}

const emit = defineEmits(['closeModal'])


</script>
<template>
    <div class="new-medicine__overlay">
        <div class="new-medicine__modal">
            <header>
                <h2 class="new-medicine__title">吃藥紀錄</h2>
                <button @click="closeModal"></button>
                <p class="new-medicine__date">今日日期:</p>
            </header>
            <label>早上</label>
            <label>中午</label>
            <label>晚上</label>
            <label>睡前</label>
            <button class="new-medicine__submit" @click="closeModal">完成</button>
        </div>
    </div>

</template>
<style scoped lang="scss">

</style>