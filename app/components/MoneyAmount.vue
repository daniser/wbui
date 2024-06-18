<template>
  <i18n-n tag="span" scope="global" :value="amount" :format="format">
    <template #decimal="{ decimal }">{{ showFraction ? decimal : "" }}</template>
    <template #fraction="{ fraction }">{{ showFraction ? fraction : "" }}</template>
  </i18n-n>
</template>

<script setup lang="ts">
const props = defineProps<{
  amount: number;
  currency?: string;
  compact?: boolean;
}>();

const format = computed(() => ({
  key: "currency",
  ...(props.currency && { currency: props.currency }),
}));

const showFraction = computed(() => !(props.compact && Number.isInteger(props.amount)));
</script>
