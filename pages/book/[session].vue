<template>
  <v-main>
    <Head>
      <Title>{{ $t("book_flight") }}</Title>
    </Head>
    <v-form class="h-screen flex items-center" @submit.prevent="onSubmit">
      <v-container>
        <v-row>
          <v-col cols="2">
            <v-btn-toggle v-model="fields.gender" mandatory divided variant="outlined">
              <v-btn icon="mdi-gender-male" color="blue" value="MALE" :title="$t('male')" />
              <v-btn icon="mdi-gender-female" color="pink" value="FEMALE" :title="$t('female')" />
            </v-btn-toggle>
          </v-col>
          <v-col><v-text-field :label="$t('last_name')" :placeholder="lastNamePlaceholder" /></v-col>
          <v-col><v-text-field :label="$t('first_name')" :placeholder="firstNamePlaceholder" /></v-col>
          <v-col><v-text-field :label="$t('middle_name')" :placeholder="middleNamePlaceholder" /></v-col>
          <v-col>
            <v-date-input
              :label="$t('date_of_birth')"
              prepend-icon=""
              prepend-inner-icon="$calendar"
              placeholder=""
              show-adjacent-months
              hide-actions
            />
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
            <DocumentTypeSelect
              v-model="fields.document_type"
              :label="$t('document_type')"
              prepend-inner-icon="mdi-passport-biometric"
            />
          </v-col>
          <v-col>
            <DocumentNumberField
              :type="fields.document_type"
              :disabled="!fields.document_type"
              :label="$t('document_number')"
              prepend-inner-icon="mdi-pound"
            />
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
              :placeholder="emailPlaceholder"
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
import type { DocumentType, Gender } from "~/types";
import { useNuxtApp } from "#app";
import DocumentTypeSelect from "~/components/DocumentTypeSelect.vue";

const { $api } = useNuxtApp();
const { t } = useI18n();

const lastNamePlaceholder = computed(() =>
  fields.gender !== "FEMALE" ? t("last_name_placeholder") : t("last_name_placeholder_female"),
);

const firstNamePlaceholder = computed(() =>
  fields.gender !== "FEMALE" ? t("first_name_placeholder") : t("first_name_placeholder_female"),
);

const middleNamePlaceholder = computed(() =>
  fields.gender !== "FEMALE" ? t("middle_name_placeholder") : t("middle_name_placeholder_female"),
);

const emailPlaceholder = computed(() =>
  fields.gender !== "FEMALE" ? t("email_placeholder") : t("email_placeholder_female"),
);

const preferredCountries = t("preferred_countries")
  .split(",")
  .filter((x) => x) as TCountryCode[];

const excludedCountries: TCountryCode[] = t("excluded_countries")
  .split(",")
  .filter((x) => x) as TCountryCode[];

const fields = reactive<{
  gender?: Gender;
  citizenship?: TCountryCode;
  document_type?: DocumentType;
  phone?: string;
}>({});

const strict = ref(false);

watch(
  () => fields.citizenship,
  (citizenship) => (strict.value = !!citizenship),
);

const onSubmit = async () => {
  const result = await $api<{ session_id: string }>("booking/book", {
    method: "post",
    body: new URLSearchParams(fields),
  });

  await navigateTo(`/search/${result.session_id}`);
};
</script>
