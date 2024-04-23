export const useCApi: typeof useFetch = function (request, opts) {
  return useFetch(request, {
    ...opts,
    $fetch: useNuxtApp().$capi,
  });
};
