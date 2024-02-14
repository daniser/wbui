<template>
  <v-text-field v-model="phone" v-maskito="maskitoPhoneOptions" type="tel" :prefix="prefixEmoji">
    <template v-if="flag === 'svg'" #prepend-inner>
      <span v-if="numberCountry" :class="`fi fi-${numberCountry.toLowerCase()}`" />
    </template>
    <template v-else-if="flag === 'emoji'" #prepend-inner>
      <span v-if="emoji">{{ emoji }}</span>
    </template>
  </v-text-field>
</template>

<script setup lang="ts">
import { maskito as vMaskito } from "@maskito/vue";
import { maskitoPhoneOptionsGenerator, maskitoGetCountryFromNumber } from "@maskito/phone";
import metadata from "libphonenumber-js/min/metadata";
import type { CountryCode } from "libphonenumber-js";

import { getEmojiFlag, type TCountryCode } from "countries-list";
import "/node_modules/flag-icons/css/flag-icons.min.css";

type Flag = "none" | "emoji" | "prefix" | "svg";

const phone = defineModel<string>();

const props = withDefaults(
  defineProps<{
    strict?: boolean;
    country?: CountryCode;
    flag?: Flag;
  }>(),
  {
    strict: false,
    country: undefined,
    flag: "svg",
  },
);

const numberCountry = computed(() => (phone.value ? maskitoGetCountryFromNumber(phone.value, metadata) : undefined));

const emoji = computed(() => (numberCountry.value ? getEmojiFlag(numberCountry.value as TCountryCode) : undefined));

const prefixEmoji = computed(() => (props.flag === "prefix" ? emoji.value : undefined));

const maskitoPhoneOptions = maskitoPhoneOptionsGenerator({
  metadata,
  strict: props.strict,
  countryIsoCode: props.country,
});
</script>
