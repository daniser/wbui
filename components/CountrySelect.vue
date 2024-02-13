<template>
  <v-autocomplete
    v-model="country"
    :items="countryList"
    :item-title="itemTitle"
    item-value="iso2"
    :prefix="prefixEmoji"
    auto-select-first
    spellcheck="false"
  >
    <template v-if="flag === 'svg'" #prepend-inner>
      <span v-if="country" :class="`fi fi-${country.toLowerCase()}`" />
    </template>
    <template v-else-if="flag === 'emoji'" #prepend-inner>
      <span v-if="emoji" class="w-6 text-center">{{ emoji }}</span>
    </template>
    <template #item="{ props: itemProps, item }">
      <v-list-item
        v-bind="itemProps"
        :title="getItemTitle(item.raw)"
        :subtitle="getItemSubtitle(item.raw)"
        :value="item.raw.iso2"
      >
        <template v-if="flag === 'svg'" #prepend>
          <span :class="`-ml-1 mr-1.5 fi fi-${item.raw.iso2.toLowerCase()}`" />
        </template>
        <template v-else-if="flag !== 'none'" #prepend>
          <span v-if="flag === 'emoji'" class="-ml-1 mr-1.5 w-6 text-center">{{ getEmojiFlag(item.raw.iso2) }}</span>
          <span v-else class="-ml-1 mr-0.5 w-6 text-center">{{ getEmojiFlag(item.raw.iso2) }}</span>
        </template>
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
    favorite?: TCountryCode[];
  }>(),
  {
    flag: "svg",
    presentation: "name-first",
    favorite: () => [],
  },
);

const emoji = computed(() => (country.value ? getEmojiFlag(country.value) : undefined));

const prefixEmoji = computed(() => (props.flag === "prefix" ? emoji.value : undefined));

const itemTitle = computed(() => (props.presentation.startsWith("name") ? "name" : "native"));

const countryList = await getLocalizedCountryDataList("ru");
countryList.sort((a, b) => {
  const aidx = props.favorite.indexOf(a.iso2);
  const bidx = props.favorite.indexOf(b.iso2);

  if (aidx !== -1 && bidx !== -1) {
    return aidx - bidx; // both items in favorite list
  } else if (aidx !== -1 || bidx !== -1) {
    return +(aidx === -1) - +(bidx === -1); // one of the items in favorite list
  }

  return a[itemTitle.value].localeCompare(b[itemTitle.value]);
});

function getItemTitle(country: ICountry) {
  return props.presentation.startsWith("name") ? country.name : country.native;
}

function getItemSubtitle(country: ICountry) {
  if (props.presentation.endsWith("first")) {
    return props.presentation.startsWith("name") ? country.native : country.name;
  }
}
</script>
