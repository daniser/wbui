import type { TokenResponse, UserResponse, AccountResponse } from "~/types/auth";

export default defineNuxtPlugin(async () => {
  const { data: token } = await useFetch<TokenResponse>("/api/session/token");
  const { data: user } = await useFetch<UserResponse>("/api/session/user");
  const { data: account } = await useFetch<AccountResponse>("/api/session/account");

  return {
    provide: {
      token: token.value,
      user: user.value,
      account: account.value,
    },
  };
});
