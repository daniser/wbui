import type { TokenResponse } from "~/types/auth";

export default defineEventHandler(async (event) => {
  const { auth, user } = useRuntimeConfig(event);

  return await $fetch<TokenResponse>(`${auth.baseUrl}/oauth/token`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: {
      grant_type: "client_credentials",
      client_id: user.clientId,
      client_secret: user.clientSecret,
    },
  });
});
