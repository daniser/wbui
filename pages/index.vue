<template>
  <v-main>
    <v-form @submit.prevent="onSubmit">
      <v-container>
        <v-row>
          <v-col><v-autocomplete v-model="fields.from" label="From" :items="locations" /></v-col>
          <v-col><v-autocomplete v-model="fields.to" label="To" :items="locations" /></v-col>
          <v-col>
            <v-text-field v-model="formattedDate" readonly label="Date">
              <v-overlay
                open-on-click
                close-on-content-click
                activator="parent"
                location-strategy="connected"
                location="bottom center"
                origin="auto"
              >
                <v-date-picker
                  v-model="dateTo"
                  landscape
                  show-adjacent-months
                  hide-header
                  color="primary"
                  elevation="12"
                />
              </v-overlay>
            </v-text-field>
          </v-col>
          <v-col><v-btn type="submit" size="x-large" color="primary">Search</v-btn></v-col>
        </v-row>
      </v-container>
    </v-form>
  </v-main>
</template>

<script setup lang="ts">
import { useDate } from "vuetify";

const date = useDate();
const config = useRuntimeConfig();

const locations = ["MOW", "LED", "KGD"];

const dateTo = ref();

const formattedDate = computed(() => date.format(dateTo.value, "keyboardDate"));

const fields = reactive({
  from: "",
  to: "",
  date: formattedDate.value,
});

const onSubmit = async () => {
  const { data } = await useFetch<{ session_id: string }>(`${config.public.apiBase}/search`, {
    method: "post",
    body: new URLSearchParams(fields),
  });

  await navigateTo(`/search/${data.value?.session_id}`);
};
</script>
