import type { AccountResponse, UserResponse } from "~/types/auth";
import type { $Fetch } from "ofetch";

declare module "#app" {
  interface NuxtApp {
    $user: UserResponse;
    $account: AccountResponse;
    $api: $Fetch;
    $capi: $Fetch;
  }
}

declare module "vue" {
  interface ComponentCustomProperties {
    $user: UserResponse;
    $account: AccountResponse;
    $api: $Fetch;
    $capi: $Fetch;
  }
}

export {};
