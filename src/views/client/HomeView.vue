<script setup>
import { ref, Teleport } from 'vue'
import TheHeader from '@/components/common/TheHeader.vue'
import HomeCommonModal from '@/components/common/client/modals/HomeCommonModal.vue'
import dayjs from 'dayjs'
import HomeTodayMedicine from '@/components/common/HomeTodayMedicine.vue'

// 引入燈箱元件
// 快速紀錄
import ConfirmActionModal from '@/components/common/client/modals/ConfirmActionModal.vue'
import SuccessMessageModal from '@/components/common/client/modals/SuccessMessageModal.vue'
import NewMedicineModals from '@/components/common/client/modals/NewMedicineModals.vue'
<<<<<<< HEAD
import MetricsInputForm from '@/components/common/client/modals/MetricsInputForm.vue'
=======
import NewDietaryRecord from '@/components/common/client/modals/NewDietaryRecord.vue'
>>>>>>> 821baae957539a19e7ad0727c8b3e8196c5d0a50

// 六個燈箱初始化
const isModalOpen = ref(false)
const selectedData = ref({
  time: '2026-01-17',
  inputLabel: '使用者帳號',
})

//飲食紀錄相關
const todayDate = ref(dayjs().format('YYYY-MM-DD'))
// 處理儲存後的動作
const handleDietSubmit = (data) => {
  console.log('收到飲食紀錄資料：', data)
  // 串接API儲存資料
  closePopup() // 儲存後關閉
}

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

const handleMetricSave = (payload) => {
  console.log('from MetricsInputForm:', payload)
  // 之後可以呼叫 API / 寫入 json / 更新 todayLog 
}
// 📄身體數值

const closePopup = () => {
  popupInfo.value = null
}
</script>
<template>
  <div class="home-container">
    <TheHeader title="早安，陳小姐！" subtitle="今天感覺如何？別忘了量血壓喔～" imageSrc="/src/assets/images/HomeView-header.svg" />

    <router-view />
    <!-- 左欄 -->
    <main>
      <section class="left-block">
        <!-- 快速紀錄 -->
        <div class="today-button">
          <div class="block-title">
            <p>快速記錄</p>
          </div>
          <div class="buttonlist">
            <button v-for="item in fastButton" :key="item.name" :class="['record-card', `is-${item.type}`]"
              @click="openPopup(item)">
              <span class="material-symbols-rounded">{{ item.icon }}</span>
              <span class="button-text">{{ item.name }}</span>
            </button>
            <!-- 六個燈箱區 -->
            <Teleport v-if="popupInfo" to="body">
<<<<<<< HEAD
              <HomeCommonModal :modelValue="true" :title="`${popupInfo.name}`" :data="popupInfo"
                @update:modelValue="closePopup" @close="closePopup" />
=======
              <HomeCommonModal
                :modelValue="true"
                :title="`${popupInfo.name}`"
                :data="popupInfo"
                @update:modelValue="closePopup"
                @close="closePopup"
              />
              <NewDietaryRecord 
                v-if="popupInfo.type === 'diet'"
                :isOpen="true" 
                :date="todayDate"
                @close="closePopup"
                @submit="handleDietSubmit"
              />
>>>>>>> 821baae957539a19e7ad0727c8b3e8196c5d0a50
              <!-- <SuccessMessageModal ref="productModal" title="儲存成功" /> -->
              <!-- <ConfirmActionModal
                ref="productModal"
                title="確定要下架此商品嗎？"
                confirmText="商品已成功下架"
                denyText="商品維持上架狀態"
                icon="warning"
                @confirmed="handleProductLogic"
                :info="popupInfo"
                @close="closePopup"
              /> -->
              <NewMedicineModals :info="popupInfo" @close="closePopup" />
              <!-- <div :style="{ position: 'fixed', inset: 0 }">
                {{ popupInfo.name }}
                <button @click="closePopup"></button>
              </div> -->
              <!-- <Popup1 :info="popupInfo" @close="closePopup" /> -->
            </Teleport>
            <Teleport v-if="isMetricsModalOpen" to="body">
              <MetricsInputForm :activeMetricKey="metricsKey" @close="closeMetricsPopup" @save="handleMetricSave" />
            </Teleport>
          </div>
        </div>
        <!-- 今日狀態  -->
        <div class="today-state">
          <div class="block-title">
            <p>今日狀態</p>
          </div>
          <div class="todayLog-cardlist">
            <div :class="['todayLog-card', `status-${item2.statusType}`]" v-for="item2 in todayLog" :key="item2.name">
              <div class="card-icon">
                <span class="material-symbols-rounded">{{ item2.icon }}</span>
              </div>

              <div class="card-title">
                <span class="log-name">{{ item2.name }}</span>
              </div>

              <div class="card-body">
                <span class="log-num">{{ item2.num }}</span>
                <span class="unit">{{ item2.unit }}</span>
              </div>

              <div class="state-footer">
                <div class="state-badge">{{ item2.statusText }}</div>
                <span v-if="item2.statusType === 'danger' || item2.statusType === 'low'"
                  class="material-symbols-rounded warning-icon">
                  {{ item2.statusType === 'danger' ? 'trending_up' : 'trending_down' }}
                </span>
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
            <span class="material-symbols-rounded"></span>
            <p>藥物庫存警示</p>
          </div>
        </div>
      </section>
    </main>
  </div>
</template>
<style lang="scss" scoped>
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
  overflow: auto;

  @media (max-width: 1025px) {
    margin-top: 0px;
  }

  .block-title {
    padding: 20px;
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
    padding: 0 20px;
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

    .material-symbols-rounded {
      @include subtitle2(true);
      font-size: 16px; //card 要一起更動、大小字體一致
    }
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
    .material-symbols-rounded {
      color: $primaryDark;
    }

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

    .material-symbols-rounded {
      color: $accent;
    }

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

    .material-symbols-rounded {
      color: #518fe7;
    }

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

    // .log-num,
    // .unit {
    //   color: #9e9e9e;
    // }
    .material-symbols-rounded {
      color: $accent;
    }

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
