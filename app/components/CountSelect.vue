<template>
  <v-select multiple>
    <template #item="{ props, item }">
      <v-number-input
        variant="plain"
        control-variant="split"
        hide-details
        :label="item.raw.title"
        placeholder="0"
        persistent-placeholder
        persistent-counter
        class="number-input px-4"
      >
        <template #decrement="slotProps">
          <v-btn v-bind="slotProps" size="small" density="compact" class="spin-btn" v-on="slotProps" />
        </template>
        <template #increment="slotProps">
          <v-btn v-bind="slotProps" size="small" density="compact" class="spin-btn" v-on="slotProps" />
        </template>
      </v-number-input>
    </template>
  </v-select>
</template>

<script setup lang="ts"></script>

<style scoped>
.number-input:not(:hover) .spin-btn {
  visibility: hidden;
}
</style>
