<script setup>
import TheHeader from '@/components/common/TheHeader.vue'
import DateRecord from '@/components/common/client/modals/DateRecord.vue'
import NewDietaryRecord from '@/components/common/client/modals/NewDietaryRecord.vue'
import EditDietaryRecord from '@/components/common/client/modals/EditDietaryRecord.vue'
import { ref, computed } from 'vue'
import dayjs from 'dayjs';
import dietBanner from '@/assets/images/Banner_diary.svg'

const currentViewDate = ref(dayjs());
// 填寫卡片顯示綠底
const filledDates = computed(() => {
    return Object.keys(allDietRecords.value); 
});
const isYearPickerOpen = ref(false);
// 產生後5年list
const years = computed(() => {
    const minYear = 2025;
    const maxYear = currentViewDate.value.year() + 5;
    const length = maxYear - minYear + 1;
    return Array.from({ length }, (_, i) => minYear + i);
});
const selectYear = (year) => {
    if (year >= 2025) {
        currentViewDate.value = currentViewDate.value.year(year);
        isYearPickerOpen.value = false;
    }
};
// 計算月曆要的所有日期
const calendarDays = computed(() => {
    const startOfMonth = currentViewDate.value.startOf('month');
    const endOfMonth = currentViewDate.value.endOf('month'); 
    const startDay = startOfMonth.day();
    const daysInMonth = currentViewDate.value.daysInMonth();
    const days = [];
    // 補足前月日期
    for (let i = startDay; i > 0; i--) {
        days.push({
            date: startOfMonth.subtract(i, 'day'),
            isCurrentMonth: false
        });
    }
    // 本月的日期
    for (let i = 1; i <= daysInMonth; i++) {
        days.push({
            date: startOfMonth.date(i),
            isCurrentMonth: true
        });
    }
    // 補足後月的日期，確保高度一致(視情況增減排數)
    const totalSlots = days.length > 35 ? 42 : 35;
    const remainingSlots = totalSlots - days.length;
    for (let i = 1; i <= remainingSlots; i++) {
        days.push({ date: endOfMonth.add(i, 'day'), isCurrentMonth: false });
    }
    return days;
});
// 切換月份功能
const prevMonth = () => {
    const prevDate = currentViewDate.value.subtract(1, 'month');
    // 年份小於2025不執行
    if (prevDate.year() < 2025) {
        return;
    }
    currentViewDate.value = prevDate;
};
const nextMonth = () => { currentViewDate.value = currentViewDate.value.add(1, 'month'); };
const isModalOpen = ref(false); // 控制燈箱是否顯示
const isAddModalOpen = ref(false);  // 新增資料燈箱
// 開啟新增燈箱
const openAddModal = () => {
    isAddModalOpen.value = true;
};
const selectedDate = ref('');   // 儲存目前點擊的是哪一天
const handleDateClick = (date) => {
    // 如果是未來日期，不執行動作
    if (date.isAfter(dayjs(), 'day')) return;
    selectedDate.value = date.format('YYYY-MM-DD');
    isModalOpen.value = true;
    // 開啟燈箱邏輯
    console.log("開啟燈箱:", date.format('YYYY-MM-DD'));
};
const closeModal = () => {
    isModalOpen.value = false;
};
const getImageUrl = (name) => {
    return new URL(`../../assets/images/${name}`, import.meta.url).href;
};
//燈箱內容
const allDietRecords = ref({
    '2026-01-18': [
    { id: 1, type: '早餐', note: '蘿蔔糕、無糖熱豆漿', image: getImageUrl('meal1.jpg'), time: null },
    { id: 2, type: '午餐', note: null, image: getImageUrl('meal2.jpg'), time: null },
    { id: 3, type: '14:30', note: '蛋糕、蘋果汁', image: getImageUrl('meal3.jpg'), time: '14:30' },
    ]
});
const getTimeWeight = (type) => {
        const typeMap = { '早餐': '08:00', '午餐': '12:00', '晚餐': '17:00' };
        const timeStr = typeMap[type] || type;
        return timeStr.replace(':', ''); 
    };
