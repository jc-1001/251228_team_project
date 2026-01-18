<script setup>
import { ref, computed } from "vue"
import TheHeader from '@/components/common/TheHeader.vue'

// 1. 所有的問題資料
const allFaqs = ref([
  { category: 'account', question: "如何修改我的個人健康目標？", answer: "您可以前往「個人資料」頁面，點擊「編輯資料」，在下方的健康設定中調整您的目標數值。" },
  { category: 'account', question: "忘記密碼怎麼辦？", answer: "在登入頁面點擊「忘記密碼」，輸入您的註冊信箱，系統將發送重設密碼的連結給您。" },
  { category: 'data', question: "如何獲得積分", answer: "註冊禮$300，每日登入$10/天" },
  { category: 'shop', question: "如何查詢我的訂單進度？", answer: "登入後進入「我的訂單」，即可看到所有購買紀錄與目前的物流狀態。" },
  { category: 'app', question: "如何開啟推播通知？", answer: "請至手機系統設定中找到 UniCare，並確認「允許通知」已開啟。" }
])

// 2. 分類按鈕資料
const categories = ref([
  { id: 'all', title: '全部問題' },
  { id: 'account', title: '帳號管理' },
  { id: 'data', title: '積分與點數' },
  { id: 'shop', title: '商城與訂單' },
  { id: 'app', title: 'APP操作' }
])

const currentCategory = ref('all')
const activeIndex = ref(null)

const filteredFaqs = computed(() => {
  if (currentCategory.value === 'all') return allFaqs.value
  return allFaqs.value.filter(faq => faq.category === currentCategory.value)
})

const selectCategory = (catId) => {
  currentCategory.value = catId
  activeIndex.value = null
}

const toggleAccordion = (index) => {
  activeIndex.value = activeIndex.value === index ? null : index
}
</script>

<template>
  <section class="support-page">
    <TheTopIcon />
    
    <TheHeader 
      title="幫助中心"
      subtitle="遇到問題了嗎？請選擇分類查看常見問題"
      imageSrc="/src/assets/images/20260118/sup_img0.png"
    />

    <main class="support-container">
      <div class="category-tabs">
        <button 
          v-for="cat in categories" 
          :key="cat.id"
          :class="['tab-btn', { active: currentCategory === cat.id }]"
          @click="selectCategory(cat.id)"
        >
          {{ cat.title }}
        </button>
      </div>

      <div class="accordion-group">
        <div 
          v-for="(faq, index) in filteredFaqs" 
          :key="index" 
          class="accordion-item"
          :class="{ 'is-active': activeIndex === index }"
        >
          <div class="accordion-header" @click="toggleAccordion(index)">
            <span class="question-text">
                <span class="q-badge">Q</span> {{ faq.question }}
            </span>
            <span class="icon-arrow"></span>
          </div>

          <div class="accordion-content">
            <div class="content-inner">
              {{ faq.answer }}
            </div>
          </div>
        </div>
      </div>

      <p v-if="filteredFaqs.length === 0" class="no-data">目前該分類下沒有相關問題。</p>
    </main>
  </section>
</template>

<style lang="scss" scoped>
.support-container {
  max-width: 900px;
  margin: 0 auto 80px; /* 移除負的 margin-top，讓內容自然往下走 */
  padding: 0 20px;
}

/* 分類按鈕樣式修改 */
.category-tabs {
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  gap: 15px;
  margin-top: 60px;    /* 調整此數值可以讓這一列再往下一點 */
  margin-bottom: 40px;

  .tab-btn {
    padding: 12px 30px;
    border-radius: 4px; /* 設定為方形 (4px 僅提供微小轉角，視覺較不生硬) */
    border: 1px solid #2E6669;
    background: white;
    color: #2E6669;
    cursor: pointer;
    transition: all 0.3s;
    font-weight: 500;
    font-size: 16px;

    &:hover, &.active {
      background: #2E6669;
      color: white;
      box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    }
  }
}

.accordion-group {
  background: white;
  border-radius: 12px;
  box-shadow: 0 8px 24px rgba(0,0,0,0.05);
  overflow: hidden;

  .accordion-item {
    border-bottom: 1px solid #f5f5f5;
    &.is-active {
      background-color: #fcfdfd;
      .icon-arrow { transform: rotate(180deg); }
      .accordion-content { max-height: 300px; opacity: 1; padding-bottom: 20px; }
      .q-badge { background: #2E6669; color: white; }
    }
  }

  .accordion-header {
    padding: 24px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    cursor: pointer;
    .q-badge {
      display: inline-block;
      width: 24px; height: 24px; line-height: 24px;
      text-align: center; border-radius: 4px;
      background: #e9f0f0; color: #2E6669;
      margin-right: 10px; font-weight: bold;
    }
    .question-text { font-size: 17px; color: #333; }
  }

  .accordion-content {
    max-height: 0;
    overflow: hidden;
    transition: all 0.4s ease-in-out;
    opacity: 0;
    .content-inner {
      padding: 0 24px 20px 58px;
      color: #666;
      line-height: 1.8;
    }
  }
}

.icon-arrow {
  width: 10px; height: 10px;
  border-right: 2px solid #2E6669;
  border-bottom: 2px solid #2E6669;
  transform: rotate(45deg);
  transition: 0.3s;
}

.no-data { text-align: center; color: #999; margin-top: 50px; }
</style>