<template>
  <NuxtLoadingIndicator />
  <NuxtLayout>
    <v-app>
      <v-app-bar color="primary" density="compact">
        <template #title>
          <NuxtLink to="/">WB UI</NuxtLink>
        </template>
        <template #append>
          <v-btn-toggle v-model="$colorMode.preference" mandatory divided variant="outlined" class="text-white">
            <v-btn icon="mdi-monitor" value="system" :title="$t('system')" />
            <v-btn icon="mdi-weather-sunny" value="light" :title="$t('light')" />
            <v-btn icon="mdi-weather-night" value="dark" :title="$t('dark')" />
          </v-btn-toggle>
          <LanguageMenu />
          <v-btn to="/login">{{ $t("sign_in") }}</v-btn>
        </template>
      </v-app-bar>
      <NuxtPage />
    </v-app>
  </NuxtLayout>
</template>

<script setup lang="ts">
const colorMode = useColorMode();
const theme = useTheme();

watch(
  () => colorMode.value,
  (value) => (theme.global.name.value = value),
);
</script>
