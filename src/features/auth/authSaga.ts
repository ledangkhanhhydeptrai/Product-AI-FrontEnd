// features/auth/store/authSaga.ts
import { call, put, takeLatest } from "redux-saga/effects";
import {
  loginRequest,
  loginSuccess,
  loginFailure,
  logoutRequest as logoutAction,
  logoutSuccess,
  registerSuccess,
  registerFailure,
  registerRequest
} from "./authSlice";
import type { PayloadAction } from "@reduxjs/toolkit";

import {
  CreateFormAPI,
  CreateProps,
  fetchMe,
  LoginAPI,
  LogoutAPI,
  type LoginRequest
} from "./authApi";
import { showNotification } from "../notification/notificationSlice";

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
function* handleRegister(action: PayloadAction<CreateProps>): Generator {
  try {
    console.log("PAYLOAD FILE:", action.payload.file);
    console.log("IS FILE INSTANCE:", action.payload.file instanceof File);

    yield call(CreateFormAPI, action.payload);
    yield put(
      showNotification({
        message: "Đăng ký thành công",
        severity: "success"
      })
    );
    yield put(registerSuccess());
  } catch (error) {
    console.log("Register Error:", error);
    yield put(registerFailure("Register failed"));
  }
}
// WATCHER
export default function* authSaga() {
  yield takeLatest(loginRequest.type, handleLogin);
  yield takeLatest(logoutAction.type, handleLogout);
  yield takeLatest(registerRequest.type, handleRegister);
}
