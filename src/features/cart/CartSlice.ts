import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { CartUserProps, CreateCartProps, UpdateCartResponse } from "./CartAPI";

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
    },
    updateCartRequest(
      state,
      _action: PayloadAction<{ product_id: string; quantity: number }>
    ) {
      state.loading = true;
      state.error = null;
    },
    updateCartSuccess(state, action: PayloadAction<UpdateCartResponse>) {
      state.loading = false;
      state.error = null;
      const updatedItem = action.payload;
      const cart = state.data.find((c) => c.id === updatedItem.cart_id);

      if (cart) {
        const item = cart.cart_items.find(
          (i) => i.product_id === updatedItem.product_id
        );

        if (item) {
          item.quantity = updatedItem.quantity;
        }
      }
    },
    updateCartFailure(state, action: PayloadAction<string>) {
      state.loading = false;
      state.error = action.payload;
    },
    deleteCartRequest(state, _action: PayloadAction<{ product_id: string }>) {
      state.loading = true;
      state.error = null;
    },
    deleteCartSuccess(state, action: PayloadAction<null>) {
      state.loading = false;
      state.error = null;
      state.cart = action.payload;
    },
    deleteCartFailure(state, action: PayloadAction<string>) {
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
  createCartFailure,
  updateCartRequest,
  updateCartSuccess,
  updateCartFailure,
  deleteCartRequest,
  deleteCartSuccess,
  deleteCartFailure
} = CartSlice.actions;
export default CartSlice.reducer;
