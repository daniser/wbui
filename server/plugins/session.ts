import { consola } from "consola";
import type { TokenResponse, UserResponse, AccountResponse } from "~/types/auth";

export default defineNitroPlugin(async () => {
  const config = useRuntimeConfig();
  const session = useStorage("session");

  try {
    consola.info("Retrieving API token");

    const token = await $fetch<TokenResponse>(`${config.auth.baseUrl}/oauth/token`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: {
        grant_type: "client_credentials",
        client_id: config.user.clientId,
        client_secret: config.user.clientSecret,
      },
    });

    const user = await $fetch<UserResponse>(`${config.public.apiBase}/user`, {
      method: "GET",
      headers: {
        Accept: "application/json",
        Authorization: `${token.token_type} ${token.access_token}`,
      },
    });

    const account = await $fetch<AccountResponse>(`${config.public.apiBase}/account`, {
      method: "GET",
      headers: {
        Accept: "application/json",
        Authorization: `${token.token_type} ${token.access_token}`,
      },
    });

    await session.setItem("token", token);
    await session.setItem("user", user);
    await session.setItem("account", account);

    consola.success(`API token for ${account.name} successfully retrieved`);
  } catch (e) {
    consola.error("Unable to retrieve API token");
    throw e;
  }
});
