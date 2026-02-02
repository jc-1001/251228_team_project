<script setup>
import { ref,onMounted } from 'vue'
import TheProfileHeader from '@/components/common/TheProfileHeader.vue'
import TheprofileSide from '@/components/common/TheprofileLayout.vue'
import { publicApi } from '@/utils/publicApi'

// icon
import coinIcon from '@/assets/images/shop/icon/coin.svg'
import touchIcon from '@/assets/images/shop/icon/touch.svg'
import touchIconWhite from '@/assets/images/shop/icon/touch_white.svg'
import check from '@/assets/images/shop/icon/order_check.svg'

// 積分資料設定
const currentPoints = ref(0)
const isSigned = ref(false)
// 歷史紀錄
const historyList = ref([])
// 取得今日日期字串 (YYYY-MM-DD)
const getTodayStr = () => {
  const now = new Date()
  const year = now.getFullYear()
  const month = String(now.getMonth() + 1).padStart(2, '0')
  const day = String(now.getDate()).padStart(2, '0') // 修正括號位置
  return `${year}-${month}-${day}`
}


// 獲取總分&歷史紀錄 (合併呼叫)

const initData = async () => {
  try {
    // 1. 抓總積分
    const resTotal = await publicApi.get('member/get_total_points.php')
    currentPoints.value = resTotal.data.total_points || 0

    // 2. 抓歷史紀錄
    const resHistory = await publicApi.get('member/get_my_points.php')
    historyList.value = resHistory.data.data

    // 3. 判斷今日有沒有簽到 (檢查歷史紀錄第一筆是不是今天且是簽到)
    checkIfSignedToday()

  } catch (err) {
    console.error('初始化資料失敗:', err)
  }
}

onMounted(()=>{
  initData()
})


// 判斷是否已簽到
const checkIfSignedToday = () => {
  if(historyList.value.length === 0) return

  const lastRecord = historyList.value[0]
  const todayStr = getTodayStr()

  if(lastRecord.source == 2 && lastRecord.date.startsWith(todayStr)) {
    isSigned.value = true
  }
}

// 點擊簽到
const handleCheckIn = async () => {
  if (isSigned.value === true) return

  try {
    const res = await publicApi.get('member/check_in.php')
    
    if(res.data.success) {
      isSigned.value = true

      // 數字滾動動畫
      animateValue(currentPoints.value, currentPoints.value + res.data.point, 1000)
      // 發送金幣函式
      triggerCoinAnimation()

      // 手動插一筆紀錄到list最前面
      historyList.value.unshift({
        id: Date.now(),
        title: '每日簽到獎勵',
        date: getTodayStr(),
        amount: res.data.point,
        source: 2
      })
    } else {
      isSigned.value = true
      alert(res.data.message)
    }

  } catch (err) {
    console.error(err)
    alert('簽到失敗，請檢查網路')
  }
  
}

// DOM元素定位
const checkInBtnRef = ref(null) // 發送
const coinTargetRef = ref(null) // 接收

// 工具函式-數字滾動效果 =========
const animateValue = (start, end, duration) => {
  // 記錄動畫開始的瞬間
  const startTime = performance.now()

  // 每一幀動畫要重複執行的部分
  const step = (currentTime) => {
    // 算出進度條，最多不能超過1(100%)
    const progress = Math.min((currentTime - startTime) / duration, 1)
    // Ease Out效果公式
    const easeProgress = 1 - Math.pow(1 - progress, 3)
    // 算出目前數字
    const value = Math.floor(start + (end - start) * progress)

    currentPoints.value = value

    // 如果進度還沒到 1 (還沒跑完)，就預約下一幀繼續跑
    if (progress < 1) {
      requestAnimationFrame(step)
    }
  }
  // 可達成流暢的動畫
  requestAnimationFrame(step)
}

// 工具函式-金幣動畫 =========
const triggerCoinAnimation = () => {
  // 抓座標
  const btnRect = checkInBtnRef.value.getBoundingClientRect()
  const targetRect = coinTargetRef.value.getBoundingClientRect()

  // 計算中心點
  const startX = btnRect.left + btnRect.width / 2
  const startY = btnRect.top + btnRect.height / 2
  const endX = targetRect.left + targetRect.width / 2
  const endY = targetRect.top + targetRect.height / 2

  // 發射硬幣
  for (let i = 0; i < 8; i++) {
    setTimeout(() => {
      createFlyingCoin(startX, startY, endX, endY)
    }, i * 100)
  }
}

const createFlyingCoin = (x, y, targetX, targetY) => {
  // 創建一個硬幣
  const coin = document.createElement('div')
  coin.className = 'flying_coin'
  coin.innerText = '🪙'

  // 初始位置
  coin.style.left = `${x}px`
  coin.style.top = `${y}px`

  // 掛載到body上，避免被裁切掉
  document.body.appendChild(coin)

  // 執行動畫(Web Animation API)
  const animation = coin.animate([
    { transform: 'translate(-50%, -50%) scale(0.5)', opacity: 1 }, // 起點
    { transform: `translate(${targetX - x}px, ${targetY - y}px) scale(1.5) rotate(360deg)`, opacity: 0 } // 終點
  ], {
    duration: 800,
    easing: 'cubic-bezier(0.25, 1, 0.5, 1)' // 先慢後快
  })

  // 飛完後把元素刪掉，才不會佔記憶體
  animation.onfinish = () => {
    coin.remove()
  }
}

