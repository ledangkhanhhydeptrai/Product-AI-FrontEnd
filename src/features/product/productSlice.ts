import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  ProductProps,
  ProductPropsAdminForm,
  ProductPropsForAdmin
} from "./productTypes";

interface ProductState {
  loading: boolean;
  error: string | null;
  data: ProductProps[] | [];
  product: ProductProps | null;
  admin: ProductPropsForAdmin[] | [];
  adminProps: ProductPropsForAdmin | null;
}
const initialState: ProductState = {
  loading: false,
  error: null,
  data: [],
  product: null,
  admin: [],
  adminProps: null,
};
const productSlice = createSlice({
  name: "productCustomer",
  initialState,
  reducers: {
    productRequest(state) {
      state.loading = true;
      state.error = null;
    },
    productSuccess(state, _action: PayloadAction<ProductProps[]>) {
      state.loading = false;
      state.error = null;
      state.data = _action.payload;
    },
    productFailure(state, action: PayloadAction<string>) {
      state.loading = false;
      state.error = action.payload;
    },
    productRequestById(state, _action: PayloadAction<string>) {
      state.loading = true;
      state.error = null;
    },
    productSuccessById(state, _action: PayloadAction<ProductProps>) {
      state.loading = false;
      state.error = null;
      state.product = _action.payload;
    },
    productFailureById(state, action: PayloadAction<string>) {
      state.loading = false;
      state.error = action.payload;
    },
    productAdminRequest(state) {
      state.loading = true;
      state.error = null;
    },
    productAdminSuccess(state, action: PayloadAction<ProductPropsForAdmin[]>) {
      state.loading = false;
      state.error = null;
      state.admin = action.payload;
    },
    productAdminFailure(state, action: PayloadAction<string>) {
      state.loading = false;
      state.error = action.payload;
    },
    productAdminByIdRequest(state, _action: PayloadAction<string>) {
      state.loading = true;
      state.error = null;
    },
    productAdminByIdSuccess(
      state,
      action: PayloadAction<ProductPropsForAdmin>
    ) {
      state.loading = false;
      state.error = null;
      state.adminProps = action.payload;
    },
    productAdminByIdFailure(state, action: PayloadAction<string>) {
      state.loading = false;
      state.error = action.payload;
    },
    createProductAdminRequest(
      state,
      _action: PayloadAction<ProductPropsAdminForm>
    ) {
      state.loading = true;
      state.error = null;
    },
    createProductAdminSuccess(
      state,
      action: PayloadAction<ProductPropsForAdmin>
    ) {
      state.loading = false;
      state.error = null;
      state.adminProps = action.payload;
    },
    createProductAdminFailure(state, action: PayloadAction<string>) {
      state.loading = false;
      state.error = action.payload;
    }
  }
});
export const {
  productRequest,
  productSuccess,
  productFailure,
  productRequestById,
  productSuccessById,
  productFailureById,
  productAdminRequest,
  productAdminSuccess,
  productAdminFailure,
  productAdminByIdRequest,
  productAdminByIdSuccess,
  productAdminByIdFailure,
  createProductAdminRequest,
  createProductAdminSuccess,
  createProductAdminFailure
} = productSlice.actions;
export default productSlice.reducer;
