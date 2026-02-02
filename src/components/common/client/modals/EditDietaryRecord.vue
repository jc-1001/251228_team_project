<script setup>
import { ref, watch, onMounted } from 'vue';
const props = defineProps({
    isOpen: Boolean,
    date: String,
    initialData: Object // 接收點擊的那筆資料
});
const emit = defineEmits(['close', 'submit', 'delete']);
const confirmDelete = () => {
    // 彈窗
    if (confirm("確定要刪除這筆飲食記錄？")) {
        emit('delete', formData.value.diet_log_id);
        close();
    }
};
// 初始狀態
const formData = ref({
    diet_log_id: null,
    meal_type: '早餐',
    description: '',
    image_file: null,
    preview: null,
    meal_time: ''
});
const mealTypes = ['早餐', '午餐', '晚餐'];
const IMAGE_BASE_URL = 'http://localhost:8888/unicare_api/images/diet/uploads/';
const previewImage = ref(null);
onMounted(() => {
    if (props.initialData && props.initialData.food_image_url) {
        previewImage.value = props.initialData.food_image_url.startsWith('http') 
            ? props.initialData.food_image_url 
            : IMAGE_BASE_URL + props.initialData.food_image_url;
    }
});
const updatePreview = (url) => {
    if (!url) {
        previewImage.value = null;
        return;
    }
    previewImage.value = (url.startsWith('blob:') || url.startsWith('http')) 
        ? url 
        : IMAGE_BASE_URL + url;
};
watch(() => props.isOpen, (newVal) => {
    if (newVal && props.initialData) {
        const rawType = props.initialData.meal_type;
        const isCustomTime = !mealTypes.includes(rawType);
        const currentImageUrl = props.initialData.food_image_url ? (props.initialData.food_image_url.startsWith('http') 
                ? props.initialData.food_image_url 
                : IMAGE_BASE_URL + props.initialData.food_image_url)
                : null;
        formData.value = {
            diet_log_id: props.initialData.diet_log_id,
            meal_type: isCustomTime ? 'custom' : rawType,
            description: props.initialData.description || '',
            image_file: null,
            preview: currentImageUrl,
            meal_time: isCustomTime ? rawType.substring(0, 5) : ''
        };
        updatePreview(props.initialData.food_image_url);
    }
}, { immediate: true }); // 確保開啟時就執行
const handleImageUpload = (event) => {
    const file = event.target.files?.[0] || event.dataTransfer?.files?.[0];
    if (!file) return;
    if (!file.type.startsWith('image/')) {
        alert("格式錯誤，請選擇圖片檔案。");
        if (event.target) {
            event.target.value = '';
        }
        return;
    }
    if (file.size > 5 * 1024 * 1024) {
        alert("請上傳小於5MB的檔案。");
        return;
    }
        if (previewImage.value && previewImage.value.startsWith('blob:')) {
            URL.revokeObjectURL(previewImage.value);
        }
        const newUrl = URL.createObjectURL(file);
        previewImage.value = newUrl; 
        formData.value.preview = newUrl;
        formData.value.image_file = file;
};
const close = () => {
    emit('close');
};
const submitForm = () => {
    if (!previewImage.value) {
        alert("照片不能為空！");
        return;
    }
    const displayType = (formData.value.meal_type === 'custom') 
        ? (formData.value.meal_time || '未定時') 
        : formData.value.meal_type;
    emit('submit', { 
        diet_log_id: formData.value.diet_log_id,
        meal_type: displayType,
        description: formData.value.description,
        preview: previewImage.value,
        image_file: formData.value.image_file,
        meal_time: formData.value.meal_type === 'custom' ? `${formData.value.meal_time}:00` : null
    });
    close();
};
const timeInput = ref(null);
const handleTimeClick = () => {
    formData.value.meal_type = 'custom';
    if (timeInput.value?.showPicker) {
        timeInput.value.showPicker();
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
                    <h2 class="title">編輯飲食記錄</h2>
                    <p class="date-text">紀錄日期：{{ date }}</p>
                </div>
                <div class="upload-section" @click="$refs.fileInput.click()">
                    <input type="file" ref="fileInput" hidden accept="image/*" @change="handleImageUpload">
                    <img v-if="previewImage" :src="previewImage" class="preview-img">
                    <div v-else class="placeholder">
                        <span class="material-symbols-outlined camera-icon">
                            <img src="@/assets/images/camera.svg" alt="camera">
                        </span>
                        <p>點擊更換照片</p>
                    </div>
                </div>
                <div class="type-selector">
                    <button 
                        v-for="t in mealTypes" :key="t"
                        class="type-btn"
                        :class="{ active: formData.meal_type === t }"
                        @click="formData.meal_type = t">
                        {{ t }}
                    </button>
                    <div class="time-picker-wrapper" @click="handleTimeClick">
                        <input 
                            type="time" 
                            v-model="formData.meal_time" 
                            class="hidden-time-input" 
                            ref="timeInput" 
                            step="60"
                        >
                        <label class="type-btn" :class="{ active: formData.meal_type === 'custom' }">
                            {{ formData.meal_time || '自訂' }}
                        </label>
                    </div>
                </div>
                <div class="note-section">
                    <label class="label">文字描述</label>
                    <textarea v-model="formData.description" placeholder="修改描述..." rows="3"></textarea>
                </div>
                <div class="action-buttons">
                    <button class="btn-save" @click.stop.prevent="submitForm">儲存</button>
                    <button class="btn-delete" @click="$emit('delete', initialData.diet_log_id)">刪除</button>
                </div>
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
    overflow-y: auto;
}
.new-record-card {
    background: $white;
    width: 400px;
    height: 560px;
    border-radius: $radius_md;
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
.action-buttons {
    display: flex;
    margin: 0 24px;
    gap: 40px;
}
.btn-save {
    flex: 1;
    background: $primaryDark;
    color: $white;
    padding: 8px;
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
.btn-delete {
    flex: 1;
    background: $accent;
    color: $white;
    padding: 8px;
    border: none;
    border-radius: $radius_sm;
    @include subtitle2(true);
    cursor: pointer;
    transition: background 0.3s;
    &:hover {
        background-color: $white;
        color: $accent;
        outline: 1px solid $accent;
    }
}
.fade-enter-active, .fade-leave-active { transition: opacity 0.3s; }
.fade-enter-from, .fade-leave-to { opacity: 0; }
</style>