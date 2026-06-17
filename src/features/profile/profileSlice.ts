import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { MeResponse } from "./profileAPI";
import { UserRole } from "../auth/authApi";
import { User } from "../auth/authSlice";

interface ProfileState {
  loading: boolean;
  error: string | null;
  role: UserRole | null;
  user: User | null;
  isAuthenticated: boolean;
  initialized: boolean; // 👈 thêm cái này
}
const initialState: ProfileState = {
  loading: false,
  error: null,
  user: null,
  role: null,
  isAuthenticated: false,
  initialized: false
};
const profileSlice = createSlice({
  name: "profile",
  initialState,
  reducers: {
    getMeRequest(state) {
      state.loading = true;
    },

    getMeSuccess(state, action: PayloadAction<MeResponse>) {
      state.loading = false;
      state.user = action.payload;
      state.role = action.payload.role;
      state.isAuthenticated = true;
      state.initialized = true;
    },

    getMeFailure(state) {
      state.loading = false;
      state.user = null;
      state.role = null;
      state.isAuthenticated = false;
      state.initialized = true;
    },
    clearProfile: (state) => {
      state.user = null;
    }
  }
});
export const { getMeRequest, getMeSuccess, getMeFailure, clearProfile } =
  profileSlice.actions;
export default profileSlice.reducer;
