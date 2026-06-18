import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { CartUserProps, CreateCartProps } from "./CartAPI";
import { NotificationSeverity } from "../notification/notificationSlice";

interface CartState {
  loading: boolean;
  error: string | null;
  data: CartUserProps[];
  cart: CartUserProps | null;
  notification: {
    message: string;
    severity: NotificationSeverity;
  } | null;
}
const initialState: CartState = {
  loading: false,
  error: null,
  data: [],
  cart: null,
  notification: null
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
    updateCartSuccess(state, action: PayloadAction<CartUserProps>) {
      state.loading = false;
      state.error = null;

      const updatedCart = action.payload;

      const index = state.data.findIndex((c) => c.id === updatedCart.id);

      if (index !== -1) {
        state.data[index] = updatedCart;
      } else {
        state.data.push(updatedCart);
      }
    },
    updateCartFailure(state, action: PayloadAction<string>) {
      state.loading = false;
      state.error = action.payload;
    },
    deleteCartRequest(state, _action: PayloadAction<{ cart_item_id: string }>) {
      state.loading = true;
      state.error = null;
    },
    deleteCartSuccess(state, action: PayloadAction<string>) {
      state.loading = false;
      state.error = null;
      state.notification = {
        message: action.payload,
        severity: "error"
      };
    },
    deleteCartFailure(state, action: PayloadAction<string>) {
      state.loading = false;
      state.error = action.payload;
    },
    clearNotification(state) {
      state.notification = null;
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
  deleteCartFailure,
  clearNotification
} = CartSlice.actions;
export default CartSlice.reducer;
