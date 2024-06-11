<template>
  <v-text-field v-model="model" v-maskito="maskitoOptions" />
</template>

<script setup lang="ts">
import { maskito as vMaskito } from "@maskito/vue";
import documentMasks from "~/utils/masks";
import type { DocumentType } from "~/types";

const model = defineModel<string>();
const props = defineProps<{ type?: DocumentType }>();

const maskitoOptions = computed(() => (props.type && documentMasks[props.type]) || null);

watch(maskitoOptions, () => (model.value = ""));
</script>
