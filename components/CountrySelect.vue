<template>
  <v-autocomplete
    v-model="country"
    :items="countryList"
    :item-title="itemTitle"
    item-value="iso2"
    :prefix="prefixEmoji"
  >
    <template v-if="flag === 'svg'" #prepend-inner>
      <span v-if="country" :class="`fi fi-${country.toLowerCase()}`" />
    </template>
    <template v-else-if="flag === 'emoji'" #prepend-inner>{{ emoji }}</template>
    <template #item="{ props: itemProps, item }">
      <v-list-item
        v-bind="itemProps"
        :title="getItemTitle(item.raw)"
        :subtitle="getItemSubtitle(item.raw)"
        :value="item.raw.iso2"
      >
        <template v-if="flag === 'svg'" #prepend><span :class="`fi fi-${item.raw.iso2.toLowerCase()}`" /></template>
        <template v-else-if="flag !== 'none'" #prepend>{{ getEmojiFlag(item.raw.iso2) }}</template>
      </v-list-item>
    </template>
  </v-autocomplete>
</template>

<script setup lang="ts">
import type { ICountry, TCountryCode } from "countries-list";
import { getEmojiFlag } from "countries-list";
import { getLocalizedCountryDataList } from "~/utils/getCountryDataList";
import "/node_modules/flag-icons/css/flag-icons.min.css";

type Flag = "none" | "emoji" | "prefix" | "svg";
type Presentation = "name" | "native" | "name-first" | "native-first";

const country = defineModel<TCountryCode>();

const props = withDefaults(
  defineProps<{
    flag?: Flag;
    presentation?: Presentation;
  }>(),
  {
    flag: "svg",
    presentation: "name-first",
  },
);

const countryList = await getLocalizedCountryDataList("ru");

const emoji = computed(() => (country.value ? getEmojiFlag(country.value) : undefined));

const prefixEmoji = computed(() => (props.flag === "prefix" ? emoji.value : undefined));

const itemTitle = computed(() => {
  if (props.presentation === "name" || props.presentation === "name-first") {
    return "name";
  } else {
    return "native";
  }
});

function getItemTitle(country: ICountry) {
  if (props.presentation === "name" || props.presentation === "name-first") {
    return country.name;
  } else {
    return country.native;
  }
}

function getItemSubtitle(country: ICountry) {
  if (props.presentation === "name-first") {
    return country.native;
  } else if (props.presentation === "native-first") {
    return country.name;
  }
}
</script>
