import { call, put, takeLatest } from "redux-saga/effects";

import { MeResponse, profileAPI } from "./profileAPI";
import { getMeFailure, getMeRequest, getMeSuccess } from "./profileSlice";
import { ApiResponse } from "../../types/api";

function* handleGetMe(): Generator {
  try {
    const response: ApiResponse<MeResponse> = yield call(profileAPI);
    console.log("PROFILE RESPONSE:", response);
    yield put(getMeSuccess(response.data));
  } catch {
    yield put(getMeFailure());
  }
}
export default function* profileSaga() {
  yield takeLatest(getMeRequest.type, handleGetMe);
}
