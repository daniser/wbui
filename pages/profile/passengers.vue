<template>
  <v-main>
    <v-list>
      <v-list-item v-for="(person, i) in persons" :key="person.id" class="mx-2">
        <Person v-model="persons[i]" />
      </v-list-item>
    </v-list>
    <v-btn color="primary" class="m-2">New</v-btn>
  </v-main>
</template>

<script setup lang="ts">
import PersonRepository from "~/repositories/PersonRepository";

definePageMeta({
  layout: "profile",
  middleware: "auth",
});

const personRepo = computed(() => useRepo(PersonRepository));

const persons = computed(() => personRepo.value.all());

onMounted(async () => {
  await personRepo.value.fetch();
});
</script>
