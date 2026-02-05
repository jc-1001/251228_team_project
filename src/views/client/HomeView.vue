<script setup>
import { ref, Teleport, onMounted, computed } from 'vue'
import TheHeader from '@/components/common/TheHeader.vue'
import HomeCommonModal from '@/components/common/client/modals/HomeCommonModal.vue'
import dayjs from 'dayjs'
import HomeTodayMedicine from '@/components/common/HomeTodayMedicine.vue'
import HomeReserveMedicine from '@/components/common/HomeReserveMedicine.vue'
import AppIcon from '@/components/common/AppIcon.vue'
import ShowAnnouncement from '@/components/common/ShowAnnouncement.vue'

// 引入燈箱元件
// 快速紀錄
import SuccessMessageModal from '@/components/common/client/modals/SuccessMessageModal.vue'
import ErrorMessageModal from '@/components/common/client/modals/ErrorMessageModal.vue'
import NewMedicineModals from '@/components/common/client/modals/NewMedicineModals.vue'
import MetricsInputForm from '@/components/common/client/modals/MetricsInputForm.vue'
import NewDietaryRecord from '@/components/common/client/modals/NewDietaryRecord.vue'
// 引入API
import { publicApi } from '@/utils/publicApi'

// 共用燈箱初始化
const successModal = ref(null)
const errorModal = ref(null)
// const errorApiMsg = ref('')
// 六個燈箱初始化
const isModalOpen = ref(false)
const selectedData = ref({
  time: '2026-01-17',
  inputLabel: '使用者帳號',
})
const userHeight = ref(0)
//飲食紀錄相關
const todayDate = ref(dayjs().format('YYYY-MM-DD'))
// 處理儲存後的動作
const handleDietSubmit = async (formData) => {
  const { type, note, image_file, time } = formData;
  
  const fd = new FormData();
  fd.append('member_id', 1); // 這裡配合你目前日記頁面的寫法
  fd.append('meal_date', todayDate.value); // 這裡使用你 script 裡定義好的 todayDate
  fd.append('meal_type', type);
  fd.append('description', note);
  
  // 時間處理：如果是自定義時間就用 time，否則根據類型或預設
  const formattedTime = time ? `${time}:00` : (type.includes(':') ? `${type}:00` : '00:00:00');
  fd.append('meal_time', formattedTime);

  // 處理圖片
  if (image_file) {
    fd.append('food_image', image_file);
  }

  try {
    const response = await publicApi.post('diet/create_diet.php', fd);
    
    if (response.data && response.data.success) {
      closePopup(); // 儲存成功後關閉燈箱
      
      // 呼叫首頁已有的成功提示燈箱
      if (successModal.value) {
        successModal.value.show();
      }
      
      console.log('飲食紀錄儲存成功');
    } else {
      // 呼叫首頁已有的失敗提示燈箱
      if (errorModal.value) {
        errorModal.value.show();
      }
      console.error('儲存失敗：', response.data.message);
    }
  } catch (error) {
    console.error("提交失敗:", error);
    if (errorModal.value) {
      errorModal.value.show();
    }
  }
};
const fastButton = ref([
  { name: '吃藥', icon: 'medication', type: 'medicine' },
  { name: '飲食日記', icon: 'restaurant', type: 'diet' },
  { name: '體重', icon: 'monitor_weight', type: 'weight' },
  { name: '血糖', icon: 'bloodtype', type: 'glucose' },
  { name: '血氧', icon: 'water_drop', type: 'oximetry' },
  { name: '血壓/心律', icon: 'favorite', type: 'vitals' },
])
// 今日狀態
const todayLog = ref([
  {
    name: '體重',
    icon: 'monitor_weight',
    num: '--',
    unit: 'kg',
    statusText: '尚未量測',
    statusType: 'none', //橘色
  },
  {
    name: '血氧',
    icon: 'water_drop',
    num: '95',
    unit: '%',
    statusText: '含氧量佳',
    statusType: 'good', // 綠色
  },
  {
    name: '血糖',
    icon: 'bloodtype',
    num: '--',
    unit: 'mg/dL',
    statusText: '尚未量測',
    statusType: 'none',
  },
  {
    name: '心律',
    icon: 'favorite',
    num: '80',
    unit: 'bpm',
    statusText: '心律偏低',
    statusType: 'low', //藍色 + Icon
  },
  {
    name: '血壓',
    icon: 'favorite',
    num: '140/80',
    unit: 'mmHg',
    statusText: '血壓偏高',
    statusType: 'danger', // 橘紅色+icon
  },
])

