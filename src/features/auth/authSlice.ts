import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { LoginRequest, UserRole } from "./authApi";
interface AuthState {
  loading: boolean;
  token: string | null;
  isAuthenticated: boolean;
  role: UserRole | null;
  userId: string | null;
  error: string | null;
}
const initialState: AuthState = {
  loading: false,
  token: null,
  isAuthenticated: false,
  role: null,
  userId: null,
  error: null
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    loginRequest(state, action: PayloadAction<LoginRequest>) {
      state.loading = true;
      state.error = null;
    },

    loginSuccess(
      state,
      action: PayloadAction<{
        token: string;
        role: UserRole;
        userId: string;
      }>
    ) {
      state.loading = false;
      state.token = action.payload.token;
      state.role = action.payload.role;
      state.userId = action.payload.userId;
      state.isAuthenticated = true;
    },

    loginFailure(state, action: PayloadAction<string>) {
      state.loading = false;
      state.error = action.payload;
    },

    logout(state) {
      state.token = null;
      state.role = null;
      state.userId = null;
      state.isAuthenticated = false;
    }
  }
});
export const { loginRequest, loginSuccess, loginFailure, logout } =
  authSlice.actions;
export default authSlice.reducer;
