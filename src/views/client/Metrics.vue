<script setup>

import { ref, computed, onMounted, watch, nextTick } from "vue"

// import { publicApi } from "@/utils/publicApi"
// import { parsePublicFile } from "@/utils/parseFile";

import axios from 'axios'
import TheHeader from "@/components/common/TheHeader.vue";
import HeaderImage from "@/assets/images/Banner_metrics.svg"
import status_label from "@/components/common/metrics/status_label.vue";

import { Chart, registerables } from 'chart.js'
//🔥 註冊 Chart.js 的所有組件（包含 scale）
Chart.register(...registerables)

import { useCountUp } from '@/composable/useCountUp' //數字跳動


// 🔥 修改：API 基礎路徑（根據你的 PHP 伺服器 port）
// const API_BASE_URL = 'http://localhost:8888/unicare_api/metrics'
const API_BASE_URL = import.meta.env.VITE_API_DOMAIN + 'metrics'

// 🔥 載入所有指標的數據
const loadAllMetrics = async () => {
  const member_id = 1;

  for (const key in metricsConfig) {
    const config = metricsConfig[key]
    try {
      // 🔥 統一使用 get_metrics.php
      const res = await axios.get(`${API_BASE_URL}/get_metrics.php`, {
        params: {
          type: config.type,
          member_id
        },
        withCredentials: true
      })

      allMetricsData.value[key] = res.data
      console.log(`✅ ${config.title} 資料載入成功:`, res.data)

    } catch (err) {
      console.error(`❌ 載入 ${key} 資料失敗:`, err)
      allMetricsData.value[key] = []
    }
  }
}

const records__data = ref([])
// 定義各項指標的配置 
const metricsConfig = {
  weight: {
    title: "體重",
    unit: "kg",
    type: "weight",
    valueField: "weight",
    timeField: "recorded_at",
    step: 0.1,  //允許小數點一位
    decimals: 1,
  },
  bloodOxygen: {
    title: "血氧",
    unit: "%",
    type: "blood_oxygen",
    valueField: "oxygen_saturation",
    timeField: "recorded_at",
    step: 0.1,
    decimals: 0,
  },
  bloodSugar: {
    title: "血糖",
    unit: "mg/dL",
    type: "blood_sugar",
    valueField: "glucose_value",
    timeField: "recorded_at",
    step: 0.1,
    decimals: 0,
  },
  heartRate: {
    title: "心律",
    unit: "bpm",
    type: "heart_rate",
    valueField: "heart_rate",
    timeField: "recorded_at",
    step: 1,
    decimals: 0,
  },
  bloodPressure: {
    title: "血壓",
    unit: "mmHg",
    type: "blood_pressure",
    renderValue: (r) => `${r.systolic_pressure}/${r.diastolic_pressure}`,
    timeField: "recorded_at",
    step: 1,
    decimals: 0,
  },
}
// 儲存所有指標的原始資料
const allMetricsData = ref({
  weight: [],
  bloodOxygen: [],
  bloodSugar: [],
  heartRate: [],
  bloodPressure: []
})

//選擇時間按鈕(右上)
const activePeriod = ref("today") // 可選："today" | "week" | "month"

// 🃏 根據時間段篩選數據（給卡片用）
const filterDataByPeriodForCard = (data, timeField) => {
  if (!data || data.length === 0) return []

  const now = new Date(data[0][timeField])

  // 今天：只要最新一筆（給卡片用）
  if (activePeriod.value === "today") {
    return [data[0]]
  }

  // 計算幾天前的日期
  const days = activePeriod.value === "week" ? 7 : 30
  const cutoffDate = new Date(now)
  cutoffDate.setDate(cutoffDate.getDate() - days)

  // 過濾出時間範圍內的資料
  return data.filter(record => {
    const recordDate = new Date(record[timeField])
    return recordDate >= cutoffDate && recordDate <= now
  })
}

// 📈 根據時間段篩選數據（給圖表用）
const filterDataByPeriod = (data, timeField) => {
  if (!data || data.length === 0) return []

  //  取數據中的最新日期作為"現在"（用於測試）
  const now = new Date(data[0][timeField])

  //  今天：取最新一天的所有資料（給圖表用）
  if (activePeriod.value === "today") {
    // 取得最新記錄的日期部分（不含時間）
    const latestDateStr = data[0][timeField].split(' ')[0] // "2025-01-20"

    // 篩選出同一天的所有記錄
    return data.filter(record => {
      const recordDateStr = record[timeField].split(' ')[0]
      return recordDateStr === latestDateStr
    })
  }

  // 計算幾天前的日期
  const days = activePeriod.value === "week" ? 7 : 30
  const cutoffDate = new Date(now)
  cutoffDate.setDate(cutoffDate.getDate() - days)

  // 過濾出時間範圍內的資料
  return data.filter(record => {
    const recordDate = new Date(record[timeField])
    return recordDate >= cutoffDate && recordDate <= now
  })
}

