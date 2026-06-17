import { call, put, takeLatest } from "redux-saga/effects";
import {
  CartUserProps,
  createCartByUser,
  CreateCartProps,
  getCartByUser
} from "./CartAPI";
import {
  createCartRequest,
  createCartSuccess,
  getCartFailure,
  getCartRequest,
  getCartSuccess
} from "./CartSlice";
import { ApiResponse } from "../../types/api";
import { AxiosError } from "axios";
import { PayloadAction } from "@reduxjs/toolkit";

function* handleGetCart(): Generator {
  try {
    const response: ApiResponse<CartUserProps[]> = yield call(getCartByUser);
    yield put(getCartSuccess(response.data));
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

    yield put(getCartFailure(message));
  }
}
function* handleCreateCart(action: PayloadAction<CreateCartProps>): Generator {
  const { product_id, quantity } = action.payload;
  try {
    const response: ApiResponse<CartUserProps> = yield call(createCartByUser, {
      product_id,
      quantity
    });
    yield put(createCartSuccess(response.data));
    yield put(getCartRequest()); // refresh cart
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

    yield put(getCartFailure(message));
  }
}
export default function* CartSaga() {
  yield takeLatest(getCartRequest.type, handleGetCart);
  yield takeLatest(createCartRequest.type,handleCreateCart);
}
