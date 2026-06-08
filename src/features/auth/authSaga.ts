// features/auth/store/authSaga.ts
import { call, put, takeLatest } from "redux-saga/effects";
import { loginRequest, loginSuccess, loginFailure } from "./authSlice";
import type { PayloadAction } from "@reduxjs/toolkit";
import {
  fetchMe,
  LoginAPI,
  type LoginRequest,
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

function* handleLogin(action: PayloadAction<LoginRequest>): Generator {
  try {
    const { email, password } = action.payload;

    yield call(LoginAPI, {
      email,
      password
    });

    const me = yield call(fetchMe);
    console.log("ME =", JSON.stringify(me, null, 2));
    console.log("ME:", me);
    if (!me || !me.data) {
      yield put(loginFailure("Cannot get profile"));
      return;
    }
    yield put(
      loginSuccess({
        user: {
          id: me.data.id,
          fullName: me.data.fullName,
          email: me.data.email,
          avatarUrl: me.data.avatarUrl,
          role: me.data.role
        }
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
