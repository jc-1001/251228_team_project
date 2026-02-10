<script setup>
import { ref, computed, onMounted } from 'vue'
import TheHeader from '@/components/common/TheHeader.vue'
import DateRecord from '@/components/common/client/modals/DateRecord.vue'
import NewDietaryRecord from '@/components/common/client/modals/NewDietaryRecord.vue'
import EditDietaryRecord from '@/components/common/client/modals/EditDietaryRecord.vue'
import dayjs from 'dayjs'
import dietBanner from '@/assets/images/Banner_diary.svg'
import { publicApi, fileBaseUrl } from '@/utils/publicApi';
const currentViewDate = ref(dayjs());
// 填寫卡片顯示綠底
const filledDates = computed(() => {
  if (!allDietRecords.value) return []
  return Object.keys(allDietRecords.value).filter((key) => {
    const records = allDietRecords.value[key]
    return (
      Array.isArray(records) &&
      records.length > 0 &&
      records.some((r) => r.diet_log_id && !String(r.diet_log_id).includes('empty-'))
    )
  })
})
const isYearPickerOpen = ref(false)
// 產生後5年list
const years = computed(() => {
  const minYear = 2025
  const maxYear = currentViewDate.value.year() + 5
  const length = maxYear - minYear + 1
  return Array.from({ length }, (_, i) => minYear + i)
})
const selectYear = (year) => {
  if (year >= 2025) {
    currentViewDate.value = currentViewDate.value.year(year)
    isYearPickerOpen.value = false
  }
}
// 計算月曆要的所有日期
const calendarDays = computed(() => {
  const startOfMonth = currentViewDate.value.startOf('month')
  const endOfMonth = currentViewDate.value.endOf('month')
  const startDay = startOfMonth.day()
  const daysInMonth = currentViewDate.value.daysInMonth()
  const days = []
  // 補足前月日期
  for (let i = startDay; i > 0; i--) {
    days.push({
      date: startOfMonth.subtract(i, 'day'),
      isCurrentMonth: false,
    })
  }
  // 本月的日期
  for (let i = 1; i <= daysInMonth; i++) {
    days.push({
      date: startOfMonth.date(i),
      isCurrentMonth: true,
    })
  }
  // 補足後月的日期，確保高度一致(視情況增減排數)
  const totalSlots = days.length > 35 ? 42 : 35
  const remainingSlots = totalSlots - days.length
  for (let i = 1; i <= remainingSlots; i++) {
    days.push({ date: endOfMonth.add(i, 'day'), isCurrentMonth: false })
  }
  return days
})
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
const selectedMealType = ref('');
const isAddModalOpen = ref(false);  // 新增資料燈箱
// const autoSelectedType = ref('');
// 開啟新增燈箱
const openAddModal = (data = null) => {
    if (data && data.meal_type) {
        selectedMealType.value = data.meal_type; 
    } else {
        selectedMealType.value = ''; 
    }
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
const getMemberId = () => {
  const info = localStorage.getItem('userProfile');
  if (!info) return null;
  try {
    const userData = JSON.parse(info);
    return userData.member_id || null;
  } catch (e) {
    console.error('解析會員資料失敗', e);
    return null;
  }
};
//燈箱內容
const allDietRecords = ref({});
const fetchDietRecords = async () => {
  const memberId = getMemberId();
  if (!memberId) {
    console.warn('[飲食日記] 未登入，取消讀取');
    return;
  }
  try {
    // 直接對準你的 PHP 讀取檔案
    const response = await publicApi.get('diet/get_diets.php', {
      params: { member_id: memberId },
    })
    console.log('Vue 收到 PHP 資料了！', response.data)
    if (response.data) {
      allDietRecords.value = response.data
      console.log('成功讀取會員', memberId, '的資料');
    }
  } catch (error) {
    console.error('抓取資料失敗:', error)
  }
}
const handleNewRecord = async (formData) => {
  const memberId = getMemberId();
  if (!memberId) {
    alert('登入已逾時，請重新登入');
    return;
  }
  const { type, note, preview, image_file, time } = formData
  const dateKey = selectedDate.value
  const fd = new FormData()
  fd.append('member_id', memberId)
  fd.append('meal_date', dateKey)
  fd.append('meal_type', type)
  fd.append('description', note)
  const formattedTime = time ? `${time}:00` : type.includes(':') ? `${type}:00` : '00:00:00'
  fd.append('meal_time', formattedTime)
  // 如果有圖片，則加入檔案
  if (image_file) {
    fd.append('food_image', image_file)
  }
  try {
    //將此網址改為你實際存放 PHP 的位置
    const response = await publicApi.post('diet/create_diet.php', fd)
    //處理結果
    if (response.data && response.data.success) {
      // 讓日曆和紀錄自動更新
      await fetchDietRecords()
      // 關閉燈箱
      isAddModalOpen.value = false
      alert('儲存成功！')
    }
  } catch (error) {
    alert('連線伺服器失敗')
  }
}
onMounted(() => {
  fetchDietRecords()
})
const currentDayMeals = computed(() => {
    const dateKey = selectedDate.value;
    if (!allDietRecords.value) return [];
    const savedRecords = allDietRecords.value[dateKey] || [];
    const getFullImageUrl = (path) => {
        if (!path) return null;
        if (path.startsWith('http')) return path;
        return `${fileBaseUrl}/diet/uploads/${path}`; // 根據後端存放圖片的目錄調整
    };
    const defaultTemplates = [
        { meal_type: '早餐', timeWeight: 800 },
        { meal_type: '午餐', timeWeight: 1200 },
        { meal_type: '晚餐', timeWeight: 1900 }
    ];
    // 建立空間存放要顯示的項目
    const displayList = [];
    // 預設三餐
    defaultTemplates.forEach(template => {
        const found = savedRecords.find(r => r.meal_type === template.meal_type);
        if (found) {
            displayList.push({ ...found, timeWeight: template.timeWeight });
        } else {
            displayList.push({ 
                diet_log_id: `empty-${template.meal_type}`, 
                meal_type: template.meal_type, 
                description: null, 
                food_image_url: null, 
                timeWeight: template.timeWeight 
            });
        }
    });
    // 自訂時間項目
    const extraMeals = savedRecords.filter(r => !['早餐', '午餐', '晚餐'].includes(r.meal_type));
    extraMeals.forEach(extra => {
        const weight = parseInt(extra.meal_time?.replace(/:/g, '').substring(0, 4), 10) || 9999;
        displayList.push({ 
            ...extra, 
            timeWeight: weight,
            food_image_url: getFullImageUrl(extra.food_image || extra.food_image_url)
        });
    });
    // 根據時間排序
    return displayList.sort((a, b) => a.timeWeight - b.timeWeight);
});
const getDayClass = (item) => {
  const dateStr = item.date.format('YYYY-MM-DD')
  const isFilled = filledDates.value.includes(dateStr)
  const isToday = item.date.isSame(dayjs(), 'day')
  const isFuture = item.date.isAfter(dayjs(), 'day')
  return {
    today: isToday,
    'this-month-f': item.isCurrentMonth && isFilled,
    'other-month-f': !item.isCurrentMonth && isFilled,
    'this-month-n': item.isCurrentMonth && !isFilled,
    'other-month-n': !item.isCurrentMonth && !isFilled,
    future: isFuture,
  }
}
const isEditModalOpen = ref(false)
const editingMeal = ref(null)
const openEdit = (meal) => {
  console.log('接收到編輯請求:', meal)
  if (!meal || !meal.diet_log_id || String(meal.diet_log_id).includes('empty-')) {
    return
  }
  editingMeal.value = meal
  isEditModalOpen.value = true
}
// 編輯後的儲存
const handleUpdateRecord = async (updatedData) => {
  if (isEditModalOpen.value === false) return
  const fd = new FormData()
  fd.append('diet_log_id', updatedData.diet_log_id)
  fd.append('meal_type', updatedData.meal_type)
  fd.append('description', updatedData.description)
  fd.append('meal_time', updatedData.meal_time || '00:00:00')
  if (updatedData.image_file) {
    fd.append('food_image', updatedData.image_file)
  }
  try {
    const response = await publicApi.post('diet/update_diet.php', fd)
    if (response.data && response.data.success) {
      isEditModalOpen.value = false
      // 從資料庫拉取排序正確的資料
      await fetchDietRecords()
      // 如果該日期無資料關閉外層燈箱，綠燈熄滅
      const dateKey = selectedDate.value
      if (!allDietRecords.value[dateKey] || allDietRecords.value[dateKey].length === 0) {
        isModalOpen.value = false
      }
      alert('修改成功！')
    } else {
      alert('更新失敗:' + (response.data.message || '未知錯誤'))
    }
  } catch (error) {
    console.error('更新失敗:', error)
    alert('連線伺服器失敗')
  }
}
const handleDelete = async (diet_log_id) => {
  if (!diet_log_id) return
  if (!confirm('確定要刪除嗎？')) return

  try {
    const formData = new FormData()
    formData.append('diet_log_id', diet_log_id)
    const res = await publicApi.post('diet/delete_diet.php', formData)

    if (res.data.success) {
      isEditModalOpen.value = false
      isModalOpen.value = false
      await fetchDietRecords()
      alert('刪除成功')
    }
  } catch (e) {
    console.error(e)
  }
}
</script>
<template>
  <TheHeader
    title="飲食日記"
    subtitle="拍照上傳，簡單步驟將每日飲食好好記錄。"
    :imageSrc="dietBanner"
  />
  <!-- 日曆 -->
  <main class="diet-calendar">
    <!-- 年、月 -->
    <div class="calendar-header">
      <div class="month-selector">
        <button
          v-if="!(currentViewDate.year() === 2025 && currentViewDate.month() === 0)"
          @click="prevMonth"
          class="arrow"
        >
          <span class="material-symbols-outlined">arrow_back_ios</span>
        </button>
        <span class="month-text">{{ currentViewDate.format('MM月') }}</span>
        <button @click="nextMonth" class="arrow">
          <span class="material-symbols-outlined">arrow_forward_ios</span>
        </button>
      </div>
      <div class="year-container" style="position: relative">
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
        <div
          v-for="item in calendarDays"
          :key="item.date.valueOf()"
          class="day-cell"
          :class="getDayClass(item)"
          @click="handleDateClick(item.date)"
        >
          {{ item.date.date() }}
        </div>
      </div>
    </div>
  </main>
  <DateRecord
    v-if="isModalOpen && selectedDate"
    :is-open="isModalOpen"
    :date="selectedDate"
    :meals="currentDayMeals"
    @close="isModalOpen = false"
    @open-add="openAddModal"
    @open-edit="openEdit"
  />
  <EditDietaryRecord
    v-if="isEditModalOpen && editingMeal"
    :is-open="isEditModalOpen"
    :date="selectedDate"
    :initial-data="editingMeal"
    @close="isEditModalOpen = false"
    @submit="handleUpdateRecord"
    @delete="handleDelete"
  />
  <NewDietaryRecord
    :is-open="isAddModalOpen"
    :date="selectedDate"
    :initial-meal-type="selectedMealType"
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
@import url('https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200');

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
  margin: 0 16px;
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
  &:hover {
    background-color: $accentLight;
  }
}
.arrow {
  background: none;
  border: none;
  color: $white;
  cursor: pointer;
  @include title3(true);
  margin-top: 4px;
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
  max-width: 60px; // 限制圓圈最大寬度
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
