<template>
  <v-main>
    <Head>
      <Title>{{ $t("search_flights") }}</Title>
    </Head>
    <v-form class="h-[calc(100vh-100px)] flex items-center" @submit.prevent="onSubmit">
      <v-container>
        <v-row>
          <v-col cols="6" class="flex">
            <ApiAutocomplete
              v-model="fields.from"
              :label="$t('from')"
              source="airports"
              prepend-inner-icon="mdi-airplane-takeoff"
              class="!flex-1"
            />
            <v-btn
              icon="mdi-swap-horizontal"
              variant="plain"
              tabindex="-1"
              class="-mx-2 my-1"
              @click="[fields.from, fields.to] = [fields.to, fields.from]"
            />
            <ApiAutocomplete
              v-model="fields.to"
              :label="$t('to')"
              source="airports"
              prepend-inner-icon="mdi-airplane-landing"
              class="!flex-1"
            />
          </v-col>
          <v-col>
            <v-date-input
              v-model="fields.date"
              :label="$t('date')"
              prepend-icon=""
              prepend-inner-icon="$calendar"
              placeholder=""
              show-adjacent-months
              hide-actions
            />
          </v-col>
          <v-col>
            <PassengerTypeSelect plural />
          </v-col>
          <v-col>
            <v-btn type="submit" size="x-large" color="primary">{{ $t("search") }}</v-btn>
          </v-col>
        </v-row>
      </v-container>
    </v-form>
  </v-main>
</template>

<script setup lang="ts">
import dayjs from "dayjs";
import { useNuxtApp } from "#app";

const { $api } = useNuxtApp();

const fields = reactive<{
  from?: string;
  to?: string;
  date?: Date;
}>({});

const formattedDate = computed(() => fields.date && dayjs(fields.date).format("YYYY-MM-DD"));

const onSubmit = async () => {
  const result = await $api<{ session_id: string }>("booking/search", {
    method: "post",
    body: new URLSearchParams({
      from: fields.from ?? "",
      to: fields.to ?? "",
      date: formattedDate.value ?? "",
    }),
  });

  await navigateTo(`/search/${result.session_id}`);
};
</script>