// 計算單一指標的平均值（單值欄位）
const calculateAverage = (data, valueField, decimals = 0) => {
  if (!data || data.length === 0) return 0

  const sum = data.reduce((acc, record) => {
    return acc + (Number(record[valueField]) || 0)
  }, 0)

  const average = sum / data.length

  // 根據 decimals 參數決定小數位數
  return Number(average.toFixed(decimals))
}

// 計算血壓的平均值（雙值欄位）
const calculateBPAverage = (data) => {
  if (!data || data.length === 0) return { systolic: 0, diastolic: 0 }

  const sysSum = data.reduce((acc, r) => acc + (Number(r.systolic_pressure) || 0), 0)
  const diaSum = data.reduce((acc, r) => acc + (Number(r.diastolic_pressure) || 0), 0)

  return {
    systolic: Math.round(sysSum / data.length),
    diastolic: Math.round(diaSum / data.length)
  }
}

//各項動態數值
const weight = ref('')
const height = ref('175')

const bloodOxygen = ref('')
const bloodSugar = ref('')
const heartRate = ref('')
const bloodPressure = ref({
  systolic: '',
  diastolic: ''
})

// 🔥 更新所有卡片數值
const updateCardValues = () => {
  // 體重 
  const weightFiltered = filterDataByPeriodForCard(allMetricsData.value.weight, "recorded_at")
  weight.value = calculateAverage(weightFiltered, "weight", metricsConfig.weight.decimals)

  // 血氧 
  const oxygenFiltered = filterDataByPeriodForCard(allMetricsData.value.bloodOxygen, "recorded_at")
  bloodOxygen.value = calculateAverage(oxygenFiltered, "oxygen_saturation", metricsConfig.bloodOxygen.decimals)

  // 血糖 
  const sugarFiltered = filterDataByPeriodForCard(allMetricsData.value.bloodSugar, "recorded_at")
  bloodSugar.value = calculateAverage(sugarFiltered, "glucose_value", metricsConfig.bloodSugar.decimals)

  // 心律 
  const heartFiltered = filterDataByPeriodForCard(allMetricsData.value.heartRate, "recorded_at")
  heartRate.value = calculateAverage(heartFiltered, "heart_rate", metricsConfig.heartRate.decimals)

  // 血壓
  const bpFiltered = filterDataByPeriodForCard(allMetricsData.value.bloodPressure, "recorded_at")
  bloodPressure.value = calculateBPAverage(bpFiltered)
}

// 切換時間段
const changePeriod = (period) => {
  activePeriod.value = period
  updateCardValues()
}

// 切換折線圖種類
const changeStatus = (status) => {
  activeStatus.value = status
}

// 🔥 初始化時載入所有數據
onMounted(async () => {
  await loadAllMetrics()
  updateCardValues()

  // 等待 DOM 渲染完成後初始化圖表
  await nextTick()
  initChart()
})

// 計算體重狀態 
const bmi = computed(() => {
  return weight.value / ((height.value / 100) ** 2)
})
console.log(bmi.value)

const weightStatus = computed(() => {
  if (bmi.value >= 24) return "high"
  if (bmi.value < 18.5) return "low"
  return "normal"
})

//計算血氧狀態
const oxygenStatus = computed(() => {
  if (bloodOxygen.value < 95) return "low"
  return "normal"
})

//計算血糖狀態
const sugarStatus = computed(() => {
  if (bloodSugar.value >= 100) return "high"
  if (bloodSugar.value < 70) return "low"
  return "normal"
})

//計算心律狀態
const heartStatus = computed(() => {
  if (heartRate.value > 100) return "high"
  if (heartRate.value < 60) return "low"
  return "normal"
})

//計算血壓狀態
const pressureStatus = computed(() => {
  const { systolic, diastolic } = bloodPressure.value
  if (systolic >= 140 || diastolic >= 90) return "high"
  if (systolic < 90 || diastolic < 60) return "low"
  return "normal"
})

//創建動畫版本
const weightAnimated = useCountUp(weight, 800)
const bloodOxygenAnimated = useCountUp(bloodOxygen, 800)
const bloodSugarAnimated = useCountUp(bloodSugar, 800)
const heartRateAnimated = useCountUp(heartRate, 800)
const systolicAnimated = useCountUp(computed(() => bloodPressure.value.systolic), 800)
const diastolicAnimated = useCountUp(computed(() => bloodPressure.value.diastolic), 800)

