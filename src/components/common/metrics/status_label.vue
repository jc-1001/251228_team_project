<template>
    <span :class="['status-label', statusClass]">
        <!--動態樣式   ↑固定值        ↑變數 -->
        {{ statusText }}
    </span>
    <!-- 渲染結果:
    <span class="status-badge status-overweight">
        體重過重
    </span> -->
</template>


<script setup>
import { computed } from 'vue';


// 1️⃣接收父層傳來的prop 
const props = defineProps({  //用來定義元件接收的 props
    type: {             //weight/bloobPressure/bloodSugar...
        type: String, 
        required: true,
    },
    status: {           //high/normal/low
        type: String,   //類型必須是字串
        required: true, //這個 prop 是必填的(可選)
    }
}) //ex:prop.status = overweight

// 2️⃣computed 執行
const statusText = computed(() => {
    const textMap = {
        //        key: value,
        "weight-high": "體重過重",
        "weight-normal": "體重正常",
        "weight-low": "體重過輕",

        "oxygen-normal": "血氧正常",
        "oxygen-low": "血氧過低",

        "sugar-high": "血糖過高",
        "sugar-normal": "血糖正常",
        "sugar-low": "血糖過輕",

        "heartRate-high": "心律過高",
        "heartRate-normal": "心律正常",
        "heartRate-low": "心律過低",

        "pressure-high": "血壓過高",
        "pressure-normal": "血壓正常",
        "pressure-low": "血壓過低"
    }
    
    return textMap[`${props.type}-${props.status}`]  
})

// 3️⃣CSS 狀態類別計算
const statusClass = computed(() => {
    const colorMap = {
        "normal":"status-normal",
        "high":"status-high",
        "low":"status-low",
    }
    return colorMap[props.status]
})

</script>


<style lang="scss" scoped>
// 基礎樣式（共用）
.status-label {
    font-size: 12px;
    padding: 2px 10px;
    border-radius: 100px;
}

.status-normal {
    color: white;
    background-color: green;
}

.status-high {
    color: white;
    background-color: red;
}

.status-low {
    background-color: orange;
}
</style>