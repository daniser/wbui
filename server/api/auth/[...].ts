import GithubProvider from "next-auth/providers/github";
import { NuxtAuthHandler } from "#auth";
const { authSecret, passport, github } = useRuntimeConfig();

export default NuxtAuthHandler({
  secret: authSecret,
  pages: {
    signIn: "/login",
  },
  providers: [
    {
      id: "laravelpassport",
      name: "Passport",
      type: "oauth",
      version: "2.0",
      authorization: {
        url: `${passport.baseUrl}/oauth/authorize`,
        params: {
          scope: "*",
        },
      },
      token: {
        url: `${passport.baseUrl}/oauth/token`,
      },
      clientId: passport.clientId,
      clientSecret: passport.clientSecret,
      userinfo: {
        url: `${passport.baseUrl}/api/user`,
      },
      profile: (profile) => ({
        id: profile.id,
        name: profile.name,
        email: profile.email,
      }),
      idToken: false,
    },
    // @ts-expect-error
    GithubProvider.default({
      clientId: github.clientId,
      clientSecret: github.clientSecret,
    }),
  ],
});
