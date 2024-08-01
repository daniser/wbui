import type { AccountResponse, UserResponse } from "~/types/auth";

declare module "#app" {
  interface NuxtApp {
    $user: UserResponse;
    $account: AccountResponse;
  }
}

declare module "@vue/runtime-core" {
  interface ComponentCustomProperties {
    $user: UserResponse;
    $account: AccountResponse;
  }
}

export {};
