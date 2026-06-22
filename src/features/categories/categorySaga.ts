import { call, put, takeLatest } from "redux-saga/effects";
import { ApiResponse } from "../../types/api";
import { CategoryProps, CreateCategoryProps } from "./categoryTypes";
import { createCategory, getAllCategory, getCategoryById } from "./categoryApi";
import {
  categoryDetailFailure,
  categoryDetailRequest,
  categoryDetailSuccess,
  categoryFailure,
  categoryRequest,
  categorySuccess,
  createCategoryFailure,
  createCategoryRequest,
  createCategorySuccess
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
function* handleCreateCategory(
  action: PayloadAction<CreateCategoryProps>
) {
  try {
    const { name, description, slug, meta } = action.payload;

    const response: ApiResponse<CategoryProps> = yield call(
      createCategory,
      {
        name,
        description,
        slug,
        meta
      }
    );

    yield put(createCategorySuccess(response.data));

    // 🔥 SUCCESS CALLBACK (QUAN TRỌNG NHẤT)
    if (meta.onSuccess) {
      meta.onSuccess();
    }

    // reload list (optional)
    yield put(categoryRequest());
  } catch (error) {
    const errors = error as AxiosError;

    yield put(createCategoryFailure(errors.message));

    // 🔥 ERROR CALLBACK
    if (action.payload.meta.onError) {
      action.payload.meta.onError();
    }
  }
}
export default function* categorySaga() {
  yield takeLatest(categoryRequest.type, handleGetAllCategory);
  yield takeLatest(categoryDetailRequest.type, handleGetCategoryDetail);
  yield takeLatest(createCategoryRequest.type, handleCreateCategory);
}
