import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { LoginRequest, UserRole } from "./authApi";
interface User {
  id: string;
  fullName: string;
  email: string;
  avatarUrl: string;
}
interface AuthState {
  loading: boolean;
  token: string | null;
  isAuthenticated: boolean;
  role: UserRole | null;
  user: User | null;
  error: string | null;
}
const initialState: AuthState = {
  loading: false,
  token: null,
  user: null,
  isAuthenticated: false,
  role: null,
  error: null
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    loginRequest(state, _action: PayloadAction<LoginRequest>) {
      state.loading = true;
      state.error = null;
    },

    loginSuccess(
      state,
      action: PayloadAction<{
        user: {
          id: string;
          fullName: string;
          email: string;
          avatarUrl: string;
          role: UserRole;
        };
      }>
    ) {
      state.loading = false;
      state.role = action.payload.user.role;
      state.isAuthenticated = true;
      state.user = action.payload.user;
    },

    loginFailure(state, action: PayloadAction<string>) {
      state.loading = false;
      state.error = action.payload;
    },

    logout(state) {
      state.token = null;
      state.role = null;
      state.user = null;
      state.isAuthenticated = false;
    }
  }
});
export const { loginRequest, loginSuccess, loginFailure, logout } =
  authSlice.actions;
export default authSlice.reducer;
