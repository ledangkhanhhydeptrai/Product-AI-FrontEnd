import { call, put, takeLatest } from "redux-saga/effects";
import {
  CartUserProps,
  createCartByUser,
  CreateCartProps,
  deleteProduct,
  getCartByUser,
  updateAllProductQuantity
} from "./CartAPI";
import {
  createCartRequest,
  createCartSuccess,
  deleteCartRequest,
  deleteCartSuccess,
  getCartFailure,
  getCartRequest,
  getCartSuccess,
  updateCartFailure,
  updateCartRequest,
  updateCartSuccess
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
function* handleUpdateCart(
  action: PayloadAction<{ product_id: string; quantity: number }>
): Generator {
  try {
    const { product_id, quantity } = action.payload;

    const response: ApiResponse<CartUserProps> = yield call(
      updateAllProductQuantity,
      { product_id, quantity }
    );

    yield put(updateCartSuccess(response.data));
    yield put(getCartRequest());
  } catch (error) {
    const err = error as AxiosError<{ message: string }>;
    yield put(updateCartFailure(err.message));
  }
}
function* handleDeleteCart(
  action: PayloadAction<{ product_id: string }>
): Generator {
  try {
    const { product_id } = action.payload;
    const response: ApiResponse<null> = yield call(deleteProduct, {
      product_id
    });
    yield put(deleteCartSuccess(response.data));
    yield put(getCartRequest())
  } catch (error) {
    const err = error as AxiosError<{ message: string }>;
    yield put(updateCartFailure(err.message));
  }
}
export default function* CartSaga() {
  yield takeLatest(getCartRequest.type, handleGetCart);
  yield takeLatest(createCartRequest.type, handleCreateCart);
  yield takeLatest(updateCartRequest.type, handleUpdateCart);
  yield takeLatest(deleteCartRequest.type, handleDeleteCart);
}
