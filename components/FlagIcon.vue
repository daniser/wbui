<template>
  <v-icon :icon="`fi fi-${country.toLowerCase()}${squared ? ' fis' : ''}`" class="!opacity-100" />
</template>

<script setup lang="ts">
import "/node_modules/flag-icons/css/flag-icons.min.css";
import type { TCountryCode } from "countries-list";

defineProps<{ country: TCountryCode; squared?: boolean }>();
</script>
