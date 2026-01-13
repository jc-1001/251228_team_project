<script setup>
import TheHeader from '@/components/common/TheHeader.vue'
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
                <button class="arrow">&lt;</button>
                <span class="month-text">12月</span>
                <button class="arrow">&gt;</button>
            </div>
            <div class="year-text">2025</div>
        </div>
        <!-- 主區塊 -->
        <div class="calendar-body">
            <div class="weekdays-grid">
                <div v-for="day in ['週日', '週一', '週二', '週三', '週四', '週五', '週六']" :key="day" class="weekday">
                {{ day }}
                </div>
            </div>

            <div class="days-grid">
                <div class="day-cell other-month-f">30</div>
                <div class="day-cell this-month-f">1</div>
                <div class="day-cell this-month-f">2</div>
                <div class="day-cell this-month-f">3</div>
                <div class="day-cell this-month-f">4</div>
                <div class="day-cell this-month-f">5</div>
                <div class="day-cell this-month-f">6</div>
                <div class="day-cell this-month-n">7</div>
                <div class="day-cell this-month-f">8</div>
                <div class="day-cell this-month-f">9</div>
                <div class="day-cell this-month-f">10</div>
                <div class="day-cell this-month-f">11</div>
                <div class="day-cell this-month-f">12</div>
                <div class="day-cell this-month-f">13</div>
                <div class="day-cell this-month-f">14</div>
                <div class="day-cell this-month-f">15</div>
                <div class="day-cell this-month-n">16</div>
                <div class="day-cell this-month-f">17</div>
                <div class="day-cell this-month-f">18</div>
                <div class="day-cell this-month-f">19</div>
                <div class="day-cell today">20</div>
                <div class="day-cell this-month-n">21</div>
                <div class="day-cell this-month-n">22</div>
                <div class="day-cell this-month-n">23</div>
                <div class="day-cell this-month-n">24</div>
                <div class="day-cell this-month-n">25</div>
                <div class="day-cell this-month-n">26</div>
                <div class="day-cell this-month-n">27</div>
                <div class="day-cell this-month-n">28</div>
                <div class="day-cell this-month-n">29</div>
                <div class="day-cell this-month-n">30</div>
                <div class="day-cell this-month-n">31</div>
                <div class="day-cell other-month-n">1</div>
                <div class="day-cell other-month-n">2</div>
                <div class="day-cell other-month-n">3</div>
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
        font-size: 0.9rem;
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

        .dot {
        width: 24px;
        height: 24px;
    }

    }

</style>