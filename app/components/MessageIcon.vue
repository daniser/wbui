<template>
  <v-tooltip :text="message.code.toString()">
    <template #activator="{ props }">
      <v-icon v-bind="{ ...props, ...typeIconMap[message.type] }" />
    </template>
  </v-tooltip>
</template>

<script setup lang="ts">
import type { Message } from "~/types";

defineProps<{ message: Message }>();

const typeIconMap = {
  DEBUG: { icon: "mdi-bug", color: "purple" },
  INFO: { icon: "mdi-information", color: "info" },
  NOTICE: { icon: "mdi-bell", color: "success" },
  WARNING: { icon: "mdi-alert", color: "warning" },
  ERROR: { icon: "mdi-alert-circle", color: "error" },
  FORUSER: { icon: "mdi-account", color: "cyan" },
};
</script>
