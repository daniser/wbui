export const useCApi: typeof useFetch = function (request, opts) {
  return useFetch(request, {
    ...opts,
    // @ts-ignore
    $fetch: useNuxtApp().$capi,
  });
};
