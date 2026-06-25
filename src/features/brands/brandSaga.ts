import { call, put, takeLatest } from "redux-saga/effects";
import { ApiResponse } from "../../types/api";
import {
  CreateBrand,
  deleteBrandById,
  getAllBrand,
  getBrandById,
  updateBrandById
} from "./brandApi";
import {
  createBrandFailure,
  createBrandRequest,
  createBrandSuccess,
  deleteBrandFailure,
  deleteBrandRequest,
  deleteBrandSuccess,
  getBrandFailure,
  getBrandIdRequest,
  getBrandIdSuccess,
  getBrandRequest,
  getBrandSuccess,
  updateBrandFailure,
  updateBrandRequest,
  updateBrandSuccess
} from "./brandSlice";
import { AxiosError } from "axios";
import { PayloadAction } from "@reduxjs/toolkit";
import { BrandProps, CreateBrandsProps, UpdateBrandId } from "./brandTypes";
import { showNotification } from "../notification/notificationSlice";

function* handleGetAllBrand(): Generator {
  try {
    const response: ApiResponse<BrandProps[]> = yield call(getAllBrand);
    yield put(getBrandSuccess(response.data));
  } catch (error) {
    const errors = error as AxiosError;
    yield put(getBrandFailure(errors.message));
  }
}
function* handleGetBrandById(action: PayloadAction<string>): Generator {
  try {
    const response: ApiResponse<BrandProps> = yield call(
      getBrandById,
      action.payload
    );
    yield put(getBrandIdSuccess(response.data));
  } catch (error) {
    const errors = error as AxiosError;
    yield put(getBrandFailure(errors.message));
  }
}
function* handleCreateBrand(
  action: PayloadAction<CreateBrandsProps>
): Generator {
  try {
    const { name, description, logo, meta } = action.payload;
    const response: ApiResponse<BrandProps> = yield call(CreateBrand, {
      name,
      description,
      logo,
      meta
    });
    yield put(createBrandSuccess(response.data));
    yield put(
      showNotification({
        message: "Tạo brand thành công",
        severity: "success"
      })
    );
    if (meta.onSuccess) {
      meta.onSuccess();
    }
    yield put(getBrandRequest());
  } catch (error) {
    const errors = error as AxiosError;
    yield put(createBrandFailure(errors.message));
  }
}
function* handleUpdateBrand(action: PayloadAction<UpdateBrandId>): Generator {
  try {
    const { id, name, description, logo, meta } = action.payload;
    const response: ApiResponse<BrandProps> = yield call(updateBrandById, id, {
      name,
      description,
      logo,
      meta
    });
    yield put(updateBrandSuccess(response.data));
    yield put(
      showNotification({
        message: "Cập nhật brand thành công",
        severity: "success"
      })
    );
    if (meta.onSuccess) {
      meta.onSuccess();
    }
    yield put(getBrandRequest());
  } catch (error) {
    const errors = error as AxiosError;
    yield put(updateBrandFailure(errors.message));
  }
}
function* handleDeleteBrand(action: PayloadAction<string>) {
  try {
    const response: ApiResponse<BrandProps> = yield call(
      deleteBrandById,
      action.payload
    );
    yield put(deleteBrandSuccess(response.data));
    yield put(
      showNotification({
        message: "Xóa brand thành công",
        severity: "success"
      })
    );
    yield put(getBrandRequest());
  } catch (error) {
    const errors = error as AxiosError;
    yield put(deleteBrandFailure(errors.message));
    yield put(
      showNotification({
        message: "Xóa brand thất bại",
        severity: "error"
      })
    );
  }
}
export default function* brandSaga() {
  yield takeLatest(getBrandRequest.type, handleGetAllBrand);
  yield takeLatest(getBrandIdRequest.type, handleGetBrandById);
  yield takeLatest(createBrandRequest.type, handleCreateBrand);
  yield takeLatest(updateBrandRequest.type, handleUpdateBrand);
  yield takeLatest(deleteBrandRequest.type, handleDeleteBrand);
}
