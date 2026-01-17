<script setup>
import TheInput from '../../TheInput.vue'
</script>
<template>
  <main>
    <div class="mask">
      <div class="modal">
        <div class="cancelled">
          <span class="material-symbols-rounded"> cancel </span>
        </div>
        <div class="modal-text">
          <div class="modal-title">
            <h2>我是標題</h2>
          </div>
          <div class="time">
            <h5>我是時間</h5>
          </div>
        </div>
        <div class="content"><TheInput title="輸入框標題" />我是燈箱內容aaaaaaaaaaaaa</div>
      </div>
    </div>
  </main>
</template>
<style lang="scss" scoped>
.mask {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;

  // 半透明背景
  background-color: rgba(0, 0, 0, 0.5);

  // 讓內部燈箱置中
  display: flex;
  justify-content: center;
  align-items: center;
  // 最上層
  z-index: 999;
}
.modal {
  padding: 20px;
  width: 400px;
  height: 500px;
  background-color: white;
  border: 1px solid black;
  position: relative;
  border-radius: 10px;
  border-width: $shadowDark;
  .cancelled {
    position: absolute;
    top: 16px;
    right: 16px;
  }
  .modal-text {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 12px;
    margin: 20px 0;
  }
}
</style>
