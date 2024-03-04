import { NuxtAuthHandler } from "#auth";
const { passport } = useRuntimeConfig();

export default NuxtAuthHandler({
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
  ],
});
