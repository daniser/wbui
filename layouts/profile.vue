<template>
  <NuxtLayout name="default">
    <v-navigation-drawer>
      <v-list nav>
        <v-list-item to="/profile" title="Profile" />
        <v-list-item to="/profile/passengers" title="Passengers" />
        <v-list-item to="/profile/orders" title="Orders" />
      </v-list>
    </v-navigation-drawer>
    <slot />
  </NuxtLayout>
</template>
