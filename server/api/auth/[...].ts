import CredentialsProvider from "next-auth/providers/credentials";
import GithubProvider from "next-auth/providers/github";
import { NuxtAuthHandler } from "#auth";
import type { Credentials, TokenResponse, UserResponse } from "~/types/auth";

const config = useRuntimeConfig();

export default NuxtAuthHandler({
  secret: config.auth.secret,
  pages: {
    signIn: "/login",
    //error: "/",
  },
  providers: [
    // @ts-expect-error
    CredentialsProvider.default({
      name: "Credentials",
      credentials: {
        username: { label: "E-mail", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials: Credentials) {
        const userToken = await useStorage("session").getItem<TokenResponse>("token");

        const customerToken = await $fetch<TokenResponse>(`${config.public.apiBase}/customer/token`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            Authorization: `${userToken!.token_type} ${userToken!.access_token}`,
          },
          body: {
            grant_type: "password",
            client_id: config.customer.clientId,
            client_secret: config.customer.clientSecret,
            ...credentials,
          },
          async onResponseError({ response }) {
            throw new Error(response._data.message);
          },
        });

        return await $fetch<UserResponse>(`${config.public.apiBase}/customer`, {
          method: "GET",
          headers: {
            Accept: "application/json",
            Authorization: `${customerToken.token_type} ${customerToken.access_token}`,
          },
        });
      },
    }),
    // @ts-expect-error
    GithubProvider.default({
      clientId: config.github.clientId,
      clientSecret: config.github.clientSecret,
    }),
  ],
});