//🌟數值總覽卡片V-for
const valueCard = [
  {
    id: 'weight',
    title: '體重',
    icon: '/public/images/metrics/monitor_weight_24dp_2E6669_FILL1_wght400_GRAD0_opsz24.svg',
    unit: 'kg',
    getValue: () => weightAnimated.value,
    getStatus: () => weightStatus.value,
    isDoubleValue: false
  },
  {
    id: 'bloodOxygen',
    title: '血氧',
    icon: '/public/images/metrics//spo2_24dp_2E6669_FILL1_wght400_GRAD0_opsz24.svg',
    unit: '%',
    getValue: () => bloodOxygenAnimated.value,
    getStatus: () => oxygenStatus.value,
    isDoubleValue: false
  },
  {
    id: 'bloodSugar',
    title: '血糖',
    icon: '/public/images/metrics//bloodtype_24dp_2E6669_FILL1_wght400_GRAD0_opsz24.svg',
    unit: 'mg/dL',
    getValue: () => bloodSugarAnimated.value,
    getStatus: () => sugarStatus.value,
    isDoubleValue: false
  },
  {
    id: 'heartRate',
    title: '心律',
    icon: '/public/images/metrics/ecg_heart_24dp_2E6669_FILL1_wght400_GRAD0_opsz24.svg',
    unit: 'bpm',
    getValue: () => heartRateAnimated.value,
    getStatus: () => heartStatus.value,
    isDoubleValue: false
  },
  {
    id: 'bloodPressure',
    title: '血壓',
    icon: '/public/images/metrics/blood_pressure_24dp_2E6669_FILL1_wght400_GRAD0_opsz24.svg',
    unit: 'mmHg',
    getValue: () => ({
      systolic: systolicAnimated.value,
      diastolic: diastolicAnimated.value
    }),
    getStatus: () => pressureStatus.value,
    isDoubleValue: true // 標記為雙值
  },
]

// 彈窗
// 彈窗
// 彈窗
const isPopOpen = ref(false)
const activeMetricKey = ref("weight") //預設

// 右側表單狀態
const formDate = ref("")      // YYYY-MM-DD (給 <input type="date"> 用)
const formTime = ref("")      // HH:mm (給 <input type="time"> 用)
const formValue = ref("")     // 單值指標用（體重/血氧/血糖/心律）

// 血壓/心律 特例：三個欄位
const formSYS = ref("")
const formDIA = ref("")
const formHeartRate = ref("")

const isEditMode = ref(false)  // 是否為編輯模式
const editingRecordId = ref(null)  // 正在編輯的記錄 ID

// 目前選到的左邊紀錄（可選）
const selectedIndex = ref(null)

//開啟彈窗
const openPop = async (key) => {
  activeMetricKey.value = key
  isPopOpen.value = true

  setDefaultForm()

  await fetchData()  // 依 activeMetricKey 抓資料
}

//關閉彈窗
const closePop = () => {
  isPopOpen.value = false
}

const fetchData = async () => {
  const config = metricsConfig[activeMetricKey.value]
  try {
    // 🔥 血壓和心律都使用 blood_pressure 的 type
    const apiType = (activeMetricKey.value === 'heartRate' || activeMetricKey.value === 'bloodPressure')
      ? 'blood_pressure'
      : config.type

    const res = await axios.get(`${API_BASE_URL}/get_metrics.php`, {
      params: {
        type: apiType,  // 🔥 使用統一的 type
        member_id: 1
      },
      withCredentials: true
    })
    records__data.value = res.data
    console.log(`✅ 載入 ${config.title} 歷史記錄:`, res.data)  // 🔥 除錯用
  } catch (err) {
    console.error('❌ 載入歷史記錄失敗:', err)
    records__data.value = []
  }
}

//輸入今日日期/清空欄位
const setDefaultForm = () => {
  const now = new Date()

  const yyyy = now.getFullYear()
  const mm = String(now.getMonth() + 1).padStart(2, "0")
  const dd = String(now.getDate()).padStart(2, "0")

  formDate.value = `${yyyy}-${mm}-${dd}`

  // 清空所有欄位
  formTime.value = ""
  formValue.value = ""
  formSYS.value = ""
  formDIA.value = ""
  formHeartRate.value = ""
  selectedIndex.value = null

  // 🔥 新增：重置為新增模式
  isEditMode.value = false
  editingRecordId.value = null
}
//是否是血壓(特殊欄位)
const isBloodPressure = computed(() => activeMetricKey.value === "bloodPressure")

//是否是心律(特殊欄位)
const isHeartRate = computed(() => activeMetricKey.value === "heartRate")



