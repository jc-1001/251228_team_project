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


// 點擊大圖看全螢幕效果
const showLightbox = ref(false)
const lightboxImage = ref('')

const openLightbox = (imgSrc) => {
  lightboxImage.value = imgSrc
  showLightbox.value = true
}

const closeLightbox = () => {
  showLightbox.value = false
}

</script>
<template>
  <div class="product_pic">
    <!-- ?是為了確認gallery[0]是否存在，不存在則不執行 -->
    <img :src="currentImage ? parsePublicFile(currentImage) : parsePublicFile(gallery[0]?.large)" alt="商品圖片" class="main_image" @click="openLightbox(parsePublicFile(currentImage))">
    <div class="thumbnail_list">
      <img v-for="img in gallery" :src="parsePublicFile(img.small)" alt="商品圖片" :key="img.small" @click="changeImg(img.large)" class="thumbnail" :class="{'active':currentImage == img.large}">
    </div>
  </div>
  <Transition name="fade">
    <div v-if="showLightbox" class="lightbox_overlay" @click="closeLightbox">
    <button class="close_btn">&times;</button>
    <div class="lightbox_content" @click.stop>
      <img :src="lightboxImage" alt="全螢幕預覽">
    </div>
  </div>
  </Transition>
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
    cursor: pointer;
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
      height: 80px;
      object-fit: cover;
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

// 全螢幕遮罩
.lightbox_overlay {
  display: flex;
  justify-content: center;
  align-items: center;
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.60);
  z-index: 999;
  cursor: zoom-out;

  .lightbox_content {
    max-width: 90%;
    max-height: 90%;
    
    img {
      width: 100%;
      height: 100%;
      object-fit: contain;
      box-shadow: 0 0 20px rgba(0,0,0,0.5);
    }
  }

  .close_btn {
    position: absolute;
    top: 25px;
    right: 60px;
    font-size: 40px;
    background: none;
    color: $white;
    border: none;
    cursor: pointer;
    transition: all .3s;
    &:hover {
      color: #06C755;
    }
  }
}

// 淡入淡出動畫
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>