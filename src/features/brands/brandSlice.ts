import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { BrandProps } from "./brandApi";

interface BrandState {
  loading: boolean;
  error: string | null;
  data: BrandProps[] | [];
}
const initialState: BrandState = {
  loading: false,
  error: null,
  data: []
};
const BrandSlice = createSlice({
  name: "brand",
  initialState,
  reducers: {
    getBrandRequest(state) {
      state.loading = true;
      state.error = null;
    },
    getBrandSuccess(state, action: PayloadAction<BrandProps[]>) {
      state.loading = false;
      state.error = null;
      state.data = action.payload;
    },
    getBrandFailure(state, action: PayloadAction<string>) {
      state.loading = false;
      state.error = action.payload;
    }
  }
});
export const { getBrandRequest, getBrandSuccess, getBrandFailure } =
  BrandSlice.actions;
export default BrandSlice.reducer;
