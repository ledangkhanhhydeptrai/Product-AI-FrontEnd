import { call, put, takeLatest } from "redux-saga/effects";
import { ApiResponse } from "../../types/api";
import {
  CreateOrderProps,
  CreatePropsBuyNow,
  OrderProps
} from "./OrderTypes/OrderProps";
import { CreateOrderBuyNow, createOrderByCart, getAllOrder } from "./OrderAPI";
import {
  createOrderBuyNowFailure,
  createOrderBuyNowRequest,
  createOrderBuyNowSuccess,
  createOrderFailure,
  createOrderRequest,
  createOrderSuccess,
  getOrderFailure,
  getOrderRequest,
  getOrderSuccess
} from "./OrderSlice";
import { AxiosError } from "axios";
import { PayloadAction } from "@reduxjs/toolkit";

function* handleGetAllOrder(): Generator {
  try {
    const response: ApiResponse<OrderProps[]> = yield call(getAllOrder);
    yield put(getOrderSuccess(response.data));
  } catch (error) {
    const errors = error as AxiosError;
    yield put(getOrderFailure(errors.message));
  }
}
function* handleCreateOrder(
  action: PayloadAction<CreateOrderProps>
): Generator {
  try {
    const { cart_item_ids, shipping_address, payment_method } = action.payload;
    const response: ApiResponse<OrderProps> = yield call(createOrderByCart, {
      cart_item_ids,
      shipping_address,
      payment_method
    });
    yield put(createOrderSuccess(response.data));
  } catch (error) {
    const errors = error as AxiosError<{ message: string }>;

    let message = errors.message;
    if (errors.response !== undefined && errors.response !== null) {
      if (
        errors.response.data &&
        typeof errors.response.data === "object" &&
        "message" in errors.response.data
      ) {
        message = errors.response.data.message;
      }
    }
    yield put(createOrderFailure(message));
  }
}
function* handleCreateOrderBuyNow(
  action: PayloadAction<CreatePropsBuyNow>
): Generator {
  try {
    const { product_id, payment_method, shipping_address, quantity } =
      action.payload;
    const response: ApiResponse<OrderProps> = yield call(CreateOrderBuyNow, {
      payment_method,
      product_id,
      quantity,
      shipping_address
    });
    yield put(createOrderBuyNowSuccess(response.data));
  } catch (error) {
    const errors = error as AxiosError<{ message: string }>;

    let message = errors.message;
    if (errors.response !== undefined && errors.response !== null) {
      if (
        errors.response.data &&
        typeof errors.response.data === "object" &&
        "message" in errors.response.data
      ) {
        message = errors.response.data.message;
      }
    }
    yield put(createOrderBuyNowFailure(message));
  }
}
export default function* OrderSaga() {
  yield takeLatest(getOrderRequest.type, handleGetAllOrder);
  yield takeLatest(createOrderRequest.type, handleCreateOrder);
  yield takeLatest(createOrderBuyNowRequest.type, handleCreateOrderBuyNow);
}
