import type { Pinia } from "pinia";

export default defineNuxtPlugin(({ $pinia }) => {
  const config = useRuntimeConfig();

  const session = useSessionStore($pinia as Pinia);

  const api = $fetch.create({
    baseURL: config.public.apiBase as string,
    async onRequest({ options }) {
      options.headers = {
        ...(options.headers || {}),
        Accept: "application/json",
        Authorization: session.authHeader,
      };
    },
  });

  return {
    provide: { api },
  };
});
