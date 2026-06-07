import type { LoginRequest, UserRole } from "./authApi";
import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
interface AuthState {
  loading: boolean;
  user: UserRole | null;
  error: string | null;
  isAuthenticated: boolean;
}
const initialState: AuthState = {
  loading: false,
  user: null,
  error: null,
  isAuthenticated: false
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    loginRequest(state, action: PayloadAction<LoginRequest>) {
      state.loading = true;
      state.error = null;
      console.log("Login:", action.payload);
    },
    loginSuccess(state, action: PayloadAction<UserRole>) {
      state.loading = false;
      state.error = null;
      state.user = action.payload;
      state.isAuthenticated = true;
    },
    loginFailure(state, action: PayloadAction<string>) {
      state.loading = false;
      state.error = action.payload;
    },
    logout(state) {
      state.user = null;
      state.loading = false;
      state.error = null;
    }
  }
});
export const { loginRequest, loginSuccess, loginFailure, logout } =
  authSlice.actions;
export default authSlice.reducer;
