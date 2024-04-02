import CredentialsProvider from "next-auth/providers/credentials";
import GithubProvider from "next-auth/providers/github";
import { NuxtAuthHandler } from "#auth";
import type { Credentials, TokenResponse, UserResponse } from "~/types/auth";

const { auth, user, customer, github } = useRuntimeConfig();

export default NuxtAuthHandler({
  secret: auth.secret,
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
        url: `${auth.baseUrl}/oauth/authorize`,
        params: {
          scope: "*",
        },
      },
      token: {
        url: `${auth.baseUrl}/oauth/token`,
      },
      clientId: customer.clientId,
      clientSecret: customer.clientSecret,
      userinfo: {
        url: `${auth.baseUrl}/api/customer`,
      },
      profile: (profile: any) => ({
        id: profile.id,
        name: profile.name,
        email: profile.email,
      }),
      idToken: false,
    },*/
    // @ts-expect-error
    CredentialsProvider.default({
      id: "client_credentials",
      name: "Client Credentials",
      credentials: {},
      async authorize(credentials: any) {
        const token = await $fetch<TokenResponse>(`${auth.baseUrl}/oauth/token`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: {
            grant_type: "client_credentials",
            client_id: user.clientId,
            client_secret: user.clientSecret,
            ...credentials,
          },
          async onResponseError({ response }) {
            throw new Error(response._data.message);
          },
        });

        return await $fetch<UserResponse>(`${auth.baseUrl}/api/user`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `${token.token_type} ${token.access_token}`,
          },
        });
      },
    }),
    // @ts-expect-error
    CredentialsProvider.default({
      name: "Credentials",
      credentials: {
        username: { label: "E-mail", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials: Credentials) {
        const token = await $fetch<TokenResponse>(`${auth.baseUrl}/oauth/token`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: {
            grant_type: "password",
            client_id: customer.clientId,
            client_secret: customer.clientSecret,
            ...credentials,
          },
          async onResponseError({ response }) {
            throw new Error(response._data.message);
          },
        });

        return await $fetch<UserResponse>(`${auth.baseUrl}/api/customer`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `${token.token_type} ${token.access_token}`,
          },
        });
      },
    }),
    // @ts-expect-error
    GithubProvider.default({
      clientId: github.clientId,
      clientSecret: github.clientSecret,
    }),
  ],
});
