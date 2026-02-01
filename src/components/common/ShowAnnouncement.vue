<script setup>
import { ref, computed, onMounted } from 'vue'
import { publicApi } from '@/utils/publicApi'
// 假資料
const announcements = ref([])
// 燈箱開關
const showAnnouncement = ref(false)
const currentIndex = ref(0)

// 串接API取得資料(GET)
const fetchAnn = async () => {
  try {
    const res = await publicApi.get('announcements/get_ann.php')
    const data = res.data
    // 只保留狀態為 'upload' (上架) 的公告
    const activeAnnouncements = data.filter((item) => {
      const isStatusUpload = item.status === 'upload'

      // 「排程中」的資料在時間到時才顯示
      const isTimeReached = new Date(item.start_at) <= new Date()
      // 如果有結束時間，也要檢查是否已過期
      const isNotExpired = !item.end_at || new Date(item.end_at) >= new Date()

      // 三個條件都符合才顯示
      return isStatusUpload && isTimeReached && isNotExpired
    })

    announcements.value = activeAnnouncements

    // 只有在「過濾後」還有資料的情況下才開啟燈箱
    if (activeAnnouncements.length > 0 && !sessionStorage.getItem('hasReadAnnouncements')) {
      showAnnouncement.value = true
    }
  } catch (error) {
    console.log('系統公告抓取失敗', error)
  }
}
onMounted(() => {
  fetchAnn()
})

// 根據目前的索引回傳對應的公告物件
const currentNote = computed(() => {
  return announcements.value[currentIndex.value]
})

// 處理點擊按鈕的邏輯(Session紀錄只顯示一次)
const handleNext = () => {
  if (currentIndex.value < announcements.value.length - 1) {
    currentIndex.value++
  } else {
    showAnnouncement.value = false
    // 記錄在 sessionStorage，當次瀏覽不重複顯示
    sessionStorage.setItem('hasReadAnnouncements', true)
  }
}
</script>

<template>
  <Transition name="fade">
    <div
      v-if="showAnnouncement && currentNote"
      class="announcement-overlay"
      @click.self="showAnnouncement = false"
    >
      <div class="announcement-modal">
        <div class="modal-header">
          <h3>{{ currentNote.title }}</h3>
        </div>

        <div class="modal-body">
          <p class="content-text">{{ currentNote.content }}</p>
        </div>

        <div class="page-info">{{ currentIndex + 1 }} / {{ announcements.length }}</div>

        <div class="modal-footer">
          <button class="confirm-btn" @click="handleNext">
            {{ currentIndex < announcements.length - 1 ? '下一則' : '我知道了' }}
          </button>
        </div>
      </div>
    </div>
  </Transition>
</template>

<style lang="scss" scoped>
.announcement-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 999;
}
.announcement-modal {
  background: white;
  width: 80%;
  max-width: 500px;
  border-radius: 12px;
  padding: 24px;
  position: relative;
  text-align: center;
  .content-text {
    white-space: pre-line; // 在 JS 寫的 \n 換行生效
    max-height: 250px; // 防止內容太長撐爆燈箱
    overflow-y: auto; // 內容太長可滾動
  }
  h3 {
    color: $primaryDark;
    margin: 12px 0;
  }
  p {
    font-size: 14px;
    text-align: start;
    color: $grayDark;
    line-height: 1.6;
  }
}
.confirm-btn {
  width: 80%;
  margin-top: 20px;
  padding: 8px;
  background: $primaryDark;
  color: white;
  line-height: 1.4;
  font-weight: 700;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: opacity 0.3s;
  &:hover {
    background: $primaryDark; // 背景轉淺色
    opacity: 0.8;
    color: $white; // 文字轉深色
  }
}
.page-info {
  margin-top: 15px;
  font-size: 12px;
  color: $grayDark;
  font-family: Arial, sans-serif;
}
</style>
