import type { TokenResponse } from "~/types/auth";

export default defineNuxtPlugin({
  name: "api",
  dependsOn: ["session"],
  setup({ $token, $ctoken }) {
    const config = useRuntimeConfig();
    const token = $token as TokenResponse;
    const ctoken = $ctoken as TokenResponse;

    const api = $fetch.create({
      baseURL: config.public.apiBase as string,
      async onRequest({ options }) {
        options.headers.set("Accept", "application/json");
        options.headers.set("Authorization", `${token.token_type} ${token.access_token}`);
      },
    });

    const capi = $fetch.create({
      baseURL: config.public.apiBase as string,
      async onRequest({ options }) {
        options.headers.set("Accept", "application/json");
        options.headers.set("Authorization", `${ctoken.token_type} ${ctoken.access_token}`);
      },
    });

    return {
      provide: { api, capi },
    };
  },
});
