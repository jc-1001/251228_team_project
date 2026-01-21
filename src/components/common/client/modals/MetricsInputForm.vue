<script setup>
import { ref, computed, watch } from 'vue'

const props = defineProps({
  activeMetricKey: {
    type: String,
    required: true
  }
})

// ✅ 讓父層可以關掉彈窗、接到儲存資料
const emit = defineEmits(['close', 'save'])

const metricConfig = {
  weight: {
    title: "體重",
    unit: "kg",
    url: "data/metrics/weight.json",
    valueField: "weight",         // json 裡的數值欄位
    timeField: "recorded_at",
  },
  bloodOxygen: {
    title: "血氧",
    unit: "%",
    url: "data/metrics/blood_oxygen.json",
    valueField: "bloodOxygen",
    timeField: "recorded_at",
  },
  bloodSugar: {
    title: "血糖",
    unit: "mg/dL",
    url: "data/metrics/blood_sugar.json",
    valueField: "bloodSugar",
    timeField: "recorded_at",
  },
  heartRate: {
    title: "心律",
    unit: "bpm",
    url: "data/metrics/heart_rate.json",
    valueField: "heartRate",
    timeField: "recorded_at",
  },
  bloodPressure: {
    title: "血壓",
    unit: "mmHg",
    url: "data/metrics/blood_pressure.json",
    // 顯示用：SYS/DIA
    renderValue: (r) => `${r.SYS}/${r.DIA}`,
    timeField: "recorded_at",
  },
}

/** ✅ 用 activeMetricKey 取出目前指標設定 */
const currentMetric = computed(() => metricConfig[props.activeMetricKey] ?? null)

/** ✅ 是否是血壓心表單 */
const isBloodPressure = computed(() => props.activeMetricKey === "bloodPressure")


// 表單狀態
const formDate = ref("")
const formTime = ref("")
const formValue = ref("")

const formSYS = ref("")
const formDIA = ref("")
const formHeartRate = ref("")


// 初始化表單 - 設定今日日期
const initForm = () => {
  const now = new Date()
  const yyyy = now.getFullYear()
  const mm = String(now.getMonth() + 1).padStart(2, "0")
  const dd = String(now.getDate()).padStart(2, "0")

  formDate.value = `${yyyy}-${mm}-${dd}`
  formTime.value = ""
  formValue.value = ""
  formSYS.value = ""
  formDIA.value = ""
}

/** ✅ activeMetricKey 變動時：重置表單 + 內容自然跟著 currentMetric 切換 */
watch(() => props.activeMetricKey, initForm, { immediate: true })

// ✅ 關閉彈窗（按 X、按遮罩）
const closePop = () => emit('close')

// const onSave = () => {
//   if (!currentMetric.value) return

//   // 你可以依 currentMetric.url/valueField/timeField 組 payload 或 fetch
//   // 這裡只示範組資料
//   const recorded_at = formTime.value
//     ? `${formDate.value} ${formTime.value}`
//     : formDate.value

//   const data = isBloodPressure.value
//     ? {
//         recorded_at,
//         SYS: Number(formSYS.value),
//         DIA: Number(formDIA.value),
//         heartRate: Number(formHeartRate.value),
//       }
//     : {
//         recorded_at,
//         [currentMetric.value.valueField]: Number(formValue.value),
//       }

//   console.log("save:", props.activeMetricKey, data)
// }

</script>

<template>

  <div class="pop-overlay" @click.self="closePop">
    <form class="input" @submit.prevent="onSave">
      <div class="close-pop__btn" @click="closePop">X</div>
      <div class="input__header">
        <div class="input__title">
          {{ activeMetricKey === 'bloodPressure' ? '血壓/心律記錄' : `${currentMetric?.title ?? ''}記錄` }}
        </div>
        <div class="input__date">
          <span>日期:</span>
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
            <input class="input__card__value" v-model="formSYS" placeholder="請輸入收縮壓" type="number" required>
            <input class="input__card__value" v-model="formDIA" placeholder="請輸入舒張壓" type="number" required>
          </div>

          <!-- 單一欄位 -->
          <input v-else class="input__card__value" v-model="formValue" :placeholder="`請輸入${currentMetric.title}`"
            type="number" :step="currentMetric.step ?? 1" required>
        </div>

        <!-- 心律欄位（血壓表單專用） -->
        <div v-if="isBloodPressure" class="input__card">
          <div class="input__card__title">
            心律 (bpm)
          </div>
          <input class="input__card__value" v-model="formHeartRate" placeholder="請輸入心律" type="number" required>
        </div>

        <div class="input__card">
          <div class="input__card__title">測量時間</div>
          <input class="input__card__time-select" type="time" v-model="formTime" step="60" placeholder="請選擇時間" required>
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
  width: 420px;
  padding: 20px;
  border: solid 1px;
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
  font-size: 20px;
}

.input__date {
  font-size: 14px;
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
  height: 40px;
  margin-top: 20px;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  background-color: $primaryDark;
  transition: ease 0.2s;
}

.input__btn:hover {
  opacity: 0.9;
}
</style>