//點擊左邊紀錄 填入右邊表單
const fillFormFromRecord = (record, index) => {
  selectedIndex.value = index

  const recorded = record[metricsConfig[activeMetricKey.value].timeField] || ""
  const [datePart = "", timePart = ""] = recorded.split(" ")

  formDate.value = datePart
  formTime.value = timePart ? timePart.slice(0, 5) : ""

  // 🔥 新增：設定為編輯模式，記錄 ID
  isEditMode.value = true

  // 根據不同指標取得對應的 ID 欄位名稱
  const config = metricsConfig[activeMetricKey.value]

  if (activeMetricKey.value === "bloodPressure" || activeMetricKey.value === "heartRate") {
    editingRecordId.value = record.bp_log_id
    formSYS.value = record.systolic_pressure ?? ""
    formDIA.value = record.diastolic_pressure ?? ""
    formHeartRate.value = record.heart_rate ?? ""
    formValue.value = ""
  } else {
    // 根據不同指標取得對應的 ID
    if (activeMetricKey.value === "weight") {
      editingRecordId.value = record.weight_log_id
    } else if (activeMetricKey.value === "bloodOxygen") {
      editingRecordId.value = record.oximetry_log_id
    } else if (activeMetricKey.value === "bloodSugar") {
      editingRecordId.value = record.glucose_log_id
    }

    const valueKey = config.valueField
    formValue.value = record[valueKey] ?? ""
    formSYS.value = ""
    formDIA.value = ""
    formHeartRate.value = ""
  }
}

//右邊輸入值儲存到資料庫
const onSave = async () => {
  const config = metricsConfig[activeMetricKey.value]
  const recorded_at = `${formDate.value} ${formTime.value}`

  try {
    if (!formTime.value) {
      alert('請選擇測量時間')
      return
    }

    let postData = {
      member_id: 1,
      measured_at: recorded_at
    }

    // 根據不同指標加入對應的數值
    if (activeMetricKey.value === "bloodPressure" || activeMetricKey.value === "heartRate") {
      if (!formSYS.value || !formDIA.value || !formHeartRate.value) {
        alert('請填寫完整的血壓和心律數值')
        return
      }
      postData.systolic_pressure = Number(formSYS.value)
      postData.diastolic_pressure = Number(formDIA.value)
      postData.heart_rate = Number(formHeartRate.value)
    } else {
      if (!formValue.value) {
        alert('請填寫數值')
        return
      }
      postData[config.valueField] = Number(formValue.value)
    }

    // 🔥 修改：根據模式決定 API 路徑
    let apiUrl = ''
    if (isEditMode.value) {
      // 編輯模式：使用 update API
      apiUrl = `${API_BASE_URL}/update_metrics.php?type=${config.type}&id=${editingRecordId.value}`
    } else {
      // 新增模式：使用 add API
      apiUrl = `${API_BASE_URL}/add_metrics.php?type=${config.type}`
    }

    const response = await axios.post(
      apiUrl,
      postData,
      {
        headers: {
          'Content-Type': 'application/json'
        },
        withCredentials: true
      }
    )

    if (response.data.success) {
      console.log(isEditMode.value ? '✅ 更新成功:' : '✅ 新增成功:', response.data)

      // 重新載入資料
      await loadAllMetrics()
      updateCardValues()
      await fetchData()

      // 清空表單
      setDefaultForm()

      alert(`${config.title}記錄${isEditMode.value ? '更新' : '新增'}成功！`)
    }

  } catch (error) {
    console.error(isEditMode.value ? '❌ 更新失敗:' : '❌ 新增失敗:', error)

    if (error.response) {
      alert(error.response.data.message || `${isEditMode.value ? '更新' : '新增'}失敗，請稍後再試`)
    } else if (error.request) {
      alert('無法連接到伺服器，請檢查網路連線')
    } else {
      alert('發生錯誤：' + error.message)
    }
  }
}

//指標趨勢按鈕
const activeTrendsBtn = ref('體重')

const trendsSelectBtn = ['體重', '血氧', '血糖', '心律', '血壓']

// 圖表相關
const chartCanvas = ref(null)  // canvas 元素的 ref
let chartInstance = null       // 儲存圖表實例

// 指標趨勢按鈕對應的 key
const trendsKeyMap = {
  '體重': 'weight',
  '血氧': 'bloodOxygen',
  '血糖': 'bloodSugar',
  '心律': 'heartRate',
  '血壓': 'bloodPressure'
}

