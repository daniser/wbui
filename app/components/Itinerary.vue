<template>
  <v-sheet class="py-2 my-2">
    <v-row>
      <v-col cols="3">
        <div class="text-xl font-semibold">{{ $d(firstSegment.dateBegin, "time") }}</div>
        <div>{{ $d(firstSegment.dateBegin, "dayMonth") }}</div>
        <div>{{ firstSegment.locationBegin.name }} ({{ firstSegment.locationBegin.code }})</div>
      </v-col>
      <v-col cols="3" class="pa-0 align-self-center">
        <ItineraryTimeline class="h-7">
          <TimelineSegment :length="122" color="#74c6fa" tooltip="2ч 30м в пути" />
          <TimelineSegment :length="491" color="#d4d6dd" tooltip="Пересадка 10ч в Москве" title="MOW" />
          <TimelineSegment :length="385" color="#203484" tooltip="7ч 50м в пути" />
        </ItineraryTimeline>
      </v-col>
      <v-col cols="3">
        <div class="text-xl font-semibold">{{ $d(lastSegment.dateEnd, "time") }}</div>
        <div>{{ $d(lastSegment.dateEnd, "dayMonth") }}</div>
        <div>{{ lastSegment.locationEnd.name }} ({{ lastSegment.locationEnd.code }})</div>
      </v-col>
      <v-col cols="3">
        <div class="text-xl font-semibold">
          <HumanizedDuration :duration="itinerary.flights[0].travelDuration! * 60000" />
        </div>
        <div>1 пересадка, 10ч</div>
      </v-col>
    </v-row>
  </v-sheet>
</template>

<script setup lang="ts">
import type { Itinerary } from "~/types";

const props = defineProps<{ itinerary: Itinerary }>();

const firstSegment = computed(() => props.itinerary.flights[0].segments[0]);
const lastSegment = computed(() => props.itinerary.flights[0].segments.at(-1)!);
</script>
