<script setup>
// 設定props主要是為了可以拿取即時更新的資料
defineProps({
  id: Number,
  image: String,
  title: String,
  spec: String, // 商品規格
  price: Number,
  tag: String
})

// 加入購物車
const addToCart = () => {
  console.log('加入購物車，但不會跳轉頁面！');
}

</script>
<template>
  <router-link :to="`/product/${id}`" class="product_card">
    <div class="card_img">
      <img v-if="image" :src="image" :alt="title">
      <div v-else class="no_img">尚無圖片</div>
      <div v-if="tag" class="product_tag">{{ tag }}</div>
    </div>

    <div class="card_body">
      <h3 class="product_title">{{ title }}</h3>
      <p class="product_price">${{ price }}</p>
      <div class="card_button">
        <button type="button" @click.prevent="addToCart">加入購物車</button>
      </div>
    </div>
  </router-link>
</template>

<style lang="scss" scoped>
.product_card {
  display: block;       
  text-decoration: none;
  color: inherit;
  box-shadow: $shadow;
  border-radius: 10px;
  background-color: $white;
  transition: transform 0.3s;

  &:hover {
    transform: translateY(-5px);
    box-shadow: $shadowDark;
  }

  .card_img {
    width: 100%;
    position: relative;
    border-radius: 10px 10px 0 0;
    overflow: hidden;

    img {
      display: block;
      width: 100%;
      height: 100%;
      object-fit: cover;
    }

    .product_tag {
      position: absolute;
      left: 12px;
      top: 12px;
      padding: 5px 16px;
      background-color: $accent;
      color: $white;
      @include body3;
      border-radius: 5px;
    }
  }

  .card_body {
    padding: 24px;
    display: flex;
    flex-direction: column;
    gap: 16px;

    .product_title {
      @include subtitle2(true);
      color: $primaryDark;
    }

    .product_price {
      @include body1(true);
    }

    .card_button {
      background-color: $primaryDark;
      text-align: center;
      border-radius: 5px;
      transition: all .3s;

      &:hover {
        background-color: $primary;
      }

      button {
        width: 100%;       
        border: none;      
        background: none;  
        color: $white;
        padding: 8px;
        cursor: pointer;
        @include body2(true);
      }
    }
  }
}
</style>