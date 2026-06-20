import { call, put, takeLatest } from "redux-saga/effects";
import { ApiResponse } from "../../types/api";
import { CreateReviewProps, ReviewProps } from "./reviewTypes";
import { createView, reviewAll } from "./reviewAPI";
import {
  createReviewFailure,
  createReviewRequest,
  createReviewSuccess,
  getReviewFailure,
  getReviewRequest,
  getReviewSuccess
} from "./reviewSlice";
import { AxiosError } from "axios";
import { PayloadAction } from "@reduxjs/toolkit";

function* handleGetAllReview(): Generator {
  try {
    const response: ApiResponse<ReviewProps[]> = yield call(reviewAll);
    yield put(getReviewSuccess(response.data));
  } catch (error) {
    const errors = error as AxiosError;
    yield put(getReviewFailure(errors.message));
  }
}
function* handleCreateReview(
  action: PayloadAction<CreateReviewProps>
): Generator {
  try {
    const { product_id, rating, comment } = action.payload;
    const response: ApiResponse<ReviewProps> = yield call(createView, {
      product_id,
      rating,
      comment
    });
    yield put(createReviewSuccess(response.data));
    yield put(getReviewRequest());
  } catch (error) {
    const errors = error as AxiosError;
    yield put(createReviewFailure(errors.message));
  }
}
export default function* reviewSaga() {
  yield takeLatest(getReviewRequest.type, handleGetAllReview);
  yield takeLatest(createReviewRequest.type, handleCreateReview);
}
