import { call, put, takeLatest } from "redux-saga/effects";
import { ApiResponse } from "../../types/api";
import { ReviewProps } from "./reviewTypes";
import { reviewAll } from "./reviewAPI";
import {
  getReviewFailure,
  getReviewRequest,
  getReviewSuccess
} from "./reviewSlice";
import { AxiosError } from "axios";

function* handleGetAllReview(): Generator {
  try {
    const response: ApiResponse<ReviewProps[]> = yield call(reviewAll);
    yield put(getReviewSuccess(response.data));
  } catch (error) {
    const errors = error as AxiosError;
    yield put(getReviewFailure(errors.message));
  }
}
export default function* reviewSaga() {
  yield takeLatest(getReviewRequest.type, handleGetAllReview);
}
