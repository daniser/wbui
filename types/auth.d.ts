export interface Credentials {
  username: string;
  password: string;
}

export interface PasswordTokenRequestPayload {
  grant_type: "password";
  client_id: string;
  client_secret: string;
  username: string;
  password: string;
  scope: string;
}

export interface ClientCredentialsTokenRequestPayload {
  grant_type: "client_credentials";
  client_id: string;
  client_secret: string;
  scope: string;
}

export interface TokenResponse {
  token_type: string;
  expires_in: number;
  access_token: string;
  refresh_token: string;
}

export interface ErrorResponse {
  error: string;
  error_description: string;
  message: string;
}

interface UserResponse {
  id: number;
  name: string;
  email: string;
}