// 🔥 根據選擇的指標和時間段取得圖表資料
const chartData = computed(() => {
  const metricKey = trendsKeyMap[activeTrendsBtn.value]
  const config = metricsConfig[metricKey]

  if (!config) return { labels: [], data: [] }

  // 取得篩選後的資料
  const filteredData = filterDataByPeriod(
    allMetricsData.value[metricKey],
    config.timeField
  )

  if (!filteredData || filteredData.length === 0) {
    return { labels: [], data: [] }
  }

  // 反轉陣列，讓時間由舊到新（圖表通常這樣顯示）
  const reversed = [...filteredData].reverse()

  // 處理標籤（日期時間）
  const labels = reversed.map(record => {
    const datetime = record[config.timeField]
    // 只顯示日期部分，或根據時間段調整
    if (activePeriod.value === 'today') {
      // 今天只顯示時間
      return datetime.split(' ')[1]?.slice(0, 5) || datetime
    } else {
      // 7天/30天顯示日期
      return datetime.split(' ')[0] || datetime
    }
  })

  // 處理數值
  let data
  if (metricKey === 'bloodPressure') {
    // 血壓顯示收縮壓和舒張壓
    const systolicData = reversed.map(r => r.systolic_pressure)  // 🔥 改欄位名
    const diastolicData = reversed.map(r => r.diastolic_pressure)  // 🔥 改欄位名
    return {
      labels,
      datasets: [
        {
          label: '收縮壓 (SYS)',
          data: systolicData,
          borderColor: '#E74C3C',
          backgroundColor: 'rgba(231, 76, 60, 0.1)',
          tension: 0.4
        },
        {
          label: '舒張壓 (DIA)',
          data: diastolicData,
          borderColor: '#3498DB',
          backgroundColor: 'rgba(52, 152, 219, 0.1)',
          tension: 0.4
        }
      ]
    }
  } else {
    // 單一數值
    data = reversed.map(record => record[config.valueField])
    return {
      labels,
      datasets: [{
        label: `${config.title} (${config.unit})`,
        data,
        borderColor: '#2E6669',
        backgroundColor: 'rgba(46, 102, 105, 0.1)',
        tension: 0.4,
        fill: true
      }]
    }
  }
})

// 🔥 初始化或更新圖表
const initChart = () => {
  if (!chartCanvas.value) return

  // 如果已有圖表實例，先銷毀
  if (chartInstance) {
    chartInstance.destroy()
  }

  const ctx = chartCanvas.value.getContext('2d')

  chartInstance = new Chart(ctx, {
    type: 'line',
    data: chartData.value,
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          display: true,
          position: 'top',
        },
        tooltip: {
          mode: 'index',
          intersect: false,
        }
      },
      scales: {
        y: {
          beginAtZero: false,
          ticks: {
            callback: function (value) {
              return value.toFixed(0)
            }
          }
        },
        x: {
          ticks: {
            maxRotation: 45,
            minRotation: 45
          }
        }
      },
      interaction: {
        mode: 'nearest',
        axis: 'x',
        intersect: false
      }
    }
  })
}
// 🔥 監聽圖表資料變化
watch(chartData, () => {
  nextTick(() => {
    initChart()
  })
}, { deep: true })

// 🔥 監聽時間段和指標變化
watch([activePeriod, activeTrendsBtn], () => {
  nextTick(() => {
    initChart()
  })
})

</script>


