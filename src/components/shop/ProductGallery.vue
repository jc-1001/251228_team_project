<script setup>
import { ref, watch } from 'vue'
import { parsePublicFile } from '@/utils/parseFile'

const props = defineProps({
  gallery: {
    type: Array,
    default: () => []
  }
})

const currentImage = ref('')
const changeImg = (url)=>{
  currentImage.value = url
}

// watch( 偵測目標 , 執行動作 , 設定選項 )
watch(()=> props.gallery,(newVal)=>{
  if(newVal.length > 0) {
    currentImage.value = newVal[0].large
  }},{immediate:true})

</script>
<template>
  <div class="product_pic">
    <!-- ?是為了確認gallery[0]是否存在，不存在則不執行 -->
    <img :src="currentImage ? parsePublicFile(currentImage) : parsePublicFile(gallery[0]?.large)" alt="商品圖片" class="main_image">
    <div class="thumbnail_list">
      <img v-for="img in gallery" :src="parsePublicFile(img.small)" alt="商品圖片" :key="img.small" @click="changeImg(img.large)" class="thumbnail" :class="{'active':currentImage == img.large}">
    </div>
  </div>
</template>

<style lang="scss" scoped>
.product_pic {
  flex: 1 1 352px;
  display: flex;
  flex-direction: column;
  gap: 16px;
  @media (max-width: 1200px) {
    flex: 1 1 500px;
  }
  .main_image {
    width: 100%;
    object-fit: cover;
    border-radius: $radius-md;
    @media (max-width: 768px) {
      height: 40vh;
      object-position: center;
    }
    @media (max-width: 576px) {
      height: 25vh;
      object-position: center;
    }
  }

  .thumbnail_list {
    display: flex;
    gap: 12px;

    .thumbnail {
      width: 80px;
      border: 2px solid $grayLight;
      border-radius: $radius-sm;
      cursor: pointer;
      transition: all .2s;

      &:hover {
        border: 2px solid $primary;
      }

      &.active {
        border: 2px solid $primary;
      }
    }
  }
}
</style>