import type { AxiosError } from "axios";
import { fetchBaseResponse } from "../../config/fetchBaseResponse";
export enum UserRole {
  USER = "user",
  STAFF = "staff",
  ADMIN = "admin"
}
export interface LoginRequest {
  email: string;
  password: string;
}
export interface TokenResponse {
  token: string;
  role: UserRole;
}
export interface MeResponse {
  token: string;
  authenticated: boolean;
  user: {
    sub: string;
    role: UserRole;
    exp: number;
  };
}
export interface LoginResponse {
  status: number;
  message: string;
  data: TokenResponse;
}
export const LoginAPI = async ({ email, password }: LoginRequest) => {
  try {
    const response = await fetchBaseResponse<LoginResponse>("/auth/login", {
      method: "POST",
      data: { email, password }
    });
    return response;
  } catch (error) {
    const errors = error as AxiosError;
    return errors;
  }
};
export const fetchMe = async () => {
    return fetchBaseResponse("/debug/me", {
    method: "GET",
  });
};