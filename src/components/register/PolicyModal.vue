<template>
  <div class="modal-mask" @click.self="$emit('close')">
    <div class="modal-container">
      <header class="modal-header">
        <h3>{{ title }}</h3>
        <button class="close-btn" @click="$emit('close')">&times;</button>
      </header>
      
      <div class="modal-body">
        <slot></slot>
      </div>

      <footer class="modal-footer">
        <button class="confirm-btn" @click="$emit('close')">我已了解</button>
      </footer>
    </div>
  </div>
</template>

<script setup>
defineProps(['title']);
defineEmits(['close']);
</script>

<style scoped>
.modal-mask {
  position: fixed;
  top: 0; left: 0;
  width: 100%; height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex; align-items: center; justify-content: center;
  z-index: 1000;
}
.modal-container {
  background: white;
  width: 90%; max-width: 500px;
  max-height: 80vh;
  border-radius: 8px;
  display: flex; flex-direction: column;
}
.modal-header {
  padding: 20px; border-bottom: 1px solid #eee;
  display: flex; justify-content: space-between; align-items: center;
}
.modal-body {
  padding: 20px; overflow-y: auto; line-height: 1.6; color: #444;
}
.modal-footer {
  padding: 15px; border-top: 1px solid #eee; text-align: center;
}
.confirm-btn {
  background: #2E6669; color: white; border: none;
  padding: 8px 30px; border-radius: 4px; cursor: pointer;
}
</style>