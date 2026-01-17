<script setup>

import { ref, computed, onMounted } from "vue"

import { publicApi } from "@/utils/publicApi"
import { parsePublicFile } from "@/utils/parseFile";

import axios from 'axios'
import TheHeader from "@/components/common/TheHeader.vue";
import status_label from "@/components/common/metrics/status_label.vue";

const records__data = ref([])

// 定義各項指標的配置 // 定義各項指標的配置 // 定義各項指標的配置
const metricsConfig = {
    weight: {
        title: "體重",
        unit: "kg",
        url: "/cid101/ingrid/front/data/metrics/weight.json",
        valueField: "weight",         // json 裡的數值欄位
        timeField: "recorded_at",
    },
    bloodOxygen: {
        title: "血氧",
        unit: "%",
        url: "/cid101/ingrid/front/data/metrics/blood_oxygen.json",
        valueField: "bloodOxygen",
        timeField: "recorded_at",
    },
    bloodSugar: {
        title: "血糖",
        unit: "mg/dL",
        url: "/cid101/ingrid/front/data/metrics/blood_sugar.json",
        valueField: "bloodSugar",
        timeField: "recorded_at",
    },
    heartRate: {
        title: "心律",
        unit: "bpm",
        url: "/cid101/ingrid/front/data/metrics/heart_rate.json",
        valueField: "heartRate",
        timeField: "recorded_at",
    },
    bloodPressure: {
        title: "血壓",
        unit: "mmHg",
        url: "/cid101/ingrid/front/data/metrics/blood_pressure.json",
        // 顯示用：SYS/DIA
        renderValue: (r) => `${r.SYS}/${r.DIA}`,
        timeField: "recorded_at",
    },
}

//各項數值
const weight = ref(80)
const height = ref(175)

const oxygen = ref(96)
const sugar = ref(110)
const heartRate = ref(50)
const pressure = ref({
    systolic: 140,
    diastolic: 110
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
    if (oxygen.value < 95) return "low"
    return "normal"
})

//計算血糖狀態
const sugarStatus = computed(() => {
    if (sugar.value >= 100) return "high"
    if (sugar.value < 70) return "low"
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
    const { systolic, diastolic } = pressure.value
    if (systolic >= 140 || diastolic >= 90) return "high"
    if (systolic < 90 || diastolic < 60) return "low"
    return "normal"
})

// 彈窗
// 彈窗
// 彈窗
const isPopOpen = ref(false)
const activeMetricKey = ref("weight") //預設

// 右側表單狀態
const formDate = ref("")      // YYYY-MM-DD (給 <input type="date"> 用)
const formTime = ref("")      // HH:mm (給 <input type="time"> 用)
const formValue = ref("")     // 單值指標用（體重/血氧/血糖/心律）

// 血壓特例：兩個欄位
const formSYS = ref("")
const formDIA = ref("")

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
        const res = await axios.get(config.url)
        records__data.value = res.data

    } catch (err) {
        console.log(err)
        records__data.value = []
    }
}

//輸入今日日期/清空欄位
const setDefaultForm = () => {
    const now = new Date()

    const yyyy = now.getFullYear()
    const mm = String(now.getMonth() + 1).padStart(2, "0") //如果字串長度不足 2，在左邊補 0
    const dd = String(now.getDate()).padStart(2, "0")

    formDate.value = `${yyyy}-${mm}-${dd}`
    // console.log(formDate)

    // 其他先清空給使用者填
    formTime.value = ""
    formValue.value = ""
    formSYS.value = ""
    formDIA.value = ""
    selectedIndex.value = null
}
//是否是血壓(特殊欄位)
const isBloodPressure = computed(() => activeMetricKey.value === "bloodPressure")

//點擊左邊紀錄 填入右邊表單
const fillFormFromRecord = (record, index) => {
    selectedIndex.value = index

    // recorded_at: "YYYY-MM-DD hh:mm:ss"
    const recorded = record[metricsConfig[activeMetricKey.value].timeField] || ""

    // datePart: "2025-12-31"
    // timePart: "18:30:00"
    const [datePart = "", timePart = ""] = recorded.split(" ")

    formDate.value = datePart
    formTime.value = timePart.slice(0, 5)  // "18:30"

    // 依不同指標填值
    if (activeMetricKey.value === "bloodPressure") {
        formSYS.value = record.SYS ?? ""
        formDIA.value = record.DIA ?? ""
        formValue.value = "" // 不用單值
    } else {
        const valueKey = metricsConfig[activeMetricKey.value].valueField
        formValue.value = record[valueKey] ?? ""
        formSYS.value = ""
        formDIA.value = ""
    }
}

