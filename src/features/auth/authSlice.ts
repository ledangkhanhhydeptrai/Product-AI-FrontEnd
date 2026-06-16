import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { CreateProps, LoginRequest, UserRole } from "./authApi";
export interface User {
  id: string;
  fullName: string;
  email: string;
  avatarUrl: string;
  role: UserRole;
}
interface AuthState {
  loading: boolean;
  token: string | null;
  isAuthenticated: boolean;
  role: UserRole | null;
  user: User | null;
  error: string | null;
  registered: boolean;
}
const initialState: AuthState = {
  loading: false,
  token: null,
  user: null,
  isAuthenticated: false,
  role: null,
  error: null,
  registered: false
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
      action: PayloadAction<User>
    ) {
      state.loading = false;
      state.role = action.payload.role;
      state.isAuthenticated = true;
      state.user = action.payload;
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
      state.registered = false;
    },

    registerSuccess(state) {
      state.loading = false;
      state.registered = true;
    },

    registerFailure(state, action: PayloadAction<string>) {
      state.loading = false;
      state.error = action.payload;
      state.registered = false;
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
