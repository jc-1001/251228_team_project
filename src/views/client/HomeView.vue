<script setup>
import { ref } from 'vue'
import TheHeader from '@/components/common/TheHeader.vue'
// 快速紀錄
const fastButton = ref([
  { name: '吃藥', icon: 'medication', type: 'green' },
  { name: '飲食日記', icon: 'restaurant', type: 'green' },
  { name: '體重', icon: 'monitor_weight', type: 'alert' },
  { name: '血糖', icon: 'bloodtype', type: 'alert' },
  { name: '血氧', icon: 'water_drop', type: 'green' },
  { name: '血壓/心律', icon: 'favorite', type: 'green' },
])
// 今日狀態
const todayLog = ref([
  { name: '體重', icon: 'monitor_weight', type: true, num: '', record: true, log: 'green' },
  { name: '血氧', icon: 'water_drop', type: true, num: '', record: true, log: 'green' },
  { name: '血糖', icon: 'bloodtype', type: true, num: '', record: true, log: 'green' },
  { name: '心律', icon: 'favorite', type: true, num: '', record: true, log: 'green' },
  { name: '血壓', icon: 'favorite', type: true, num: '', record: true, log: 'green' },
])
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
            >
              <span class="material-icons">{{ item.icon }}</span>
              <span class="button-text">{{ item.name }}</span>
            </button>
          </div>
        </div>
        <!-- 今日狀態  -->
        <div class="today-state">
          <div class="block-title">
            <p>今日狀態</p>
          </div>
          <div class="todayLog-cardlist">
            <div class="todayLog-card" v-for="item2 in todayLog" :key="item2.name">
              <span class="material-icons">{{ item2.icon }}</span>
              <span class="log-name">{{ item2.name }}</span>
              <span class="log-num">{{ item2.num }}</span>
              <span class="state">{{ item2.log }}</span>
            </div>
          </div>
        </div>
      </section>
      <!-- 右欄 -->
      <section class="right-block"></section>
    </main>
  </div>
</template>
<style lang="scss" scoped>
main {
  display: flex;
  flex-direction: row;
}
.left-block {
  width: 60%;
}
.right-block {
  width: 40%;
}
.today-button,
.today-state {
  margin: 20px 0;
}
.block-title {
  margin: 20px 0;
  color: $primaryDark;
  @include subtitle1(true);
  font-size: 18px; // 有改字體大小
}
.buttonlist {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 12px; // 卡片之間的間距
  // padding: 16px 20px;
}
button {
  border: none;
  background-color: $white;
  @include subtitle2(true);
  font-size: 16px; //material-icons 要一起更動、大小字體一致
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
  .material-icons {
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
// 今日狀態
.todayLog-cardlist {
  width: 100%;
  // background-color: white;
  // border: 1px solid black;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 12px; // 卡片之間的間距
}
.todayLog-card {
  background-color: $white;
  @include subtitle2(true);
  font-size: 16px; //material-icons 要一起更動、大小字體一致
  text-align: center;
  padding: 15px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 5px;
  height: 180px;
  box-shadow: $shadow;
  border-radius: $radius_md;
  cursor: default;
  .material-icons {
    @include subtitle2(true);
    font-size: 16px; //card 要一起更動、大小字體一致
  }
}
</style>
