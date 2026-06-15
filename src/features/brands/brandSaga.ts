import { call, put, takeLatest } from "redux-saga/effects";
import { ApiResponse } from "../../types/api";
import { BrandProps, getAllBrand } from "./brandApi";
import {
  getBrandFailure,
  getBrandRequest,
  getBrandSuccess
} from "./brandSlice";
import { AxiosError } from "axios";

function* handleGetAllBrand(): Generator {
  try {
    const response: ApiResponse<BrandProps[]> = yield call(getAllBrand);
    yield put(getBrandSuccess(response.data));
  } catch (error) {
    const errors = error as AxiosError;
    yield put(getBrandFailure(errors.message));
  }
}
export default function* brandSaga() {
  yield takeLatest(getBrandRequest.type, handleGetAllBrand);
}
