import { AxiosError } from "axios";
import { fetchBaseResponse } from "../../config/fetchBaseResponse";
import { ApiResponse } from "../../types/api";

interface CartItem {
  id: string;
  product_id: string;
  quantity: number;
  price: number;
}
export interface CreateCartProps {
  product_id: string;
  quantity: number;
}
export interface CartUserProps {
  id: string;
  user_id: string;
  created_at: string;
  cart_items: CartItem[];
}
export const getCartByUser = async (): Promise<ApiResponse<CartUserProps>> => {
  try {
    const response = await fetchBaseResponse<ApiResponse<CartUserProps>>(
      "/cart",
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
export const createCartByUser = async ({
  product_id,
  quantity
}: CreateCartProps): Promise<ApiResponse<CartUserProps>> => {
  try {
    const response = await fetchBaseResponse<ApiResponse<CartUserProps>>(
      "/cart/items",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        data: { product_id, quantity }
      }
    );
    return response.data;
  } catch (error) {
    const errors = error as AxiosError;
    throw errors;
  }
};
