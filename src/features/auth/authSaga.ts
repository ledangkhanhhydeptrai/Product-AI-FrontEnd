// features/auth/store/authSaga.ts
import { call, put, takeLatest } from "redux-saga/effects";
import { loginRequest, loginSuccess, loginFailure } from "./authSlice";
import type { PayloadAction } from "@reduxjs/toolkit";
import {
  fetchMe,
  LoginAPI,
  type LoginRequest,
  type LoginResponse,
  type MeResponse
} from "./authApi";

export interface ApiResponse<T> {
  status: number;
  message: string;
  data: T;
}

export interface ApiErrorResponse {
  status: number;
  message: string;
  data: null;
}

function* handleLogin(action: PayloadAction<LoginRequest>) {
  try {
    const { email, password } = action.payload;

    const loginRes: { data: LoginResponse } = yield call(LoginAPI, {
      email,
      password
    });

    const me: { data: MeResponse } = yield call(fetchMe);

    const { user } = me.data;

    yield put(
      loginSuccess({
        token: loginRes.data.data.token,
        role: user.role,
        userId: user.sub
      })
    );
  } catch (error) {
    console.log("Error:", error);
    yield put(loginFailure("Login failed"));
  }
}
export default function* authSaga() {
  yield takeLatest(loginRequest.type, handleLogin);
}
