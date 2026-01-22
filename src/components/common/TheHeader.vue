<script setup>
defineProps({
  title: {
    type: String,
    default: '我是大標題', // 預設值
  },
  subtitle: {
    type: String,
    default: '我是副標題',
  },
  imageSrc: {
    type: String,
    default: '', // 圖片路徑
  },
})
</script>
<template>
  <header class="header-banner">
    <div class="content">
      <h2 class="greeting">{{ title }}</h2>
      <p class="subtext">{{ subtitle }}</p>
    </div>
    <div class="illustration">
      <img :src="imageSrc" alt="header-img" />
    </div>
  </header>
</template>

<style lang="scss" scoped>
.header-banner {
  width: 100%;
  height: 120px;
  border: 1px solid $white;
  background: $linear1;
  border-radius: $radius_md;
  box-shadow: $shadowDark;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.greeting {
  line-height: $lineHeightHeading;
  color: $primaryDark;
  padding: 0 0 10px 30px;
  letter-spacing: 5%;
  @media (max-width: 765px) {
    font-size: 18px;
  }
}
.subtext {
  line-height: $lineHeightSub;
  color: $primaryDark;
  @include subtitle2(false); // 字體太大!!
  font-size: 16px;
  padding: 0 30px;
  letter-spacing: 5%;
  @media (max-width: 765px) {
    font-size: 12px;
  }
}
.illustration {
  padding: 20px 10px 0 0;
}
.illustration img {
  width: 70%;
}

@media (max-width: 768px) {
  .content {
    flex: 1 1 300px;
  }
  .illustration {
    display: flex;
    justify-content: center;
    padding: 28px 15px 0 0;
    img {
      width: 80%;
    }
  }
}
</style>
