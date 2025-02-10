<template>
  <v-autocomplete
    v-model="country"
    :items="countryList"
    :item-title="itemTitle"
    item-value="iso2"
    :prefix="prefixEmoji"
    :prepend-inner-icon="prependInnerIconFallback"
    auto-select-first
    spellcheck="false"
  >
    <template v-if="prependFlag && country" #prepend-inner>
      <FlagIcon v-if="flag === 'svg'" :country="country" />
      <span v-else-if="flag === 'emoji'" class="w-6 text-center">{{ getEmojiFlag(country) }}</span>
    </template>
    <template #item="{ props: itemProps, item }">
      <v-list-item
        class="compact"
        v-bind="itemProps"
        :title="getItemTitle(item.raw)"
        :subtitle="getItemSubtitle(item.raw)"
        :value="item.raw.iso2"
      >
        <template v-if="flag === 'svg'" #prepend>
          <FlagIcon :country="item.raw.iso2" class="-ml-1" />
        </template>
        <template v-else-if="flag !== 'none'" #prepend>
          <span v-if="flag === 'emoji'" class="mr-1.5 -ml-1 w-6 text-center">{{ getEmojiFlag(item.raw.iso2) }}</span>
          <span v-else class="mr-0.5 -ml-1 w-6 text-center">{{ getEmojiFlag(item.raw.iso2) }}</span>
        </template>
      </v-list-item>
    </template>
  </v-autocomplete>
</template>

<script setup lang="ts">
import type { ICountry, ICountryData, TCountryCode } from "countries-list";
import { getEmojiFlag } from "countries-list";
import { getLocalizedCountryDataList } from "~/utils/getCountryDataList";
import type { VAutocomplete } from "vuetify/components";

type Flag = "none" | "emoji" | "prefix" | "svg";
type Presentation = "name" | "native" | "name-first" | "native-first";

const country = defineModel<TCountryCode>();

const props = withDefaults(
  defineProps<{
    flag?: Flag;
    presentation?: Presentation;
    preferred?: TCountryCode[];
    excluded?: TCountryCode[];
    only?: TCountryCode[];
    prependInnerIcon?: VAutocomplete["prependInnerIcon"];
  }>(),
  {
    flag: "svg",
    presentation: "name-first",
    preferred: () => [],
    excluded: () => [],
    only: undefined,
    prependInnerIcon: undefined,
  },
);

const countryList = ref<ICountryData[]>([]);

const prependFlag = computed(() => props.flag === "svg" || props.flag === "emoji");

const prefixEmoji = computed(() =>
  props.flag === "prefix" && country.value ? getEmojiFlag(country.value) : undefined,
);

const prependInnerIconFallback = computed(() =>
  prependFlag.value && country.value ? undefined : props.prependInnerIcon,
);

const itemTitle = computed(() => (props.presentation.startsWith("name") ? "name" : "native"));

function getItemTitle(country: ICountry) {
  return props.presentation.startsWith("name") ? country.name : country.native;
}

function getItemSubtitle(country: ICountry) {
  if (props.presentation.endsWith("first")) {
    return props.presentation.startsWith("name") ? country.native : country.name;
  }
}

onBeforeMount(async () => {
  countryList.value = await getLocalizedCountryDataList();
  countryList.value = countryList.value
    .filter((countryData) => {
      return (!props.excluded.includes(countryData.iso2) && props.only?.includes(countryData.iso2)) ?? true;
    })
    .sort((a, b) => {
      const aidx = props.preferred.indexOf(a.iso2);
      const bidx = props.preferred.indexOf(b.iso2);

      if (aidx !== -1 && bidx !== -1) {
        return aidx - bidx; // both items in preferred list
      } else if (aidx !== -1 || bidx !== -1) {
        return +(aidx === -1) - +(bidx === -1); // one of the items in preferred list
      }

      return a[itemTitle.value].localeCompare(b[itemTitle.value]);
    });
});
</script>

<style scoped>
.compact :deep(.v-icon + .v-list-item__spacer) {
  width: 6px;
}
</style>
