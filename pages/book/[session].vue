<template>
  <v-main>
    <v-form class="h-screen flex items-center" @submit.prevent="onSubmit">
      <v-container>
        <v-row>
          <v-col cols="2">
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
            <CountrySelect
              v-model="fields.citizenship"
              label="Гражданство"
              :favorite="favoriteCountries"
              prepend-inner-icon="mdi-passport"
            />
          </v-col>
          <v-col>
            <v-select label="Тип документа" prepend-inner-icon="mdi-passport-biometric" />
          </v-col>
          <v-col>
            <v-text-field label="Номер документа" />
          </v-col>
        </v-row>
        <v-row>
          <v-col>
            <PhoneField
              v-model="fields.phone"
              :country="fields.citizenship"
              label="Телефон"
              placeholder="+7 900 123-45-67"
              prepend-inner-icon="mdi-phone"
            />
          </v-col>
          <v-col>
            <v-text-field type="email" label="E-mail" placeholder="i.ivanov@mail.ru" prepend-inner-icon="mdi-at" />
          </v-col>
          <v-col />
        </v-row>
      </v-container>
    </v-form>
  </v-main>
</template>

<script setup lang="ts">
import type { TCountryCode } from "countries-list";

const config = useRuntimeConfig();

const favoriteCountries: TCountryCode[] = [
  "RU",
  "AZ",
  "AM",
  "BY",
  "GE",
  "KZ",
  "KG",
  "LV",
  "LT",
  "MD",
  "TJ",
  "TM",
  "UZ",
  "UA",
  "EE",
];

const fields = reactive<{ citizenship?: TCountryCode; phone: string }>({
  citizenship: undefined,
  phone: "",
});

const onSubmit = async () => {
  const { data } = await useFetch<{ session_id: string }>(`${config.public.apiBase}/book`, {
    method: "post",
    body: new URLSearchParams(fields),
  });

  await navigateTo(`/search/${data.value?.session_id}`);
};
</script>
