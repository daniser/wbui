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
    /*{
      id: "laravelpassport",
      name: "Passport",
      type: "oauth",
      version: "2.0",
      authorization: {
        url: `${config.auth.baseUrl}/oauth/authorize`,
        params: {
          scope: "*",
        },
      },
      token: {
        url: `${config.public.apiBase}/customer/token`,
      },
      clientId: config.customer.clientId,
      clientSecret: config.customer.clientSecret,
      userinfo: {
        url: `${config.public.apiBase}/customer`,
      },
      profile: (profile) => ({
        id: profile.id,
        name: profile.name,
        email: profile.email,
      }),
      idToken: false,
    },*/
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

        const customerData = await $fetch<UserResponse>(`${config.public.apiBase}/customer`, {
          method: "GET",
          headers: {
            Accept: "application/json",
            Authorization: `${customerToken.token_type} ${customerToken.access_token}`,
          },
        });

        return { ...customerData, customerToken };
      },
    }),
    // @ts-expect-error
    GithubProvider.default({
      clientId: config.github.clientId,
      clientSecret: config.github.clientSecret,
    }),
  ],
  callbacks: {
    async jwt({ token, user, account }) {
      if (account?.type === "credentials") {
        token.customerToken = user.customerToken;
      }

      return token;
    },
  },
});
