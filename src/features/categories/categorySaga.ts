import { call, put, takeLatest } from "redux-saga/effects";
import { ApiResponse } from "../../types/api";
import { CategoryProps } from "./categoryTypes";
import { getAllCategory, getCategoryById } from "./categoryApi";
import {
  categoryDetailFailure,
  categoryDetailRequest,
  categoryDetailSuccess,
  categoryFailure,
  categoryRequest,
  categorySuccess
} from "./categorySlice";
import { AxiosError } from "axios";
import { PayloadAction } from "@reduxjs/toolkit";

function* handleGetAllCategory(): Generator {
  try {
    const response: ApiResponse<CategoryProps[]> = yield call(getAllCategory);
    yield put(categorySuccess(response.data));
  } catch (error) {
    const errors = error as AxiosError;
    yield put(categoryFailure(errors.message));
  }
}
function* handleGetCategoryDetail(action: PayloadAction<string>): Generator {
  try {
    const response: ApiResponse<CategoryProps> = yield call(
      getCategoryById,
      action.payload
    );
    yield put(categoryDetailSuccess(response.data));
  } catch (error) {
    const errors = error as AxiosError;
    yield put(categoryDetailFailure(errors.message));
  }
}
export default function* categorySaga() {
  yield takeLatest(categoryRequest.type, handleGetAllCategory);
  yield takeLatest(categoryDetailRequest.type, handleGetCategoryDetail);
}
