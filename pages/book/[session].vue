<template>
  <v-main>
    <v-form class="h-screen flex items-center" @submit.prevent="onSubmit">
      <v-container>
        <v-row>
          <v-col cols="2" align="center">
            <v-btn-toggle mandatory divided variant="outlined">
              <v-btn icon="mdi-face-man" value="male" />
              <v-btn icon="mdi-face-woman" value="female" />
            </v-btn-toggle>
          </v-col>
          <v-col>
            <v-text-field label="Фамилия" placeholder="Иванов" />
          </v-col>
          <v-col>
            <v-text-field label="Имя" placeholder="Иван" />
          </v-col>
          <v-col>
            <v-text-field label="Отчество" placeholder="Иванович" />
          </v-col>
          <v-col>
            <v-text-field type="date" label="Дата рождения" />
          </v-col>
        </v-row>
        <v-row>
          <v-col>
            <CountrySelect v-model="fields.citizenship" label="Гражданство" presentation="name-first" />
          </v-col>
          <v-col>
            <v-select label="Тип документа" />
          </v-col>
          <v-col>
            <v-text-field label="Номер документа" />
          </v-col>
        </v-row>
        <v-row>
          <v-col>
            <v-text-field v-maskito="maskitoPhoneOptions" type="tel" label="Телефон" placeholder="+7 900 123-45-67" />
          </v-col>
          <v-col>
            <v-text-field type="email" label="E-mail" placeholder="i.ivanov@mail.ru" />
          </v-col>
        </v-row>
      </v-container>
    </v-form>
  </v-main>
</template>

<script setup lang="ts">
import type { TCountryCode } from "countries-list";

import { maskito as vMaskito } from "@maskito/vue";
import { maskitoPhoneOptionsGenerator } from "@maskito/phone";
import metadata from "libphonenumber-js/min/metadata";

const config = useRuntimeConfig();

const maskitoPhoneOptions = maskitoPhoneOptionsGenerator({
  metadata,
  strict: false,
  countryIsoCode: "RU",
});

const fields = reactive<{ citizenship: TCountryCode }>({
  citizenship: "RU",
});

const onSubmit = async () => {
  const { data } = await useFetch<{ session_id: string }>(`${config.public.apiBase}/book`, {
    method: "post",
    body: new URLSearchParams(fields),
  });

  await navigateTo(`/search/${data.value?.session_id}`);
};
</script>
