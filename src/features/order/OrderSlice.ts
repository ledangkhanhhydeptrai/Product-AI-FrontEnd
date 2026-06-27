import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  CreateOrderProps,
  CreatePropsBuyNow,
  OrderAdmin,
  OrderProps,
  OrderUpdateAdminById
} from "./OrderTypes/OrderProps";

interface OrderState {
  loading: boolean;
  error: string | null;
  data: OrderProps[];
  order: OrderProps | null;
  admin: OrderAdmin[];
  adminProps: OrderAdmin | null;
}
const initialState: OrderState = {
  loading: false,
  error: null,
  data: [],
  order: null,
  admin: [],
  adminProps: null
};
const OrderSlice = createSlice({
  name: "order",
  initialState,
  reducers: {
    getOrderRequest(state) {
      state.loading = true;
      state.error = null;
    },
    getOrderSuccess(state, action: PayloadAction<OrderProps[]>) {
      state.loading = false;
      state.error = null;
      state.data = action.payload;
    },
    getOrderFailure(state, action: PayloadAction<string>) {
      state.loading = false;
      state.error = action.payload;
    },
    createOrderRequest(state, _action: PayloadAction<CreateOrderProps>) {
      state.loading = true;
      state.error = null;
    },
    createOrderSuccess(state, action: PayloadAction<OrderProps>) {
      console.log("ORDER REDUX UPDATE:", action.payload);
      state.loading = false;
      state.error = null;
      state.order = action.payload;
    },
    createOrderFailure(state, action: PayloadAction<string>) {
      state.loading = false;
      state.error = action.payload;
    },
    createOrderBuyNowRequest(state, _action: PayloadAction<CreatePropsBuyNow>) {
      state.loading = true;
      state.error = null;
    },
    createOrderBuyNowSuccess(state, action: PayloadAction<OrderProps>) {
      state.loading = false;
      state.error = null;
      state.order = action.payload;
    },
    createOrderBuyNowFailure(state, action: PayloadAction<string>) {
      state.loading = false;
      state.error = action.payload;
    },
    getAllOrderAdminRequest(state) {
      state.loading = true;
      state.error = null;
    },
    getAllOrderAdminSuccess(state, action: PayloadAction<OrderAdmin[]>) {
      state.loading = false;
      state.error = null;
      state.admin = action.payload;
    },
    getAllOrderAdminFailure(state, action: PayloadAction<string>) {
      state.loading = false;
      state.error = action.payload;
    },
    updateOrderAdminRequest(state, _action: PayloadAction<OrderUpdateAdminById>) {
      state.loading = true;
      state.error = null;
    },
    updateOrderAdminSuccess(state, action: PayloadAction<OrderAdmin>) {
      state.loading = false;
      state.error = null;
      state.adminProps = action.payload;
    },
    updateOrderAdminFailure(state, action: PayloadAction<string>) {
      state.loading = false;
      state.error = action.payload;
    }
  }
});
export const {
  getOrderRequest,
  getOrderSuccess,
  getOrderFailure,
  createOrderRequest,
  createOrderSuccess,
  createOrderFailure,
  createOrderBuyNowRequest,
  createOrderBuyNowSuccess,
  createOrderBuyNowFailure,
  getAllOrderAdminRequest,
  getAllOrderAdminSuccess,
  getAllOrderAdminFailure,
  updateOrderAdminRequest,
  updateOrderAdminSuccess,
  updateOrderAdminFailure
} = OrderSlice.actions;
export default OrderSlice.reducer;
