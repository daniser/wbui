<template>
  <v-main>
    <v-form class="h-screen flex items-center" @submit.prevent="onSubmit">
      <v-container>
        <v-row>
          <v-col cols="2">
            <v-btn-toggle mandatory divided variant="outlined">
              <v-btn icon="mdi-face-man" value="male" :title="$t('male')" />
              <v-btn icon="mdi-face-woman" value="female" :title="$t('female')" />
            </v-btn-toggle>
          </v-col>
          <v-col>
            <v-text-field :label="$t('last_name')" :placeholder="$t('last_name_placeholder')" />
          </v-col>
          <v-col>
            <v-text-field :label="$t('first_name')" :placeholder="$t('first_name_placeholder')" />
          </v-col>
          <v-col>
            <v-text-field :label="$t('middle_name')" :placeholder="$t('middle_name_placeholder')" />
          </v-col>
          <v-col>
            <v-text-field type="date" :label="$t('date_of_birth')" />
          </v-col>
        </v-row>
        <v-row>
          <v-col>
            <CountrySelect
              v-model="fields.citizenship"
              :label="$t('citizenship')"
              :preferred="preferredCountries"
              :excluded="excludedCountries"
              prepend-inner-icon="mdi-passport"
            />
          </v-col>
          <v-col>
            <v-select :label="$t('document_type')" prepend-inner-icon="mdi-passport-biometric" />
          </v-col>
          <v-col>
            <v-text-field :label="$t('document_number')" prepend-inner-icon="mdi-pound" />
          </v-col>
        </v-row>
        <v-row>
          <v-col>
            <PhoneField
              v-model="fields.phone"
              :country="fields.citizenship"
              :strict="strict"
              :label="$t('phone_number')"
              :placeholder="$t('phone_number_placeholder')"
              prepend-inner-icon="mdi-phone"
              @keydown.delete="strict = false"
            />
          </v-col>
          <v-col>
            <v-text-field
              type="email"
              :label="$t('email')"
              :placeholder="$t('email_placeholder')"
              prepend-inner-icon="mdi-at"
            />
          </v-col>
          <v-col />
        </v-row>
      </v-container>
    </v-form>
  </v-main>
</template>

<script setup lang="ts">
import type { TCountryCode } from "countries-list";

const { t } = useI18n();

const config = useRuntimeConfig();

const preferredCountries = t("preferred_countries")
  .split(",")
  .filter((x) => x) as TCountryCode[];

const excludedCountries: TCountryCode[] = t("excluded_countries")
  .split(",")
  .filter((x) => x) as TCountryCode[];

const fields = reactive<{ citizenship?: TCountryCode; phone: string }>({
  citizenship: undefined,
  phone: "",
});

const strict = ref(false);

watch(
  () => fields.citizenship,
  (citizenship) => (strict.value = !!citizenship),
);

const onSubmit = async () => {
  const { data } = await useFetch<{ session_id: string }>(`${config.public.apiBase}/book`, {
    method: "post",
    body: new URLSearchParams(fields),
  });

  await navigateTo(`/search/${data.value?.session_id}`);
};
</script>
