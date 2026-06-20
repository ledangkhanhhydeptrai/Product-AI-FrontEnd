import { AxiosError } from "axios";
import { fetchBaseResponse } from "../../config/fetchBaseResponse";
import { ApiResponse } from "../../types/api";
import { ReviewProps } from "./reviewTypes";

export const reviewAll = async (): Promise<ApiResponse<ReviewProps>> => {
  try {
    const response = await fetchBaseResponse<ApiResponse<ReviewProps>>(
      "/review",
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json"
        }
      }
    );
    return response.data;
  } catch (error) {
    const errors = error as AxiosError;
    throw errors;
  }
};
