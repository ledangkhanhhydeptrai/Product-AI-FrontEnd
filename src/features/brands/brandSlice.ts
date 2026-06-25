import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { BrandProps, CreateBrandsProps, UpdateBrandId } from "./brandTypes";

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
    },
    createBrandRequest(state, _action: PayloadAction<CreateBrandsProps>) {
      state.loading = true;
      state.error = null;
    },
    createBrandSuccess(state, action: PayloadAction<BrandProps>) {
      state.loading = false;
      state.error = null;
      state.brands = action.payload;
    },
    createBrandFailure(state, action: PayloadAction<string>) {
      state.loading = false;
      state.error = action.payload;
    },
    updateBrandRequest(state, _action: PayloadAction<UpdateBrandId>) {
      state.loading = true;
      state.error = null;
    },
    updateBrandSuccess(state, action: PayloadAction<BrandProps>) {
      state.loading = false;
      state.error = null;
      state.brands = action.payload;
    },
    updateBrandFailure(state, action: PayloadAction<string>) {
      state.loading = false;
      state.error = action.payload;
    },
    deleteBrandRequest(state, _action: PayloadAction<string>) {
      state.loading = true;
      state.error = null;
    },
    deleteBrandSuccess(state, action: PayloadAction<BrandProps>) {
      state.loading = false;
      state.error = null;
      state.brands = action.payload;
    },
    deleteBrandFailure(state, action: PayloadAction<string>) {
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
  getBrandIdFailure,
  createBrandRequest,
  createBrandFailure,
  createBrandSuccess,
  updateBrandRequest,
  updateBrandSuccess,
  updateBrandFailure,
  deleteBrandRequest,
  deleteBrandSuccess,
  deleteBrandFailure
} = BrandSlice.actions;
export default BrandSlice.reducer;
