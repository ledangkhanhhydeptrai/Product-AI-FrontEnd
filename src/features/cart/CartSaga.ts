import { call, put, takeLatest } from "redux-saga/effects";
import { CartUserProps, getCartByUser } from "./CartAPI";
import { getCartFailure, getCartRequest, getCartSuccess } from "./CartSlice";
import { ApiResponse } from "../../types/api";
import { AxiosError } from "axios";

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
export default function* CartSaga() {
  yield takeLatest(getCartRequest.type, handleGetCart);
}
