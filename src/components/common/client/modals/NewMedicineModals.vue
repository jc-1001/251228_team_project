<script setup>
import { ref } from 'vue'
import NewMedicineTime from '@/components/common/client/NewMedicineTime.vue'


const emit = defineEmits(['close'])

const closeModal = () => {
  emit("close");
};

const onOverlayClick = () => {
  closeModal();
};

const onKeydown = (event) => {
  if (event.key === "Escape") {
    closeModal();
  }
};

</script>
<template>
    <div class="new-medicine__overlay" @click="onOverlayClick" @keydown="onKeydown" tabindex="0">
        <div class="new-medicine__modal" @click.stop>
            <header @click.stop>
                <h2 class="new-medicine__title">吃藥紀錄</h2>
                <button class="new-medicine__close" @click="closeModal" >X</button>
                <p class="new-medicine__date">今日日期:</p>
            </header>
            <NewMedicineTime />
            <button class="new-medicine__submit">完成</button>
        </div>
    </div>

</template>
<style scoped lang="scss">
.new-medicine__overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 1000;
    .new-medicine__modal {
        background-color: $white;
        padding: 20px;
        border-radius: 8px;
        width: 420px;
        height: 667px;
        position: relative;
        .new-medicine__close{
            @include closeButton;
        }
    }
}
</style>