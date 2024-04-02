<template>
  <v-main>
    <Head>
      <Title>{{ $t("sign_in") }}</Title>
    </Head>
    <v-form class="flex h-screen">
      <v-container v-if="providers" class="m-auto">
        <p>Sign-In Options:</p>
        <v-row v-for="(provider, id) in providers" :key="id">
          <template v-if="!provider || provider.id === 'client_credentials'">Unknown provider</template>
          <v-col v-else-if="provider.type === 'credentials'">
            <v-text-field
              v-model="credentials.username"
              type="email"
              :label="$t('email')"
              :placeholder="$t('email_placeholder')"
            />
            <v-text-field v-model="credentials.password" type="password" :label="$t('password')" />
            <v-btn @click="signIn(provider.id, credentials)">{{ provider.name }}</v-btn>
          </v-col>
          <v-col v-else>
            <v-btn @click="signIn(provider.id)">{{ provider.name }}</v-btn>
          </v-col>
        </v-row>
      </v-container>
    </v-form>
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

const credentials = reactive({
  username: "",
  password: "",
});

onMounted(async () => {
  providers.value = await getProviders();
  console.log(providers.value);
});
</script>
