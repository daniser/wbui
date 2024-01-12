<template>
  <v-main v-if="state">
    <div v-for="(message, index) in state.result.messages" :key="index">{{ message.message }}</div>
  </v-main>
</template>

<script setup lang="ts">
import type { SearchState } from "~/types";

const config = useRuntimeConfig();
const route = useRoute();

const { data: state } = await useFetch<SearchState>(`${config.public.apiBase}/search/${route.params.session}`);
</script>
