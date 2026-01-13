<script setup>
import { ref } from 'vue'
const props = defineProps({
  features: {
    type: Array,
    default: () => []
  },
  details: {
    type: Object,
    default: () => ({})
  },
})

// 下方資訊tab
const infoTab = ref(['產品介紹', '商品規格', '配送須知'])
const currentTab = ref('產品介紹')


// info_tab切換
const selectTab = (tab) => {
  currentTab.value = tab
}
</script>
<template>
  <section class="product_info_card">
    <ul class="info_tabs">
      <li v-for="tab in infoTab" :key="tab" @click="selectTab(tab)" class="tab_item"
        :class="{ 'active': currentTab === tab }">{{ tab }}</li>
    </ul>
    <div class="info_content">
      <div class="feature_block" v-if="currentTab === '產品介紹'">
        <ul class="feature_list">
          <li v-for="feature in features" :key="feature">{{ feature }}</li>
        </ul>
      </div>
      <div class="spec_block" v-if="currentTab === '商品規格'">
        <ul class="spec_list">
          <li>劑型: {{ details.dosage }}</li>
          <li>數量: {{ details.quantity }}</li>
          <li>參考食用天數: {{ details.days }}</li>
          <li>建議食用方式: {{ details.usage }}</li>
          <li>注意事項: {{ details.warning }}</li>
        </ul>
      </div>
      <div class="shipping_block" v-if="currentTab === '配送須知'">
        <div class="shipping_section">
          <h3 class="section_title">【運費計算】</h3>
          <ul class="shipping_list">
            <li>
              <p>台灣本島：單筆滿 <strong>NT$ 999 免運費</strong>；未滿酌收 NT$ 100。</p>
            </li>
            <li>
              <p>離島地區：澎湖、金門每筆訂單固定酌收 NT$ 300。</p>
            </li>
          </ul>
        </div>
        <div class="shipping_section">
          <h3 class="section_title">【配送提醒】</h3>
          <ul class="shipping_list">
            <li>
              <p>司機送貨前會先電話聯繫，請留意陌生來電。</p>
            </li>
            <li>
              <p>備註之「指定時段」僅供參考，實際送達時間依當日路線為主。</p>
            </li>
            <li>
              <p>若訂單商品較多，可能會分箱包裝並分次送達。</p>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </section>
</template>
<style lang="scss" scoped>
.product_info_card {
  padding: 16px 24px 24px;
  background-color: $white;
  box-shadow: $shadow;
  border-radius: $radius_md;

  .info_tabs {
    display: flex;
    gap: 40px;
    margin-bottom: 24px;
    border-bottom: 1px solid $gray;

    .tab_item {
      padding-bottom: 4px;
      @include body2(true);
      color: $grayDark;
      transition: all .3s;
      cursor: pointer;

      &:hover {
        color: $primary;
      }

      &.active {
        color: $primary;
        border-bottom: 2px solid $primary;
      }
    }
  }

  .info_content {
    li {
      @include body2;
      color: $black;
      position: relative;
      padding-left: 16px;

      &::before {
        content: '';
        position: absolute;
        left: 0;
        top: 9px;
        width: 5px;
        height: 5px;
        border-radius: 50%;
        background-color: $primaryDark;
      }
    }

    .feature_list,
    .spec_list {
      display: flex;
      flex-direction: column;
      gap: 4px;
    }

    .shipping_block {
      display: flex;
      flex-direction: column;
      gap: 20px;

      .shipping_section {
        .section_title {
          @include body2(true);
          color: $primaryDark;
          margin-bottom: 6px;
        }

        .shipping_list {
          display: flex;
          flex-direction: column;
          gap: 4px;

          li {
            strong {
              color: $primary;
            }
          }
        }
      }
    }
  }
}
</style>