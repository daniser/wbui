<template>
  <div class="timeline align-end flex"><slot /></div>
</template>

<script setup lang="ts">
const props = defineProps<{
  thickness?: number;
}>();

const height = computed(() => (props.thickness ?? 4) + "px");
</script>

<style scoped>
.timeline:deep(.segment > .line) {
  height: v-bind(height);
}
</style>
