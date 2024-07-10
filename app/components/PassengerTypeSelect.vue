<template>
  <CountSelect v-model="model" :items="items" item-props />
</template>

<script setup lang="ts">
const { t } = useI18n();

const props = defineProps<{
  plural?: boolean;
}>();

const model = defineModel<Record<string, number>>({ required: true });

const item = (key: string) => ({
  title: t(`passenger.${key}.title`, props.plural ? 2 : 1),
  subtitle: t(`passenger.${key}.subtitle`),
});

const items = [
  { ...item("adult"), value: "ADULT", max: 9 },
  { ...item("child"), value: "CHILD", max: 9 },
  { ...item("infant"), value: "INFANT", max: 9 },
  { ...item("youth"), value: "YOUTH", max: 9 },
  { ...item("senior"), value: "SENIOR", max: 9 },
  { ...item("infant_with_seat"), value: "WSEATINFANT", max: 9 },
  { ...item("disabled"), value: "DISABLED", max: 9 },
  { ...item("disabled_child"), value: "DISABLEDCHILD", max: 9 },
  { ...item("escort"), value: "ESCORT", max: 1 },
  { ...item("large_family"), value: "LARGEFAMILY", max: 9 },
  { ...item("state_resident"), value: "STATERESIDENT", max: 9 },
  { ...item("state_resident_child"), value: "STATERESIDENTCHILD", max: 9 },
  { ...item("state_resident_youth"), value: "STATERESIDENTYOUTH", max: 9 },
  { ...item("state_resident_senior"), value: "STATERESIDENTSENIOR", max: 9 },
];
</script>
