import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { OrderProps } from "./OrderTypes/OrderProps";

interface OrderState {
  loading: boolean;
  error: string | null;
  data: OrderProps[];
}
const initialState: OrderState = {
  loading: false,
  error: null,
  data: []
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
    }
  }
});
export const { getOrderRequest, getOrderSuccess, getOrderFailure } =
  OrderSlice.actions;
export default OrderSlice.reducer;
