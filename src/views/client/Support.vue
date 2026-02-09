<script setup>
import { ref, computed } from "vue"
import TheHeader from '@/components/common/TheHeader.vue'
import imageSrc from '/src/assets/images/Banner_help.svg'

// 1. 所有的問題資料
const allFaqs = ref([
  { category: 'account', question: "如何修改我的個人健康目標？", answer: "您可以前往「個人資料」頁面，點擊「編輯資料」，在下方的健康設定中調整您的目標數值。" },
  { category: 'account', question: "忘記密碼怎麼辦？", answer: "在登入頁面點擊「忘記密碼」，輸入您的註冊信箱，系統將發送重設密碼的連結給您。" },
  { category: 'data', question: "如何獲得積分", answer: "註冊禮$300，每日登入$10/天" },
  { category: 'data', question: "積分可以全額折抵商品嗎?", answer: "UniCare商城的商品採「部分積分 + 現金」的方式購買，每一項商品都會標示最高的可用積分折抵上限，無法完全以積分免費兌換，這是為了確保商品品質與營運永續。" },
  { category: 'shop', question: "如何查詢我的訂單進度？", answer: "登入後進入「我的訂單」，即可看到所有購買紀錄與目前的物流狀態。" },
  { category: 'app', question: "如何開啟推播通知？", answer: "請至手機系統設定中找到 UniCare，並確認「允許通知」已開啟。" }
])

// 2. 分類按鈕資料
const categories = ref([
  { id: 'all', title: '全部' },
  { id: 'account', title: '帳號管理' },
  { id: 'data', title: '積分與獎勵' },
  { id: 'shop', title: '商城與訂單' },
  { id: 'app', title: '系統操作' }
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
      subtitle="遇到問題了嗎?查看常見問題或與我們聯繫"
      :imageSrc="imageSrc"
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

    <div class="layout-wrapper">
      
      <div class="faq-section">
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
      </div>

      <aside class="contact-sidebar">
        <div class="contact-card">
          <div class="contact-header">
            <h2>聯絡我們</h2>
          </div>
          <div class="contact-info">
            <p class="email-text">service@unicare.com</p>
            <p class="phone-text">02-8685-6789</p>
            <p class="time-text">( 09:00-19:00 )</p>
          </div>
        </div>
      </aside>

    </div>
  </main>
  </section>
</template>

<style lang="scss" scoped>

/* 1. 頁面總容器 */
.support-container {
  max-width: 1100px;
  margin: 40px auto;
  padding: 0 20px;
}

/* 2. 分類標籤 */
.category-tabs {
  display: flex;
  flex-wrap: wrap;
  gap: 16px;
  margin-bottom: 30px;
  width: 100%;

  .tab-btn {
    flex: 0 0 auto;
    width: 150px; // 預設寬度
    height: 45px;
    padding: 0 12px;
    @include body1(true);
    line-height: 43px;
    background-color: $white;
    color: $grayDark;
    text-align: center;
    border: 1px solid $grayDark;
    border-radius: 100px;
    cursor: pointer;
    transition: all 0.3s;
    white-space: nowrap;

    &:hover,
    &.active {
      color: $white;
      background-color: $primary;
      border: 1px solid $primary;
    }

    @media screen and (max-width: 768px) {
      flex: 1 1 140px; // 手機版
      width: auto;
    }
  }
}

/* 3. 核心佈局 */
.layout-wrapper {
  display: grid;
  grid-template-columns: 1fr 320px;
  gap: 40px;
  align-items: start;

  @media (max-width: 992px) {
    grid-template-columns: 1fr;
    gap: 20px;
  }
}

/* 4. 手風琴 */
.accordion-group {
  background: white;
  border-radius: 12px;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.05);
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

/* 5. 側邊聯絡欄位 */
.contact-sidebar {
  .contact-card {
    background: white;
    padding: 30px;
    border-radius: 16px;
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.05);
    border: 1px solid #f0f0f0;
    position: sticky;
    top: 100px; // 避開 Header
    text-align: left;
    transition: transform 0.3s;

    &:hover { transform: translateY(-5px); }

    .contact-header h2 {
      color: #2E6669;
      font-size: 1.3rem;
      margin: 0 0 20px 0;
      padding-bottom: 15px;
      border-bottom: 1px solid #e9f0f0;
    }

    .contact-info {
      p {
        margin-bottom: 12px;
        color: #2E6669;
        font-weight: 600;
        font-size: 1rem;
        
        &.time-text {
          color: #999;
          font-weight: 400;
          font-size: 0.9rem;
        }
      }
    }
  }
}

/* 共通元件 */
.icon-arrow {
  width: 10px; height: 10px;
  border-right: 2px solid #2E6669;
  border-bottom: 2px solid #2E6669;
  transform: rotate(45deg);
  transition: 0.3s;
}

.no-data {
  text-align: center;
  color: #999;
  margin-top: 50px;
}
</style>