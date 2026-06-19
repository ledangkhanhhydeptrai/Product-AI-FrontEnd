import { call, put, takeLatest } from "redux-saga/effects";
import { ApiResponse } from "../../types/api";
import { CreateOrderProps, OrderProps } from "./OrderTypes/OrderProps";
import { createOrderByCart, getAllOrder } from "./OrderAPI";
import {
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
    yield put(getOrderRequest());
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
export default function* OrderSaga() {
  yield takeLatest(getOrderRequest.type, handleGetAllOrder);
  yield takeLatest(createOrderRequest.type, handleCreateOrder);
}
