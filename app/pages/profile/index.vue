<template>
  <v-main>index</v-main>
</template>

<script setup lang="ts">
definePageMeta({
  layout: "profile",
  middleware: "sidebase-auth",
});
</script>
