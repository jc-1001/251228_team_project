<script setup>
  defineProps({
  title: {
    type: String,
    default: '區塊標題',
  },
})

const emit = defineEmits(['createClick'])

</script>
<template>
  <div class="medicine-header">
    <h2>{{ title }}</h2>
    <button @click="emit('createClick')">新增</button>
  </div>
</template>


<style scoped lang="scss">
.medicine-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 32px 0;
  h2 {
    @include title3;
    color: $primaryDark;
  }
  button {
    @include body2;
    background-color: $primaryDark;
    color: #fff;
    border: none;
    border-radius: $radius_md;
    padding: 8px 16px;
    margin: 0 60px;
    cursor: pointer;
    &:hover {
    
    background-color:#fff;
    color: $primaryDark;
    }
  }
}
</style>
