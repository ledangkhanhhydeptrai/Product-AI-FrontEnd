import { AxiosError } from "axios";
import { fetchBaseResponse } from "../../config/fetchBaseResponse";
import { ApiResponse } from "../../types/api";
import { CategoryProps } from "./categoryTypes";

export const getAllCategory = async (): Promise<ApiResponse<CategoryProps>> => {
  try {
    const response = await fetchBaseResponse<ApiResponse<CategoryProps>>(
      "/public/category",
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json"
        }
      }
    );
    if (response.status !== 200) {
      throw new Error(`HTTP Status:${response.status}`);
    }
    return response.data;
  } catch (error) {
    const errors = error as AxiosError;
    console.log("Error:", errors);
    throw errors;
  }
};
export const getCategoryById = async (
  id: string
): Promise<ApiResponse<CategoryProps>> => {
  try {
    const response = await fetchBaseResponse<ApiResponse<CategoryProps>>(
      `/public/category/${id}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json"
        }
      }
    );
    if (response.status !== 200) {
      throw new Error(`HTTP Status:${response.status}`);
    }
    return response.data;
  } catch (error) {
    const errors = error as AxiosError;
    console.log("Error:", errors);
    throw errors;
  }
};
