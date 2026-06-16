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

export const LogoutAPI = async (): Promise<ApiResponse<void>> => {
  const res = await fetchBaseResponse<ApiResponse<void>>("/auth/logout", {
    method: "POST"
  });
  return res.data;
};
export interface CreateProps {
  fullname: string;
  email: string;
  password: string;
  phone: string;
  file: File | null;
}
export const CreateFormAPI = async (
  data: CreateProps
): Promise<ApiResponse<void>> => {
  const formData = new FormData();

  formData.append("fullname", data.fullname);
  formData.append("email", data.email);
  formData.append("password", data.password);
  formData.append("phone", data.phone);

  if (!data.file) {
    throw new Error("File is required");
  }

  formData.append("file", data.file);

  const response = await fetchBaseResponse<ApiResponse<void>>(
    "/auth/register",
    {
      method: "POST",
      data: formData
    }
  );

  return response.data;
};
