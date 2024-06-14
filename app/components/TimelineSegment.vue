<template>
  <div class="segment h-full min-w-4 flex-col content-end text-center">
    <span v-if="title">{{ title }}</span>
    <div class="line" />
    <v-tooltip v-if="tooltip" activator="parent" location="bottom">
      {{ tooltip }}
    </v-tooltip>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  length: number;
  color: string;
  title?: string;
  tooltip?: string;
}>();
</script>

<style scoped>
.segment {
  flex-grow: v-bind(length);
}

.line {
  background-color: v-bind(color);
}
</style>
