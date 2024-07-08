<template>
  <v-select multiple>
    <template #item="{ props, item }">
      <CountInput
        v-model="model[item.raw.value]"
        :label="item.raw.title"
        :min="min"
        :max="max"
        :step="step"
        class="number-input px-4"
        tabindex="-1"
      />
    </template>
  </v-select>
</template>

<script setup lang="ts">
const model = defineModel<Record<string, number>>({ required: true });

const props = defineProps<{
  min?: number;
  max?: number;
  step?: number;
}>();
</script>

<style scoped>
.number-input:hover {
  background-color: #e2e2e2;
}

.number-input:not(:hover):deep(.spin-btn) {
  visibility: hidden;
}
</style>
