<template>
  <v-card class="ma-5 max-w-[1000px]">
    <v-list density="compact">
      <v-list-item v-for="(message, index) in messages" :key="index">
        <template #prepend>
          <MessageIcon :message="message" />
        </template>
        {{ message.message }}
      </v-list-item>
    </v-list>
  </v-card>
</template>

<script setup lang="ts">
import type { Message } from "~/types";

defineProps<{ messages: Message[] }>();
</script>
