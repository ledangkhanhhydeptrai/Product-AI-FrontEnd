import { AxiosError } from "axios";
import { fetchBaseResponse } from "../../config/fetchBaseResponse";
import { ApiResponse } from "../../types/api";
export interface BrandProps {
  id: string;
  name: string;
  logo: string;
  description: string;
}
export const getAllBrand = async (): Promise<ApiResponse<BrandProps>> => {
  try {
    const response = await fetchBaseResponse<ApiResponse<BrandProps>>(
      "/brands",
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json"
        }
      }
    );
    console.log("Response:", response.data);
    if (response.status !== 200) {
      throw new Error(`HTTP Status:${response.status}`);
    }
    return response.data;
  } catch (error) {
    const errors = error as AxiosError;
    throw errors;
  }
};
