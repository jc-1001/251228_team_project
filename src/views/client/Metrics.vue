<script setup>

import { ref, computed } from "vue"
import TheHeader from "@/components/common/TheHeader.vue";
</script>

<template>

    <div class="metrics_container">
        <TheHeader title="身體素質中心" subtitle="從各項數據指標了解自己的身體狀態。" image-src="/src/assets/images/Banner_metrics.svg">
        </TheHeader>
        <section class="values">
            <div class="values__title">數值總覽</div>
            <div class="values__card-area">
                <div class="value-card">
                    <dic class="value-card__header">
                        <div class="value-card__title">體重</div>
                        <div class="value-card__setting">></div>
                    </dic>
                    <div class="value-card__content">
                        <span class="value-card__value" id="weight">80</span>
                        <span class="value-card__unit">kg</span>
                    </div>
                    <div class="value-card__footer">
                        <span class="value-card__tag">體重過重</span>
                        <div class="value-card__icon">↗</div>
                    </div>
                </div>
                <div class="value-card">
                    <dic class="value-card__header">
                        <div class="value-card__title"">血氧</div>
                        <div class="value-card__setting">></div>
                    </dic>
                    <div class="value-card__content">
                        <span class="value-card__value" id="blood-oxygen">95</span>
                        <span class="value-card__unit">%</span>
                    </div>
                    <div class="value-card__footer">
                        <span class="value-card__tag">體重過重</span>
                        <div class="value-card__icon">↗</div>
                    </div>
                </div>
                <div class="value-card">
                    <dic class="value-card__header">
                        <div class="value-card__title">血糖</div>
                        <div class="value-card__setting">></div>
                    </dic>
                    <div class="value-card__content">
                        <span class="value-card__value" id="blood-sugar">87</span>
                        <span class="value-card__unit">mg/dL</span>
                    </div>
                    <div class="value-card__footer">
                        <span class="value-card__tag">體重過重</span>
                        <div class="value-card__icon">↗</div>
                    </div>
                </div>
                <div class="value-card">
                    <dic class="value-card__header">
                        <div class="value-card__title">心律</div>
                        <div class="value-card__setting">></div>
                    </dic>
                    <div class="value-card__content">
                        <span class="value-card__value" id="heart-rhythm">114</span>
                        <span class="value-card__unit">bpm</span>
                    </div>
                    <div class="value-card__footer">
                        <span class="value-card__tag">體重過重</span>
                        <div class="value-card__icon">↗</div>
                    </div>
                </div>
                <div class="value-card value-card2">
                    <dic class="value-card__header">
                        <div class="value-card__title">血壓</div>
                        <div class="value-card__setting">></div>
                    </dic>
                    <div class="value-card__content">
                        <span class="value-card__value" id="heart-pressure__high">120</span>
                        <span>/</span>
                        <span class="value-card__value" id="heart-pressure__low">80</span>
                        <span class="value-card__unit">mmHg</span>
                    </div>
                    <div class="value-card__footer">
                        <span class="value-card__tag">體重過重</span>
                        <div class="value-card__icon">↗</div>
                    </div>
                </div>
            </div>
        </section>

        <section class="trends">

        </section>

    </div>

</template>


<style lang="scss" scoped>

.values__title {
    font-size: 18px;
    line-height: $lineHeightSub;
    font-weight: $fontWeightRegular;
    letter-spacing: $letterSpacing;
    border: solid 1px;
    padding: 20px 0;
}
.values__card-area {
    display: flex;
    gap: 20px;
    border: solid 1px;
}

.value-card {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    box-sizing: border-box;
    padding: 10px;
    background-color: white;
    width: 150px;
    height: 120px;
    border-radius: 10px;
}
.value-card2{
width: 200px;
}

.value-card__header {
    display: flex;
    justify-content: space-between;
    border: solid 1px;
    font-size: 16px;
    line-height: $lineHeightSub;
    font-weight: $fontWeightRegular;
    letter-spacing: $letterSpacing;
    border: solid 1px gray;
}
.value-card__content {
    display: flex;
    align-items: center;
    border: solid 1px gray;
}
.value-card__value {
    font-size: 32px;
    line-height: $lineHeightHeading;
    font-weight: $fontWeightBold;
    letter-spacing: $letterSpacing;
}
.value-card__unit {
    line-height: $lineHeightHeading;
    border: solid 1px;
    margin-left: 5px;
}
.value-card__footer {
    display: flex;
    justify-content: space-between;
    border: solid 1px gray;
}
.value-card__tag {
    display: flex;
    align-items: center;
    font-size: 12px;
    // line-height: $lineHeightSub;
    font-weight: $fontWeightRegular;
    letter-spacing: $letterSpacing;
    border: solid 1px;
    color: white;
    background-color: $accent;
    border-radius: 100px;
    padding: 0 10px;
}

.trends{
    width: 660px;
    height: 300px;
    border: solid 1px;
}
</style>