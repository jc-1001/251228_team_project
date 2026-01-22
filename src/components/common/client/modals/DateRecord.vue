<script setup>
import { ref } from 'vue';
const props = defineProps({
    isOpen: Boolean,
    date: String,
    meals: Array
});
const emit = defineEmits(['close', 'open-add', 'open-edit']);
// 左右切換
const scrollContainer = ref(null);
const scroll = (direction) => {
    if (scrollContainer.value){
        const scrollAmount = 220; // 卡片尺寸+間距
        scrollContainer.value.scrollBy({
            left: direction === 'next' ? scrollAmount : -scrollAmount,
            behavior: 'smooth'
        });
    }
}
const closeModal = () => {
    emit('close');
};
const handleEdit = (meal) => {
    console.log('編輯:', meal);
    emit('open-edit', meal);
};
const handleAddMeal = () => {
    console.log('新增');
    emit('open-add');
};
const saveEdit = (updatedMeal) => {
    emit('update-diet', { date: props.date, meal: updatedMeal });
};
</script>
<template>
<Transition name="fade">
    <div v-if="isOpen" class="diet-modal-overlay" @click.self="closeModal">
        <div class="modal-container">
            <button class="close-x" @click="closeModal">
                <span class="material-symbols-outlined">close</span>
            </button>
            <div class="modal-header">
                <h2 class="display-date">{{ date }}</h2>
                <button class="btn-add" @click="handleAddMeal">新增</button>
            </div>
            <div class="meals-wrapper">
                <span class="material-symbols-outlined arrow-btn prev" @click="scroll('prev')">arrow_back_ios</span>
                <div class="meals-scroll-container" ref="scrollContainer">
                    <div v-for="meal in meals" :key="meal.id" class="meal-card">
                        <div class="meal-type">{{ meal.type }}</div>
                        <div class="image-wrapper">
                            <div class="image-box" :class="{ 'is-empty': !meal.image }">
                                <img v-if="meal.image" :src="meal.image" alt="meal" />
                                <span v-else class="empty-text">無記錄</span>
                                <div class="hover-mask edit-trigger" @click.stop="$emit('open-edit', meal)">
                                    <div class="pencil-icon">
                                        <img src="@/assets/images/pen.svg" alt="edit">
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="meal-note-box">
                            <p class="meal-note">{{ meal.note }}</p>
                        </div>
                    </div>
                </div>
                <span class="material-symbols-outlined arrow-btn next" @click="scroll('next')">arrow_forward_ios</span>
            </div>
        </div>
    </div>