const handleNewRecord = (formData) => {
    const dateKey = selectedDate.value;
    // 沒有任何記錄，先建立空陣列
    if (!allDietRecords.value[dateKey]) {
        allDietRecords.value[dateKey] = [];
    }
    const newEntry = {
        id: Date.now(),
        type: formData.type,
        note: formData.note,
        image: formData.preview,
        time: formData.type.includes(':') ? formData.type : null
    };
    // 將新資料加入
    allDietRecords.value[dateKey].push(newEntry);
    allDietRecords.value[dateKey].sort((a, b) => {
        return getTimeWeight(a.type).localeCompare(getTimeWeight(b.type));
    });
    isAddModalOpen.value = false;
};
const currentDayMeals = computed(() => {
    const defaultTemplates = [
        { type: '早餐', isDefault: true, timeWeight: 800 },
        { type: '午餐', isDefault: true, timeWeight: 1200 },
        { type: '晚餐', isDefault: true, timeWeight: 1700 }
    ];
    // 獲取該日期紀錄
    const savedRecords = allDietRecords.value[selectedDate.value] || [];
    // 建立空間存放要顯示的項目
    const displayList = [];
    // 預設三餐
    defaultTemplates.forEach(template => {
        const found = savedRecords.find(r => r.type === template.type);
        if (found) {
            displayList.push({ ...found, timeWeight: template.timeWeight });
        } else {
            displayList.push({ 
                id: `empty-${template.type}`, 
                type: template.type, 
                note: null, 
                image: null, 
                timeWeight: template.timeWeight 
            });
        }
    });
    // 自訂時間項目
    const extraMeals = savedRecords.filter(r => !['早餐', '午餐', '晚餐'].includes(r.type));
    extraMeals.forEach(extra => {
        // 將時間轉為數字權重
        const weight = parseInt(extra.type.replace(':', ''), 10);
        displayList.push({ ...extra, timeWeight: weight });
    });
    // 根據時間排序
    return displayList.sort((a, b) => a.timeWeight - b.timeWeight);
});
const getDayClass = (item) => {
    const dateStr = item.date.format('YYYY-MM-DD');
    const isFilled = filledDates.value.includes(dateStr);
    const isToday = item.date.isSame(dayjs(), 'day');
    const isFuture = item.date.isAfter(dayjs(), 'day');
    return {
        'today': isToday,
        'this-month-f': item.isCurrentMonth && isFilled,
        'other-month-f': !item.isCurrentMonth && isFilled,
        'this-month-n': item.isCurrentMonth && !isFilled,
        'other-month-n': !item.isCurrentMonth && !isFilled,
        'future': isFuture,
    };
};
const isEditModalOpen = ref(false);
const editingMeal = ref(null);
const handleEditClick = (meal) => {
    console.log("接收到編輯請求:", meal);
    if (!meal || String(meal.id).includes('empty-')) return;
    editingMeal.value = meal;
    isEditModalOpen.value = true;
};
// 編輯後的儲存
const handleUpdateRecord = (updatedData) => {
    const dateKey = selectedDate.value;
    const records = allDietRecords.value[dateKey];
    // 找出舊資料替換
    const index = records.findIndex(r => r.id === updatedData.id);
    if (index !== -1) {
        allDietRecords.value[dateKey][index] = {
            ...updatedData,
            image: updatedData.preview // 確保圖片更新
        };
        // 重新排序
        allDietRecords.value[dateKey].sort((a, b) => {
            return getTimeWeight(a.type).localeCompare(getTimeWeight(b.type));
        });
    }
    isEditModalOpen.value = false;
};
const handleDeleteRecord = (id) => {
    const dateKey = selectedDate.value;
    if (!allDietRecords.value[dateKey]) return;
    // 過濾該資料
    allDietRecords.value[dateKey] = allDietRecords.value[dateKey].filter(
        record => record.id !== id
    );
    // 如果該天沒紀錄，可選擇刪除或保留空陣列
    if (allDietRecords.value[dateKey].length === 0) {
        delete allDietRecords.value[dateKey];
    }
    isEditModalOpen.value = false;
};
</script>
<template>
    <TheHeader
    title="飲食日記"
    subtitle="拍照上傳，簡單步驟將每日飲食好好記錄。"
    :imageSrc="dietBanner"
    />
    <router-view />
    <!-- 日曆 -->
    <main class="diet-calendar">
        <!-- 年、月 -->
        <div class="calendar-header">
            <div class="month-selector">
                <button v-if="!(currentViewDate.year() === 2025 && currentViewDate.month() === 0)"
                    @click="prevMonth" class="arrow">
                    <span class="material-symbols-outlined">arrow_back_ios</span>
                </button>
                <span class="month-text">{{ currentViewDate.format('MM月') }}</span>
                <button @click="nextMonth" class="arrow">
                    <span class="material-symbols-outlined">arrow_forward_ios</span>
                </button>
            </div>
            <div class="year-container" style="position: relative;">
                <div class="year-text" @click="isYearPickerOpen = !isYearPickerOpen">
                    {{ currentViewDate.format('YYYY') }}
                </div>
                <div v-if="isYearPickerOpen" class="year-dropdown">
                    <div v-for="y in years" :key="y" class="year-option" @click="selectYear(y)">
                        {{ y }}
                    </div>
                </div>
            </div>
        </div>
        <!-- 主區塊 -->
        <div class="calendar-body">
            <div class="weekdays-grid">
                <div v-for="day in ['日', '一', '二', '三', '四', '五', '六']" :key="day" class="weekday">
                    <span class="week-prefix">週</span>
                    {{ day }}
                </div>
            </div>
            <div class="days-grid">
                <div v-for="item in calendarDays" 
                    :key="item.date.format('YYYY-MM-DD')"
                    class="day-cell"
                    :class="getDayClass(item)"
                    @click="handleDateClick(item.date)">
                    {{ item.date.date() }}
                </div>
            </div>
        </div>
    </main>
    <DateRecord
    :is-open="isModalOpen" 
    :date="selectedDate" 
    :meals="currentDayMeals" 
    @close="closeModal" 
    @open-add="openAddModal"
    @open-edit="handleEditClick"
    />
    <EditDietaryRecord 
    v-if="isEditModalOpen" 
    :is-open="isEditModalOpen"
    :date="selectedDate"
    :initial-data="editingMeal"
    @close="isEditModalOpen = false"
    @submit="handleUpdateRecord"
    @delete="handleDeleteRecord"
    />
    <NewDietaryRecord 
    :is-open="isAddModalOpen" 
    :date="selectedDate"
    @close="isAddModalOpen = false"
    @submit="handleNewRecord"
    />
    <!-- 標記說明 -->
    <div class="calendar-footer">
        <div class="legend-item"><span class="dot today-dot"></span>今日</div>
        <div class="legend-item"><span class="dot filled-dot"></span>已填寫</div>
    </div>
