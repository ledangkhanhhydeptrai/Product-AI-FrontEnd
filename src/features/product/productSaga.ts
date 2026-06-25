import { call, put, takeLatest } from "redux-saga/effects";
import {
  getAllProductForCustomer,
  getProductAdmin,
  getProductByIdForCustomer
} from "./productApi";
import {
  productAdminFailure,
  productAdminRequest,
  productAdminSuccess,
  productFailure,
  productFailureById,
  productRequest,
  productRequestById,
  productSuccess,
  productSuccessById
} from "./productSlice";
import { AxiosError } from "axios";
import { ProductProps, ProductPropsForAdmin } from "./productTypes";
import { ApiResponse } from "../../types/api";
import { PayloadAction } from "@reduxjs/toolkit";

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
function* handleGetForCustomerById(action: PayloadAction<string>): Generator {
  try {
    const response: ApiResponse<ProductProps> = yield call(
      getProductByIdForCustomer,
      action.payload
    );
    yield put(productSuccessById(response.data));
  } catch (error) {
    const errors = error as AxiosError;
    yield put(productFailureById(errors.message));
  }
}
function* handleGetProductAdmin(): Generator {
  try {
    const response: ApiResponse<ProductPropsForAdmin[]> =
      yield call(getProductAdmin);
    yield put(productAdminSuccess(response.data));
  } catch (error) {
    const errors = error as AxiosError;
    yield put(productAdminFailure(errors.message));
  }
}
export default function* productSaga() {
  yield takeLatest(productRequest.type, handleGetAllProductForCustomer);
  yield takeLatest(productRequestById.type, handleGetForCustomerById);
  yield takeLatest(productAdminRequest.type, handleGetProductAdmin);
}
