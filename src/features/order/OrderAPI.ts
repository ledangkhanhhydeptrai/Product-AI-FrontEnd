import { AxiosError } from "axios";
import { fetchBaseResponse } from "../../config/fetchBaseResponse";
import { ApiResponse } from "../../types/api";
import { CreateOrderProps, OrderProps } from "./OrderTypes/OrderProps";

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
export const createOrderByCart = async ({
  cart_item_ids,
  shipping_address,
  payment_method
}: CreateOrderProps): Promise<ApiResponse<OrderProps>> => {
  try {
    const response = await fetchBaseResponse<ApiResponse<OrderProps>>(
      "/order/cart",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        data: { cart_item_ids, shipping_address, payment_method }
      }
    );
    return response.data;
  } catch (error) {
    const errors = error as AxiosError;
    throw errors;
  }
};
