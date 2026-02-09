<script setup>
import { ref, onMounted } from 'vue'
import { publicApi } from '@/utils/publicApi'
import giftIcon from '@/assets/images/shop/gift_vector.svg'
import coinIcon from '@/assets/images/shop/icon/coin.svg'
import chestIcon from '@/assets/images/shop/icon/inventory.svg'

// 抓取member_id
const getMemberId = () => {
  const profile = JSON.parse(localStorage.getItem('userProfile') || '{}')
  return profile.member_id || 0
}

// 控制開關狀態
const isVisible = ref(false)
const isModalOpen = ref(false)
const rewardPoints = ref(0)


// 遊戲階段: 'intro'(介紹) -> 'quiz'(答題) -> 'opening'(開箱動畫) -> 'result'(結果)
const gamePhase = ref('intro')

// 題庫
const questionList = [
  {
    q: 'Unicare 的招牌保健成分 UC-II 主要是針對哪個部位的保養？',
    options: ['眼睛晶亮', '關節靈活', '腸胃蠕動'],
    ans: 1
  },
  {
    q: '一般建議成年人每日飲水量至少要達到多少？',
    options: ['500cc', '1000cc', '2000cc'],
    ans: 2
  },
  {
    q: '想要補充維生素 C，下列哪種水果含量最高？',
    options: ['芭樂', '蘋果', '香蕉'],
    ans: 0
  }
]

// 當前題目
const currentQ = ref({})


// 檢查是否已經領過 (避免重複領取)
const checkDailyStatus = () => {
  const lastOpenDate = localStorage.getItem('unicare_daily_chest')
  const today = new Date().toDateString()

  if (lastOpenDate !== today) {
    isVisible.value = true
  }
}

// 開始遊戲 (進入問答)
const startGame = () => {
  // 從questionList隨機出一題
  const randomIndex = Math.floor(Math.random() * questionList.length)
  currentQ.value = questionList[randomIndex]
  gamePhase.value = 'quiz'
}

// 處理回答
const handleAnswer = (answer) => {
  if (answer === currentQ.value.ans) {
    gamePhase.value = 'opening'
    handleOpen()
  } else {
    alert('答錯囉！再試一次看看吧！')
  }
}

// 領獎邏輯

const handleOpen = async () => {
  const memberId = getMemberId()
  let points = 0

  const apiRequest = memberId 
    ? publicApi.post('member_center/quiz_reward.php', { member_id: memberId })
    : Promise.resolve({ data: { success: true, points: Math.floor(Math.random() * 50) + 10 } }) // 訪客用的模擬數據

  // 建立動畫延遲
  const animationDelay = new Promise(resolve => setTimeout(resolve, 2500))

  try {
    // 等待 API 回傳 AND 動畫跑完
    const [res] = await Promise.all([apiRequest, animationDelay])

    if (res.data && res.data.success) {
      points = res.data.points
    } else {
      points = 10 
    }

    // 更新畫面
    rewardPoints.value = points
    gamePhase.value = 'result'
    
    // 紀錄前端 localStorage
    localStorage.setItem('unicare_daily_chest', new Date().toDateString())

  } catch (err) {
    console.error(err)
    // 斷網也要讓使用者玩完
    rewardPoints.value = 10
    gamePhase.value = 'result'
  }
}

// 關閉遊戲
const closeGame = () => {
  isModalOpen.value = false
  setTimeout(() => {
    isVisible.value = false
    gamePhase.value = 'intro'
  }, 500)
}

onMounted(() => {
  checkDailyStatus()
})
</script>

