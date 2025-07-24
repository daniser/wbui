<template>
  <v-app>
    <Head>
      <Title>{{ $t("tagline") }}</Title>
    </Head>
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
        <LanguageMenu open-on-hover />
        <PersonalMenu open-on-hover />
      </template>
    </v-app-bar>
    <v-footer app color="primary" class="justify-center">
      {{ new Date().getFullYear() }} © {{ $account?.name }}
    </v-footer>
    <slot />
  </v-app>
</template>

<script setup lang="ts">
const colorMode = useColorMode();
const theme = useTheme();

watch(
  () => colorMode.value,
  (value) => theme.change(value),
);
</script>
