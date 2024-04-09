export default cachedEventHandler(async (event) => {
  return await useStorage("session").getItem(event.context.params?._ ?? "token");
});
