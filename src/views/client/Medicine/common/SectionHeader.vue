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
  margin: 16px 0;
  h2 {
    @include body1(true);
    color: $primaryDark;
  }
  button {
    display: flex;
    margin-left: auto;
    margin-right: 40px;
    background: $primaryDark;
    color: $white;
    @include body2;
    border: none;
    padding: 4px 12px;
    border-radius: $radius_md;
    cursor: pointer;
    transition: all 0.3s ease;
    &:hover {
    background-color: $white;
    color: $primaryDark;
    outline: 1px solid $primaryDark;
    }
  }
}
</style>
