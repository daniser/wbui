<template>
  <v-text-field
    v-model="phone"
    v-maskito="maskitoPhoneOptions"
    type="tel"
    :prefix="prefixEmoji"
    :prepend-inner-icon="prependInnerIconFallback"
  >
    <template v-if="prependFlag && numberCountry" #prepend-inner>
      <FlagIcon v-if="flag === 'svg'" :country="numberCountry" />
      <span v-else-if="flag === 'emoji'" class="w-6 text-center">{{ getEmojiFlag(numberCountry) }}</span>
    </template>
  </v-text-field>
</template>

<script setup lang="ts">
import { maskito as vMaskito } from "@maskito/vue";
import { maskitoPhoneOptionsGenerator, maskitoGetCountryFromNumber } from "@maskito/phone";
import metadata from "libphonenumber-js/min/metadata";
import type { CountryCode } from "libphonenumber-js";

import { getEmojiFlag, type TCountryCode } from "countries-list";
import type { VTextField } from "vuetify/components";

type Flag = "none" | "emoji" | "prefix" | "svg";

const phone = defineModel<string>();

const props = withDefaults(
  defineProps<{
    country?: TCountryCode;
    strict?: boolean;
    separator?: string;
    flag?: Flag;
    prependInnerIcon?: VTextField["prependInnerIcon"];
  }>(),
  {
    country: undefined,
    strict: false,
    separator: "-",
    flag: "svg",
    prependInnerIcon: undefined,
  },
);

const maskitoPhoneOptions = computed(() =>
  maskitoPhoneOptionsGenerator({
    metadata,
    countryIsoCode: props.country as CountryCode | undefined,
    strict: props.strict,
    separator: props.separator,
  }),
);

const numberCountry = computed(() =>
  phone.value ? (maskitoGetCountryFromNumber(phone.value, metadata) as TCountryCode | undefined) : undefined,
);

const prependFlag = computed(() => props.flag === "svg" || props.flag === "emoji");

const prefixEmoji = computed(() =>
  props.flag === "prefix" && numberCountry.value ? getEmojiFlag(numberCountry.value) : undefined,
);

const prependInnerIconFallback = computed(() =>
  prependFlag.value && numberCountry.value ? undefined : props.prependInnerIcon,
);
</script>
