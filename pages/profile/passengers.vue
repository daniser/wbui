<template>
  <v-main>
    <v-list>
      <v-list-item v-for="person in persons" :key="person.value.id" class="mx-2">
        <Person v-model="person.value" variant="underlined" density="compact" />
      </v-list-item>
    </v-list>
    <v-btn color="primary" class="m-2">New</v-btn>
  </v-main>
</template>

<script setup lang="ts">
import PersonRepository from "~/repositories/PersonRepository";
import type Person from "~/models/Person";
import type { Repository } from "pinia-orm";

definePageMeta({
  layout: "profile",
  middleware: "auth",
});

// @ts-expect-error
const personRepo = computed(() => useRepo(PersonRepository) as Repository<Person>);

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
