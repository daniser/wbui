<template>
  <v-container fluid>
    <v-row>
      <v-col cols="1">
        <v-btn-toggle v-model="person.gender" mandatory divided variant="tonal" :density="density">
          <v-btn icon="mdi-gender-male" color="blue" value="MALE" :title="$t('male')" />
          <v-btn icon="mdi-gender-female" color="pink" value="FEMALE" :title="$t('female')" />
        </v-btn-toggle>
      </v-col>
      <v-col><v-text-field v-bind="props" v-model="person.name" /></v-col>
      <v-col cols="2">
        <v-date-input
          v-bind="props"
          v-model="person.birth_date"
          :label="$t('date_of_birth')"
          prepend-icon=""
          placeholder=""
          show-adjacent-months
          hide-actions
        />
      </v-col>
    </v-row>
    <v-row v-for="document in person.documents" :key="document.id">
      <v-col>
        <CountrySelect
          v-bind="props"
          v-model="document.issued_by"
          :label="$t('citizenship')"
          flag="none"
          presentation="name"
        />
      </v-col>
      <v-col>
        <DocumentTypeSelect v-bind="props" v-model="document.type" :label="$t('document_type')" />
      </v-col>
      <v-col>
        <DocumentNumberField
          v-bind="props"
          v-model="document.number"
          :type="document.type"
          :disabled="!document.type"
          :label="$t('document_number')"
        />
      </v-col>
      <v-col>
        <v-text-field
          v-bind="props"
          v-model="document.first_name"
          :label="$t('first_name')"
          :placeholder="firstNamePlaceholder"
        />
      </v-col>
      <v-col>
        <v-text-field
          v-bind="props"
          v-model="document.last_name"
          :label="$t('last_name')"
          :placeholder="lastNamePlaceholder"
        />
      </v-col>
      <v-col>
        <v-text-field
          v-bind="props"
          v-model="document.middle_name"
          :label="$t('middle_name')"
          :placeholder="middleNamePlaceholder"
        />
      </v-col>
      <v-col>
        <v-date-input
          v-bind="props"
          v-model="document.issue_date"
          :label="$t('issue_date')"
          prepend-icon=""
          placeholder=""
          show-adjacent-months
          hide-actions
        />
      </v-col>
      <v-col>
        <v-date-input
          v-bind="props"
          v-model="document.expiry_date"
          :label="$t('expiry_date')"
          prepend-icon=""
          placeholder=""
          show-adjacent-months
          hide-actions
        />
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup lang="ts">
import type Person from "~/models/Person";

const person = defineModel<Person>({ required: true });

const props = defineProps<{
  variant?: "underlined" | "filled" | "outlined" | "plain" | "solo" | "solo-inverted" | "solo-filled";
  density?: "default" | "comfortable" | "compact";
}>();

const { t } = useI18n();

const lastNamePlaceholder = computed(() =>
  person.value.gender !== "FEMALE" ? t("last_name_placeholder") : t("last_name_placeholder_female"),
);

const firstNamePlaceholder = computed(() =>
  person.value.gender !== "FEMALE" ? t("first_name_placeholder") : t("first_name_placeholder_female"),
);

const middleNamePlaceholder = computed(() =>
  person.value.gender !== "FEMALE" ? t("middle_name_placeholder") : t("middle_name_placeholder_female"),
);
</script>
