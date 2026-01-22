<script setup>
import { ref, onMounted } from 'vue';
const props = defineProps({
    isOpen: Boolean,
    date: String
});
const emit = defineEmits(['close', 'submit']);
// 初始狀態
const formData = ref({
    type: '早餐',
    note: '',
    image: null,
    preview: null,
    time: ''
});
// 選項
const mealTypes = ['早餐', '午餐', '晚餐'];
// 圖片上傳
const handleImageUpload = (event) => {
    const file = event.target.files?.[0] || event.dataTransfer?.files?.[0];
    if (file) {
        formData.value.image = file;
        formData.value.preview = URL.createObjectURL(file);
    }
};
const close = () => {
    formData.value = { type: '早餐', note: '', image: null, preview: null, time: '' };
    emit('close');
};
const submitForm = () => {
    // 驗證是否放入照片
    if (!formData.value.preview) {
        alert("請先上傳照片再儲存！");
        return;
    }
    const displayType = (formData.value.type === 'custom') 
        ? (formData.value.time || '未定時') 
        : formData.value.type;
    emit('submit', { 
        ...formData.value, 
        type: displayType,
    });
    close();
};
const timeInput = ref(null);
const handleTimeClick = () => {
    formData.value.type = 'custom';
    if (timeInput.value && timeInput.value.showPicker) {
        timeInput.value.showPicker();
    } else if (timeInput.value) {
        timeInput.value.focus();
    }
};
</script>

<template>
    <Transition name="fade">
        <div v-if="isOpen" class="diet-modal-overlay" @click.self="close">
            <div class="new-record-card">
                <button class="close-circle" @click="close">
                    <span class="material-symbols-outlined">close</span>
                </button>
                <div class="modal-header">
                    <h2 class="title">飲食記錄</h2>
                    <p class="date-text">今日日期：{{ date?.replace(/-/g, '/') }}</p>
                </div>
                <div class="upload-section" @click="$refs.fileInput.click()" @drop.prevent="handleImageUpload" @dragover.prevent>
                    <input type="file" ref="fileInput" hidden accept="image/*" @change="handleImageUpload">
                    <template v-if="formData.preview">
                        <img :src="formData.preview" class="preview-img">
                    </template>
                    <template v-else>
                        <div class="placeholder">
                            <span class="material-symbols-outlined camera-icon"><img src="@/assets/images/camera.svg" alt="camera"></span>
                            <p>點擊或拖曳上傳飲食照片</p>
                        </div>
                    </template>
                </div>
                <div class="type-selector">
                    <button 
                        v-for="t in mealTypes" :key="t"
                        class="type-btn"
                        :class="{ active: formData.type === t }"
                        @click="formData.type = t">
                        {{ t }}
                    </button>
                    <div class="time-picker-wrapper" @click="handleTimeClick">
                        <input 
                            type="time" 
                            v-model="formData.time" 
                            class="hidden-time-input" 
                            ref="timeInput"
                            step="60"
                        >
                        <label class="type-btn" :class="{ active:formData.type === 'custom' }">
                            {{ formData.time || '自訂' }}
                        </label>
                    </div>
                </div>
                <div class="note-section">
                    <label class="label">文字描述(選填)</label>
                    <textarea v-model="formData.note" placeholder="例如：排骨便當、少飯" rows="3"></textarea>
                </div>
                <button class="btn-save" @click="submitForm">儲存</button>
            </div>
        </div>
    </Transition>
</template>

<style lang="scss" scoped>
.diet-modal-overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.5);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 2000;
    padding: 20px;
}
.new-record-card {
    background: $white;
    width: 400px;
    height: 560px;
    border-radius: 24px;
    padding: 32px 24px;
    position: relative;
    box-shadow: 0 8px 30px rgba(0,0,0,0.1);
}
.close-circle {
    @include closeButton;
    .material-symbols-outlined {
        padding-top: 5px;
    }
}
.modal-header {
    text-align: center;
    margin-bottom: 16px;
    .title {
        @include subtitle1(true);
        color: $primaryDark;
        margin-bottom: 8px;
    }
    .date-text {
        color: $black;
        @include body2;
    }
}
.upload-section {
    width: 100%;
    height: 30%;
    aspect-ratio: 16 / 9;
    background: $primaryLight;
    border-radius: $radius_md;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    text-align: center;
    cursor: pointer;
    overflow: hidden;
    margin-bottom: 16px;
    p {
        color: $primaryDark;
        @include body2(true);
    }
    .preview-img {
        width: 100%;
        height: 100%;
        object-fit: cover;
    }
}
.type-selector {
    display: flex;
    justify-content: space-between;
    gap: 8px;
    margin-bottom: 16px;
    .type-btn {
        flex: 1;
        padding: 4px 0;
        border-radius: 30px;
        @include body1(true);
        border: 1px solid $primaryDark;
        background: $white;
        color: $primaryDark;
        text-align: center;
        cursor: pointer;
        transition: all 0.3s;
        &.active {
            background: $primaryDark;
            color: $white;
        }
    }
}
.time-picker-wrapper {
    flex: 1;
    position: relative;
    display: flex;
    cursor: pointer;
    .hidden-time-input {
        position: absolute;
        width: 0;
        height: 0;
        opacity: 0;
        pointer-events: none;
    }
    .type-btn {
        flex: 1;
        display: flex;
        align-items: center;
        justify-content: center;
        padding: 4px 0;
        border-radius: 30px;
        @include body1(true);
        border: 1px solid $primaryDark;
        background: $white;
        color: $primaryDark;
        pointer-events: none;
    }
}
.note-section {
    margin-bottom: 16px;
    .label {
        display: block;
        color: $black;
        @include body1(true);
        margin-bottom: 8px;
    }
    textarea {
        width: 100%;
        border: 1px solid $black;
        border-radius: 12px;
        padding: 12px;
        resize: none;
        &::placeholder {
            color: $gray;
        }
    }
}
.btn-save {
    width: 100%;
    padding: 8px;
    background: $primaryDark;
    color: $white;
    border: none;
    border-radius: $radius_sm;
    @include subtitle2(true);
    cursor: pointer;
    transition: background 0.3s;
    &:hover {
        background-color: $white;
        color: $primaryDark;
        outline: 1px solid $primaryDark;
    }
}
.fade-enter-active, .fade-leave-active { transition: opacity 0.3s; }
.fade-enter-from, .fade-leave-to { opacity: 0; }
</style>