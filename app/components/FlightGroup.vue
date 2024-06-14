<template>
  <v-card class="ma-5 max-w-[1000px]">
    <v-card-text>
      <v-container fluid>
        <v-row class="align-center">
          <v-col cols="9" class="py-0">
            <v-sheet class="py-2 my-2">
              <v-row>
                <v-col cols="3">
                  <div class="text-xl font-semibold">09:55</div>
                  <div>24 августа</div>
                  <div>Храброво (KGD)</div>
                </v-col>
                <v-col cols="3" class="pa-0 align-self-center">
                  <!--<v-range-slider color="primary" />-->
                  <ItineraryTimeline class="h-7">
                    <TimelineSegment :length="122" color="#74c6fa" tooltip="2ч 30м в пути" />
                    <TimelineSegment :length="491" color="#d4d6dd" tooltip="Пересадка 10ч в Москве" title="MOW" />
                    <TimelineSegment :length="385" color="#203484" tooltip="7ч 50м в пути" />
                  </ItineraryTimeline>
                </v-col>
                <v-col cols="3">
                  <div class="text-xl font-semibold">14:15</div>
                  <div>25 августа</div>
                  <div>Новый (KHV)</div>
                </v-col>
                <v-col cols="3">
                  <div class="text-xl font-semibold">20ч 20м</div>
                  <div>1 пересадка, 10ч</div>
                </v-col>
              </v-row>
            </v-sheet>
            <v-divider :thickness="2" class="border-opacity-100" />
            <v-sheet class="py-2 my-2">
              <v-row>
                <v-col cols="3">
                  <div class="text-xl font-semibold">15:45</div>
                  <div>31 августа</div>
                  <div>Новый (KHV)</div>
                </v-col>
                <v-col cols="3" class="pa-0 align-self-center">
                  <v-range-slider color="warning" />
                </v-col>
                <v-col cols="3">
                  <div class="text-xl font-semibold">09:30</div>
                  <div>1 сентября</div>
                  <div>Храброво (KGD)</div>
                </v-col>
                <v-col cols="3">
                  <div class="text-xl font-semibold">1д 1ч 45м</div>
                  <div>1 пересадка, 15ч 10м</div>
                </v-col>
              </v-row>
            </v-sheet>
          </v-col>
          <v-divider vertical :thickness="2" class="border-opacity-100" />
          <v-col>
            <v-sheet class="px-2 mx-2">
              <v-row>
                <v-col cols="12" class="text-2xl font-bold">52 330 ₽</v-col>
                <v-col cols="12"><v-btn block color="success">Купить</v-btn></v-col>
              </v-row>
            </v-sheet>
          </v-col>
        </v-row>
      </v-container>
    </v-card-text>
  </v-card>
</template>
<script setup lang="ts"></script>
