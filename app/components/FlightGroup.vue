<template>
  <v-card class="ma-5 max-w-[1000px]">
    <v-card-text>
      <v-container fluid>
        <v-row class="align-center">
          <v-col cols="9" class="py-0">
            <template v-for="(itinerary, index) in flightGroup.itineraries" :key="index">
              <Itinerary :itinerary="itinerary" />
              <v-divider v-if="index < flightGroup.itineraries.length - 1" :thickness="2" class="border-opacity-100" />
            </template>
          </v-col>
          <v-divider vertical :thickness="2" class="border-opacity-100" />
          <v-col>
            <v-sheet class="px-2 mx-2">
              <v-row>
                <v-col cols="12" class="text-2xl font-bold">
                  <MoneyAmount :amount="fareTotal.amount" :currency="fareTotal.currency" compact />
                </v-col>
                <v-col cols="12">
                  <v-btn block color="success">{{ $t("buy") }}</v-btn>
                </v-col>
              </v-row>
            </v-sheet>
          </v-col>
        </v-row>
      </v-container>
    </v-card-text>
  </v-card>
</template>

<script setup lang="ts">
import type { FlightGroup } from "~/types";
import Itinerary from "~/components/Itinerary.vue";

const props = defineProps<{ flightGroup: FlightGroup }>();

const fareTotal = computed(() => ({
  amount: props.flightGroup.fares.fareTotalOriginal.amount || props.flightGroup.fares.fareTotal,
  currency: props.flightGroup.fares.fareTotalOriginal.currency || "RUB",
}));
</script>
