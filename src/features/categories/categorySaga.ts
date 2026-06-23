import { call, put, takeLatest } from "redux-saga/effects";
import { ApiResponse } from "../../types/api";
import {
  CategoryProps,
  CreateCategoryProps,
  UpdateCategoryProps
} from "./categoryTypes";
import {
  createCategory,
  deleteCategoryById,
  getAllCategory,
  getCategoryById,
  updateCategoryById
} from "./categoryApi";
import {
  categoryDetailFailure,
  categoryDetailRequest,
  categoryDetailSuccess,
  categoryFailure,
  categoryRequest,
  categorySuccess,
  createCategoryFailure,
  createCategoryRequest,
  createCategorySuccess,
  deleteCategoryFailure,
  deleteCategoryRequest,
  deleteCategorySuccess,
  updateCategoryFailure,
  updateCategoryRequest,
  updateCategorySuccess
} from "./categorySlice";
import { AxiosError } from "axios";
import { PayloadAction } from "@reduxjs/toolkit";
import { showNotification } from "../notification/notificationSlice";

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
function* handleCreateCategory(action: PayloadAction<CreateCategoryProps>) {
  try {
    const { name, description, slug, meta } = action.payload;

    const response: ApiResponse<CategoryProps> = yield call(createCategory, {
      name,
      description,
      slug,
      meta
    });

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
function* handleUpdateCategory(
  action: PayloadAction<UpdateCategoryProps>
): Generator {
  try {
    const { id, name, description, slug, meta } = action.payload;
    const response: ApiResponse<CategoryProps> = yield call(
      updateCategoryById,
      id,
      { name, description, slug, meta }
    );
    yield put(updateCategorySuccess(response.data));
    yield put(categoryRequest());
  } catch (error) {
    const errors = error as AxiosError;

    yield put(updateCategoryFailure(errors.message));

    // 🔥 ERROR CALLBACK
    if (action.payload.meta.onError) {
      action.payload.meta.onError();
    }
  }
}
function* handleDeleteCategory(action: PayloadAction<string>) {
  try {
    const response: ApiResponse<CategoryProps> = yield call(
      deleteCategoryById,
      action.payload
    );
    yield put(deleteCategorySuccess(response.data));
    yield put(
      showNotification({
        message: "Xóa category thành công",
        severity: "success"
      })
    );
    yield put(categoryRequest());
  } catch (error) {
    const errors = error as AxiosError;
    yield put(deleteCategoryFailure(errors.message));
    yield put(
      showNotification({
        message: "Xóa category thất bại",
        severity: "error"
      })
    );
  }
}
export default function* categorySaga() {
  yield takeLatest(categoryRequest.type, handleGetAllCategory);
  yield takeLatest(categoryDetailRequest.type, handleGetCategoryDetail);
  yield takeLatest(createCategoryRequest.type, handleCreateCategory);
  yield takeLatest(updateCategoryRequest.type, handleUpdateCategory);
  yield takeLatest(deleteCategoryRequest.type, handleDeleteCategory);
}