//右邊輸入值帶入左邊(暫時，之後串接api)
const onSave = () => {
    const config = metricsConfig[activeMetricKey.value]

    const recorded_at = `${formDate.value} ${formTime.value}:00`

    let newRecord

    if (activeMetricKey.value === "bloodPressure") {
        newRecord = {
            SYS: Number(formSYS.value),
            DIA: Number(formDIA.value),
            recorded_at,
        }
    } else {
        newRecord = {
            [config.valueField]: Number(formValue.value),
            recorded_at,
        }
    }

    // 先直接塞到 records__data（目前是 json mock，不會真的寫回檔案）
    records__data.value.unshift(newRecord)

    // 存完清空
    setDefaultForm()
}

//選擇時間按鈕(右上)
const activePeriod = ref("today") // 可選："today" | "week" | "month"


</script>



<template>

    <div class="metrics_container">
        <TheHeader title="身體數值中心" subtitle="從各項數據指標了解自己的身體狀態。" image-src="/cid101/ingrid/front/src/assets/images/Banner_metrics.svg">
        </TheHeader>
        <section class="values">
            <div class="header">
                <div class="title">數值總覽</div>
                <div class="period-select">
                    <span class="period-select__btn" :class="{ 'period-select__btn--on': activePeriod == 'today' }"
                        @click="activePeriod = 'today'">
                        今天
                    </span>
                    <span class="period-select__btn" :class="{ 'period-select__btn--on': activePeriod == 'week' }"
                        @click="activePeriod = 'week'">
                        一周
                    </span>
                    <span class="period-select__btn" :class="{ 'period-select__btn--on': activePeriod == 'month' }"
                        @click="activePeriod = 'month'">
                        30天
                    </span>
                </div>
            </div>
            <!-- 燈箱區 -->
            <div class="values__card-area">
                <div class="value-card">
                    <div class="value-card__header">
                        <div class="value-card__title">體重</div>
                        <div class="value-card__arrow" @click="openPop('weight')">></div>
                    </div>
                    <div class="value-card__content">
                        <span class="value-card__value" id="weight">{{ weight }}</span>
                        <span class="value-card__unit">kg</span>
                    </div>
                    <div class="value-card__footer">
                        <status_label type="weight" :status="weightStatus" />
                        <div class="value-card__icon">↗</div>
                    </div>
                </div>
                <div class="value-card">
                    <div class="value-card__header">
                        <div class="value-card__title">血氧</div>
                        <div class=" value-card__arrow" @click="openPop('bloodOxygen')">></div>
                    </div>
                    <div class="value-card__content">
                        <span class="value-card__value" id="blood-oxygen">{{ oxygen }}</span>
                        <span class="value-card__unit">%</span>
                    </div>
                    <div class="value-card__footer">
                        <status_label type="oxygen" :status="oxygenStatus" />
                        <div class="value-card__icon">↗</div>
                    </div>
                </div>
                <div class="value-card">
                    <div class="value-card__header">
                        <div class="value-card__title">血糖</div>
                        <div class="value-card__arrow" @click="openPop('bloodSugar')">></div>
                    </div>
                    <div class="value-card__content">
                        <span class="value-card__value" id="blood-sugar">{{ sugar }}</span>
                        <span class="value-card__unit">mg/dL</span>
                    </div>
                    <div class="value-card__footer">
                        <status_label type="sugar" :status="sugarStatus" />
                        <div class="value-card__icon">↗</div>
                    </div>
                </div>
                <div class="value-card">
                    <div class="value-card__header">
                        <div class="value-card__title">心律</div>
                        <div class="value-card__arrow" @click="openPop('heartRate')">></div>
                    </div>
                    <div class="value-card__content">
                        <span class="value-card__value" id="heart-rhythm">{{ heartRate }}</span>
                        <span class="value-card__unit">bpm</span>
                    </div>
                    <div class="value-card__footer">
                        <status_label type="heartRate" :status="heartStatus" />
                        <div class="value-card__icon">↗</div>
                    </div>
                </div>
                <div class="value-card value-card2">
                    <div class="value-card__header">
                        <div class="value-card__title">血壓</div>
                        <div class="value-card__arrow " @click="openPop('bloodPressure')">></div>
                    </div>
                    <div class="value-card__content">
                        <span class="value-card__value" id="heart-pressure__high">
                            {{ pressure.systolic }}
                        </span>
                        <span>/</span>
                        <span class="value-card__value" id="heart-pressure__low">
                            {{ pressure.diastolic }}
                        </span>
                        <span class="value-card__unit">mmHg</span>
                    </div>
                    <div class="value-card__footer">
                        <status_label type="pressure" :status="pressureStatus" />
                        <div class="value-card__icon">↗</div>
                    </div>
                </div>
            </div>

            <!-- 🌟彈窗🌟 -->
            <div class="pop-overlay" v-if="isPopOpen" @click.self="closePop">
                <div class="values__pop-window">
                    <!-- 🌟歷史記錄(左) -->
                    <div class="records">
                        <div class="records__table">
                            <div class="records__title">
                                <span>
                                    {{ metricsConfig[activeMetricKey].title }} ({{ metricsConfig[activeMetricKey].unit
                                    }})
                                </span>
                                <span class="records__title__time">測量時間</span>
                            </div>
                            <div class="records__list">
                                <!-- 單筆紀錄 -->
                                <div class="records__data" v-for="(record, index) in records__data" :key="index"
                                    @click="fillFormFromRecord(record, index)"
                                    :class="{ 'records__data--active': selectedIndex === index }">
                                    <span class="records__value">
                                        {{
                                            metricsConfig[activeMetricKey].renderValue
                                                ? metricsConfig[activeMetricKey].renderValue(record)
                                                : record[metricsConfig[activeMetricKey].valueField]
                                        }}
                                    </span>

                                    <span class="records__record_at">
                                        {{ record[metricsConfig[activeMetricKey].timeField] }}
                                    </span>
                                </div>

                            </div>
                        </div>
                    </div>

                    <!-- 🌟輸入區(右) -->
                    <form class="input" @submit.prevent="onSave">
                        <div class="input__header">
                            <div class="input__title">
                                {{ metricsConfig[activeMetricKey].title }}記錄
                            </div>
                            <div class="input__date">
                                <span>日期:</span>
                                <span>{{ formDate }}</span>
                            </div>
                            <div class="close-pop__btn" @click="closePop">X</div>
                        </div>
                        <div class="input__content">
                            <div class="input__card">
                                <div class="input__card__title">
                                    {{ metricsConfig[activeMetricKey].title }} ({{
                                        metricsConfig[activeMetricKey].unit }})
                                </div>

                                <!-- 血壓(雙欄位) -->
                                <div v-if="isBloodPressure" class="bp-fields">
                                    <input class="input__card__value" v-model="formSYS" :placeholder="`請輸入收縮壓`">
                                    <input class="input__card__value" v-model="formDIA" :placeholder="`請輸入舒張壓`">
                                </div>

                                <!-- 單一欄位 -->
                                <input v-else class="input__card__value" v-model="formValue"
                                    :placeholder="`請輸入${metricsConfig[activeMetricKey].title}`">
                            </div>
                            <div class="input__card">
                                <div class="input__card__title">測量時間</div>
                                <input class="input__card__time-select" type="time" v-model="formTime" step="60"
                                    placeholder="請選擇時間"></input>
                            </div>
                        </div>
                        <button type="submit" class="btn-save">儲存</button>
                    </form>
                </div>
            </div>


        </section>

        <section class="trends">
            <div class="header">
                <div class="title">指標趨勢</div>
            </div>
            <div class="trends__content">
                <div class="trends__line-chart"></div>

                <div class="trends__right-btns">
                    <div class="trends__btn trends__btn--on">體重</div>
                    <div class="trends__btn">血氧</div>
                    <div class="trends__btn">血糖</div>
                    <div class="trends__btn">心律</div>
                    <div class="trends__btn">血壓</div>
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
    line-height: $lineHeightSub;
    font-weight: $fontWeightRegular;
    letter-spacing: $letterSpacing;
}

