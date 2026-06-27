import { call, put, takeLatest } from "redux-saga/effects";
import {
  createProductFormAdmin,
  deleteProductAdmin,
  getAllProductForCustomer,
  getProductAdmin,
  getProductAdminById,
  getProductByIdForCustomer,
  updateProductForAdmin
} from "./productApi";
import {
  createProductAdminFailure,
  createProductAdminRequest,
  createProductAdminSuccess,
  deleteProductFailure,
  deleteProductRequest,
  deleteProductSuccess,
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
  productSuccessById,
  updateProductAdminFailure,
  updateProductAdminRequest,
  updateProductAdminSuccess
} from "./productSlice";
import { AxiosError } from "axios";
import {
  ProductProps,
  ProductPropsAdminForm,
  ProductPropsForAdmin,
  UpdateProductForm
} from "./productTypes";
import { ApiResponse } from "../../types/api";
import { PayloadAction } from "@reduxjs/toolkit";
import { showNotification } from "../notification/notificationSlice";

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
function* handleUpdateProductForAdmin(
  action: PayloadAction<UpdateProductForm>
): Generator {
  try {
    const { id, name, stock, description, meta, price, slug, thumbnail } =
      action.payload;
    const response: ApiResponse<ProductPropsForAdmin> = yield call(
      updateProductForAdmin,
      id,
      { name, description, meta, slug, price, stock, thumbnail }
    );
    yield put(updateProductAdminSuccess(response.data));
    yield put(
      showNotification({
        message: "Cập nhật product thành công",
        severity: "success"
      })
    );
    if (meta.onSuccess) {
      meta.onSuccess();
    }
    yield put(productAdminRequest());
  } catch (error) {
    const errors = error as AxiosError<{ message: string }>;
    let message = "Update product failed";

    if (
      errors.response &&
      errors.response.data &&
      errors.response.data.message
    ) {
      message = errors.response.data.message;
    } else if (errors.message) {
      message = errors.message;
    }

    if (action.payload.meta.onError) {
      action.payload.meta.onError();
    }
    yield put(updateProductAdminFailure(message));
  }
}
function* handleDeleteProduct(action: PayloadAction<string>) {
  try {
    const response: ApiResponse<ProductPropsForAdmin> = yield call(
      deleteProductAdmin,
      action.payload
    );
    yield put(deleteProductSuccess(response.data));
    yield put(
      showNotification({
        message: "Xóa product thành công",
        severity: "success"
      })
    );
    yield put(productAdminRequest());
  } catch (error) {
    const errors = error as AxiosError;
    yield put(deleteProductFailure(errors.message));
    yield put(
      showNotification({
        message: "Xóa product thất bại",
        severity: "error"
      })
    );
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
  yield takeLatest(updateProductAdminRequest.type, handleUpdateProductForAdmin);
  yield takeLatest(deleteProductRequest.type, handleDeleteProduct);
}
