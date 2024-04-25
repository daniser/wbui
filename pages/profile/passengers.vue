<template>
  <v-main>
    <v-list v-for="person in personRepo.all()" :key="person.id" class="mx-2">
      <v-card variant="tonal">
        <v-card-text>
          <v-form>
            <v-text-field v-model="person.name" variant="underlined" size="x-small" />
          </v-form>
        </v-card-text>
        <v-card-actions>
          <v-btn>Save</v-btn>
          <v-btn>ADD</v-btn>
        </v-card-actions>
      </v-card>
    </v-list>
    <v-btn color="primary">123</v-btn>
  </v-main>
</template>

<script setup lang="ts">
import PersonRepository from "~/repositories/PersonRepository";

definePageMeta({
  layout: "profile",
  middleware: "auth",
});

const personRepo = computed(() => useRepo(PersonRepository));

onMounted(async () => {
  await personRepo.value.fetch();
});
</script>
