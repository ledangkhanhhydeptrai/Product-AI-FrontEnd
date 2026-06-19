import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { CreateOrderProps, OrderProps } from "./OrderTypes/OrderProps";

interface OrderState {
  loading: boolean;
  error: string | null;
  data: OrderProps[];
  order: OrderProps | null;
}
const initialState: OrderState = {
  loading: false,
  error: null,
  data: [],
  order: null
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
      state.loading = false;
      state.error = null;
      state.order = action.payload;
    },
    createOrderFailure(state, action: PayloadAction<string>) {
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
  createOrderFailure
} = OrderSlice.actions;
export default OrderSlice.reducer;
