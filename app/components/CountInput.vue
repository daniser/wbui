<template>
  <v-number-input
    v-model.number="model"
    :min="min"
    :max="max"
    :step="step"
    decimal-separator="."
    readonly
    variant="plain"
    control-variant="split"
    density="compact"
    hide-details
    :placeholder="min.toString()"
    persistent-counter
    @keydown.stop.capture="onKeydown"
  >
    <template #decrement="slotProps">
      <v-btn
        v-bind="slotProps"
        :disabled="!canDecrease"
        size="small"
        density="compact"
        class="spin-btn"
        tabindex="-1"
        @click="onClickDown"
      />
    </template>
    <template #increment="slotProps">
      <v-btn
        v-bind="slotProps"
        :disabled="!canIncrease"
        size="small"
        density="compact"
        class="spin-btn"
        tabindex="-1"
        @click="onClickUp"
      />
    </template>
  </v-number-input>
</template>

<script setup lang="ts">
const model = defineModel<number>();

const props = withDefaults(defineProps<{ min?: number; max?: number; step?: number }>(), {
  min: 0,
  max: Infinity,
  step: 1,
});

const canDecrease = computed(() => (model.value || 0) - props.step >= props.min);
const canIncrease = computed(() => (model.value || 0) + props.step <= props.max);

function onClickDown() {
  model.value = (model.value || 0) - props.step || undefined;
}

function onClickUp() {
  model.value = (model.value || props.min) + props.step || undefined;
}

function onKeydown(e: KeyboardEvent) {
  console.log("down");
}
</script>
