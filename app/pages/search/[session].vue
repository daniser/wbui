<template>
  <v-main v-if="result">
    <Head>
      <Title>{{ $t("select_flight") }}</Title>
    </Head>
    <MessageList :messages="result.messages" class="mx-auto" />
    <template v-for="(flightGroup, flightGroupId) in result.flightGroups" :key="flightGroup.token">
      <FlightGroup :flight-group="flightGroup" class="mx-auto" />
    </template>
  </v-main>
</template>

<script setup lang="ts">
import { useNuxtApp } from "#app";
import type { SearchResult } from "~/types";

const { $api } = useNuxtApp();
const route = useRoute();

const { data: result } = useApi<SearchResult>(`booking/search/${route.params.session}`);

const onSelect = async (flightGroupId: number) => {
  await $api(`booking/select/${route.params.session}`, {
    method: "post",
    body: new URLSearchParams({ flightGroupId: flightGroupId.toString() }),
  });
};
</script>
