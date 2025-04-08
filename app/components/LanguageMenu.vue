<template>
  <v-menu>
    <template #activator="{ props }">
      <v-btn v-bind="props" :title="$t('language')">
        <template v-if="currentLocale?.flag" #prepend>
          <FlagIcon :country="currentLocale.flag as TCountryCode" />
        </template>
        {{ currentLocale?.name }}
      </v-btn>
    </template>
    <v-list>
      <v-list-item v-for="item in locales" :key="item.code" :to="switchLocalePath(item.code)" :title="item.name">
        <template v-if="item.flag" #prepend><FlagIcon :country="item.flag as TCountryCode" /></template>
      </v-list-item>
    </v-list>
  </v-menu>
</template>

<script setup lang="ts">
import type { TCountryCode } from "countries-list";

const { locale, locales } = useI18n();
const switchLocalePath = useSwitchLocalePath();

const currentLocale = computed(() => {
  return locales.value.find((i) => i.code === locale.value);
});
</script>