// 燈箱開關控制
const popupInfo = ref(null)
const openPopup = (item) => {
  // 如果是 4 個量測按鈕，改開 MetricsInputForm
  const key = metricKeyMap[item.type]
  if (key) {
    metricsKey.value = key
    isMetricsModalOpen.value = true
    return
  }

  popupInfo.value = item
}
// 📄身體數值
// 量測表單彈窗狀態（只處理 4 個按鈕）
const isMetricsModalOpen = ref(false)
const metricsKey = ref('weight')

// fastButton 的 type → MetricsInputForm 的 activeMetricKey 對照
const metricKeyMap = {
  weight: 'weight',
  oximetry: 'bloodOxygen',
  glucose: 'bloodSugar',
  vitals: 'bloodPressure',
}

const closeMetricsPopup = () => {
  isMetricsModalOpen.value = false
}

// 抓取最新身體數值串接API
const fetchTodayStats = async () => {
  try {
    const res = await publicApi.get('home_modal/get_latest_metrics.php')
    // if (!res.ok) throw new Error('網路回應不正確')
    const data = res.data

    // 如果 PHP 傳回的是包含錯誤訊息的 JSON
    if (data.err) {
      console.error('PHP 錯誤:', data.err)
      return
    }

    updateHomeStats(data)
  } catch (error) {
    console.error('抓取資料失敗:', error)
  }
}

const handleMetricSave = async (formData) => {
  // 既然子組件已經 fetch 成功才會 emit('save')，
  // 這裡我們只需要處理 UI 回饋即可

  // 1. 關閉輸入彈窗
  closeMetricsPopup()

  // 2. 顯示成功燈箱
  if (successModal.value) {
    successModal.value.show()
  }

  // 3. 重新抓取首頁最新數值，讓卡片變色
  await fetchTodayStats()
}

// 📄身體數值

const closePopup = () => {
  popupInfo.value = null
}
import HeaderImage from '@/assets/images/HomeView-header.svg'
// import { type } from 'node:os'
// import { text } from 'node:stream/consumers'

// 數值顏色判斷邏輯決定statusType樣式
const getStatus = (name, value, userHeight) => {
  if (value === '--' || value === null) return { type: 'none', text: '尚未量測' }

  const num = parseFloat(value)
  switch (name) {
    case '體重':
      if (!userHeight || userHeight <= 0) return { type: 'good', text: '已記錄' }

      // 計算 BMI
      const heightInMeters = userHeight / 100
      const bmi = num / (heightInMeters * heightInMeters)

      if (bmi >= 24) return { type: 'danger', text: `BMI: ${bmi.toFixed(1)} 偏重` }
      if (bmi < 18.5) return { type: 'low', text: `BMI: ${bmi.toFixed(1)} 過輕` }
      return { type: 'good', text: `BMI: ${bmi.toFixed(1)} 正常` }
    case '血氧':
      if (num < 90) return { type: 'danger', text: '含氧不足' }
      if (num < 95) return { type: 'low', text: '含氧偏低' }
      return { type: 'good', text: '含氧量佳' }
    case '血壓':
      const sys = parseInt(value.split('/')[0])
      if (sys >= 140) return { type: 'danger', text: '血壓偏高' }
      if (sys < 90) return { type: 'low', text: '血壓偏低' }
      return { type: 'good', text: '血壓正常' }
    case '心律':
      if (num > 100) return { type: 'danger', text: '心律過快' }
      if (num < 60) return { type: 'low', text: '心律偏低' }
      return { type: 'good', text: '心律正常' }
    case '血糖':
      // 血糖簡易判斷（空腹）：>126 偏高
      if (num >= 126) return { type: 'danger', text: '血糖偏高' }
      if (num < 70) return { type: 'low', text: '血糖偏低' }
      return { type: 'good', text: '血糖正常' }
    // 其他情形都到這裡
    default:
      return { type: 'good', text: '已記錄' }
  }
}
// 當API抓完一筆資料以後更新今日狀態
const updateHomeStats = (newData) => {
  if (newData['身高']) {
    userHeight.value = parseFloat(newData['身高'])
  }
  todayLog.value = todayLog.value.map((item) => {
    const latest = newData[item.name] //API 回傳格式對應時
    const status = getStatus(item.name, latest || '--', userHeight.value)
    return {
      ...item,
      num: latest || '--',
      statusType: status.type,
      statusText: status.text,
    }
  })
}

// 串接API(GET)抓會員的姓以及性別(header)
const memberInfo = ref({ lastName: '...', title: '...' })
// 早安/午安/晚安 判斷
const greetingTitle = computed(() => {
  const hour = new Date().getHours()
  let greet = '早安'
  if (hour >= 12 && hour < 18) greet = '午安'
  else if (hour >= 18) greet = '晚安'

  // 整句回傳
  // 早安，陳小姐！
  return `${greet}， \n${memberInfo.value.lastName}${memberInfo.value.title}！ `
})

