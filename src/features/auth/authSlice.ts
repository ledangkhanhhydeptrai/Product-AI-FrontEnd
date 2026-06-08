import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { CreateProps, LoginRequest, UserRole } from "./authApi";
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

    logoutRequest(state) {
      state.loading = true;
    },
    logoutSuccess(state) {
      state.loading = false;
      state.user = null;
      state.role = null;
      state.isAuthenticated = false;
      state.token = null;
      state.error = null;
    },
    registerRequest(state, _action: PayloadAction<CreateProps>) {
      state.loading = true;
      state.error = null;
    },

    registerSuccess(state) {
      state.loading = false;
    },

    registerFailure(state, action: PayloadAction<string>) {
      state.loading = false;
      state.error = action.payload;
    }
  }
});
export const {
  loginRequest,
  loginSuccess,
  loginFailure,
  logoutRequest,
  logoutSuccess,
  registerRequest,
  registerSuccess,
  registerFailure
} = authSlice.actions;
export default authSlice.reducer;
