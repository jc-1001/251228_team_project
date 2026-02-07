<script setup>
import { ref, computed, watch } from 'vue'
import { publicApi } from '@/utils/publicApi'
import Metrics from '@/views/client/Metrics.vue'

// 直接從 localStorage 抓
const getMemberId = () => {
  const profileString = localStorage.getItem('userProfile')
  if (!profileString) return null
  try {
    const profile = JSON.parse(profileString)
    return profile.member_id || profile.id
  } catch (e) {
    return parseInt(profileString)
  }
}

const props = defineProps({
  activeMetricKey: {
    type: String,
    required: true,
  },
})

// ✅ 讓父層可以關掉彈窗、接到儲存資料
const emit = defineEmits(['close', 'save'])

const metricConfig = {
  weight: {
    title: '體重',
    unit: 'kg',
    url: 'data/metrics/weight.json',
    valueField: 'weight', // json 裡的數值欄位
    timeField: 'recorded_at',
    step: 0.1,
  },
  bloodOxygen: {
    title: '血氧',
    unit: '%',
    url: 'data/metrics/blood_oxygen.json',
    valueField: 'bloodOxygen',
    timeField: 'recorded_at',
  },
  bloodSugar: {
    title: '血糖',
    unit: 'mg/dL',
    url: 'data/metrics/blood_sugar.json',
    valueField: 'bloodSugar',
    timeField: 'recorded_at',
  },
  heartRate: {
    title: '心律',
    unit: 'bpm',
    url: 'data/metrics/heart_rate.json',
    valueField: 'heartRate',
    timeField: 'recorded_at',
  },
  bloodPressure: {
    title: '血壓',
    unit: 'mmHg',
    url: 'data/metrics/blood_pressure.json',
    // 顯示用：SYS/DIA
    renderValue: (r) => `${r.SYS}/${r.DIA}`,
    timeField: 'recorded_at',
  },
}

/** ✅ 用 activeMetricKey 取出目前指標設定 */
const currentMetric = computed(() => metricConfig[props.activeMetricKey] ?? null)

/** ✅ 是否是血壓心表單 */
const isBloodPressure = computed(() => props.activeMetricKey === 'bloodPressure')

// 表單狀態
const formDate = ref('')
const formTime = ref('')
const formValue = ref('')

const formSYS = ref('')
const formDIA = ref('')
const formHeartRate = ref('')

// 初始化表單 - 設定今日日期
const initForm = () => {
  const now = new Date()
  const yyyy = now.getFullYear()
  const mm = String(now.getMonth() + 1).padStart(2, '0')
  const dd = String(now.getDate()).padStart(2, '0')

  formDate.value = `${yyyy}-${mm}-${dd}`
  formTime.value = ''
  formValue.value = ''
  formSYS.value = ''
  formDIA.value = ''
  formHeartRate.value = ''
}

/** ✅ activeMetricKey 變動時：重置表單 + 內容自然跟著 currentMetric 切換 */
watch(() => props.activeMetricKey, initForm, { immediate: true })

// ✅ 關閉彈窗（按 X、按遮罩）
const closePop = () => emit('close')

// 🔥 新增：驗證數值的函數
const validateValues = () => {
  // 驗證時間
  if (!formTime.value) {
    alert('請選擇測量時間')
    return false
  }

  // 血壓/心律的驗證
  if (isBloodPressure.value) {
    const sys = Number(formSYS.value)
    const dia = Number(formDIA.value)
    const hr = Number(formHeartRate.value)

    if (!formSYS.value || sys <= 0) {
      alert('請輸入有效的收縮壓數值（需大於 0）')
      return false
    }
    if (!formDIA.value || dia <= 0) {
      alert('請輸入有效的舒張壓數值（需大於 0）')
      return false
    }
    if (!formHeartRate.value || hr <= 0) {
      alert('請輸入有效的心律數值（需大於 0）')
      return false
    }
  } else {
    // 單值欄位的驗證
    const value = Number(formValue.value)

    if (!formValue.value || value <= 0) {
      alert(`請輸入有效的${currentMetric.value?.title}數值（需大於 0）`)
      return false
    }
  }

  return true
}

// 串接API 儲存數值(POST)
const onSave = async () => {
  if (!currentMetric.value) return

  // 🔥 先進行驗證
  if (!validateValues()) {
    return
  }

  // 取得member id
  const mid = getMemberId()
  if (!mid) {
    alert('找不到會員資訊，請重新登入')
    return
  }
  // 你可以依 currentMetric.url/valueField/timeField 組 payload 或 fetch
  const measured_at = formTime.value
    ? `${formDate.value} ${formTime.value}`
    : `${formDate.value} 00:00:00`

  const payload = isBloodPressure.value
    ? {
        systolic_pressure: Number(formSYS.value),
        diastolic_pressure: Number(formDIA.value),
        heartRate: Number(formHeartRate.value),
        measured_at,
      }
    : { value: Number(formValue.value), measured_at }

  try {
    const res = await publicApi.post('home_modal/save_metrics.php', {
      // 真實的ID
      member_id: mid,
      type: props.activeMetricKey,
      payload: payload,
    })

    // Axios 資料在 res.data，不需要 await res.json()
    const result = res.data

    // 只要沒進入 catch，代表 status 是 2xx (成功)
    if (result.success) {
      emit('save', payload) // 通知父層刷新
      closePop()
    } else {
      // 如果後端回傳 success: false，也可以通知父層顯示錯誤燈箱
      console.error('後端儲存失敗:', result.message || '未知錯誤')
      // 可以選擇不關閉視窗，讓使用者檢查
      alert(result.message || '後端儲存失敗')
    }
  } catch (err) {
    console.log('儲存失敗', err)
    alert('儲存失敗，請稍後再試')
    // 這裡會觸發 HomeView 的 catch 區塊跳出錯誤燈箱
  }
}
</script>