<template>
  <div class="lucky_chest_container">
    <Transition name="bounce">
      <div v-if="isVisible && !isModalOpen" class="floating_ball_wrapper">
        <div class="floating_ball" @click="isModalOpen = true">
          <div class="glow-effect"></div>
          <img :src="giftIcon" alt="有獎徵答icon" class="gift_icon">
          <span class="close_btn" @click.stop="isVisible = false">x</span>
        </div>
      </div>
    </Transition>

    <Transition name="fade">
      <div v-if="isModalOpen" class="game_overlay" @click.self="isModalOpen = false">

        <div class="game_card">
          <button class="modal_close" @click="isModalOpen = false">
            ✕
          </button>

          <div v-if="gamePhase === 'intro'" class="game_content intro">
            <h3 class="title">每日有獎徵答</h3>
            <p class="desc">回答一個健康小問題，即可獲得商城積分！</p>

            <div class="chest_preview">
              <img :src="giftIcon" alt="Logo" class="intro-logo">
            </div>

            <button class="primary_btn" @click="startGame">開始挑戰</button>
          </div>

          <div v-if="gamePhase === 'quiz'" class="game_content quiz">
            <h3 class="quiz_title">Q: {{ currentQ.q }}</h3>
            <div class="options_list">
              <button v-for="(option, index) in currentQ.options" :key="index" @click="handleAnswer(index)"
                class="option_btn">{{ option }}</button>
            </div>
          </div>

          <div v-else-if="gamePhase === 'opening'" class="game_content opening">
            <h3 class="title" style="margin-bottom: 30px;">答對了！</h3>
            <div class="chest_container shaking">
              <svg class="chest_svg" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
                <rect x="20" y="40" width="60" height="40" rx="4" fill="#FFB74D" />
                <rect x="18" y="32" width="64" height="12" rx="2" fill="#FFA726" />
                <circle cx="50" cy="55" r="5" fill="#FFD54F" />
                <path d="M50 55 L50 65" stroke="#F57C00" stroke-width="2" />
                <rect x="20" y="40" width="8" height="40" fill="#FB8C00" fill-opacity="0.3" />
                <rect x="72" y="40" width="8" height="40" fill="#FB8C00" fill-opacity="0.3" />
              </svg>
              <div class="opening_light"></div>
            </div>
            <p class="desc">您今日的幸運積分是...</p>
          </div>

          <div v-else-if="gamePhase === 'result'" class="game_content result">
            <div class="sunburst"></div>

            <div class="result_icon">
              <svg viewBox="0 0 24 24" fill="none" class="coin_svg" xmlns="http://www.w3.org/2000/svg">
                <circle cx="12" cy="12" r="10" fill="#FFD700" stroke="#F59E0B" stroke-width="2" />
                <circle cx="12" cy="12" r="7" stroke="#F59E0B" stroke-width="1.5" stroke-dasharray="2 2" />
                <text x="50%" y="50%" text-anchor="middle" dy=".3em" font-size="10" font-weight="bold"
                  fill="#B45309">$</text>
              </svg>
            </div>

            <h3 class="title">恭喜獲得</h3>
            <div class="points_display">
              <span class="num">{{ rewardPoints }}</span>
              <span class="unit">積分</span>
            </div>

            <p class="desc_sub">積分可用於折抵消費</p>
            <button class="primary_btn success" @click="closeGame">收下獎勵</button>
          </div>
        </div>
      </div>
    </Transition>
  </div>
</template>

<style lang="scss" scoped>
// 定義一些區域變數，讓質感更高級
$gold: #FFD700;
$gold-dark: #F59E0B;
$gradient-bg: linear-gradient(135deg, #ffffff 0%, #f3f4f6 100%);


// 懸浮球
.floating_ball_wrapper {
  position: fixed;
  right: 24px;
  bottom: 100px;
  z-index: 90;
}

.floating_ball {
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  width: 90px;
  height: 90px;
  border-radius: 50%;
  border: 4px solid white;
  box-shadow:
    0 4px 12px rgba($primary, 0.4),
    0 0 0 4px rgba($white, 0.2),
    inset 0 2px 4px rgba($white, 0.3);
  cursor: pointer;
  transition: transform 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);

  &:hover {
    transform: scale(1.1) rotate(-5deg);

    .close_btn {
      transform: scale(1.1);
    }
  }

  .gift_icon {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  // 漂浮圖示右上角的叉叉按鈕
  .close_btn {
    position: absolute;
    top: -5px;
    right: -5px;
    background: $accent;
    color: white;
    width: 25px;
    height: 25px;
    font-size: 12px;
    font-weight: 700;
    text-align: center;
    border-radius: 50%;
    border: 2px solid $white;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
    transition: transform 0.3s;
  }

  // 呼吸燈效果
  .glow-effect {
    position: absolute;
    inset: -10px;
    border-radius: 50%;
    background: radial-gradient(circle, rgba($primary, 0.4) 0%, transparent 70%);
    animation: pulse 2s infinite;
    z-index: -1;
  }
}

// 彈窗遮罩
.game_overlay {
  display: flex;
  align-items: center;
  justify-content: center;
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.6);
  backdrop-filter: blur(5px);
  z-index: 1000;
}

// 卡片本體
.game_card {
  position: relative;
  padding: 40px 30px;
  width: 90%;
  max-width: 380px;
  min-height: 400px; // 避免切換內容時跳動
  background: $white;
  border-radius: 24px;
  text-align: center;
  box-shadow:
    0 20px 40px rgba(0, 0, 0, 0.2),
    0 0 0 1px rgba($white, 0.5);
  overflow: hidden;
}

.modal_close {
  display: flex;
  align-items: center;
  justify-content: center;
  position: absolute;
  top: 16px;
  right: 16px;
  width: 32px;
  height: 32px;
  border-radius: 50%;
  background: #f3f4f6;
  border: none;
  color: #666;
  cursor: pointer;
  transition: all 0.2s;
  z-index: 2;

  &:hover {
    background: #e5e7eb;
    color: $black;
  }
}

