<template>
  <v-autocomplete
    v-model="model"
    v-debounce:500ms="onSearch"
    :items="items"
    :suffix="model"
    menu-icon=""
    no-filter
    hide-no-data
    hide-selected
    auto-select-first
  >
    <template #item="{ props: itemProps, item }">
      <v-list-item v-bind="itemProps" :title="item.raw.title" :subtitle="item.raw.subtitle">
        <template #append>{{ item.raw.value }}</template>
      </v-list-item>
    </template>
  </v-autocomplete>
</template>

<script setup lang="ts">
import vueDebounce from "vue-debounce";
import type { Prompt } from "~/types";

const vDebounce = vueDebounce({ lock: true });

const model = defineModel<string>();

const props = defineProps<{ source: string }>();

const items = ref<Prompt[]>([]);

const { $api } = useNuxtApp();

const onSearch = async (search: string) => {
  items.value = search.length < 2 ? [] : await $api(`booking/${props.source}/${search}`);
};
</script>
