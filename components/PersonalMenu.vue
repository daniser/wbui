<template>
  <v-btn v-if="status !== 'authenticated'" to="/login">{{ $t("sign_in") }}</v-btn>
  <v-menu v-else>
    <template #activator="{ props }">
      <v-btn v-bind="props">
        <template v-if="data?.user?.image" #prepend><v-avatar :image="data.user.image" size="32" /></template>
        {{ data?.user?.name ?? $t("account") }}
      </v-btn>
    </template>
    <v-list>
      <v-list-item @click="signOut">{{ $t("sign_out") }}</v-list-item>
    </v-list>
  </v-menu>
</template>

<script setup lang="ts">
const { status, data, signOut } = useAuth();
</script>
