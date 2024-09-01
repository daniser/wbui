import type { DefaultUser } from "next-auth";
import type { TokenResponse } from "~/types/auth";

declare module "next-auth" {
  interface User extends DefaultUser {
    customerToken: TokenResponse;
  }
}
