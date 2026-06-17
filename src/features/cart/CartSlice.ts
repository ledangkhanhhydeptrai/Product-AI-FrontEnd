import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { CartUserProps, CreateCartProps } from "./CartAPI";

interface CartState {
  loading: boolean;
  error: string | null;
  data: CartUserProps[] | [];
  cart: CartUserProps | null;
}
const initialState: CartState = {
  loading: false,
  error: null,
  data: [],
  cart: null
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
    },
    createCartRequest(state, _action: PayloadAction<CreateCartProps>) {
      state.loading = true;
      state.error = null;
    },
    createCartSuccess(state, action: PayloadAction<CartUserProps>) {
      state.loading = false;
      state.error = null;
      state.cart = action.payload;
    },
    createCartFailure(state, action: PayloadAction<string>) {
      state.loading = false;
      state.error = action.payload;
    }
  }
});
export const {
  getCartRequest,
  getCartSuccess,
  getCartFailure,
  createCartRequest,
  createCartSuccess,
  createCartFailure
} = CartSlice.actions;
export default CartSlice.reducer;
