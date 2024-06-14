<template>
  <v-main>
    <FlightGroup />
  </v-main>
</template>

<script setup lang="ts">
definePageMeta({
  layout: "profile",
  middleware: "auth",
});
</script>