</Transition>
</template>
<style lang="scss" scoped>
@import url("https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200");
.diet-modal-overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    background: rgba(0, 0, 0, 0.5);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 1000;
}
.modal-container {
    background: $white;
    width: 90%;
    max-width: 1000px;
    height: auto;
    border-radius: $radius_md;
    padding: 40px;
    position: relative;
    box-shadow: 0 10px 30px rgba(0,0,0,0.2);
}
.close-x {
    @include closeButton;
    padding-top: 5px;
}
.modal-header {
    @include subtitle1(true);
    text-align: center;
    margin-bottom: 24px;
}
.display-date {
    color: $primaryDark;
    @include title3(true);
    margin-bottom: 10px;
}
.btn-add {
    display: flex;
    margin-left: auto;
    margin-right: 40px;
    background: $primaryDark;
    color: $white;
    @include body2;
    border: none;
    padding: 4px 12px;
    border-radius: $radius_md;
    cursor: pointer;
    transition: all 0.3s ease;
    &:hover {
    background-color: $white;
    color: $primaryDark;
    outline: 1px solid $primaryDark;
    }
}
// Card
.meals-wrapper {
    display: flex;
    align-items: center;
    gap: 16px;
    overflow: hidden;
    .material-symbols-outlined {
        background: none;
        border: none;
        color: $primaryDark;
        cursor: pointer;
        @include title3(true);
    }
}
.meals-scroll-container {
    display: flex;
    gap: 20px;
    overflow-x: auto;
    padding: 8px;
    scroll-behavior: smooth;
}
.meal-card {
    flex: 0 0 200px;
    display: flex;
    flex-direction: column;
    text-align: center;
    .meal-type {
        color: $primaryDark;
        @include subtitle2(true);
        margin-bottom: 16px;
        height: 24px;
    }
    .image-wrapper {
        position: relative;
        width: 100%;
        height: auto;
        aspect-ratio: 1 / 1 !important; //圖片比例成正方形
        border-radius: 10px 10px 0 0;
        overflow: hidden;
        background: $primaryLight;
        flex-shrink: 0;
        .image-box {
            width: 100%;
            height: 100%;
            top: 0;
            left: 0;
            display: flex;
            align-items: center;
            justify-content: center;
            position: absolute;
            &.is-empty {
                width: 100%;
                height: 100%;
                background-color: $primaryLight;
            }
            img {
                width: 100%;
                height: 100%;
                object-fit: cover;
            }
            .empty-text {
                color: $black;
                @include body2;
                margin-bottom: 16px;
            }
            .hover-mask {
                position: absolute;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                background: rgba(255, 255, 255, 0.3);
                opacity: 0;
                transition: opacity 0.3s;
                display: flex;
                justify-content: flex-end;
                padding: 10px;
                cursor: pointer;
                .pencil-icon {
                    width: 30px;
                    height: 30px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                }
            }
            &:hover .hover-mask {
                opacity: 1;
            }
        }
    }
    .meal-note-box {
        background: $primaryLight;
        padding: 16px;
        border-radius: 0 0 10px 10px;
        height: 80px;
        display: flex;
        align-items: center;
        justify-content: center;
        .meal-note {
            @include body2;
            color: $black;
            margin: 0;
            overflow: hidden;
        }
    }
}
.meals-scroll-container {
    display: flex;
    gap: 20px;
    overflow-x: auto;
    padding: 8px;
    // 隱藏捲軸
    &::-webkit-scrollbar {
        display: none;
    }
}
.fade-enter-active, .fade-leave-active {
    transition: opacity 0.3s;
}
.fade-enter-from, .fade-leave-to {
    opacity: 0;
}
/* RWD */
@media (max-width: 768px) {
    .modal-container {
        width: 90%;
        max-width: 400px;
        height: 85vh;
        padding: 24px 16px;
        display: flex;
        flex-direction: column;
        align-items: center;
        overflow: hidden;
    }
    .modal-header {
        width: 100%;
        display: flex;
        flex-direction: column;
        align-items: center;
        margin-bottom: 16px;
        flex-shrink: 0;
        .display-date {
            margin-bottom: 8px;
        }
        .btn-add {
            margin-right: 48px;
            align-self: flex-end;
            position: relative;
            z-index: 10;
        }
    }
    .meals-wrapper {
        width: 100%;
        flex: 1;
        overflow: hidden;
        display: flex;
        flex-direction: column;
        .arrow-btn {
            display: none;
        }
    }
    .meals-scroll-container {
        margin-top: 0;
        flex-direction: column; 
        align-items: center;
        overflow-y: auto;
        overflow-x: hidden;
        padding-top: 16px;
    }
    .meal-card {
        flex: 0 0 auto;
        width: 300px;
        margin-bottom: 24px;
        .image-wrapper {
            width: 100%;
            aspect-ratio: 1 / 1; // 強制手機版也是正方形
        }
        .meal-type {
            @include subtitle1(true);
            margin-bottom: 24px;
        } 
        .edit-trigger {
            opacity: 1 !important;
            background: transparent;
            position: absolute;
            padding: 0;
            z-index: 10;
            img {
                width: 18px;
                height: 18px;
            }
        }
    }
}
</style>