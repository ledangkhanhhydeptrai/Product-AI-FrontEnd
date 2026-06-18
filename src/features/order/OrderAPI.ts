import { AxiosError } from "axios";
import { fetchBaseResponse } from "../../config/fetchBaseResponse";
import { ApiResponse } from "../../types/api";
import { OrderProps } from "./OrderTypes/OrderProps";

export const getAllOrder = async (): Promise<ApiResponse<OrderProps>> => {
  try {
    const response = await fetchBaseResponse<ApiResponse<OrderProps>>(
      "/order",
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
export const createOrderByCart=async()=>{
  
}