</script>

<template>
  <TheProfileHeader />

  <TheprofileSide title="我的積分" :show-title="false">
    <div class="points_page">
      <h3 class="page_title">我的積分</h3>
      <hr class="divider">

      <div class="score_banner">
        <div class="banner_content">
          <span class="label">目前累積積分</span>
          <div class="score_row">
            <span class="score_val">{{ currentPoints.toLocaleString() }}</span>
            <span class="score_unit">點</span>
          </div>
        </div>
        <div class="banner_icon" ref="coinTargetRef">
          <span class="icon">
            <img :src="coinIcon">
          </span>
        </div>
      </div>

      <div class="checkin_card">
        <div class="checkin_info">
          <h4>每日簽到活動</h4>
          <p v-if="!isSigned">現在簽到立即獲得 50 點！</p>
          <p v-else>明天記得再來領取積分喔！</p>
        </div>

        <button ref="checkInBtnRef" class="btn_checkin" :class="{ 'disabled': isSigned }" @click="handleCheckIn">
          <span class="icon">
            <img :src="touchIcon" v-if="!isSigned" class="icon_default">
            <img :src="touchIconWhite" v-if="!isSigned" class="icon_hover">
            <img :src="check" v-if="isSigned">
          </span>
          {{ isSigned ? '已完成簽到' : '立即簽到' }}
        </button>
      </div>

      <div class="history_section">
        <h4 class="sub_title">積分變動紀錄</h4>
        <div class="history_list">
          <div class="history_item" v-for="item in historyList" :key="item.id">
            <div class="item_left">
              <p class="title">{{ item.title }}</p>
              <p class="date">{{ item.date }}</p>
            </div>
            <div class="item_right" :class="item.amount > 0 ? 'pos' : 'neg'">
              {{ item.amount > 0 ? '+' : '' }}{{ item.amount.toLocaleString() }}
            </div>
          </div>
        </div>
      </div>

    </div>
  </TheprofileSide>
</template>

<style lang="scss" scoped>
.points_page {
  display: flex;
  flex-direction: column;
}

.page_title {
  margin-bottom: 16px;
  @include subtitle1(true);
  color: $primaryDark;
}

.divider {
  margin-bottom: 24px;
  border: 0;
  border-top: 1px solid #eee;
}

// Banner
.score_banner {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 24px;
  padding: 30px 40px;
  color: white;
  background: $linear2;
  border-radius: $radius_md;
  box-shadow: $shadow;
  @media screen and (max-width: 576px) {
    padding: 24px 24px;
  }

  .banner_content {
    .label {
      @include body2;
    }

    .score_row {
      display: flex;
      align-items: baseline;
      margin-top: 8px;

      .score_val {
        font-size: 48px;
        font-weight: bold;
        line-height: 1;
      }

      .score_unit {
        margin-left: 4px;
        @include body1;
      }
    }
  }

  .banner_icon .icon img {
    width: 80px;
    @media screen and (max-width: 576px) {
      width: 54px;
    }
  }
}

// 簽到卡片
.checkin_card {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 32px;
  padding: 20px 24px;
  background-color: #F1F8E9;
  border: 2px dashed #AED581;
  border-radius: $radius_md;

  .checkin_info {
    h4 {
      margin-bottom: 4px;
      color: $primaryDark;
      font-weight: bold;
    }

    p {
      color: $grayDark;
      font-size: 14px;
    }
  }

  .btn_checkin {
    display: flex;
    align-items: center;
    gap: 8px;
    padding: 10px 24px;
    color: #5D4037;
    background-color: #FFC107;
    border: none;
    border-radius: 50px;
    font-weight: bold;
    box-shadow: $shadow;
    cursor: pointer;
    transition: all .3s;
    .icon {
      display: flex;
      .icon_hover {
        display: none;
      }
    }
    &:not(.disabled):hover {
      .icon_hover {
        display: block;
      }
      .icon_default {
        display: none;
      }
    }

    &:active,
    &:hover {
      transform: translateY(-2px);
      color: $white;
      background-color: $primary;
    }

    &.disabled {
      color: white;
      background-color: $disabled;
      box-shadow: none;
      cursor: default;
      transform: translateY(2px); // 維持按下的樣子
    }
  }
}

// 歷史紀錄
.sub_title {
  margin-bottom: 12px;
  padding-bottom: 8px;
  @include body1(true);
  color: $primaryDark;
  border-bottom: 1px solid $gray;
}

.history_list {
  display: flex;
  flex-direction: column;

  .history_item {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 16px 0;
    border-bottom: 1px solid #e6e6e6;

    .item_left {
      .title {
        margin-bottom: 4px;
        font-weight: bold;
        color: $black;
      }

      .date {
        font-size: 13px;
        color: $grayDark;
      }
    }

    .item_right {
      @include body1(true);

      &.pos {
        color: $primary;
      }

      &.neg {
        color: $accent;
      }
    }
  }
}

// rwd
@media (max-width: 576px) {
  .checkin_card {
    flex-direction: column;
    gap: 16px;
    text-align: center;
  }
}
</style>

<style>
.flying_coin {
  position: fixed;
  font-size: 24px;
  pointer-events: none;
  z-index: 9999;
}
</style>
