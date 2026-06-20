import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { PaymentProps } from "./paymentTypes/PaymentTypes";

interface PaymentState {
  loading: boolean;
  error: string | null;
  orderData: PaymentProps | null;
}
const initialState: PaymentState = {
  loading: false,
  error: null,
  orderData: null
};
const PaymentSlice = createSlice({
  name: "payment",
  initialState,
  reducers: {
    getPaymentRequest(state, _action: PayloadAction<{ order_id: string }>) {
      state.loading = true;
      state.error = null;
    },
    createPaymentRequest(state, _action: PayloadAction<{ order_id: string }>) {
      state.loading = true;
      state.error = null;
    },
    createPaymentSuccess(state, action: PayloadAction<PaymentProps>) {
      state.loading = false;
      state.error = null;
      state.orderData = action.payload;
    },
    createPaymentFailure(state, action: PayloadAction<string>) {
      state.loading = false;
      state.error = action.payload;
    },
    getPaymentSuccess(state, action: PayloadAction<PaymentProps>) {
      state.loading = false;
      state.error = null;
      state.orderData = action.payload;
    },
    getPaymentFailure(state, action: PayloadAction<string>) {
      state.loading = false;
      state.error = action.payload;
    },
    successPaymentRequest(
      state,
      _action: PayloadAction<{ order_code: number }>
    ) {
      state.loading = true;
      state.error = null;
    },

    successPaymentSuccess(state, action: PayloadAction<PaymentProps>) {
      state.loading = false;
      state.error = null;
      state.orderData = action.payload;
    },

    successPaymentFailure(state, action: PayloadAction<string>) {
      state.loading = false;
      state.error = action.payload;
    },
    failedPaymentRequest(
      state,
      _action: PayloadAction<{ order_code: number }>
    ) {
      state.loading = true;
      state.error = null;
    },

    failedPaymentSuccess(state, action: PayloadAction<PaymentProps>) {
      state.loading = false;
      state.error = null;
      state.orderData = action.payload;
    },

    failedPaymentFailure(state, action: PayloadAction<string>) {
      state.loading = false;
      state.error = action.payload;
    }
  }
});
export const {
  getPaymentRequest,
  getPaymentSuccess,
  getPaymentFailure,
  createPaymentRequest,
  createPaymentSuccess,
  createPaymentFailure,
  successPaymentRequest,
  successPaymentSuccess,
  successPaymentFailure,
  failedPaymentRequest,
  failedPaymentSuccess,
  failedPaymentFailure
} = PaymentSlice.actions;
export default PaymentSlice.reducer;
