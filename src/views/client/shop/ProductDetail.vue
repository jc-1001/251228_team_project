<script setup>
import { ref, computed } from 'vue'
import { useRoute } from 'vue-router'
import { allProducts } from '@/data/shop/productInfo'
import TheTopIcon from '@/components/common/TheTopIcon.vue'
import QuantitySelector from '@/components/shop/QuantitySelector.vue'


const route = useRoute()
// const product = ref(allProducts)
// 筆記: find可以回傳找出的唯一值 / filter則是回傳"陣列"，即使只有一個也會回傳陣列
const currentProduct = computed(() => {
  return allProducts.find((item) => {
    return item.id === parseInt(route.params.id)
  })
})

</script>

<template>
  <div class="product_datail_page">
    <TheTopIcon />
    <div class="breadcrumb"></div>
    <section class="product_detail_card">
      <div class="product_pic">
        <img :src="currentProduct.detailImg" :alt="currentProduct.title" class="main_image">
        <img :src="currentProduct.image" :alt="currentProduct.title" class="small_image">
      </div>
      <div class="product_body">
        <div class="product_content">
          <div class="product_txt">
            <p class="product_tag">{{ currentProduct.tag }}</p>
            <h3 class="product_title">{{ currentProduct.title }}</h3>
            <p class="product_desc">{{ currentProduct.desc }}</p>
          </div>
          <div class="product_price_info">
            <p>價格: <span class="product_price">${{ currentProduct.price }}</span></p>
            <p class="point_reminder"><span></span>本商品符合積分折抵資格(結帳時使用)</p>
          </div>
        </div>
        <div class="product_action">
          <p class="stock_warning"><span class="warning_icon"></span>庫存量剩餘: 2</p>
          <div class="action_row">
            <QuantitySelector/>
            <button class="btn_add_to_cart">加入購物車</button>
          </div>
        </div>
      </div>
    </section>
    <section class="product_info_card">

    </section>
  </div>
</template>

<style lang="scss" scoped>
.product_datail_page {
  .product_detail_card {
    display: flex;
    flex-wrap: wrap;
    gap: 32px;
    padding: 40px 32px;
    background-color: $white;
    border-radius: $radius-md;
    box-shadow: $shadow;

    .product_pic {
      display: flex;
      flex-direction: column;
      gap: 16px;
      flex: 1 1 352px;

      .main_image {
        width: 100%;
        object-fit: cover;
        border-radius: $radius-md;
      }

      .small_image {
        width: 15%;
      }
    }

    .product_body {
      display: flex;
      flex-direction: column;
      gap: 8px;
      flex: 1 1 200px;

      .product_content {
        display: flex;
        flex-direction: column;
        gap: 32px;

        .product_txt {
          display: flex;
          flex-direction: column;
          align-items: flex-start;
          gap: 8px;

          .product_tag {
            padding: 2px 8px;
            @include body3;
            color: $white;
            background-color: $accent;
            border-radius: $radius-sm;
          }

          .product_title {
            @include title2;
            color: $primaryDark;
          }

          .product_desc {
            @include body2;
            // color: $primary;
          }
        }

        .product_price_info {
          display: flex;
          flex-direction: column;
          gap: 8px;
          padding: 16px 24px;
          color: $primaryDark;
          background: $linear1;
          border: 1px solid $gray;
          border-radius: $radius-md;

          .product_price {
            @include subtitle1(true);
          }

          .point_reminder {
            @include body3(true);
          }
        }
      }

      .product_action {
        .action_row {
          display: flex;
          flex-wrap: wrap;
          .btn_add_to_cart {
            flex: 2 1 200px;
            border: none;
            border-radius: $radius-sm;
            color: $white;
            background-color: $primaryDark;
          }
        }
      }
    }
  }
}
</style>