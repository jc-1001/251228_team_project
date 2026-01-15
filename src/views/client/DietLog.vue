<script setup>
import TheHeader from '@/components/common/TheHeader.vue'
import { ref, computed } from 'vue'
import dayjs from 'dayjs';

const currentViewDate = ref(dayjs());
const filledDates = ref(['2025-11-30','2025-12-01', '2025-12-02', '2025-12-03', '2025-12-04', '2025-12-05','2025-12-06', '2025-12-08', '2025-12-09', '2025-12-10', '2025-12-11', '2025-12-12', '2025-12-13', '2025-12-14', '2025-12-15', '2025-12-17', '2025-12-18', '2025-12-19']);//未來需調整

const isYearPickerOpen = ref(false);
// 產生前後10年list
const years = computed(() => {
    const startYear = 2025;
    return Array.from({ length: 6 }, (_, i) => startYear + i);
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

    // 本月的日子
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

// 切換月份的功能
const prevMonth = () => {
    const prevDate = currentViewDate.value.subtract(1, 'month');
    // 年份小於2025不執行
    if (prevDate.year() < 2025) {
        return;
    }
    currentViewDate.value = prevDate;
};
const nextMonth = () => { currentViewDate.value = currentViewDate.value.add(1, 'month'); };

const handleDateClick = (date) => {
    // 如果是未來日期，不執行動作
    if (date.isAfter(dayjs(), 'day')) return;
    
    // 否則執行開啟燈箱邏輯
    console.log("開啟燈箱:", date.format('YYYY-MM-DD'));
};

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

</script>

<template>
    <TheHeader
    title="飲食日記"
    subtitle="拍照上傳，簡單步驟將每日飲食好好記錄。"
    imageSrc="/src/assets/images/Banner_diary.svg"
    />
    <router-view />

    <!-- 日曆 -->
    <main class="diet-calendar">
        <!-- 年、月 -->
        <div class="calendar-header">
            <div class="month-selector">
                <button v-if="!(currentViewDate.year() === 2025 && currentViewDate.month() === 0)"
                    @click="prevMonth" class="arrow">&lt;</button>
                <span class="month-text">{{ currentViewDate.format('MM月') }}</span>
                <button @click="nextMonth" class="arrow">&gt;</button>
            </div>
            <div class="year-container" style="position: relative;">
                <div class="year-text" @click="isYearPickerOpen = !isYearPickerOpen">
                    {{ currentViewDate.format('YYYY') }}
                </div>
                <div v-if="isYearPickerOpen" class="year-dropdown">
                    <div v-for="y in years" :key="y" class="year-option" @click="changeYear(y)">
                        {{ y }}
                    </div>
                </div>
            </div>
        </div>
        <!-- 主區塊 -->
        <div class="calendar-body">
            <div class="weekdays-grid">
                <div v-for="day in ['週日', '週一', '週二', '週三', '週四', '週五', '週六']" :key="day" class="weekday">
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
    <!-- 標記說明 -->
    <div class="calendar-footer">
        <div class="legend-item"><span class="dot today-dot"></span>今日</div>
        <div class="legend-item"><span class="dot filled-dot"></span>已填寫</div>
    </div>
    
</template>

<style lang="scss" scoped>

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
        transition: all 0.2s ease;

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
        margin: 24px 80px;
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

    @media (max-width: 900px) {

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
            @include body1(true);
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
            display: flex;
            justify-content: flex-end;
            margin: 24px 80px;
            gap: 40px;
            @include body3;
        }
        .dot {
            display: flex;
            width: 24px;
            height: 24px;
    }

    }

</style>