.period-select {
    display: flex;
    border-radius: 100px;
    background-color: $primaryLight;
}

.period-select__btn {
    height: 40px;
    padding: 0 20px;
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
}

.value-card2 {
    width: calc(28% - 16px);
    min-width: 215px;
}

@media (max-width:1200px) {
    .value-card {
        width: calc(25% - 15px);
    }
}

@media(max-width:860px){
    .value-card{
        width: calc(33% - 13px);
    }
}

@media(max-width:530px){
    .value-card{
        width: calc(50% - 10px)
    }
}

.value-card__header {
    display: flex;
    justify-content: space-between;
    font-size: 16px;
    line-height: $lineHeightSub;
    font-weight: $fontWeightRegular;
    letter-spacing: $letterSpacing;
}

.value-card__arrow {
    cursor: pointer;
    transition: ease;
}

.value-card__setting:hover {
    font-size: 20px;
}


.value-card__content {
    display: flex;
    align-items: center;
    border: solid 1px;
}

.value-card__value {
    font-size: 32px;
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

.values__pop-window {
    display: flex;
    width: 800px;
    height: 400px;
    background-color: white;
}

/* 遮罩：滿版 + 置中 */
.pop-overlay {
    position: fixed;
    /* top right bottom left = 0 */
    inset: 0;
    background: rgba(0, 0, 0, 70%);
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 9999;
}

//彈窗_左邊歷次記錄區
//彈窗_左邊歷次記錄區
.records {
    width: 50%;
    box-sizing: border-box;
    border: solid 1px;
    padding: 20px;
}

.records__table {
    height: 360px;
    overflow: hidden;
}

.records__title {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 10px;
    height: 40px;
    background-color: $primaryDark;
    color: white;
}

.records__list {
    height: 320px;
    overflow-y: auto;
}

.records__title__time {
    padding-right: 86px;
}

.records__data {
    display: flex;
    align-items: center;
    height: 40px;
    width: 100%;
    padding: 0 10px;
    display: flex;
    justify-content: space-between;
    border: solid 2px white;
    background-color: $primaryLight;
    cursor: pointer;
}

.records__data:hover {
    border: 2px solid $primary;
}

.records__data--active {
    background-color: $primary;
}

//彈窗_右邊輸入區
//彈窗_右邊輸入區
.input {
    display: flex;
    flex-direction: column;
    border: solid 1px;
    width: 50%;
    padding: 20px;
}

.input__header {
    position: relative;
    display: flex;
    flex-direction: column;
    align-items: center;
    border: solid 1px red;
}

.input__title {
    color: $primaryDark;
    $fontWeightBold: 700;
    font-size: 20px;
}

.input__date {
    font-size: 14px;
}

.close-pop__btn {
    position: absolute;
    z-index: 2;
    right: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 30px;
    height: 30px;
    color: white;
    background-color: $grayDark;
    border-radius: 100px;
    cursor: pointer;
}

.input__content {
    display: flex;
    flex-direction: column;
    border: solid 1px red;
}

.input__card {
    display: flex;
    flex-direction: column;
    margin-bottom: 10px;
    border: solid 1px;
}

.input__card__title {
    $fontWeightBold: 700;
    padding: 5px 0;
}

.input__card__value {
    height: 40px;
    width: 100%;
    border-radius: 5px;
}

.input__card__time-select {
    height: 40px;
    width: 100%;
    border-radius: 5px;
}

.bp-fields {
    display: flex;
    gap: 10px;
    border: solid 1px red;
}

.btn-save {
    width: 100%;
    height: 40px;
    margin-top: auto;
    color: white;
    background-color: $primaryDark;
    border-radius: 5px;
    cursor: pointer;
}

.edit-icon {
    height: 15px;
    width: 15px;
}

.trends__content {
    display: flex;
    gap: 20px;
}

.trends__line-chart {
    width: 660px;
    height: 300px;
    border: solid 1px;
    background-color: $primaryLight;
    border-radius: 10px;
}

.trends__right-btns {
    display: flex;
    flex-direction: column;
    box-sizing: border-box;
    padding: 5px;
    gap: 5px;
    width: 200px;
    border: solid 1px;
    background-color: white;
    border-radius: 10px;
}

.trends__btn {
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 18px;
    line-height: $lineHeightSub;
    font-weight: $fontWeightRegular;
    letter-spacing: $letterSpacing;
    width: 100%;
    height: 54px;
    border-radius: 10px;
    cursor: pointer;
}

.trends__btn--on {
    background-color: $primaryDark;
    color: white;
}
</style>