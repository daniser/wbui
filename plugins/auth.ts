export default defineNuxtPlugin((nuxtApp) => {
  const { signIn } = useAuth();

  nuxtApp.hook("app:mounted", async () => {
    await signIn("client_credentials", { redirect: false });
  });
});
