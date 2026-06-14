import { call, put, takeLatest } from "redux-saga/effects";
import { ApiResponse } from "../../types/api";
import { CategoryProps } from "./categoryTypes";
import { getAllCategory } from "./categoryApi";
import {
  categoryFailure,
  categoryRequest,
  categorySuccess
} from "./categorySlice";
import { AxiosError } from "axios";

function* handleGetAllCategory(): Generator {
  try {
    const response: ApiResponse<CategoryProps[]> = yield call(getAllCategory);
    yield put(categorySuccess(response.data));
  } catch (error) {
    const errors = error as AxiosError;
    yield put(categoryFailure(errors.message));
  }
}
export default function* categorySaga() {
  yield takeLatest(categoryRequest.type, handleGetAllCategory);
}
