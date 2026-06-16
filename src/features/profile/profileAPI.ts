import { fetchBaseResponse } from "../../config/fetchBaseResponse";
import { ApiResponse } from "../../types/api";
import { UserRole } from "../auth/authApi";
export interface MeResponse {
  id: string;
  fullName: string;
  email: string;
  avatarUrl: string;
  role: UserRole;
}
export const profileAPI = async (): Promise<ApiResponse<MeResponse>> => {
  const res = await fetchBaseResponse<ApiResponse<MeResponse>>("/me", {
    method: "GET"
  });

  console.log("FETCH ME RESULT:", res);

  return res.data;
};
