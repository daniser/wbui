<template>
  <v-main></v-main>
</template>

<script setup lang="ts">
const config = useRuntimeConfig();
const route = useRoute();

const result = ref();

onBeforeMount(async () => {
  result.value = await useFetch(`${config.public.apiBase}/search/${route.params.session}`);
});
</script>
