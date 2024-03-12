<template>
  <v-main>
    <div class="flex h-screen">
      <div v-if="providers" class="m-auto">
        <p>Sign-In Options:</p>
        <template v-for="(provider, id) in providers" :key="id">
          <v-btn v-if="provider" @click="signIn(provider.id)">{{ provider.name }}</v-btn>
        </template>
      </div>
    </div>
  </v-main>
</template>

<script setup lang="ts">
definePageMeta({
  auth: {
    unauthenticatedOnly: true,
    navigateAuthenticatedTo: "/",
  },
});

const { getProviders, signIn } = useAuth();

const providers = ref<Awaited<ReturnType<typeof getProviders>>>();

onMounted(async () => {
  providers.value = await getProviders();
});
</script>
