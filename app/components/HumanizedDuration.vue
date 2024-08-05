<template>
  <span>{{ humanizeDuration(duration, { language: language || locale }) }}</span>
</template>

<script setup lang="ts">
import humanizeDuration from "~/utils/humanize-duration";
import type { Locale } from "@intlify/core-base";

defineProps<{
  duration: number;
  language?: Locale;
}>();

const { locale } = useI18n();
</script>
