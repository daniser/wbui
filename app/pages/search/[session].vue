<template>
  <v-main v-if="result">
    <Head>
      <Title>{{ $t("select_flight") }}</Title>
    </Head>
    <div v-for="(message, index) in result.messages" :key="index">{{ message.message }}</div>
    <v-expansion-panels variant="accordion" multiple>
      <v-expansion-panel v-for="(flightGroup, flightGroupId) in result.flightGroups" :key="flightGroup.token">
        <v-expansion-panel-title>
          <v-row no-gutters>
            <v-col>
              <div v-for="(itinerary, index) in flightGroup.itineraries" :key="index">
                {{ itinerary.flights[0].segments[0].dateBegin }}
              </div>
            </v-col>
            <v-col>
              <div v-for="(itinerary, index) in flightGroup.itineraries" :key="index">
                {{ itinerary.flights[0].segments.at(-1)!.dateEnd }}
              </div>
            </v-col>
            <v-col>
              <img
                class="max-h-10 max-w-40 mx-auto"
                :src="`/airlines/${flightGroup.carrier.code}.svg`"
                :alt="flightGroup.carrier.name"
              />
            </v-col>
            <!--<v-col>
              <div>{{ flightGroup.carrier.name }}</div>
              <div class="text-medium-emphasis">{{ flightGroup.provider }} {{ flightGroup.gds }}</div>
            </v-col>-->
            <v-col>
              <div v-for="(itinerary, index) in flightGroup.itineraries" :key="index">
                {{ itinerary.flights[0].segments[0].locationBegin.code }}-{{
                  itinerary.flights[0].segments.at(-1)!.locationEnd.code
                }}
                {{ itinerary.flights[0].segments[0].carrier.code }}-{{ itinerary.flights[0].segments[0].flightNumber }}
              </div>
            </v-col>
            <v-col>
              <div v-for="(itinerary, index) in flightGroup.itineraries" :key="index">
                {{ itinerary.flights[0].travelDuration }}
              </div>
            </v-col>
            <v-col>0.02</v-col>
            <v-col>0</v-col>
            <v-col>{{ flightGroup.fares.fareTotal }} ₽</v-col>
            <v-col>
              <v-btn color="primary" @click.stop="onSelect(flightGroupId)">{{ $t("select") }}</v-btn>
            </v-col>
          </v-row>
        </v-expansion-panel-title>
        <v-expansion-panel-text>
          <v-card>
            <v-expansion-panels variant="accordion" multiple>
              <v-expansion-panel v-for="(itinerary, index) in flightGroup.itineraries" :key="index" :value="true">
                <v-expansion-panel-title>
                  {{ itinerary.flights[0].segments[0].cityBegin.name }} ({{
                    itinerary.flights[0].segments[0].locationBegin.name
                  }}) - {{ itinerary.flights[0].segments.at(-1)!.cityEnd.name }} ({{
                    itinerary.flights[0].segments.at(-1)!.locationEnd.name
                  }})
                </v-expansion-panel-title>
                <v-expansion-panel-text>
                  <v-list>
                    <v-list-item v-for="segment in itinerary.flights[0].segments" :key="segment.token">
                      <v-row no-gutters>
                        <v-col>
                          <div>{{ segment.locationBegin.name }} ({{ segment.locationBegin.code }})</div>
                          <div>{{ segment.cityBegin.name }}, {{ segment.countryBegin.name }}</div>
                          <div>{{ segment.dateBegin }}</div>
                        </v-col>
                        <v-col>
                          <div>{{ segment.carrier.code }}-{{ segment.flightNumber }}</div>
                          <div>{{ segment.travelDuration }}</div>
                          <div>{{ segment.equipment.code }}</div>
                        </v-col>
                        <v-col>
                          <div>{{ segment.locationEnd.name }} ({{ segment.locationEnd.code }})</div>
                          <div>{{ segment.cityEnd.name }}, {{ segment.countryEnd.name }}</div>
                          <div>{{ segment.dateEnd }}</div>
                        </v-col>
                        <v-col>
                          <div>{{ $t("booking_class") }}</div>
                          <div>{{ segment.bookingClass }}</div>
                          <div>{{ segment.serviceClass }} ({{ segment.bookingClass }})</div>
                          <div>{{ segment.baggage.value }}</div>
                        </v-col>
                        <v-col>
                          <div>{{ $t("fare_basis") }}</div>
                          <div>{{ segment.fareBasis }}</div>
                        </v-col>
                      </v-row>
                    </v-list-item>
                  </v-list>
                </v-expansion-panel-text>
              </v-expansion-panel>
            </v-expansion-panels>
          </v-card>
        </v-expansion-panel-text>
      </v-expansion-panel>
    </v-expansion-panels>
  </v-main>
</template>

<script setup lang="ts">
import { useNuxtApp } from "#app";
import type { SearchResult } from "~/types";

const { $api } = useNuxtApp();
const route = useRoute();

const { data: result } = useApi<SearchResult>(`booking/search/${route.params.session}`);

const onSelect = async (fligntGroupId: number) => {
  await $api(`booking/select/${route.params.session}`, {
    method: "post",
    body: new URLSearchParams({ flightGroupId: fligntGroupId.toString() }),
  });
};
</script>
