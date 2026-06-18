import { call, put, takeLatest } from "redux-saga/effects";
import { ApiResponse } from "../../types/api";
import { OrderProps } from "./OrderTypes/OrderProps";
import { getAllOrder } from "./OrderAPI";
import {
  getOrderFailure,
  getOrderRequest,
  getOrderSuccess
} from "./OrderSlice";
import { AxiosError } from "axios";

function* handleGetAllOrder(): Generator {
  try {
    const response: ApiResponse<OrderProps[]> = yield call(getAllOrder);
    yield put(getOrderSuccess(response.data));
  } catch (error) {
    const errors = error as AxiosError;
    yield put(getOrderFailure(errors.message));
  }
}
export default function* OrderSaga() {
  yield takeLatest(getOrderRequest.type, handleGetAllOrder);
}
