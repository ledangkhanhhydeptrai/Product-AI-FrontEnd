import { call, put, takeLatest } from "redux-saga/effects";
import { ApiResponse } from "../../types/api";
import {
  CreateReviewProps,
  ReviewProps,
  UpdateReviewPayload
} from "./reviewTypes";
import { createView, DeleteReview, reviewAll, UpdateReview } from "./reviewAPI";
import {
  createReviewFailure,
  createReviewRequest,
  createReviewSuccess,
  deleteReviewFailure,
  deleteReviewRequest,
  deleteReviewSuccess,
  getReviewFailure,
  getReviewRequest,
  getReviewSuccess,
  updateReviewFailure,
  updateReviewRequest,
  updateReviewSuccess
} from "./reviewSlice";
import { AxiosError } from "axios";
import { PayloadAction } from "@reduxjs/toolkit";
import { showNotification } from "../notification/notificationSlice";

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
    yield put(
      showNotification({
        message: "Tạo đánh giá thành công",
        severity: "success"
      })
    );
    yield put(getReviewRequest());
  } catch (error) {
    const errors = error as AxiosError;
    yield put(createReviewFailure(errors.message));
    yield put(
      showNotification({
        message: "Tạo đánh giá thất bại",
        severity: "error"
      })
    );
  }
}
function* handleUpdateReview(
  action: PayloadAction<UpdateReviewPayload>
): Generator {
  const { id, data } = action.payload;

  try {
    const response: ApiResponse<ReviewProps> = yield call(
      UpdateReview,
      id,
      data
    );

    yield put(updateReviewSuccess(response.data));

    // ✅ ADD NOTIFICATION HERE
    yield put(
      showNotification({
        message: "Cập nhật đánh giá thành công",
        severity: "success"
      })
    );

    // optional: reload list
    yield put(getReviewRequest());
  } catch (error) {
    const errors = error as AxiosError;

    yield put(updateReviewFailure(errors.message));

    yield put(
      showNotification({
        message: "Cập nhật đánh giá thất bại",
        severity: "error"
      })
    );
  }
}
function* handleDeleteReview(action: PayloadAction<string>): Generator {
  try {
    const response: ApiResponse<ReviewProps> = yield call(
      DeleteReview,
      action.payload
    );
    yield put(deleteReviewSuccess(response.data));
    yield put(
      showNotification({
        message: "Xóa đánh giá thành công",
        severity: "success"
      })
    );
  } catch (error) {
    const errors = error as AxiosError;
    yield put(deleteReviewFailure(errors.message));
    yield put(
      showNotification({
        message: "Xóa đánh giá thất bại",
        severity: "error"
      })
    );
  }
}
export default function* reviewSaga() {
  yield takeLatest(getReviewRequest.type, handleGetAllReview);
  yield takeLatest(createReviewRequest.type, handleCreateReview);
  yield takeLatest(updateReviewRequest.type, handleUpdateReview);
  yield takeLatest(deleteReviewRequest.type, handleDeleteReview);
}
