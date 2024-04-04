import type { TokenResponse, UserResponse } from "~/types/auth";

export const useSessionStore = defineStore("session", () => {
  const config = useRuntimeConfig();

  const { data: token } = useFetch<TokenResponse>(`${config.auth.baseUrl}/oauth/token`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: {
      grant_type: "client_credentials",
      client_id: config.user.clientId,
      client_secret: config.user.clientSecret,
    },
    default() {
      return {
        token_type: "Bearer",
        expires_in: Math.floor(Date.now() / 1000),
        access_token: "",
      } as TokenResponse;
    },
    /*async onResponseError({ response }) {
      throw new Error(response._data.message);
    },*/
    //watch: [token],
  });

  const authHeader = computed(() => `${token.value.token_type} ${token.value.access_token}`);

  const { data: user } = useFetch<UserResponse>(`${config.auth.baseUrl}/api/user`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: authHeader.value,
    },
    default() {
      return {
        id: 0,
        name: "User",
        email: "user@example.com",
      } as UserResponse;
    },
  });

  return { token, authHeader, user };
});
