<template>
  <v-form @submit.prevent="$emit('update:modelValue', person)">
    <v-card variant="tonal">
      <v-card-text>
        <v-text-field v-model="person.name" @input.stop variant="underlined" />
      </v-card-text>
      <v-card-actions>
        <v-btn v-if="dirty" type="submit">Save</v-btn>
        <v-btn v-if="dirty" @click="person.$refresh()">Reset</v-btn>
        <v-btn>Add</v-btn>
      </v-card-actions>
    </v-card>
  </v-form>
</template>

<script setup lang="ts">
import type Person from "~/models/Person";

const person = defineModel<Person>({ required: true });

const dirty = computed(() => person.value.$isDirty());
</script>
