import { call, put, takeLatest } from "redux-saga/effects";
import {
  createProductFormAdmin,
  getAllProductForCustomer,
  getProductAdmin,
  getProductAdminById,
  getProductByIdForCustomer
} from "./productApi";
import {
  createProductAdminFailure,
  createProductAdminRequest,
  createProductAdminSuccess,
  productAdminByIdFailure,
  productAdminByIdRequest,
  productAdminByIdSuccess,
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
import {
  ProductProps,
  ProductPropsAdminForm,
  ProductPropsForAdmin
} from "./productTypes";
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
function* handleGetForAdminById(action: PayloadAction<string>): Generator {
  try {
    const response: ApiResponse<ProductPropsForAdmin> = yield call(
      getProductAdminById,
      action.payload
    );
    yield put(productAdminByIdSuccess(response.data));
  } catch (error) {
    const errors = error as AxiosError;
    yield put(productAdminByIdFailure(errors.message));
  }
}
function* handleCreateProductFormAdmin(
  action: PayloadAction<ProductPropsAdminForm>
): Generator {
  try {
    const response: ApiResponse<ProductPropsForAdmin> = yield call(
      createProductFormAdmin,
      action.payload
    );

    yield put(createProductAdminSuccess(response.data));

    yield put(productAdminRequest());

    if (action.payload.onSuccess) {
      action.payload.onSuccess();
    }
  } catch (err) {
    const error = err as AxiosError<{ message: string }>;

    let message = "Create product failed";

    if (error.response && error.response.data && error.response.data.message) {
      message = error.response.data.message;
    } else if (error.message) {
      message = error.message;
    }

    if (action.payload.onError) {
      action.payload.onError(message);
    }
    yield put(createProductAdminFailure(message));
  }
}
export default function* productSaga() {
  yield takeLatest(productRequest.type, handleGetAllProductForCustomer);
  yield takeLatest(productRequestById.type, handleGetForCustomerById);
  yield takeLatest(productAdminRequest.type, handleGetProductAdmin);
  yield takeLatest(productAdminByIdRequest.type, handleGetForAdminById);
  yield takeLatest(
    createProductAdminRequest.type,
    handleCreateProductFormAdmin
  );
}
