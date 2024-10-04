export const useApi: typeof useFetch = function (request, opts) {
  return useFetch(request, {
    ...opts,
    // @ts-ignore
    $fetch: useNuxtApp().$api,
  });
};