<template>
  <div class="pop-overlay" @click.self="closePop">
    <form class="input" @submit.prevent="onSave">
      <button type="button" class="close-pop__btn" @click="closePop">
        <span class="material-symbols-outlined">close</span>
      </button>
      <div class="input__header">
        <div class="input__title">
          {{
            activeMetricKey === 'bloodPressure'
              ? '血壓/心律記錄'
              : `${currentMetric?.title ?? ''}記錄`
          }}
        </div>
        <div class="input__date">
          <span>今日日期:</span>
          <span>{{ formDate }}</span>
        </div>
      </div>

      <div class="input__content">
        <div class="input__card">
          <div class="input__card__title">
            {{ currentMetric.title }}
            <span class="input__card__unit">({{ currentMetric.unit }})</span>
          </div>

          <!-- 血壓(雙欄位) -->
          <div v-if="isBloodPressure" class="bp-fields">
            <input
              class="input__card__value"
              v-model="formSYS"
              placeholder="請輸入收縮壓"
              type="number"
              step="1"
            />
            <input
              class="input__card__value"
              v-model="formDIA"
              placeholder="請輸入舒張壓"
              type="number"
              step="1"
            />
          </div>

          <!-- 單一欄位 -->
          <input
            v-else
            class="input__card__value"
            v-model="formValue"
            :placeholder="`請輸入${currentMetric.title}`"
            type="number"
            :step="currentMetric.step ?? 1"
          />
        </div>

        <!-- 心律欄位（血壓表單專用） -->
        <div v-if="isBloodPressure" class="input__card">
          <div class="input__card__title">心律 (bpm)</div>
          <input
            class="input__card__value"
            v-model="formHeartRate"
            placeholder="請輸入心律"
            type="number"
            step="1"
          />
        </div>

        <div class="input__card">
          <div class="input__card__title">測量時間</div>
          <input
            class="input__card__time-select"
            type="time"
            v-model="formTime"
            step="60"
            placeholder="請選擇時間"
          />
        </div>
      </div>

      <div class="input__btn-area">
        <button type="submit" class="input__btn">儲存</button>
      </div>
    </form>
  </div>
</template>

<style lang="scss" scoped>
// 遮罩：滿版 + 置中
.pop-overlay {
  position: fixed;
  inset: 0;
  /* top right bottom left = 0 */
  background: rgba(0, 0, 0, 50%);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 9999;
  overflow-y: auto;
  padding: 20px;
}

.input {
  position: relative;
  display: flex;
  flex-direction: column;
  width: 400px;
  padding: 20px;
  border-radius: 10px;
  background-color: white;
}

.close-pop__btn {
  position: absolute;
  z-index: 2;
  right: 20px;
  top: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 30px;
  height: 30px;
  color: white;
  background-color: $primaryDark;
  border: none;
  border-radius: 100px;
  cursor: pointer;
}

.input__header {
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 10px;
}

.input__title {
  color: $primaryDark;
  font-weight: 700;
  @include subtitle1(true);
}

.input__date {
  @include body2;
  margin-top: 8px;
}

.input__content {
  display: flex;
  flex-direction: column;
}

.input__card {
  display: flex;
  flex-direction: column;
  margin-top: 10px;
}

.input__card__title {
  font-weight: 700;
  padding: 5px 0;
  @include body1(true);
}

.input__card__unit {
  font-size: 14px;
}

.input__card__value {
  height: 40px;
  width: 100%;
  padding-left: 5px;
  border: solid 1px;
  border-radius: 5px;
}

.input__card__time-select {
  height: 40px;
  width: 100%;
  padding-left: 5px;
  border: solid 1px;
  border-radius: 5px;
}

.bp-fields {
  display: flex;
  gap: 10px;
}

.input__btn-area {
  display: flex;
  flex-direction: column;
  gap: 10px;
  margin-top: auto;
}

.input__btn {
  width: 100%;
  padding: 8px;
  margin-top: 20px;
  background: $primaryDark;
  color: $white;
  border: none;
  border-radius: $radius_sm;
  @include subtitle2(true);
  cursor: pointer;
  transition: background 0.3s;
  &:hover {
    background-color: $white;
    color: $primaryDark;
    outline: 1px solid $primaryDark;
  }
}
</style>
