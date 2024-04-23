<template>
  <v-main>
    <div v-for="person in persons" :key="person.id">{{ person.name }}</div>
  </v-main>
</template>

<script setup lang="ts">
import type { Person } from "~/types/persons";

definePageMeta({
  layout: "profile",
  middleware: "auth",
});

const { data: persons } = await useCApi<Person[]>("persons");
</script>
