import { call, put, takeLatest } from "redux-saga/effects";
import { ApiResponse } from "../../types/api";
import {
  CreateOrderProps,
  CreatePropsBuyNow,
  OrderAdmin,
  OrderProps,
  OrderUpdateAdminById
} from "./OrderTypes/OrderProps";
import {
  CreateOrderBuyNow,
  createOrderByCart,
  getAllOrder,
  getAllOrderAdmin,
  updateOrderAdmin
} from "./OrderAPI";
import {
  createOrderBuyNowFailure,
  createOrderBuyNowRequest,
  createOrderBuyNowSuccess,
  createOrderFailure,
  createOrderRequest,
  createOrderSuccess,
  getAllOrderAdminRequest,
  getAllOrderAdminSuccess,
  getOrderFailure,
  getOrderRequest,
  getOrderSuccess,
  updateOrderAdminFailure,
  updateOrderAdminRequest,
  updateOrderAdminSuccess
} from "./OrderSlice";
import { AxiosError } from "axios";
import { PayloadAction } from "@reduxjs/toolkit";
import { showNotification } from "../notification/notificationSlice";

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
function* handleGetAllOrderAdmin(): Generator {
  try {
    const response: ApiResponse<OrderAdmin[]> = yield call(getAllOrderAdmin);
    yield put(getAllOrderAdminSuccess(response.data));
  } catch (error) {
    const errors = error as AxiosError;
    yield put(getOrderFailure(errors.message));
  }
}
function* handleUpdateOrderAdmin(
  action: PayloadAction<OrderUpdateAdminById>
): Generator {
  try {
    const { id, payment_method, payment_status, shipping_address, status } =
      action.payload;
    const response: ApiResponse<OrderAdmin> = yield call(updateOrderAdmin, id, {
      payment_method,
      payment_status,
      shipping_address,
      status
    });
    yield put(updateOrderAdminSuccess(response.data));
    yield put(
      showNotification({
        message: "Update order successfully",
        severity: "success"
      })
    );
    yield put(getAllOrderAdminRequest());
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
    yield put(updateOrderAdminFailure(message));
  }
}
export default function* OrderSaga() {
  yield takeLatest(getOrderRequest.type, handleGetAllOrder);
  yield takeLatest(createOrderRequest.type, handleCreateOrder);
  yield takeLatest(createOrderBuyNowRequest.type, handleCreateOrderBuyNow);
  yield takeLatest(getAllOrderAdminRequest.type, handleGetAllOrderAdmin);
  yield takeLatest(updateOrderAdminRequest.type, handleUpdateOrderAdmin);
}
