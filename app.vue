<template>
  <NuxtLoadingIndicator />
  <NuxtLayout>
    <v-app>
      <v-app-bar color="primary" density="compact">
        <template #title>
          <NuxtLink to="/">WB UI</NuxtLink>
        </template>
        <template #append>
          <v-btn v-for="locale in availableLocales" :key="locale.code" :to="switchLocalePath(locale.code)">
            {{ locale.name }}
          </v-btn>
        </template>
      </v-app-bar>
      <NuxtPage />
    </v-app>
  </NuxtLayout>
</template>

<script setup lang="ts">
const { locale: currentLocale, locales } = useI18n();
const switchLocalePath = useSwitchLocalePath();

const availableLocales = computed(() => {
  return locales.value.filter((i) => i.code !== currentLocale.value);
});
</script>
