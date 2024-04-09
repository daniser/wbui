import type { TokenResponse } from "~/types/auth";

export default defineNuxtPlugin(({ $token }) => {
  const config = useRuntimeConfig();
  const token = $token as TokenResponse;

  const api = $fetch.create({
    baseURL: config.public.apiBase as string,
    async onRequest({ options }) {
      options.headers = {
        ...(options.headers || {}),
        Accept: "application/json",
        Authorization: `${token.token_type} ${token.access_token}`,
      };
    },
  });

  return {
    provide: { api },
  };
});
