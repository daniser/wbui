<template>
  <v-select :items="items" item-props />
</template>

<script setup lang="ts">
const { t } = useI18n();

const props = defineProps<{
  plural?: boolean;
}>();

const item = (key: string) => ({
  title: t(`passenger.${key}.title`, props.plural ? 2 : 1),
  subtitle: t(`passenger.${key}.subtitle`),
});

const items = [
  { ...item("adult"), value: "ADULT" },
  { ...item("child"), value: "CHILD" },
  { ...item("infant"), value: "INFANT" },
  { ...item("youth"), value: "YOUTH" },
  { ...item("senior"), value: "SENIOR" },
  { ...item("infant_with_seat"), value: "WSEATINFANT" },
  { ...item("disabled"), value: "DISABLED" },
  { ...item("disabled_child"), value: "DISABLEDCHILD" },
  { ...item("escort"), value: "ESCORT" },
  { ...item("large_family"), value: "LARGEFAMILY" },
  { ...item("state_resident"), value: "STATERESIDENT" },
  { ...item("state_resident_child"), value: "STATERESIDENTCHILD" },
  { ...item("state_resident_youth"), value: "STATERESIDENTYOUTH" },
  { ...item("state_resident_senior"), value: "STATERESIDENTSENIOR" },
];
</script>
