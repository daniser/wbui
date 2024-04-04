export const useApi: typeof useFetch = function (request, opts) {
  return useFetch(request, {
    ...opts,
    $fetch: useNuxtApp().$api,
  });
};