const fetchMemberHeader = async () => {
  try {
    const res = await publicApi.get('home_modal/get_member_header.php')
    memberInfo.value = res.data
  } catch (error) {
    console.log('抓取會員資料失敗', error)
  }
}

// 生命週期
onMounted(() => {
  fetchTodayStats()
  fetchMemberHeader()
})
</script>
<template>
  <SuccessMessageModal ref="successModal" title="儲存成功" />
  <ErrorMessageModal ref="errorModal" title="儲存失敗" />
  <div class="home-container">
    <TheHeader
      :title="greetingTitle"
      :subtitle="'今天感覺如何？\n別忘了記錄喔~'"
      :imageSrc="HeaderImage"
    />

    <router-view />
    <!-- 左欄 -->
    <main>
      <ShowAnnouncement />
      <section class="left-block">
        <!-- 快速紀錄 -->
        <div class="today-button">
          <div class="block-title">
            <p>快速記錄</p>
          </div>
          <div class="buttonlist">
            <button
              v-for="item in fastButton"
              :key="item.name"
              :class="['record-card', `is-${item.type}`]"
              @click="openPopup(item)"
            >
              <AppIcon :name="item.icon" size="18" />
              <span class="button-text">{{ item.name }}</span>
            </button>
            <!-- 六個燈箱區 -->
            <Teleport v-if="popupInfo" to="body">
              <!-- <HomeCommonModal :modelValue="true" :title="`${popupInfo.name}`" :data="popupInfo"
                @update:modelValue="closePopup" @close="closePopup" />
              <HomeCommonModal
                :modelValue="true"
                :title="`${popupInfo.name}`"
                :data="popupInfo"
                @update:modelValue="closePopup"
                @close="closePopup"
              /> -->
              <NewDietaryRecord 
                v-if="popupInfo && popupInfo.type === 'diet'"
                :isOpen="true"
                :date="todayDate"
                @close="closePopup"
                @submit="handleDietSubmit"
              />
              <NewMedicineModals
                v-if="popupInfo.type === 'medicine'"
                :info="popupInfo"
                @close="closePopup"
              /> 
              <!-- <NewMedicineModals v-if="popupInfo.type === 'medicine'" :info="popupInfo" @close="closePopup" /> -->
              <!-- <div :style="{ position: 'fixed', inset: 0 }">
                {{ popupInfo.name }}
                <button @click="closePopup"></button>
              </div> -->
              <!-- <Popup1 :info="popupInfo" @close="closePopup" /> -->
            </Teleport>
            <Teleport v-if="isMetricsModalOpen" to="body">
              <MetricsInputForm
                :activeMetricKey="metricsKey"
                @close="closeMetricsPopup"
                @save="handleMetricSave"
              />
            </Teleport>
          </div>
        </div>
        <!-- 今日狀態  -->
        <div class="today-state">
          <div class="block-title">
            <p>今日狀態</p>
          </div>
          <div class="todayLog-cardlist">
            <div
              :class="['todayLog-card', `status-${item2.statusType}`]"
              v-for="item2 in todayLog"
              :key="item2.name"
            >
              <div class="card-icon">
                <AppIcon :name="item2.icon" size="20" />
              </div>

              <div class="card-title">
                <span class="log-name">{{ item2.name }}</span>
              </div>

              <div class="card-body">
                <span class="log-num">{{ item2.num }}</span>
                <span class="unit">{{ item2.unit }}</span>
                <small
                  v-if="item2.name === '體重' && userHeight > 0"
                  style="font-size: 12px; color: #999; margin-left: 5px"
                >
                  ({{ userHeight }}cm)
                </small>
              </div>

              <div class="state-footer">
                <div class="state-badge">{{ item2.statusText }}</div>
                <AppIcon
                  v-if="item2.statusType === 'danger' || item2.statusType === 'low'"
                  :name="item2.statusType === 'danger' ? 'trending_up' : 'trending_down'"
                  size="18"
                  class="warning-icon"
                />
              </div>
            </div>
          </div>
        </div>
      </section>
      <!-- 右欄 -->
      <section class="right-block">
        <div class="today-med">
          <div class="block-title">
            <p>今日服藥提醒</p>
          </div>
          <HomeTodayMedicine />
        </div>
        <div class="med-stock">
          <div class="block-title">
            <p>藥物庫存警示</p>
          </div>
          <HomeReserveMedicine />
        </div>
      </section>
    </main>
  </div>
</template>
<style lang="scss" scoped>
// 首頁限定greeting subtext(小手機換行)
@media (max-width: 425px) {
  /* 穿透進去處理標題與副標題 */
  :deep(.greeting),
  :deep(.subtext) {
    white-space: pre-line !important;
    line-height: 1.45;
  }
}
@media (max-width: 320px) {
  :deep(.greeting) {
    font-size: 12px;
    white-space: pre-line !important;
    line-height: 1.45;
  }
  :deep(.subtext) {
    font-size: 8px;
    white-space: pre-line !important;
    line-height: 1.45;
  }
  :deep(.illustration) {
    width: 120%;
  }
}