<template>
  <div class="metrics_container">
    <TheHeader title="身體數值中心" subtitle="從各項數據指標了解自己的身體狀態。" :imageSrc="HeaderImage">
    </TheHeader>
    <section class="values">
      <div class="header">
        <div class="title">數值總覽</div>
        <div class="period-select">
          <!-- 🔥 綁定點擊事件到 changePeriod -->
          <span class="period-select__btn" :class="{ 'period-select__btn--on': activePeriod == 'today' }"
            @click="changePeriod('today')">
            最新
          </span>
          <span class="period-select__btn" :class="{ 'period-select__btn--on': activePeriod == 'week' }"
            @click="changePeriod('week')">
            7天
          </span>
          <span class="period-select__btn" :class="{ 'period-select__btn--on': activePeriod == 'month' }"
            @click="changePeriod('month')">
            30天
          </span>
        </div>
      </div>
      <!-- 🌟數值總覽卡片區🌟 -->
      <div class="values__card-area">
        <!-- 🌟單個卡片 -->
        <div class="value-card" :class="{ 'value-card2': card.isDoubleValue }" v-for="card in valueCard" :key="card.id">
          <div class="value-card__header">
            <div class="value-card__header-left">
              <span class="value-card__icon">
                <img :src="card.icon" alt="">
              </span>
              <span class="value-card__title">
                {{ card.title }}
              </span>
            </div>
            <div class="value-card__arrow" @click="openPop(card.id)"><img
                src="/public/images/metrics/arrow_forward_ios_24dp_1F1F1F_FILL0_wght400_GRAD0_opsz24.svg" alt="">
            </div>
          </div>

          <!-- 🌟單值顯示 -->
          <div class="value-card__content" v-if="!card.isDoubleValue">
            <span class="value-card__value">
              {{ card.getValue() }}
            </span>
            <span class="value-card__unit">
              {{ card.unit }}
            </span>
          </div>
          <!-- 🌟雙值顯示 -->
          <div class="value-card__content" v-else>
            <span class="value-card__value">
              {{ card.getValue().systolic }}
            </span>
            <span>/</span>
            <span class="value-card__value">
              {{ card.getValue().diastolic }}
            </span>
            <span class="value-card__unit">
              {{ card.unit }}
            </span>
          </div>

          <div class="value-card__footer">
            <status_label :type="card.id" :status="card.getStatus()" />
            <!-- <div class="value-card__icon">↗</div> -->
          </div>
        </div>
      </div>

      <!-- 🌟彈窗🌟 -->
      <div class="pop-overlay" v-if="isPopOpen" @click.self="closePop">
        <div class="values__pop-window">
          <!-- 關閉按鈕 -->
          <div class="close-pop__btn" @click="closePop">
            <img src="/public/images/metrics/close_24dp_FFFFFF_FILL0_wght400_GRAD0_opsz24.svg" alt="">
          </div>
          <!-- 🌟歷史記錄(左) -->
          <div class="records">
            <div class="records__table" v-if="isBloodPressure || isHeartRate">
              <div class="records__title2">
                <span>血壓</span>
                <span>心律</span>
                <span class="records__title__time">測量時間</span>
                <span class="records__add-btn" @click="setDefaultForm"><img
                    src="/public/images/metrics/add_24dp_FFFFFF_FILL0_wght400_GRAD0_opsz24.svg" alt=""></span>
              </div>
              <div class="records__data2" v-for="(record, index) in records__data" :key="index"
                :class="{ 'records__data--active': selectedIndex === index }">
                <span class="records__bp">
                  {{ record.systolic_pressure }}/{{ record.diastolic_pressure }}
                </span>
                <span class="records__hr">
                  {{ record.heart_rate }}
                </span>
                <span class="records__record_at">
                  {{ record.recorded_at }}
                </span>
                <span class="edit-icon" @click="fillFormFromRecord(record, index)">
                  <img src="/public/images/metrics/edit_square_24dp_2E6669_FILL0_wght400_GRAD0_opsz24.svg" alt="">
                </span>
              </div>
            </div>
            <div class="records__table" v-else>
              <div class="records__title">
                <span>
                  {{ metricsConfig[activeMetricKey].title }}
                  <span class="records__unit"></span>
                </span>
                <span class="records__title__time">測量時間</span>
                <span class="records__add-btn" @click="setDefaultForm"><img
                    src="/public/images/metrics/add_24dp_FFFFFF_FILL0_wght400_GRAD0_opsz24.svg" alt=""></span>
              </div>
              <!-- 單筆紀錄 -->
              <!-- 單筆紀錄 -->
              <div class="records__data" v-for="(record, index) in records__data" :key="index"
                :class="{ 'records__data--active': selectedIndex === index }">
                <span class="records__value">
                  {{
                    metricsConfig[activeMetricKey].renderValue
                      ? metricsConfig[activeMetricKey].renderValue(record)
                      :
                      Number(record[metricsConfig[activeMetricKey].valueField]).toFixed(metricsConfig[activeMetricKey].decimals
                  || 0)
                  }}
                </span>
                <span class="records__record_at">
                  {{ record[metricsConfig[activeMetricKey].timeField] }}
                </span>
                <span class="edit-icon" @click="fillFormFromRecord(record, index)">
                  <img src="/public/images/metrics/edit_square_24dp_2E6669_FILL0_wght400_GRAD0_opsz24.svg" alt="">
                </span>
              </div>
            </div>
          </div>

          <!-- 🌟輸入區(右) -->
          <form class="input" @submit.prevent="onSave">
            <div class="input__header">
              <div class="input__title" v-if="isBloodPressure || isHeartRate">
                血壓/心律記錄
              </div>
              <div class="input__title" v-else>
                {{ metricsConfig[activeMetricKey].title }}記錄
              </div>
              <div class="input__date">
                <span>日期:</span>
                <span>{{ formDate }}</span>
              </div>
            </div>

            <div class="input__content">
              <!-- 🔥 血壓/心律：顯示收縮壓、舒張壓、心律三個欄位 -->
              <template v-if="isBloodPressure || isHeartRate">
                <!-- 血壓欄位 -->
                <div class="input__card">
                  <div class="input__card__title">血壓 (mmHg)</div>
                  <div class="bp-fields">
                    <input class="input__card__value" v-model="formSYS" type="number" step="1" placeholder="收縮壓">
                    <input class="input__card__value" v-model="formDIA" type="number" step="1" placeholder="舒張壓">
                  </div>
                </div>

                <!-- 心律欄位 -->
                <div class="input__card">
                  <div class="input__card__title">心律 (bpm)</div>
                  <input class="input__card__value" v-model="formHeartRate" type="number" step="1" placeholder="請輸入心律">
                </div>
              </template>
              <!-- 🔥 其他指標：單一欄位 -->
              <template v-else>
                <div class="input__card">
                  <div class="input__card__title">
                    {{ metricsConfig[activeMetricKey].title }} ({{ metricsConfig[activeMetricKey].unit }})
                  </div>
                  <input class="input__card__value" v-model="formValue" type="number"
                    :step="metricsConfig[activeMetricKey].step || 1"
                    :placeholder="`請輸入${metricsConfig[activeMetricKey].title}`">
                </div>
              </template>

              <!-- 測量時間 -->
              <div class="input__card">
                <div class="input__card__title">測量時間</div>
                <input class="input__card__time-select" type="time" v-model="formTime" step="60" placeholder="請選擇時間">
              </div>
            </div>

            <div class="input__btn-area">
              <button type="submit" class="input__btn">
                {{ isEditMode ? '更新' : '儲存' }}
              </button>
            </div>
          </form>
        </div>
      </div>

    </section>

    <section class="trends">
      <div class="header">
        <div class="title">指標趨勢</div>
      </div>
      <div class="trends__content">
        <!-- 🌟折線圖區塊 -->
        <div class="trends__line-chart">
          <canvas ref="chartCanvas"></canvas>
        </div>

        <div class="trends__right-btns">
          <!-- <div class="trends__btn trends__btn--on">體重</div> -->
          <div class="trends__btn" v-for="btn in trendsSelectBtn" :key="btn"
            :class="{ 'trends__btn--on': activeTrendsBtn === btn }" @click="activeTrendsBtn = btn">
            {{ btn }}
          </div>
        </div>
      </div>
    </section>

  </div>

