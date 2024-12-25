<template>
  <v-main>
    <v-list>
      <v-list-item v-for="person in persons" :key="person.value.id" class="mx-2">
        <v-confirm-edit v-model="person.value">
          <template #default="{ model: proxyModel, save, cancel, actions }">
            <v-card variant="tonal" @keydown.enter="save" @keydown.esc="cancel">
              <v-card-text>
                <Person v-model="proxyModel.value" variant="underlined" density="compact" />
              </v-card-text>
              <v-card-actions>
                <component :is="actions" />
              </v-card-actions>
            </v-card>
          </template>
        </v-confirm-edit>
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
  middleware: "sidebase-auth",
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
