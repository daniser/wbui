<template>
  <v-select :items="items" />
</template>

<script setup lang="ts">
const { t } = useI18n();

const items = [
  { title: t("document.internal"), value: "INTERNAL" },
  { title: t("document.foreign"), value: "FOREIGN" },
  { title: t("document.passport"), value: "PASSPORT" },
  { title: t("document.birth_certificate"), value: "BIRTHDAY_NOTIFICATION" },
  { title: t("document.officer_id"), value: "OFFICERID" },
  { title: t("document.military_id"), value: "MILITARYID" },
  { title: t("document.seamans_id"), value: "SEAMANSID" },
  { title: t("document.return_id"), value: "RETURNID" },
];
</script>
