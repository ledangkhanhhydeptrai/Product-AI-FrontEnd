import { AxiosError } from "axios";
import { fetchBaseResponse } from "../../config/fetchBaseResponse";
import { ApiResponse } from "../../types/api";
import {
  CreateOrderProps,
  CreatePropsBuyNow,
  OrderProps
} from "./OrderTypes/OrderProps";

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
export const CreateOrderBuyNow = async ({
  product_id,
  quantity,
  payment_method,
  shipping_address
}: CreatePropsBuyNow): Promise<ApiResponse<OrderProps>> => {
  try {
    const formData = new FormData();
    formData.append("product_id", product_id);
    formData.append("quantity", quantity.toString());
    formData.append("payment_method", payment_method);
    formData.append("shipping_address", shipping_address);
    const response = await fetchBaseResponse<ApiResponse<OrderProps>>(
      "/order/buy-now",
      {
        method: "POST",

        data: formData
      }
    );
    return response.data;
  } catch (error) {
    const errors = error as AxiosError;
    throw errors;
  }
};