.game_content {
  position: relative;
  z-index: 1;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;

  .title {
    margin-bottom: 8px;
    font-size: 22px;
    font-weight: 700;
    color: $primaryDark;
    letter-spacing: 0.5px;
  }

  .desc {
    margin-bottom: 30px;
    font-size: 15px;
    color: #6B7280;
  }
}

// Intro 階段
.chest_preview {
  margin: 20px auto;
  width: 120px;
  img { width: 100%; }
}

// Quiz 階段
.quiz_title {
  margin-top: 24px;
  margin-bottom: 32px;
  @include body1(true);
  color: $primaryDark;
  text-align: left;
}
.options_list {
  display: flex;
  flex-direction: column;
  gap: 16px;
  width: 100%;
  .option_btn {
    width: 100%;
    padding: 12px;
    @include body2;
    color: $primaryDark;
    background: white;
    border: 2px solid $primary;
    border-radius: $radius_md;
    cursor: pointer;
    transition: all 0.2s;
    &:hover {
      background: $primary;
      color: white;
    }
  }
}

// Opening 階段
.chest_container {
  width: 140px;
  height: 140px;
  margin: 0 auto 30px;
  position: relative;

  .chest_img {
    width: 100%;
    height: 100%;
    object-fit: contain;
    z-index: 2;
  }

  &.shaking {
    animation: hardcore-shake 0.8s cubic-bezier(.36,.07,.19,.97) both infinite;
  }

  .opening_light {
    position: absolute;
    top: 50%; left: 50%;
    transform: translate(-50%, -50%);
    width: 120%; height: 120%;
    background: radial-gradient(circle, #fff 10%, transparent 70%);
    animation: flash 0.5s;
    z-index: 1;
  }
}

// Result 階段
.result {
  .sunburst {
    position: absolute;
    top: 50%; left: 50%;
    width: 400px; height: 400px;
    background: repeating-conic-gradient(from 0deg, rgba($gold, 0.1) 0deg 20deg, transparent 20deg 40deg);
    transform: translate(-50%, -50%);
    animation: rotate-sun 10s linear infinite;
    z-index: -1;
  }

  .title {
    margin-bottom: 16px;
  }

  .result_icon .coin_svg {
    width: 80px;
    margin-bottom: 16px;
    filter: drop-shadow(0 8px 16px rgba($gold-dark, 0.4));
  }
  
  .points_display {
    color: $gold-dark;
    margin-bottom: 24px;
    .num {
      font-size: 64px;
      font-weight: 900;
      line-height: 1;
    }

    .unit {
      @include body1(true);
      margin-left: 6px;
      color: $grayDark;
    }
  }
  .desc_sub {
    @include body3;
    color: $grayDark;
    margin-bottom: 30px;
  }
}

// 按鈕樣式
.primary_btn {
  width: 100%;
  padding: 14px 20px;
  border-radius: $radius_md;
  border: none;
  // background: $primary;
  background: $primaryDark;
  color: $white;
  @include body2(true);
  cursor: pointer;
  box-shadow: 0 4px 6px rgba($primary, 0.2);
  transition: all .3s;

  &:hover:not(:disabled) {
    background: $primary;
    box-shadow: 0 6px 12px rgba($primary, 0.3);
  }

  &:active {
    transform: translateY(0);
  }

  &:disabled {
    background: #E5E7EB;
    color: #9CA3AF;
    cursor: not-allowed;
    box-shadow: none;
  }
}

// 動畫
@keyframes pulse {
  0% {
    transform: scale(1);
    opacity: 0.5;
  }

  100% {
    transform: scale(1.5);
    opacity: 0;
  }
}

@keyframes rotate-bg {
  from {
    transform: rotate(0deg);
  }

  to {
    transform: rotate(360deg);
  }
}

@keyframes rotate-sun {
  from {
    transform: translate(-50%, -50%) rotate(0deg);
  }

  to {
    transform: translate(-50%, -50%) rotate(360deg);
  }
}

@keyframes hardcore-shake {

  10%,
  90% {
    transform: translate3d(-2px, 0, 0) rotate(-5deg);
  }

  20%,
  80% {
    transform: translate3d(4px, 0, 0) rotate(5deg);
  }

  30%,
  50%,
  70% {
    transform: translate3d(-8px, 0, 0) rotate(-10deg) scale(1.1);
  }

  40%,
  60% {
    transform: translate3d(8px, 0, 0) rotate(10deg) scale(1.1);
  }
}

@keyframes flash {
  0% {
    opacity: 0;
  }

  50% {
    opacity: 1;
  }

  100% {
    opacity: 0;
  }
}

.bounce-leave-active {
  transition: opacity 0.3s;
  opacity: 0;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>