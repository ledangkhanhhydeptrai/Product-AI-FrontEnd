import { AxiosError } from "axios";
import { fetchBaseResponse } from "../../config/fetchBaseResponse";
import { ApiResponse } from "../../types/api";
import { ProductProps } from "./productTypes";

export const getAllProductForCustomer = async (): Promise<
  ApiResponse<ProductProps>
> => {
  try {
    const response = await fetchBaseResponse<ApiResponse<ProductProps>>(
      `/public/product`,
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
    console.log("Error:", errors);
    throw errors;
  }
};
export const getProductByIdForCustomer = async (
  id: string
): Promise<ApiResponse<ProductProps>> => {
  try {
    const response = await fetchBaseResponse<ApiResponse<ProductProps>>(
      `/public/product/${id}`,
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
    console.log("Error:", errors);
    throw errors;
  }
};
