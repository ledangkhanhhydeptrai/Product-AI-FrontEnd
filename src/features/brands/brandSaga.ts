import { call, put, takeLatest } from "redux-saga/effects";
import { ApiResponse } from "../../types/api";
import { BrandProps, getAllBrand, getBrandById } from "./brandApi";
import {
  getBrandFailure,
  getBrandIdRequest,
  getBrandIdSuccess,
  getBrandRequest,
  getBrandSuccess
} from "./brandSlice";
import { AxiosError } from "axios";
import { PayloadAction } from "@reduxjs/toolkit";

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
export default function* brandSaga() {
  yield takeLatest(getBrandRequest.type, handleGetAllBrand);
  yield takeLatest(getBrandIdRequest.type, handleGetBrandById);
}
