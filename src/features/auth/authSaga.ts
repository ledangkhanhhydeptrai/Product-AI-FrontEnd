// features/auth/store/authSaga.ts
import { call, put, takeLatest } from "redux-saga/effects";
import {
  loginRequest,
  loginSuccess,
  loginFailure,
  logoutRequest as logoutAction,
  logoutSuccess
} from "./authSlice";
import type { PayloadAction } from "@reduxjs/toolkit";

import { fetchMe, LoginAPI, LogoutAPI, type LoginRequest } from "./authApi";

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

// LOGIN
function* handleLogin(action: PayloadAction<LoginRequest>): Generator {
  try {
    const { email, password } = action.payload;

    yield call(LoginAPI, { email, password });

    const me = yield call(fetchMe);

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
    console.log("Login Error:", error);
    yield put(loginFailure("Login failed"));
  }
}

// LOGOUT
function* handleLogout(): Generator {
  try {
    yield call(LogoutAPI);
  } catch (error) {
    console.log("Logout error:", error);
  } finally {
    // 🔥 QUAN TRỌNG: clear redux state
    yield put(logoutSuccess());
  }
}

// WATCHER
export default function* authSaga() {
  yield takeLatest(loginRequest.type, handleLogin);
  yield takeLatest(logoutAction.type, handleLogout);
}