</template>


<style lang="scss" scoped>
.header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 20px 0;
}

.title {
  font-size: 18px;
  color: $primaryDark;
  line-height: $lineHeightSub;
  font-weight: 700;
  letter-spacing: $letterSpacing;
}

.period-select {
  display: flex;
  border-radius: 100px;
  background-color: $primaryLight;
}

.period-select__btn {
  height: 40px;
  padding: 0 30px;
  display: flex;
  align-items: center;
  // border: solid 1px;
  border-radius: 100px;
  cursor: pointer;
  transition: ease 0.2s;
}

.period-select__btn--on {
  background-color: $primaryDark;
  color: white;
}

.values__card-area {
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
}

.value-card {
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  box-sizing: border-box;
  justify-content: space-between;
  padding: 10px;
  background-color: white;
  width: calc(18% - 16px);
  height: 120px;
  border-radius: 10px;
  box-shadow: $shadow;
}

.value-card2 {
  width: calc(28% - 16px);
  min-width: 215px;
}

.value-card__header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 16px;
  line-height: $lineHeightSub;
  font-weight: $fontWeightRegular;
  letter-spacing: $letterSpacing;
}

.value-card__header-left {
  display: flex;
  align-items: center;
}

.value-card__icon {
  width: 20px;
  height: 20px;
  margin-right: 5px;
}

.value-card__arrow {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 30px;
  height: 30px;
  border-radius: 100px;
  cursor: pointer;
  transition: ease 0.2s;
}

.value-card__arrow:hover {
  background-color: $primaryLight;
}

.value-card__arrow img {
  width: 15px;
  height: 15px;
}

.value-card__content {
  display: flex;
  align-items: center;
}

.value-card__value {
  font-size: 30px;
  line-height: $lineHeightHeading;
  font-weight: $fontWeightBold;
  letter-spacing: $letterSpacing;
}

.value-card__unit {
  line-height: $lineHeightHeading;
  margin-left: 5px;
}

.value-card__footer {
  display: flex;
  justify-content: space-between;
}

.value-card__tag {
  display: flex;
  align-items: center;
  font-size: 12px;
  font-weight: $fontWeightRegular;
  letter-spacing: $letterSpacing;
  border: solid 1px;
  color: white;
  background-color: $accent;
  border-radius: 100px;
  padding: 0 10px;
}

.tag--normal {
  background-color: green;
}

.tag--warning {
  background-color: red;
}

// 🌟彈窗🌟
.values__pop-window {
  border-radius: 10px;
  position: relative;
  display: grid;
  grid-template-columns: 3fr 2fr;
  grid-template-areas: "records input";
  width: 800px;
  height: 500px;
  background-color: white;
}

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

//🌟彈窗_左邊歷次記錄區
.records {
  grid-area: records;
  position: relative;
  box-sizing: border-box;
  padding: 20px;
  border-right: solid 1px $primaryLight;
}

