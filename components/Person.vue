<template>
  <v-confirm-edit v-model="person">
    <template #default="{ model: proxyModel, actions }">
      <v-card variant="tonal">
        <v-card-text>
          <v-text-field v-model="proxyModel.value.name" variant="underlined" />
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
</script>
