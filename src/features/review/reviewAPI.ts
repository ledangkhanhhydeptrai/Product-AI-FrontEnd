import { AxiosError } from "axios";
import { fetchBaseResponse } from "../../config/fetchBaseResponse";
import { ApiResponse } from "../../types/api";
import { CreateReviewProps, ReviewProps } from "./reviewTypes";

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
export const createView = async ({
  product_id,
  rating,
  comment
}: CreateReviewProps): Promise<ApiResponse<ReviewProps>> => {
  try {
    const response = await fetchBaseResponse<ApiResponse<ReviewProps>>(
      "/review/create",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        data: { product_id, rating, comment }
      }
    );
    return response.data;
  } catch (error) {
    const errors = error as AxiosError;
    throw errors;
  }
};
