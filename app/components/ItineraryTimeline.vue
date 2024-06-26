<template>
  <Timeline>
    <TimelineSegment v-for="(segment, index) in segments" :key="index" v-bind="segment">
      <template #tooltip>
        <HumanizedDuration
          v-if="!(index % 2)"
          :duration="itinerary.flights[0].segments[Math.floor(index / 2)]!.travelDuration * 60000"
        />
        <HumanizedDuration v-else :duration="segment.length * 60000" />
      </template>
    </TimelineSegment>
  </Timeline>
</template>

<script setup lang="ts">
import type { Itinerary } from "~/types";

const props = defineProps<{
  itinerary: Itinerary;
}>();

const points = ref<number[]>([]);

const segments = computed(() =>
  points.value
    .map((point, i, points) => ({
      length: i > 0 ? point - points[i - 1]! : 0,
      color: ["#d4d6dd", "#74c6fa"][i % 2]!,
    }))
    .slice(1),
);

onMounted(() => {
  for (const segment of props.itinerary.flights[0].segments) {
    points.value.push(new Date(segment.dateBegin).getTime() / 60000, new Date(segment.dateEnd).getTime() / 60000);
  }
});
</script>
