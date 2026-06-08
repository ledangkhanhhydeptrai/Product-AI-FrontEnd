import type { AxiosError } from "axios";
import { fetchBaseResponse } from "../../config/fetchBaseResponse";
import type { ApiResponse } from "../../types/api";
export enum UserRole {
  USER = "user",
  STAFF = "staff",
  ADMIN = "admin"
}
export interface LoginRequest {
  email: string;
  password: string;
}
export interface UserResponse {
  authenticated: boolean;
  user: {
    id: string;
    role: UserRole;
    email: string;
  };
}
export interface MeResponse {
  id: string;
  fullName: string;
  email: string;
  avatarUrl: string;
  role: UserRole;
}
export interface LoginResponse {
  status: number;
  message: string;
  data: UserResponse;
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
export const fetchMe = async ():Promise<ApiResponse<MeResponse>> => {
  const res = await fetchBaseResponse<ApiResponse<MeResponse>>("/me", {
    method: "GET",
  });

  console.log("FETCH ME RESULT:", res);

  return res.data;
};
