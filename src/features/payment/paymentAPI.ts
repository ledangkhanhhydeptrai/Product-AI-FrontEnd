import { AxiosError } from "axios";
import { fetchBaseResponse } from "../../config/fetchBaseResponse";
import { ApiResponse } from "../../types/api";
import { PaymentProps } from "./paymentTypes/PaymentTypes";

export const getPaymentByOrderId = async ({
  order_id
}: {
  order_id: string;
}): Promise<ApiResponse<PaymentProps>> => {
  try {
    const response = await fetchBaseResponse<ApiResponse<PaymentProps>>(
      `/payment/${order_id}`,
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
export const CreatePaymentOrderById = async ({
  order_id
}: {
  order_id: string;
}): Promise<ApiResponse<PaymentProps>> => {
  try {
    const response = await fetchBaseResponse<ApiResponse<PaymentProps>>(
      `/payment/${order_id}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        }
      }
    );
    console.log("PaymentResponse:", response.data);
    return response.data;
  } catch (error) {
    const errors = error as AxiosError;
    throw errors;
  }
};
export const createSuccessPaymentMethod = async ({
  order_code
}: {
  order_code: number;
}): Promise<ApiResponse<PaymentProps>> => {
  console.log("🔥 CALL SUCCESS API", order_code);
  try {
    const response = await fetchBaseResponse<ApiResponse<PaymentProps>>(
      `/payment-callback/success/${order_code}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json"
        }
      }
    );
    console.log("PaymentResponse:", response.data);
    return response.data;
  } catch (error) {
    const errors = error as AxiosError;
    throw errors;
  }
};
export const createFailedPaymentMethod = async ({
  order_code
}: {
  order_code: number;
}): Promise<ApiResponse<PaymentProps>> => {
  console.log("🔥 CALL Failed API", order_code);
  try {
    const response = await fetchBaseResponse<ApiResponse<PaymentProps>>(
      `/payment-callback/failed/${order_code}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json"
        }
      }
    );
    console.log("PaymentResponse:", response.data);
    return response.data;
  } catch (error) {
    const errors = error as AxiosError;
    throw errors;
  }
};
