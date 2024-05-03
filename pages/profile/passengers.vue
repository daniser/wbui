<template>
  <v-main>
    <v-list>
      <v-list-item v-for="person in persons" :key="person.value.id" class="mx-2">
        <Person v-model="person.value" />
      </v-list-item>
    </v-list>
    <v-btn color="primary" class="m-2">New</v-btn>
  </v-main>
</template>

<script setup lang="ts">
import PersonRepository from "~/repositories/PersonRepository";
import type Person from "~/models/Person";

definePageMeta({
  layout: "profile",
  middleware: "auth",
});

const personRepo = computed(() => useRepo(PersonRepository));

const persons = computed(() =>
  personRepo.value.all().map((person) =>
    computed({
      get() {
        return person;
      },
      set(newValue) {
        personRepo.value.save(newValue);
      },
    }),
  ),
);

onMounted(async () => {
  await personRepo.value.fetch();
});
</script>
