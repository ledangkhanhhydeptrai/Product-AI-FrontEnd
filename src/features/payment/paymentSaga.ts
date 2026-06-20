import { PayloadAction } from "@reduxjs/toolkit";
import { ApiResponse } from "../../types/api";
import {
  createPaymentRequest,
  createPaymentSuccess,
  failedPaymentFailure,
  failedPaymentRequest,
  failedPaymentSuccess,
  getPaymentFailure,
  getPaymentRequest,
  getPaymentSuccess,
  successPaymentFailure,
  successPaymentRequest,
  successPaymentSuccess
} from "./paymentSlice";
import { PaymentProps } from "./paymentTypes/PaymentTypes";
import { call, put, takeLatest } from "redux-saga/effects";
import {
  createFailedPaymentMethod,
  CreatePaymentOrderById,
  createSuccessPaymentMethod,
  getPaymentByOrderId
} from "./paymentAPI";
import { AxiosError } from "axios";

function* handleGetPayment(action: PayloadAction<{ order_id: string }>) {
  try {
    const response: ApiResponse<PaymentProps> = yield call(
      getPaymentByOrderId,
      action.payload
    );
    console.log("PAYMENT RESPONSE", response);
    console.log("PAYMENT DATA", response.data);
    yield put(getPaymentSuccess(response.data));
  } catch (error) {
    const errors = error as AxiosError;
    yield put(getPaymentFailure(errors.message));
  }
}

function* handleCreatePayment(action: PayloadAction<{ order_id: string }>) {
  try {
    console.log("🚀 CREATE PAYMENT START");
    console.log("PAYLOAD:", action.payload);

    const response: ApiResponse<PaymentProps> = yield call(
      CreatePaymentOrderById,
      action.payload
    );

    console.log("📦 RAW RESPONSE:", response);
    console.log("📦 RESPONSE DATA:", response.data);

    if (!response.data) {
      console.error("❌ NO RESPONSE DATA FROM API");
    }

    console.log("💳 CHECKOUT URL:", response.data.checkout_url);

    yield put(createPaymentSuccess(response.data));

    console.log("✅ DISPATCH createPaymentSuccess DONE");
  } catch (error) {
    const err = error as AxiosError;

    console.error("🔥 CREATE PAYMENT ERROR:");
    console.error("MESSAGE:", err.message);
    console.error("RESPONSE:", err.response?.data);
    console.error("STATUS:", err.response?.status);

    yield put(getPaymentFailure(err.message));
  }
}
function* handleSuccessPayment(action: PayloadAction<{ order_code: number }>) {
  try {
    console.log("🎉 PAYMENT SUCCESS START");
    console.log("ORDER CODE:", action.payload.order_code);

    const response: ApiResponse<PaymentProps> = yield call(
      createSuccessPaymentMethod,
      action.payload
    );

    console.log("🎉 SUCCESS RESPONSE:", response);

    yield put(successPaymentSuccess(response.data));

    console.log("✅ SUCCESS PAYMENT UPDATED");
  } catch (error) {
    const err = error as AxiosError;

    console.error("❌ SUCCESS PAYMENT ERROR");
    console.error(err);

    yield put(successPaymentFailure(err.message));
  }
}
function* handleFailedPayment(action: PayloadAction<{ order_code: number }>) {
  try {
    console.log("🎉 PAYMENT SUCCESS START");
    console.log("ORDER CODE:", action.payload.order_code);

    const response: ApiResponse<PaymentProps> = yield call(
      createFailedPaymentMethod,
      action.payload
    );

    console.log("🎉 Failed RESPONSE:", response);

    yield put(failedPaymentSuccess(response.data));

    console.log("✅ SUCCESS PAYMENT UPDATED");
  } catch (error) {
    const err = error as AxiosError;

    console.error("❌ SUCCESS PAYMENT ERROR");
    console.error(err);

    yield put(failedPaymentFailure(err.message));
  }
}
export default function* PaymentSaga() {
  console.log("🔥 PAYMENT SAGA LOADED");

  yield takeLatest(
    getPaymentRequest.type,
    function* (action: PayloadAction<{ order_id: string }>) {
      console.log("📥 GET PAYMENT TRIGGERED:", action.payload);
      yield handleGetPayment(action);
    }
  );

  yield takeLatest(
    createPaymentRequest.type,
    function* (action: PayloadAction<{ order_id: string }>) {
      console.log("📥 CREATE PAYMENT TRIGGERED:", action.payload);
      yield handleCreatePayment(action);
    }
  );
  yield takeLatest(
    successPaymentRequest.type,
    function* (action: PayloadAction<{ order_code: number }>) {
      console.log("🎉 SUCCESS PAYMENT TRIGGERED", action.payload);

      yield handleSuccessPayment(action);
    }
  );
  yield takeLatest(
    failedPaymentRequest.type,
    function* (action: PayloadAction<{ order_code: number }>) {
      console.log("🎉 Failed PAYMENT TRIGGERED", action.payload);

      yield handleFailedPayment(action);
    }
  );
}