main {
  display: grid;
  // justify-content: center;
  // 設定兩欄，左側較寬，右側較窄。當寬度不足時自動換行
  grid-template-columns: 1.5fr minmax(300px, 400px);
  gap: 30px;

  // padding: 20px;
  @media (max-width: 1024px) {
    grid-template-columns: 1fr;
    gap: 20px;
  }
}

.left-block,
.right-block {
  width: 100%;
  margin-left: 0;
}

// 右欄
.today-med {
  background-color: $white;
  border-radius: $radius_md;
  height: 300px;
  width: 100%;
  margin-top: 65px;


  @media (max-width: 1025px) {
    margin-top: 0px;
  }

  .block-title {
    padding: 20px 20px 0 20px;
    color: $primaryDark;
    @include subtitle1(true);
    font-size: 18px; // 有改字體大小
  }
}

.med-stock {
  background-color: $white;
  border-radius: $radius_md;
  height: 150px;
  width: 100%;
  margin-top: 20px;

  .block-title {
    padding:  20px 20px 0 20px;
    color: $primaryDark;
    @include subtitle1(true);
    font-size: 18px; // 有改字體大小
  }
}

// 左欄
.today-button,
.today-state {
  margin: 20px 0;
}

// 各個標題
.block-title {
  margin: 20px 0;
  color: $primaryDark;
  @include subtitle1(true);
  font-size: 18px; // 有改字體大小
}

.buttonlist,
.todayLog-cardlist {
  display: grid;
  gap: 12px;
  grid-template-columns: repeat(3, 1fr);

  @media (max-width: 767px) {
    grid-template-columns: repeat(2, 1fr);
  }
}

button {
  border: none;
  background-color: $white;
  @include subtitle2(true);
  font-size: 16px; //material-symbols-rounded 要一起更動、大小字體一致
  text-align: center;
  padding: 15px;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  gap: 5px;
  box-shadow: $shadow;
  border-radius: $radius_md;
  color: $primaryDark;
  cursor: pointer;

  .material-symbols-rounded {
    @include subtitle2(true);
    font-size: 16px; //button 要一起更動、大小字體一致
  }
}

// 今日狀態樣式
.todayLog-card {
  box-sizing: border-box;
  background-color: $white;
  @include subtitle2(false);
  font-size: 12px; //material-symbols-rounded 要一起更動、大小字體一致
  padding: 12px;
  display: flex;
  flex-direction: column;
  gap: 5px;
  height: auto; // 讓高度隨內容撐開
  min-height: 160px;
  box-shadow: $shadow;
  border-radius: $radius_md;
  cursor: default;

  .card-icon {
    display: flex;
    justify-content: end;

    // .material-symbols-rounded {
    //   @include subtitle2(true);
    //   font-size: 16px; //card 要一起更動、大小字體一致
    // }
  }

  .card-body {
    @include subtitle2(true);
    display: flex;
    align-items: center;
    flex-direction: row;
    gap: 5px; // 數字與單位間距

    .log-num {
      font-size: 16px;
      margin: 5px 0; // 卡片內容上下距離
    }

    .unit {
      font-size: 16px;
    }
  }

  // 狀態：正常 (good)
  &.status-good {
    color: $primaryDark;

    // 讓右上角 icon 變色
    .state-badge {
      padding: 5px;
      background-color: $primaryLight;
      color: $primaryDark;
      border: none;
      border-radius: 100px;
    }
  }

  // 狀態：偏高 (danger)
  &.status-danger {
    border: 1px solid #ff5252;
    background-color: $white;
    color: $accent;

    .state-badge {
      padding: 5px;
      background-color: $accent;
      color: white;
      border: none;
      border-radius: 100px;
    }

    .warning-icon {
      color: $accent;
    }
  }

  // 狀態：偏低 (low)
  &.status-low {
    border: 1px solid #518fe7;
    background-color: white;

    color: #518fe7;

    .state-badge {
      padding: 5px;
      background-color: #518fe7;
      color: white;
      border: none;
      border-radius: 100px;
    }

    .warning-icon {
      color: #518fe7;
    }
  }

  // 狀態：尚未測量 (none)
  &.status-none {
    color: $accent;

    .state-badge {
      padding: 5px;
      background-color: $accentLight;
      color: $accent;
      border: 1px solid #e0e0e0;
      border-radius: 100px;
    }
  }
}

.state-footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: auto; // 確保對齊底部
}

.warning-icon {
  font-size: 18px;
}
</style>
