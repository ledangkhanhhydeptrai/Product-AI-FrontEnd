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
export const UpdateReview = async (
  id: string,
  { product_id, rating, comment }: CreateReviewProps
): Promise<ApiResponse<ReviewProps>> => {
  try {
    const response = await fetchBaseResponse<ApiResponse<ReviewProps>>(
      `/review/${id}`,
      {
        method: "PUT",
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
export const DeleteReview = async (
  id: string
): Promise<ApiResponse<ReviewProps>> => {
  try {
    const response = await fetchBaseResponse<ApiResponse<ReviewProps>>(
      `/review/${id}`,
      {
        method: "DELETE",
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
