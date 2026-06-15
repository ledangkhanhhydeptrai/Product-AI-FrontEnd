import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { BrandProps } from "./brandApi";

interface BrandState {
  loading: boolean;
  error: string | null;
  data: BrandProps[] | [];
  brands: BrandProps | null;
}
const initialState: BrandState = {
  loading: false,
  error: null,
  data: [],
  brands: null
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
    },
    getBrandIdRequest(state, _action: PayloadAction<string>) {
      state.loading = true;
      state.error = null;
    },
    getBrandIdSuccess(state, action: PayloadAction<BrandProps | null>) {
      state.loading = false;
      state.error = null;
      state.brands = action.payload;
    },
    getBrandIdFailure(state, action: PayloadAction<string>) {
      state.loading = false;
      state.error = action.payload;
    }
  }
});
export const {
  getBrandRequest,
  getBrandSuccess,
  getBrandFailure,
  getBrandIdRequest,
  getBrandIdSuccess,
  getBrandIdFailure
} = BrandSlice.actions;
export default BrandSlice.reducer;
