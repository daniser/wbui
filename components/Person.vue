<template>
  <v-confirm-edit v-model="person">
    <template #default="{ model: proxyModel, actions }">
      <v-card variant="tonal">
        <v-card-text>
          <v-container fluid>
            <v-row>
              <v-col cols="1">
                <v-btn-toggle v-model="proxyModel.value.gender" mandatory divided variant="tonal" :density="density">
                  <v-btn icon="mdi-face-man" value="MALE" :title="$t('male')" />
                  <v-btn icon="mdi-face-woman" value="FEMALE" :title="$t('female')" />
                </v-btn-toggle>
              </v-col>
              <v-col><v-text-field v-bind="props" v-model="proxyModel.value.name" /></v-col>
              <v-col cols="2">
                <v-date-input
                  v-bind="props"
                  v-model="proxyModel.value.birth_date"
                  :label="$t('date_of_birth')"
                  prepend-icon=""
                  placeholder=""
                  show-adjacent-months
                  hide-actions
                />
              </v-col>
            </v-row>
            <v-row v-for="document in proxyModel.value.documents" :key="document.id">
              <v-col>
                <CountrySelect
                  v-bind="props"
                  v-model="document.issued_by"
                  :label="$t('citizenship')"
                  flag="none"
                  presentation="name"
                />
              </v-col>
              <v-col><v-text-field v-bind="props" v-model="document.number" :label="$t('document_number')" /></v-col>
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
        </v-card-text>
        <v-card-actions>
          <component :is="actions" />
        </v-card-actions>
      </v-card>
    </template>
  </v-confirm-edit>
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
