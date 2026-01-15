<script setup>
import { ref, Teleport } from 'vue'
import TheHeader from '@/components/common/TheHeader.vue'

// 引入燈箱元件
// 快速紀錄

import NewMedicineModals from '@/components/common/client/modals/NewMedicineModals.vue'

const fastButton = ref([
  { name: '吃藥', icon: 'medication', type: 'green'},
  { name: '飲食日記', icon: 'restaurant', type: 'green'},
  { name: '體重', icon: 'monitor_weight', type: 'alert' },
  { name: '血糖', icon: 'bloodtype', type: 'alert' },
  { name: '血氧', icon: 'water_drop', type: 'green' },
  { name: '血壓/心律', icon: 'favorite', type: 'green' },
])
// 今日狀態
const todayLog = ref([
  {
    name: '體重',
    icon: 'monitor_weight',
    num: '--',
    unit: 'kg',
    statusText: '尚未量測',
    statusType: 'none',
  },
  {
    name: '血氧',
    icon: 'water_drop',
    num: '95',
    unit: '%',
    statusText: '含氧量佳',
    statusType: 'good',
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
    statusText: '心律穩定',
    statusType: 'good',
  },
  {
    name: '血壓',
    icon: 'favorite',
    num: '140/80',
    unit: 'mmHg',
    statusText: '血壓偏高',
    statusType: 'danger', // 用於控制紅色外框與背景
    isWide: true, // 用於控制 RWD 跨欄
  },
])

// 燈箱開關控制
const popupInfo = ref(null)
const openPopup = (item) => {
  popupInfo.value = item
}

const closePopup = () => {
  popupInfo.value = null
}
</script>
<template>
  <div class="home-container">
    <TheHeader
      title="早上好，陳小姐！"
      subtitle="今天感覺如何？別忘了量血壓喔～"
      imageSrc="/src/assets/images/HomeView-header.svg"
    />

    <router-view />
    <!-- 左欄 -->
    <main>
      <section class="left-block">
        <!-- 快速紀錄 -->
        <div class="today-button">
          <div class="block-title">
            <p>快速紀錄</p>
          </div>
          <div class="buttonlist">
            <button
              v-for="item in fastButton"
              :key="item.name"
              :class="['record-card', `is-${item.type}`]"
              @click="openPopup(item)"
            >
              <span class="material-symbols-rounded">{{ item.icon }}</span>
              <span class="button-text">{{ item.name }}</span>
            </button>
            <!-- 六個燈箱區 -->
            <Teleport v-if="popupInfo" to="body">
                   <NewMedicineModals :info="popupInfo" @close="closePopup" />
              <!-- <div :style="{ position: 'fixed', inset: 0 }">
                {{ popupInfo.name }}
                <button @click="closePopup"></button>
              </div> -->
              <!-- <Popup1 :info="popupInfo" @close="closePopup" /> -->
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
              :class="['todayLog-card', `status-${item2.statusType}`, { 'is-wide': item2.isWide }]"
              v-for="item2 in todayLog"
              :key="item2.name"
            >
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

              <div class="state-badge">{{ item2.statusText }}</div>
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
  cursor: pointer;
  .material-symbols-rounded {
    @include subtitle2(true);
    font-size: 16px; //button 要一起更動、大小字體一致
  }
}

// 動態顏色
.is-green {
  color: $primaryDark;
}
.is-alert {
  color: $primaryDark;
  background-color: #f3f7ec; // 獨立使用
  border: 1px solid $gray;
}
// 今日狀態樣式
.todayLog-card {
  box-sizing: border-box;
  background-color: $white;
  @include subtitle2(false);
  font-size: 16px; //material-symbols-rounded 要一起更動、大小字體一致
  padding: 15px;
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
      font-size: 24px;
      margin: 5px 0; // 卡片內容上下距離
    }
  }
  .state-badge {
    border: 1px solid black;
    background-color: white;
    width: fit-content;
    padding: 4px;
    font-size: 12px;
    border-radius: 100px;
  }
  .is-Wide {
    grid-column: span 2; // 寬螢幕時佔兩格
    flex-direction: row; // 內容改為橫向排列
    justify-content: space-around;
  }
}
</style>