.records__table {
  height: 360px;
  overflow-y: auto;
}

.records__title {
  position: sticky;
  top: 0;
  display: grid;
  grid-template-columns: auto 150px 40px;
  align-items: center;
  height: 40px;
  padding-left: 10px;
  background-color: $primaryDark;
  color: white;
}

.records__title2 {
  position: sticky;
  top: 0;
  display: grid;
  grid-template-columns: auto auto 150px 40px;
  align-items: center;
  height: 40px;
  padding-left: 10px;
  background-color: $primaryDark;
  color: white;
}

.records__add-btn {
  display: flex;
  width: 30px;
  height: 30px;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  border-radius: 100px;
}

.records__add-btn img {
  width: 25px;
  height: 25px;
}

.records__add-btn:hover {
  background-color: $primary;
}

.records__data {
  display: grid;
  grid-template-columns: auto 150px 40px;
  align-items: center;
  padding-left: 10px;
  height: 40px;
  border-bottom: solid 1.5px white;
  background-color: $primaryLight;
  cursor: pointer;
}

.records__data2 {
  display: grid;
  grid-template-columns: 1fr 1fr 150px 40px;
  align-items: center;
  padding-left: 10px;
  height: 40px;
  border-bottom: solid 1.5px white;
  background-color: $primaryLight;
  cursor: pointer;
}

.records__data:hover {
  // box-shadow: inset 0 0 0 1.5px $primary;
  background-color: rgba(42, 157, 143, 0.5);
}

.records__data2:hover {
  background-color: rgba(42, 157, 143, 0.5);
}

.records__data--active {
  background-color: rgba(42, 157, 143, 0.5);
}

.edit-icon {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 30px;
  width: 30px;
  border-radius: 5px;
}

.edit-icon img {
  height: 20px;
  width: 20px;
}

.edit-icon:hover {
  background-color: white;
}

//🌟彈窗_右邊輸入區
.input {
  grid-area: input;
  display: flex;
  flex-direction: column;
  padding: 20px;
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
  $fontWeightBold: 700;
  padding: 5px 0;
  @include body1(true);
}

.input__card__value {
  height: 40px;
  width: 100%;
  padding-left: 5px;
  border-radius: 5px;
}

.input__card__time-select {
  height: 40px;
  width: 100%;
  padding-left: 5px;
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

//🌟指標趨勢
.trends__content {
  display: flex;
  gap: 20px;
}

.trends__line-chart {
  width: calc(80% - 10px);
  height: 300px;
  // border: solid 1px;
  background-color: white;
  border-radius: 10px;
  padding: 5px;
  box-shadow: $shadow;
}

.trends__right-btns {
  display: flex;
  flex-direction: column;
  box-sizing: border-box;
  width: calc(20% - 10px);
  padding: 5px;
  gap: 5px;
  border: solid 1px $primary;
  background-color: white;
  border-radius: 10px;
}

.trends__btn {
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 18px;
  font-weight: $fontWeightRegular;
  letter-spacing: $letterSpacing;
  width: 100%;
  height: 54px;
  border-radius: 10px;
  transition: ease 0.2s;
  cursor: pointer;
}

.trends__btn--on {
  background-color: $primaryDark;
  color: white;
}

.trends__btn:not(.trends__btn--on):hover {
  background-color: $primaryLight;
}


// 🌟RWD RWD RWD RWD RWD RWD
@media (max-width:1200px) {
  .value-card {
    width: calc(25% - 15px);
  }
}

@media(max-width:800px) {
  .value-card {
    width: calc(33% - 13px);
  }

  .values__pop-window {
    grid-template-columns: 1fr;
    grid-template-rows: auto auto;
    grid-template-areas:
      "input"
      "records";
    width: 100%;
    height: 100%;
    min-height: 600px;
  }

  .records {
    border: 0;
    overflow: hidden;
  }

  .records__table {
    height: 100%;
  }

}

@media(max-width:600px) {
  .value-card {
    width: calc(50% - 10px)
  }

  .trends__content {
    display: flex;
    flex-direction: column-reverse;
  }

  .trends__line-chart {
    width: 100%;
  }

  .trends__right-btns {
    width: 100%;
    display: flex;
    flex-direction: row;
  }

  .trends__btn {
    width: 20%;
    height: 40px;
  }

  .header {
    flex-direction: column;
    align-items: flex-start;
    gap: 15px;
  }

  .period-select {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    width: 100%;
  }

  .period-select__btn {
    display: flex;
    justify-content: center;
  }
}

@media(max-width:450px) {
  .records__unit {
    display: none;
  }
}

@media(max-height:520px) {
  .pop-overlay {
    align-items: flex-start;
  }
}
</style>