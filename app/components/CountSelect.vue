<template>
  <v-select multiple>
    <template #item="{ props, item }">
      <VListItem v-bind="props" class="cs-item">
        <template #append>
          <CountInput
            v-model="model[item.raw.value]"
            :min="item.raw.min ?? min"
            :max="item.raw.max ?? max"
            :step="item.raw.step ?? step"
            class="pl-2"
            tabindex="-1"
          />
        </template>
      </VListItem>
    </template>
  </v-select>
</template>

<script setup lang="ts">
const model = defineModel<Record<string, number>>({ required: true });

defineProps<{
  min?: number;
  max?: number;
  step?: number;
}>();
</script>

<style scoped>
.cs-item:not(:hover):not(:focus):deep(.spin-btn) {
  visibility: hidden;
}

.cs-item:deep(.v-field__input),
.cs-item:deep(.v-field__prepend-inner),
.cs-item:deep(.v-field__append-inner) {
  padding: 0 !important;
}
</style>