</template>
<style lang="scss" scoped>
@import url("https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200");

.diet-calendar {
    width: 90%;
    height: auto;
    margin: auto;
    margin-top: 40px;
    background-color: $accentLight;
    border-radius: 30px;
    overflow: hidden;
    box-shadow: $shadow;
}
.calendar-header {
    background-color: $accent;
    color: $white;
    padding: 24px 48px;
    display: flex;
    justify-content: space-between;
    align-items: center;
}
.month-text {
    @include title3(true);
    margin: 0 24px;
}
.year-text {
    cursor: pointer;
    @include title3(true);
}
.year-container {
    position: relative;
}
.year-dropdown {
    position: absolute;
    top: 100%;
    right: 0;
    background: $white;
    color: $black;
    max-height: 200px;
    overflow-y: auto;
    box-shadow: $shadow;
    z-index: 10;
    width: 100px;
}
.year-option {
    padding: 8px;
    text-align: center;
    cursor: pointer;
    &:hover { background-color: $accentLight; }
}
.arrow {
    background: none;
    border: none;
    color: $white;
    cursor: pointer;
    @include title3(true);
}
.calendar-body {
    margin: 24px;
}
.weekdays-grid {
    display: grid;
    grid-template-columns: repeat(7, 1fr);
    text-align: center;
    margin-bottom: 16px;
}
.weekday {
    color: $primaryDark;
    @include subtitle2(true);
    .week-prefix {
        display: inline;
    }
}
.days-grid {
    display: grid;
    grid-template-columns: repeat(7, 1fr);
    text-align: center;
}
.day-cell {
    aspect-ratio: 1 / 1; // 保持正方形
    width: 100%; // 寬度撐滿 Grid 格子
    max-width: 60px;  // 限制圓圈最大寬度
    margin: 16px auto; // 讓圓圈在Grid格子內水平置中，增加上下間距 
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    @include subtitle1(true);
    color: $black;
    transition: all 0.3s ease;
    // 狀態樣式
    &.today {
        border: 1px solid $black;
        border-radius: 50%; // 圓形
    }
    &.other-month-f {
        background-color: $gray;
        border-radius: 50%;
        color: $white;
    }
    &.other-month-n {
        color: $gray;
    }
    &.this-month-f {
        background-color: $primary;
        border-radius: 50%;
        color: $white;
    }
    &.this-month-n {
        color: $black;
    }
    &.future {
    cursor: default;
    }
    &:hover {
    background-color: $white;
    border-radius: 50%;
    color: $primary;
    }
}
.calendar-footer {
    display: flex;
    justify-content: flex-end;
    width: 80%;
    margin: 24px auto;
    gap: 40px;
    @include body1;
}
.legend-item {
    display: flex;
    align-items: center;
    gap: 5px;
}
.dot {
    width: 32px;
    height: 32px;
    border-radius: 50%;
    flex-shrink: 0;
}
.today-dot {
    border: 1px solid $black;
}
.filled-dot {
    background-color: $primary;
}
/* RWD */
@media (max-width: 768px) {
    .diet-calendar {
        width: 95%;
    }
    .calendar-header {
        padding: 16px 24px;
    }
    .month-text {
        @include subtitle1(true);
    }
    .year-text {
        @include subtitle1(true);
    }
    .arrow {
        @include subtitle1(true);
    }
    .calendar-body {
        padding: 16px;
        margin: 0;
    }
    .weekday {
        @include body2(true);
        .week-prefix {
            display: none;
        }
    }
    .days-grid {
        row-gap: 8px;
        column-gap: 4px;
    }
    .day-cell {
        max-width: 36px;
        margin: 4px auto;
        @include body1(true);
    }
    .calendar-footer {
        width: 70%;
        @include body3;
    }
    .dot {
        display: flex;
        width: 24px;
        height: 24px;
    }
}
</style>