import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ProductProps } from "./productTypes";

interface ProductState {
  loading: boolean;
  error: string | null;
  data: ProductProps[] | [];
  product: ProductProps | null;
}
const initialState: ProductState = {
  loading: false,
  error: null,
  data: [],
  product: null
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
    }
  }
});
export const {
  productRequest,
  productSuccess,
  productFailure,
  productRequestById,
  productSuccessById,
  productFailureById
} = productSlice.actions;
export default productSlice.reducer;
