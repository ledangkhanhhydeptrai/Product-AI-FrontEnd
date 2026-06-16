import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { CartUserProps } from "./CartAPI";

interface CartState {
  loading: boolean;
  error: string | null;
  data: CartUserProps[] | [];
}
const initialState: CartState = {
  loading: false,
  error: null,
  data: []
};
const CartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    getCartRequest(state) {
      state.loading = true;
      state.error = null;
    },
    getCartSuccess(state, action: PayloadAction<CartUserProps[]>) {
      state.loading = false;
      state.error = null;
      state.data = action.payload;
    },
    getCartFailure(state, action: PayloadAction<string>) {
      state.loading = false;
      state.error = action.payload;
    }
  }
});
export const { getCartRequest, getCartSuccess, getCartFailure } =
  CartSlice.actions;
export default CartSlice.reducer;
