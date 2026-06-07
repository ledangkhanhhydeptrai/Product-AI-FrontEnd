// features/auth/store/authSaga.ts
import { call, put, takeLatest } from "redux-saga/effects";
import { loginRequest, loginSuccess, loginFailure } from "./authSlice";
import type { AxiosError, AxiosResponse } from "axios";
import { LoginAPI, type TokenResponse } from "./authApi";
import { getUsernameFromToken } from "./utils/JWTPayload";
import { decodeJwt } from "./types/jwt";

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

function* handleLogin(
  action: ReturnType<typeof loginRequest>
): Generator<unknown, void, AxiosResponse<ApiResponse<TokenResponse>>> {
  try {
    const { email, password } = action.payload;

    const response = yield call(LoginAPI, {
      email,
      password
    });
    const { token, role } = response.data.data;
    const decodedUsername = getUsernameFromToken(token);
    localStorage.setItem("username", decodedUsername ?? "");
    const payload = decodeJwt(token);
    if (!payload) {
      throw new Error("Invalid token");
    }
    // response.data là ApiResponse<TokenResponse>
    // loginSuccess expects the user role, so pass role only
    yield put(loginSuccess(role));
  } catch (error) {
    let message = "Login failed";

    if (error && (error as AxiosError).isAxiosError) {
      const err = error as AxiosError<ApiErrorResponse>;

      if (
        err.response &&
        err.response.data &&
        typeof err.response.data.message === "string"
      ) {
        message = err.response.data.message;
      }
    }

    yield put(loginFailure(message));
  }
}

export default function* authSaga() {
  yield takeLatest(loginRequest.type, handleLogin);
}
