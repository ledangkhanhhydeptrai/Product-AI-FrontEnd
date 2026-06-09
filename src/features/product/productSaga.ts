import { call, put, takeLatest } from "redux-saga/effects";
import { getAllProductForCustomer } from "./productApi";
import { productFailure, productRequest, productSuccess } from "./productSlice";
import { AxiosError } from "axios";
import { ProductProps } from "./productTypes";
import { ApiResponse } from "../../types/api";

function* handleGetAllProductForCustomer(): Generator {
  try {
    const response: ApiResponse<ProductProps[]> = yield call(
      getAllProductForCustomer
    );
    yield put(productSuccess(response.data));
  } catch (error) {
    const errors = error as AxiosError;
    yield put(productFailure(errors.message));
  }
}
export default function* productSaga() {
  yield takeLatest(productRequest.type, handleGetAllProductForCustomer);
}
